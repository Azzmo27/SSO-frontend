document.addEventListener("DOMContentLoaded", () => {
    // Set default selection to "PASSIVE"
    const membershipTypeSelect = document.getElementById("membershipType");
    membershipTypeSelect.value = "PASSIVE"; // Set to "PASSIVE" by default

    // Trigger the change event to hide department and study field
    const event = new Event("change");
    membershipTypeSelect.dispatchEvent(event);
});

document.getElementById("createUserForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Hent værdier fra inputfelterne
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const education = document.getElementById("education").value;
    const educationLevel = document.getElementById("educationLevel").value;

    const membershipType = document.getElementById("membershipType").value;
    let department = null;
    let studyField = null;

    if (membershipType === "ACTIVE") {
        department = document.getElementById("department").value;
        studyField = document.getElementById("studyfield").value;
    }

    // API-endpoint til at oprette bruger
    const endpoint = "http://localhost:8080/api/users/create-member";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
                education,
                educationLevel,
                membershipType,
                department,
                studyField,
            }),
        });

        // Håndtering af respons
        if (response.ok) {
            alert("Bruger oprettet med succes!");
            // Redirect to login page after successful user creation
            window.location.href = "../templates/login.html";
        } else {
            const errorMessage = await response.text();
            alert("Fejl: " + errorMessage);
        }
    } catch (error) {
        console.error("Fejl:", error);
        alert("Der opstod en fejl ved oprettelsen af brugeren.");
    }
});

// Håndter visning af department og studyfield-containere
document.getElementById("membershipType").addEventListener("change", (event) => {
    const departmentContainer = document.getElementById("departmentContainer");
    const studyFieldContainer = document.getElementById("studyFieldContainer");

    if (event.target.value === "ACTIVE") {
        departmentContainer.style.display = "block";
        studyFieldContainer.style.display = "block";
    } else {
        departmentContainer.style.display = "none";
        studyFieldContainer.style.display = "none";
    }
});
