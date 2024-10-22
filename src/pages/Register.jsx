import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';  // Импортируем apiRequest

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Отключаем прокрутку при загрузке страницы
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await apiRequest('/api/register', 'POST', {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      navigate('/login'); // Перенаправление на страницу авторизации после успешной регистрации
    } catch (err) {
      setError(err.message || 'Произошла ошибка при регистрации');
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="mb-4">
        <h1 className="display-4">WMSOnline</h1>
      </div>

      {/* Карточка с формой */}
      <Card className="p-4" style={{ width: '100%', maxWidth: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="mb-4 text-center">Регистрация</h3>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicFirstName" className="mb-3">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicLastName" className="mb-3">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите фамилию"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicUsername" className="mb-3">
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Электронная почта</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите почту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Зарегистрироваться
          </Button>
        </Form>

        <div className="mt-3 text-center">
          <span>Уже есть аккаунт? </span>
          <Link to="/login">Войти</Link>
        </div>
      </Card>
    </Container>
  );
};

export default Register;
