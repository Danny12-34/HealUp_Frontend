import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDesc, setExpandedDesc] = useState({}); // Track which descriptions are expanded

  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    price: '',
    category: '',
    image: null
  });

  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('product_name', formData.product_name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    if (formData.image) data.append('image', formData.image);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://localhost:5000/api/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setFormData({ product_name: '', description: '', price: '', category: '', image: null });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError('Failed to save product');
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      const prod = response.data;
      setFormData({
        product_name: prod.product_name,
        description: prod.description,
        price: prod.price,
        category: prod.category,
        image: null
      });
      setEditingId(id);
    } catch (err) {
      console.error(err);
      setError('Failed to load product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError('Failed to delete product');
    }
  };

  const toggleDescription = (id) => {
    setExpandedDesc((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pm-container">
      <style>{`
        .pm-container { padding: 30px; font-family: Arial, sans-serif; max-width: 1400px; margin: 0 auto; }
        .pm-title { text-align: center; color: #28a745; margin-bottom: 25px; font-size: 2rem; }
        .pm-error { color: red; text-align: center; margin-bottom: 15px; font-size: 1.1rem; }
        .pm-form { display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 35px; justify-content: center; }
        .pm-input, .pm-select, .pm-file { padding: 12px; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem; }
        .pm-price { width: 140px; }
        .pm-select { min-width: 180px; }
        .pm-btn { padding: 12px 25px; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; }
        .pm-submit { background-color: #28a745; color: white; }
        .pm-cancel { background-color: #dc3545; color: white; }
        .pm-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 1rem; }
        .pm-table th, .pm-table td { border: 1px solid #ddd; padding: 15px; vertical-align: top; }
        .pm-table th { background-color: #28a745; color: white; font-size: 1.1rem; }
        .pm-img { width: 100px; height: 100px; object-fit: cover; border-radius: 5px; }
        .pm-edit { background-color: #ffc107; color: white; margin-right: 5px; padding: 10px 20px; }
        .pm-delete { background-color: #dc3545; color: white; padding: 10px 20px; }
        .pm-more { color: #007bff; cursor: pointer; margin-left: 5px; }
      `}</style>

      <h1 className="pm-title">Product Manager</h1>

      {error && <p className="pm-error">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="pm-form">
        <input type="text" name="product_name" placeholder="Product Name" value={formData.product_name} onChange={handleChange} required className="pm-input" />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="pm-input" />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="pm-input pm-price" />
        <select name="category" value={formData.category} onChange={handleChange} required className="pm-select">
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_name}>{cat.category_name}</option>
          ))}
        </select>
        <input type="file" name="image" onChange={handleChange} className="pm-file" />
        <button type="submit" className="pm-btn pm-submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setFormData({ product_name: '', description: '', price: '', category: '', image: null }); }} className="pm-btn pm-cancel">Cancel</button>
        )}
      </form>

      {/* Products Table */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="pm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => {
              const isExpanded = expandedDesc[prod.product_id];
              const displayText = isExpanded ? prod.description : prod.description.slice(0, 50);
              return (
                <tr key={prod.product_id}>
                  <td>{prod.product_id}</td>
                  <td>{prod.product_name}</td>
                  <td>
                    {displayText}
                    {prod.description.length > 50 && (
                      <span className="pm-more" onClick={() => toggleDescription(prod.product_id)}>
                        {isExpanded ? ' Less' : '... More'}
                      </span>
                    )}
                  </td>
                  <td>{prod.price}</td>
                  <td>{prod.category}</td>
                  <td>{prod.image && <img src={`http://localhost:5000/uploads/${prod.image}`} alt={prod.product_name} className="pm-img" />}</td>
                  <td>
                    <button onClick={() => handleEdit(prod.product_id)} className="pm-btn pm-edit">Edit</button>
                    <button onClick={() => handleDelete(prod.product_id)} className="pm-btn pm-delete">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductManager;
