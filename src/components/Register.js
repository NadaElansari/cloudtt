import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../App.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Inscription réussie !");
      window.location.href = "/login"; // Redirection vers /login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2 className="register-title">Créer un compte</h2>
        <p className="register-subtitle">Rejoignez notre communauté dès maintenant</p>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
          <button type="submit" className="register-btn">S'inscrire</button>
        </form>
        <p className="register-redirect">
          Vous avez déjà un compte ?{' '}
          <a href="/login" className="register-link">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
