// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage';
import MainLayout from './pages/MainLayout';

const AppContent = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Routes>
            <Route path="/auth/login" element={isAuthenticated ? <Navigate to="/profile" /> : <AuthPage isLogin={true} />} />
            <Route path="/auth/register" element={isAuthenticated ? <Navigate to="/profile" /> : <AuthPage isLogin={false} />} />
            <Route path="/*" element={<MainLayout />} /> {/* Используем MainLayout для всех остальных маршрутов */}
        </Routes>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
