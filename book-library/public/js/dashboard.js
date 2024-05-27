document.addEventListener('DOMContentLoaded', () => {
    const addBookBtn = document.getElementById('add-book-btn');
    const booksList = document.getElementById('books-list');
    const searchForm = document.getElementById('search-form');

    addBookBtn.addEventListener('click', () => {
        window.location.href = '/addEditBook';
    });

    const fetchBooks = async (query = '') => {
        try {
            const response = await fetch(`/api/books${query}`);
            const data = await response.json();
            if (response.ok) {
                renderBooks(data);
            } else {
                alert(data.msg || 'Failed to fetch books');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const renderBooks = (books) => {
        booksList.innerHTML = '';
        books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Genre: ${book.genre}</p>
                <p>Rating: ${book.rating}</p>
                <button class="btn btn-primary edit-btn" data-id="${book._id}">Edit</button>
                <button class="btn btn-danger delete-btn" data-id="${book._id}">Delete</button>
            `;
            booksList.appendChild(bookItem);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const bookId = e.target.getAttribute('data-id');
                window.location.href = `/addEditBook?id=${bookId}`;
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const bookId = e.target.getAttribute('data-id');
                try {
                    const response = await fetch(`/api/books/${bookId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        alert('Book deleted successfully');
                        fetchBooks();
                    } else {
                        alert(data.msg || 'Failed to delete book');
                    }
                } catch (err) {
                    console.error('Error:', err);
                }
            });
        });
    };

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchQuery = document.getElementById('search').value;
        fetchBooks(`?genre=${searchQuery}`);
    });

    fetchBooks();
});

