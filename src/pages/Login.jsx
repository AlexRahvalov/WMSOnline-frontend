import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api'; // Импортируем apiRequest

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
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
      const result = await apiRequest('/api/login', 'POST', { email, password });

      if (result.token) {
        localStorage.setItem('token', result.token);
        navigate('/profile');
      } else {
        setError(result.message || 'Неверный логин или пароль');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="mb-4">
        <h1 className="display-4">WMSOnline</h1>
      </div>

      <Card className="p-4" style={{ width: '100%', maxWidth: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="mb-4 text-center">Вход</h3>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Электронная почта</Form.Label>
            <Form.Control type="email" placeholder="Введите почту" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Войти
          </Button>
        </Form>

        <div className="mt-3 text-center">
          <span>Нет аккаунта? </span>
          <Link to="/register">Зарегистрироваться</Link>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
