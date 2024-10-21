import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Импортируем необходимые компоненты
import 'bootstrap/dist/css/bootstrap.min.css'; // Импортируем стили Bootstrap

import Home from './pages/Home';  // Импорт главной страницы
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './routes/ProtectedRoute'; // Подключаем компонент защищённого маршрута

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Для защищенного маршрута используем ProtectedRoute */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
