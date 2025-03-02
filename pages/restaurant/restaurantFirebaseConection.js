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

export function addBusiness(name, type, hours, address) {
  const businessesRef = ref(database, "businesses");
  const newBusinessRef = push(businessesRef);
  return set(newBusinessRef, {
    name: name,
    type: type,
    hours: hours,
    address: address
  });
}

export async function getBusinesses() {
  const businessesRef = ref(database, "businesses");
  try {
    const snapshot = await get(child(businessesRef, "/"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No businesses found.");
      return {};
    }
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return {};
  }
}