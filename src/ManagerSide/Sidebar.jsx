import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function SidebarLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { path: "/categories", label: "Categories", icon: "📂" },
    { path: "/products", label: "Products", icon: "📦" },
    { path: "/orders", label: "Orders", icon: "🛒" },
    { path: "/tips", label: "Tips", icon: "💡" },
  ];

  return (
    <div className="layout-container">
      Sidebar
      {/* <aside className={`sidebar ${isOpen || !isMobile ? "open" : ""}`}>
        <div className="top-section">
          <div className="logo">
            <h2>Manager Panel</h2>
          </div>
          {isMobile && (
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ×
            </button>
          )}
        </div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => isMobile && setIsOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">© 2025 Manager App</div>
      </aside> */}

      {/* Overlay */}
      {isMobile && isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      {/* Main content */}
      <main className="main-content">
        {isMobile && (
          <button className="hamburger" onClick={() => setIsOpen(true)}>
            ☰ Menu
          </button>
        )}
        <div className="content-box">{children}</div>
      </main>

      {/* CSS */}
      <style>{`
        // * {
        //   box-sizing: border-box;
        //   margin: 0;
        //   padding: 0;
        //   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        // }

        // .layout-container {
        //   display: flex;
        //   min-height: 100vh;
        //   background: #f5f6fa;
        // }

        // .sidebar {
        //   position: fixed;
        //   top: 19%;
        //   left: -250px;
        //   width: 250px;
        //   height: 100%;
        //   background: linear-gradient(to bottom, #2f3640, #353b48);
        //   color: #fff;
        //   transition: 0.3s;
        //   display: flex;
        //   flex-direction: column;
        //   z-index: 1000;
        // }

        // .sidebar.open {
        //   left: 0;
        // }

        // .top-section {
        //   display: flex;
        //   justify-content: space-between;
        //   align-items: center;
        //   padding: 1rem;
        //   border-bottom: 1px solid rgba(255,255,255,0.1);
        // }

        // .logo h2 {
        //   font-size: 1.5rem;
        //   color: #f5f6fa;
        // }

        // .close-btn {
        //   background: none;
        //   border: none;
        //   font-size: 1.5rem;
        //   color: #f5f6fa;
        //   cursor: pointer;
        // }

        // .nav-links {
        //   list-style: none;
        //   padding: 1rem 0;
        //   flex-grow: 1;
        //   color: #f5f6fa;
        // }

        // .nav-links li {
        //   margin: 0.5rem 0;
        //   color: #f5f6fa;
        // }

        

        // .icon {
        //   margin-right: 1rem;
        //   font-size: 1.2rem;
        // }

        // .sidebar-footer {
        //   padding: 1rem;
        //   text-align: center;
        //   font-size: 0.9rem;
        //   color: #7f8fa6;
        //   border-top: 1px solid rgba(255,255,255,0.1);
        // }

        // .overlay {
        //   position: fixed;
        //   top: 0;
        //   left: 0;
        //   width: 100%;
        //   height: 100%;
        //   background: rgba(0,0,0,0.4);
        //   z-index: 500;
        // }

        // .main-content {
        //   flex-grow: 1;
        //   margin-left: 0;
        //   width: 100%;
        //   transition: margin-left 0.3s;
        //   padding: 1rem;
        // }

        // .hamburger {
        //   display: inline-block;
        //   background: #40739e;
        //   color: #fff;
        //   padding: 0.5rem 1rem;
        //   border: none;
        //   border-radius: 5px;
        //   cursor: pointer;
        //   margin-bottom: 1rem;
        // }

        // .content-box {
        //   background: #fff;
        //   padding: 1.5rem;
        //   border-radius: 10px;
        //   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        // }

        // @media (min-width: 768px) {
        //   .sidebar {
        //     left: 0;
        //   }
        //   .main-content {
        //     margin-left: 250px;
        //   }
        //   .hamburger {
        //     display: none;
        //   }
        //   .overlay {
        //     display: none;
        //   }
        // }
      `}</style>
    </div>
  );
}
