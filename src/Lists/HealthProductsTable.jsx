import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HealthProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        // Filter products with category "Health"
        const healthProducts = response.data.filter(
          (product) => product.category && product.category.toLowerCase() === 'health'
        );
        setProducts(healthProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const tableStyle = {
    width: '90%',
    margin: '40px auto',
    borderCollapse: 'collapse',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    backgroundColor: '#2196F3',
    color: 'white',
    textAlign: 'left',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  };

  const trHoverStyle = {
    backgroundColor: '#f9f9f9',
  };

  const imgStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Health Products</h2>

      {loading && <p style={{ textAlign: 'center' }}>Loading products...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      {!loading && !error && products.length > 0 && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id} style={trHoverStyle}>
                <td style={tdStyle}>{product.product_id}</td>
                <td style={tdStyle}>{product.product_name}</td>
                <td style={tdStyle}>{product.description}</td>
                <td style={tdStyle}>${product.price}</td>
                <td style={tdStyle}>
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.product_name}
                    style={imgStyle}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && products.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No Health products found.</p>
      )}
    </div>
  );
};

export default HealthProductsTable;
