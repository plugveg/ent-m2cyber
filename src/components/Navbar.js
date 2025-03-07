import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Home, MessageSquare, Calendar, Settings, LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null; // Ne pas afficher la navbar si l'utilisateur n'est pas connecté

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-links">
          <li>
            <Link to="/dashboard" className="nav-item">
              <Home className="icon" /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/chat" className="nav-item">
              <MessageSquare className="icon" /> <span>Discussions</span>
            </Link>
          </li>
          <li>
            <Link to="/planning" className="nav-item">
              <Calendar className="icon" /> <span>Planning</span>
            </Link>
          </li>
          {user.role === "admin" && (
            <li>
              <Link to="/admin" className="nav-item">
                <Settings className="icon" /> <span>Admin</span>
              </Link>
            </li>
          )}
        </ul>
        <div className="user-info">
        <span className="username">{user.username}</span>
        <span className="user-role">({user.role})</span>
        </div>

        <button onClick={handleLogout} className="logout-button">
          <LogOut className="icon" /> <span>Déconnexion</span>
        </button>
      </div>
    </nav>
  );
}
