const apiBaseUrl = "http://localhost:8080"; // Backend URL
const token = "your-auth-token-here"; // Erstat med den faktiske token-hentningslogik
// Admin oprettelse
function createAdmin() {
    const newAdmin = {
        username: document.getElementById("adminUsername").value,
        password: document.getElementById("adminPassword").value
    };

    fetch(`${apiBaseUrl}/admin/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAdmin)
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                alert("Admin created successfully!");
            }
        })
        .catch(error => {
            console.error("Error creating admin:", error);
        });
}
// Funktion til at vise eventregistreringer
function showEventRegistrations(eventId) {
    fetch(`${apiBaseUrl}/api/events/${eventId}/members`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            let registrationListHTML = `<h3>Registrations for ${data.event.name}</h3><ul>`;
            data.registrations.forEach(registration => {
                registrationListHTML += `<li>${registration.member.name}</li>`;
            });
            registrationListHTML += `</ul>`;
            document.getElementById("event-registrations").innerHTML = registrationListHTML;
        })
        .catch(error => {
            console.error("Error fetching event registrations:", error);
        });
}

// Funktion til at slette events
function deleteEvent(eventId) {
    fetch(`${apiBaseUrl}/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.ok) {
                alert("Event deleted successfully!");
                fetchEvents(); // Opdatér listen
            } else {
                alert("Error deleting event.");
            }
        })
        .catch(error => {
            console.error("Error deleting event:", error);
        });
}

// Funktion til at hente og vise events
function fetchEvents() {
    fetch(`${apiBaseUrl}/api/events`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(events => {
            let eventsListHTML = "";
            events.forEach(event => {
                eventsListHTML += `
                <div class="event-card">
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <button onclick="showEventRegistrations(${event.id})">View Registrations</button>
                    <button onclick="deleteEvent(${event.id})">Delete Event</button>
                </div>
            `;
            });
            document.getElementById("events-list").innerHTML = eventsListHTML;
        })
        .catch(error => {
            console.error("Error fetching events:", error);
        });
}

// Håndter oprettelse af nyt event
document.getElementById("createEventForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const newEvent = {
        name: document.getElementById("eventName").value,
        dateTime: document.getElementById("eventDate").value,
        description: document.getElementById("eventDescription").value,
        location: document.getElementById("eventLocation").value
    };

    fetch(`${apiBaseUrl}/api/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newEvent)
    })
        .then(response => response.json())
        .then(event => {
            alert("Event created successfully!");
            fetchEvents(); // Opdatér listen
        })
        .catch(error => {
            console.error("Error creating event:", error);
        });
});

// Hent events, når siden er indlæst
document.addEventListener("DOMContentLoaded", fetchEvents);
