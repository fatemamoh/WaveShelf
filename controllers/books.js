const express = require('express');
const router = express.Router();

const Book = require('../models/book');

// CRUD routes: 

router.get('/', async (req, res) => {
    try {
        const Books = await Book.find().populate('owner');
        res.render('books/index.ejs', { Books })
    }

    catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

router.get('/new', async (req, res) => {
    try {
        res.render('books/new.ejs')
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }

})

// post: 

router.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id;
        await Book.create(req.body);
        res.redirect('/book');
    } catch (error) {
        console.error(error)
        res.redirect('/book/new')
    }
})


// SHOW: 

router.get('/:bookId', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId).populate('owner');
        res.render('books/show.ejs', { Books });
    }

    catch (error) {
        console.error(error)
        res.redirect('/book')
    }
})


module.exports = router