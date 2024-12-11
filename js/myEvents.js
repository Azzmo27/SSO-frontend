
function displayEvents(events) {
    const eventList = document.getElementById("upcoming-events-list");
    eventList.innerHTML = ""; // Clear existing content

    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <button onclick="registerForEvent(${event.id})">Register</button>
        `;
        eventList.appendChild(eventCard);
    });
}
