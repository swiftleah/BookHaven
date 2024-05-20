/**
 * Model schema for notes made on books
 * with specific criteria
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
	content: { type: String, required: true },
	// Links note to specific book and its user
	book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
