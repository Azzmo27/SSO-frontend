document.addEventListener('DOMContentLoaded', async function() {
    // Reference to elements in the dashboard
    const profileInfo = document.getElementById('profile-info');
    const eventsList = document.getElementById('events-list');
    const upcomingEventsList = document.getElementById('upcoming-events-list');
    const editProfileBtn = document.getElementById('edit-profile-btn');

    // Fetch user profile data
    async function loadUserProfile() {
        try {
            const response = await fetch('/members', {
                method: 'GET',
                credentials: 'same-origin', // Send cookies with request (if needed)
            });

            if (response.ok) {
                const profile = await response.json();
                profileInfo.innerHTML = `
                    <p><strong>Name:</strong> ${profile.name}</p>
                    <p><strong>Email:</strong> ${profile.email}</p>
                `;
            } else {
                profileInfo.innerHTML = 'Unable to load profile data.';
            }
        } catch (error) {
            profileInfo.innerHTML = 'Error loading profile data.';
        }
    }

    // Fetch registered events
    async function loadRegisteredEvents() {
        try {
            const response = await fetch('/api/member/events', {
                method: 'GET',
                credentials: 'same-origin',
            });

            if (response.ok) {
                const registeredEvents = await response.json();
                if (registeredEvents.length > 0) {
                    registeredEvents.forEach(event => {
                        const eventItem = document.createElement('div');
                        eventItem.textContent = `${event.name} - Date: ${event.date}`;
                        eventsList.appendChild(eventItem);
                    });
                } else {
                    eventsList.innerHTML = 'You are not registered for any events yet.';
                }
            } else {
                eventsList.innerHTML = 'Unable to load your events.';
            }
        } catch (error) {
            eventsList.innerHTML = 'Error loading your events.';
        }
    }

    // Fetch upcoming events
    async function loadUpcomingEvents() {
        try {
            const response = await fetch('/api/events/upcoming', {
                method: 'GET',
                credentials: 'same-origin',
            });

            if (response.ok) {
                const upcomingEvents = await response.json();
                if (upcomingEvents.length > 0) {
                    upcomingEvents.forEach(event => {
                        const eventItem = document.createElement('div');
                        eventItem.textContent = `${event.name} - Date: ${event.date}`;
                        upcomingEventsList.appendChild(eventItem);
                    });
                } else {
                    upcomingEventsList.innerHTML = 'No upcoming events available.';
                }
            } else {
                upcomingEventsList.innerHTML = 'Unable to load upcoming events.';
            }
        } catch (error) {
            upcomingEventsList.innerHTML = 'Error loading upcoming events.';
        }
    }

    // Handle edit profile button click
    editProfileBtn.addEventListener('click', function() {
        window.location.href = '/templates/edit_profile.html'; // Redirect to profile edit page
    });

    // Load the data when the page is ready
    await loadUserProfile();
    await loadRegisteredEvents();
    await loadUpcomingEvents();
});
