document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        membershipType: document.getElementById("membershipType").value,
        department: document.getElementById("department").value,
    };

    fetch("http://localhost:8080/api/members", { // Din backend server URL
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (response.ok) {
                alert("Registrering lykkedes!");
                document.getElementById("registration-form").reset();
            } else {
                response.text().then((text) => alert("Fejl: " + text));
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Noget gik galt. Prøv igen senere.");
        });
});
