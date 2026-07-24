import React from 'react';
import Header from './Header';

export default function HealUpCafePage() {
  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#fcfbf9',
      color: '#2d3748',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    // Main Navigation
    navBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 40px',
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
      width: '42px',
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    logoTextMain: {
      fontSize: '20px',
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
      gap: '28px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      fontSize: '14px',
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

    // Hero Section
    heroSection: {
      background: 'linear-gradient(rgba(15, 30, 20, 0.75), rgba(15, 30, 20, 0.75)), url("https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat',
      color: '#ffffff',
      padding: '60px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
    },
    heroContent: {
      maxWidth: '600px',
    },
    heroSubtitle: {
      fontStyle: 'italic',
      fontSize: '18px',
      color: '#d8f3dc',
      marginBottom: '10px',
    },
    heroTitle: {
      fontSize: '48px',
      fontWeight: '900',
      lineHeight: '1.1',
      margin: '0 0 10px 0',
    },
    heroTagline: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#b7e4c7',
      marginBottom: '20px',
    },
    heroDesc: {
      fontSize: '15px',
      color: '#e2e8f0',
      marginBottom: '30px',
      lineHeight: '1.5',
    },
    heroBadges: {
      display: 'flex',
      gap: '20px',
      marginBottom: '30px',
      flexWrap: 'wrap',
      fontSize: '13px',
      color: '#e2e8f0',
    },
    heroButtons: {
      display: 'flex',
      gap: '15px',
    },
    primaryButton: {
      backgroundColor: '#2d6a4f',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      border: '2px solid #ffffff',
      cursor: 'pointer',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    deliveryBadgeBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(5px)',
      padding: '20px',
      borderRadius: '12px',
      textAlign: 'center',
      border: '1px solid rgba(255,255,255,0.2)',
    },

    // Rating Bar
    ratingBar: {
      backgroundColor: '#ffffff',
      padding: '12px 40px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      borderBottom: '1px solid #eaeaea',
      fontSize: '14px',
    },
    stars: {
      color: '#f59e0b',
    },

    // Category Tabs Bar
    categoryBar: {
      display: 'flex',
      gap: '30px',
      padding: '20px 40px',
      backgroundColor: '#ffffff',
      overflowX: 'auto',
      borderBottom: '1px solid #eaeaea',
      whiteSpace: 'nowrap',
    },
    categoryItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      fontSize: '13px',
      color: '#4a5568',
      fontWeight: '500',
    },
    categoryIconCircle: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      backgroundColor: '#f0fdf4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      border: '1px solid #d8f3dc',
    },

    // Main Content Section Layout
    sectionWrapper: {
      padding: '40px',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#1b4332',
      margin: 0,
    },
    viewAllLink: {
      fontSize: '14px',
      color: '#2d6a4f',
      fontWeight: '600',
      textDecoration: 'none',
    },

    // Lifestyle Menu Filter Cards
    lifestyleGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
      gap: '15px',
      marginBottom: '40px',
    },
    lifestyleCard: {
      backgroundColor: '#ffffff',
      border: '1px solid #eaeaea',
      borderRadius: '12px',
      padding: '15px 10px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },

    // Grid Layouts for Products
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '20px',
      marginBottom: '50px',
    },
    productCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid #eaeaea',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    productImg: {
      width: '100%',
      height: '160px',
      objectFit: 'contain',
      marginBottom: '12px',
    },
    productName: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#1a202c',
      margin: '0 0 4px 0',
    },
    productDesc: {
      fontSize: '12px',
      color: '#718096',
      marginBottom: '12px',
      lineHeight: '1.4',
    },
    productFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
    },
    priceTag: {
      fontSize: '15px',
      fontWeight: '700',
      color: '#1b4332',
    },
    addButton: {
      backgroundColor: '#2d6a4f',
      color: '#ffffff',
      border: 'none',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '16px',
    },

    // Custom Drink Builder Section
    builderBanner: {
      backgroundColor: '#1b4332',
      color: '#ffffff',
      borderRadius: '16px',
      padding: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '50px',
      flexWrap: 'wrap',
      gap: '30px',
    },
    builderSteps: {
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginTop: '20px',
    },
    stepBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '15px',
      borderRadius: '10px',
      textAlign: 'center',
      minWidth: '110px',
      fontSize: '13px',
    },

    // Feature Highlights Footer Strip
    featureStrip: {
      backgroundColor: '#ffffff',
      borderTop: '1px solid #eaeaea',
      borderBottom: '1px solid #eaeaea',
      padding: '30px 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    featureIconBox: {
      fontSize: '24px',
      backgroundColor: '#f0fdf4',
      padding: '12px',
      borderRadius: '10px',
    },
    featureTitle: {
      fontSize: '14px',
      fontWeight: '700',
      margin: '0 0 4px 0',
      color: '#1b4332',
    },
    featureDesc: {
      fontSize: '12px',
      color: '#718096',
      margin: 0,
    },
  };

  return (
    <div style={styles.container}>
        <Header />
      
      {/* Navigation Bar */}
     
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <p style={styles.heroSubtitle}>Fresh. Natural. Made for You. 🌿</p>
          <h2 style={styles.heroTitle}>HealUp Café</h2>
          <p style={styles.heroTagline}>Takeaway Only 🍃</p>
          <p style={styles.heroDesc}>
            Every drink is freshly prepared with natural ingredients to support your lifestyle.
          </p>
          <div style={styles.heroBadges}>
            <span>✅ 100% Natural Ingredients</span>
            <span>🚫 No Added Sugar</span>
            <span>⚡ Freshly Prepared</span>
            <span>🎯 Made for Your Lifestyle</span>
          </div>
          <div style={styles.heroButtons}>
            <button style={styles.primaryButton}>Order Now</button>
            <button style={styles.secondaryButton}>Build Your Own</button>
          </div>
        </div>
        <div style={styles.deliveryBadgeBox}>
          <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#b7e4c7' }}>Fast Delivery</p>
          <p style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>Anywhere in</p>
          <h3 style={{ margin: 0, fontSize: '26px', color: '#ffffff' }}>KIGALI</h3>
          <span style={{ fontSize: '24px' }}>🛵</span>
        </div>
      </section>

      {/* Customer Rating Bar */}
      <div style={styles.ratingBar}>
        <span style={styles.stars}>★★★★★</span>
        <strong>4.9 (320+)</strong>
        <span style={{ color: '#718096' }}>| Loved by Our Customers</span>
      </div>

      {/* Category Navigation Bar */}
      <div style={styles.categoryBar}>
        {[
          { name: 'All Menu', icon: '🧰' },
          { name: 'Fresh Juices', icon: '🍊' },
          { name: 'Smoothies', icon: '🥤' },
          { name: 'Healthy Tisanes', icon: '🍵' },
          { name: 'Plant-Based Milk', icon: '🥛' },
          { name: 'Functional Beverages', icon: '⚡' },
          { name: 'Whole Wheat Breads', icon: '🍞' },
          { name: 'Healthy Pastries', icon: '🥐' },
          { name: 'Healthy Snacks', icon: '🥜' },
          { name: "Nutritionist's Picks", icon: '⭐' },
        ].map((cat, index) => (
          <div key={index} style={styles.categoryItem}>
            <div style={styles.categoryIconCircle}>{cat.icon}</div>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Main Container Sections */}
      <div style={styles.sectionWrapper}>
        
        {/* Lifestyle Menu Bar */}
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Lifestyle Menu</h3>
          <a href="#view-all" style={styles.viewAllLink}>View All</a>
        </div>
        <div style={styles.lifestyleGrid}>
          {[
            { title: 'Energy', icon: '⚡' },
            { title: 'Immunity', icon: '🛡️' },
            { title: 'Detox', icon: '🌿' },
            { title: 'Gut Health', icon: '🌾' },
            { title: 'Heart Health', icon: '❤️' },
            { title: 'Weight Management', icon: '⚖️' },
            { title: 'Sports & Fitness', icon: '🏋️' },
            { title: 'Beauty', icon: '✨' },
            { title: 'Relaxation', icon: '🧘' },
            { title: 'Kids', icon: '😊' },
            { title: 'Seniors', icon: '👴' },
          ].map((life, index) => (
            <div key={index} style={styles.lifestyleCard}>
              <div style={{ fontSize: '22px', marginBottom: '6px' }}>{life.icon}</div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#2d3748' }}>{life.title}</div>
            </div>
          ))}
        </div>

        {/* Popular Now Section */}
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Popular Now</h3>
          <a href="#view-all" style={styles.viewAllLink}>View All</a>
        </div>
        <div style={styles.productGrid}>
          {[
            {
              name: 'Green Detox',
              desc: 'Cucumber, celery, spinach, apple, lemon, ginger',
              price: 'FRW 3,500',
              img: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=400&q=80',
            },
            {
              name: 'Tropical Sunshine',
              desc: 'Pineapple, mango, orange, passion fruit',
              price: 'FRW 3,500',
              img: 'https://images.unsplash.com/photo-1552895638-f7fe08d2f7d6?auto=format&fit=crop&w=400&q=80',
            },
            {
              name: 'Beetroot Glow',
              desc: 'Beetroot, apple, carrot, lemon, ginger',
              price: 'FRW 3,500',
              img: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80',
            },
          ].map((item, index) => (
            <div key={index} style={styles.productCard}>
              <div>
                <img src={item.img} alt={item.name} style={styles.productImg} />
                <h4 style={styles.productName}>{item.name}</h4>
                <p style={styles.productDesc}>{item.desc}</p>
              </div>
              <div style={styles.productFooter}>
                <span style={styles.priceTag}>{item.price}</span>
                <button style={styles.addButton}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Nutritionist's Picks Section */}
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Nutritionist's Picks</h3>
          <span style={{ fontSize: '12px', color: '#2d6a4f', backgroundColor: '#e8f5e9', padding: '4px 10px', borderRadius: '6px' }}>Designed by HealUp Nutrition</span>
        </div>
        <div style={styles.productGrid}>
          {[
            {
              name: 'Immunity Boost',
              desc: 'Orange, pineapple, ginger, turmeric, lemon',
              price: 'FRW 3,800',
              img: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=400&q=80',
            },
            {
              name: 'Heart-Friendly',
              desc: 'Beetroot, apple, blueberries, lemon',
              price: 'FRW 3,800',
              img: 'https://images.unsplash.com/photo-1595974482597-4b8278c79f29?auto=format&fit=crop&w=400&q=80',
            },
            {
              name: 'Morning Energy',
              desc: 'Orange, carrot, ginger, lemon',
              price: 'FRW 3,500',
              img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80',
            },
            {
              name: 'Plant Protein Power',
              desc: 'Banana, peanut butter, soy milk, oats',
              price: 'FRW 4,000',
              img: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=400&q=80',
            },
          ].map((item, index) => (
            <div key={index} style={styles.productCard}>
              <div>
                <img src={item.img} alt={item.name} style={styles.productImg} />
                <h4 style={styles.productName}>{item.name}</h4>
                <p style={styles.productDesc}>{item.desc}</p>
              </div>
              <div style={styles.productFooter}>
                <span style={styles.priceTag}>{item.price}</span>
                <button style={styles.addButton}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Whole Wheat Breads Section */}
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Whole Wheat Breads</h3>
          <a href="#view-all" style={styles.viewAllLink}>View All</a>
        </div>
        <div style={styles.productGrid}>
          {[
            { name: '100% Whole Wheat Bread', desc: 'Made with whole grains, no refined flour.', price: 'FRW 2,500', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
            { name: 'Seeded Whole Wheat Bread', desc: 'Packed with nutrient seeds.', price: 'FRW 2,800', img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbc08?auto=format&fit=crop&w=400&q=80' },
            { name: 'Oat & Flax Bread', desc: 'Healthy dietary fiber rich loaf.', price: 'FRW 2,800', img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&q=80' },
          ].map((item, index) => (
            <div key={index} style={styles.productCard}>
              <div>
                <img src={item.img} alt={item.name} style={styles.productImg} />
                <h4 style={styles.productName}>{item.name}</h4>
                <p style={styles.productDesc}>{item.desc}</p>
              </div>
              <div style={styles.productFooter}>
                <span style={styles.priceTag}>{item.price}</span>
                <button style={styles.addButton}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Build Your Own Drink Section Banner */}
        <div style={styles.builderBanner}>
          <div>
            <h3 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>Build Your Own Drink</h3>
            <p style={{ margin: 0, color: '#d8f3dc', fontSize: '14px' }}>Make it your way. You choose, we mix!</p>
            <div style={styles.builderSteps}>
              <div style={styles.stepBox}><strong>1</strong><br/>Choose Base</div>
              <span>➔</span>
              <div style={styles.stepBox}><strong>2</strong><br/>Add Ingredients</div>
              <span>➔</span>
              <div style={styles.stepBox}><strong>3</strong><br/>Customize</div>
              <span>➔</span>
              <div style={styles.stepBox}><strong>4</strong><br/>Choose Size</div>
            </div>
          </div>
          <div>
            <button style={{ backgroundColor: '#ffffff', color: '#1b4332', padding: '14px 28px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
              Start Building ➔
            </button>
          </div>
        </div>

      </div>

      {/* Feature Highlights Footer Strip */}
      <div style={styles.featureStrip}>
        <div style={styles.featureItem}>
          <div style={styles.featureIconBox}>🌿</div>
          <div>
            <h4 style={styles.featureTitle}>Freshly Prepared</h4>
            <p style={styles.featureDesc}>Prepared only after you place your order.</p>
          </div>
        </div>
        <div style={styles.featureItem}>
          <div style={styles.featureIconBox}>🛵</div>
          <div>
            <h4 style={styles.featureTitle}>Fast Delivery</h4>
            <p style={styles.featureDesc}>Delivered as quickly as possible anywhere in Kigali.</p>
          </div>
        </div>
        <div style={styles.featureItem}>
          <div style={styles.featureIconBox}>🔄</div>
          <div>
            <h4 style={styles.featureTitle}>Not Satisfied?</h4>
            <p style={styles.featureDesc}>We'll remake it for you. Your satisfaction is important.</p>
          </div>
        </div>
        <div style={styles.featureItem}>
          <div style={styles.featureIconBox}>⭐</div>
          <div>
            <h4 style={styles.featureTitle}>Customer Satisfaction</h4>
            <p style={styles.featureDesc}>Dedicated support team</p>
          </div>
        </div>
      </div>

      {/* Footer Copyright Bar */}
      <div style={{ backgroundColor: '#1b4332', color: '#ffffff', padding: '16px 20px', textAlign: 'center', fontSize: '12px' }}>
        &copy; {new Date().getFullYear()} HealUp-Kira. All rights reserved. Designed for healthy living in Rwanda.
      </div>
    </div>
  );
}