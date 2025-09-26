// MealsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [casesList, setCasesList] = useState([]); // ✅ store cases from API
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
    fetchCases(); // ✅ fetch cases as well
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
      const res = await axios.get("http://localhost:5000/api/cases");
      setCasesList(res.data); // assume API returns array of cases
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
    data.append("cases", formData.cases || "0"); // now caseId
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

  return (
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

          {/* ✅ Replaced cases input with dropdown */}
          <select
            style={styles.input}
            name="cases"
            value={formData.cases}
            onChange={handleChange}
            required
          >
            <option value="">Select Case</option>
            {casesList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.case_name || `Case ${c.id}`}
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
            <p style={styles.cases}>Case: {meal.cases}</p>
            <p style={styles.price}>Price: ${meal.price}</p>
            <div style={styles.cardButtons}>
              <button style={styles.editBtn} onClick={() => handleEdit(meal)}>Edit</button>
              <button style={styles.deleteBtn} onClick={() => handleDelete(meal.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ styles object unchanged
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    backgroundColor: "#f4f7f9",
    minHeight: "100vh"
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "20px",
    fontSize: "2.2rem"
  },
  toggleButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem"
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
    margin: "auto"
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
    margin: "10px 0"
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
    padding: "10px"
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
    borderRadius: "12px",
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
    backgroundColor: "#f39c12",
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
