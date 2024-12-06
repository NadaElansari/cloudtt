import React from "react";
import { Link } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1 className="app-logo">🌥 CloudProject</h1>
      </header>
      <main className="app-main">
        <h2 className="app-welcome">Welcome to CloudProject</h2>
        <p className="app-description">
          Find all ESI clubs in one place.
        </p>
        <div className="app-buttons">
          <Link to="/login" className="app-btn">Login</Link>
          <Link to="/register" className="app-btn app-btn-alt">Register</Link>
        </div>
      </main>
      <footer className="app-footer">
        <p>© 2024 CloudProject. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
