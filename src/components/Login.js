import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Connexion réussie !');
      window.location.href = '/acceuil'; // Redirection vers /acceuil
    } catch (error) {
      alert(error.message);
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
