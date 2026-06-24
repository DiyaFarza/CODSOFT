const Rating = require('../models/Rating');

// Cosine Similarity: measures how similar two users' ratings are
function cosineSimilarity(ratingsA, ratingsB) {
  const commonMovies = Object.keys(ratingsA).filter(id => ratingsB[id]);
  if (commonMovies.length === 0) return 0;

  let dot = 0, magA = 0, magB = 0;
  commonMovies.forEach(id => {
    dot += ratingsA[id] * ratingsB[id];
    magA += ratingsA[id] ** 2;
    magB += ratingsB[id] ** 2;
  });

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

async function getRecommendations(userId) {
  // Get all ratings from database
  const allRatings = await Rating.find().populate('movie');

  // Build a map: { userId: { movieId: rating } }
  const userRatingsMap = {};
  allRatings.forEach(r => {
    const uid = r.user.toString();
    const mid = r.movie._id.toString();
    if (!userRatingsMap[uid]) userRatingsMap[uid] = {};
    userRatingsMap[uid][mid] = r.rating;
  });

  const currentUserRatings = userRatingsMap[userId] || {};
  const ratedMovieIds = new Set(Object.keys(currentUserRatings));

  // Find similar users
  const similarities = [];
  for (const [otherId, otherRatings] of Object.entries(userRatingsMap)) {
    if (otherId === userId) continue;
    const sim = cosineSimilarity(currentUserRatings, otherRatings);
    if (sim > 0) similarities.push({ userId: otherId, sim, ratings: otherRatings });
  }

  // Sort by similarity (most similar first)
  similarities.sort((a, b) => b.sim - a.sim);
  const topUsers = similarities.slice(0, 10);

  // Score unrated movies
  const movieScores = {};
  topUsers.forEach(({ sim, ratings }) => {
    Object.entries(ratings).forEach(([movieId, rating]) => {
      if (!ratedMovieIds.has(movieId)) {
        if (!movieScores[movieId]) movieScores[movieId] = { score: 0, weight: 0 };
        movieScores[movieId].score += sim * rating;
        movieScores[movieId].weight += sim;
      }
    });
  });

  // Sort and return top 10 recommended movie IDs
  const recommended = Object.entries(movieScores)
    .map(([movieId, { score, weight }]) => ({ movieId, predicted: score / weight }))
    .sort((a, b) => b.predicted - a.predicted)
    .slice(0, 10)
    .map(r => r.movieId);

  return recommended;
}

module.exports = { getRecommendations };