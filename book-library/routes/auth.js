/**
 * User Authentication
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// User registration - website'/register'
router.post('/register', async (req, res) => {
	try {
		// Data sent by client to server
		// Destructuring to extract these properties and assigns them to variables
		const { username, email, password } = req.body;

		// Check if user is already in db
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({message: 'User already exists' });
		}

		// Generates salt to be combined with password before hashing
		const salt = await.bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Update user with new hashed password
		user = new User({
			username,
			email,
			password: hashedPassword
		});

		// Save new user info with the hashed password above
		await user.save();

		res.status(201).json({message: 'User registered successfully' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
