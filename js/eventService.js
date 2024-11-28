// eventService.js

const API_URL = "http://localhost:8080/api/events";

export async function getEvents() {
    try {
        const response = await fetch('http://localhost:8080/api/events', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        return await response.json();
    } catch (error) {
        console.error('Error loading events:', error);
        throw error;
    }
}

export async function createEvent(eventData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    });
    return response.json();
}

export async function updateEvent(id, eventData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    });
    return response.json();
}

export async function deleteEvent(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return response.json();
}
