import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HealMart = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const sectionStyle = {
    padding: '80px 20px',
    background: 'linear-gradient(to right, #fcfcff, #e5f3eb)',
    color: '#0e0c0c',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: '100vh'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: '20px'
  };

  const cardStyle = {
    backgroundColor: '#fff',
    color: '#333',
    padding: '20px',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  };

  const imageStyle = {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '15px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    marginTop: '10px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  };

  // Navigate using if-else if statements
  const handleOrderClick = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name === 'nutrition') {
      navigate('/nutrition');
    } else if (name === 'graing') {
      navigate('/grain');
    } else if (name === 'health') {
      navigate('/health');
    } else if (name === 'fitness') {
      navigate('/fitness');
    } else {
      navigate('/'); // fallback route
    }
  };

  return (
    <section style={sectionStyle}>
      <h1>Welcome to HealMart</h1>
      <p>Browse our available categories below.</p>

      {loading && <p>Loading categories...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div style={gridStyle}>
          {categories.map((category) => (
            <div
              key={category.category_id}
              style={cardStyle}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
              }}
            >
              <img
                src={`http://localhost:5000/uploads/${category.category_image}`}
                alt={category.category_name}
                style={imageStyle}
              />
              <h3>{category.category_name}</h3>
              <p>Description: {category.descrition}</p>
              <button
                style={buttonStyle}
                onClick={() => handleOrderClick(category.category_name)}
              >
                Order
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HealMart;
