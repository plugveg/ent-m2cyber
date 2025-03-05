import React, { useState } from 'react';
import Discussions from './discussion';
import Chat from './components/Chat';
import Planning from './Planning';

export default function GlobalePage() {
  const [activeTab, setActiveTab] = useState('salon'); // 'salon' ou 'planning'
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Barre latérale gauche avec les boutons */}
      <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px', backgroundColor: '#23272a' }}>
        <button onClick={() => { setActiveTab('salon'); setSelectedDiscussion(null); }} style={buttonStyle}>Salon de Discussion</button>
        <button onClick={() => { setActiveTab('planning'); setSelectedDiscussion(null); }} style={buttonStyle}>Planning</button>
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
