const express = require('express');
const { getAllMovies, addMovie, deleteMovie, getMovieById } = require('../controllers/movieController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getAllMovies);
router.get('/:id', protect, getMovieById);
router.post('/', protect, admin, addMovie);
router.delete('/:id', protect, admin, deleteMovie);

module.exports = router;