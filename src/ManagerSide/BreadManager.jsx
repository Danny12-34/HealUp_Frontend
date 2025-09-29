import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BreadManager() {
  const [breads, setBreads] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    bread_description: "",
    price: "",
    image: null,
  });
  const [editingBreadId, setEditingBreadId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBreads();
  }, []);

  // ✅ Fetch all breads
  const fetchBreads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/breads");
      setBreads(res.data);
    } catch (err) {
      console.error("Error fetching breads:", err);
    }
  };

  // ✅ Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("bread_description", formData.bread_description);
    data.append("price", formData.price || "0");
    if (formData.image) data.append("photo", formData.image);

    try {
      if (editingBreadId) {
        await axios.put(`http://localhost:5000/api/breads/${editingBreadId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingBreadId(null);
      } else {
        await axios.post("http://localhost:5000/api/breads", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({ bread_description: "", price: "", image: null });
      setShowForm(false);
      fetchBreads();
    } catch (err) {
      console.error("Error submitting bread:", err);
      alert("There was an error submitting the bread. See console for details.");
    }
  };

  // ✅ Edit bread
  const handleEdit = (bread) => {
    setFormData({
      bread_description: bread.bread_description || "",
      price: bread.price !== null && bread.price !== undefined ? String(bread.price) : "",
      image: null,
    });
    setEditingBreadId(bread.id);
    setShowForm(true);
  };

  // ✅ Delete bread
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bread?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/breads/${id}`);
      fetchBreads();
    } catch (err) {
      console.error("Error deleting bread:", err);
      alert("Error deleting bread. See console.");
    }
  };

  return (
    <div style={styles.appContainer}>
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
            <a href="/manager/bread" style={{ ...styles.navLink, ...styles.activeNavLink }}>Manage Bread</a>
            <a href="/order/bread" style={styles.navLink}>Bread Ordered</a>

          </nav>
        </aside>
      )}

      {/* Main Content Area */}
      <main style={{ ...styles.main, marginLeft: sidebarOpen ? "190px" : "0px" }}>
        <button style={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "✖ Close" : "☰ Menu"}
        </button>

        <div style={styles.container}>
          <h1 style={styles.title}>🥖 Bread Management</h1>

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button style={styles.toggleButton} onClick={() => setShowForm(!showForm)}>
              {showForm ? "Hide Form" : editingBreadId ? "Edit Bread" : "Add New Bread"}
            </button>
          </div>

          {showForm && (
            <form style={styles.form} onSubmit={handleSubmit}>
              <h2 style={styles.formTitle}>{editingBreadId ? "Update Bread" : "Add New Bread"}</h2>

              <input
                style={styles.input}
                type="text"
                name="bread_description"
                placeholder="Bread Description"
                value={formData.bread_description}
                onChange={handleChange}
                required
              />

              <input
                style={styles.input}
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />

              <input
                style={styles.fileInput}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />

              <button style={styles.button} type="submit">
                {editingBreadId ? "Update Bread" : "Add Bread"}
              </button>
            </form>
          )}

          {/* Bread List */}
          <div style={styles.mealList}>
            {breads.map((bread) => (
              <div key={bread.id} style={styles.card}>
                <div style={styles.imageContainer}>
                  <img
                    src={bread.photo ? `http://localhost:5000/uploads/${bread.photo}` : "/placeholder.png"}
                    alt={bread.bread_description}
                    style={styles.image}
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </div>
                <h3 style={styles.mealName}>{bread.bread_description}</h3>
                <p style={styles.price}>Price: ${parseFloat(bread.price).toFixed(2)}</p>
                <div style={styles.cardButtons}>
                  <button style={styles.editBtn} onClick={() => handleEdit(bread)}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(bread.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ✅ Fixed CSS for no horizontal scroll
const styles = {
  appContainer: {
    display: "flex",
    fontFamily: "Arial, sans-serif",
    overflowX: "hidden",   // 🚀 prevent horizontal scroll
    width: "100%",
  },
  sidebar: {
    width: "190px",
    background: "#11af03ff",
    color: "#ecf0f1",
    height: "100vh",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    overflowY: "auto",
  },
  logo: {
    marginBottom: "30px",
    fontSize: "18px",
    textAlign: "center",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
  },
  navLink: {
    color: "#ecf0f1",
    textDecoration: "none",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    transition: "background 0.3s",
  },
  activeNavLink: {
    background: "#34495e",
  },
  main: {
    flex: 1,
    padding: "20px",
    transition: "margin-left 0.3s",
    minWidth: 0,          // 🚀 allow shrinking, no overflow
  },
  toggleBtn: {
    marginBottom: "20px",
    padding: "8px 12px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  container: {
    maxWidth: "100%",
    margin: "0 auto",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  toggleButton: {
    padding: "10px 15px",
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#f4f4f4",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  formTitle: {
    textAlign: "center",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  fileInput: {
    padding: "5px",
  },
  button: {
    padding: "10px",
    background: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  mealList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    width: "100%",      // 🚀 ensure grid does not overflow
  },
  card: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  imageContainer: {
    width: "100%",
    height: "150px",
    marginBottom: "10px",
    overflow: "hidden",
    borderRadius: "8px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  mealName: {
    fontSize: "18px",
    marginBottom: "8px",
  },
  price: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  cardButtons: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  editBtn: {
    background: "#f39c12",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
  },
  deleteBtn: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
  },
};
