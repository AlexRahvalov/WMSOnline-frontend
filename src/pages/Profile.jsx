import React, { useState } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Иван Иванов',
    email: 'ivan.ivanov@email.com',
    phone: '+7 999 999 99 99',
    bio: 'Я разработчик с опытом работы более 5 лет.',
    imageUrl: 'https://via.placeholder.com/150',
  });
  const [newImage, setNewImage] = useState(null);

  // Обработчик изменения данных пользователя
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Обработчик загрузки фото
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Обработчик сохранения изменений
  const handleSaveChanges = () => {
    setUserData({
      ...userData,
      imageUrl: newImage || userData.imageUrl,
    });
    setShowModal(false);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '100%', maxWidth: '800px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="d-flex">
          {/* Фотография */}
          <div className="p-4">
            <img
              src={newImage || userData.imageUrl}
              alt="User"
              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
            />
            <div className="mt-2">
              <Button variant="outline-primary" onClick={() => setShowModal(true)}>
                Загрузить фото
              </Button>
            </div>
          </div>

          {/* Информация о пользователе */}
          <div className="p-4">
            <h3>Основная информация</h3>
            <div className="mb-3">
              <strong>Имя:</strong> {userData.name}
              <Button variant="link" className="ms-2" onClick={() => setShowModal(true)}>
                <FaEdit />
              </Button>
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {userData.email}
              <Button variant="link" className="ms-2" onClick={() => setShowModal(true)}>
                <FaEdit />
              </Button>
            </div>
            <div className="mb-3">
              <strong>Телефон:</strong> {userData.phone}
              <Button variant="link" className="ms-2" onClick={() => setShowModal(true)}>
                <FaEdit />
              </Button>
            </div>
            <div className="mb-3">
              <strong>О себе:</strong> {userData.bio}
              <Button variant="link" className="ms-2" onClick={() => setShowModal(true)}>
                <FaEdit />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Модальное окно для редактирования профиля */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать профиль</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Поле для изменения имени */}
            <Form.Group className="mb-3">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Поле для изменения email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Поле для изменения телефона */}
            <Form.Group className="mb-3">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Введите телефон"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Поле для изменения био */}
            <Form.Group className="mb-3">
              <Form.Label>О себе</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Расскажите о себе"
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Поле для загрузки фотографии */}
            <Form.Group className="mb-3">
              <Form.Label>Загрузить новое фото</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} />
            </Form.Group>

            {/* Кнопка для сохранения изменений */}
            <Button variant="primary" onClick={handleSaveChanges}>
              Сохранить изменения
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Profile;
