// Ensure you have Leaflet.js included in your HTML file
// <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
// <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

// Initialize the Leaflet map
const map = L.map('map').setView([28.63, 77.22], 9); // [lat, lng], zoom level

// Set OpenStreetMap tiles as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Example: Adding a marker
L.marker([28.63, 77.22]).addTo(map)
  .bindPopup("<b>New Delhi</b><br>Default Center")
  .openPopup();
