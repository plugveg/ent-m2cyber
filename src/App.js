import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./page/login/LoginPage";
import Dashboard from "./page/Dashboard";
import ForgotPassword from "./page/login/ForgotPassword";
import GlobalPage from "./page/GlobalePage";
import Planning from "./page/Planning"; // Ajout de la route Planning
import Navbar from "./components/Navbar";
import PortailAdmin from "./page/Portail Admin";
import Chat from "./page/Chat"; // Import ajouté pour la route Chat

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));
  const navigate = useNavigate();

  // Vérifie le statut d'authentification et écoute les changements du localStorage
  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(!!localStorage.getItem("user"));
    };

    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("user", "true"); // Simule un utilisateur connecté
    setIsAuthenticated(true);
    navigate("/dashboard"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/"); 
  };

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="App-header">
        <Routes>
          {/* Si authentifié, on redirige vers le dashboard, sinon login */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
          {/* Dashboard accessible seulement si authentifié */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          {/* Accès aux discussions uniquement si authentifié */}
          <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/" />} />
          {/* Accès au planning uniquement si authentifié */}
          <Route path="/planning" element={isAuthenticated ? <Planning /> : <Navigate to="/" />} />
          {/* Mot de passe oublié accessible sans restriction */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Portail Admin accessible uniquement si authentifié */}
          <Route path="/Portail_Admin" element={isAuthenticated ? <PortailAdmin /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
