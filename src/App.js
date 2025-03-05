import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./page/login/LoginPage";
import Dashboard from "./page/Dashboard";
import ForgotPassword from "./page/login/ForgotPassword";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import GlobalPage from "./GlobalePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <div className="App">
      <Navbar />
      <div className="App-header">
        {isAuthenticated ? (
          <GlobalPage />
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
