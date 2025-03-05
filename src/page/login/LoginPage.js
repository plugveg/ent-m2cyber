import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import testData from "./loginTestData.json";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = () => {
    const user = testData.users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("storage"));
      navigate("/dashboard");
    } else {
      setError("Identifiant incorrect.");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <div>
        <label>
          Identifiant:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Mot de passe:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleLogin}>Se connecter</button>
      <div>
        <button onClick={() => navigate("/forgot-password")}>
          Mot de passe oublié ?
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
