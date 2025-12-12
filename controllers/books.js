const express = require('express');
const router = express.Router();

const Book = require('../models/book');

// CRUD routes: 

// create: 

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


// show: 

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

// delete:
router.delete('/:bookId', async (req,res)=>{
    try {
    const Books = await Book.findById(req.params.bookId);
    const isOwner = Books.owner.equals(req.session.user._id)
    if (isOwner){
        await Books.deleteOne();
        res.redirect('/book');
    }   
    else {
        res.send(" you don't have permission to dp that!")
    }
    } 
    
    catch (error) {
        console.error(error);
        res.redirect('/');
    }
})

module.exports = router