// Import necessary functions from external modules
import { getRestaurants } from "./restaurantFirebaseConnection.js";
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
 * Displays the list of restaurants on the page.
 * @param {Object} data - The restaurant data retrieved from Firebase.
 * @param {Object} userLocation - The user's current location (latitude and longitude).
 */
function showRestaurants(data, userLocation) {
  const restaurantList = document.getElementById("restaurant-list");
  restaurantList.innerHTML = ""; // Clear the list before adding new items

  if (data) {
    // Add distance to each restaurant
    const restaurantsWithDistance = Object.values(data).map((restaurant) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        restaurant.lat,
        restaurant.lng
      );
      return { ...restaurant, distance }; // Add distance property to each restaurant
    });

    // Sort restaurants by distance (closest first)
    restaurantsWithDistance.sort((a, b) => a.distance - b.distance);

    // Limit the list to the top 5 closest restaurants
    const top5Restaurants = restaurantsWithDistance.slice(0, 5);

    // Display the restaurants in the list
    top5Restaurants.forEach((restaurant) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${restaurant.name}</strong><br>
          <span>${restaurant.address}</span><br>
          <span>Distance: ${restaurant.distance.toFixed(2)} km</span>
        </div>
        <a href="https://www.google.com/maps?q=${restaurant.lat},${restaurant.lng}" target="_blank">
          <img src="../../assets/images/link_icon.png" alt="Open in Google Maps" class="link-icon">
        </a>
      `;
      restaurantList.appendChild(li); // Add the restaurant to the list
    });
  } else {
    // Display a message if no restaurants are found
    restaurantList.innerHTML = "<p>No restaurants found.</p>";
  }
}

/**
 * Loads restaurants and displays them on the page.
 */
async function loadRestaurants() {
  try {
    // Get the user's current location
    const userLocation = await getCurrentLocation();
    console.log("User location: ", userLocation);

    // Fetch restaurants from Firebase and display them
    getRestaurants((data) => showRestaurants(data, userLocation));
  } catch (error) {
    console.error("Error getting user location: ", error);
  }
}

// Load restaurants when the page is fully loaded
window.addEventListener("load", loadRestaurants);