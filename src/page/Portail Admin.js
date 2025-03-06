import React, { useState, useEffect } from "react";
import usersData from "./login/loginTestData.json";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ username: "", password: "", role: "" });
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "" });

  useEffect(() => {
    setUsers(usersData.users);
  }, []);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleUpdateUser = () => {
    setUsers(users.map(user => user.username === currentUser.username ? currentUser : user));
  };

  const handleCreateUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ username: "", password: "", role: "" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "50px auto", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Administration des utilisateurs</h2>

      <h3>Liste des utilisateurs</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username} - {user.role}</li>
        ))}
      </ul>

      <h3>Modifier l'utilisateur actuel</h3>
      <input
        type="text"
        name="username"
        placeholder="Nom d'utilisateur"
        value={currentUser.username}
        onChange={handleUserChange}
        style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={currentUser.password}
        onChange={handleUserChange}
        style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        type="text"
        name="role"
        placeholder="Rôle"
        value={currentUser.role}
        onChange={handleUserChange}
        style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={handleUpdateUser} style={{ display: "block", width: "100%", padding: "10px", marginTop: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
        Mettre à jour l'utilisateur
      </button>

      <h3>Créer un nouvel utilisateur</h3>
      <input
        type="text"
        name="username"
        placeholder="Nom d'utilisateur"
        value={newUser.username}
        onChange={handleNewUserChange}
        style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={newUser.password}
        onChange={handleNewUserChange}
        style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        type="text"
        name="role"
        placeholder="Rôle"
        value={newUser.role}
        onChange={handleNewUserChange}
        style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={handleCreateUser} style={{ display: "block", width: "100%", padding: "10px", marginTop: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>
        Créer un utilisateur
      </button>
    </div>
  );
};

export default AdminPage;