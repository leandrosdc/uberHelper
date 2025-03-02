import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-2zwQlfedS7CzCcvdAhZ879yhNOaSMik",
  authDomain: "applicationproje.firebaseapp.com",
  databaseURL: "https://applicationproje-default-rtdb.firebaseio.com",
  projectId: "applicationproje",
  storageBucket: "applicationproje.firebasestorage.app",
  messagingSenderId: "427836263994",
  appId: "1:427836263994:web:c50bd7f06c44ebe9486f03"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Função para adicionar um estabelecimento
export function addEstabelecimento(nome, tipo, horario, endereco) {
  const estabelecimentosRef = ref(database, "estabelecimentos");
  const novoEstabelecimentoRef = push(estabelecimentosRef);
  return set(novoEstabelecimentoRef, {
    nome: nome,
    tipo: tipo,
    horario: horario,
    endereco: endereco
  });
}

// Função para buscar todos os estabelecimentos
export async function getEstabelecimentos() {
  const estabelecimentosRef = ref(database, "estabelecimentos");
  try {
    const snapshot = await get(child(estabelecimentosRef, "/"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("Nenhum estabelecimento encontrado.");
      return {};
    }
  } catch (error) {
    console.error("Erro ao buscar estabelecimentos:", error);
    return {};
  }
}
