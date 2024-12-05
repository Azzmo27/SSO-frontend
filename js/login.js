document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");

    // Find alle "Tilmeld"-knapper
    const registerButtons = document.querySelectorAll(".btn.register");

    registerButtons.forEach((button) => {
        if (token) {
            // Hvis brugeren er logget ind, aktiver knappen
            button.disabled = false;

            button.addEventListener("click", function () {
                const eventId = button.getAttribute("data-event-id");

                // Foretag API-kald for at tilmelde brugeren til eventet
                fetch("http://localhost:8080/api/bookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                    },
                    body: JSON.stringify({ memberId: 1, eventId: eventId }), // Justér med faktiske data
                })
                    .then((response) => {
                        if (response.ok) {
                            alert("Tilmelding lykkedes!");
                        } else {
                            response.text().then((text) => alert("Fejl: " + text));
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        alert("Noget gik galt. Prøv igen senere.");
                    });
            });
        } else {
            // Hvis brugeren ikke er logget ind, deaktiver knappen og vis en advarsel
            button.disabled = true;
            button.title = "Log ind for at tilmelde dig dette event.";
        }
    });
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };

        fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    // Gem token i localStorage og omdiriger til events siden
                    localStorage.setItem("authToken", data.token);
                    window.location.href = "../templates/events.html"; // Omdiriger til events side
                } else {
                    alert("Fejl: " + data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Noget gik galt. Prøv igen senere.");
            })
        // Antag at du har modtaget JWT-token ved login
        localStorage.setItem("authToken", token);

// Send token med i headeren i fremtidige anmodninger
        fetch("http://localhost:8080/api/protected-endpoint", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("authToken")
            }
        })
            .then(response => response.json())
            .then(data => console.log(data));
    });

});
