document.getElementById('btn-become-member').addEventListener('click', function() {
    window.location.href = "becomeMember.html"; // Redirect to the "Bliv Medlem" page
});

document.getElementById('btn-view-events').addEventListener('click', function() {
    window.location.href = "events.html"; // Redirect to the events page
});

document.getElementById('btn-cph').addEventListener('click', function() {
    window.location.href = "../templates/copenhagen.html";
});

document.getElementById('btn-odense').addEventListener('click', function() {
    window.location.href = "../templates/odense.html";
});

document.getElementById('btn-aarhus').addEventListener('click', function() {
    window.location.href = "../templates/aarhus.html";
});
const apiBaseUrl = "http://localhost:8080"; // Backend URL

// Eksempel: Hent medlemmer via backend
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
    button.addEventListener('click', function () {
        alert("Detaljer om eventet kommer her!");
    });
});

document.querySelectorAll('.btn.register').forEach(button => {
    button.addEventListener('click', function () {
        alert("Tilmeldingssiden åbnes her!");
    });
});
