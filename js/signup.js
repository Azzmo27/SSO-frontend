document.addEventListener("DOMContentLoaded", function () {
    const membershipType = document.getElementById("membershipType");
    const department = document.getElementById("department");
    const signupForm = document.getElementById("signupForm");

    // Når medlemstypen ændres
    membershipType.addEventListener("change", function () {
        if (membershipType.value === "Aktiv") {
            // Gør "Department" påkrævet og aktiver det
            department.disabled = false;
            department.required = true;
        } else {
            // Deaktiver og gør "Department" ikke påkrævet
            department.disabled = true;
            department.required = false;
        }
    });

    // Ekstra validering ved indsendelse af formular
    signupForm.addEventListener("submit", function (event) {
        if (membershipType.value === "Aktiv" && department.value === "") {
            event.preventDefault(); // Stop indsendelse
            alert("For aktivt medlemskab skal du vælge en afdeling.");
        }
    });
});