import React, { useState } from "react";

const ChatFileUploader = () => {
  const [messages, setMessages] = useState([]); // Stocke les messages du chat
  const [fileName, setFileName] = useState(""); // Stocke le nom du fichier sélectionné
  const [searchTerm, setSearchTerm] = useState(""); // Stocke la recherche

  // Fonction pour sélectionner un fichier
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // Fonction pour envoyer le nom du fichier dans le chat
  const handleSendFile = () => {
    if (fileName) {
      setMessages([...messages, { id: Date.now(), text: `📂 ${fileName}`, sender: "user" }]);
      setFileName(""); // Réinitialiser après l'envoi
    }
  };

  // Fonction pour supprimer un message (fichier envoyé)
  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  // Filtrage des messages selon la recherche
  const filteredMessages = messages.filter((msg) =>
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-container">
      <h2>Chat - Fichiers</h2>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="🔍 Rechercher un fichier..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Zone de chat */}
      <div className="chat-box">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.sender}`}>
              <span>{msg.text}</span>
              <button className="delete-btn" onClick={() => handleDeleteMessage(msg.id)}>❌</button>
            </div>
          ))
        ) : (
          <p>Aucun fichier trouvé.</p>
        )}
      </div>

      {/* Zone de sélection et d'envoi de fichier */}
      <div className="file-upload">
        <label className="file-btn">
          📁 Choisir un fichier
          <input type="file" onChange={handleFileSelect} hidden />
        </label>

        {fileName && <span className="file-name">📂 {fileName}</span>}

        <button className="send-btn" onClick={handleSendFile} disabled={!fileName}>
          ➡️ Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatFileUploader;
