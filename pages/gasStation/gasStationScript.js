import { getGasStations } from "./gasStationFirebaseConnection.js";
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

// Função para exibir os postos de gasolina na lista
function mostrarGasStations(data, userLocation) {
  const gasStationList = document.getElementById("gasStation-list");
  gasStationList.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

  if (data) {
    // Adiciona a distância a cada posto de gasolina
    const gasStationsComDistancia = Object.values(data).map((gasStation) => {
      const distancia = calcularDistancia(
        userLocation.lat,
        userLocation.lng,
        gasStation.lat,
        gasStation.lng
      );
      return { ...gasStation, distancia };
    });

    // Ordena os postos de gasolina por distância
    gasStationsComDistancia.sort((a, b) => a.distancia - b.distancia);

    // Limita a lista aos 5 primeiros
    const top5GasStations = gasStationsComDistancia.slice(0, 5);

    // Exibe os postos de gasolina na lista
    top5GasStations.forEach((gasStation) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${gasStation.name}</strong><br>
          <span>${gasStation.address}</span><br>
          <span>Distância: ${gasStation.distancia.toFixed(2)} km</span>
        </div>
        <a href="https://www.google.com/maps?q=${gasStation.lat},${gasStation.lng}" target="_blank">
          <img src="../../assets/images/link_icon.png" alt="Abrir no Google Maps" class="link-icon">
        </a>
      `;
      gasStationList.appendChild(li);
    });
  } else {
    gasStationList.innerHTML = "<p>No gas stations found.</p>";
  }
}

// Função para carregar os postos de gasolina
async function carregarGasStations() {
  try {
    const userLocation = await getCurrentLocation();
    console.log("Localização atual:", userLocation);

    // Busca os postos de gasolina e exibe na lista
    getGasStations((data) => mostrarGasStations(data, userLocation));
  } catch (error) {
    console.error("Erro ao obter localização:", error);
  }
}

// Carrega os postos de gasolina quando a página for carregada
window.addEventListener("load", carregarGasStations);