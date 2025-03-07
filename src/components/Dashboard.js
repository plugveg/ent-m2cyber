import React from "react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const { chats } = useChatStore(); // Récupérer toutes les discussions

  // Filtrer les discussions auxquelles l'utilisateur a accès
  const userChats = chats.filter(chat => user?.role === "admin" || chat.members.includes(user.id));

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
      <h1 className="dashboard-title">
          Bienvenue, {user?.username}! 👋
        </h1>
        <p className="dashboard-info">
          Vous avez accès à <strong>{userChats.length}</strong> discussions.
        </p>
      </div>
    </div>
  );
}



