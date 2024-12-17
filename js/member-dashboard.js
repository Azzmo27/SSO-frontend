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

    try {
        const response = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: "userPassword" }) // Juster adgangskoden, hvis nødvendigt
        });

        if (response.ok) {
            const data = await response.json();
            console.log("User Data:", data); // Log til debugging

            // Vis medlemsstatus
            document.getElementById("membershipStatus").innerText = `Status: ${data.membershipType}`;

            if (data.membershipType === "Active") {
                // Kun for aktive medlemmer
                document.getElementById("department").innerText = `Department: ${data.department || "Not assigned"}`;
                document.getElementById("studyField").innerText = `Study Field: ${data.studyField || "Not assigned"}`;
                document.getElementById("educationLevel").innerText = `Education Level: ${data.educationLevel || "Not specified"}`;
            } else {
                // Skjul felter for inaktive medlemmer
                document.getElementById("department").innerText = "";
                document.getElementById("studyField").innerText = "";
                document.getElementById("educationLevel").innerText = "";
            }
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
        localStorage.clear();  // Ryd localStorage ved log ud
        alert("Logged out successfully!");
        window.location.href = "../templates/login.html";  // Redirect til login siden
    });
});


