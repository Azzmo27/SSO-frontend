document.addEventListener("DOMContentLoaded", async () => {
    const email = localStorage.getItem("memberEmail");
    const username = localStorage.getItem("username");

    // Hvis brugeren ikke er logget ind, redirect dem til login-siden
    if (!email || !username) {
        alert("You are not logged in!");
        window.location.href = "../templates/login.html";
        return;
    }

    // Vis brugeroplysninger på dashboardet
    document.getElementById("memberName").innerText = username;
    document.getElementById("username").innerText = username;
    document.getElementById("email").innerText = email;

     // Hent password fra inputfeltet

    try {
        // Send login-anmodning til backend
        const response = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                  // Brug brugerens input password
            })
        });

        // Håndter responsen
        if (response.ok) {
            const data = await response.json();
            console.log("Response keys:", Object.keys(data));
            console.log("User Data from Backend:", data);

            // Vis medlemsstatus (hvis ønsket)
            document.getElementById("membershipStatus").innerText = data.membershipStatus || "Unknown";

            // Kun de nødvendige oplysninger vises
            document.getElementById("department").innerText = "Not available";  // Fjernet fra backend
            document.getElementById("studyField").innerText = "Not available";  // Fjernet fra backend
            document.getElementById("educationLevel").innerText = "Not available";  // Fjernet fra backend
        } else {
            console.error("Failed to fetch user data:", await response.text());
        }
    } catch (error) {
        console.error("Error loading user data:", error);
    }

    // Hent events for medlemmet
    try {
        const eventsResponse = await fetch(`http://localhost:8080/member/events-for-member/${email}`);
        if (eventsResponse.ok) {
            const events = await eventsResponse.json();
            const eventsList = document.getElementById("eventsList");

            if (events.length > 0) {
                eventsList.innerHTML = ""; // Ryd eksisterende events, hvis der er nogen
                events.forEach(event => {
                    const eventItem = document.createElement("div");
                    eventItem.classList.add("event-item");
                    eventItem.innerHTML = `
                        <h3>${event.name}</h3>
                        <p>${event.description}</p>
                        <p><strong>Date:</strong> ${event.date}</p>
                    `;
                    eventsList.appendChild(eventItem);
                });
            } else {
                eventsList.innerHTML = "<p>You are not registered for any events.</p>";
            }
        } else {
            throw new Error("Failed to fetch events.");
        }
    } catch (error) {
        console.error("Error loading events:", error);
        document.getElementById("eventsList").innerHTML = "<p>Could not load your events. Please try again later.</p>";
    }

    // Log out functionality
    document.getElementById("logoutButton").addEventListener("click", () => {
        console.log("Logout button clicked"); // Tilføjet log for at fejlsøge
        localStorage.clear();  // Ryd localStorage ved log ud
        alert("Logged out successfully!");
        window.location.href = "../templates/login.html";  // Redirect til login-siden
    });
});
