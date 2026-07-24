import React from 'react';
import Header from './Header';

export default function ContactPage() {
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

    // Main Content Wrapper
    mainWrapper: {
      padding: '40px',
    },

    // Hero Section
    heroSection: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
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
    heroPerksGrid: {
      display: 'flex',
      gap: '20px',
      marginTop: '20px',
    },
    perkItem: {
      fontSize: '12px',
      color: '#4a5568',
    },
    perkIconCircle: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      backgroundColor: '#f0fdf4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '6px',
      fontSize: '14px',
      border: '1px solid #b7e4c7',
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

    // Reach Us Anytime Section
    reachSection: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '30px',
      border: '1px solid #eaeaea',
      marginBottom: '40px',
      textAlign: 'center',
    },
    reachGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '20px',
      marginTop: '25px',
      textAlign: 'left',
    },
    reachCard: {
      backgroundColor: '#fcfbf9',
      borderRadius: '12px',
      padding: '20px 15px',
      border: '1px solid #f0f0f0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    // Message & Map Section
    messageMapGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '40px',
    },
    formBox: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '30px',
      border: '1px solid #eaeaea',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    formGrid2: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '15px',
    },
    inputField: {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '8px',
      border: '1px solid #cbd5e0',
      fontSize: '13px',
      boxSizing: 'border-box',
      marginBottom: '15px',
    },
    textAreaField: {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '8px',
      border: '1px solid #cbd5e0',
      fontSize: '13px',
      boxSizing: 'border-box',
      height: '100px',
      marginBottom: '15px',
      resize: 'vertical',
    },
    submitBtn: {
      backgroundColor: '#1b4332',
      color: '#ffffff',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '13px',
      cursor: 'pointer',
      width: '100%',
    },
    mapBox: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '30px',
      border: '1px solid #eaeaea',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    mapPlaceholder: {
      width: '100%',
      height: '240px',
      backgroundColor: '#e2e8f0',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '15px',
      position: 'relative',
    },
    mapImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },

    // FAQ, Feedback, Hours Row
    bottomRowGrid: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr 1fr',
      gap: '24px',
      marginBottom: '40px',
    },
    cardModule: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '25px',
      border: '1px solid #eaeaea',
    },
    faqAccordionItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #f0f0f0',
      fontSize: '13px',
      color: '#2d3748',
      fontWeight: '500',
      cursor: 'pointer',
    },
    feedbackBtn: {
      backgroundColor: '#1b4332',
      color: '#ffffff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '13px',
      cursor: 'pointer',
      marginTop: '15px',
    },
    hourRow: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '13px',
      padding: '8px 0',
      borderBottom: '1px solid #f0f0f0',
      color: '#4a5568',
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
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#2d6a4f', textTransform: 'uppercase', marginBottom: '8px' }}>We're Here for You 🍃</p>
              <h2 style={styles.heroTitle}>Let's Connect!</h2>
              <p style={styles.heroDesc}>
                We'd love to hear from you. Whether you have a question, feedback, or partnership inquiry, our team is ready to help.
              </p>
            </div>
            <div style={styles.heroPerksGrid}>
              <div style={styles.perkItem}>
                <div style={styles.perkIconCircle}>🌿</div>
                <strong>We care</strong><br/>Your health is our priority.
              </div>
              <div style={styles.perkItem}>
                <div style={styles.perkIconCircle}>💬</div>
                <strong>We listen</strong><br/>We value your feedback.
              </div>
              <div style={styles.perkItem}>
                <div style={styles.perkIconCircle}>⚡</div>
                <strong>We act</strong><br/>We respond and serve better.
              </div>
            </div>
          </div>

          <div style={styles.heroImageCard}>
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" 
              alt="HealUp Storefront" 
              style={styles.heroImage} 
            />
          </div>
        </section>

        {/* Reach Us Anytime Section */}
        <section style={styles.reachSection}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>Reach Us Anytime 🍃</h3>
          <p style={{ fontSize: '13px', color: '#718096', margin: 0 }}>Choose the easiest way to contact us. We'll get back to you as soon as possible.</p>
          
          <div style={styles.reachGrid}>
            {[
              { title: 'Call Us', detail: '+250 788 123 456', sub: 'Mon - Sat: 7AM - 8PM\nSun: 8AM - 6PM', icon: '📞' },
              { title: 'WhatsApp', detail: '+250 788 123 456', sub: 'Chat with us on WhatsApp for quick support.', icon: '💚' },
              { title: 'Email Us', detail: 'info@healupkira.rw', sub: 'We reply within 24 hours.', icon: '✉️' },
              { title: 'Visit Us', detail: 'KG 123 St, Kacyiru\nKigali, Rwanda', sub: 'Near Kacyiru Roundabout', icon: '📍' },
              { title: 'Book a Consultation', detail: 'Talk to our nutritionist or wellness expert.', sub: 'Book Now ➔', icon: '🩺' },
              { title: 'Partnerships', detail: 'Interested in working with us?', sub: 'Let\'s Talk ➔', icon: '🤝' },
            ].map((item, idx) => (
              <div key={idx} style={styles.reachCard}>
                <div>
                  <div style={{ fontSize: '22px', marginBottom: '8px' }}>{item.icon}</div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>{item.title}</h4>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#2d3748', margin: '0 0 4px 0', whiteSpace: 'pre-line' }}>{item.detail}</p>
                </div>
                <p style={{ fontSize: '11px', color: '#718096', margin: '8px 0 0 0', whiteSpace: 'pre-line' }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Send Us a Message & Map Grid */}
        <section style={styles.messageMapGrid}>
          
          {/* Form Box */}
          <div style={styles.formBox}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>Send Us a Message 🍃</h3>
              <p style={{ fontSize: '12px', color: '#718096', marginBottom: '20px' }}>Fill out the form and we'll get back to you.</p>
              
              <div style={styles.formGrid2}>
                <input type="text" placeholder="Your Name *" style={styles.inputField} />
                <input type="email" placeholder="Your Email *" style={styles.inputField} />
              </div>
              <div style={styles.formGrid2}>
                <input type="text" placeholder="Your Phone Number" style={styles.inputField} />
                <input type="text" placeholder="Subject" style={styles.inputField} />
              </div>
              <textarea placeholder="Your Message *" style={styles.textAreaField}></textarea>
            </div>
            <div>
              <button style={styles.submitBtn}>Send Message ➔</button>
              <p style={{ fontSize: '11px', color: '#a0aec0', textAlign: 'center', marginTop: '10px' }}>🔒 Your information is safe with us. We respect your privacy.</p>
            </div>
          </div>

          {/* Map Box */}
          <div style={styles.mapBox}>
            <div>
              <div style={styles.mapPlaceholder}>
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" 
                  alt="Kigali Map Location" 
                  style={styles.mapImage} 
                />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>Find Us Easily 🍃</h3>
              <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 15px 0' }}>We are located in Kacyiru, Kigali. Easy access and parking available.</p>
            </div>
            <button style={{ backgroundColor: 'transparent', color: '#2d6a4f', border: '2px solid #2d6a4f', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', alignSelf: 'flex-start' }}>
              Get Directions ➔
            </button>
          </div>

        </section>

        {/* FAQs, Feedback, Business Hours Row */}
        <section style={styles.bottomRowGrid}>
          
          {/* FAQs */}
          <div style={styles.cardModule}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 15px 0' }}>Frequently Asked Questions 🍃</h3>
            {[
              'Do you offer home delivery?',
              'How can I place an order?',
              'Do you offer nutrition consultations?',
              'Can I customize my drinks?',
              'Do you offer wholesale or bulk orders?',
            ].map((faq, i) => (
              <div key={i} style={styles.faqAccordionItem}>
                <span>{faq}</span>
                <span>⌄</span>
              </div>
            ))}
            <a href="#faqs" style={{ display: 'inline-block', marginTop: '15px', fontSize: '12px', fontWeight: '600', color: '#2d6a4f', textDecoration: 'none' }}>View All FAQs ➔</a>
          </div>

          {/* Feedback & Socials */}
          <div style={styles.cardModule}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 4px 0' }}>We'd Love Your Feedback 🍃</h3>
            <p style={{ fontSize: '12px', color: '#718096', lineHeight: '1.4', margin: '0 0 15px 0' }}>Your feedback helps us serve you better and make HealUp-Kira even healthier for you.</p>
            <button style={styles.feedbackBtn}>Give Feedback 💬</button>
            
            <div style={{ marginTop: '30px', borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1b4332', margin: '0 0 8px 0' }}>Follow Us 🍃</h4>
              <p style={{ fontSize: '12px', color: '#718096', margin: '0 0 10px 0' }}>Stay inspired with healthy tips, recipes, and offers.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '16px', cursor: 'pointer' }}>🌐</span>
                <span style={{ fontSize: '16px', cursor: 'pointer' }}>📘</span>
                <span style={{ fontSize: '16px', cursor: 'pointer' }}>📸</span>
                <span style={{ fontSize: '16px', cursor: 'pointer' }}>🎵</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div style={styles.cardModule}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1b4332', margin: '0 0 15px 0' }}>Business Hours 🍃</h3>
            <div style={styles.hourRow}>
              <span>Monday – Saturday</span>
              <span style={{ fontWeight: '600' }}>7:00 AM - 8:00 PM</span>
            </div>
            <div style={styles.hourRow}>
              <span>Sunday</span>
              <span style={{ fontWeight: '600' }}>8:00 AM - 6:00 PM</span>
            </div>
            <div style={{ ...styles.hourRow, borderBottom: 'none' }}>
              <span>Public Holidays</span>
              <span style={{ fontWeight: '600' }}>8:00 AM - 6:00 PM</span>
            </div>
            <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '10px', marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#4a5568' }}>
              <span>🛍️</span>
              <span>We are open on most public holidays to keep you healthy!</span>
            </div>
          </div>

        </section>

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