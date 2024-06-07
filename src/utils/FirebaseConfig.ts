import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQ_Y9a2tvC6lBV6qidodbQEgg0frxSCH0",
  authDomain: "pokedex-2fe9f.firebaseapp.com",
  projectId: "pokedex-2fe9f",
  storageBucket: "pokedex-2fe9f.appspot.com",
  messagingSenderId: "397726103599",
  appId: "1:397726103599:web:907458c9aa09b484676eda",
  measurementId: "G-FB99DEELBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");