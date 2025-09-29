import React from "react";

export default function Sidebar({ isOpen }) {
  if (!isOpen) return null; // hide sidebar if not open

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>HEALUP</h2>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>🏠 Dashboard</li>
        <li style={styles.menuItem}>📂 Categories</li>
        <li style={styles.menuItem}>📦 Products</li>
        <li style={styles.menuItem}>🛒 Orders</li>
        <li style={styles.menuItem}>💡 Tips</li>
        <li style={styles.menuItem}>🍽 Meals</li>
        <li style={styles.menuItem}>📋 Cases</li>
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 6px rgba(0,0,0,0.2)",
    zIndex: 100,
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "40px",
    textAlign: "center",
    color: "#f39c12",
    letterSpacing: "1px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  menuItem: {
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "16px",
  },
};
