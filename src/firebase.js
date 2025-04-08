import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJtVlT0rRR5qSuHowK_ZMxdDkA2ob8c-8",
  authDomain: "bama-monarch.firebaseapp.com",
  projectId: "bama-monarch",
  storageBucket: "bama-monarch.firebasestorage.app",
  messagingSenderId: "129761733702",
  appId: "1:129761733702:web:2eb4ec6eff96bd17c7ee47",
  measurementId: "G-KLF6J1R82T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
