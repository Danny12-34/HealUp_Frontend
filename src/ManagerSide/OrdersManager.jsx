import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true); // Added sidebar state

  const loadOrders = async () => {
    try {
      const res = await axios.get(API_URL);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (order_id, newStatus) => {
    try {
      // Find the order to update to ensure all data is sent (even if only status changes)
      const orderToUpdate = orders.find(o => o.order_id === order_id);
      await axios.put(`${API_URL}/${order_id}`, { ...orderToUpdate, status: newStatus });
      loadOrders(); // Refresh the list
    } catch (err) {
      console.error(err);
    }
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "Pending":
        return "#fff3cd"; // Yellow
      case "Completed":
        return "#d4edda"; // Green
      case "Cancel":
        return "#f8d7da"; // Red
      default:
        return "#fff";
    }
  };

  // Filter orders by search term
  const filteredOrders = orders.filter(order =>
    order.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  // Group orders by customer
  const groupedOrders = filteredOrders.reduce((acc, order) => {
    // Note: Assuming 'customer_name' is available on the order object
    if (!acc[order.customer_name]) acc[order.customer_name] = [];
    acc[order.customer_name].push(order);
    return acc;
  }, {});

  return (
    <div style={styles.appContainer}>
      {/* Sidebar Navigation */}
      {sidebarOpen && (
        <aside style={styles.sidebar}>
          <h2 style={styles.logo}>📊 HEALUP Manager</h2>
          <nav style={styles.nav}>
            <a href="/manager/Dashb" style={styles.navLink}>Dashboard</a>
            <a href="/category/manager" style={styles.navLink}>Categories</a>
            <a href="/manager/product" style={styles.navLink}>Manage Products</a>
            <a href="/manager/order" style={{ ...styles.navLink, ...styles.activeNavLink }}>Orders</a>
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

        <div style={styles.contentArea}>
            <h1 style={styles.header}>🛒 Order Manager Dashboard</h1>

            {/* Search Box */}
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search by Client Name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            {Object.keys(groupedOrders).length === 0 ? (
                <p style={styles.noOrdersText}>No orders found for the current search.</p>
            ) : (
                Object.keys(groupedOrders).map((customer) => (
                    <div key={customer} style={styles.customerGroup}>
                        <h2 style={styles.customerNameTitle}>{customer}</h2>
                        <div style={styles.orderCardContainer}>
                            {groupedOrders[customer].map(order => (
                                <div key={order.order_id} style={styles.orderCard}>
                                    <div style={styles.orderDetails}>
                                        <p style={styles.orderDetailText}><strong>Order ID:</strong> {order.order_id}</p>
                                        <p style={styles.orderDetailText}><strong>Product:</strong> {order.product_name}</p>
                                        <p style={styles.orderDetailText}><strong>Quantity:</strong> {order.quantity}</p>
                                        <p style={styles.orderDetailText}><strong>Total:</strong> ${order.total_price}</p>
                                        <p style={styles.orderDetailText}><strong>Phone:</strong> {order.customer_phone}</p>
                                    </div>
                                    <div>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                                            style={{
                                                ...styles.statusSelect,
                                                backgroundColor: getStatusColor(order.status),
                                            }}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancel">Cancel</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
      </main>
    </div>
  );
};

const styles = {
    // --- Sidebar and Layout Styles (Copied from previous manager components) ---
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
        backgroundColor: "#2980b9", // Blue highlight for Orders
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

    // --- OrdersManager Specific Styles ---
    contentArea: {
        // Original padding moved here, minus the top padding (handled by 'main')
        padding: "0 10px", 
    },
    header: {
        textAlign: "center",
        marginBottom: "25px",
        color: "#2c3e50",
        fontSize: "24px",
    },
    searchContainer: {
        textAlign: "center",
        marginBottom: "30px",
    },
    searchInput: {
        padding: "12px",
        width: "350px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    noOrdersText: {
        textAlign: "center",
        color: "#777",
        fontSize: "1.1rem",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    customerGroup: {
        marginBottom: "40px",
        padding: "15px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
    customerNameTitle: {
        marginBottom: "20px",
        color: "#2c3e50",
        fontSize: "1.5rem",
        borderBottom: "2px solid #eee",
        paddingBottom: "10px",
    },
    orderCardContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
    },
    orderCard: {
        flex: "1 1 300px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        padding: "15px",
        border: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    orderDetails: {
        flexGrow: 1,
    },
    orderDetailText: {
        margin: "6px 0",
        fontSize: "0.95rem",
        color: "#333",
    },
    statusSelect: {
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #aaa",
        cursor: "pointer",
        fontWeight: "bold",
        minWidth: "100px",
        textAlign: "center",
        // backgroundColor is handled by getStatusColor function
    },
};

export default OrdersManager;