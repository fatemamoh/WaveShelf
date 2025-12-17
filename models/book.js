const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewText:{
        type:String,
        required: true,
    }, 
    rating: {
        type:Number,
        min: 1,
        max:5,
        required: true,

    },
});

const quoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true,
    },

    pageNumber: {
        type: Number,
        required: true,
        min: 1,
    },

    emotion: {
        type: String,
        required: true,
        enum: [
            'Anger', 'Amusement', 'Grief', 'Calm', 'Fear', 'Thrill', 'Nostalgic',
        ],
        default: 'Amusement',
    },

    personalNote: {
        type: String,
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },
});

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
        required: true,
        enum: [
            'Fiction', 
            'Non-Fiction', 
            'Fantasy', 
            'Mystery', 
            'Sci-Fi', 
            'Romance', 
            'Horror', 
            'Biography', 
            'History'
        ],
        default: 'Fiction'
    },

    image:{
        type:String,
        required: true,

    },

    mood: {
        type: String,
        required: true,
        enum: ['Thrilled', 'Happy', 'Excited', 'Nostalgic', 'Heartbroken', 'Inspired', 'Bored'],
        default: 'happy'
    },

    startDate: {
        type: Date,
        required: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    quotes: [quoteSchema],
    
    reviews: [reviewSchema], 

    totalPages:{
        type: Number,
        min:1,
        required: true,
    },

    currentPage: {
        type: Number,
        min: 0,
        default: 0,
    },

    status: {
        type: String,
        required: true,
        enum: ['To Read', 'Reading', 'Finished'],
        default: 'To Read',
    },

    finishDate: {
        type: Date,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('Book', bookSchema);