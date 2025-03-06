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
        return <p style={loadingStyle}>Chargement...</p>;
    }

    return (
        <div style={dashboardStyle}>
            <h1>Bienvenue, {user.username} ! 🎉</h1>
            <p>Tu es connecté.</p>
        </div>
    );
};

/* 🎨 Styles */
const dashboardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    color: "white",
    backgroundColor: "#2c2f33",
};

const loadingStyle = {
    textAlign: "center",
    color: "white",
    fontSize: "18px",
};

export default Dashboard;
