document.addEventListener('DOMContentLoaded', () => {
    const dateGrid = document.getElementById('dateGrid');
    const todayView = document.getElementById('todayView');

    // Get the current date
    const currentDate = new Date();

    // Set the end date to 1995-07-01
    const endDate = new Date('1995-07-01');

    // Create a grid of dates starting from tomorrow and ending at 1995-07-01
    while (currentDate > endDate) {
        currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day
        dateGrid.appendChild(createDateItem(currentDate));
    }

    // Display today's date at the top
    const todayFormatted = formatDate(new Date());
    todayView.textContent = `Today: ${todayFormatted}`;
    todayView.addEventListener('click', () => {
        loadItem(todayFormatted);
    });

    // Handle date item click
    dateGrid.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('date-item')) {
            const requestedDate = target.textContent;
            loadItem(requestedDate);
        }
    });
});

function loadItem(requestedDate) {
    // Uncomment the next line to use the API endpoint
    const apiUrl = `https://api.apod.xstar97thenoob.com/?date=${requestedDate}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Load item_apod.html if the date is valid
            const itemContainer = document.getElementById('itemContainer');
            const itemScript = document.createElement('script');
            itemScript.src = '/scripts/item.js';
            itemScript.onload = function () {
                updateUI(data);
                // Replace the current page with item_apod.html
                window.location.replace('/item_apod.html');
            };
            itemContainer.appendChild(itemScript);
        })
        .catch(error => {
            // Load item_error.html in case of API failure
            const itemContainer = document.getElementById('itemContainer');
            const itemScript = document.createElement('script');
            itemScript.src = 'item_error.html';
            itemContainer.appendChild(itemScript);
            console.error('Error fetching data:', error);
            // Replace the current page with item_error.html
            window.location.replace('/item_error.html');
        });
}


// Function to create date item
function createDateItem(date) {
    const formattedDate = formatDate(date);
    const dateItem = document.createElement('div');
    dateItem.className = 'date-item';
    dateItem.textContent = formattedDate;
    return dateItem;
}

// Function to format date
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to update UI
function updateUI(data) {
    // Your existing updateUI function
    // ...
}
