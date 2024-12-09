document.addEventListener("DOMContentLoaded", function() {
    // Check if elements exist before adding event listeners
    const btnBecomeMember = document.getElementById('btn-become-member');
    const btnViewEvents = document.getElementById('btn-view-events');
    const btnCph = document.getElementById('btn-cph');
    const btnOdense = document.getElementById('btn-odense');
    const btnAarhus = document.getElementById('btn-aarhus');

    btnBecomeMember?.addEventListener('click', function() {
        window.location.href = "../templates/signup.html"; // Redirect to signup page
    });

    btnViewEvents?.addEventListener('click', function() {
        window.location.href = "../templates/upcomingEvents.html"; // Redirect to events page
    });

    btnCph?.addEventListener('click', function() {
        window.location.href = "../templates/copenhagen.html"; // Redirect to Copenhagen page
    });

    btnOdense?.addEventListener('click', function() {
        window.location.href = "../templates/odense.html"; // Redirect to Odense page
    });

    btnAarhus?.addEventListener('click', function() {
        window.location.href = "../templates/aarhus.html"; // Redirect to Aarhus page
    });

    const apiBaseUrl = "http://localhost:8080"; // Backend URL

    // Example: Fetch members data from backend
    fetch(`${apiBaseUrl}/members`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Netværksrespons var ikke ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Data hentet fra backend:", data);
        })
        .catch(error => {
            console.error("Der skete en fejl:", error);
        });

    document.querySelectorAll('.btn.view-more').forEach(button => {
        button.addEventListener('click', function() {
            alert("Detaljer om eventet kommer her!");
        });
    });

    document.querySelectorAll('.btn.register').forEach(button => {
        button.addEventListener('click', function() {
            alert("Tilmeldingssiden åbnes her!");
        });
    });
});
