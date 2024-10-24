 // src/api/userService.js
import axios from 'axios';

// Функция для получения данных пользователя
export const getUserData = async (userId) => {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
};
