import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./page/login/LoginPage";
import Dashboard from "./page/Dashboard";
import ForgotPassword from "./page/login/ForgotPassword";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="App-header">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
