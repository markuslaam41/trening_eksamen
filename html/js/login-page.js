const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "pass") {
        localStorage.setItem('username', username)
        window.location.href = "account.html";
    } else {
        alert("Feil brukernavn/passord")
    }
})