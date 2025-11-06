const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    }, { collection: 'movies' });

module.exports = mongoose.model('Movie', MovieSchema);