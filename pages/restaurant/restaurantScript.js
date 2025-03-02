import { getRestaurants } from "./restaurantFirebaseConnection.js";
import { getCurrentLocation } from "../shared/mapsConnection.js";

// Função para calcular a distância entre dois pontos geográficos
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371; // Raio da Terra em quilômetros
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = R * c; // Distância em quilômetros
  return distancia;
}

// Função para exibir os restaurantes na lista
function mostrarRestaurantes(data, userLocation) {
  const restaurantList = document.getElementById("restaurant-list");
  restaurantList.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

  if (data) {
    // Adiciona a distância a cada restaurante
    const restaurantesComDistancia = Object.values(data).map((restaurant) => {
      const distancia = calcularDistancia(
        userLocation.lat,
        userLocation.lng,
        restaurant.lat,
        restaurant.lng
      );
      return { ...restaurant, distancia };
    });

    // Ordena os restaurantes por distância
    restaurantesComDistancia.sort((a, b) => a.distancia - b.distancia);

    // Limita a lista aos 5 primeiros
    const top5Restaurantes = restaurantesComDistancia.slice(0, 5);

    // Exibe os restaurantes na lista
    top5Restaurantes.forEach((restaurant) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${restaurant.name}</strong><br>
          <span>${restaurant.address}</span><br>
          <span>Distância: ${restaurant.distancia.toFixed(2)} km</span>
        </div>
        <a href="https://www.google.com/maps?q=${restaurant.lat},${restaurant.lng}" target="_blank">
          <img src="../../assets/images/link_icon.png" alt="Abrir no Google Maps" class="link-icon">
        </a>
      `;
      restaurantList.appendChild(li);
    });
  } else {
    restaurantList.innerHTML = "<p>No restaurants found.</p>";
  }
}

// Função para carregar os restaurantes
async function carregarRestaurantes() {
  try {
    const userLocation = await getCurrentLocation();
    console.log("Localização atual:", userLocation);

    // Busca os restaurantes e exibe na lista
    getRestaurants((data) => mostrarRestaurantes(data, userLocation));
  } catch (error) {
    console.error("Erro ao obter localização:", error);
  }
}

// Carrega os restaurantes quando a página for carregada
window.addEventListener("load", carregarRestaurantes);