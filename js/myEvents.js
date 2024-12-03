document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/api/events", { // Juster URL til din endpoint
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((events) => {
            const eventsList = document.getElementById("events-list");
            events.forEach((event) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${event.name} - ${event.date}`;
                eventsList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Kunne ikke hente dine events.");
        });
});
