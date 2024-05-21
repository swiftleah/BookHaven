/**
 * CRUD operations for notes
 */

const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.post('/', async (req, res) => {
	try {
		const { content, bookId } = req.body;
		const note = new Note({
			content,
			book: bookId,
			user: req.user.id
		});

		await note.save();
		res.status(201).json(note);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

router.get('/:bookId', async (req, res) => {
	try {
		const notes = await Note.find({ book: req.params.bookId, user: req.user.id });
		res.json(notes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { content } = req.body;
		let note = await Note.findById(req.params.id);

		if (!note) return res.status(404).json({ msg: 'Note not found' });

		if (note.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		note.content = content || note.content;

		await note.save()
		res.json(note);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);

		if (!note) return res.status(404).json({ msg: 'Note not found' });

		if (note.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		await note.remove();
		res.json({ msg: 'Note removed' });
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
