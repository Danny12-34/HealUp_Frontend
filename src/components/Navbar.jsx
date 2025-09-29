import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Heal Up</h1>

        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/healmart" onClick={() => setIsOpen(false)}>HealMart</Link></li>
          <li><Link to="/Home/HealUpLanding" onClick={() => setIsOpen(false)}>Eat & Meal</Link></li>
          <li><Link to="/Client/bread" onClick={() => setIsOpen(false)}>Healthy Bread</Link></li>
          <li><Link to="/learn" onClick={() => setIsOpen(false)}>Learn</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>          
          {/* <li><Link to="/manager/dash" onClick={() => setIsOpen(false)}>Manager</Link></li>
          {/* <li><Link to="/category/manager" onClick={() => setIsOpen(false)}>Categories</Link></li>
          <li><Link to="/manager/product" onClick={() => setIsOpen(false)}>Product</Link></li>
          <li><Link to="/manager/order" onClick={() => setIsOpen(false)}>OrderManagement</Link></li>
          <li><Link to="/menu/manager" onClick={() => setIsOpen(false)}>Menu</Link></li>
            */} 
          {/* <li><Link to="/order/bread" onClick={() => setIsOpen(false)}>Bread Ordered/Link</Link></li> */}
          <li><Link to="/manager/Dashb" onClick={() => setIsOpen(false)}>Manager</Link></li>
          
        </ul>
      </div>

      <style>{`
        .navbar {
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: flex-start; /* everything in one line */
          padding: 15px 40px;
          gap: 100px; /* space between logo and nav-links */
          flex-wrap: wrap;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #2ecc71;
        }

        .hamburger {
          font-size: 24px;
          background: none;
          border: none;
          cursor: pointer;
          display: none;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 20px; /* gap between links */
          margin: 0;
        }

        .nav-links li a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
        }

        .nav-links .cart {
          font-size: 20px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hamburger {
            display: block;
            margin-left: auto;
          }

          .nav-links {
            flex-direction: column;
            display: none;
            width: 100%;
            padding: 0 20px;
            background: #fff;
            gap: 0;
          }

          .nav-links.open {
            display: flex;
          }

          .nav-links li {
            width: 100%;
            padding: 10px 0;
          }

          .nav-links li a {
            display: block;
            width: 100%;
          }

          .nav-links .cart {
            padding: 10px 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
