/**
 * Initializes MongoDB connection
 * Use Mongoose to connect to MongoDB
 * Handle connection events
 */

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const noteRoutes = require('./routes/notes');

// Create instance of express framework
// Where app represents our web application
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/book-library', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(express.json());
// Serve static files from public dir
app.use(express.static(path.join(__dirname, 'public')));

// Middleware - applied to requests that start with /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/notes', noteRoutes);

// Routes to serve html templates
app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
