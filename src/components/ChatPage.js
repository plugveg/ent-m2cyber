import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import { MessageSquare, Lock, PlusCircle, Trash2, Edit3, Video, FileUp } from "lucide-react";
import "../ChatPage.css"; // Importer le fichier CSS

// Fonction pour choisir aléatoirement une icône d'avatar
const getRandomAvatar = () => {
  const icons = [
    "/userIcons/etu.png",
    "/userIcons/prof.png",
    "/userIcons/icon3.png",
    "/userIcons/icon4.png",
    "/userIcons/icon5.png",
  ];
  return icons[Math.floor(Math.random() * icons.length)];
};

export default function ChatPage() {
  const user = useAuthStore((state) => state.user);
  const { users } = useAuthStore(); // Liste des utilisateurs existants
  const { chats = [], activeChat, setActiveChat, addMessage, addChat, deleteChat, updateChat } = useChatStore();
  const [message, setMessage] = useState("");
  const [showCreateChatModal, setShowCreateChatModal] = useState(false);
  const [showEditChatModal, setShowEditChatModal] = useState(false);
  const [newChat, setNewChat] = useState({ title: "", type: "public", members: [user.id] });
  const [editChat, setEditChat] = useState(null);
  const fileInputRef = useRef();
  const [userAvatar, setUserAvatar] = useState("");

  // Gestion de l'appel vidéo
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [stream, setStream] = useState(null);
  const localVideoRef = useRef();

  useEffect(() => {
    if (!user.avatar) {
   //   setUserAvatar(getRandomAvatar());
    } else {
      setUserAvatar(user.avatar);
    }
  }, [user]);

  const userChats = chats.filter((chat) =>
    user.role === "admin" ? true : chat.members?.includes(user.id)
  );

  const currentChat = userChats.find((chat) => chat.id === activeChat) || null;

  // Fonction pour ajouter/supprimer un membre d'un chat
  const toggleMember = (userId, chat, setChat) => {
    setChat((prevChat) => ({
      ...prevChat,
      members: prevChat.members.includes(userId)
        ? prevChat.members.filter((id) => id !== userId) // Supprimer
        : [...prevChat.members, userId], // Ajouter
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !activeChat || !user) return;

    addMessage(activeChat, {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username, // Ajouter le nom de l'utilisateur
      avatar: user.avatar, // Utiliser l'avatar de l'utilisateur
      content: message,
      timestamp: new Date().toISOString(),
    });

    console.log(user);
    setMessage("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !activeChat || !user) return;

    const fileUrl = URL.createObjectURL(file);

    addMessage(activeChat, {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username, // Ajouter le nom de l'utilisateur
      avatar: user.avatar, // Utiliser l'avatar de l'utilisateur
      content: file.name,
      fileUrl,
      timestamp: new Date().toISOString(),
      type: "file",
    });
  };

  const handleCreateChat = (e) => {
    e.preventDefault();
    if (!newChat.title.trim()) return;

    addChat({
      id: Date.now().toString(),
      title: newChat.title,
      type: newChat.type,
      members: [...newChat.members, user.id],
      messages: [],
    });

    setNewChat({ title: "", type: "public", members: [user.id] });
    setShowCreateChatModal(false);
  };

  const handleDeleteChat = (chatId) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce salon ?")) {
      deleteChat(chatId);
    }
  };

  const handleEditChat = (chat) => {
    setEditChat({ ...chat, members: [...(chat.members || [])] });
    setShowEditChatModal(true);
  };

  const handleSaveChat = () => {
    if (!editChat.title.trim()) return;

    updateChat(editChat.id, editChat);
    setShowEditChatModal(false);
  };

  const startVideoCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
      setIsVideoCall(true);
    } catch (err) {
      console.error("Erreur accès caméra/micro :", err);
    }
  };

  const endVideoCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setIsVideoCall(false);
  };

  return (
    <div className="chat-container">
      {/* Barre latérale des discussions */}
      <div className="chat-sidebar">
        <div className="chat-sidebar-header">
          <h2>Discussions</h2>
          {user.role === "admin" && (
            <button className="add-chat-btn" onClick={() => setShowCreateChatModal(true)}>
              <PlusCircle className="icon" /> Ajouter
            </button>
          )}
        </div>
        <div className="chat-list">
          {userChats.length > 0 ? (
            userChats.map((chat) => (
              <div key={chat.id} className="chat-item-container">
                <button
                  onClick={() => setActiveChat(chat.id)}
                  className={`chat-item ${activeChat === chat.id ? "active" : ""}`}
                >
                  {chat.type === "private" ? <Lock className="icon" /> : <MessageSquare className="icon" />}
                  <span>{chat.title}</span>
                </button>
                {user.role === "admin" && (
                  <div className="chat-actions">
                    <button className="edit-chat-btn" onClick={() => handleEditChat(chat)}>
                      <Edit3 className="icon text-blue-500" />
                    </button>
                    <button className="delete-chat-btn" onClick={() => handleDeleteChat(chat.id)}>
                      <Trash2 className="icon text-red-500" />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="no-chat">Aucune discussion disponible.</p>
          )}
        </div>
      </div>

      {/* Zone de discussion */}
      <div className="chat-content">
        {currentChat ? (
          <>
            <div className="chat-header">
              <h2>{currentChat.title}</h2>
              {!isVideoCall ? (
                <button onClick={startVideoCall} className="video-call-btn">📹 Démarrer l'appel vidéo</button>
              ) : (
                <button onClick={endVideoCall} className="video-end-btn">❌ Quitter l'appel</button>
              )}
            </div>

            {isVideoCall && (
              <div className="video-container">
                <video ref={localVideoRef} autoPlay playsInline className="video-feed" />
              </div>
            )}

            <div className="chat-messages">
              {currentChat.messages.length > 0 ? (
                currentChat.messages.map((msg) => {
                  const messageUser = users.find((u) => u.id === msg.userId);
                  return (
                    <div key={msg.id} className={`chat-message ${msg.userId === user.id ? "sent" : "received"}`}>
                      <img src={messageUser?.avatar} alt={messageUser?.username} className="avatar" />
                      <div className="message-content">
                        <span className="username">{messageUser?.username}</span>
                        {msg.type === "file" ? (
                          <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
                            📎 {msg.content}
                          </a>
                        ) : (
                          msg.content
                        )}
                        <span className="chat-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="no-messages">Aucun message</p>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="chat-input">
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Écrire un message..." />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="upload-btn">
                Envoyer un fichier
              </button>
              <button type="submit" className="send-btn">Envoyer</button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">Sélectionnez une discussion pour commencer à discuter</div>
        )}
      </div>

      {showCreateChatModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Créer une discussion</h3>
            <form onSubmit={handleCreateChat}>
              <input type="text" placeholder="Nom du chat" value={newChat.title} onChange={(e) => setNewChat({ ...newChat, title: e.target.value })} required />
              <select value={newChat.type} onChange={(e) => setNewChat({ ...newChat, type: e.target.value })}>
                <option value="public">Public</option>
                <option value="private">Privé</option>
              </select>

              <h4>Ajouter des membres</h4>
              <div className="user-list">
                {users
                  .filter((u) => u.id !== user.id)
                  .map((u) => (
                    <label key={u.id} className="user-item">
                      <input
                        type="checkbox"
                        checked={newChat.members.includes(u.id)}
                        onChange={() => toggleMember(u.id, newChat, setNewChat)}
                      />
                      {u.username}
                    </label>
                  ))}
              </div>

              <button type="submit">Créer</button>
              <button type="button" onClick={() => setShowCreateChatModal(false)}>Annuler</button>
            </form>
          </div>
        </div>
      )}

      {showEditChatModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Modifier la discussion</h3>
            <input type="text" value={editChat.title} onChange={(e) => setEditChat({ ...editChat, title: e.target.value })} required />
            <select value={editChat.type} onChange={(e) => setEditChat({ ...editChat, type: e.target.value })}>
              <option value="public">Public</option>
              <option value="private">Privé</option>
            </select>

            <h4>Gérer les membres</h4>
            <div className="user-list">
              {users
                .filter((u) => u.id !== user.id)
                .map((u) => (
                  <label key={u.id} className="user-item">
                    <input
                      type="checkbox"
                      checked={editChat.members?.includes(u.id)}
                      onChange={() => toggleMember(u.id, editChat, setEditChat)}
                    />
                    {u.username}
                  </label>
                ))}
            </div>

            <button onClick={handleSaveChat}>Enregistrer</button>
            <button onClick={() => setShowEditChatModal(false)}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}