document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Forhindrer formularen i at blive sendt normalt

    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const department = document.getElementById('department').value;

    const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            department: department
        })
    });

    if (response.ok) {
        alert('Signup successful!');
        window.location.href = '/login';  // Omdiriger til login
    } else {
        alert('Error signing up. Please try again.');
    }
});
