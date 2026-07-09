import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("https://healupbackend-production.up.railway.app/api/auth/create", form);
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1500); // go to login after signup
    } catch (err) {
      setMessage(err.response?.data?.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  // Internal CSS
  const styles = {
    container: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      width: "350px",
      textAlign: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    heading: { fontSize: "24px", fontWeight: "700", marginBottom: "20px", color: "#1E40AF" },
    input: { width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" },
    button: { width: "100%", padding: "12px", backgroundColor: "#1E40AF", color: "#fff", fontSize: "16px", fontWeight: "600", border: "none", borderRadius: "8px", cursor: "pointer", transition: "0.3s" },
    buttonHover: { backgroundColor: "#1E3A8A" },
    message: { marginTop: "15px", fontSize: "14px", color: "green" },
    footer: { marginTop: "20px", fontSize: "14px", color: "#333" },
    link: { color: "#1E40AF", cursor: "pointer", textDecoration: "underline", marginLeft: "5px" }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} style={styles.input} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} style={styles.input} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} required />
        <button type="submit" disabled={loading} style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}

      <p style={styles.footer}>
        Already have an account?
        <span onClick={() => navigate("/login")} style={styles.link}>Login</span>
      </p>
    </div>
  );
}