import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/"); // Redirige vers Login si non connecté
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("storage")); // Déclenche la mise à jour
        navigate("/"); // Déconnexion et retour au Login
    };

    if (!user) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>Bienvenue {user.username}, tu es ({user.role}) ! 🎉</h1>
            <p>Tu es connecté.</p>
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
};

export default Dashboard;
