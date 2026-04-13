document.addEventListener("DOMContentLoaded", () => {
    // Check if the user is logged in using your existing status route
    fetch('/auth-status')
        .then(response => response.json())
        .then(data => {
            const authLinks = document.getElementById('auth-links');
            
            if (data.loggedIn && authLinks) {
                // The user is logged in
                // replaces "Sign In" and "Get Started" with "My Account"
                authLinks.innerHTML = `
                    <a href="/dashboard">My Account</a>
                `;
            }
        })
        .catch(err => console.error("Error checking auth status:", err));
});