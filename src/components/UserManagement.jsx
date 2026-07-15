import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "client" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const API_BASE = "https://heal-up-backend-pi.vercel.app/api/auth";

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/all`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/${editingId}`, form);
        setMessage("User updated successfully");
      } else {
        await axios.post(`${API_BASE}/create`, form);
        setMessage("User created successfully");
      }
      setForm({ name: "", email: "", password: "", role: "client" });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, password: "", role: user.role });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
    layout: { display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
    sidebar: {
      width: "220px",
      backgroundColor: "#1E3A8A",
      color: "#fff",
      padding: "20px",
      display: sidebarOpen ? "flex" : "none",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      height: "100%",
      zIndex: 100,
      transition: "0.3s",
    },
    logo: { fontSize: "24px", fontWeight: "bold", marginBottom: "30px", textAlign: "center" },
    nav: { display: "flex", flexDirection: "column", gap: "12px" },
    navLink: {
      color: "#fff",
      textDecoration: "none",
      padding: "8px",
      borderRadius: "6px",
      transition: "0.3s",
    },
    activeNavLink: { fontWeight: "bold", textDecoration: "underline", backgroundColor: "#2563EB" },
    main: { flex: 1, padding: "30px", marginLeft: sidebarOpen ? "220px" : "0px", transition: "margin-left 0.3s ease" },
    toggleBtn: { background: "#1E3A8A", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", marginBottom: "15px" },
    heading: { textAlign: "center", color: "#1E3A8A", marginBottom: "20px", fontSize: "28px", fontWeight: "700" },
    formCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)", marginBottom: "30px" },
    form: { display: "flex", gap: "10px", flexWrap: "wrap" },
    input: { padding: "10px", borderRadius: "8px", border: "1px solid #ccc", flex: "1", minWidth: "150px" },
    button: { padding: "10px 20px", border: "none", borderRadius: "8px", backgroundColor: "#2563EB", color: "#fff", cursor: "pointer", transition: "0.3s" },
    tableContainer: { overflowX: "auto", borderRadius: "10px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { border: "1px solid #ddd", padding: "12px", backgroundColor: "#1E3A8A", color: "#fff" },
    td: { border: "1px solid #ddd", padding: "12px", textAlign: "center" },
    trOdd: { backgroundColor: "#f9fafb" },
    actionBtn: { margin: "0 5px", padding: "5px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
    editBtn: { backgroundColor: "#10B981", color: "#fff" },
    deleteBtn: { backgroundColor: "#EF4444", color: "#fff" },
    message: { textAlign: "center", color: "green", marginBottom: "10px", fontWeight: "600" },
    // Responsive
    '@media (max-width: 768px)': { main: { marginLeft: 0 }, sidebar: { position: "absolute", zIndex: 100 } }
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>📊 HEALUP Manager</h2>
        <nav style={styles.nav}>
          <a href="/manager/Dashb" style={styles.navLink}>Dashboard</a>
          <a href="/category/manager" style={styles.navLink}>Categories</a>
          <a href="/manager/product" style={styles.navLink}>Manage Products</a>
          <a href="/manager/order" style={{ ...styles.navLink, ...styles.activeNavLink }}>Orders</a>
          <a href="/menu/manager" style={styles.navLink}>Manage Menu</a>
          <a href="/manager/cases" style={styles.navLink}>Manage Cases</a>
          <a href="/Manager/bread" style={styles.navLink}>Manage Bread</a>
          <a href="/order/bread" style={styles.navLink}>Bread Ordered</a>
          <a href="/manageusers" style={styles.navLink}>Manage Users</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <button style={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "✖ Close" : "☰ Menu"}
        </button>

        <h2 style={styles.heading}>User Management (CRUD)</h2>
        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.formCard}>
          <form style={styles.form} onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={styles.input} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} required />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} required={!editingId} />
            <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
              <option value="client">Client</option>
              <option value="manager">Manager</option>
            </select>
            <button type="submit" style={styles.button}>{editingId ? "Update User" : "Create User"}</button>
          </form>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Verified</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} style={index % 2 === 0 ? {} : styles.trOdd}>
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.role}</td>
                  <td style={styles.td}>{user.is_verified ? "Yes" : "No"}</td>
                  <td style={styles.td}>
                    <button style={{ ...styles.actionBtn, ...styles.editBtn }} onClick={() => handleEdit(user)}>Edit</button>
                    <button style={{ ...styles.actionBtn, ...styles.deleteBtn }} onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
