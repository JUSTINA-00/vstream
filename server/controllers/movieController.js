const Movie = require('../models/Movie');

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.addMovie = async (req, res) => {
    const { title, description, youtubeUrl } = req.body;
    try {
        const newMovie = new Movie({ title, description, youtubeUrl });
        const movie = await newMovie.save();
        res.json(movie);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ msg: 'Movie not found' });
        }

        // This is the modern, correct way to delete the document
        await Movie.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Movie removed successfully' });

    } catch (err) {
        console.error("Error in deleteMovie controller:", err.message);
        res.status(500).send('Server error');
    }
};

exports.getMovieById = async (req, res) => {
    console.log("--- Request to getMovieById received ---");

    const movieId = req.params.id;
    console.log("Received ID from request params:", movieId);

    try {
        // We will now check the database directly
        const movie = await Movie.findById(movieId);

        console.log("Result from DB search (Movie.findById):", movie);

        if (!movie) {
            console.log("Movie was not found. Sending 404.");
            return res.status(404).json({ msg: 'Movie not found' });
        }

        console.log("Movie found! Sending movie data.");
        res.json(movie);

    } catch (err) {
        console.error("!!! An error occurred during the database search !!!");
        console.error(err.message);
        res.status(500).send('Server error');
    }
};