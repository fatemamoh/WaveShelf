const express = require('express');
const router = express.Router();

const Book = require('../models/book');

// CRUD routes: 

// the book Schema:

// create: 

router.get('/', async (req, res) => {
    try {
        const Books = await Book.find({ owner: req.session.user._id }).populate('owner');
        res.render('books/index.ejs', { Books })
    }
    
    catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

// to read: 
router.get('/toRead', async (req, res) => {
    try {
        const Books = await Book.find({ owner: req.session.user._id }).populate('owner');
        res.render('books/toRead.ejs', { Books })
    }

    catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

// reading:
router.get('/reading', async (req, res) => {
    try {
        const Books = await Book.find({ owner: req.session.user._id }).populate('owner');
        res.render('books/reading.ejs', { Books })
    }

    catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

// finished:
router.get('/finished', async (req, res) => {
    try {
        const Books = await Book.find({ owner: req.session.user._id }).populate('owner');
        res.render('books/finished.ejs', { Books })
    }

    catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

// new:
router.get('/new', async (req, res) => {
    res.render('books/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id;
        const Books = await Book.create(req.body);
        res.redirect('/book')
    }
    catch (error) {
        console.error(error)
        res.redirect('/book')
    }
});


// show:
router.get('/:bookId', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId).populate('owner');
        res.render('books/show.ejs', { Books });
    } catch (error) {
        console.error(error);
        res.redirect('/book');
    }
});

// edit:
router.get('/:bookId/edit', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            res.render('books/edit.ejs', { Books });
        } else {
            res.send("You don't have permission to edit this book!");
        }

    } catch (error) {
        console.error(error);
        res.redirect('/book');
    }
});

// delete:
router.delete('/:bookId', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            await Books.deleteOne();
            res.redirect('/book');
        } else {
            res.send("You don't have permission to delete this book!");
        }

    } catch (error) {
        console.error(error);
        res.redirect('/book');
    }
});

// update:
router.put('/:bookId', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            await Books.updateOne(req.body);
            res.redirect(`/book/${Books._id}`)
        } else {
            res.send("You don't have permission to update this book!");
        }

    } catch (error) {
        console.error(error);
        res.redirect('/book');
    }
});


// quotes routes:

// create quote (GET route updated to /quotes/new)
router.get('/:bookId/quotes/new', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            res.render('books/quotes.ejs', { Books });
        } else {
            res.send("You don't have permission to add a quote to this book!");
        }

    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }
});

router.post('/:bookId/quotes', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            Books.quotes.push(req.body);
            await Books.save();
            res.redirect(`/book/${Books._id}`);
        } else {
            res.send("You don't have permission to add a quote to this book!");
        }
    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }
});

// edit quote:
router.get('/:bookId/quotes/:quoteId/edit', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            const quote = Books.quotes.id(req.params.quoteId);
            res.render('books/editQuote.ejs', { Books, quote });
        } else {
            res.send("You don't have permission to edit this quote!");
        }

    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }
});

// update quote:
router.put('/:bookId/quotes/:quoteId', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            const quoteToUpdate = Books.quotes.id(req.params.quoteId);
            if (quoteToUpdate) {
                // Update fields
                quoteToUpdate.quote = req.body.quote;
                quoteToUpdate.pageNumber = req.body.pageNumber;
                quoteToUpdate.emotion = req.body.emotion;
                quoteToUpdate.personalNote = req.body.personalNote;
                await Books.save();
                res.redirect(`/book/${Books._id}`);
            } else {
                res.send("Quote not found!");
            }
        } else {
            res.send("You don't have permission to update this quote!");
        }
    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }
});


// delete quote:
router.delete('/:bookId/quotes/:quoteId', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            Books.quotes.id(req.params.quoteId).remove();
            await Books.save();
            res.redirect(`/book/${Books._id}`);
        } else {
            res.send("You don't have permission to delete this quote!");
        }
    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }
})



// create review (GET route updated to /review/new)
router.get('/:bookId/review/new', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            res.render('books/review.ejs', { Books });
        } else {
            res.send("You don't have permission to add a review!");
        }
    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }
});

router.post('/:bookId/review', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            Books.reviews.push(req.body); 
            Books.status = 'Finished'; 
            Books.finishDate = new Date();
            await Books.save();
            res.redirect(`/book/${Books._id}`);
        } else {
            res.send("You don't have permission to add a review!");
        }
    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }
});

// edit review:
router.get('/:bookId/review/:reviewId/edit', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            const review = Books.reviews.id(req.params.reviewId);
            res.render('books/editReview.ejs', { Books, review });
        } else {
            res.send("You don't have permission to edit this review!");
        }

    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }
});

// update review
router.put('/:bookId/review/:reviewId', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            const reviewToUpdate = Books.reviews.id(req.params.reviewId);
            if (reviewToUpdate) {
                reviewToUpdate.reviewText = req.body.reviewText;
                reviewToUpdate.rating = req.body.rating;
                await Books.save();
                res.redirect(`/book/${Books._id}`);
            } else {
                 res.send("Review not found!");
            }
        } else {
            res.send("You don't have permission to edit this review!");
        }
    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }
});


// delete review:
router.delete('/:bookId/review/:reviewId', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
        Books.reviews.id(req.params.reviewId).deleteOne();
        await Books.save();
        res.redirect(`/book/${Books._id}`);
        } else {
            res.send("You don't have permission to delete this review!");
        }
    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }

})

// progress bar:

router.put('/:bookId/progress', async (req, res) => {
    try {
        const Books = await Book.findById(req.params.bookId);
        const isOwner = Books.owner.equals(req.session.user._id);

        if (isOwner) {
            let newPage = parseInt(req.body.currentPage);
            if (isNaN(newPage) || newPage < 1) {
                newPage = Books.currentPage;
            }

            if (newPage > Books.totalPages) {
                newPage = Books.totalPages;
            }

            if (newPage > 0 && Books.status === 'To Read') {
                Books.status = 'Reading';
            }

            if (newPage === Books.totalPages && Books.status !== 'Finished') {
                Books.status = 'Finished';
            }

            Books.currentPage = newPage;
            await Books.save();
            res.redirect(`/book/${Books._id}`)

        } else {
            res.send("You don't have permission to update this book's progress.");
        }
    } catch (error) {
        console.error(error);
        res.redirect(`/book/${req.params.bookId}`);
    }
});

module.exports = router;