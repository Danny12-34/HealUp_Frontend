import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

export default function HealMartPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PRODUCTS_API = 'https://heal-up-backend-pi.vercel.app//products';
  const CATEGORIES_API = 'https://heal-up-backend-pi.vercel.app//categories';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        axios.get(PRODUCTS_API),
        axios.get(CATEGORIES_API).catch(() => ({ data: [] }))
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch data from server');
      setLoading(false);
    }
  };

  const getCategoryCount = (catId) => {
    return products.filter((p) => String(p.category_id || p.category) === String(catId)).length;
  };

  const filteredProducts = selectedCategory === 'ALL'
    ? products
    : products.filter((p) => String(p.category_id || p.category) === String(selectedCategory));

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      color: '#2d3748',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    navBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 40px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #eaeaea',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    logoBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    logoBadge: {
      backgroundColor: '#1b4332',
      color: '#ffffff',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '16px',
    },
    logoTextMain: {
      fontSize: '18px',
      fontWeight: '800',
      color: '#1b4332',
      margin: 0,
    },
    logoTextSub: {
      fontSize: '11px',
      color: '#52796f',
      margin: 0,
    },
    mainLayout: {
      display: 'flex',
      padding: '30px 40px',
      gap: '30px',
    },
    sidebar: {
      width: '280px',
      flexShrink: 0,
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #eaeaea',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02)',
      alignSelf: 'flex-start',
    },
    sidebarHeader: {
      backgroundColor: '#1b4332',
      color: '#ffffff',
      padding: '14px 16px',
      fontWeight: 'bold',
      fontSize: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    categoryListUl: {
      listStyle: 'none',
      margin: 0,
      padding: '8px 0',
    },
    categoryItem: (isSelected) => ({
      padding: '10px 16px',
      fontSize: '13px',
      color: isSelected ? '#1b4332' : '#4a5568',
      backgroundColor: isSelected ? '#f0fdf4' : 'transparent',
      fontWeight: isSelected ? '700' : '500',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      borderLeft: isSelected ? '4px solid #1b4332' : '4px solid transparent',
      transition: 'background 0.2s',
    }),
    categoryCountBadge: {
      fontSize: '11px',
      color: '#718096',
      backgroundColor: '#edf2f7',
      padding: '2px 8px',
      borderRadius: '10px',
      fontWeight: '600',
    },
    whyShopBox: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #eaeaea',
      padding: '16px',
      marginBottom: '20px',
      marginTop: '20px',
    },
    whyTitle: {
      fontSize: '14px',
      fontWeight: '700',
      color: '#1b4332',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    whyItem: {
      fontSize: '12px',
      color: '#4a5568',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    subscribeBox: {
      backgroundColor: '#2d6a4f',
      color: '#ffffff',
      borderRadius: '12px',
      padding: '18px',
    },
    contentArea: {
      flexGrow: 1,
    },
    heroBanner: {
      background: 'linear-gradient(135deg, #f0fdf4 0%, #d8f3dc 100%)',
      borderRadius: '16px',
      padding: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      border: '1px solid #c8e6c9',
    },
    heroTextContent: {
      maxWidth: '450px',
    },
    heroTitle: {
      fontSize: '36px',
      fontWeight: '900',
      color: '#1b4332',
      lineHeight: '1.2',
      margin: '0 0 12px 0',
    },
    heroDesc: {
      fontSize: '14px',
      color: '#4a5568',
      marginBottom: '24px',
      lineHeight: '1.5',
    },
    heroButtons: {
      display: 'flex',
      gap: '12px',
    },
    primaryBtn: {
      backgroundColor: '#2d6a4f',
      color: '#ffffff',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      fontSize: '13px',
    },
    outlineBtn: {
      backgroundColor: 'transparent',
      color: '#2d6a4f',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: '600',
      border: '2px solid #2d6a4f',
      cursor: 'pointer',
      fontSize: '13px',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#1b4332',
      margin: 0,
    },
    viewAllLink: {
      fontSize: '13px',
      color: '#2d6a4f',
      fontWeight: '600',
      textDecoration: 'none',
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
      gap: '15px',
    },
    productCard: {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      padding: '12px',
      border: '1px solid #eaeaea',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    productImg: {
      width: '100%',
      height: '130px',
      objectFit: 'contain',
      marginBottom: '8px',
    },
    productName: {
      fontSize: '13px',
      fontWeight: '700',
      color: '#1a202c',
      margin: '0 0 2px 0',
    },
    productWeight: {
      fontSize: '11px',
      color: '#718096',
      marginBottom: '6px',
    },
    ratingStars: {
      fontSize: '11px',
      color: '#f59e0b',
      marginBottom: '6px',
    },
    productPriceRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
    },
    priceTag: {
      fontSize: '13px',
      fontWeight: '700',
      color: '#1b4332',
    },
    addToCartBtn: {
      backgroundColor: '#f0fdf4',
      color: '#2d6a4f',
      border: '1px solid #b7e4c7',
      borderRadius: '6px',
      padding: '6px 10px',
      fontSize: '11px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    featureFooter: {
      backgroundColor: '#ffffff',
      borderTop: '1px solid #eaeaea',
      padding: '25px 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
      marginTop: '40px',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
  };

  return (
    <div style={styles.container}>
      <Header />
      
      <div style={styles.mainLayout}>
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <span>☰ All Categories</span>
          </div>
          <ul style={styles.categoryListUl}>
            <li
              style={styles.categoryItem(selectedCategory === 'ALL')}
              onClick={() => setSelectedCategory('ALL')}
            >
              <span>All Products</span>
              <span style={styles.categoryCountBadge}>({products.length})</span>
            </li>
            {categories.map((cat) => {
              const count = getCategoryCount(cat.category_id);
              const isSelected = String(selectedCategory) === String(cat.category_id);
              return (
                <li
                  key={cat.category_id}
                  style={styles.categoryItem(isSelected)}
                  onClick={() => setSelectedCategory(cat.category_id)}
                >
                  <span>{cat.cat_name}</span>
                  <span style={styles.categoryCountBadge}>({count})</span>
                </li>
              );
            })}
          </ul>

          <div style={styles.whyShopBox}>
            <div style={styles.whyTitle}><span>🛡️</span> Why Shop with Us?</div>
            <div style={styles.whyItem}><span>✔</span> 100% Natural Products</div>
            <div style={styles.whyItem}><span>✔</span> Carefully Sourced</div>
            <div style={styles.whyItem}><span>✔</span> Fast & Reliable Delivery</div>
            <div style={styles.whyItem}><span>✔</span> Secure Payments</div>
            <div style={styles.whyItem}><span>✔</span> Expert Health Support</div>
            <div style={styles.whyItem}><span>✔</span> Easy Returns</div>
          </div>

          <div style={styles.subscribeBox}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Subscribe & Save</h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: '#e8f5e9' }}>Get 10% off on your first order.</p>
            <button style={{ backgroundColor: '#ffffff', color: '#1b4332', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
              Subscribe Now
            </button>
          </div>
        </div>

        <div style={styles.contentArea}>
          <div style={styles.heroBanner}>
            <div style={styles.heroTextContent}>
              <h2 style={styles.heroTitle}>Natural Products for a Healthier You</h2>
              <p style={styles.heroDesc}>Carefully selected healthy foods, superfoods, and wellness essentials for your everyday life.</p>
              <div style={styles.heroButtons}>
                <button style={styles.primaryBtn}>Shop Now</button>
                <button style={styles.outlineBtn}>Explore Categories</button>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80" 
                alt="Natural Foods" 
                style={{ width: '320px', height: '180px', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
          </div>

          <div>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>
                {selectedCategory === 'ALL' ? 'All Products' : 'Filtered Products'}
              </h3>
              <a href="#all" style={styles.viewAllLink} onClick={(e) => { e.preventDefault(); setSelectedCategory('ALL'); }}>View All Products →</a>
            </div>

            {loading && <p style={{ fontSize: '13px', color: '#718096' }}>Loading products from server...</p>}
            {error && <p style={{ fontSize: '13px', color: '#e53e3e' }}>Error: {error}</p>}

            {!loading && !error && (
              <div style={styles.productsGrid}>
                {filteredProducts.map((item, idx) => (
                  <div key={idx} style={styles.productCard}>
                    <div>
                      <img src={item.image || item.img} alt={item.product_name || item.name} style={styles.productImg} />
                      <h4 style={styles.productName}>{item.product_name || item.name}</h4>
                      <p style={styles.productWeight}>{item.weight || item.helping_area || 'N/A'}</p>
                      <div style={styles.ratingStars}>{item.rating || '★★★★★'}</div>
                    </div>
                    <div style={styles.productPriceRow}>
                      <span style={styles.priceTag}>{item.price ? `RWF ${item.price}` : 'N/A'}</span>
                      <button style={styles.addToCartBtn}>Add to Cart</button>
                    </div>
                  </div>
                ))}
                {filteredProducts.length === 0 && (
                  <p style={{ fontSize: '13px', color: '#718096', gridColumn: '1 / -1' }}>No products found in this category.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={styles.featureFooter}>
        <div style={styles.featureItem}>
          <span style={{ fontSize: '24px' }}>🚚</span>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 2px 0' }}>Free Delivery</h4>
            <p style={{ fontSize: '11px', color: '#718096', margin: 0 }}>On orders over RWF 20,000 in Kigali</p>
          </div>
        </div>
        <div style={styles.featureItem}>
          <span style={{ fontSize: '24px' }}>🔒</span>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 2px 0' }}>Secure Payments</h4>
            <p style={{ fontSize: '11px', color: '#718096', margin: 0 }}>100% safe & secure payments</p>
          </div>
        </div>
        <div style={styles.featureItem}>
          <span style={{ fontSize: '24px' }}>🎧</span>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 2px 0' }}>Expert Support</h4>
            <p style={{ fontSize: '11px', color: '#718096', margin: 0 }}>Get advice from our nutrition experts</p>
          </div>
        </div>
        <div style={styles.featureItem}>
          <span style={{ fontSize: '24px' }}>🔄</span>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 2px 0' }}>Easy Returns</h4>
            <p style={{ fontSize: '11px', color: '#718096', margin: 0 }}>Hassle-free returns within 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}