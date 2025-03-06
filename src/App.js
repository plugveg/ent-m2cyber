import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./page/login/LoginPage";
import Dashboard from "./page/Dashboard";
import ForgotPassword from "./page/login/ForgotPassword";
import GlobalPage from "./page/GlobalePage";
import Planning from "./page/Planning";
import Navbar from "./components/Navbar";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(!!localStorage.getItem("user"));
    };

    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("user", "true");
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/"); // 🔹 Redirige immédiatement après la déconnexion
  };

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="App-header">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/chat" element={isAuthenticated ? <GlobalPage /> : <Navigate to="/" />} />
          <Route path="/planning" element={isAuthenticated ? <Planning /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
