// Import necessary functions from external modules
import { getGasStations } from "./gasStationFirebaseConnection.js";
import { getCurrentLocation } from "../shared/mapsConnection.js";

/**
 * Calculates the distance between two geographic points using their latitude and longitude.
 * @param {number} lat1 - Latitude of the first point.
 * @param {number} lon1 - Longitude of the first point.
 * @param {number} lat2 - Latitude of the second point.
 * @param {number} lon2 - Longitude of the second point.
 * @returns {number} - The distance in kilometers.
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert latitude difference to radians
  const dLon = (lon2 - lon1) * (Math.PI / 180); // Convert longitude difference to radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Calculate the angular distance
  const distance = R * c; // Convert to kilometers
  return distance;
}

/**
 * Displays the list of gas stations on the page.
 * @param {Object} data - The gas station data retrieved from Firebase.
 * @param {Object} userLocation - The user's current location (latitude and longitude).
 */
function showGasStations(data, userLocation) {
  const gasStationList = document.getElementById("gasStation-list");
  gasStationList.innerHTML = ""; // Clear the list before adding new items

  if (data) {
    // Add distance to each gas station
    const gasStationsDistance = Object.values(data).map((gasStation) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        gasStation.lat,
        gasStation.lng
      );
      return { ...gasStation, distance }; // Add distance property to each gas station
    });

    // Sort gas stations by distance (closest first)
    gasStationsDistance.sort((a, b) => a.distance - b.distance);

    // Limit the list to the top 5 closest gas stations
    const top5GasStations = gasStationsDistance.slice(0, 5);

    // Display the gas stations in the list
    top5GasStations.forEach((gasStation) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${gasStation.name}</strong><br>
          <span>${gasStation.address}</span><br>
          <span>Distance: ${gasStation.distance.toFixed(2)} km</span>
        </div>
        <a href="https://www.google.com/maps?q=${gasStation.lat},${gasStation.lng}" target="_blank">
          <img src="../../assets/images/link_icon.png" alt="Open in Google Maps" class="link-icon">
        </a>
      `;
      gasStationList.appendChild(li); // Add the gas station to the list
    });
  } else {
    // Display a message if no gas stations are found
    gasStationList.innerHTML = "<p>No gas stations found.</p>";
  }
}

/**
 * Loads gas stations and displays them on the page.
 */
async function loadGasStations() {
  try {
    // Get the user's current location
    const userLocation = await getCurrentLocation();
    console.log("User location: ", userLocation);

    // Fetch gas stations from Firebase and display them
    getGasStations((data) => showGasStations(data, userLocation));
  } catch (error) {
    console.error("Error getting user location: ", error);
  }
}

// Load gas stations when the page is fully loaded
window.addEventListener("load", loadGasStations);