import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("https://healupbackend-production.up.railway.app/api/auth/verify-otp", { email, otp });
      const user = res.data.user;

      // Save user info
      localStorage.setItem("user", JSON.stringify(user));
      setMessage(res.data.message);

      // Redirect based on role
      setTimeout(() => {
        if (user.role.toLowerCase() === "manager") {
          navigate("/manager/Dashb");
        } else if (user.role.toLowerCase() === "client") {
          navigate("/mico");
        } else {
          navigate("/verify", { state: { email } });
        }
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #667eea, #764ba2)", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
    container: { background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(15px)", padding: "40px", borderRadius: "20px", width: "350px", textAlign: "center", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" },
    heading: { fontSize: "28px", fontWeight: "700", marginBottom: "20px", color: "#fff" },
    input: { width: "100%", padding: "12px", marginBottom: "20px", borderRadius: "10px", border: "none", outline: "none", fontSize: "16px", textAlign: "center", background: "rgba(255, 255, 255, 0.2)", color: "#fff", transition: "0.3s" },
    inputFocus: { background: "rgba(255, 255, 255, 0.3)" },
    button: { width: "100%", padding: "12px", backgroundColor: "#10B981", color: "#fff", fontSize: "16px", fontWeight: "600", border: "none", borderRadius: "10px", cursor: "pointer", transition: "0.3s" },
    buttonHover: { backgroundColor: "#059669" },
    message: { marginTop: "15px", fontSize: "14px", color: "#fff" },
    otpInfo: { marginBottom: "20px", fontSize: "14px", color: "#e0e0e0" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Verify OTP</h2>
        <p style={styles.otpInfo}>OTP sent to <strong>{email}</strong></p>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
            onFocus={(e) => (e.target.style.background = styles.inputFocus.background)}
            onBlur={(e) => (e.target.style.background = styles.input.background)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
