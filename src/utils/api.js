// src/utils/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Используем переменную окружения или дефолтный URL

const headers = {
  'Content-Type': 'application/json',
  // Можно добавить другие заголовки, например, для авторизации (если нужно)
  // 'Authorization': `Bearer ${token}`
};

export const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};
