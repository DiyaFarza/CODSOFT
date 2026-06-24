const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getMovies, rateMovie, getUserRatings } = require('../controllers/movieController');
router.get('/', protect, getMovies);
router.post('/rate', protect, rateMovie);
router.get('/my-ratings', protect, getUserRatings);
module.exports = router;