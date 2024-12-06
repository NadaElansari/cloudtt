// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth from firebase/auth

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmGNoHCqz9_EgAjpqK_Fn0KuoaYcKxrME",
  authDomain: "projet-cloud-3b4af.firebaseapp.com",
  projectId: "projet-cloud-3b4af",
  storageBucket: "projet-cloud-3b4af.firebasestorage.app",
  messagingSenderId: "760982235420",
  appId: "1:760982235420:web:c60b22f356081a4450b2d9",
  measurementId: "G-MHGJV266TJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app); // Fix: Export the auth instance