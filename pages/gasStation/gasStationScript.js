let userLocation;
function initMap() {
    console.log("Google Maps API carregada com sucesso!");
}

// Função para buscar os postos de gasolina
function searchGasStations() {
    if (!window.google || !google.maps) {
        console.error("Google Maps API ainda não carregada.");
        return;
    }

    // Pegar a localização do usuário
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLocation = new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            );

            console.log("Localização do usuário:", userLocation);

            const service = new google.maps.places.PlacesService(document.createElement("div"));

            const request = {
                location: userLocation,
                rankBy: google.maps.places.RankBy.DISTANCE,
                type: ["gas_station"],
            };

            console.log("Enviando request para Nearby Search", request);

            service.nearbySearch(request, (results, status) => {
                const gasStationList = document.getElementById("gasstation-list");
                gasStationList.innerHTML = "";

                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    results.slice(0, 10).forEach((place) => {
                        const name = place.name;
                        const address = place.vicinity;
                        const hours = place.opening_hours
                            ? place.opening_hours.weekday_text.join(", ")
                            : "Horário não disponível";

                        const li = document.createElement("li");
                        li.innerHTML = `
                            <strong>${name}</strong><br>
                            Endereço: ${address}<br>
                            Horário de funcionamento: ${hours}
                        `;
                        gasStationList.appendChild(li);
                    });
                } else {
                    console.error("Erro na busca:", status);
                    const li = document.createElement("li");
                    li.innerHTML = `<p class="error">Nenhum posto encontrado</p>`;
                    gasStationList.appendChild(li);
                }
            });
        },
        (error) => {
            console.error("Erro ao obter localização:", error);
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
                console.error("Erro ao obter localização:", error);
                alert("Não foi possível obter sua localização. Verifique as permissões do navegador.");
            }
        );
    } else {
        alert("Seu navegador não suporta geolocalização.");
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
        gasStationList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Vamos limitar a 10 resultados
            results.slice(0, 10).forEach((place) => {
                const name = place.name;
                const address = place.vicinity; // Endereço completo
                const hours = place.opening_hours
                    ? place.opening_hours.weekday_text.join(", ")
                    : "Horário não disponível";

                // Cria e exibe a lista de postos
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${name}</strong><br>
                    Endereço: ${address}<br>
                    Horário de funcionamento: ${hours}
                `;
                gasStationList.appendChild(li);
            });
        } else {
            console.error("Erro na busca:", status);
            const li = document.createElement("li");
            li.innerHTML = `<p class="error">Nenhum posto encontrado</p>`;
            gasStationList.appendChild(li);
        }
    });
}

// Inicia o processo de geolocalização
getUserLocation();
