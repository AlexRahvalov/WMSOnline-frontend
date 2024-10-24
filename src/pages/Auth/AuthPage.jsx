// src/pages/Auth/AuthPage.jsx

import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from '../../components/Auth/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm';

const AuthPage = ({ isLogin }) => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="mb-4">
        <h1 className="display-4">WMSOnline</h1>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}
    </Container>
  );
};

export default AuthPage;
