import React, { useState } from 'react';
import { Nav, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Sidebar.css';

const Sidebar = ({ isVisible }) => {
    const warehouses = [{ name: 'Склад 1' },
        { name: 'Склад 2' },
        { name: 'Склад 3' }]; // Здесь должен быть ваш массив складов

    const [selectedWarehouse, setSelectedWarehouse] = useState('Все склады');

    const handleWarehouseChange = (event) => {
        setSelectedWarehouse(event.target.value);
    };

    return (
        <div className={`sidebar ${isVisible ? 'visible' : ''} bg-light d-flex flex-column`}>
            <div className="p-3">
                <h5>Выбор склада</h5>
                <Form.Select value={selectedWarehouse} onChange={handleWarehouseChange} className="mb-3">
                    <option value="Все склады">Все склады</option>
                    {warehouses.map((warehouse, index) => (
                        <option key={index} value={warehouse.name}>
                            {warehouse.name}
                        </option>
                    ))}
                </Form.Select>
            </div>
            <Nav className="flex-column p-3">
                <Nav.Link eventKey="organizations" className="mb-2">
                    Организации
                </Nav.Link>
                <Nav.Link eventKey="warehouses" className="mb-2">
                    Склады
                </Nav.Link>
                <Nav.Link eventKey="products" className="mb-2">
                    Товары
                </Nav.Link>
                <Nav.Link eventKey="contractors" className="mb-2">
                    Контрагенты
                </Nav.Link>
                <Nav.Link eventKey="documents" className="mb-2">
                    Документы
                </Nav.Link>
                <Nav.Link eventKey="settings" className="mb-2">
                    Настройки
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
