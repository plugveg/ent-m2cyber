import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./page/login/LoginPage";
import Dashboard from "./page/Dashboard";
import ForgotPassword from "./page/login/ForgotPassword";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import PortailAdmin from "./page/Portail Admin";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="App-header">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/Portail_Admin" element={<PortailAdmin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
