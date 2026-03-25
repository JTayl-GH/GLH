document.addEventListener("DOMContentLoaded", () => {
    // 1. Ask the server for the logged-in user's data
    fetch('/api/user-profile')
        .then(response => {
            if (!response.ok) {
                // If the user isn't logged in, redirect them to the login page
                throw new Error('Not authenticated');
            }
            return response.json();
        })
        .then(data => {
            // 2. Find the <strong> tag inside the sidebar header
            const welcomeElement = document.querySelector('.sidebar-header strong');
            
            if (welcomeElement && data.firstName) {
                // 3. Update the text with the actual name from the database
                welcomeElement.textContent = data.firstName;
            }
        })
        .catch(err => {
            console.error("Dashboard Error:", err);
            // Optional: window.location.href = "/login";
        });
});

// active sidebar link

document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll('.sidebar-menu a');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // 1. Remove 'active' class from all links
            menuItems.forEach(link => link.classList.remove('active'));

            // 2. Add 'active' class to the clicked link
            this.classList.add('active');
        });
    });
});