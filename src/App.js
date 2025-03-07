import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import ChatPage from "./components/ChatPage";
import Planning from "./components/Planning";
import AdminPortal from "./components/AdminPortal";
import { useAuthStore } from "./store/authStore";
import ForgotPassword from './components/ForgotPassword';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router> {/* ✅ Ce Router ne doit exister qu'une seule fois */}
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <LoginPage />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <LoginPage />} />
            <Route path="/chat" element={user ? <ChatPage /> : <LoginPage />} />
            <Route path="/planning" element={user ? <Planning /> : <LoginPage />} />
            <Route path="/admin" element={user?.role === "admin" ? <AdminPortal /> : <Dashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
