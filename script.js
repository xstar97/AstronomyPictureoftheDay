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

  // Append the default query date as today's date if no date is provided
  if (!urlParams.has('date')) {
    window.history.replaceState({}, document.title, `?date=${defaultDate}`);
  }

  // Initialize Pikaday
  const dateElement = document.getElementById('date');
  const datePicker = new Pikaday({
    field: dateElement,
    format: 'YYYY-MM-DD',
    onSelect: function (date) {
      const selectedDate = date.toISOString().split('T')[0];
      window.history.replaceState({}, document.title, `?date=${selectedDate}`);
      fetchData(selectedDate);
    },
  });

  fetchData(requestedDate);

  function fetchData(requestedDate) {
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
        // Handle error and hide loading view
        loadingView.style.display = 'none';
      });
  }

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
});
