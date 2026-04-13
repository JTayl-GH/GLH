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
            // Find the <strong> tag inside the sidebar header
            const welcomeElement = document.querySelector('.sidebar-header strong');
            
            if (welcomeElement && data.firstName) {
                // Updates welcome text with the actual name from the database
                welcomeElement.textContent = data.firstName;
            }
        })
        .catch(err => {
            console.error("Dashboard Error:", err);
            // If an error occurs console displays the error using "err" 
        });
});

// active sidebar link

document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll('.sidebar-menu a');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Removes 'active' class from all links - smooth ui for side bar
            menuItems.forEach(link => link.classList.remove('active'));

            // Add 'active' class to the clicked link to indicate which section is on in sidebar
            this.classList.add('active');
        });
    });
});