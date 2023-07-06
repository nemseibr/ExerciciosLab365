import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar = ({ selectedButton, setSelectedButton }) => {
  const handleLogoClick = () => {
    setSelectedButton('dashboard');
  };

  return (
    <div className="navbar">
      <NavLink to="/dashboard" onClick={handleLogoClick} className="navbar-link">
        <img src="logo.png" alt="logo" className="logo" />
      </NavLink>

      <NavLink
        to="/dashboard"
        exact="true"
        className={`navbar-button ${selectedButton === 'dashboard' ? 'selected' : ''}`}
        onClick={() => setSelectedButton('dashboard')}
      >
        <span>
          <img src="pizza.png" alt="Dashboard" />
        </span>
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/unidades"
        className={`navbar-button ${selectedButton === 'unidadeConsumidora' ? 'selected' : ''}`}
        onClick={() => setSelectedButton('unidadeConsumidora')}
      >
        <span>
          <img src="energia.png" alt="Unidade Consumidora" />
        </span>
        <span>Unidade Consumidora</span>
      </NavLink>

      <NavLink
        to="/energiaGerada"
        className={`navbar-button ${selectedButton === 'energiaGerada' ? 'selected' : ''}`}
        onClick={() => setSelectedButton('energiaGerada')}
      >
        <span>
          <img src="engrenagem.png" alt="Cadastro de energia gerada" />
        </span>
        <span>Cadastro de Energia Gerada</span>
      </NavLink>
    </div>
  );
};

export default Navbar;





