import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Discussions from '../discussion';
import Chat from '../components/Chat';
import Planning from './Planning';

export default function GlobalePage() {
  const [activeTab, setActiveTab] = useState('salon'); // Par défaut : Affichage de la liste des discussions
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const navigate = useNavigate();

  // Vérification de l'authentification
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/"); // Redirige vers la connexion si non authentifié
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Affichage de la liste des discussions OU du planning */}
      {activeTab === 'salon' && (
        <div style={{ width: '300px', borderRight: '1px solid #ccc', padding: '10px', backgroundColor: '#2c2f33' }}>
          <Discussions onSelectDiscussion={setSelectedDiscussion} />
        </div>
      )}

      {/* Contenu principal : Chat OU Planning */}
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
