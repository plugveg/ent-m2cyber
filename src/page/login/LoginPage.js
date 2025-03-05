import React, { useState } from 'react';
import testData from './loginTestData.json';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = testData.users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      alert('Login successful!');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Connection</h2>
      <div>
        <label>
          pseudonyme:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          mot de passe:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>Connection</button>
      <div>
        <a href="#">mot de passe oublié ?</a>
      </div>
    </div>
  );
};

export default LoginPage;