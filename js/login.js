document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop formen fra at blive sendt på den normale måde

    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Sender som JSON
        },
        body: JSON.stringify({
            role: role,
            email: email,
            password: password
        })
    });

    if (response.ok) {
        // Login succesfuld - redirect til dashboard
        window.location.href = "/dashboard";
    } else {
        // Login mislykkedes - vis en fejlmeddelelse
        alert("Invalid credentials. Please try again.");
    }
});

document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop formen fra at blive sendt på den normale måde

    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;
    const role = document.getElementById('new-role').value;

    const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Sender som JSON
        },
        body: JSON.stringify({
            email: email,
            password: password,
            role: role
        })
    });

    if (response.ok) {
        // Tilmelding succesfuld - redirect til login
        alert("Tilmelding succesfuld! Du kan nu logge ind.");
        window.location.href = "/login";
    } else {
        // Tilmelding mislykkedes - vis en fejlmeddelelse
        alert("Tilmelding mislykkedes. Prøv igen.");
    }
});
