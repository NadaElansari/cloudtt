import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import ClubsList from "./ClubsList";
import Acceuil from "./components/Acceuil";
import ApplyForm from "./components/ApplyForm";
import model from "./Model/model.pkl";
import encoder from "./Model/encoder.pkl";
import scaler from "./Model/scaler.pkl";
import Admin from './components/Admin';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clubslist" element={<ClubsList />} />
        <Route path="/acceuil" element={<Acceuil />} />
        <Route path="/apply/:clubId" element={<ApplyForm />} />
        <Route path="/model" element={<model.pkl />} />
        <Route path="/encoder" element={<encoder.pkl />} />
        <Route path="/scaler" element={<scaler.pkl />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
