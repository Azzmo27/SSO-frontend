fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: "john.doe@example.com",
        password: "password123"
    })
})
    .then(response => response.json()) // Sørg for at parse JSON svaret
    .then(data => {
        if (data.message) {
            console.log(data.message); // F.eks. Login successful!
        }
    })
    .catch(error => console.error('Error:', error));
