const apiUrl = 'http://localhost:8080/admin';  // Adjust the URL according to your API endpoint

// Create Event
document.getElementById('create-event-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const eventName = document.getElementById('event-name').value;
    const eventDescription = document.getElementById('event-description').value;
    const eventDate = document.getElementById('event-date').value;

    const event = {
        name: eventName,
        description: eventDescription,
        date: eventDate
    };

    fetch(`${apiUrl}/createEvent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
        .then(response => response.json())
        .then(data => {
            alert('Event created successfully');
            loadEventList();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Get Event Details for Update
function getEventDetails() {
    const eventId = document.getElementById('update-event-id').value;
    fetch(`${apiUrl}/getEvent/${eventId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('update-event-name').value = data.name;
            document.getElementById('update-event-description').value = data.description;
            document.getElementById('update-event-date').value = data.date;
        })
        .catch(error => console.error('Error:', error));
}

// Update Event
document.getElementById('update-event-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const eventId = document.getElementById('update-event-id').value;
    const eventName = document.getElementById('update-event-name').value;
    const eventDescription = document.getElementById('update-event-description').value;
    const eventDate = document.getElementById('update-event-date').value;

    const event = {
        name: eventName,
        description: eventDescription,
        date: eventDate
    };

    fetch(`${apiUrl}/updateEvent/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
        .then(response => response.json())
        .then(data => {
            alert('Event updated successfully');
            loadEventList();
        })
        .catch(error => console.error('Error:', error));
});

// Delete Event
function deleteEvent() {
    const eventId = document.getElementById('delete-event-id').value;
    fetch(`${apiUrl}/deleteEvent/${eventId}`, {
        method: 'DELETE',
    })
        .then(() => {
            alert('Event deleted successfully');
            loadEventList();
        })
        .catch(error => console.error('Error:', error));
}

// Load Event List
function loadEventList() {
    fetch(`${apiUrl}/getAllEvents`)
        .then(response => response.json())
        .then(events => {
            const eventListElement = document.getElementById('event-list');
            eventListElement.innerHTML = '';  // Clear the list first
            events.forEach(event => {
                const li = document.createElement('li');
                li.textContent = `${event.name} - ${event.date}`;
                eventListElement.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Load events on page load
window.onload = function() {
    loadEventList();
};