// src/services/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; // Используйте переменную окружения

// Функция для входа
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data; // Токен и сообщение от бэкенда
    } catch (error) {
        console.error('Ошибка при входе:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Ошибка при входе'); // Обработка ошибки
    }
};

// Функция для регистрации
export const registerUser = async ({ username, password, email, first_name, last_name }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            username,
            password,
            email,
            first_name,
            last_name
        });
        return response.data; // Сообщение от бэкенда
    } catch (error) {
        console.error('Ошибка при регистрации:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Ошибка при регистрации'); // Обработка ошибки
    }
};
