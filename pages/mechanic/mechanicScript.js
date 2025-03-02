import { getMechanics } from "./mechanicFirebaseConnection.js";
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

// Função para exibir os mecânicos na lista
function mostrarMecanicos(data, userLocation) {
  const mechanicList = document.getElementById("mechanic-list");
  mechanicList.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

  if (data) {
    // Adiciona a distância a cada mecânico
    const mecanicosComDistancia = Object.values(data).map((mechanic) => {
      const distancia = calcularDistancia(
        userLocation.lat,
        userLocation.lng,
        mechanic.lat,
        mechanic.lng
      );
      return { ...mechanic, distancia };
    });

    // Ordena os mecânicos por distância
    mecanicosComDistancia.sort((a, b) => a.distancia - b.distancia);

    // Limita a lista aos 5 primeiros
    const top5Mecanicos = mecanicosComDistancia.slice(0, 5);

    // Exibe os mecânicos na lista
    top5Mecanicos.forEach((mechanic) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${mechanic.name}</strong><br>
          <span>${mechanic.address}</span><br>
          <span>Distância: ${mechanic.distancia.toFixed(2)} km</span>
        </div>
        <a href="https://www.google.com/maps?q=${mechanic.lat},${mechanic.lng}" target="_blank">
          <img src="../../assets/images/link_icon.png" alt="Abrir no Google Maps" class="link-icon">
        </a>
      `;
      mechanicList.appendChild(li);
    });
  } else {
    mechanicList.innerHTML = "<p>No mechanics found.</p>";
  }
}

// Função para carregar os mecânicos
async function carregarMecanicos() {
  try {
    const userLocation = await getCurrentLocation();
    console.log("Localização atual:", userLocation);

    // Busca os mecânicos e exibe na lista
    getMechanics((data) => mostrarMecanicos(data, userLocation));
  } catch (error) {
    console.error("Erro ao obter localização:", error);
  }
}

// Carrega os mecânicos quando a página for carregada
window.addEventListener("load", carregarMecanicos);