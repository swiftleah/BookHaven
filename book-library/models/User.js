/**
 * Schema for User Model
 * Defines structure of user documents
 * Specifies fields & criteria
 */

const mongoose = require('mongoose');
// Extracts Schema class so we can define structure of our documents
const { Schema } = mongoose;

//Creates new Schema for User model with its own fields & properties
const userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	privacy: { type: String, enum: ["public", "private"], default: "public" },
});

module.exports = mongoose.model('User', userSchema);
