import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/login'; // Адрес бэкенда

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });
    return response.data; // Токен и сообщение от бэкенда
  } catch (error) {
    console.error('Ошибка при входе:', error.response.data);
    throw new Error(error.response.data.message);
  }
};
