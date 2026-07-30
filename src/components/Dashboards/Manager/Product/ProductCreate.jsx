import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://heal-up-backend-pi.vercel.app/api/products';
const CATEGORY_API = 'https://heal-up-backend-pi.vercel.app/api/categories';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Product Form State with is_popular included
  const [productForm, setProductForm] = useState({
    product_name: '',
    quantity: '',
    price: '',
    helping_area: '',
    exp_date: '',
    status: 'Available',
    is_popular: 'No',
    image: null,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Handle Product Submission
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('product_name', productForm.product_name);
      formData.append('quantity', productForm.quantity);
      formData.append('price', productForm.price);
      formData.append('helping_area', productForm.helping_area);
      formData.append('exp_date', productForm.exp_date);
      formData.append('status', productForm.status);
      formData.append('is_popular', productForm.is_popular);
      
      if (productForm.image) {
        formData.append('image', productForm.image);
      }

      await axios.post(API, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Reset form and reload products list
      setProductForm({
        product_name: '',
        quantity: '',
        price: '',
        helping_area: '',
        exp_date: '',
        status: 'Available',
        is_popular: 'No',
        image: null,
      });
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product. Check console for details.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>📦 Product Management Dashboard</h2>

      {/* Product Registration Form */}
      <div style={styles.card}>
        <h3>Register New Product</h3>
        <form onSubmit={handleProductSubmit} style={styles.formGrid}>
          <input
            type="text"
            placeholder="Product Name"
            value={productForm.product_name}
            onChange={(e) => setProductForm({ ...productForm, product_name: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Quantity (e.g. 50 or 20kg)"
            value={productForm.quantity}
            onChange={(e) => setProductForm({ ...productForm, quantity: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price ($)"
            value={productForm.price}
            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Helping Area"
            value={productForm.helping_area}
            onChange={(e) => setProductForm({ ...productForm, helping_area: e.target.value })}
            style={styles.input}
          />
          <input
            type="date"
            value={productForm.exp_date}
            onChange={(e) => setProductForm({ ...productForm, exp_date: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Status"
            value={productForm.status}
            onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
            style={styles.input}
            required
          />

          {/* Is Popular Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>Is Popular?</label>
            <select
              value={productForm.is_popular}
              onChange={(e) => setProductForm({ ...productForm, is_popular: e.target.value })}
              style={styles.input}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <input
            type="file"
            onChange={(e) => setProductForm({ ...productForm, image: e.target.files[0] })}
            style={{ ...styles.input, gridColumn: 'span 2' }}
          />
          
          <button type="submit" style={styles.btn}>Save Product</button>
        </form>
      </div>

      {/* Category Manager Component Section */}
      <CategoryManager categories={categories} />
    </div>
  );
}

// Sub-component: Category Manager
function CategoryManager({ categories }) {
  const [categoryName, setCategoryName] = useState('');

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(CATEGORY_API, { name: categoryName });
      setCategoryName('');
      window.location.reload();
    } catch (err) {
      console.error("Error saving category", err);
    }
  };

  return (
    <div style={{ ...styles.card, marginTop: '30px' }}>
      <h3>Category Management</h3>
      <CategoryForm 
        categoryName={categoryName} 
        setCategoryName={setCategoryName} 
        onSubmit={handleCategorySubmit} 
      />
      <CategoryList categories={categories} />
    </div>
  );
}

// Sub-component: Category Form
function CategoryForm({ categoryName, setCategoryName, onSubmit }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="New Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        style={styles.input}
        required
      />
      <button type="submit" style={styles.btn}>Add Category</button>
    </form>
  );
}

// Sub-component: Category List
function CategoryList({ categories }) {
  return (
    <div>
      <h4>Existing Categories</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <div key={cat.category_id || cat.id || cat.name} style={styles.listItem}>
              <span>{cat.name || cat.category_name}</span>
            </div>
          ))
        ) : (
          <p style={{ color: '#718096' }}>No categories found.</p>
        )}
      </div>
    </div>
  );
}

// Basic Styles
const styles = {
  container: { maxWidth: '800px', margin: '30px auto', fontFamily: 'Segoe UI, sans-serif' },
  card: { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0', width: '100%', boxSizing: 'border-box' },
  btn: { background: '#3182ce', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', gridColumn: 'span 2' },
  listItem: { padding: '10px', background: '#f7fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }
};