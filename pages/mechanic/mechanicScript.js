// Import necessary functions from external modules
import { getMechanics } from "./mechanicFirebaseConnection.js";
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
 * Displays the list of mechanics on the page.
 * @param {Object} data - The mechanics data retrieved from Firebase.
 * @param {Object} userLocation - The user's current location (latitude and longitude).
 */
function showMechanics(data, userLocation) {
  const mechanicList = document.getElementById("mechanic-list");
  mechanicList.innerHTML = ""; // Clear the list before adding new items

  if (data) {
    // Add distance to each mechanic
    const mechanicsWithDistance = Object.values(data).map((mechanic) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        mechanic.lat,
        mechanic.lng
      );
      return { ...mechanic, distance }; // Add distance property to each mechanic
    });

    // Sort mechanics by distance (closest first)
    mechanicsWithDistance.sort((a, b) => a.distance - b.distance);

    // Limit the list to the top 5 closest mechanics
    const top5Mechanics = mechanicsWithDistance.slice(0, 5);

    // Display the mechanics in the list
    top5Mechanics.forEach((mechanic) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${mechanic.name}</strong><br>
          <span>${mechanic.address}</span><br>
          <span>Distance: ${mechanic.distance.toFixed(2)} km</span>
        </div>
        <a href="https://www.google.com/maps?q=${mechanic.lat},${mechanic.lng}" target="_blank">
          <img src="../../assets/images/link_icon.png" alt="Open in Google Maps" class="link-icon">
        </a>
      `;
      mechanicList.appendChild(li); // Add the mechanic to the list
    });
  } else {
    // Display a message if no mechanics are found
    mechanicList.innerHTML = "<p>No mechanics found.</p>";
  }
}

/**
 * Loads mechanics and displays them on the page.
 */
async function loadMechanics() {
  try {
    // Get the user's current location
    const userLocation = await getCurrentLocation();
    console.log("User location: ", userLocation);

    // Fetch mechanics from Firebase and display them
    getMechanics((data) => showMechanics(data, userLocation));
  } catch (error) {
    console.error("Error getting user location: ", error);
  }
}

// Load mechanics when the page is fully loaded
window.addEventListener("load", loadMechanics);