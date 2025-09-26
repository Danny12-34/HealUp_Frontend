import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', marginTop: '50px' }}>{error}</p>;
  if (!product) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Product not found</p>;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0f4ff, #d9e8ff)',
      padding: '40px 20px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: '1000px',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '15px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
        overflow: 'hidden',
      }}>
        {/* Left: Product Image */}
        <div style={{
          flex: '1 1 400px',
          minWidth: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9f9f9',
          padding: '30px',
        }}>
          {product.image ? (
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.product_name}
              style={{
                width: '100%',
                maxWidth: '350px',
                height: 'auto',
                borderRadius: '12px',
                objectFit: 'cover',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
              }}
            />
          ) : (
            <div style={{
              width: '250px',
              height: '250px',
              borderRadius: '12px',
              backgroundColor: '#ddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#777',
              fontSize: '18px',
            }}>No Image</div>
          )}
        </div>

        {/* Right: Product Info */}
        <div style={{
          flex: '1 1 500px',
          minWidth: '300px',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#1E3A8A' }}>{product.product_name}</h1>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}><strong>ID:</strong> {product.product_id}</p>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}><strong>Category:</strong> {product.category}</p>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}><strong>Price:</strong> ${product.price}</p>
          <p style={{ fontSize: '16px', marginBottom: '30px', color: '#555' }}>
            <strong>Description:</strong> {product.description}
          </p>

          {/* Back Button */}
          <Link to="/" style={{
            padding: '12px 25px',
            backgroundColor: '#1E3A8A',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            width: 'fit-content',
            transition: '0.3s',
          }}
          onMouseOver={e => e.target.style.backgroundColor = '#162f6f'}
          onMouseOut={e => e.target.style.backgroundColor = '#1E3A8A'}
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
