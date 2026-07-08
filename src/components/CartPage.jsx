import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(cartItems.map(item => item.quantity));
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    const qty = Math.max(1, parseInt(value) || 1);
    newQuantities[index] = qty;
    setQuantities(newQuantities);

    const updatedCart = [...cartItems];
    updatedCart[index].quantity = qty;
    setCartItems(updatedCart);
  };

  const handleRemove = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    setQuantities(updatedCart.map(item => item.quantity));
  };

  const placeOrder = async (items) => {
    try {
      setLoading(true);

      const requests = items.map(item => {
        const payload = {
          product_id: item.product_id,
          quantity: item.quantity,
          total_price: Number(item.price) * item.quantity,
          customer_name: "John Doe",
          customer_email: "john@example.com",
          customer_phone: "1234567890",
          status: "Pending"
        };

        return axios.post("https://healupbackend-production.up.railway.app/api/orders", payload);
      });

      await Promise.all(requests);

      alert("✅ Order placed successfully!");
      if (items.length === cartItems.length) setCartItems([]);

      navigate("/healmart");

    } catch (err) {
      console.error(err);
      alert("❌ Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOrderOne = (item) => placeOrder([item]);
  const handleOrderAll = () => placeOrder(cartItems);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div style={{ padding: "50px", fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>🛒 Your Cart</h2>

      {loading && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div className="loader"></div>
          <p style={{ color: "#555", fontSize: "16px" }}>Processing your order...</p>
        </div>
      )}

      <style>
        {`
          .loader {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #28a745;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: auto;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `}
      </style>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>No products in cart.</p>
      ) : (
        <div style={{ maxWidth: "1000px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 15px" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#555" }}>
                <th style={{ padding: "10px" }}>Product</th>
                <th style={{ padding: "10px" }}>Price</th>
                <th style={{ padding: "10px" }}>Qty</th>
                <th style={{ padding: "10px" }}>Total</th>
                <th style={{ padding: "10px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} style={{ backgroundColor: "#f8f8f8", boxShadow: "0 3px 6px rgba(0,0,0,0.05)" }}>
                  <td style={{ padding: "12px" }}>{item.product_name}</td>
                  <td style={{ padding: "12px" }}>${Number(item.price).toFixed(2)}</td>
                  <td style={{ padding: "12px" }}>
                    <input
                      type="number"
                      min="1"
                      value={quantities[index]}
                      disabled={loading}
                      style={{ width: "60px", padding: "5px", borderRadius: "6px" }}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                  </td>
                  <td style={{ padding: "12px", fontWeight: "bold" }}>
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <button
                      disabled={loading}
                      onClick={() => handleOrderOne(item)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        borderRadius: "6px",
                        border: "none",
                        marginRight: "5px"
                      }}
                    >
                      Order
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => handleRemove(index)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        borderRadius: "6px",
                        border: "none"
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px" }}>
            <h3>Total: <span style={{ color: "#28a745" }}>${totalPrice.toFixed(2)}</span></h3>
            <div>
              <button
                disabled={loading}
                onClick={handleOrderAll}
                style={{
                  padding: "10px 20px",
                  marginRight: "10px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px"
                }}
              >
                Order All
              </button>
              <button
                disabled={loading}
                onClick={() => navigate("/healmart")}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px"
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartPage;
