document.addEventListener("DOMContentLoaded", function () {
    const membershipType = document.getElementById("membershipType");
    const department = document.getElementById("department");
    const signupForm = document.getElementById("signupForm");

    const urlSignup = "http://localhost:8080/api/auth/signup";  // Signup URL
    const urlLogin = "http://localhost:8080/api/auth/login";    // Login URL
    // Tjek om signupForm findes
    if (!signupForm) {
        console.error("signupForm elementet blev ikke fundet i DOM'en.");
        return; // Stop scriptet, hvis formularen ikke findes
    }

    // Tjek om alle nødvendige elementer findes
    if (!membershipType || !department) {
        console.error("Et eller flere nødvendige elementer blev ikke fundet i DOM'en.");
        return;
    }

    // Når medlemstypen ændres
    membershipType.addEventListener("change", function () {
        if (membershipType.value === "Aktiv") {
            department.disabled = false;
            department.required = true;
        } else {
            department.disabled = true;
            department.required = false;
        }
    });

    // Ekstra validering ved indsendelse af signup-formular
    signupForm.addEventListener("submit", async function (event) {
        if (membershipType.value === "Aktiv" && department.value === "") {
            event.preventDefault();
            alert("For aktivt medlemskab skal du vælge en afdeling.");
            return;
        }

        try {
            const formData = {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                name: document.getElementById("name").value,
                lastName: document.getElementById("lastName").value,
                department: department.value,
                membershipType: membershipType.value
            };

            const response = await signup(urlSignup, formData);
            const data = await response.json();

            console.log("Response data:", data);

            if (response.ok) {
                alert("Signup successful!");
                // Omdiriger brugeren til member dashboard
                window.location.href = "../templates/member_dashboard.html"; // Rediger stien til din member dashboard fil
            } else {
                alert("Error: " + (data.message || "Something went wrong."));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    });

    // Signup-funktion til at lave POST-anmodningen
    async function signup(url, data) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        return await fetch(url, fetchOptions);
    }

    // Login-funktion (kan være nyttig til senere brug, f.eks. ved auto-login efter signup)
    async function login(email, password) {
        const response = await fetch(urlLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Login successful', data);
            alert("Login successful!");
        } else {
            console.log('Login failed', data.message);
            alert("Login failed: " + data.message);
        }
    }
});
