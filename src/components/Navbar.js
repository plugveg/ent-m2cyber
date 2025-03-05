import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css"; // Import du CSS

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

    useEffect(() => {
        // Vérifie le localStorage à chaque changement
        const checkLoginStatus = () => {
            setIsLoggedIn(!!localStorage.getItem("user"));
        };

        window.addEventListener("storage", checkLoginStatus); // Écoute les changements du localStorage

        return () => {
            window.removeEventListener("storage", checkLoginStatus);
        };
    }, []);

    return (
        <nav className="navbar">
            <ul>
                {!isLoggedIn && <li><Link to="/">Accueil (Login)</Link></li>}
                {isLoggedIn && <li><Link to="/dashboard">Dashboard</Link></li>}
                {isLoggedIn && <li><Link to="/chat">Chat</Link></li>}
            </ul>
        </nav>
    );
}
