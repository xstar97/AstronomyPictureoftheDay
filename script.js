// Display the current date in the desired format (YYYY-MM-DD)
const currentDateElement = document.getElementById('currentDate');
const queryParams = new URLSearchParams(window.location.search);
const currentDateParam = queryParams.get('date');
let currentDateName;

if (currentDateParam) {
  const isValidDate = validateDateFormat(currentDateParam);

  if (isValidDate) {
    // If the parsed date is valid, use it
    currentDateName = currentDateParam;
  } else {
    // If the parsed date is invalid, fallback to the current date
    currentDateName = getDefaultDate();
  }
} else {
  // If no query parameter is provided, use the current date
  currentDateName = getDefaultDate();
}

document.addEventListener('DOMContentLoaded', function () {
  loadImages();
});

function validateDateFormat(dateString) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateString);
}

function getDefaultDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function loadImages() {
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      const imageContainer = document.getElementById('imageContainer');
      console.log("date: " + currentDateName);

      // Find the image for the current date or the last known date
      const matchingImage = data.find(image => {
        const imageDate = new Date(image.date + 'T00:00:00Z'); // UTC version of the image date
        return imageDate.toISOString().split('T')[0] === currentDateName;
      }) || data[data.length - 1];

      // Display the matching image
      const img = document.createElement('img');
      img.src = matchingImage.url;
      img.alt = matchingImage.title;
      imageContainer.appendChild(img);

      // Display image details
      const details = document.createElement('div');
      details.innerHTML = `<p><strong>${matchingImage.title}</strong></p>
                            <p>${matchingImage.date}</p>
                            <p>${matchingImage.explanation}</p>
                            <p>Copyright: ${matchingImage.copyright}</p>`;
      imageContainer.appendChild(details);
    })
    .catch(error => console.error('Error loading images:', error));
}
