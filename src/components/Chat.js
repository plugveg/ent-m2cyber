import React, { useState, useEffect, useRef } from 'react';
import '../index.css';

const Chat = ({ discussion }) => { // On reçoit la discussion en paramètre
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const user = 'Moi';
  const avatar = 'https://i.pravatar.cc/40?img=10';

  useEffect(() => {
    // Charger les messages spécifiques à cette discussion depuis localStorage
    const savedMessages = JSON.parse(localStorage.getItem(`chatMessages_${discussion.id}`)) || [
      { user: 'Alice', text: 'Salut tout le monde !', time: '10:15', avatar: 'https://i.pravatar.cc/40?img=5' },
      { user: 'Bob', text: 'Hello !', time: '10:17', avatar: 'https://i.pravatar.cc/40?img=2' }
    ];
    setMessages(savedMessages);
  }, [discussion]);

  useEffect(() => {
    // Sauvegarder les messages dans localStorage
    localStorage.setItem(`chatMessages_${discussion.id}`, JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, discussion]);

  const sendMessage = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      const newMessage = {
        user,
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newMessage = {
          user,
          text: file.type.startsWith('image') ? '' : file.name,
          fileUrl: reader.result,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar
        };
        setMessages([...messages, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="chat-container">
      <h2>{discussion.title}</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.user === user ? 'self' : ''}`}>
            <img src={msg.avatar} alt={msg.user} className="avatar" />
            <div className="message-content">
              <div className="message-header">
                <span className="user-name">{msg.user}</span>
                <span className="message-time">{msg.time}</span>
              </div>
              {msg.text && <div className="message-text">{msg.text}</div>}
              {msg.fileUrl && msg.text === '' ? (
                <img src={msg.fileUrl} alt="Uploaded" className="uploaded-image" />
              ) : msg.fileUrl ? (
                <a href={msg.fileUrl} download className="file-link">📎 {msg.text}</a>
              ) : null}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Écrivez un message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={sendMessage}
        />
        <input type="file" onChange={handleFileUpload} className="file-input" />
      </div>
    </div>
  );
};

export default Chat;