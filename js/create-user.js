document.getElementById("createUserForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const membershipType = document.getElementById("membershipType").value;

    let department = null;
    if (membershipType === "ACTIVE") {
        department = document.getElementById("department").value;
    }

    const endpoint = "http://localhost:8080/api/users/create-member";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
                membershipType,
                department,
            }),
        });

        if (response.ok) {
            alert("Member created successfully!");
        } else {
            const errorMessage = await response.text();
            alert("Error: " + errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

document.getElementById("membershipType").addEventListener("change", (event) => {
    const departmentContainer = document.getElementById("departmentContainer");
    if (event.target.value === "ACTIVE") {
        departmentContainer.style.display = "block";
    } else {
        departmentContainer.style.display = "none";
    }
});
