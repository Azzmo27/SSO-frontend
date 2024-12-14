const apiUrl = 'http://localhost:8080/api/events';  // Adjust this URL to your actual API endpoint

// Load upcoming events
function loadUpcomingEvents() {
    fetch(`${apiUrl}/getAllEvents`)
        .then(response => response.json())
        .then(events => {
            const eventListElement = document.getElementById('event-list');
            eventListElement.innerHTML = '';  // Clear the list first
            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event-item');
                eventElement.innerHTML = `
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Members Signed Up:</strong> ${event.members.length}</p>
                `;
                eventListElement.appendChild(eventElement);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Sign up for an event
function signUpForEvent() {
    const eventId = document.getElementById('event-id').value;
    const memberEmail = document.getElementById('member-email').value;

    if (!eventId || !memberEmail) {
        alert("Please enter both Event ID and your email.");
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
            alert('Successfully signed up for the event!');
            loadUpcomingEvents(); // Reload the events list to show updated member count
        })

}

// Load events when the page loads
window.onload = function() {
    loadUpcomingEvents();
};
