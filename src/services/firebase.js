// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 🔥

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_QgCFocrzOZiElinJzo-Fh_00SIaFG8k",
  authDomain: "proyectoasesorias-9c877.firebaseapp.com",
  projectId: "proyectoasesorias-9c877",
  storageBucket: "proyectoasesorias-9c877.firebasestorage.app",
  messagingSenderId: "558623838084",
  appId: "1:558623838084:web:83fe3969f38d2e5efbd7d1"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export const auth = getAuth(appFirebase);
export const db = getFirestore(appFirebase); 
export { appFirebase };

