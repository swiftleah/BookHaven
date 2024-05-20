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
		res.json(books);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// Route to Update book
Router.put('/:id', async (req, res) => {
	try {
		const { title, author, genre, rating } = req.body;
		let book = await Book.findById(req.params.id);

		if (!book) return res.status(404).json({ msg: 'Book not found' });

		if (book.user.toString() != req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		book.title = title || book.title;
		book.author = author || book.author;
		book.genre = genre || book.genre;
		book.rating = rating || book.rating;

		await book.save();
		res.json(book);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// Route to del book
Router.delete('/:id', async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);

		if (!book) return res.status(404).json({ msg: 'Book not found' });

		if (book.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		await book.save();
		res.json({ msg: 'Book removed' });
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
