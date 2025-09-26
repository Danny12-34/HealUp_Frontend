import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState(""); // Search term

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
      const orderToUpdate = orders.find(o => o.order_id === order_id);
      await axios.put(`${API_URL}/${order_id}`, { ...orderToUpdate, status: newStatus });
      loadOrders();
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
    if (!acc[order.customer_name]) acc[order.customer_name] = [];
    acc[order.customer_name].push(order);
    return acc;
  }, {});

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Order Manager Dashboard
      </h1>

      {/* Search Box */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search by Client Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
      </div>

      {Object.keys(groupedOrders).length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No orders found.</p>
      ) : (
        Object.keys(groupedOrders).map((customer) => (
          <div key={customer} style={{ marginBottom: "40px" }}>
            <h2 style={{ marginBottom: "15px", color: "#555" }}>{customer}</h2>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px"
            }}>
              {groupedOrders[customer].map(order => (
                <div key={order.order_id} style={{
                  flex: "1 1 300px",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <p style={{ margin: "5px 0" }}><strong>Order ID:</strong> {order.order_id}</p>
                    <p style={{ margin: "5px 0" }}><strong>Product:</strong> {order.product_name}</p>
                    <p style={{ margin: "5px 0" }}><strong>Quantity:</strong> {order.quantity}</p>
                    <p style={{ margin: "5px 0" }}><strong>Total:</strong> ${order.total_price}</p>
                    <p style={{ margin: "5px 0" }}><strong>Phone:</strong> {order.customer_phone}</p>
                  </div>
                  <div>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        backgroundColor: getStatusColor(order.status),
                        cursor: "pointer"
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
  );
};

export default OrdersManager;
