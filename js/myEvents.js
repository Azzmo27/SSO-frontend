document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("authToken");

    // Find alle "Tilmeld"-knapper
    const registerButtons = document.querySelectorAll(".btn.register");

    registerButtons.forEach((button) => {
        button.addEventListener("click", function() {
            if (!token) {
                // Hvis brugeren ikke er logget ind, omdiriger til login-siden
                window.location.href = "../templates/login.html";
            } else {
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
            }
        });
    });
});
