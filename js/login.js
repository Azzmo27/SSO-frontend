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
            body: JSON.stringify({ username: usernameOrEmail, password }),  // Vi sender kun username og password
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Login Response:", data);  // Log response for debugging

            // Gemmer de relevante data i localStorage
            localStorage.setItem("username", data.username);  // Gem username
            localStorage.setItem("memberEmail", data.email);  // Gem email

            // Omdiriger til den relevante dashboard-side baseret på rollen
            if (data.role === "ROLE_ADMIN") {
                window.location.href = "admin-dashboard.html";
            } else if (data.role === "ROLE_MEMBER") {
                window.location.href = "member-dashboard.html";
            }
        } else {
            const error = await response.text();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
