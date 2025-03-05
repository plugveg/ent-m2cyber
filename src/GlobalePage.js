import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Discussions from './discussion'; // ✅ Correction de l'import
import Chat from './components/Chat';
import Planning from './Planning';

export default function GlobalePage() {
  const [activeTab, setActiveTab] = useState('salon'); // 'salon' ou 'planning'
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const navigate = useNavigate();

  // Vérification de l'authentification
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/"); // Redirige vers la page de connexion si non authentifié
    }
  }, [navigate]);

  // Gestion de la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("user"); // Supprime les données utilisateur
    navigate("/"); // Redirige vers la page de connexion
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Barre latérale gauche avec les boutons */}
      <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px', backgroundColor: '#23272a' }}>
        <button onClick={() => { setActiveTab('salon'); setSelectedDiscussion(null); }} style={buttonStyle}>Salon de Discussion</button>
        <button onClick={() => { setActiveTab('planning'); setSelectedDiscussion(null); }} style={buttonStyle}>Planning</button>
        <button onClick={handleLogout} style={{ ...buttonStyle, backgroundColor: '#ff4d4d' }}>Déconnexion</button>
      </div>

      {/* Liste des discussions (toujours affichée) */}
      <div style={{ width: '300px', borderRight: '1px solid #ccc', padding: '10px', backgroundColor: '#2c2f33' }}>
        {activeTab === 'salon' && <Discussions onSelectDiscussion={setSelectedDiscussion} />}
      </div>

      {/* Contenu principal (affiche le planning ou le chat si une discussion est sélectionnée) */}
      <div style={{ flexGrow: 1, padding: '20px' }}>
        {activeTab === 'planning' ? (
          <Planning />
        ) : selectedDiscussion ? (
          <Chat discussion={selectedDiscussion} />
        ) : (
          <p style={{ color: "white", textAlign: "center" }}>Sélectionnez une discussion pour commencer à discuter.</p>
        )}
      </div>
    </div>
  );
}

const buttonStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px'
};
