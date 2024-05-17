/**
 * Initializes MongoDB connection
 * Use Mongoose to connect to MongoDB
 * Handle connection events
 */

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

// Create instance of express framework
// Where app represents our web application
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/book-library', {
	// Uses latest URL parser available to interpret connection string provided (URI)
	useNewUrlParser: true,
	// Instructs mongoose to use new Server Discovery and Monitoring engine
	useUnifiedTopology: true,
})
// Handles successful connection
.then(() => console.log('Connected to MongoDB'))
// Handles error - failed connection
.catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(express.json());

// Middleware - applied to requests that start with /api/auth
app.use('/api/auth', authRoutes);

// Retrieve PORT number || set PORT to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
