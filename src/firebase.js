import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --------------------------------------------------------------------
// À PROPOS DE CETTE CONFIG :
// Ces valeurs ne sont PAS un secret à cacher. Elles sont censées être
// visibles dans le code du site (n'importe qui peut les voir avec
// "Inspecter" dans le navigateur, même si tu les caches ici).
//
// Ce qui protège réellement ta base de données, ce sont les règles de
// sécurité Firestore (voir le fichier firestore.rules à la racine du
// projet, à copier-coller dans Firebase Console > Firestore > Règles).
//
// Remplace les valeurs ci-dessous par celles de TON projet Firebase :
// Firebase Console > Paramètres du projet > Tes applications > Config SDK
// --------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyB2PQ0GpQKDrolAqdx_iAPwpT1GAR06ROQ",
  authDomain: "quiz-app-b1de9.firebaseapp.com",
  projectId: "quiz-app-b1de9",
  storageBucket: "quiz-app-b1de9.firebasestorage.app",
  messagingSenderId: "241959493994",
  appId: "1:241959493994:web:a6f1e05109f0fb04d74513"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
