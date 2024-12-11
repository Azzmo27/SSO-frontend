const apiBaseUrl = "http://localhost:8080"; // Backend API URL

// Fetch upcoming events and display them
const fetchEvents = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/events");
        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.statusText}`);
        }
        const events = await response.json();
        console.log("Fetched events:", events); // Log the response
        const eventsList = document.getElementById("events-list");
        eventsList.innerHTML = ""; // Clear existing content
        events.forEach(event => {
            const eventDiv = document.createElement("div");
            eventDiv.innerHTML = `
                <h3>${event.name}</h3>
                <p>${event.description}</p>
                <p>Location: ${event.location}</p>
                <p>Date and Time: ${event.dateTime}</p>
                <p>Deadline: ${event.deadline}</p>
            `;
            eventsList.appendChild(eventDiv);
        });
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

// Handle form submission for creating an event
document.getElementById("createEventForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const eventName = document.getElementById("eventName").value;
    const eventDescription = document.getElementById("eventDescription").value;
    const eventLocation = document.getElementById("eventLocation").value;
    const eventDateTime = document.getElementById("eventDateTime").value;
    const eventDeadline = document.getElementById("eventDeadline").value;

    const newEvent = {
        name: eventName,
        description: eventDescription,
        location: eventLocation,
        dateTime: eventDateTime,
        deadline: eventDeadline,
    };

    fetch(`${apiBaseUrl}/api/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to create event: ${response.statusText}`);
            }
            alert("Event created successfully!");
            return fetchEvents(); // Refresh the events list by calling fetchEvents() again
        })
        .catch(error => {
            console.error("Error creating event:", error);
        });
});

fetchEvents().then(() => {
    console.log("Events fetched and displayed.");
}).catch(error => {
    console.error("Error fetching events:", error);
});