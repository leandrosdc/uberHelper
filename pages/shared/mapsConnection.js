// Função para obter a localização atual do usuário
export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(userLocation); // Retorna a localização do usuário
        },
        (error) => {
          reject(error); // Retorna o erro se a localização não puder ser obtida
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}