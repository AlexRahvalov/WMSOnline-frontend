import React from 'react'; 
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, ButtonGroup } from 'react-bootstrap';
import { FaSearch, FaBars, FaRegIdCard, FaUser } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // Проверка авторизации

  // Проверяем текущий путь, если это "/login" или "/register", скрываем шапку
  if (location.pathname === '/auth/login' || location.pathname === '/register') {
    return null;
  }

  // Обработчик выхода из системы
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/auth/login');
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container className="header-container">
        {/* Кнопка меню для десктопной версии */}
        <div className="d-none d-lg-flex align-items-center">
          <Button variant="outline-secondary me-2" onClick={toggleSidebar} className="bg-secondary-subtle">
            <FaBars />
          </Button>
        </div>

        {/* Логотип */}
        <Navbar.Brand href="#" className="text-secondary logo">
          <strong>WMS</strong>Online
        </Navbar.Brand>

        {/* Кнопки для десктопной версии */}
        <div className="d-none d-lg-flex ms-auto align-items-center">
          <Button variant="outline-secondary me-2" className="bg-secondary-subtle">
            <FaSearch />
          </Button>
          {isAuthenticated ? (
            <Link to="/profile">
              <Button variant="outline-secondary" className="bg-secondary-subtle" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                <FaUser />
              </Button>
            </Link>
          ) : (
            <Link to="/auth/login">
              <Button variant="outline-secondary" className="bg-secondary-subtle" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                <FaRegIdCard />
              </Button>
            </Link>
          )}
        </div>

        {/* Мобильные кнопки */}
        <div className="d-flex d-lg-none ms-auto align-items-center">
          <ButtonGroup className="me-2" style={{ gap: '0.5rem' }}>
            <Button variant="outline-secondary" onClick={toggleSidebar} className="bg-secondary-subtle">
              <FaBars />
            </Button>
            <Button variant="outline-secondary" className="bg-secondary-subtle">
              <FaSearch />
            </Button>
            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="outline-secondary" className="bg-secondary-subtle" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                  <FaUser />
                </Button>
              </Link>
            ) : (
              <Link to="/auth/login">
                <Button variant="outline-secondary" className="bg-secondary-subtle" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                  <FaRegIdCard />
                </Button>
              </Link>
            )}
          </ButtonGroup>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
