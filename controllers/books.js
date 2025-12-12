const express = require('express');
const router = express.Router();

const Book = require('../models/book');

// CRUD routes: 

// the book Schema:

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

router.delete('/:bookId', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id)
        if (isOwner) {
            await Books.deleteOne();
            res.redirect('/book');
        }
        else {
            res.send(" you don't have permission to do that!")
        }
    }

    catch (error) {
        console.error(error);
        res.redirect('/');
    }
})

// edit: 

router.get('/:bookId/edit', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        res.render('books/edit.ejs', { Books });
    }

    catch (error) {
        console.error(error);
        res.redirect('/');
    }

})

// update: 

router.put('/:bookId', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id)
        if (isOwner) {
            Books.set(req.body);
            await Books.save();
            res.redirect(`/book/${Books._id}`);
        }
        else {
            res.send("You don't have permission to do that.");
        }
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }


})


// the quote Schema:
router.get('/:bookId/quotes/new', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        res.render('books/quotes.ejs', { Books });

    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }
})
router.post('/:bookId/quotes', async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        const isOwner = book.owner.equals(req.session.user._id);
        if (isOwner) {
            book.quotes.push(req.body);
            await book.save();
            res.redirect(`/book/${book._id}`);
        } else {
            res.send("You don't have permission to add a quote to this book!");
        }

    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }
})

module.exports = router