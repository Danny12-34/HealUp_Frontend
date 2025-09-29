// MealsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [casesList, setCasesList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Added sidebar state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    cases: "",
    image: null
  });
  const [editingMealId, setEditingMealId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMeals();
    fetchCases();
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meals");
      setMeals(res.data);
    } catch (err) {
      console.error("Error fetching meals:", err);
    }
  };

  const fetchCases = async () => {
    try {
      // Assuming 'case_id' and 'case_name' exist on the case objects
      const res = await axios.get("http://localhost:5000/api/cases");
      setCasesList(res.data);
    } catch (err) {
      console.error("Error fetching cases:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("product_name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    // Use 'cases' which is the case ID selected from the dropdown
    data.append("cases", formData.cases || "0"); 
    data.append("price", formData.price || "0");
    if (formData.image) data.append("photo", formData.image);

    try {
      if (editingMealId) {
        await axios.put(`http://localhost:5000/api/meals/${editingMealId}`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setEditingMealId(null);
      } else {
        await axios.post("http://localhost:5000/api/meals", data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      setFormData({ name: "", description: "", category: "", price: "", cases: "", image: null });
      setShowForm(false);
      fetchMeals();
    } catch (err) {
      console.error("Error submitting meal:", err);
      alert("There was an error submitting the meal. See console for details.");
    }
  };

  const handleEdit = (meal) => {
    setFormData({
      name: meal.product_name || "",
      description: meal.description || "",
      category: meal.category || "",
      // Ensure 'cases' is correctly set to the case ID for the dropdown
      cases: meal.cases !== null && meal.cases !== undefined ? String(meal.cases) : "", 
      price: meal.price !== null && meal.price !== undefined ? String(meal.price) : "",
      image: null
    });
    setEditingMealId(meal.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this meal?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/meals/${id}`);
      fetchMeals();
    } catch (err) {
      console.error("Error deleting meal:", err);
      alert("Error deleting meal. See console.");
    }
  };

  // Helper function to find the case name
  const getCaseName = (caseId) => {
    const caseItem = casesList.find(c => String(c.case_id) === String(caseId));
    return caseItem ? caseItem.case_name : 'N/A';
  };

  return (
    <div style={styles.appContainer}>
      {/* Sidebar Navigation */}
      {sidebarOpen && (
        <aside style={styles.sidebar}>
          <h2 style={styles.logo}>📊 HEALUP Manager</h2>
          <nav style={styles.nav}>
            <a href="/" style={styles.navLink}>Dashboard</a>
            <a href="/category/manager" style={styles.navLink}>Categories</a>
            <a href="/manager/product" style={styles.navLink}>Manage Products</a>
            <a href="/manager/order" style={styles.navLink}>Orders</a>
            <a href="/menu/manager" style={{ ...styles.navLink, ...styles.activeNavLink }}>Manage Menu</a>
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
        
        <div style={styles.container}>
          <h1 style={styles.title}>🍽 Meals & Beverages Management</h1>

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button style={styles.toggleButton} onClick={() => setShowForm(!showForm)}>
              {showForm ? "Hide Form" : editingMealId ? "Edit Meal" : "Add New Meal"}
            </button>
          </div>

          {showForm && (
            <form style={styles.form} onSubmit={handleSubmit}>
              <h2 style={styles.formTitle}>{editingMealId ? "Update Meal" : "Add New Meal"}</h2>

              <input
                style={styles.input}
                type="text"
                name="name"
                placeholder="Meal Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <textarea
                style={styles.textarea}
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />

              <select
                style={styles.input}
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Meal">Meal</option>
                <option value="Beverage">Beverage</option>
              </select>

              {/* Cases Dropdown */}
              <select
                style={styles.input}
                name="cases"
                value={formData.cases}
                onChange={handleChange}
                required
              >
                <option value="">Select Case</option>
                {casesList.map((c) => (
                  <option key={c.case_id} value={c.case_id}>
                    {c.case_name || `Case ${c.case_id}`}
                  </option>
                ))}
              </select>

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
                {editingMealId ? "Update Meal" : "Add Meal"}
              </button>
            </form>
          )}

          {/* Meal List */}
          <div style={styles.mealList}>
            {meals.map((meal) => (
              <div key={meal.id} style={styles.card}>
                <div style={styles.imageContainer}>
                  <img
                    src={meal.photo ? `http://localhost:5000/uploads/${meal.photo}` : "/placeholder.png"}
                    alt={meal.product_name}
                    style={styles.image}
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </div>
                <h3 style={styles.mealName}>{meal.product_name}</h3>
                <p style={styles.description}>{meal.description}</p>
                <p style={styles.category}>Category: {meal.category}</p>
                <p style={styles.cases}>Case: **{getCaseName(meal.cases)}**</p>
                <p style={styles.price}>Price: **${parseFloat(meal.price).toFixed(2)}**</p>
                <div style={styles.cardButtons}>
                  <button style={styles.editBtn} onClick={() => handleEdit(meal)}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(meal.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// 5. Combined and updated styles
const styles = {
    // --- Sidebar and Layout Styles ---
    appContainer: {
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
        zIndex: 10,
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
        padding: "8px 10px",
        borderRadius: "5px",
        transition: "background-color 0.3s",
    },
    activeNavLink: {
        backgroundColor: "#1abc9c", // Highlight color for active link
        fontWeight: 'bold',
    },
    main: {
        padding: "20px",
        flex: 1,
        transition: "margin-left 0.3s ease-in-out",
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
    },

    // --- Original Content Styles ---
    container: {
        // Removed original container background/padding as it's now handled by main/appContainer
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        // The original component had padding, which we keep for the content inside main
        padding: "0", 
    },
    title: {
        textAlign: "center",
        color: "#2c3e50",
        marginBottom: "25px",
        fontSize: "2.2rem"
    },
    toggleButton: {
        padding: "10px 20px",
        backgroundColor: "#2c3e50", // Changed to match sidebar style
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        transition: "background-color 0.3s ease",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "40px",
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        margin: "20px auto", // Added vertical margin to separate from list/toggle
    },
    formTitle: {
        fontSize: "1.5rem",
        marginBottom: "15px",
        color: "#34495e"
    },
    input: {
        width: "100%",
        padding: "12px",
        margin: "8px 0",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem"
    },
    textarea: {
        width: "100%",
        height: "80px",
        padding: "12px",
        margin: "8px 0",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        resize: "vertical"
    },
    fileInput: {
        margin: "10px 0",
        width: "100%",
    },
    button: {
        padding: "12px 20px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        transition: "background 0.3s ease"
    },
    mealList: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "25px",
        padding: "10px",
        marginTop: "30px", // Added spacing
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease",
        textAlign: "center"
    },
    imageContainer: {
        overflow: "hidden",
        borderRadius: "8px", // Slightly smaller border radius for image inside card
        marginBottom: "15px"
    },
    image: {
        width: "100%",
        height: "180px",
        objectFit: "cover"
    },
    mealName: {
        color: "#2c3e50",
        fontSize: "1.2rem",
        margin: "8px 0"
    },
    description: {
        color: "#7f8c8d",
        fontSize: "0.95rem",
        minHeight: "50px"
    },
    category: {
        color: "#16a085",
        fontWeight: "bold",
        fontSize: "0.9rem"
    },
    cases: { // Added style for cases display
        color: "#8e44ad",
        fontWeight: "bold",
        fontSize: "0.9rem"
    },
    price: {
        color: "#e67e22",
        fontWeight: "bold",
        fontSize: "1rem",
        marginTop: "5px"
    },
    cardButtons: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px"
    },
    editBtn: {
        padding: "8px 12px",
        backgroundColor: "#3498db", // Changed to match manager edit buttons
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        color: "#fff",
        fontWeight: "bold"
    },
    deleteBtn: {
        padding: "8px 12px",
        backgroundColor: "#e74c3c",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        color: "#fff",
        fontWeight: "bold"
    }
};