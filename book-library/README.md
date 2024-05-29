# Book Library Web Application

## Overview
This is a Book Library web application that allows users to create an account, manage their personal bookshelf, and explore other users' bookshelves if they are set to public. Users can add, edit, delete books, create notes on each book, and search for books by genre.

## Features
- User Authentication (Login, Registration)
- User Profiles with privacy settings (public or private)
- Add, edit, delete books in the personal bookshelf
- View other users' public bookshelves

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Authentication**: JWT (JSON Web Token)

## Setup and Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

API Endpoints
Authentication
POST /api/auth/register - Register a new user
POST /api/auth/login - Login and get a JWT token
Books
GET /api/books - Get all books for the authenticated user
POST /api/books - Add a new book
PUT /api/books/:id - Edit a book
DELETE /api/books/:id - Delete a book
GET /api/books/search?genre=<genre> - Search books by genre
Users
GET /api/users/search?query=<query> - Search users by username or email (public profiles only)
GET /api/users/:userId/books - Get books for a user by ID (public profiles only)
PUT /api/users/me - Update authenticated user's profile (including privacy settings)
