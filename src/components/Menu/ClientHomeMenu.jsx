import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomeMenuPage() {
  const [items, setItems] = useState([]);
  const [cases, setCases] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCase, setSelectedCase] = useState("");

  useEffect(() => {
    fetchItems();
    fetchCases();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meals");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const fetchCases = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cases");
      setCases(res.data);
    } catch (err) {
      console.error("Error fetching cases:", err);
    }
  };

  const displayedItems = items.filter((item) => {
    // ✅ Category filter
    const categoryMatch =
      activeTab === "meals"
        ? item.category?.toLowerCase() === "meal"
        : activeTab === "beverages"
        ? item.category?.toLowerCase() === "beverage"
        : true;

    // ✅ Case filter (string comparison now)
    const caseMatch =
      selectedCase === "" ? true : item.cases === selectedCase;

    return categoryMatch && caseMatch;
  });

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>🍽 Eat and Heal</h1>
        <p style={styles.heroSubtitle}>
          Discover our delicious meals and refreshing beverages. Made with love
          for your health.
        </p>
      </div>

      {/* Description Section */}
      <div style={styles.descriptionSection}>
        <p>
          Our menu is designed to offer a variety of healthy and tasty choices.
          Switch between categories to explore our Meals and Beverages.
        </p>
      </div>

      {/* Toggle Buttons */}
      <div style={styles.toggleContainer}>
        <button
          style={activeTab === "all" ? styles.activeToggleButton : styles.toggleButton}
          onClick={() => {
            setActiveTab("all");
            setSelectedCase("");
          }}
        >
          All
        </button>
        <button
          style={activeTab === "meals" ? styles.activeToggleButton : styles.toggleButton}
          onClick={() => {
            setActiveTab("meals");
            setSelectedCase("");
          }}
        >
          Meals
        </button>
        <button
          style={activeTab === "beverages" ? styles.activeToggleButton : styles.toggleButton}
          onClick={() => {
            setActiveTab("beverages");
            setSelectedCase("");
          }}
        >
          Beverages
        </button>
      </div>

      {/* Dropdown for Cases */}
      {(activeTab === "meals" || activeTab === "beverages") && (
        <div style={styles.dropdownContainer}>
          <label htmlFor="casesDropdown" style={styles.dropdownLabel}>
            Select a Case:
          </label>
          <select
            id="casesDropdown"
            value={selectedCase}
            onChange={(e) => setSelectedCase(e.target.value)}
            style={styles.dropdown}
          >
            <option value="">-- Select Case --</option>
            {cases.map((c) => (
              <option key={c.id} value={c.case_name}>
                {c.case_name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Items List */}
      <div style={styles.mealList}>
        {displayedItems.length > 0 ? (
          displayedItems.map((meal) => (
            <div key={meal.id} style={styles.card}>
              <div style={styles.imageContainer}>
                <img
                  src={`http://localhost:5000/uploads/${meal.photo}`}
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
              <p style={styles.price}>Price: ${meal.price}</p>
              {meal.cases && (
                <p style={{ color: "#2980b9", fontWeight: "bold" }}>
                  Case: {meal.cases}
                </p>
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No items found for selected filters.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Eat and Heal. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f4f7f9", minHeight: "100vh" },
  hero: {
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1950&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "60px 20px",
    textAlign: "center",
    color: "#fff"
  },
  heroTitle: { fontSize: "3rem", fontWeight: "bold" },
  heroSubtitle: { fontSize: "1.2rem", marginTop: "10px" },
  descriptionSection: { textAlign: "center", padding: "20px", fontSize: "1.1rem", color: "#555" },
  toggleContainer: { textAlign: "center", marginBottom: "20px" },
  toggleButton: {
    padding: "10px 20px",
    backgroundColor: "#ddd",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    margin: "0 5px",
    cursor: "pointer",
    fontSize: "1rem"
  },
  activeToggleButton: {
    padding: "10px 20px",
    backgroundColor: "#059669",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    margin: "0 5px",
    cursor: "pointer",
    fontSize: "1rem"
  },
  dropdownContainer: { textAlign: "center", marginBottom: "20px" },
  dropdownLabel: { marginRight: "10px", fontSize: "1rem", fontWeight: "bold" },
  dropdown: { padding: "8px 12px", fontSize: "1rem", borderRadius: "6px" },
  mealList: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", padding: "10px" },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "center"
  },
  imageContainer: { overflow: "hidden", borderRadius: "12px", marginBottom: "15px" },
  image: { width: "100%", height: "180px", objectFit: "cover" },
  mealName: { color: "#2c3e50", fontSize: "1.2rem", margin: "8px 0" },
  description: { color: "#7f8c8d", fontSize: "0.95rem", minHeight: "50px" },
  category: { color: "#16a085", fontWeight: "bold", fontSize: "0.9rem" },
  price: { color: "#e67e22", fontWeight: "bold", fontSize: "1rem", marginTop: "5px" },
  footer: { textAlign: "center", padding: "20px", backgroundColor: "#059669", color: "#fff", marginTop: "40px" }
};
