document.addEventListener('DOMContentLoaded', function () {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  const defaultDate = yyyy + '-' + mm + '-' + dd;

  const urlParams = new URLSearchParams(window.location.search);
  const requestedDate = urlParams.get('date') || defaultDate;

  // Append the default query date as today's date if no date is provided
  if (!urlParams.has('date')) {
      window.history.replaceState({}, document.title, `?date=${defaultDate}`);
  }

  // Uncomment the next line to use the API endpoint
  const apiUrl = `/api/?date=${requestedDate}`;
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          updateUI(data);
      })
      .catch(error => console.error('Error fetching data:', error));
});

function updateUI(data) {
  document.getElementById('title').innerText = data.title;
  document.getElementById('date').innerText = data.date;
  document.getElementById('description').innerText = data.explanation;
  document.getElementById('image').src = data.url;

  const copyrightElement = document.getElementById('copyright');
  if (data.hasOwnProperty('copyright') && data.copyright) {
      copyrightElement.innerText = 'Copyright: ' + data.copyright;
  } else {
      copyrightElement.style.display = 'none'; // Hide copyright element
  }
}
