import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../components/Images/Logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <h1 className="logo">
          <img src={logo} alt="Heal Up Logo" style={{ width: "70px", height: "auto" }} />
        </h1>



        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <div className={`nav-left ${isOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link to="/healmart" onClick={() => setIsOpen(false)}>HealMart</Link></li>
            <li><Link to="/Home/HealUpLanding" onClick={() => setIsOpen(false)}>Eat & Meal</Link></li>
            <li><Link to="/Client/bread" onClick={() => setIsOpen(false)}>Healthy Bread</Link></li>
            <li><Link to="/Learn" onClick={() => setIsOpen(false)}>Learn</Link></li>
            <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            {/* <li><Link to="/manager/Dashb" onClick={() => setIsOpen(false)}>Manager</Link></li> */}
            <li><Link to="/wellness" onClick={() => setIsOpen(false)}>Wellness</Link></li>
          </ul>
        </div>

        <div className={`nav-right ${isOpen ? "open" : ""}`}>
          <div className={`nav-right ${isOpen ? "open" : ""}`}>
            <ul className="nav-links">
              <li>
                <Link to="/login" className="login-btn" onClick={() => setIsOpen(false)}>Login</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <style>{`
        .navbar {
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
          .login-btn {
  background-color: #1E40AF; 
  color: #fff;
  // padding: 2px 5px;
  padding: 15px 40px;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.3s;
}

.nav-links li a.login-btn {
  background-color: #1E40AF; /* Blue background */
  color: #fff !important;     /* Force white text */
  padding: 8px 15px;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.3s;
  text-decoration: none;
}

.nav-links li a.login-btn:hover {
  background-color: #3B82F6; /* Lighter blue on hover */
}


.login-btn:hover {
  background-color: #3B82F6; /* Lighter blue on hover */
}

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 40px;
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

        .nav-left, .nav-right {
          display: flex;
          align-items: center;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .nav-links li a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hamburger {
            display: block;
          }

          .nav-left, .nav-right {
            width: 100%;
            flex-direction: column;
            display: none;
            gap: 0;
            padding: 0 20px;
          }

          .nav-left.open, .nav-right.open {
            display: flex;
          }

          .nav-links {
            flex-direction: column;
            gap: 0;
          }

          .nav-links li {
            width: 100%;
            padding: 10px 0;
          }

          .nav-links li a {
            display: block;
            width: 100%;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
