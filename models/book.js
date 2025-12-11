const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true,
    },

    genre: {
        type: String,
        required: true
    },

    mood: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

})

const Book = mongoose.model('Book', bookSchema); 

module.exports = Book