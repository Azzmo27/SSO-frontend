console.log("jeg er hvor du medlem");

const urlSignup = "http://localhost:8080/api/auth/signup";

document.addEventListener("DOMContentLoaded", function () {
    const membershipType = document.getElementById("membershipType");
    const department = document.getElementById("department");
    const signupForm = document.getElementById("signupForm");

    // Når medlemstypen ændres
    membershipType.addEventListener("change", function () {
        if (membershipType.value === "Aktiv") {
            // Gør "Department" påkrævet og aktiver det
            department.disabled = false;
            department.required = true;
        } else {
            // Deaktiver og gør "Department" ikke påkrævet
            department.disabled = true;
            department.required = false;
        }
    });

    // Ekstra validering ved indsendelse af formular
    signupForm.addEventListener("submit", async function (event) {
        // Stop indsendelse hvis afdeling ikke er valgt ved "Aktiv"
        if (membershipType.value === "Aktiv" && department.value === "") {
            event.preventDefault(); // Stop indsendelse
            alert("For aktivt medlemskab skal du vælge en afdeling.");
            return; // Forhindre videre eksekvering
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

            // Kald signup-funktionen
            const response = await signup(urlSignup, formData);
            const data = await response.json();

            // Log hele responsen til konsollen
            console.log("Response data:", data);

            if (response.ok) {
                alert("Signup successful!");
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
        const response = await fetch(url, fetchOptions);
        return await fetch(url, fetchOptions);
    }
});
