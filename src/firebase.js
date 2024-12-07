import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
