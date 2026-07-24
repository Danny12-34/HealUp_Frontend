import React from 'react';
import Header from './Header';

export default function AboutUsPage() {
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

    // Main Content Padding Wrapper
    mainWrapper: {
      padding: '40px',
    },

    // Hero Top Section (We exist to inspire healthier lives)
    heroSection: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr 0.8fr',
      gap: '24px',
      marginBottom: '40px',
      alignItems: 'stretch',
    },
    heroCardMain: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '35px',
      border: '1px solid #eaeaea',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    heroTitle: {
      fontSize: '36px',
      fontWeight: '900',
      color: '#1b4332',
      lineHeight: '1.2',
      margin: '0 0 16px 0',
    },
    heroDesc: {
      fontSize: '14px',
      color: '#4a5568',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    storyBtn: {
      backgroundColor: '#1b4332',
      color: '#ffffff',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      fontSize: '13px',
      alignSelf: 'flex-start',
    },
    heroImageCard: {
      borderRadius: '16px',
      overflow: 'hidden',
      position: 'relative',
      minHeight: '280px',
    },
    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    promiseCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '30px',
      border: '1px solid #eaeaea',
    },
    promiseGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px',
      marginTop: '20px',
      textAlign: 'center',
    },
    promiseItem: {
      fontSize: '11px',
      color: '#4a5568',
      fontWeight: '600',
    },
    promiseIconCircle: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#f0fdf4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 6px auto',
      fontSize: '16px',
      border: '1px solid #b7e4c7',
    },

    // What We Do Section
    whatWeDoBox: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '35px',
      border: '1px solid #eaeaea',
      marginBottom: '40px',
    },
    whatWeDoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '20px',
      marginTop: '25px',
      textAlign: 'center',
    },
    serviceItem: {
      backgroundColor: '#fcfbf9',
      borderRadius: '12px',
      padding: '20px 10px',
      border: '1px solid #f0f0f0',
    },

    // Mission, Vision, Values Row
    missionVisionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginBottom: '40px',
    },
    mvvCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '30px',
      border: '1px solid #eaeaea',
    },

    // Impact & Journey & Team Grid
    middleGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.5fr 1fr',
      gap: '24px',
      marginBottom: '40px',
    },
    impactCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '30px',
      border: '1px solid #eaeaea',
    },
    impactStatsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      marginTop: '20px',
    },
    statBox: {
      fontSize: '13px',
      color: '#718096',
    },
    journeyCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '30px',
      border: '1px solid #eaeaea',
    },
    timeline: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px',
      position: 'relative',
      textAlign: 'center',
    },
    timelineItem: {
      fontSize: '11px',
      color: '#718096',
      zIndex: 1,
    },
    teamCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '30px',
      border: '1px solid #eaeaea',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    // Newsletter Section
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

    // Footer Area
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
      {/* Main Container */}
      <div style={styles.mainWrapper}>

        {/* Hero Top Grid */}
        <section style={styles.heroSection}>
          <div style={styles.heroCardMain}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#2d6a4f', textTransform: 'uppercase', marginBottom: '8px' }}>Our Story. Our Purpose. Our Promise. 🍃</p>
              <h2 style={styles.heroTitle}>We exist to inspire healthier lives</h2>
              <p style={styles.heroDesc}>
                HealUp-Kira is more than a business—it's a movement toward better health, natural living, and a brighter, stronger future for our community.
              </p>
            </div>
            <button style={styles.storyBtn}>Our Story ➔</button>
          </div>

          <div style={styles.heroImageCard}>
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" 
              alt="HealUp-Kira Storefront" 
              style={styles.heroImage} 
            />
          </div>

          <div style={styles.promiseCard}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 10px 0' }}>Our Promise to You</h3>
            <p style={{ fontSize: '12px', color: '#4a5568', lineHeight: '1.5', margin: 0 }}>
              We are committed to providing you with natural, high-quality products, expert guidance, and experiences that help you live a healthier, happier life.
            </p>
            <div style={styles.promiseGrid}>
              <div style={styles.promiseItem}>
                <div style={styles.promiseIconCircle}>🌿</div>
                Natural Ingredients
              </div>
              <div style={styles.promiseItem}>
                <div style={styles.promiseIconCircle}>🛡️</div>
                Quality Assured
              </div>
              <div style={styles.promiseItem}>
                <div style={styles.promiseIconCircle}>💡</div>
                Expert Guidance
              </div>
              <div style={styles.promiseItem}>
                <div style={styles.promiseIconCircle}>👥</div>
                Community Focused
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section style={styles.whatWeDoBox}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>What We Do</h3>
          <p style={{ fontSize: '13px', color: '#718096', margin: 0 }}>HealUp-Kira brings together everything you need for a healthier lifestyle under one roof and one mission.</p>
          
          <div style={styles.whatWeDoGrid}>
            {[
              { title: 'HealMart', desc: 'Natural & healthy products for your everyday life.', icon: '🛒' },
              { title: 'HealUp Café', desc: 'Fresh, nutritious meals and drinks made for you.', icon: '🥤' },
              { title: 'Natural Beauty & Wellness', desc: 'Care for your body, mind and soul.', icon: '🧴' },
              { title: 'Healthy Living', desc: 'Knowledge, tips and guidance for a better you.', icon: '📖' },
              { title: 'Nutrition Consultation', desc: 'Personalized advice for your health journey.', icon: '🩺' },
            ].map((serv, idx) => (
              <div key={idx} style={styles.serviceItem}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{serv.icon}</div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>{serv.title}</h4>
                <p style={{ fontSize: '11px', color: '#718096', margin: 0, lineHeight: '1.4' }}>{serv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission, Vision, Values Row */}
        <section style={styles.missionVisionGrid}>
          <div style={styles.mvvCard}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎯</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 8px 0' }}>Our Mission</h3>
            <p style={{ fontSize: '13px', color: '#4a5568', lineHeight: '1.5', margin: 0 }}>
              To make healthy living accessible, enjoyable, and sustainable for everyone.
            </p>
          </div>

          <div style={styles.mvvCard}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>👁️</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 8px 0' }}>Our Vision</h3>
            <p style={{ fontSize: '13px', color: '#4a5568', lineHeight: '1.5', margin: 0 }}>
              To be Rwanda's leading health and wellness lifestyle destination.
            </p>
          </div>

          <div style={styles.mvvCard}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>💎</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 8px 0' }}>Our Values</h3>
            <ul style={{ paddingLeft: '16px', margin: '0', fontSize: '13px', color: '#4a5568', lineHeight: '1.6' }}>
              <li>Health First</li>
              <li>Integrity</li>
              <li>Sustainability</li>
              <li>Innovation</li>
              <li>Community</li>
            </ul>
          </div>
        </section>

        {/* Impact, Journey, Team Grid */}
        <section style={styles.middleGrid}>
          
          {/* Impact Card */}
          <div style={styles.impactCard}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>Our Impact So Far 🌿</h3>
            <div style={styles.impactStatsGrid}>
              <div style={styles.statBox}>
                <strong style={{ fontSize: '20px', color: '#2d6a4f', display: 'block' }}>10K+</strong> Happy Customers
              </div>
              <div style={styles.statBox}>
                <strong style={{ fontSize: '20px', color: '#2d6a4f', display: 'block' }}>500+</strong> Natural Products
              </div>
              <div style={styles.statBox}>
                <strong style={{ fontSize: '20px', color: '#2d6a4f', display: 'block' }}>15K+</strong> Fresh Drinks Served
              </div>
              <div style={styles.statBox}>
                <strong style={{ fontSize: '20px', color: '#2d6a4f', display: 'block' }}>50+</strong> Community Events
              </div>
            </div>
          </div>

          {/* Journey Timeline Card */}
          <div style={styles.journeyCard}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>Our Journey 🍃</h3>
            <div style={styles.timeline}>
              <div style={styles.timelineItem}>
                <div style={{ fontWeight: 'bold', color: '#1b4332', fontSize: '12px' }}>The Beginning</div>
                <div style={{ fontSize: '10px', color: '#a0aec0' }}>2021</div>
              </div>
              <div style={styles.timelineItem}>
                <div style={{ fontWeight: 'bold', color: '#1b4332', fontSize: '12px' }}>First Store</div>
                <div style={{ fontSize: '10px', color: '#a0aec0' }}>2022</div>
              </div>
              <div style={styles.timelineItem}>
                <div style={{ fontWeight: 'bold', color: '#1b4332', fontSize: '12px' }}>HealUp Café</div>
                <div style={{ fontSize: '10px', color: '#a0aec0' }}>2023</div>
              </div>
              <div style={styles.timelineItem}>
                <div style={{ fontWeight: 'bold', color: '#1b4332', fontSize: '12px' }}>Growing Together</div>
                <div style={{ fontSize: '10px', color: '#a0aec0' }}>2024+</div>
              </div>
            </div>
          </div>

          {/* Team Card */}
          <div style={styles.teamCard}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>A Team That Cares 🍃</h3>
              <p style={{ fontSize: '12px', color: '#4a5568', lineHeight: '1.4', marginBottom: '15px' }}>
                Our team of nutritionists, health experts, and wellness enthusiasts work together to support your journey.
              </p>
            </div>
            <button style={{ backgroundColor: '#2d6a4f', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', fontSize: '12px', cursor: 'pointer', alignSelf: 'flex-start' }}>
              Meet Our Team ➔
            </button>
          </div>

        </section>

        {/* Newsletter Banner */}
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
            <h4 style={{ color: '#ffffff', fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>Our Services</h4>
            <ul style={styles.footerLinkList}>
              <li>Natural Products</li>
              <li>Healthy Meals & Drinks</li>
              <li>Wellness Services</li>
              <li>Nutrition Consultation</li>
              <li>Workshops & Classes</li>
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
          <div>Made with ❤️ for a healthier Rwanda.</div>
        </div>
      </footer>

    </div>
  );
}