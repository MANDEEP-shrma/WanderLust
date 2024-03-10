mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center: [77.22, 28.63], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
