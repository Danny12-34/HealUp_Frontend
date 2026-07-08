import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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
      const res = await axios.post("http://healupbackend-production.up.railway.app/api/auth/login", form);

      // Save token if returned
      if (res.data.token) localStorage.setItem("token", res.data.token);

      setMessage(res.data.message || "Login successful");

      const user = res.data.user;

      // If OTP is verified, redirect directly based on role
      if (user?.role) {
        setTimeout(() => {
          if (user.role.toLowerCase() === "manager") {
            navigate("/manager/Dashb");
          } else if (user.role.toLowerCase() === "client") {
            navigate("/mico");
          } else {
            navigate("/verify", { state: { email: form.email } });
          }
        }, 1000);
      } else {
        // If OTP not verified yet, go to verify page
        setTimeout(() => navigate("/verify", { state: { email: form.email } }), 1000);
      }

    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #1E3A8A, #3B82F6)",
    },
    container: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      width: "350px",
      textAlign: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#1E40AF",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#1E40AF",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "0.3s",
    },
    buttonHover: { backgroundColor: "#1E3A8A" },
    message: { marginTop: "15px", fontSize: "14px", color: "green" },
    footer: { marginTop: "20px", fontSize: "14px", color: "#333" },
    link: {
      color: "#1E40AF",
      cursor: "pointer",
      textDecoration: "underline",
      marginLeft: "5px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={styles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.footer}>
          Don’t have an account?
          <span onClick={() => navigate("/signup")} style={styles.link}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
