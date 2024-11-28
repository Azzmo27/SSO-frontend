import * as eventService from './eventService.js';
import * as eventView from './eventView.js';

document.addEventListener('DOMContentLoaded', async () => {
    await loadEvents(); // Load the events on page load

    // Event listener for form submission
    const eventForm = document.getElementById("eventForm");
    eventForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const eventData = {
            name: document.getElementById("eventName").value,
            date: document.getElementById("eventDate").value,
            time: document.getElementById("eventTime").value,
            location: document.getElementById("eventLocation").value,
            description: document.getElementById("eventDescription").value
        };

        // If event ID exists, update event
        const eventId = document.getElementById("eventId")?.value;

        if (eventId) {
            await eventService.updateEvent(eventId, eventData);
        } else {
            await eventService.createEvent(eventData);
        }

        eventView.clearForm();
        await loadEvents(); // Refresh the event list after form submission
    });
});

async function loadEvents() {
    try {
        const events = await eventService.getEvents(); // Get events from the service
        eventView.renderEvents(events); // Pass events to render in the view
    } catch (error) {
        console.error("Error loading events:", error);
    }
}
