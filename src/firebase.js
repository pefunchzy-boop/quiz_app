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
  apiKey: "TA_CLE_API",
  authDomain: "TON_PROJET.firebaseapp.com",
  projectId: "TON_PROJET",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "TON_SENDER_ID",
  appId: "TON_APP_ID",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
