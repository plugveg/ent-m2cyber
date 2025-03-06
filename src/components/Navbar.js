import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css"; // Import du CSS

export default function Navbar({ isAuthenticated, onLogout }) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

    useEffect(() => {
        const checkLoginStatus = () => {
            const user = localStorage.getItem("user");
            setIsLoggedIn(!!user);

            // 🔹 Si l'utilisateur se déconnecte, rediriger immédiatement
            if (!user) {
                navigate("/");
            }
        };

        window.addEventListener("storage", checkLoginStatus);
        return () => {
            window.removeEventListener("storage", checkLoginStatus);
        };
    }, [navigate]);

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        window.dispatchEvent(new Event("storage")); // 🔄 Mise à jour globale
        onLogout(); // 🔹 Met à jour l'état d'authentification dans `App.js`
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user && user.role === "admin";

    return (
        <nav className="navbar">
            <ul>
                {!isLoggedIn && <li><Link to="/">Accueil (Login)</Link></li>}
                {isLoggedIn && <li><Link to="/dashboard">Dashboard</Link></li>}
                {isLoggedIn && <li><Link to="/chat">Salon de Discussion</Link></li>}
                {isLoggedIn && <li><Link to="/planning">Planning</Link></li>}
                {isLoggedIn && isAdmin && <li><Link to="/Portail_Admin">Portail Admin</Link></li>}
                {isLoggedIn && (
                    <li>
                        <button onClick={handleLogout} className="logout-button">Déconnexion</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}
