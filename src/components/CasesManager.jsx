import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CasesManager() {
  const [cases, setCases] = useState([]);
  const [caseName, setCaseName] = useState("");
  const [editingCaseId, setEditingCaseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Added sidebar state

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/cases");
      setCases(res.data);
    } catch (err) {
      console.error("Error fetching cases:", err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caseName.trim()) return;

    try {
      if (editingCaseId) {
        await axios.put(`http://localhost:5000/api/cases/${editingCaseId}`, { case_name: caseName });
      } else {
        await axios.post("http://localhost:5000/api/cases", { case_name: caseName });
      }
      setCaseName("");
      setEditingCaseId(null);
      fetchCases();
    } catch (err) {
      console.error("Error saving case:", err);
    }
  };

  const handleEdit = (caseItem) => {
    setCaseName(caseItem.case_name);
    setEditingCaseId(caseItem.case_id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this case?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/cases/${id}`);
      fetchCases();
    } catch (err) {
      console.error("Error deleting case:", err);
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar Navigation */}
      {sidebarOpen && (
        <aside style={styles.sidebar}>
          <h2 style={styles.logo}>📊 HEALUP Manager</h2>
          <nav style={styles.nav}>
            <a href="/" style={styles.navLink}>Dashboard</a>
            <a href="/category/manager" style={styles.navLink}>Categories</a>
            <a href="/manager/product" style={styles.navLink}>Manage Products</a>
            <a href="/manager/order" style={styles.navLink}>Orders</a>
            <a href="/menu/manager" style={styles.navLink}>Manage Menu</a>
            <a href="/manager/cases" style={styles.navLink}>Manage Cases</a>
            <a href="/Manager/bread" style={styles.navLink}>Manage Bread</a>
            <a href="/order/bread" style={styles.navLink}>Bread Ordered</a>
          </nav>
        </aside>
      )}

      {/* Main Content Area */}
      <main style={{ ...styles.main, marginLeft: sidebarOpen ? "190px" : "0px" }}>
        <button style={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "✖ Close" : "☰ Menu"}
        </button>

        {/* Video Background - Moved into main content for better visual layering/control */}
        <video autoPlay loop muted style={styles.videoBackground}>
          <source src="https://www.w3schools.com/howto/rain.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Content Overlay */}
        <div style={styles.overlay}>
          <h1 style={styles.title}>📂 Cases Manager</h1>

          {/* Form */}
          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter case name"
              value={caseName}
              onChange={(e) => setCaseName(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.submitButton}>
              {editingCaseId ? "Update Case" : "Add Case"}
            </button>
          </form>

          {/* Cases List */}
          {loading ? (
            <p style={styles.loadingText}>Loading cases...</p>
          ) : (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Case Name</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={styles.noData}>
                        No cases found.
                      </td>
                    </tr>
                  ) : (
                    cases.map((caseItem, index) => (
                      <tr
                        key={caseItem.case_id}
                        style={{
                          ...styles.tr,
                          backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            index % 2 === 0 ? "#fafafa" : "#fff")
                        }
                      >
                        <td style={styles.td}>{caseItem.case_id}</td>
                        <td style={styles.td}>{caseItem.case_name}</td>
                        <td style={styles.td}>
                          <button style={styles.editButton} onClick={() => handleEdit(caseItem)}>
                            Edit
                          </button>
                          <button
                            style={styles.deleteButton}
                            onClick={() => handleDelete(caseItem.case_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  // Styles from ManagerDashboard for layout and sidebar
  container: {
    display: "flex",
    fontFamily: "Arial, sans-serif",
    background: "#f4f6f8",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  sidebar: {
    width: "180px",
    background: "#11af03ff",
    padding: "15px",
    position: "fixed",
    height: "100%",
    color: "white",
    zIndex: 100, // Increased z-index to overlay content properly
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "25px",
    textAlign: "center",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    padding: "6px 8px",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
  main: {
    padding: "20px",
    flex: 1,
    transition: "margin-left 0.3s ease-in-out",
    position: "relative", // Needed for video background positioning
    minHeight: "100vh",
  },
  toggleBtn: {
    background: "#2c3e50",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    marginBottom: "15px",
    cursor: "pointer",
    position: "absolute", // Position button relative to main content
    top: "20px",
    left: "20px",
    zIndex: 5, // Above video, below overlay
  },

  // Existing CasesManager styles, adjusted for new layout
  videoBackground: {
    position: "absolute", // Changed from 'fixed' to 'absolute' relative to 'main'
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
    opacity: 0.8, // Slightly reduced opacity
  },
  overlay: {
    position: "relative",
    zIndex: 1,
    padding: "20px",
    // Remove background here to let the video shine, or keep a translucent one:
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    minHeight: "calc(100vh - 40px)", // Adjust height
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    width: "300px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  loadingText: {
    textAlign: "center",
    color: "#555",
    fontSize: "1.1rem",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "50%",
    minWidth: "400px", // Ensure minimum width for small screens
    margin: "0 auto",
    borderCollapse: "separate",
    borderSpacing: "0",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    fontSize: "1rem",
  },
  tableHeader: {
    backgroundColor: "#28a745",
    color: "#fff",
    textAlign: "left",
  },
  th: {
    padding: "14px",
    fontSize: "1rem",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  tr: {
    transition: "background-color 0.3s ease",
    cursor: "default",
  },
  td: {
    padding: "12px",
    fontSize: "0.95rem",
    color: "#333",
  },
  editButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginRight: "5px",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#777",
    fontStyle: "italic",
  },
};