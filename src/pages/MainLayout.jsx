import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProfilePage from '../pages/ProfilePage';

const MainLayout = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const isAuthenticated = !!localStorage.getItem('token'); // Проверка аутентификации

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="main-layout">
            <Sidebar isVisible={isSidebarVisible} />
            <div className={`content ${isSidebarVisible ? 'sidebar-open' : ''}`}>
                <Header toggleSidebar={toggleSidebar} />
                <Container fluid style={{ paddingTop: '56px' }}>
                    <Routes>
                        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth/login" />} />
                        {/* Добавьте другие маршруты здесь */}
                    </Routes>
                </Container>
            </div>
        </div>
    );
};

export default MainLayout;
