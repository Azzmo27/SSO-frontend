document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the normal way

    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Set the form action based on the selected role
    let loginUrl = '';
    if (role === 'admin') {
        loginUrl = 'http://localhost:8080/admin/login'; // Admin login URL
    } else {
        loginUrl = 'http://localhost:8080/member/login'; // Member login URL
    }

    const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',  // Form submission content type
        },
        body: new URLSearchParams({
            email: email,
            password: password
        }),
        credentials: 'same-origin' // Ensure session cookies are sent
    });

    if (response.ok) {
        // Login successful - redirect to the appropriate dashboard
        if (role === 'admin') {
            window.location.href = "/admin/dashboard"; // Admin dashboard
        } else {
            window.location.href = "/member/dashboard"; // Member dashboard
        }
    } else {
        // Login failed - show error message
        alert("Invalid credentials. Please try again.");
    }
});
