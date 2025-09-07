import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const logoStyle = { fontSize: '24px', fontWeight: 'bold', color: '#2ecc71' };
  const listStyle = { display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0 };
  const linkStyle = { textDecoration: 'none', color: '#333', fontWeight: '500' };
  const cartStyle = { fontSize: '20px', cursor: 'pointer' };

  return (
    <nav style={navStyle}>
      <h1 style={logoStyle}>Heal Up</h1>
      <ul style={listStyle}>
        <li><Link to="/" style={linkStyle}>Home</Link></li>
        <li><Link to="/about" style={linkStyle}>About</Link></li>
        <li><Link to="/healmart" style={linkStyle}>HealMart</Link></li>
        <li><Link to="/eat-meal" style={linkStyle}>Eat & Meal</Link></li>
        <li><Link to="/healthy-bread" style={linkStyle}>Healthy Bread</Link></li>
        <li><Link to="/learn" style={linkStyle}>Learn</Link></li>
        <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
      </ul>
      <div style={cartStyle}>🛒</div>
    </nav>
  );
};

export default Navbar;
