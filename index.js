const mainBtn = document.getElementById('main-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMsg = document.getElementById('error-msg');
const toggleLink = document.getElementById('toggle-link');
const formTitle = document.getElementById('form-title');
const formDesc = document.getElementById('form-desc');
const footerQuestion = document.getElementById('footer-question');

let isLoggingIn = true; // State check karne ke liye

// --- TOGGLE BETWEEN LOGIN & SIGNUP ---
toggleLink.onclick = function(e) {
    e.preventDefault();
    isLoggingIn = !isLoggingIn;

    if (isLoggingIn) {
        formTitle.innerText = "Login";
        formDesc.innerText = "Welcome back! Please enter your details.";
        mainBtn.innerText = "Login";
        footerQuestion.innerText = "Don't have an account?";
        toggleLink.innerText = "Sign Up";
    } else {
        formTitle.innerText = "Register";
        formDesc.innerText = "Create a new account to get started.";
        mainBtn.innerText = "Create Account";
        footerQuestion.innerText = "Already have an account?";
        toggleLink.innerText = "Login";
    }
};

// --- MAIN BUTTON ACTION ---
mainBtn.onclick = function() {
    const user = usernameInput.value.trim();
    const pass = passwordInput.value.trim();
    errorMsg.style.display = "none";

    if (user === "" || pass === "") {
        showError("Please fill all fields! ⚠️");
        return;
    }

    if (isLoggingIn) {
        // --- LOGIN LOGIC ---
        
        // Special Admin Login to see all users
        if (user === "admin" && pass === "showme") {
            displayUsers();
            return;
        }

        const savedPass = localStorage.getItem(user);
        if (savedPass === null) {
            showError("User not found! Register first. ❌");
        } else if (savedPass === pass) {
            alert("Login Successful! 🎉 Welcome " + user);
        } else {
            showError("Wrong password! ❌");
        }
    } else {
        // --- SIGNUP LOGIC ---
        if (localStorage.getItem(user)) {
            showError("Username already taken! 👤");
        } else {
            localStorage.setItem(user, pass);
            alert("Account Created! Now you can Login. ✅");
            toggleLink.click(); // Wapis login par le jao
        }
    }
};

function showError(msg) {
    errorMsg.innerText = msg;
    errorMsg.style.display = "block";
}

// --- ADMIN FUNCTION: To See All Users ---
function displayUsers() {
    const adminPanel = document.getElementById('admin-panel');
    const tableBody = document.getElementById('userListBody');
    document.querySelector('.login-card').style.display = "none"; // Login form chhupao
    adminPanel.style.display = "block"; // Table dikhao

    tableBody.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let val = localStorage.getItem(key);
        tableBody.innerHTML += `<tr><td>${key}</td><td>${val}</td></tr>`;
    }
}