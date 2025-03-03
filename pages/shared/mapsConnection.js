/**
 * Retrieves the current location of the user using the browser's Geolocation API.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the latitude and longitude of the user.
 * @throws {Error} - If geolocation is not supported by the browser or if the user denies permission.
 */
export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
      // Request the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // If successful, resolve the promise with the user's location
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(userLocation);
        },
        (error) => {
          // If there's an error, reject the promise with the error
          reject(error);
        }
      );
    } else {
      // If geolocation is not supported, reject the promise with an error
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}