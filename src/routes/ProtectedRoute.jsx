import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Проверяем наличие токена в localStorage

  // Если токен отсутствует, перенаправляем на страницу логина
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Если токен есть, отображаем дочерний компонент
  return children;
};

export default ProtectedRoute;
