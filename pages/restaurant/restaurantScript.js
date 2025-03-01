let map;
let service;
let infowindow;
let userLocation;

// Função para inicializar o mapa e buscar restaurantes
function initMap() {
    // Tenta obter a localização do usuário
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Define a localização do usuário
                userLocation = new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                );

                // Inicializa o mapa com um Map ID
                map = new google.maps.Map(document.getElementById("map"), {
                    center: userLocation,
                    zoom: 14,
                    mapId: "YOUR_MAP_ID", // Substitua pelo seu Map ID
                    gestureHandling: "cooperative", // Permite rolagem da página
                });

                // Cria uma janela de informações
                infowindow = new google.maps.InfoWindow();

                // Busca restaurantes McDonald's e Burger King próximos
                searchSpecificRestaurants(userLocation);
            },
            (error) => {
                // Caso o usuário não permita a localização
                console.error("Erro ao obter localização:", error);
                alert("Não foi possível obter sua localização. Verifique as permissões do navegador.");
            }
        );
    } else {
        alert("Seu navegador não suporta geolocalização.");
    }
}

// Função para buscar restaurantes específicos (McDonald's e Burger King)
function searchSpecificRestaurants(location) {
    const requestMcDonalds = {
        location: location,
        radius: 5000, // Raio de 5 km
        name: "McDonald's",
    };

    const requestBurgerKing = {
        location: location,
        radius: 5000, // Raio de 5 km
        name: "Burger King",
    };

    service = new google.maps.places.PlacesService(map);

    // Busca McDonald's
    service.nearbySearch(requestMcDonalds, (resultsMcDonalds, statusMcDonalds) => {
        if (statusMcDonalds === google.maps.places.PlacesServiceStatus.OK && resultsMcDonalds) {
            resultsMcDonalds.slice(0, 5).forEach((place) => {
                createMarker(place);
                addRestaurantToList(place);
            });
        } else {
            console.error("Erro na busca de McDonald's:", statusMcDonalds);
        }
    });

    // Busca Burger King
    service.nearbySearch(requestBurgerKing, (resultsBurgerKing, statusBurgerKing) => {
        if (statusBurgerKing === google.maps.places.PlacesServiceStatus.OK && resultsBurgerKing) {
            resultsBurgerKing.slice(0, 5).forEach((place) => {
                createMarker(place);
                addRestaurantToList(place);
            });
        } else {
            console.error("Erro na busca de Burger King:", statusBurgerKing);
        }
    });
}

// Função para criar um marcador no mapa (usando AdvancedMarkerElement)
function createMarker(place) {
    const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: place.geometry.location,
        title: place.name,
    });

    // Exibe informações ao clicar no marcador (usando 'gmp-click')
    marker.addListener("gmp-click", () => {
        infowindow.setContent(`
            <strong>${place.name}</strong><br>
            <span>${place.vicinity}</span><br>
            <span>Avaliação: ${place.rating || "N/A"}</span>
        `);
        infowindow.open(map, marker);
    });
}

// Função para adicionar um restaurante à lista
function addRestaurantToList(place) {
    const restaurantList = document.getElementById("restaurant-list");

    // Verifica se há horário de funcionamento disponível
    const openingHours = place.opening_hours?.weekday_text
        ? place.opening_hours.weekday_text.join("<br>")
        : "Horário não disponível";

    // Cria o item da lista
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