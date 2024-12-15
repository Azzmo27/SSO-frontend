const apiUrl = 'http://localhost:8080/api/events';  // Juster denne URL til din API-endpoint

// Load upcoming events
function loadUpcomingEvents() {
    fetch(`${apiUrl}/getAllEvents`)
        .then(response => response.json())
        .then(events => {
            const eventGridElement = document.querySelector('.event-grid');  // Brug event-grid containeren fra HTML
            eventGridElement.innerHTML = '';  // Ryd listen først

            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event-card');  // Ændret fra 'event-box' til 'event-card'

                eventElement.innerHTML = `
                    <h2>${event.name}</h2>
                    <p>${event.description}</p>
                    <p><strong>Dato:</strong> ${event.date}</p>
                    <p><strong>Medlemmer tilmeldt:</strong> ${event.members.length}</p>
                    <button class="btn signup-btn" data-event-id="${event.id}">Tilmeld dig</button>  <!-- Knap med signup-btn -->
                `;

                eventGridElement.appendChild(eventElement);  // Tilføj event kortet til grid-containeren
            });

            // Add event listeners to the "Tilmeld dig" buttons
            document.querySelectorAll('.signup-btn').forEach(button => {
                button.addEventListener('click', event => {
                    const eventId = event.target.getAttribute('data-event-id');
                    signUpForEvent(eventId);
                });
            });
        })
        .catch(error => console.error('Error:', error));
}

// Sign up for an event
function signUpForEvent(eventId) {
    const memberEmail = prompt("Indtast din email for at tilmelde dig dette event:");
    if (!memberEmail) {
        alert("Du skal indtaste en email for at fortsætte.");
        return;
    }

    fetch(`${apiUrl}/addMemberToEvent/${eventId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: memberEmail })
    })
        .then(response => response.json())
        .then(data => {
            alert('Du er nu tilmeldt eventet!');
            loadUpcomingEvents(); // Genindlæs listen for at vise opdaterede data
        })
        .catch(error => console.error('Error:', error));
}

// Load events when the page loads
window.onload = function() {
    loadUpcomingEvents();
};
