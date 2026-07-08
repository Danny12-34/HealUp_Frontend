import React, { useEffect, useState } from "react";
import axios from "axios";

// Helper function to check for mobile width
const useMobileCheck = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default function Healthbread() {
  const [breads, setBreads] = useState([]);
  const [filteredBreads, setFilteredBreads] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true); // State for Toggling the Sidebar
  
  const isMobile = useMobileCheck(768); // Check if screen is less than 768px

  const [cases, setCases] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const categories = [
    "Healthy Breads",
    "Healthy Pastries",
    "Healthy Snacks & Treats",
    "Celebration Cakes",
    "Special Add-ons"
  ];

  useEffect(() => {
    fetchBreads();
    fetchCases();
    // On mobile, default to hiding the sidebar initially
    if (isMobile) {
        setShowSidebar(false);
    }
  }, [isMobile]);

  // ... (fetchBreads, fetchCases, handleCategoryClick, handleCaseClick, applyFilters, handleAddToCart, toggleCart, handleOrder functions remain the same) ...
  // NOTE: I'm omitting the identical functions for brevity. Please keep them in your file.

  const fetchBreads = async () => {
    try {
      const res = await axios.get("http://https://healupbackend-production.up.railway.app/api/breads");
      setBreads(res.data);
      setFilteredBreads(res.data);
    } catch (err) {
      console.error("Error fetching breads:", err);
    }
  };

  const fetchCases = async () => {
    try {
      const res = await axios.get("http://https://healupbackend-production.up.railway.app/api/cases");
      setCases(res.data);
    } catch (err) {
      console.error("Error fetching cases:", err);
      setCases([]);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === "All Categories" ? null : category);
    applyFilters(category === "All Categories" ? null : category, selectedCase);
  };

  const handleCaseClick = (caseName) => {
    setSelectedCase(caseName === "All Cases" ? null : caseName);
    applyFilters(selectedCategory, caseName === "All Cases" ? null : caseName);
  };

  const applyFilters = (category, caseType) => {
    let filtered = breads;

    if (category) {
      filtered = filtered.filter(b => b.category === category);
    }

    if (caseType) {
      filtered = filtered.filter(b => b.case_type === caseType);
    }

    setFilteredBreads(filtered);
  };

  const handleAddToCart = (bread) => {
    setCart((prevCart) => [...prevCart, bread]);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    if (!customerName || !customerEmail || !customerPhone) {
      alert("Please fill in customer details.");
      return;
    }

    try {
      for (const bread of cart) {
        await axios.post("http://https://healupbackend-production.up.railway.app/api/bread-orders", {
          bread_id: bread.id,
          bread_name: bread.bread_description,
          price: bread.price,
          quantity: 1,
          category: bread.category,
          case_type: bread.case_type,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone
        });
      }

      alert("Order placed successfully!");
      setCart([]);
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setShowCart(false);
    } catch (error) {
      console.error(error);
      alert("Failed to place order.");
    }
  };
  
  // Use a function to dynamically apply styles based on the screen size
  const dynamicStyles = getStyles(isMobile);

  return (
    <div style={dynamicStyles.appContainer}>
      {/* Sidebar for Categories - Only render if showSidebar is true */}
      {showSidebar && (
        <aside style={dynamicStyles.sidebar}>
          <h3>Categories</h3>
          <div
            style={selectedCategory === null ? dynamicStyles.activeCategory : dynamicStyles.categoryItem}
            onClick={() => handleCategoryClick("All Categories")}
          >
            All Categories
          </div>
          {categories.map((cat, idx) => (
            <div
              key={idx}
              style={selectedCategory === cat ? dynamicStyles.activeCategory : dynamicStyles.categoryItem}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </div>
          ))}
        </aside>
      )}

      <main style={dynamicStyles.main}>
        {/* Header with Menu and Cart Icons */}
        <div style={dynamicStyles.header}>
            {/* Menu/Toggle Sidebar Button */}
            <button 
                onClick={toggleSidebar} 
                style={dynamicStyles.menuButton}>
                {showSidebar ? '« Hide Categories' : '» Show Categories'}
            </button>

            {/* Cart Icon */}
            <div style={dynamicStyles.cartIcon} onClick={toggleCart}>
                🛒
                {cart.length > 0 && <span style={dynamicStyles.cartBadge}>{cart.length}</span>}
            </div>
        </div>

        {/* Cart Dropdown */}
        {showCart && (
          <div style={dynamicStyles.cartDropdown}>
            <h3>Cart Items</h3>
            {cart.length === 0 && <p>Your cart is empty.</p>}
            {cart.map((item, idx) => (
              <div key={idx} style={dynamicStyles.cartItem}>
                {item.bread_description} - ${parseFloat(item.price).toFixed(2)}
                <br />
                <small>{item.category} | {item.case_type}</small>
              </div>
            ))}

            {cart.length > 0 && (
              <>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={dynamicStyles.input}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  style={dynamicStyles.input}
                />
                <input
                  type="text"
                  placeholder="Your Phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={dynamicStyles.input}
                />
                <button style={dynamicStyles.orderBtn} onClick={handleOrder}>Place Order</button>
              </>
            )}
          </div>
        )}

        {/* Bread Cards */}
        <div style={dynamicStyles.container}>
          <h1 style={dynamicStyles.title}>🥖 Bread List</h1>

          {/* Cases Filter */}
          <div style={dynamicStyles.filterBar}> 
            <div
              style={selectedCase === null ? dynamicStyles.activeFilter : dynamicStyles.filterBtn}
              onClick={() => handleCaseClick("All Cases")}
            >
              All Cases
            </div>
            {cases.map((c) => (
              <div
                key={c.case_id}
                style={selectedCase === c.case_name ? dynamicStyles.activeFilter : dynamicStyles.filterBtn}
                onClick={() => handleCaseClick(c.case_name)}
              >
                {c.case_name}
              </div>
            ))}
          </div>

          {/* Bread Cards */}
          <div style={dynamicStyles.mealList}>
            {filteredBreads.map((bread) => (
              <div key={bread.id} style={dynamicStyles.card}>
                <div style={dynamicStyles.imageContainer}>
                  <img
                    src={bread.photo ? `http://https://healupbackend-production.up.railway.app/uploads/${bread.photo}` : "/placeholder.png"}
                    alt={bread.bread_description}
                    style={dynamicStyles.image}
                  />
                </div>
                <h3 style={dynamicStyles.mealName}>{bread.bread_description}</h3>
                <p style={dynamicStyles.price}>${parseFloat(bread.price).toFixed(2)}</p>
                <p style={{ fontSize: "14px", color: "#555" }}>
                  <strong>Category:</strong> {bread.category || "N/A"} <br />
                  <strong>Case:</strong> {bread.case_type || "N/A"}
                </p>
                <button style={dynamicStyles.cartBtn} onClick={() => handleAddToCart(bread)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ==========================================================
// 2. STYLES OBJECT (Now a function to handle responsiveness)
// ==========================================================

const getStyles = (isMobile) => ({
  appContainer: {
    display: isMobile ? 'block' : 'flex', // Stack on mobile
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
    overflowX: "hidden", // CRUCIAL: Prevents horizontal scrollbars
  },
  sidebar: {
    width: isMobile ? '100%' : '200px', // Full width on mobile
    background: "#f4f4f4",
    padding: "10px",
    borderRight: isMobile ? 'none' : "1px solid #ddd",
    borderBottom: isMobile ? "1px solid #ddd" : 'none',
    height: isMobile ? 'auto' : "100vh",
    position: isMobile ? 'relative' : "sticky",
    top: 0,
    overflowY: "auto",
    boxSizing: "border-box",
  },
  categoryItem: {
    padding: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  activeCategory: {
    padding: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#27ae60",
  },
  main: {
    flex: 1,
    padding: isMobile ? "10px" : "20px",
    minWidth: isMobile ? "auto" : "300px",
    boxSizing: "border-box",
    overflow: "hidden", 
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  menuButton: { 
    padding: isMobile ? "6px 10px" : "8px 12px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: isMobile ? "12px" : "14px",
  },
  cartIcon: {
    position: "relative",
    fontSize: "26px",
    cursor: "pointer",
  },
  cartBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "#e74c3c",
    color: "#fff",
    borderRadius: "50%",
    fontSize: "14px",
    fontWeight: "bold",
    minWidth: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cartDropdown: {
    position: "absolute",
    right: isMobile ? "10px" : "20px",
    top: "50px",
    background: "#fff",
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    width: isMobile ? "280px" : "320px",
    zIndex: 1000,
  },
  cartItem: {
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  },
  orderBtn: {
    padding: "10px",
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
    width: "100%",
    fontWeight: "bold",
  },
  filterBar: {
    display: "flex",
    flexWrap: "wrap", // CRUCIAL: Makes the filters wrap to the next line
    gap: "10px",
    marginBottom: "20px",
    paddingBottom: "10px",
    justifyContent: "flex-start",
  },
  filterBtn: {
    padding: isMobile ? "4px 8px" : "6px 12px",
    background: "#ecf0f1",
    borderRadius: "6px",
    cursor: "pointer",
    border: "1px solid #ccc",
    whiteSpace: "nowrap",
    fontSize: isMobile ? "12px" : "14px",
  },
  activeFilter: {
    padding: isMobile ? "4px 8px" : "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "1px solid #27ae60",
    whiteSpace: "nowrap",
    background: "#27ae60",
    color: "#fff",
    fontWeight: "bold",
    fontSize: isMobile ? "12px" : "14px",
  },
  container: {
    maxWidth: "100%",
    margin: "0 auto",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  mealList: {
    display: "grid",
    gridTemplateColumns: isMobile 
        ? "repeat(auto-fill, minmax(150px, 1fr))" 
        : "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "25px",
  },
  card: {
    background: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },
  imageContainer: {
    width: "100%",
    height: "160px",
    marginBottom: "10px",
    overflow: "hidden",
    borderRadius: "10px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  mealName: {
    fontSize: "18px",
    marginBottom: "8px",
    fontWeight: "600",
  },
  price: {
    fontSize: "16px",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#27ae60",
  },
  cartBtn: {
    padding: "10px",
    background: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  input: {
    display: "block",
    width: "95%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
});