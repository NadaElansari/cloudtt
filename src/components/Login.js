import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Assurez-vous que 'db' est bien configuré pour Firestore
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Authentification avec Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Récupération des informations depuis Firestore
      const userDocRef = doc(db, 'users', user.uid); // Assurez-vous que Firestore est correctement configuré
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        // Vérifiez le rôle de l'utilisateur
        if (userData.role === 'admin') {
          alert('Bienvenue Admin !');
          window.location.href = '/admin'; // Redirection vers admin.js
        } else {
          alert('Connexion réussie !');
          window.location.href = '/acceuil'; // Redirection vers /acceuil
        }
      } else {
        alert(user.uid);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      alert('Erreur : ' + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Connexion</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-btn">Se connecter</button>
        </form>
        <p className="login-redirect">
          Vous n'avez pas de compte ?{' '}
          <a href="/register" className="login-link">S'inscrire</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
