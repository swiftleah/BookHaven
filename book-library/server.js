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
const userRoutes = require('./routes/users');

// Create instance of express framework
// Where app represents our web application
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/book-library', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(express.json());

// Middleware - serve static files from "public" dir
app.use(express.static(path.join(__dirname, 'public')));

// Middleware - applied to requests that start with /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

//Serve HTML templates
app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/dashboard', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get('/addEditBook', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'addEditBook.html'));
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

app.get('/profile', (req, res) => {
  res.sendFile(__dirname + '/public/profile.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
