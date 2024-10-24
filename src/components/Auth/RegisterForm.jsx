import React, { useState, useEffect } from 'react'; 
import { Form, Button, Container, Card, Alert } from 'react-bootstrap'; // Добавим Alert для уведомлений
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService'; // Импортируем функцию для регистрации пользователя
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setUsernameError('');
        setSuccess('');
        setIsLoading(true);

        const usernameRegex = /^[a-zA-Z0-9-_.]{6,}$/;

        if (!usernameRegex.test(username)) {
            setUsernameError('Имя пользователя должно содержать минимум 6 символов и состоять только из латинских букв, цифр, - или _.');
            setIsLoading(false);
            return;
        }

        if (!first_name.trim() || !last_name.trim()) {
            setError('Имя и фамилия обязательны.');
            setIsLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Некорректный формат электронной почты.');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Пароль должен содержать минимум 6 символов.');
            setIsLoading(false);
            return;
        }

        const registrationData = {
            username,
            first_name,
            last_name,
            email,
            password
        };
        console.log('Отправляемые данные:', JSON.stringify(registrationData, null, 2));

        try {
            const data = await registerUser(registrationData);
            setSuccess('Регистрация прошла успешно!'); // Уведомление об успешной регистрации
            console.log('Регистрация успешна:', data);
            navigate('/auth/login');
        } catch (error) {
            setError(error.message || 'Произошла ошибка при регистрации');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', position: 'relative' }}>
            <div className="mb-4">
                <h1 className="display-4">WMSOnline</h1>
            </div>

            <Card className="p-4" style={{ width: '100%', maxWidth: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h3 className="mb-4 text-center">Регистрация</h3>
                
                {/* Уведомления об ошибках и успехе */}
                {error && <Alert variant="danger">{error}</Alert>}
                {usernameError && <Alert variant="danger">{usernameError}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                <Form onSubmit={handleRegister}>
                    <Form.Group controlId="formBasicFirstName" className="mb-3">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите имя"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicLastName" className="mb-3">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите фамилию"
                            value={last_name}
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
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введите ваш email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите ваш пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                        {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
                    </Button>
                </Form>

                <div className="mt-3 text-center">
                    <span>Уже есть аккаунт? </span>
                    <Link to="/auth/login">Войти</Link>
                </div>
            </Card>
        </Container>
    );
};

export default RegisterForm;
