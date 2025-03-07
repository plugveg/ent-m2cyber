import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ForgotPassword.css'


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Si un compte existe avec cet e-mail, un lien de réinitialisation vous sera envoyé.');
    
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Réinitialisation du mot de passe</h2>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="input-group">
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          { message && <p className="forgot-password-message">{message}</p> }
          <button type="submit" className='forgot-password-button'>Envoyer le lien de réinitialisation</button>
        </form>
        <div className="text-center">
          <button type="button" onClick={() => navigate('/')} className="back-button">
            Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  );
}
