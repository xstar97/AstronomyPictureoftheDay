document.addEventListener('DOMContentLoaded', function () {
  const loadingView = document.getElementById('loading');
  loadingView.style.display = 'block';

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const defaultDate = yyyy + '-' + mm + '-' + dd;

  const urlParams = new URLSearchParams(window.location.search);
  const requestedDate = urlParams.get('date') || defaultDate;

  if (!isValidDate(requestedDate)) {
      window.location.href = '/';
      return;
  }

  if (!urlParams.has('date')) {
      window.history.replaceState({}, document.title, `?date=${defaultDate}`);
  }

  const apiUrl = `https://worker.apd.xstar97thenoob.com?date=${requestedDate}`;

  // Floating action button and date picker
  const openDatePickerBtn = document.getElementById('openDatePickerBtn');
  const datePickerContainer = document.getElementById('datePickerContainer');
  const updateDateBtn = document.getElementById('updateDateBtn');
  const datePicker = document.getElementById('datePicker');

  openDatePickerBtn.addEventListener('click', function () {
      datePickerContainer.style.display = 'block';
  });

  updateDateBtn.addEventListener('click', function () {
      const selectedDate = datePicker.value;
      if (selectedDate) {
          updateAstronomyData(selectedDate);
          datePickerContainer.style.display = 'none';
      } else {
          alert('Please select a date.');
      }
  });

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          loadingView.style.display = 'none';
          const contentView = document.getElementById('content');
          contentView.style.display = 'block';
          updateUI(data);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          loadingView.style.display = 'none';
      });

  function updateAstronomyData(selectedDate) {
      const apiUrl = `https://worker.apd.xstar97thenoob.com?date=${selectedDate}`;
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              loadingView.style.display = 'none';
              updateUI(data);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
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
          copyrightElement.style.display = 'none';
      }
  }

  function isValidDate(dateString) {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(dateString);
  }
});
