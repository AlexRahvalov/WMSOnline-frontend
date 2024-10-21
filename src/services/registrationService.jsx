import axios from 'axios';

const API_URL = 'http://localhost:3000/register'; // Адрес бэкенда

export const registerUser = async (username, password, email, firstName, lastName) => {
  try {
    const response = await axios.post(API_URL, {
      username, 
      password, 
      email, 
      first_name: firstName, 
      last_name: lastName
    });
    return response.data; // Сообщение от бэкенда
  } catch (error) {
    console.error('Ошибка при регистрации:', error.response.data);
    throw new Error(error.response.data.message);
  }
};
