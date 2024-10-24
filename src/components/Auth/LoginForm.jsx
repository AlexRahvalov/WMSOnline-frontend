// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth'; // Убедитесь, что путь к файлу верный
import 'bootstrap/dist/css/bootstrap.min.css'; // Импорт Bootstrap

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            navigate('/profile'); // Перенаправление на страницу профиля
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="card shadow mt-5" style={{ width: '25rem' }}>
            <div className="card-body">
                <h2 className="text-center">Вход</h2>
                <form onSubmit={handleLogin} className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Введите ваш email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Введите ваш пароль" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Войти</button>
                    {success && <p className="text-success mt-3">{success}</p>} {/* Успешное сообщение */}
                    {error && <p className="text-danger mt-3">{error}</p>} {/* Отображение ошибки */}
                </form>
                <p className="mt-3 text-center">
                    Нет аккаунта? <a href="/auth/register">Зарегистрироваться</a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
