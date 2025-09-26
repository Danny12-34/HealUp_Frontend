import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HealMart = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data || []);
        setFilteredProducts(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // Filter by category + search
  useEffect(() => {
    let temp = products;
    if (selectedCategory) {
      temp = temp.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (searchTerm) {
      temp = temp.filter((p) =>
        p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(temp);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, products]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product_id === product.product_id);
      if (existing) {
        return prev.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Sidebar Categories */}
      <div style={{ width: "200px", padding: "20px", borderRight: "1px solid #ddd" }}>
        <h3>Category</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.map((cat) => (
            <li
              key={cat.category_id}
              style={{
                margin: "10px 0",
                cursor: "pointer",
                color: selectedCategory === cat.category_name ? "#28a745" : "#000",
              }}
              onClick={() => setSelectedCategory(cat.category_name)}
            >
              {cat.category_name}
            </li>
          ))}
          <li
            style={{
              margin: "10px 0",
              cursor: "pointer",
              color: selectedCategory === "" ? "#28a745" : "#000",
            }}
            onClick={() => setSelectedCategory("")}
          >
            All Categories
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Top Filters */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "200px",
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_name}>
                {cat.category_name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "250px",
            }}
          />

          {/* Cart icon */}
          <div
            style={{ position: "relative", fontSize: "24px", cursor: "pointer" }}
            onClick={() => navigate("/cart")}
          >
            🛒
            {cartItems.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-12px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 8px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {currentProducts.map((product) => (
            <div
              key={product.product_id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
              }}
            >
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.product_name}
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "10px",
                }}
              />
              <h4 style={{ margin: "10px 0" }}>{product.product_name}</h4>
              <p style={{ color: "#28a745", fontWeight: "bold" }}>${product.price}</p>
              <p style={{ fontSize: "14px", color: "#555" }}>
                {expandedDescriptions[product.product_id]
                  ? product.description
                  : product.description?.length > 50
                  ? product.description.substring(0, 50) + "..."
                  : product.description}
                {product.description?.length > 50 && (
                  <span
                    onClick={() => toggleDescription(product.product_id)}
                    style={{
                      color: "#3625ceff",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  >
                    <p>
                      {expandedDescriptions[product.product_id]
                        ? "View Less"
                        : "View More"}
                    </p>
                  </span>
                )}
              </p>
              <button
                style={{
                  padding: "8px 15px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            flexWrap: "wrap",
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                margin: "0 5px 5px 0",
                padding: "5px 10px",
                backgroundColor: currentPage === page ? "#28a745" : "#fff",
                color: currentPage === page ? "#fff" : "#000",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealMart;
