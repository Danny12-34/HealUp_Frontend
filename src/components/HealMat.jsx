import React from 'react';
import Header from './Header';


export default function HealMartPage() {
  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      color: '#2d3748',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    // Navigation Bar
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
    navLinks: {
      display: 'flex',
      gap: '24px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      fontSize: '13px',
      fontWeight: '500',
    },
    navItemActive: {
      color: '#2d6a4f',
      fontWeight: '700',
      textDecoration: 'none',
      borderBottom: '2px solid #2d6a4f',
      paddingBottom: '4px',
    },
    navItem: {
      color: '#4a5568',
      textDecoration: 'none',
    },
    navIcons: {
      display: 'flex',
      gap: '20px',
      fontSize: '14px',
      alignItems: 'center',
      color: '#2d3748',
      cursor: 'pointer',
    },

    // Main Layout Layout
    mainLayout: {
      display: 'flex',
      padding: '30px 40px',
      gap: '30px',
    },

    // Sidebar Category Menu
    sidebar: {
      width: '260px',
      flexShrink: 0,
    },
    categoryBox: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #eaeaea',
      overflow: 'hidden',
      marginBottom: '20px',
    },
    categoryHeader: {
      backgroundColor: '#1b4332',
      color: '#ffffff',
      padding: '14px 16px',
      fontWeight: 'bold',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    categoryList: {
      listStyle: 'none',
      margin: 0,
      padding: '10px 0',
    },
    categoryListItem: {
      padding: '10px 16px',
      fontSize: '13px',
      color: '#4a5568',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },

    whyShopBox: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #eaeaea',
      padding: '16px',
      marginBottom: '20px',
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

    // Content Area
    contentArea: {
      flexGrow: 1,
    },

    // Hero Banner
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

    // Category Circles Row
    circlesRow: {
      display: 'flex',
      gap: '15px',
      overflowX: 'auto',
      paddingBottom: '10px',
      marginBottom: '30px',
    },
    circleItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
      minWidth: '75px',
      cursor: 'pointer',
    },
    circleImgBox: {
      width: '55px',
      height: '55px',
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      border: '1px solid #eaeaea',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    circleText: {
      fontSize: '11px',
      color: '#4a5568',
      textAlign: 'center',
      fontWeight: '500',
    },

    // Section Header
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

    // Main layout split for Best Sellers & Special Offers
    lowerGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 280px',
      gap: '20px',
    },

    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
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

    // Special Offers Sidebar Card
    specialCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #eaeaea',
      padding: '16px',
    },

    // Feature Footer Bar
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
      
      {/* Main Container Layout */}
      <div style={styles.mainLayout}>
        
        {/* Left Sidebar Category & Promos */}
        <div style={styles.sidebar}>
          
          {/* Categories Accordion/Box */}
          <div style={styles.categoryBox}>
            <div style={styles.categoryHeader}>
              <span>☰ All Categories</span>
            </div>
            <ul style={styles.categoryList}>
              {[
                { name: 'Natural Carbs', icon: '🌾' },
                { name: 'Healthy Fats & Oils', icon: '🏺' },
                { name: 'Nuts & Seeds', icon: '🥜' },
                { name: 'Dried Fruits', icon: '🍇' },
                { name: 'Herbal Teas', icon: '🍵' },
                { name: 'Superfoods', icon: '🌿' },
                { name: 'Food Supplements', icon: '💊' },
                { name: 'Plant-Based Proteins', icon: '🌱' },
                { name: 'Healthy Snacks', icon: '🍿' },
                { name: 'Beverages', icon: '🧃' },
                { name: 'Gluten Free', icon: '🌾' },
                { name: 'Baby & Kids', icon: '👶' },
                { name: 'Personal Care', icon: '🧴' },
                { name: 'Eco-Friendly Products', icon: '🍃' },
              ].map((cat, i) => (
                <li key={i} style={styles.categoryListItem}>
                  <span>{cat.icon}</span> {cat.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Why Shop With Us Box */}
          <div style={styles.whyShopBox}>
            <div style={styles.whyTitle}><span>🛡️</span> Why Shop with Us?</div>
            <div style={styles.whyItem}><span>✔</span> 100% Natural Products</div>
            <div style={styles.whyItem}><span>✔</span> Carefully Sourced</div>
            <div style={styles.whyItem}><span>✔</span> Fast & Reliable Delivery</div>
            <div style={styles.whyItem}><span>✔</span> Secure Payments</div>
            <div style={styles.whyItem}><span>✔</span> Expert Health Support</div>
            <div style={styles.whyItem}><span>✔</span> Easy Returns</div>
          </div>

          {/* Subscribe Banner */}
          <div style={styles.subscribeBox}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Subscribe & Save</h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: '#e8f5e9' }}>Get 10% off on your first order.</p>
            <button style={{ backgroundColor: '#ffffff', color: '#1b4332', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
              Subscribe Now
            </button>
          </div>

        </div>

        {/* Right Content Area */}
        <div style={styles.contentArea}>
          
          {/* Hero Banner Section */}
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

          {/* Small Category Circle Icons */}
          <div style={styles.circlesRow}>
            {[
              { name: 'Natural Carbs', icon: '🌾' },
              { name: 'Healthy Fats & Oils', icon: '🏺' },
              { name: 'Nuts & Seeds', icon: '🥜' },
              { name: 'Dried Fruits', icon: '🍇' },
              { name: 'Herbal Teas', icon: '🍵' },
              { name: 'Superfoods', icon: '🌿' },
              { name: 'Supplements', icon: '💊' },
              { name: 'Plant Proteins', icon: '🌱' },
              { name: 'Healthy Snacks', icon: '🍿' },
              { name: 'Beverages', icon: '🧃' },
            ].map((c, i) => (
              <div key={i} style={styles.circleItem}>
                <div style={styles.circleImgBox}>{c.icon}</div>
                <span style={styles.circleText}>{c.name}</span>
              </div>
            ))}
          </div>

          {/* Lower Grid: Best Sellers + Special Offers Sidebar */}
          <div style={styles.lowerGrid}>
            
            {/* Best Sellers Section */}
            <div>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>Best Sellers</h3>
                <a href="#all" style={styles.viewAllLink}>View All Products →</a>
              </div>

              <div style={styles.productsGrid}>
                {[
                  { name: 'Raw Natural Honey', weight: '500g', price: 'RWF 5,000', rating: '★★★★★ (126)', img: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Almonds', weight: '250g', price: 'RWF 4,000', rating: '★★★★★ (85)', img: 'https://images.unsplash.com/photo-1508061253366-f7da154b6d46?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Chia Seeds', weight: '250g', price: 'RWF 3,500', rating: '★★★★★ (72)', img: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Whole Grain Oats', weight: '500g', price: 'RWF 2,800', rating: '★★★★★ (98)', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Green Tea', weight: '20 Tea Bags', price: 'RWF 2,500', rating: '★★★★★ (63)', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80' },
                  { name: 'Plant Protein Powder', weight: '500g', price: 'RWF 8,500', rating: '★★★★★ (54)', img: 'https://images.unsplash.com/photo-1579722820308-d74e571700a0?auto=format&fit=crop&w=300&q=80' },
                ].map((item, idx) => (
                  <div key={idx} style={styles.productCard}>
                    <div>
                      <img src={item.img} alt={item.name} style={styles.productImg} />
                      <h4 style={styles.productName}>{item.name}</h4>
                      <p style={styles.productWeight}>{item.weight}</p>
                      <div style={styles.ratingStars}>{item.rating}</div>
                    </div>
                    <div style={styles.productPriceRow}>
                      <span style={styles.priceTag}>{item.price}</span>
                      <button style={styles.addToCartBtn}>Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Offers Column */}
            <div>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>Special Offers</h3>
                <a href="#offers" style={styles.viewAllLink}>View All →</a>
              </div>
              <div style={styles.specialCard}>
                <div style={{ backgroundColor: '#2d6a4f', color: '#ffffff', display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', marginBottom: '10px' }}>10% OFF</div>
                <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80" alt="Bundle" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                <h4 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 4px 0' }}>Superfood Bundle</h4>
                <p style={{ fontSize: '11px', color: '#718096', margin: '0 0 8px 0' }}>Boost your health naturally</p>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1b4332', marginBottom: '12px' }}>
                  RWF 25,000 <span style={{ textDecoration: 'line-through', color: '#a0aec0', fontSize: '11px', fontWeight: 'normal' }}>RWF 28,000</span>
                </div>
                <button style={{ width: '100%', backgroundColor: '#2d6a4f', color: '#ffffff', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                  Shop Now
                </button>
              </div>

              {/* Help box */}
              <div style={{ ...styles.specialCard, marginTop: '20px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 4px 0' }}>Need Help Choosing?</h4>
                <p style={{ fontSize: '11px', color: '#718096', margin: '0 0 10px 0' }}>Our nutrition experts are here for you.</p>
                <button style={{ width: '100%', backgroundColor: '#25D366', color: '#ffffff', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                  Chat on WhatsApp
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Feature Footer Bar */}
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