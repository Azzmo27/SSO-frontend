document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const usernameOrEmail = document.getElementById("usernameOrEmail").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: usernameOrEmail, email: usernameOrEmail, password }),  // Send both username and email
        });

        if (response.ok) {
            const data = await response.json();
            if (data.role === "ROLE_ADMIN") {
                window.location.href = "admin-dashboard.html";
            } else if (data.role === "ROLE_MEMBER") {
                window.location.href = "member-dashboard.html";
            }
        } else {
            const error = await response.text();
            alert(`Error: ${error}`);  // Show the error message
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

// Add event listener to the "Create User" button to redirect to the create user form
document.getElementById("createUserButton").addEventListener("click", () => {
    window.location.href = "create-user.html";
});
