import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BreadOrdersManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [newOrder, setNewOrder] = useState({
    bread_id: "",
    bread_name: "",
    price: "",
    quantity: 1,
    customer_name: "",
    customer_email: "",
    customer_phone: ""
  });

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bread-orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/bread-orders", newOrder);
      setOrders([res.data, ...orders]);
      setNewOrder({
        bread_id: "",
        bread_name: "",
        price: "",
        quantity: 1,
        customer_name: "",
        customer_email: "",
        customer_phone: ""
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create order.");
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bread-orders/${id}`);
      setOrders(orders.filter(order => order.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete order.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/bread-orders/${id}/status`, { status: newStatus });
      setOrders(orders.map(order => order.id === id ? { ...order, status: res.data.status } : order));
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      {sidebarOpen && (
        <aside style={styles.sidebar}>
          <h2 style={styles.logo}>📊 HEALUP Manager</h2>
          <nav style={styles.nav}>
            <a href="/manager/Dashb" style={styles.navLink}>Dashboard</a>
            <a href="/category/manager" style={styles.navLink}>Categories</a>
            <a href="/manager/product" style={styles.navLink}>Manage Products</a>
            <a href="/manager/order" style={styles.navLink}>Orders</a>
            <a href="/menu/manager" style={styles.navLink}>Manage Menu</a>
            <a href="/manager/cases" style={styles.navLink}>Manage Cases</a>
            <a href="/order/bread" style={styles.navLink}>Bread Ordered</a>
          </nav>
        </aside>
      )}

      {/* Main */}
      <main style={{ ...styles.main, marginLeft: sidebarOpen ? "200px" : "0px" }}>
        <button style={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "✖ Close" : "☰ Menu"}
        </button>

        {/*  */}

        {/* Orders Display */}
        {loading ? (
          <p style={styles.loadingText}>Loading orders...</p>
        ) : (
          <div style={styles.cardsContainer}>
            {orders.map((order) => (
              <div key={order.id} style={styles.card}>
                <h3 style={styles.cardTitle}>{order.bread_name}</h3>
                <div style={styles.cardContent}>
                  <div>
                    <p style={styles.cardText}><b>Bread ID:</b> {order.bread_id}</p>
                    <p style={styles.cardText}><b>Price:</b> ${order.price}</p>
                    <p style={styles.cardText}><b>Quantity:</b> {order.quantity}</p>
                    <p style={styles.cardText}><b>Total:</b> ${order.total_price}</p>
                  </div>
                  <div>
                    <p style={styles.cardText}><b>Customer:</b> {order.customer_name}</p>
                    <p style={styles.cardText}><b>Email:</b> {order.customer_email}</p>
                    <p style={styles.cardText}><b>Phone:</b> {order.customer_phone}</p>
                    <p style={styles.cardText}>
                      <b>Status:</b>{" "}
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        style={styles.statusSelect}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Complete">Complete</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                    </p>
                  </div>
                </div>
                <button style={styles.deleteButton} onClick={() => handleDeleteOrder(order.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: { display: "flex", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "#f4f6f8", minHeight: "100vh", overflowX: "hidden" },
  sidebar: { width: "200px", background: "#11af03ff", padding: "20px", position: "fixed", height: "100%", color: "white", zIndex: 10, boxShadow: "2px 0px 5px rgba(0,0,0,0.1)" },
  logo: { fontSize: "20px", fontWeight: "bold", marginBottom: "30px", textAlign: "center" },
  nav: { display: "flex", flexDirection: "column", gap: "15px" },
  navLink: { color: "white", textDecoration: "none", fontSize: "16px", padding: "10px 15px", borderRadius: "6px", transition: "background 0.3s" },
  activeNavLink: { backgroundColor: "#1abc9c", fontWeight: "bold" },
  main: { padding: "20px", flex: 1, minHeight: "100vh",paddingLeft: "5%" },
  header: { fontSize: "26px", marginBottom: "20px", color: "#2c3e50", fontWeight: "600" },
  toggleBtn: { background: "#2c3e50", color: "white", border: "none", padding: "10px 15px", borderRadius: "6px", marginBottom: "20px", cursor: "pointer", fontWeight: "bold" },
  errorText: { color: "#dc3545", fontWeight: "bold", marginBottom: "15px" },
  form: { display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "30px", background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  input: { padding: "12px", borderRadius: "6px", border: "1px solid #ccc", flex: 1, fontSize: "14px" },
  submitButton: { padding: "12px 25px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
  loadingText: { fontSize: "18px", fontWeight: "500", color: "#555" },
  cardsContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" },
  card: { background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "12px" },
  cardTitle: { fontSize: "18px", fontWeight: "bold", color: "#2c3e50" },
  cardContent: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
  cardText: { fontSize: "14px", color: "#555" },
  deleteButton: { padding: "10px", background: "#e74c3c", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "10px", fontWeight: "bold" },
  statusSelect: { padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }
};
