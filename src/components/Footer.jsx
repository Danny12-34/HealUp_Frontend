import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#0a0a0aff",
        color: "#fff",
        // padding: "30px 20px",
        paddingLeft: "20%",
        marginTop: "40px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        {/* About */}
        <div style={{ flex: "1", minWidth: "200px", marginBottom: "20px" }}>
          <h3 style={{ borderBottom: "2px solid #fff", paddingBottom: "5px" }}>
            HealMart
          </h3>
          <p style={{ fontSize: "14px" }}>
            Your trusted online health marketplace — where you find quality
            products for better living.
          </p>
        </div>

        {/* Links */}
        <div style={{ flex: "1", minWidth: "200px", marginBottom: "20px" }}>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "14px" }}>
            <li>
              <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
                Home
              </a>
            </li>
            <li>
              <a href="/products" style={{ color: "#fff", textDecoration: "none" }}>
                Products
              </a>
            </li>
            <li>
              <a href="/about" style={{ color: "#fff", textDecoration: "none" }}>
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" style={{ color: "#fff", textDecoration: "none" }}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div style={{ flex: "1", minWidth: "200px", marginBottom: "20px" }}>
          <h4>Contact</h4>
          <p style={{ fontSize: "14px" }}>
            📍 Kigali, Rwanda <br />
            📞 +250 788 123 456 <br />
            📧 support@healup.com
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          marginTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.3)",
          paddingTop: "10px",
          fontSize: "13px",
        }}
      >
        © {new Date().getFullYear()} HealMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
