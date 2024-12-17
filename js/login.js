// Event listener for loginForm submission
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
            body: JSON.stringify({ username: usernameOrEmail, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Login Response:", data);
            localStorage.setItem("username", data.username);
            localStorage.setItem("memberEmail", data.email);

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

// Event listener for "Create User" button
document.getElementById("createUserButton").addEventListener("click", () => {
    window.location.href = "create-user.html";
});
