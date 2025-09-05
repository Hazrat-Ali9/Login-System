document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutBtn = document.getElementById('logout-btn');

    // User database
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('signup-password').value;

        // Validation
        if (!username || !email || !phone || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (password.length < 6) {
            showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        // Check if user exists
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            showNotification('Email already registered', 'error');
            return;
        }

        // Add new user
        users.push({ username, email, phone, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        showNotification('Registration successful!', 'success');
        document.getElementById('chk').checked = true; // Switch to login
        this.reset();
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        // Find user
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Successful login
            document.querySelector('.main').style.display = 'none';
            welcomeMessage.classList.remove('hidden');
            document.getElementById('display-name').textContent = user.username;
            showNotification('Login successful!', 'success');
        } else {
            showNotification('Invalid email or password', 'error');
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        welcomeMessage.classList.add('hidden');
        document.querySelector('.main').style.display = 'block';
        loginForm.reset();
        document.getElementById('chk').checked = false;
        showNotification('Logged out successfully', 'info');
    });

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'i'}
            </span>
            <span class="notification-text">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});