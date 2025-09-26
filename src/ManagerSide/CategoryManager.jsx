import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    category_name: '',
    descrition: '',
    category_image: null
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch categories');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    if (e.target.name === 'category_image') {
      setFormData({ ...formData, category_image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Create or Update category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('category_name', formData.category_name);
    data.append('descrition', formData.descrition);
    if (formData.category_image) data.append('category_image', formData.category_image);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/categories/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://localhost:5000/api/categories', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setFormData({ category_name: '', descrition: '', category_image: null });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      setError('Failed to save category');
    }
  };

  // Edit category
  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/categories/${id}`);
      const cat = response.data;
      setFormData({
        category_name: cat.category_name,
        descrition: cat.descrition,
        category_image: null
      });
      setEditingId(id);
    } catch (err) {
      console.error(err);
      setError('Failed to load category');
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
      setError('Failed to delete category');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Category Manager</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          name="category_name"
          placeholder="Category Name"
          value={formData.category_name}
          onChange={handleChange}
          required
          style={{ padding: '10px', marginRight: '10px' }}
        />
        {/* <input
          type="text"
          name="descrition"
          placeholder="Description"
          value={formData.descrition}
          onChange={handleChange}
          required
          style={{ padding: '10px', marginRight: '10px' }}
        /> */}
        <input
          type="file"
          name="category_image"
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>
          {editingId ? 'Update' : 'Create'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => { setEditingId(null); setFormData({ category_name: '', descrition: '', category_image: null }); }}
            style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px' }}
          >
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              {/* <th>Description</th> */}
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.category_id}>
                <td>{cat.category_id}</td>
                <td>{cat.category_name}</td>
                {/* <td>{cat.descrition}</td> */}
                <td>
                  {cat.category_image && (
                    <img
                      src={`http://localhost:5000/uploads/${cat.category_image}`}
                      alt={cat.category_name}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(cat.category_id)} style={{ marginRight: '10px' }}>Edit</button>
                  <button onClick={() => handleDelete(cat.category_id)} style={{ backgroundColor: '#dc3545', color: '#fff' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryManager;
