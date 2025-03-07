import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";

export default function AdminPortal() {
  const { users, createUser, updateUserRole, deleteUser } = useAuthStore();
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "user",
    chats: ["1"], // Accès par défaut au chat public
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.username.trim() || !newUser.password.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    createUser(newUser);
    setNewUser({ username: "", password: "", role: "user", chats: ["1"] });
  };

  const handleUpdateRole = (username, newRole) => {
    updateUserRole(username, newRole);
  };

  const handleDeleteUser = (username) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${username} ?`)) {
      deleteUser(username);
    }
  };

  return (
    <div className="admin-container">
      {/* Création d'un utilisateur */}
      <div className="admin-box">
        <h2 className="admin-title">Créer un nouvel utilisateur</h2>
        <form onSubmit={handleCreateUser} className="admin-form">
          <div className="input-group">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              required
            />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
            />
          </div>
          <div className="input-group">
            <label>Rôle</label>
            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
          <button type="submit" className="admin-btn">
            Ajouter l'utilisateur
          </button>
        </form>
      </div>

      {/* Liste des utilisateurs */}
      <div className="admin-box">
        <h2 className="admin-title">Gestion des utilisateurs</h2>
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-card">
              <div className="user-info">
                <p className="user-name">{user.username}</p>
                <p className="user-role">Rôle : {user.role}</p>
              </div>
              <div className="user-actions">
                <select
                  value={user.role}
                  onChange={(e) => handleUpdateRole(user.username, e.target.value)}
                  className="role-select"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
                <button
                  onClick={() => handleDeleteUser(user.username)}
                  className="delete-btn"
                >
                  ❌ Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
