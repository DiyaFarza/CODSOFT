const Movie = require('../models/Movie');
const Rating = require('../models/Rating');

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().limit(50);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rateMovie = async (req, res) => {
  try {
    const { movieId, rating } = req.body;
    const userId = req.user.id;

    // Update or insert rating
    await Rating.findOneAndUpdate(
      { user: userId, movie: movieId },
      { rating },
      { upsert: true, new: true }
    );

    // Update movie average rating
    const ratings = await Rating.find({ movie: movieId });
    const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    await Movie.findByIdAndUpdate(movieId, { averageRating: avg.toFixed(1), totalRatings: ratings.length });

    res.json({ message: 'Rating saved!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ user: req.user.id }).populate('movie');
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};