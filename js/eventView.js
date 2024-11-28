import * as eventService from './eventService.js';

export function renderEvents(events) {
    const eventsList = document.getElementById('events');
    eventsList.innerHTML = '';  // Clear previous events

    events.forEach(event => {
        const eventElement = document.createElement('li');
        eventElement.innerHTML = `
            <strong>${event.name}</strong><br>
            Date: ${event.date}<br>
            Time: ${event.time}<br>
            Location: ${event.location}<br>
            Description: ${event.description}<br>
            <button onclick="editEvent(${event.id})">Edit</button>
            <button onclick="deleteEvent(${event.id})">Delete</button>
        `;
        eventsList.appendChild(eventElement);
    });
}

export function clearForm() {
    document.getElementById("eventForm").reset();
}

// Edit an event
export function editEvent(id, events) {
    const event = events.find(e => e.id === id); // Find the event by id
    if (event) {
        document.getElementById("eventName").value = event.name;
        document.getElementById("eventDate").value = event.date;
        document.getElementById("eventTime").value = event.time;
        document.getElementById("eventLocation").value = event.location;
        document.getElementById("eventDescription").value = event.description;
        document.getElementById("eventId").value = id;
    }
}

// Delete an event
export async function deleteEvent(id, loadEvents) {
    if (confirm("Are you sure you want to delete this event?")) {
        await eventService.deleteEvent(id); // Call the service to delete
        loadEvents(); // Reload events
    }
}
