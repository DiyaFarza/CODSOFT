const Movie = require('../models/Movie');
const { getRecommendations } = require('../utils/recommendation');
const { getCache, setCache } = require('../utils/redis');
const OpenAI = require('openai');

exports.getRecommendations = async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const userId = req.user.id;
    const cacheKey = `recs_${userId}`;

    const cached = await getCache(cacheKey);
    if (cached) return res.json({ recommendations: cached, fromCache: true });

    const movieIds = await getRecommendations(userId);
    if (movieIds.length === 0)
      return res.json({ recommendations: [], message: 'Rate more movies to get recommendations!' });

    const movies = await Movie.find({ _id: { $in: movieIds } });

    const recommendations = await Promise.all(movies.map(async (movie) => {
      const aiResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `In one sentence, explain why someone who likes movies would enjoy "${movie.title}" (${movie.genre.join(', ')}). Keep it fun and short.`
        }],
        max_tokens: 60
      });

      return {
        ...movie.toObject(),
        aiReason: aiResponse.choices[0].message.content
      };
    }));

    await setCache(cacheKey, recommendations, 600);
    res.json({ recommendations, fromCache: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};