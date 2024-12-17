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


    // Hent events for medlemmet
    try {
        const response = await fetch(`http://localhost:8080/member/events-for-member/${email}`);
        if (response.ok) {
            const events = await response.json();
            const eventsList = document.getElementById("eventsList");

            if (events.length > 0) {
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
    }

    // Log out functionality
    document.getElementById("logoutButton").addEventListener("click", () => {
        localStorage.clear();  // Ryd localStorage ved log ud
        alert("Logged out successfully!");
        window.location.href = "../templates/login.html";  // Redirect til login siden
    });
});
