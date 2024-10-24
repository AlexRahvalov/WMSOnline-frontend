// src/api/auth.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api'; // Убедитесь, что порт соответствует запущенному серверу

// Функция для получения данных пользователя
export const getUserData = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Токен отсутствует');
        }
        const response = await axios.get(`${API_URL}/user/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            try {
                const newToken = await refreshToken();
                const response = await axios.get(`${API_URL}/user/profile`, {
                    headers: { Authorization: `Bearer ${newToken}` }
                });
                return response.data;
            } catch (refreshError) {
                console.error('Ошибка при обновлении токена:', refreshError);
                throw new Error('Сессия истекла. Пожалуйста, войдите снова.');
            }
        }
        throw error;
    }
};

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const response = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
        localStorage.setItem('token', response.data.accessToken);
        return response.data.accessToken;
    } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password }); // Скорректированный путь
        return response.data; // Токен и сообщение от бэкенда
    } catch (error) {
        console.error('Ошибка при входе:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Ошибка при входе'); // Обработка ошибки
    }
};

export const registerUser = async (username, firstName, lastName, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            username,
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка регистрации:", error);
        throw error;  // Бросаем ошибку, чтобы её можно было обработать в компоненте
    }
};