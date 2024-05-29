document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profile-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const privacySelect = document.getElementById('privacy');

    // Fetch user profile data
    const fetchUserProfile = async () => {
        try {
            const response = await fetch('/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                usernameInput.value = data.username;
                emailInput.value = data.email;
                privacySelect.value = data.privacy;
            } else {
                alert(data.msg || 'Failed to fetch user profile');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    // Update user profile data
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const privacy = privacySelect.value;

        try {
            const response = await fetch('/api/users/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ privacy })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Profile updated successfully');
            } else {
                alert(data.msg || 'Failed to update profile');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });

    fetchUserProfile();
});

