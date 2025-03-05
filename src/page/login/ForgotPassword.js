import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import testData from "./loginTestData.json"; // Import des utilisateurs

const ForgotPassword = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [userExists, setUserExists] = useState(null); // Ajout du state
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérifier si l'utilisateur existe dans loginTestData.json
        const foundUser = testData.users.some((user) => user.username === username);

        setUserExists(foundUser); // Met à jour l'état de userExists

        if (foundUser) {
            setMessage("Un lien de réinitialisation a été envoyé.");
        } else {
            setMessage("Identifiant incorrect.");
        }
    };

    return (
        <div>
            <h2>Mot de passe oublié</h2>
            <p>Entrez votre identifiant pour réinitialiser votre mot de passe.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Identifiant :
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Envoyer</button>
            </form>

            {message && <p style={{ color: userExists ? "green" : "red" }}>{message}</p>}

            <button onClick={() => navigate("/")}>Retour à la connexion</button>
        </div>
    );
};

export default ForgotPassword;
