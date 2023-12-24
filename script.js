document.addEventListener('DOMContentLoaded', function () {
  // Show loading view
  const loadingView = document.getElementById('loading');
  loadingView.style.display = 'block';

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  const defaultDate = yyyy + '-' + mm + '-' + dd;

  const urlParams = new URLSearchParams(window.location.search);
  const requestedDate = urlParams.get('date') || defaultDate;

  // Validate and sanitize user input for the date parameter
  if (!isValidDate(requestedDate)) {
    // Handle invalid date, for example, redirect to the default page
    window.location.href = '/';
    return;
  }

  // Append the default query date as today's date if no date is provided
  if (urlParams.get('date') === null) {
    window.history.replaceState({}, document.title, `?date=${defaultDate}`);
  }

  // Uncomment the next line to use the API endpoint
  const apiUrl = `https://worker.apd.xstar97thenoob.com?date=${requestedDate}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Hide loading view and show content view
      loadingView.style.display = 'none';
      const contentView = document.getElementById('content');
      contentView.style.display = 'block';

      updateUI(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      // Provide user-friendly error message or log more details about the error
      loadingView.style.display = 'none';
    });
});

function updateUI(data) {
  document.getElementById('title').innerText = data.title;
  document.getElementById('date').innerText = data.date;
  document.getElementById('description').innerText = data.explanation;
  document.getElementById('image').src = data.url;

  const copyrightElement = document.getElementById('copyright');
  if (data.copyright) {
    copyrightElement.innerText = 'Copyright: ' + data.copyright;
  } else {
    copyrightElement.style.display = 'none'; // Hide copyright element
  }
}

// Function to validate if the given string is a valid date
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}