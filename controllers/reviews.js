const express = require('express');
const router = express.Router();

const Book = require('../models/book');
const Review = require('../models/review');

// CRUD routes: 
   // review routes:

// create: 

router.get('/' , async (req, res)=> {
    try {
        const finishedBooks = await Book.find({
            owner: req.session.user._id,
            status: 'Finished'
        });
        const reviewedBookIds = await Review.find({
            author: req.session.user._id}, 'book');

        const reviewedIds = reviewedBookIds.map(r => r.book.toString());    

        const booksToReview = finishedBooks.filter(book => 
            !reviewedIds.includes(book._id.toString())
        );
        res.render('reviews/index.ejs', { booksToReview,}); 
    } 
    
    catch (error) {
          console.error(error)
        res.redirect('/book')
    }
})

module.exports = router;