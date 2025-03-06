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

    if (!user) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>Bienvenue {user.username} ! 🎉</h1>
            <p>Tu es connecté en tant que {user.role}.</p>
        </div>
    );
};

export default Dashboard;
