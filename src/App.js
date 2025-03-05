import React, { useState } from 'react';
import './App.css';
import LoginPage from './page/login/LoginPage';
import GlobalPage from './GlobalePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <GlobalPage />
      ) : (
        <header className="App-header">
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        </header>
      )}
    </div>
  );
}

export default App;
