document.addEventListener('DOMContentLoaded', () => {
    const yearInput = document.getElementById('yearInput');
    const monthInput = document.getElementById('monthInput');
    const dayInput = document.getElementById('dayInput');
    const submitButton = document.getElementById('submitButton');

    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');

    // Set the current date in the input fields
    yearInput.value = currentYear;
    monthInput.value = currentMonth;
    dayInput.value = currentDay;

    // Handle submit button click
    submitButton.addEventListener('click', () => {
        // Get the values from the input fields
        const year = yearInput.value;
        const month = monthInput.value.padStart(2, '0');
        const day = dayInput.value.padStart(2, '0');

        // Validate the entered date
        const enteredDate = new Date(`${year}-${month}-${day}`);
        if (isNaN(enteredDate.getTime())) {
            alert('Please enter a valid date.');
            return;
        }

        // Open a new page with the specified date
        const requestedDate = `${year}-${month}-${day}`;
        queryItem(requestedDate);
    });
});

function queryItem(requestedDate) {
    // Construct the URL with the .html extension
    const apodUrl = `/apod.html?date=${requestedDate}`;

    // Navigate to the APOD page with the specified date
    window.location.href = apodUrl;
}
