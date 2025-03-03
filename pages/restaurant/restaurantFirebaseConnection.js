// Import Firebase modules for app initialization and database operations
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase configuration object containing API keys and project details
const firebaseConfig = {
  apiKey: "AIzaSyC-2zwQlfedS7CzCcvdAhZ879yhNOaSMik", // API key for Firebase
  authDomain: "applicationproje.firebaseapp.com", // Domain for authentication
  databaseURL: "https://applicationproje-default-rtdb.firebaseio.com", // URL for the Realtime Database
  projectId: "applicationproje", // Project ID
  storageBucket: "applicationproje.firebasestorage.app", // Storage bucket for files
  messagingSenderId: "427836263994", // Sender ID for messaging
  appId: "1:427836263994:web:c50bd7f06c44ebe9486f03" // App ID
};

// Initialize Firebase with the provided configuration
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

/**
 * Fetches restaurant data from Firebase and passes it to a callback function.
 * @param {function} callback - A function to handle the retrieved restaurant data.
 */
export function getRestaurants(callback) {
  // Create a reference to the "restaurants" node in the database
  const restaurantsRef = ref(database, "restaurants");

  // Listen for changes in the "restaurants" node
  onValue(restaurantsRef, (snapshot) => {
    // Retrieve the data from the snapshot
    const data = snapshot.val();

    // Pass the data to the callback function
    callback(data);
  });
}