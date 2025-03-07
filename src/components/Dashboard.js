import React from "react";
import { useAuthStore } from "../store/authStore";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1 className="dashboard-title">
          Bienvenue, {user?.username}! 👋
        </h1>
        <p className="dashboard-role">Votre rôle : <span>{user?.role}</span></p>
        <p className="dashboard-info">
          Vous avez accès à <strong>{user?.chats.length}</strong> discussions.
        </p>

       
      </div>
    </div>
  );
}
