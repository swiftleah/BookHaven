/**
 * Model Schema for books
 * contains all details
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	genre: { type: String, required: true },
	rating: { type: Number, default: 0 },
	// Links book/note to user
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
