const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getRecommendations } = require('../controllers/recommendController');
router.get('/', protect, getRecommendations);
module.exports = router;