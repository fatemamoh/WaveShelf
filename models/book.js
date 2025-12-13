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
            'Anger', 'Amusement', 'Grief', 'Calm', 'Fear', 'thrill', 'nostalgic',
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
        required: true
    },

    mood: {
        type: String,
        required: true,
        enum: ['thrilled', 'happy', 'excited', 'nostalgic', 'heartbroken', 'inspired', 'bored'],
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

    totalPages:{
        type: Number,
        min:1,
        required: true,
    },

    currentPage: {
        type: Number,
        default: 1,
        min:1,
    },

    status: {
        type: String,
        required: true, 
        enum:['To Read', 'Reading', 'Finished'],
        default: 'to Read',
    },

    finishDate:{
        type: Date,
    },

    reviews: [reviewSchema],
},
    {
        timestamps: true,
    })

const Book = mongoose.model('Book', bookSchema);

module.exports = Book