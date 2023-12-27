document.addEventListener('DOMContentLoaded', function () {
  // Show loading view
  const loadingView = document.getElementById('loading');
  loadingView.style.display = 'block';

  // Extract the date from the current route
  const pathSegments = window.location.pathname.split('/');
  const requestedDate = pathSegments[pathSegments.length - 1];

  // Validate and sanitize user input for the date parameter
  if (!isValidDate(requestedDate)) {
      // Handle invalid date, for example, redirect to the default page
      window.location.href = '/date/xxxx-xx-xx';
      return;
  }

  // Append the default query date as today's date if no date is provided
  if (pathSegments.length < 3) {
      window.history.replaceState({}, document.title, `/date/${defaultDate}`);
  }

  // Uncomment the next line to use the API endpoint
  const apiUrl = `https://api.apod.xstar97thenoob.com/?date=${requestedDate}`;
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
