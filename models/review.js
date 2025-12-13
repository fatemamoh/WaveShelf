const mongoose =  require('mongoose'); 

// new page for reviews:

const reviewSchema = new mongoose.Schema({
    content:{
        type:String,
        required: true,
    }, 
    rating: {
        type:Number,
        min: 1,
        max:5,
        required: true,

    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, 

},{
        timestamps: true
    });

    module.exports = mongoose.model('Review', reviewSchema);