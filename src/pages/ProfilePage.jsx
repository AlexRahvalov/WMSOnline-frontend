import React, { useEffect, useState } from 'react'; 
import { Container, Card } from 'react-bootstrap';
import { getUserData } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import '../assets/css/ProfilePage.css';
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (err) {
        console.error('Ошибка при получении данных пользователя:', err);
        setError(err.message);
        if (err.message === 'Сессия истекла. Пожалуйста, войдите снова.') {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          navigate('/auth/login');
        }
      }
    };

    if (localStorage.getItem('token')) {
      fetchUserData();
    } else {
      navigate('/auth/login');
    }
  }, [navigate]);

  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <Container fluid className="profile-container mt-4">
      <Card className="profile-card">
        <Card.Header as="h5">Профиль пользователя</Card.Header>
        <Card.Body>
          <Card.Title>{userData.username}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {userData.email}<br />
            <strong>Имя:</strong> {userData.first_name}<br />
            <strong>Фамилия:</strong> {userData.last_name}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
