import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css"; // Import du CSS

export default function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user && user.role === "admin";

    useEffect(() => {
        const checkLoginStatus = () => {
            setIsLoggedIn(!!localStorage.getItem("user"));
        };

        window.addEventListener("storage", checkLoginStatus);

        return () => {
            window.removeEventListener("storage", checkLoginStatus);
        };
    }, []);

    useEffect(() => {
        // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false); // 🔄 Met à jour immédiatement l'état pour forcer un re-rendu
        window.dispatchEvent(new Event("storage")); // 🔄 Mise à jour globale
    };

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
