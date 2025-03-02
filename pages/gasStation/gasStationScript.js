let userLocation;
function initMap() {
    console.log("Google Maps API working!");
}

// Função para buscar os postos de gasolina
function searchGasStations() {
    if (!window.google || !google.maps) {
        console.error("Google Maps API not working.");
        return;
    }

    // Pegar a localização do usuário
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLocation = new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            );

            console.log("User location:", userLocation);

            const service = new google.maps.places.PlacesService(document.createElement("div"));

            const request = {
                location: userLocation,
                rankBy: google.maps.places.RankBy.DISTANCE,
                type: ["gas_station"],
            };

            console.log("sending request to Nearby Search", request);

            service.nearbySearch(request, (results, status) => {
                const gasStationList = document.getElementById("gasstation-list");
                gasStationList.innerHTML = "";

                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    results.slice(0, 10).forEach((place) => {
                        const name = place.name;
                        const address = place.vicinity;
                        const hours = place.opening_hours
                            ? place.opening_hours.weekday_text.join(", ")
                            : "Time not available";

                        const li = document.createElement("li");
                        li.innerHTML = `
                            <strong>${name}</strong><br>
                            Endereço: ${address}<br>
                            Time: ${hours}
                        `;
                        gasStationList.appendChild(li);
                    });
                } else {
                    console.error("Search error:", status);
                    const li = document.createElement("li");
                    li.innerHTML = `<p class="error">No gas station found</p>`;
                    gasStationList.appendChild(li);
                }
            });
        },
        (error) => {
            console.error("Location error:", error);
        }
    );
}

// Iniciar a busca quando o usuário clicar em um botão
document.getElementById("search-button").addEventListener("click", searchGasStations);


// Função para obter a localização do usuário
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                );
                // Chama a função para buscar os postos após obter a localização
                searchGasStations(userLocation);
            },
            (error) => {
                console.error("Location error:", error);
                alert("Please check browser permissions.");
            }
        );
    } else {
        alert("Your browser does not have location.");
    }
}

// Função para buscar os postos de gasolina
function searchGasStations(location) {
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    const request = {
        location: location,
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: ['gas_station'],
    };

    service.nearbySearch(request, (results, status) => {
        const gasStationList = document.getElementById("gasstation-list");
        gasStationList.innerHTML = ''; 

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            results.slice(0, 10).forEach((place) => {
                const name = place.name;
                const address = place.vicinity; 
                const hours = place.opening_hours
                    ? place.opening_hours.weekday_text.join(", ")
                    : "No time";

                // Cria e exibe a lista de postos
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${name}</strong><br>
                    Endereço: ${address}<br>
                    Time: ${hours}
                `;
                gasStationList.appendChild(li);
            });
        } else {
            console.error("Search error:", status);
            const li = document.createElement("li");
            li.innerHTML = `<p class="error">No gas station</p>`;
            gasStationList.appendChild(li);
        }
    });
}

// Inicia o processo de geolocalização
getUserLocation();
