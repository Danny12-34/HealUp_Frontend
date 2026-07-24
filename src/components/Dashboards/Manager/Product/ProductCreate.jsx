import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/products';

export default function ProductCreate({ editingProduct, onClearEdit }) {
  const [form, setForm] = useState({
    product_name: '', quantity: '', price: '', helping_area: '', exp_date: '', status: '', image: null
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        ...editingProduct,
        exp_date: editingProduct.exp_date ? editingProduct.exp_date.split('T')[0] : '',
        image: null
      });
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach(key => { if (form[key] !== null) fd.append(key, form[key]); });

    if (editingProduct) {
      await axios.put(`${API}/${editingProduct.product_id}`, fd);
      onClearEdit();
    } else {
      await axios.post(API, fd);
    }

    setForm({ product_name: '', quantity: '', price: '', helping_area: '', exp_date: '', status: '', image: null });
    window.location.reload(); 
  };

  // --- Internal Styles ---
  const styles = {
    container: {
      maxWidth: '750px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      border: '1px solid #eaeaea',
    },
    header: {
      marginBottom: '24px',
      fontSize: '22px',
      fontWeight: '600',
      color: '#1a202c',
      borderBottom: '2px solid #f0f4f8',
      paddingBottom: '12px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    },
    fullWidth: {
      gridColumn: 'span 2',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#4a5568',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      fontSize: '15px',
      border: '1px solid #cbd5e0',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxSizing: 'border-box',
      backgroundColor: '#fdfdfe',
    },
    fileInput: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px dashed #cbd5e0',
      borderRadius: '8px',
      backgroundColor: '#f7fafc',
      cursor: 'pointer',
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      marginTop: '10px',
    },
    submitBtn: {
      backgroundColor: editingProduct ? '#d69e2e' : '#3182ce',
      color: '#ffffff',
      padding: '12px 24px',
      fontSize: '15px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s, transform 0.1s',
      boxShadow: '0 4px 12px rgba(49, 130, 206, 0.2)',
    },
    cancelBtn: {
      backgroundColor: '#e2e8f0',
      color: '#4a5568',
      padding: '12px 20px',
      fontSize: '15px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <h3 style={styles.header}>
          {editingProduct ? '✏️ Update Product Details' : '📦 Create New Product'}
        </h3>
        
        <div style={styles.grid}>
          {/* Product Name */}
          <div>
            <label style={styles.label}>Product Name</label>
            <input 
              placeholder="e.g., Organic Honey" 
              value={form.product_name} 
              onChange={e => setForm({...form, product_name: e.target.value})} 
              style={styles.input} 
              required 
            />
          </div>

          {/* Quantity */}
          <div>
            <label style={styles.label}>Quantity</label>
            <input 
              type="number" 
              placeholder="e.g., 50" 
              value={form.quantity} 
              onChange={e => setForm({...form, quantity: e.target.value})} 
              style={styles.input} 
              required 
            />
          </div>

          {/* Price */}
          <div>
            <label style={styles.label}>Price ($)</label>
            <input 
              type="number" 
              step="0.01" 
              placeholder="e.g., 19.99" 
              value={form.price} 
              onChange={e => setForm({...form, price: e.target.value})} 
              style={styles.input} 
              required 
            />
          </div>

          {/* Helping Area */}
          <div>
            <label style={styles.label}>Helping Area</label>
            <input 
              placeholder="e.g., Downtown" 
              value={form.helping_area} 
              onChange={e => setForm({...form, helping_area: e.target.value})} 
              style={styles.input} 
            />
          </div>

          {/* Expiration Date */}
          <div>
            <label style={styles.label}>Expiration Date</label>
            <input 
              type="date" 
              value={form.exp_date} 
              onChange={e => setForm({...form, exp_date: e.target.value})} 
              style={styles.input} 
            />
          </div>

          {/* Status */}
          <div>
            <label style={styles.label}>Status</label>
            <input 
              placeholder="e.g., Available" 
              value={form.status} 
              onChange={e => setForm({...form, status: e.target.value})} 
              style={styles.input} 
              required 
            />
          </div>

          {/* Image File Input */}
          <div style={styles.fullWidth}>
            <label style={styles.label}>Product Image</label>
            <input 
              type="file" 
              onChange={e => setForm({...form, image: e.target.files[0]})} 
              style={styles.fileInput} 
            />
          </div>

          {/* Action Buttons */}
          <div style={{ ...styles.fullWidth, ...styles.buttonContainer }}>
            <button 
              type="submit" 
              style={{
                ...styles.submitBtn,
                backgroundColor: editingProduct ? '#b7791f' : '#2b6cb0',
                transform: isHovered ? 'translateY(-1px)' : 'none'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {editingProduct ? 'Save Changes' : 'Publish Product'}
            </button>

            {editingProduct && (
              <button 
                type="button" 
                onClick={onClearEdit} 
                style={{
                  ...styles.cancelBtn,
                  backgroundColor: isCancelHovered ? '#cbd5e0' : '#e2e8f0'
                }}
                onMouseEnter={() => setIsCancelHovered(true)}
                onMouseLeave={() => setIsCancelHovered(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}