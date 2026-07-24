import React from 'react';
import Header from './Header';

export default function HealthyLivingPage() {
  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#fcfbf9',
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
      gap: '16px',
      fontSize: '14px',
      alignItems: 'center',
      color: '#2d3748',
      cursor: 'pointer',
    },

    // Hero Section
    heroSection: {
      background: 'linear-gradient(rgba(15, 30, 20, 0.75), rgba(15, 30, 20, 0.75)), url("https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat',
      color: '#ffffff',
      padding: '60px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    heroContent: {
      maxWidth: '600px',
    },
    heroTitle: {
      fontSize: '44px',
      fontWeight: '900',
      lineHeight: '1.1',
      margin: '0 0 15px 0',
    },
    heroDesc: {
      fontSize: '15px',
      color: '#e2e8f0',
      marginBottom: '25px',
      lineHeight: '1.5',
    },
    heroBadges: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      fontSize: '13px',
      color: '#e2e8f0',
    },

    // Category Filter Strip
    categoryBar: {
      display: 'flex',
      justifyContent: 'space-around',
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
      fontSize: '12px',
      color: '#4a5568',
      fontWeight: '600',
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

    // Main Wrapper & Layout
    mainWrapper: {
      padding: '40px',
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '30px',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '20px',
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

    // Cards Grid
    grid4: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
    },
    grid3: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid #eaeaea',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    cardImg: {
      width: '100%',
      height: '140px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '12px',
    },
    badgeTag: {
      fontSize: '10px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: '#2d6a4f',
      backgroundColor: '#f0fdf4',
      padding: '2px 8px',
      borderRadius: '4px',
      display: 'inline-block',
      marginBottom: '8px',
    },
    cardTitle: {
      fontSize: '14px',
      fontWeight: '700',
      color: '#1a202c',
      margin: '0 0 6px 0',
      lineHeight: '1.4',
    },
    cardDesc: {
      fontSize: '12px',
      color: '#718096',
      marginBottom: '12px',
      lineHeight: '1.4',
    },
    cardMeta: {
      fontSize: '11px',
      color: '#a0aec0',
      marginTop: 'auto',
    },

    // Right Sidebar Modules
    sidebarBox: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #eaeaea',
      marginBottom: '20px',
    },
    nutritionistCard: {
      textAlign: 'center',
    },
    avatarImg: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover',
      margin: '0 auto 12px auto',
      border: '2px solid #2d6a4f',
    },
    primaryBtn: {
      backgroundColor: '#2d6a4f',
      color: '#ffffff',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '12px',
      cursor: 'pointer',
      width: '100%',
      marginTop: '12px',
    },
    outlineBtn: {
      backgroundColor: 'transparent',
      color: '#2d6a4f',
      border: '2px solid #2d6a4f',
      padding: '8px 16px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '12px',
      cursor: 'pointer',
      width: '100%',
      marginTop: '10px',
    },
    topicItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '13px',
      color: '#4a5568',
      padding: '10px 0',
      borderBottom: '1px solid #f0f0f0',
      cursor: 'pointer',
    },

    // Newsletter section
    newsletterBox: {
      backgroundColor: '#f2f8f4',
      borderRadius: '16px',
      padding: '30px 40px',
      border: '1px solid #d8f3dc',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px',
    },

    // Footer
    footer: {
      backgroundColor: '#112218',
      color: '#ffffff',
      padding: '50px 40px 20px 40px',
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.2fr',
      gap: '30px',
      marginBottom: '40px',
      fontSize: '13px',
    },
    footerLinkList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      color: '#a0aec0',
    },
    footerBottomBar: {
      borderTop: '1px solid rgba(255,255,255,0.1)',
      paddingTop: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '12px',
      color: '#a0aec0',
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>Healthy Living, Better You 🍃</h2>
          <p style={styles.heroDesc}>
            Science-based nutrition tips, healthy recipes, and lifestyle guides to help you live stronger, happier and longer.
          </p>
          <div style={styles.heroBadges}>
            <span>✅ Evidence Based</span>
            <span>🍳 Practical & Simple</span>
            <span>🌱 For Every Lifestyle</span>
            <span>⚡ Better Health Every Day</span>
          </div>
        </div>
      </section>

      {/* Category Icons Bar */}
      <div style={styles.categoryBar}>
        {[
          { name: 'Nutrition Tips', icon: '🥗' },
          { name: 'Healthy Recipes', icon: '🍲' },
          { name: 'Lifestyle Guides', icon: '🏃' },
          { name: 'Nutritionist Advice', icon: '🩺' },
          { name: 'Videos', icon: '🎬' },
          { name: 'Free Guides', icon: '📖' },
          { name: 'Health News', icon: '📰' },
          { name: 'Q&A', icon: '❓' },
        ].map((cat, idx) => (
          <div key={idx} style={styles.categoryItem}>
            <div style={styles.categoryIconCircle}>{cat.icon}</div>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={styles.mainWrapper}>
        <div style={styles.contentGrid}>
          
          {/* Left Column Feed */}
          <div>
            
            {/* Popular Now Section */}
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Popular Now</h3>
              <a href="#all" style={styles.viewAllLink}>View All ➔</a>
            </div>
            <div style={styles.grid4}>
              {[
                { title: '10 Superfoods to Boost Your Immunity Naturally', tag: 'Nutrition Tip', desc: 'Strengthen your immune system with everyday superfoods.', time: '5 min read • May 14, 2024', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80' },
                { title: 'Green Detox Smoothie for a Fresh Start', tag: 'Recipe', desc: 'A refreshing smoothie to detox your body and energise your day.', time: '4 min read • May 10, 2024', img: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=300&q=80' },
                { title: 'How Much Water Should You Drink Daily?', tag: 'Lifestyle', desc: 'Find out the right amount of water your body truly needs.', time: '4 min read • May 8, 2024', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=300&q=80' },
                { title: 'Balanced Meals: The 50/25/25 Rule', tag: 'Nutrition Tip', desc: 'Learn how to build balanced meals for energy and long-term health.', time: '4 min read • May 6, 2024', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80' },
              ].map((item, idx) => (
                <div key={idx} style={styles.card}>
                  <div>
                    <img src={item.img} alt={item.title} style={styles.cardImg} />
                    <span style={styles.badgeTag}>{item.tag}</span>
                    <h4 style={styles.cardTitle}>{item.title}</h4>
                    <p style={styles.cardDesc}>{item.desc}</p>
                  </div>
                  <div style={styles.cardMeta}>{item.time}</div>
                </div>
              ))}
            </div>

            {/* Healthy Recipes You'll Love */}
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Healthy Recipes You'll Love</h3>
              <a href="#recipes" style={styles.viewAllLink}>View All Recipes ➔</a>
            </div>
            <div style={styles.grid4}>
              {[
                { title: 'Overnight Oats with Fruits', tag: 'Breakfast', time: '10 min • Easy', img: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=300&q=80' },
                { title: 'Quinoa & Chickpea Power Bowl', tag: 'Lunch', time: '20 min • Medium', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80' },
                { title: 'No-Bake Energy Balls', tag: 'Snack', time: '15 min • Easy', img: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=300&q=80' },
                { title: 'Sweet Potato & Lentil Soup', tag: 'Dinner', time: '30 min • Easy', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=300&q=80' },
              ].map((item, idx) => (
                <div key={idx} style={styles.card}>
                  <div>
                    <img src={item.img} alt={item.title} style={styles.cardImg} />
                    <span style={styles.badgeTag}>{item.tag}</span>
                    <h4 style={styles.cardTitle}>{item.title}</h4>
                  </div>
                  <div style={styles.cardMeta}>{item.time}</div>
                </div>
              ))}
            </div>

            {/* Lifestyle Guides */}
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Lifestyle Guides</h3>
              <a href="#guides" style={styles.viewAllLink}>View All Guides ➔</a>
            </div>
            <div style={styles.grid4}>
              {[
                { title: 'Stress Less, Live More', tag: 'Wellness', desc: 'Practical ways to manage stress and improve mental health.', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300&q=80' },
                { title: 'Beginner’s Guide to Staying Active', tag: 'Fitness', desc: 'Easy tips to start moving your body every day.', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80' },
                { title: 'Better Sleep, Better You', tag: 'Sleep', desc: 'Improve your sleep quality and wake up refreshed.', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=300&q=80' },
                { title: 'Meal Prep Like a Pro', tag: 'Meal Prep', desc: 'Save time and eat healthy all week long.', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80' },
              ].map((item, idx) => (
                <div key={idx} style={styles.card}>
                  <div>
                    <img src={item.img} alt={item.title} style={styles.cardImg} />
                    <span style={styles.badgeTag}>{item.tag}</span>
                    <h4 style={styles.cardTitle}>{item.title}</h4>
                    <p style={styles.cardDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Sidebar Column */}
          <div>
            
            {/* Ask Our Nutritionist Card */}
            <div style={{ ...styles.sidebarBox, ...styles.nutritionistCard }}>
              <img src="https://images.unsplash.com/photo-1594824813513-888914c62c3e?auto=format&fit=crop&w=200&q=80" alt="Nutritionist" style={styles.avatarImg} />
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>Ask Our Nutritionist</h4>
              <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 12px 0' }}>Get expert answers to your nutrition and healthy living questions.</p>
              <button style={styles.primaryBtn}>Ask a Question ➔</button>
              
              <div style={{ borderTop: '1px solid #eaeaea', marginTop: '20px', paddingTop: '15px', textAlign: 'left' }}>
                <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>Our Team of Nutritionists</h5>
                <p style={{ fontSize: '11px', color: '#718096', margin: '0 0 10px 0' }}>Here to guide you toward a healthier you.</p>
                <a href="#team" style={{ fontSize: '12px', fontWeight: '600', color: '#2d6a4f', textDecoration: 'none' }}>Meet the Team ➔</a>
              </div>
            </div>

            {/* Free Guide Banner Card */}
            <div style={styles.sidebarBox}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#2d6a4f', backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: '4px' }}>Free Guide</span>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1b4332', margin: '10px 0 6px 0' }}>7 Days Healthy Eating Guide</h4>
              <p style={{ fontSize: '11px', color: '#718096', marginBottom: '12px', lineHeight: '1.4' }}>Simple meal ideas, shopping list and tips for a healthier you in just 7 days.</p>
              <img src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=300&q=80" alt="Guide Cover" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />
              <button style={styles.outlineBtn}>Download Free ➔</button>
            </div>

            {/* Trending Topics */}
            <div style={styles.sidebarBox}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#1b4332', margin: '0 0 10px 0' }}>Trending Topics</h4>
              {[
                'Weight Management',
                'Gut Health',
                'Immunity Boost',
                'Plant-Based Living',
                'Heart Health',
                'Diabetes Friendly',
              ].map((topic, i) => (
                <div key={i} style={styles.topicItem}>
                  <span>{topic}</span>
                  <span>➔</span>
                </div>
              ))}
              <a href="#topics" style={{ display: 'block', marginTop: '12px', fontSize: '12px', fontWeight: '600', color: '#2d6a4f', textDecoration: 'none' }}>View All Topics ➔</a>
            </div>

          </div>

        </div>

        {/* Newsletter Section */}
        <section style={styles.newsletterBox}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>Stay Inspired, Stay Healthy</h3>
            <p style={{ fontSize: '13px', color: '#4a5568', margin: 0 }}>Get the latest updates, health tips and offers straight to your inbox.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e0', width: '240px', fontSize: '13px' }} 
            />
            <button style={{ backgroundColor: '#1b4332', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
              Subscribe
            </button>
          </div>
        </section>

      </div>

      {/* Footer Area */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={styles.logoBadge}>Hü</div>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>HealUp-Kira</span>
            </div>
            <p style={{ color: '#a0aec0', fontSize: '12px', lineHeight: '1.5', margin: 0 }}>
              Empowering healthier lives through natural products, nutritious food, wellness services and expert guidance.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>Quick Links</h4>
            <ul style={styles.footerLinkList}>
              <li>Home</li>
              <li>HealMart</li>
              <li>HealUp Café</li>
              <li>Healthy Living</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>Healthy Living</h4>
            <ul style={styles.footerLinkList}>
              <li>Nutrition Tips</li>
              <li>Healthy Recipes</li>
              <li>Lifestyle Guides</li>
              <li>Nutritionist Advice</li>
              <li>Videos</li>
              <li>Free Guides</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>Help & Support</h4>
            <ul style={styles.footerLinkList}>
              <li>FAQ</li>
              <li>Shipping & Delivery</li>
              <li>Returns & Refunds</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>Contact Us</h4>
            <p style={{ color: '#a0aec0', fontSize: '12px', margin: '0 0 6px 0' }}>📞 +250 788 123 456</p>
            <p style={{ color: '#a0aec0', fontSize: '12px', margin: '0 0 6px 0' }}>✉️ info@healupkira.rw</p>
            <p style={{ color: '#a0aec0', fontSize: '12px', margin: 0 }}>📍 KG 123 St, Kacyiru, Kigali, Rwanda</p>
          </div>
        </div>

        <div style={styles.footerBottomBar}>
          <div>&copy; 2024 HealUp-Kira. All rights reserved.</div>
          <div>Choose natural, Choose HealUp Café.</div>
        </div>
      </footer>

    </div>
  );
}