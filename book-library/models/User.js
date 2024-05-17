/**
 * Schema for User Model
 * Defines structure of user documents
 * Specifies fields & criteria
 */

const mongoose = require('mongoose');
// Extracts Schema class so we can define structure of our documents
const Schema = mongoose.Schema();

//Creates new Schema for User model with its own fields & properties
const userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	hashedPassword: { type: String, required: true },
	profilePublic: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);
