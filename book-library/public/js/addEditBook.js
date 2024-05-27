document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const formTitle = document.getElementById('form-title');
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    const fetchBook = async (id) => {
        try {
            const response = await fetch(`/api/books/${id}`);
            const data = await response.json();
            if (response.ok) {
                document.getElementById('title').value = data.title;
                document.getElementById('author').value = data.author;
                document.getElementById('genre').value = data.genre;
                document.getElementById('rating').value = data.rating;
                formTitle.textContent = 'Edit Book';
            } else {
                alert(data.msg || 'Failed to fetch book details');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    if (bookId) {
        fetchBook(bookId);
    }

    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;
        const rating = document.getElementById('rating').value;

        try {
            const method = bookId ? 'PUT' : 'POST';
            const endpoint = bookId ? `/api/books/${bookId}` : '/api/books';
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title, author, genre, rating })
            });
            const data = await response.json();
            if (response.ok) {
                alert(bookId ? 'Book updated successfully' : 'Book added successfully');
                window.location.href = '/dashboard';
            } else {
                alert(data.msg || (bookId ? 'Failed to update book' : 'Failed to add book'));
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });
});

