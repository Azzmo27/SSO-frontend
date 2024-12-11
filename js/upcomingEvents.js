const apiBaseUrl = "http://localhost:8080"; // Backend API URL

// Fetch events og vis dem på siden (GET request)
const fetchUpcomingEvents = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/api/events`);
        if (!response.ok) {
            throw new Error("Failed to fetch events.");
        }
        const events = await response.json();
        console.log("Fetched events:", events);
        displayEvents(events); // Funktion til at vise events på UI
    } catch (err) {
        console.error("Error fetching events:", err);
    }
};

// Funktion til at vise events på UI
const displayEvents = (events) => {
    const eventsList = document.getElementById("events-list");
    eventsList.innerHTML = ""; // Tøm eksisterende liste

    // Iterer gennem events og opret HTML for hver
    events.forEach((event) => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");
        eventElement.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Date:</strong> ${new Date(event.dateTime).toLocaleString()}</p>
        `;
        eventsList.appendChild(eventElement);
    });
};

// Event listener for at oprette et nyt event (POST request)
document.getElementById("createEventForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Forhindrer standard formularindsendelse

    const event = {
        name: document.getElementById("eventName").value,
        description: document.getElementById("eventDescription").value,
        location: document.getElementById("eventLocation").value,
        dateTime: document.getElementById("eventDateTime").value,
        deadline: document.getElementById("eventDeadline").value,
    };

    try {
        const response = await fetch(`${apiBaseUrl}/api/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            throw new Error("Failed to create event.");
        }

        const createdEvent = await response.json();
        console.log("Event created:", createdEvent);
        alert("Event successfully created!");
        await fetchUpcomingEvents(); // Opdater listen med events efter oprettelse
    } catch (err) {
        console.error("Error creating event:", err);
        alert("Error creating event.");
    }
});

// Kald fetchUpcomingEvents for at hente events ved page load
document.addEventListener("DOMContentLoaded", () => {
    fetchUpcomingEvents().then(() => {
        console.log("Events fetched successfully.");
    }).catch(err => {
        console.error("Error fetching events:", err);
    });
});