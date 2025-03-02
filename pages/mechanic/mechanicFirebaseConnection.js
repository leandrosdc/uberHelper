import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-2zwQlfedS7CzCcvdAhZ879yhNOaSMik",
  authDomain: "applicationproje.firebaseapp.com",
  databaseURL: "https://applicationproje-default-rtdb.firebaseio.com",
  projectId: "applicationproje",
  storageBucket: "applicationproje.firebasestorage.app",
  messagingSenderId: "427836263994",
  appId: "1:427836263994:web:c50bd7f06c44ebe9486f03"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Função para buscar mecânicos do Firebase
export function getMechanics(callback) {
  const mechanicsRef = ref(database, "mechanics");
  onValue(mechanicsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}