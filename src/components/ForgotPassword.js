import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
      <div className="forgot-password-box">
        <h2 className="forgot-password-title">Réinitialisation du mot de passe</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          {message && <p className="forgot-password-message">{message}</p>}
          <button type="submit">Envoyer le lien de réinitialisation</button>
          <div className="text-center">
            <button type="button" onClick={() => navigate('/')} className="forgot-password-back">
              Retour à la connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
