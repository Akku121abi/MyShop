import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please enter email and password.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        alert("✅ Account created successfully!\n" + userCredential.user.email);

        window.location.href = "login.html";

    } catch (error) {
        console.error(error);

        alert(
            "Error Code: " + error.code +
            "\n\nMessage: " + error.message
        );
    }
});
