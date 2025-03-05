import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [userExists] = useState(null); // Ajout du state
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("Un lien de réinitialisation a été envoyé si votre identifiant est correct.");
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
