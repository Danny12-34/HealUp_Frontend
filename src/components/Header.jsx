import React from 'react';

export default function Header({ currentPath = '/' }) {
  // Determine active states for each route
  const isHome = currentPath === '/';
  const isHealthyLiving = currentPath === '/HealthLiving';
  const isHealMart = currentPath === '/HealMart';
  const isHealUpCafe = currentPath === '/HealUpCafe';
  const isAboutUs = currentPath === '/Aboutus';
  const isContact = currentPath === '/Contact';

  return (
    <>
      {/* Internal Stylesheet */}
      <style>{`
        /* Top Utility Bar Styles */
        .top-bar {
          background-color: #1b4332;
          color: #ffffff;
          font-size: 12px;
          padding: 8px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .top-bar-left, .top-bar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background-color: #52b788;
          border-radius: 50%;
          display: inline-block;
        }

        /* Main Header Styles */
        .main-header {
          background-color: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .header-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background-color: #1b4332;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 18px;
          border: 2px solid #52b788;
        }

        .logo-text h1 {
          font-size: 20px;
          color: #1b4332;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin: 0;
        }

        .logo-text p {
          font-size: 10px;
          color: #6b7280;
          font-weight: 500;
          margin: 0;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 14px;
          font-weight: 500;
        }

        .nav-links a {
          text-decoration: none;
          color: #4b5563;
          padding-bottom: 4px;
          transition: all 0.2s ease;
        }

        /* Active Green Highlighting Rule */
        .nav-links a.active {
          color: #1b4332;
          font-weight: 700;
          border-bottom: 2px solid #2d6a4f;
        }

        .nav-links a:hover {
          color: #1b4332;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-box input {
          background-color: #f3f4f6;
          border: none;
          border-radius: 9999px;
          padding: 8px 16px;
          font-size: 14px;
          outline: none;
          width: 240px;
        }

        .user-action, .cart-action {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .cart-action {
          background-color: #1b4332;
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 9999px;
        }

        .cart-badge {
          background-color: #ffffff;
          color: #1b4332;
          font-size: 11px;
          padding: 1px 6px;
          border-radius: 9999px;
          font-weight: bold;
        }
      `}</style>

      {/* Top Utility Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span>🌿 Welcome to HealUp-Kira – Your Health, Our Priority</span>
        </div>
        <div className="top-bar-right">
          <span>Free delivery on orders over FRw 30,000</span>
          <span><span className="dot"></span> Kigali, Rwanda</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="main-header">
        <div className="header-content">
          <div className="logo-area">
            <div className="logo-icon">Hū</div>
            <div className="logo-text">
              <h1>HealUp-Kira</h1>
              <p>Healthy Living Starts Here</p>
            </div>
          </div>

          <nav className="nav-links">
            <a href="/" className={isHome ? 'active' : ''}>Home</a>
            <a href="/HealMart" className={isHealMart ? 'active' : ''}>HealMart</a>                       
            <a href="/HealUpCafe" className={isHealUpCafe ? 'active' : ''}>HealUp Café</a>
            <a href="/HealthLiving" className={isHealthyLiving ? 'active' : ''}>Healthy Living</a> 
            <a href="/Aboutus" className={isAboutUs ? 'active' : ''}>About Us</a>
            <a href="/ContactUs" className={isContact ? 'active' : ''}>Contact</a>
          </nav>

          <div className="header-actions">
            <div className="search-box">
              <input type="text" placeholder="Search for products..." />
            </div>
            <div className="user-action">👤 Account</div>
            <div className="cart-action">
              🛒 <span className="cart-badge">0</span> Cart
            </div>
          </div>
        </div>
      </header>
    </>
  );
}