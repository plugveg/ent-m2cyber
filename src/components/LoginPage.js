import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import '../css/LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, login } = useAuthStore();

  // Redirection immédiate si déjà connecté
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username, password);

    if (success) {
      navigate("/dashboard");
      window.location.reload(); // Recharge l'état global
    } else {
      setError("Identifiant ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Connexion</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          { error && <p className="error-message">{error}</p> }
          <button type="submit" className="login-button">Se connecter</button>
        </form>
        <button onClick={() => navigate("/forgot-password")} className="forgot-password">
          Mot de passe oublié ?
        </button>
      </div>
    </div>
  );
}
