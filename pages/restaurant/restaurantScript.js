let map;
let service;
let infowindow;
let userLocation;

// Function to initialize the map and search for restaurants
function initMap() {
    // Try to get the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Set the user's location
                userLocation = new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                );

                // Initialize the map with a Map ID
                map = new google.maps.Map(document.getElementById("map"), {
                    center: userLocation,
                    zoom: 14,
                    mapId: "YOUR_MAP_ID", // Replace with your Map ID
                    gestureHandling: "cooperative", // Allows page scrolling
                });

                // Create an info window
                infowindow = new google.maps.InfoWindow();

                // Search for nearby McDonald's and Burger King restaurants
                searchSpecificRestaurants(userLocation);
            },
            (error) => {
                // If the user denies location access
                console.error("Error getting location:", error);
                alert("Unable to get your location. Please check your browser permissions.");
            }
        );
    } else {
        alert("Your browser does not support geolocation.");
    }
}

// Function to search for specific restaurants (McDonald's and Burger King)
function searchSpecificRestaurants(location) {
    const requestMcDonalds = {
        location: location,
        radius: 5000, // Radius of 5 km
        name: "McDonald's",
    };

    const requestBurgerKing = {
        location: location,
        radius: 5000, // Radius of 5 km
        name: "Burger King",
    };

    service = new google.maps.places.PlacesService(map);

    // Search for McDonald's
    service.nearbySearch(requestMcDonalds, (resultsMcDonalds, statusMcDonalds) => {
        if (statusMcDonalds === google.maps.places.PlacesServiceStatus.OK && resultsMcDonalds) {
            resultsMcDonalds.slice(0, 5).forEach((place) => {
                createMarker(place);
                addRestaurantToList(place);
            });
        } else {
            console.error("Error searching for McDonald's:", statusMcDonalds);
        }
    });

    // Search for Burger King
    service.nearbySearch(requestBurgerKing, (resultsBurgerKing, statusBurgerKing) => {
        if (statusBurgerKing === google.maps.places.PlacesServiceStatus.OK && resultsBurgerKing) {
            resultsBurgerKing.slice(0, 5).forEach((place) => {
                createMarker(place);
                addRestaurantToList(place);
            });
        } else {
            console.error("Error searching for Burger King:", statusBurgerKing);
        }
    });
}

// Function to create a marker on the map (using AdvancedMarkerElement)
function createMarker(place) {
    const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: place.geometry.location,
        title: place.name,
    });

    // Display info when clicking the marker (using 'gmp-click')
    marker.addListener("gmp-click", () => {
        infowindow.setContent(`
            <strong>${place.name}</strong><br>
            <span>${place.vicinity}</span><br>
            <span>Rating: ${place.rating || "N/A"}</span>
        `);
        infowindow.open(map, marker);
    });
}

// Function to add a restaurant to the list
function addRestaurantToList(place) {
    const restaurantList = document.getElementById("restaurant-list");

    // Check if opening hours are available
    const openingHours = place.opening_hours?.weekday_text
        ? place.opening_hours.weekday_text.join("<br>")
        : "Opening hours not available";

    // Create the list item
    const li = document.createElement("li");
    li.innerHTML = `
        <div>
            <strong>${place.name}</strong><br>
            <span>${place.vicinity}</span>
        </div>
        <span>${openingHours}</span>
    `;

    restaurantList.appendChild(li);
}