import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(cartItems.map(item => item.quantity));

  // Update quantity
  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    const qty = Math.max(1, parseInt(value) || 1); 
    newQuantities[index] = qty;
    setQuantities(newQuantities);

    const newCart = [...cartItems];
    newCart[index].quantity = qty;
    setCartItems(newCart);
  };

  // Remove item
  const handleRemove = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    setQuantities(newCart.map(item => item.quantity));
  };

  // Place order function (single or multiple)
  const placeOrder = async (items) => {
    try {
      for (const item of items) {
        const payload = {
          product_id: item.product_id,
          quantity: item.quantity,
          total_price: Number(item.price) * item.quantity,
          customer_name: "John Doe",      // Replace with real customer data
          customer_email: "john@example.com",
          customer_phone: "1234567890",
          status: "Pending"
        };

        await axios.post("http://localhost:5000/api/orders", payload);
      }

      alert("Order placed successfully!");
      if (items.length === cartItems.length) setCartItems([]);
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
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

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>No products in cart.</p>
      ) : (
        <div style={{ maxWidth: "1000px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 15px" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#555" }}>
                <th style={{ padding: "10px" }}>Product</th>
                <th style={{ padding: "10px" }}>Price</th>
                <th style={{ padding: "10px" }}>Quantity</th>
                <th style={{ padding: "10px" }}>Total</th>
                <th style={{ padding: "10px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} style={{ backgroundColor: "#f8f8f8", borderRadius: "10px", transition: "all 0.3s", boxShadow: "0 3px 6px rgba(0,0,0,0.05)" }}>
                  <td style={{ padding: "12px", fontWeight: "500" }}>{item.product_name}</td>
                  <td style={{ padding: "12px" }}>${Number(item.price).toFixed(2)}</td>
                  <td style={{ padding: "12px" }}>
                    <input
                      type="number"
                      value={quantities[index]}
                      min="1"
                      style={{ width: "60px", padding: "5px", borderRadius: "6px", border: "1px solid #ccc" }}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                  </td>
                  <td style={{ padding: "12px", fontWeight: "bold" }}>
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() => handleOrderOne(item)}
                      style={{
                        padding: "6px 12px",
                        marginRight: "5px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "0.3s"
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor="#0056b3"}
                      onMouseOut={e => e.currentTarget.style.backgroundColor="#007bff"}
                    >
                      Order
                    </button>
                    <button
                      onClick={() => handleRemove(index)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "0.3s"
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor="#b02a37"}
                      onMouseOut={e => e.currentTarget.style.backgroundColor="#dc3545"}
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
                onClick={handleOrderAll}
                style={{
                  padding: "10px 20px",
                  marginRight: "10px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.3s"
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor="#218838"}
                onMouseOut={e => e.currentTarget.style.backgroundColor="#28a745"}
              >
                Order All
              </button>
              <button
                onClick={() => navigate("/healmart")}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.3s"
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor="#5a6268"}
                onMouseOut={e => e.currentTarget.style.backgroundColor="#6c757d"}
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
