// Flyt `showEventRegistrations` til globalt niveau udenfor DOMContentLoaded
function showEventRegistrations(eventId) {
    const apiBaseUrl = "http://localhost:8080"; // Backend URL
    const token = "your-auth-token-here";  // Hent eller generer token for autenticering (f.eks. via login)

    fetch(`${apiBaseUrl}/api/events/${eventId}/members`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Admin-authorization
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

document.addEventListener("DOMContentLoaded", function() {
    const apiBaseUrl = "http://localhost:8080"; // Backend URL
    const token = "your-auth-token-here";  // Hent eller generer token for autenticering (f.eks. via login)

    // Hent alle events
    fetch(`${apiBaseUrl}/api/events`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Admin-authorization
        }
    })
        .then(response => response.json())
        .then(events => {
            let eventsListHTML = "";
            events.forEach(event => {
                eventsListHTML += `
                <div>
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
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

    // Håndter oprettelse af event
    document.getElementById("createEventForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const newEvent = {
            name: document.getElementById("eventName").value,
            dateTime: document.getElementById("eventDate").value,
            description: document.getElementById("eventDescription").value, // Brug input felt
            location: document.getElementById("eventLocation").value // Brug input felt
        };

        fetch(`${apiBaseUrl}/api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Admin-authorization
            },
            body: JSON.stringify(newEvent)
        })
            .then(response => response.json())
            .then(event => {
                alert("Event created successfully!");
            })
            .catch(error => {
                console.error("Error creating event:", error);
            });
    });

    // Slet event
    function deleteEvent(eventId) {
        fetch(`${apiBaseUrl}/api/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` // Admin-authorization
            }
        })
            .then(response => {
                if (response.ok) {
                    alert("Event deleted successfully!");
                    location.reload();  // Genindlæs dashboardet for at opdatere listen
                } else {
                    alert("Error deleting event.");
                }
            })
            .catch(error => {
                console.error("Error deleting event:", error);
            });
    }
});
