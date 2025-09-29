import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Healthbread() {
  const [breads, setBreads] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    fetchBreads();
  }, []);

  const fetchBreads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/breads");
      setBreads(res.data);
    } catch (err) {
      console.error("Error fetching breads:", err);
    }
  };

  const handleAddToCart = (bread) => {
    setCart((prevCart) => [...prevCart, bread]);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
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
        await axios.post("http://localhost:5000/api/bread-orders", {
          bread_id: bread.id,
          bread_name: bread.bread_description,
          price: bread.price,
          quantity: 1,
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

  return (
    <div style={styles.appContainer}>
      <main style={styles.main}>
        <div style={styles.header}>
          <div style={styles.cartIcon} onClick={toggleCart}>
            🛒
            {cart.length > 0 && <span style={styles.cartBadge}>{cart.length}</span>}
          </div>
        </div>

        {showCart && (
          <div style={styles.cartDropdown}>
            <h3>Cart Items</h3>
            {cart.length === 0 && <p>Your cart is empty.</p>}
            {cart.map((item, idx) => (
              <div key={idx} style={styles.cartItem}>
                {item.bread_description} - ${parseFloat(item.price).toFixed(2)}
              </div>
            ))}

            {cart.length > 0 && (
              <>
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Your Phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <button style={styles.orderBtn} onClick={handleOrder}>
                  Place Order
                </button>
              </>
            )}
          </div>
        )}

        <div style={styles.container}>
          <h1 style={styles.title}>🥖 Bread List</h1>
          <div style={styles.mealList}>
            {breads.map((bread) => (
              <div key={bread.id} style={styles.card}>
                <div style={styles.imageContainer}>
                  <img
                    src={bread.photo ? `http://localhost:5000/uploads/${bread.photo}` : "/placeholder.png"}
                    alt={bread.bread_description}
                    style={styles.image}
                    onError={(e) => { e.target.src = "/placeholder.png"; }}
                  />
                </div>
                <h3 style={styles.mealName}>{bread.bread_description}</h3>
                <p style={styles.price}>${parseFloat(bread.price).toFixed(2)}</p>
                <button style={styles.cartBtn} onClick={() => handleAddToCart(bread)}>
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

const styles = {
  appContainer: {
    display: "flex",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowX: "hidden",
    width: "100%",
    background: "#f9f9f9",
    paddingLeft: "0px"
  },
  main: {
    flex: 1,
    padding: "20px",
    minWidth: 0
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "20px"
  },
  cartIcon: {
    position: "relative",
    fontSize: "26px",
    cursor: "pointer"
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
    justifyContent: "center"
  },
  cartDropdown: {
    position: "absolute",
    right: "20px",
    top: "50px",
    background: "#fff",
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    width: "320px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 1000
  },
  cartItem: {
    padding: "8px 0",
    borderBottom: "1px solid #eee",
    fontWeight: "500"
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
    fontWeight: "bold"
  },
  container: {
    maxWidth: "90%",
    margin: "0 auto"
  },
  title: {
    fontSize: "28px",
    marginBottom: "25px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#2c3e50"
  },
  mealList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "25px"
  },
  card: {
    background: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    cursor: "pointer"
  },
  imageContainer: {
    width: "100%",
    height: "160px",
    marginBottom: "10px",
    overflow: "hidden",
    borderRadius: "10px"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  mealName: {
    fontSize: "18px",
    marginBottom: "8px",
    fontWeight: "600"
  },
  price: {
    fontSize: "16px",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#27ae60"
  },
  cartBtn: {
    padding: "10px",
    background: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  input: {
    display: "block",
    width: "95%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  }
};
