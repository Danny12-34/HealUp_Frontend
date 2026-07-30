import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import List components for data display
import CategoryList from './Categories/CategoryList';
import MainPhotoList from './MainPhoto/MainPhotoList';
import ProductList from './Product/ProductList';

const API_BASE = 'https://heal-up-backend-pi.vercel.app/';

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Edit State Management for child components if needed
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState(null);

  // Real Data State for Stats and Visualizations
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [prodRes, catRes, photoRes] = await Promise.all([
        axios.get(`${API_BASE}/products`),
        axios.get(`${API_BASE}/categories`),
        axios.get(`${API_BASE}/mainphoto`)
      ]);

      setProducts(prodRes.data || []);
      setCategories(catRes.data || []);
      setPhotos(photoRes.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard analytics data", err);
      setLoading(false);
    }
  };

  // --- Dynamic Graph Calculations ---
  // 1. Category Distribution Count for Visual Bar representation
  const categoryCounts = categories.map(cat => {
    const count = products.filter(p => p.category_id === cat.category_id || p.cat_name === cat.cat_name).length;
    return { name: cat.cat_name, count };
  });

  // 2. Pricing metrics calculation
  const totalInventoryValue = products.reduce((acc, p) => acc + (Number(p.price || 0) * Number(p.quantity || 0)), 0);
  const averagePrice = products.length > 0 ? (products.reduce((acc, p) => acc + Number(p.price || 0), 0) / products.length).toFixed(2) : 0;

  // --- Internal Styles ---
  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    sidebar: {
      width: '260px',
      backgroundColor: '#1a202c',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxShadow: '4px 0 10px rgba(0,0,0,0.05)',
    },
    brand: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '30px',
      color: '#63b3ed',
      letterSpacing: '0.5px',
    },
    navItem: (isActive) => ({
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '8px',
      backgroundColor: isActive ? '#2b6cb0' : 'transparent',
      color: isActive ? '#ffffff' : '#a0aec0',
      fontWeight: '600',
      fontSize: '15px',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }),
    mainContent: {
      flex: 1,
      padding: '40px',
      overflowY: 'auto',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '30px',
    },
    statCard: {
      backgroundColor: '#ffffff',
      padding: '22px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
      border: '1px solid #e2e8f0',
    },
    statTitle: {
      fontSize: '13px',
      color: '#718096',
      fontWeight: '600',
      textTransform: 'uppercase',
      marginBottom: '8px',
    },
    statValue: {
      fontSize: '26px',
      fontWeight: '700',
      color: '#2d3748',
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '20px',
      marginBottom: '30px',
    },
    chartCard: {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
      border: '1px solid #e2e8f0',
    },
    chartTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '20px',
      borderBottom: '2px solid #f7fafc',
      paddingBottom: '10px',
    },
    barWrapper: {
      marginBottom: '14px',
    },
    barLabelContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      fontWeight: '500',
      color: '#4a5568',
      marginBottom: '6px',
    },
    barTrack: {
      width: '100%',
      backgroundColor: '#edf2f7',
      borderRadius: '6px',
      height: '12px',
      overflow: 'hidden',
    },
    barFill: (percentage) => ({
      width: `${Math.max(percentage, 5)}%`,
      backgroundColor: '#3182ce',
      height: '100%',
      borderRadius: '6px',
      transition: 'width 0.5s ease-in-out',
    }),
    donutPlaceholder: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 14px',
      backgroundColor: '#f7fafc',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#4a5568',
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
        <h2>Loading Analytics Dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={styles.layout}>
      {/* Sidebar Navigation */}
      <div style={styles.sidebar}>
        <div style={styles.brand}>📊 Manager Portal</div>
        <div 
          style={styles.navItem(activeTab === 'overview')}
          onClick={() => setActiveTab('overview')}
        >
          📈 Analytics Overview
        </div>
        <div 
          style={styles.navItem(activeTab === 'products')}
          onClick={() => setActiveTab('products')}
        >
          📦 Products Directory
        </div>
        <div 
          style={styles.navItem(activeTab === 'categories')}
          onClick={() => setActiveTab('categories')}
        >
          📂 Categories Directory
        </div>
        <div 
          style={styles.navItem(activeTab === 'photos')}
          onClick={() => setActiveTab('photos')}
        >
          🖼️ Main Photos Directory
        </div>
      </div>

      {/* Main View Area */}
      <div style={styles.mainContent}>
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ marginBottom: '20px', color: '#1a202c', fontSize: '24px' }}>Dashboard Overview & Analytics</h2>
            
            {/* Real Data Counter Cards */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statTitle}>Total Products</div>
                <div style={styles.statValue}>{products.length}</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statTitle}>Total Categories</div>
                <div style={styles.statValue}>{categories.length}</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statTitle}>Total Main Photos</div>
                <div style={styles.statValue}>{photos.length}</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statTitle}>Inventory Asset Value</div>
                <div style={styles.statValue}>${totalInventoryValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              </div>
            </div>

            {/* Visual Charts Grid */}
            <div style={styles.chartsGrid}>
              {/* Custom Bar Graph for Category Distribution */}
              <div style={styles.chartCard}>
                <div style={styles.chartTitle}>📊 Products per Category Distribution</div>
                {categoryCounts.length > 0 ? (
                  categoryCounts.map((item, idx) => {
                    const maxCount = Math.max(...categoryCounts.map(c => c.count), 1);
                    const percentage = (item.count / maxCount) * 100;
                    return (
                      <div key={idx} style={styles.barWrapper}>
                        <div style={styles.barLabelContainer}>
                          <span>{item.name}</span>
                          <span style={{ fontWeight: '600', color: '#2b6cb0' }}>{item.count} items</span>
                        </div>
                        <div style={styles.barTrack}>
                          <div style={styles.barFill(percentage)}></div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p style={{ color: '#a0aec0', fontStyle: 'italic' }}>No category metrics available.</p>
                )}
              </div>

              {/* Summary Metrics Card */}
              <div style={styles.chartCard}>
                <div style={styles.chartTitle}>💡 Quick Financial Insights</div>
                <div style={styles.donutPlaceholder}>
                  <div style={styles.summaryRow}>
                    <span>Average Product Price:</span>
                    <strong style={{ color: '#2b6cb0' }}>${averagePrice}</strong>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Active Categories:</span>
                    <strong style={{ color: '#2b6cb0' }}>{categories.filter(c => c.status?.toLowerCase() === 'active').length} / {categories.length}</strong>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Total Catalog Items:</span>
                    <strong style={{ color: '#2b6cb0' }}>{products.length} Units</strong>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Media Assets:</span>
                    <strong style={{ color: '#2b6cb0' }}>{photos.length} Banners</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <ProductList onEdit={(prod) => setEditingProduct(prod)} />
        )}

        {activeTab === 'categories' && (
          <CategoryList onEdit={(cat) => setEditingCategory(cat)} />
        )}

        {activeTab === 'photos' && (
          <MainPhotoList onEdit={(photo) => setEditingPhoto(photo)} />
        )}
      </div>
    </div>
  );
}