/**
 * CRUD routes for books
 * create, update & del
 */

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.post('/', async (req, res) => {
	try {
		const { title, author, genre, rating } = req.body;

		const book = new Book({
			title,
			author,
			genre,
			rating,
			user: req.user.id
		});
		await book.save();
		res.status(201).json(book);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// Route to get ALL books for user
router.get('/', async (req, res) => {
	try {
		// Finds all books linked to user
		const books = await Book.find({ user: req.user.id });
		// Sends retrieved books as JSON
		res.json(books);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// Route to Update book
// Route expects paramter named 'id' in URL
Router.put('/:id', async (req, res) => {
	try {
		const { title, author, genre, rating } = req.body;

		// Finds book by id
		// Where req.params.id retrieved is from URL & findById finds book in db
		let book = await Book.findById(req.params.id);

		if (!book) return res.status(404).json({ msg: 'Book not found' });

		// Checks if book's Id matches with users Id
		if (book.user.toString() != req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		// Update changed fields || keep current value
		book.title = title || book.title;
		book.author = author || book.author;
		book.genre = genre || book.genre;
		book.rating = rating || book.rating;

		await book.save();
		// Sends updated book back in response as JSON
		res.json(book);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// Route to del book
// Route expects id in URL
Router.delete('/:id', async (req, res) => {
	try {
		// Retrieve id from book and find book by id in db
		const book = await Book.findById(req.params.id);

		if (!book) return res.status(404).json({ msg: 'Book not found' });

		if (book.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		await book.remove();
		res.json({ msg: 'Book removed' });
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
