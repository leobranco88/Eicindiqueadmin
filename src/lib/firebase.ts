// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "COLE_AQUI",
  authDomain: "eic-relatorios-d7d9e.firebaseapp.com",
  projectId: "eic-relatorios-d7d9e",
  storageBucket: "eic-relatorios-d7d9e.appspot.com",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
