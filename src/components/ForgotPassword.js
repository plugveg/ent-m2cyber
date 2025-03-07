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
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Réinitialisation du mot de passe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </label>
        </div>
        {message && <p className="text-green-500 text-sm text-center">{message}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Envoyer le lien de réinitialisation
        </button>
        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            Retour à la connexion
          </button>
        </div>
      </form>
    </div>
  );
}
