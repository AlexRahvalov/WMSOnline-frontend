import React from 'react';
import { useLocation } from 'react-router-dom'; // Импортируем useLocation для получения текущего пути
import { Navbar, Nav, Container, Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { FaSearch, FaBars, FaRegIdCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); // Получаем текущий путь

  // Проверяем, если текущий путь не "/login", тогда рендерим шапку
  if (location.pathname === '/login') return null;

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">
          <strong>WMS</strong>Online
        </Navbar.Brand>

        <div className="d-none d-lg-flex ms-auto align-items-center">
          <Form className="d-flex me-3" style={{ maxWidth: '300px' }}>
            <InputGroup>
              <FormControl
                type="search"
                placeholder="Поиск"
                aria-label="Search"
              />
              <Button variant="outline-success">
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>

          {/* Кнопка входа */}
          <Link to="/login">
            <Button variant="outline-primary">
              Войти
            </Button>
          </Link>
        </div>

        {/* Мобильные кнопки */}
        <div className="d-flex d-lg-none ms-auto align-items-center">
          <Button variant="outline-primary me-2">
            <FaRegIdCard />
          </Button>
          <Button variant="outline-primary me-2">
            <FaBars />
          </Button>
          <Button variant="outline-success">
            <FaSearch />
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
