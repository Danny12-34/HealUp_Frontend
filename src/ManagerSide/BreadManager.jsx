import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BreadManager() {
  const [breads, setBreads] = useState([]);
  const [cases, setCases] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    bread_description: "",
    price: "",
    category: "",
    case_type: "",
    image: null,
  });
  const [editingBreadId, setEditingBreadId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBreads();
    fetchCases();
  }, []);

  const fetchBreads = async () => {
    try {
      const res = await axios.get("http://https://healupbackend-production.up.railway.app/api/breads");
      setBreads(res.data);
    } catch (err) {
      console.error("Error fetching breads:", err);
    }
  };

  const fetchCases = async () => {
    try {
      const res = await axios.get("http://https://healupbackend-production.up.railway.app/api/cases");
      setCases(res.data || []);
    } catch (err) {
      console.error("Error fetching cases:", err);
      setCases([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("bread_description", formData.bread_description);
      data.append("price", formData.price || "0");
      data.append("category", formData.category || "");
      data.append("case_type", formData.case_type || "");

      if (formData.image) data.append("photo", formData.image); // Match backend field name

      if (editingBreadId) {
        await axios.put(`http://https://healupbackend-production.up.railway.app/api/breads/${editingBreadId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingBreadId(null);
      } else {
        await axios.post("http://https://healupbackend-production.up.railway.app/api/breads", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({ bread_description: "", price: "", category: "", case_type: "", image: null });
      setShowForm(false);
      fetchBreads();
    } catch (err) {
      console.error("Error submitting bread:", err);
      alert("Error submitting bread. See console.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bread) => {
    setFormData({
      bread_description: bread.bread_description || "",
      price: bread.price !== null && bread.price !== undefined ? String(bread.price) : "",
      category: bread.category || "",
      case_type: bread.case_type || "",
      image: null,
    });
    setEditingBreadId(bread.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bread?")) return;
    try {
      await axios.delete(`http://https://healupbackend-production.up.railway.app/api/breads/${id}`);
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
            <a href="/manageusers" style={styles.navLink}>Manage Users</a>
          </nav>
        </aside>
      )}

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

              {/* Category Dropdown */}
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Select Category</option>
                <option value="Healthy Breads">Healthy Breads</option>
                <option value="Healthy Pastries">Healthy Pastries</option>
                <option value="Healthy Snacks & Treats">Healthy Snacks & Treats</option>
                <option value="Celebration Cakes">Celebration Cakes</option>
                <option value="Special Add-ons">Special Add-ons</option>
              </select>

              {/* Case dropdown */}
              <select
                style={styles.input}
                name="case_type"
                value={formData.case_type}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Case Type --</option>
                {cases.length > 0 ? (
                  cases.map((c) => (
                    <option key={c.case_id} value={c.case_name}>
                      {c.case_name}
                    </option>
                  ))
                ) : (
                  <option value="">No cases available</option>
                )}
              </select>

              <input
                style={styles.fileInput}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />

              <button style={styles.button} type="submit" disabled={loading}>
                {loading ? (editingBreadId ? "Updating..." : "Adding...") : (editingBreadId ? "Update Bread" : "Add Bread")}
              </button>
            </form>
          )}

          {/* Bread List */}
          <div style={styles.mealList}>
            {breads.map((bread) => (
              <div key={bread.id} style={styles.card}>
                <div style={styles.imageContainer}>
                  <img
                    src={bread.photo ? `http://https://healupbackend-production.up.railway.app/uploads/${bread.photo}` : "/placeholder.png"}
                    alt={bread.bread_description}
                    style={styles.image}
                  />
                </div>
                <h3 style={styles.mealName}>{bread.bread_description}</h3>
                <p style={styles.price}>Price: ${bread.price ? parseFloat(bread.price).toFixed(2) : "0.00"}</p>
                <p style={styles.meta}><b>Category:</b> {bread.category || "N/A"}</p>
                <p style={styles.meta}><b>Case:</b> {bread.case_type || "N/A"}</p>
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

const styles = {
  appContainer: { display: "flex", fontFamily: "Arial, sans-serif", overflowX: "hidden", width: "100%" },
  sidebar: { width: "190px", background: "#11af03ff", color: "#ecf0f1", height: "100vh", padding: "20px", position: "fixed", top: 0, left: 0, overflowY: "auto" },
  logo: { marginBottom: "30px", fontSize: "18px", textAlign: "center" },
  nav: { display: "flex", flexDirection: "column" },
  navLink: { color: "#ecf0f1", textDecoration: "none", padding: "10px", marginBottom: "10px", borderRadius: "4px" },
  activeNavLink: { background: "#34495e" },
  main: { flex: 1, padding: "20px", transition: "margin-left 0.3s" },
  toggleBtn: { marginBottom: "20px", padding: "8px 12px", background: "#3498db", color: "#fff", border: "none", borderRadius: "4px" },
  container: { maxWidth: "100%", margin: "0 auto" },
  title: { fontSize: "24px", marginBottom: "20px", textAlign: "center" },
  toggleButton: { padding: "10px 15px", background: "#27ae60", color: "#fff", border: "none", borderRadius: "4px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", background: "#f4f4f4", padding: "20px", borderRadius: "8px", marginBottom: "20px" },
  formTitle: { textAlign: "center", marginBottom: "10px" },
  input: { padding: "10px", border: "1px solid #ccc", borderRadius: "4px" },
  fileInput: { padding: "5px" },
  button: { padding: "10px", background: "#2980b9", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  mealList: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" },
  card: { background: "#fff", border: "1px solid #ddd", borderRadius: "8px", padding: "15px", textAlign: "center" },
  imageContainer: { width: "100%", height: "150px", marginBottom: "10px", overflow: "hidden", borderRadius: "8px" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  mealName: { fontSize: "18px", marginBottom: "8px" },
  price: { fontSize: "16px", marginBottom: "10px" },
  meta: { fontSize: "14px", marginBottom: "6px", color: "#555" },
  cardButtons: { display: "flex", justifyContent: "space-between", gap: "10px" },
  editBtn: { background: "#f39c12", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", flex: 1 },
  deleteBtn: { background: "#e74c3c", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", flex: 1 },
};
