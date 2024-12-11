// Base URL of your API
const apiBaseUrl = "http://localhost:8080"; // Replace with your actual back-end API URL

// Fetch and display upcoming events
async function fetchUpcomingEvents() {
    const eventsList = document.getElementById("upcoming-events-list");

    try {
        // Show a loading message while fetching events
        eventsList.innerHTML = "<p>Loading events...</p>";

        // Fetch upcoming events from the API
        const response = await fetch(`${apiBaseUrl}/api/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add 'Authorization' header if API requires authentication
                // 'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const events = await response.json();

            // Clear the loading message
            eventsList.innerHTML = "";

            if (events.length === 0) {
                eventsList.innerHTML = "<p>No upcoming events found.</p>";
                return;
            }

            // Iterate through events and create HTML structure
            events.forEach(event => {
                const eventCard = document.createElement("div");
                eventCard.classList.add("event-card");

                // Populate the event card with event details
                eventCard.innerHTML = `
                    <h3>${event.name}</h3>
                    <p><strong>Description:</strong> ${event.description}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Date:</strong> ${new Date(event.dateTime).toLocaleString()}</p>
                    <p><strong>Deadline:</strong> ${new Date(event.deadline).toLocaleString()}</p>
                `;

                // Append the event card to the events list
                eventsList.appendChild(eventCard);
            });
        } else {
            // Handle error response from API
            const errorText = await response.text();
            eventsList.innerHTML = `<p>Error fetching events: ${errorText}</p>`;
        }
    } catch (error) {
        // Handle network or other errors
        console.error("Error fetching events:", error);
        eventsList.innerHTML = "<p>An error occurred while fetching events.</p>";
    }
}

// Call the function to fetch and display events when the page loads
document.addEventListener("DOMContentLoaded", fetchUpcomingEvents);
