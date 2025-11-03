import React, { useState, useEffect } from 'react';
import { Leaf, MapPin, Mail, Phone, Clock } from 'lucide-react';

// --- Configuration and Data ---

const COLORS = {
  PRIMARY_GREEN: '#047857', // Main background, buttons, headlines
  TEXT_DARK: '#1f2937',    // Equivalent to gray-900
  TEXT_MEDIUM: '#4b5563',  // Equivalent to gray-600
  WHITE: '#ffffff',
  BG_LIGHT: '#f9fafb',    // Equivalent to gray-50
  BORDER_COLOR: '#d1d5db', // Equivalent to gray-300
  ICON_GRAY: '#6b7280',    // Equivalent to gray-500
  RED_MAP_PIN: '#dc2626',
};

const FOOTER_HEIGHT = '10rem'; // Estimate for footer padding

// Data for Contact Info
const contactInfo = [
  { icon: MapPin, text: "Kigali, Rwanda", label: "Location" },
  { icon: Mail, text: "info@healup.rw", label: "Email" },
  { icon: Phone, text: "+250 7XX XXX XXX", label: "Phone" },
  { icon: Clock, text: "Monday–Friday, 9:00 AM – 6:00 PM", label: "Hours" },
];


// --- Responsive Hook (Internal CSS Media Query Logic) ---

const useResponsiveStyles = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width < 768; // Common 'md' breakpoint

  return {
    isMobile,
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: isMobile ? '0 1rem' : '0 2rem', // Responsive padding
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    },
    // Main Layout Grid
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '2.5rem' : '4rem',
      paddingTop: '2.5rem',
      paddingBottom: '2.5rem',
    },
    // Footer Styles
    footerWrapper: {
        marginTop: '3rem',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    footerBar: {
      backgroundColor: COLORS.PRIMARY_GREEN,
      color: COLORS.WHITE,
      padding: '2.5rem 2rem',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      borderRadius: '0 0 1rem 1rem',
    },
    footerNavLinkStyle: {
      color: COLORS.WHITE,
      textDecoration: 'none',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'opacity 0.3s',
      ':hover': { opacity: 0.8 },
    }
  };
};

// --- Reusable Components with Internal CSS ---

const NavLink = ({ children }) => (
  <a
    href="#"
    style={{ color: COLORS.TEXT_MEDIUM, textDecoration: 'none', transition: 'color 0.3s' }}
    onMouseOver={(e) => e.currentTarget.style.color = COLORS.PRIMARY_GREEN}
    onMouseOut={(e) => e.currentTarget.style.color = COLORS.TEXT_MEDIUM}
  >
    {children}
  </a>
);

const Button = ({ children, style = {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: COLORS.PRIMARY_GREEN,
    color: COLORS.WHITE,
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    ...style,
  };

  const hoverStyle = {
    ...baseStyle,
    backgroundColor: COLORS.HOVER_GREEN,
    boxShadow: '0 6px 8px -2px rgba(0, 0, 0, 0.15)',
  };

  return (
    <button
      style={isHovered ? hoverStyle : baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => console.log(`${children} button clicked.`)}
    >
      {children}
    </button>
  );
};

const ContactItem = ({ icon: Icon, text, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
    <Icon style={{ width: '1.25rem', height: '1.25rem', color: COLORS.ICON_GRAY, flexShrink: 0 }} aria-label={label} />
    <span style={{ color: COLORS.TEXT_MEDIUM }}>{text}</span>
  </div>
);


// --- Main App Component ---

export default function App() {
  const R = useResponsiveStyles();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'General',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Using console log instead of alert()
    console.log("Contact Form Submitted:", formData);
    console.log("Message Sent! (Form data logged to console)");
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: `1px solid ${COLORS.BORDER_COLOR}`,
    borderRadius: '0.5rem',
    boxSizing: 'border-box',
    marginTop: '0.25rem',
    transition: 'border-color 0.3s',
    ':focus': { borderColor: COLORS.PRIMARY_GREEN },
  };

  // Header Styles
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 0',
  };

  // Footer Link Container Style
  const footerLinksStyle = {
    display: 'flex',
    gap: R.isMobile ? '1rem' : '2rem',
    marginTop: R.isMobile ? '1rem' : '0',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: COLORS.WHITE }}>
      <div style={{ flexGrow: 1, ...R.container }}>
        
        {/* Header/Navbar */}
        <header style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf style={{ width: '1.5rem', height: '1.5rem', color: COLORS.PRIMARY_GREEN }} />
            <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: COLORS.TEXT_DARK }}>Heal Up</span>
          </div>
          <nav style={{ display: R.isMobile ? 'none' : 'flex', gap: '1.5rem' }}>
            <NavLink>Home</NavLink>
            <NavLink>Products</NavLink>
            <NavLink>About</NavLink>
            <NavLink>Learn</NavLink>
          </nav>
        </header>

        {/* --- Hero / Intro Section --- */}
        <section style={{ padding: '2rem 0 3rem 0' }}>
          <h1 style={{ fontSize: R.isMobile ? '2rem' : '2.5rem', fontWeight: '700', color: COLORS.TEXT_DARK, lineHeight: '1.2' }}>
            Get in Touch with Heal Up
          </h1>
          <p style={{ marginTop: '0.5rem', fontSize: '1rem', color: COLORS.TEXT_MEDIUM, maxWidth: '30rem' }}>
            We'd love to hear from you — questions, partnerships, or healthy living advice.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <Button>Send a Message</Button>
          </div>
        </section>

        {/* --- Main Contact Layout: Form and Info --- */}
        <section style={R.contactGrid}>
          
          {/* Left Column: Contact Form */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: COLORS.TEXT_DARK, marginBottom: '1.5rem' }}>Contact Form</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
              
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: COLORS.TEXT_MEDIUM }}>Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: COLORS.TEXT_MEDIUM }}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              {/* Subject (Dropdown) */}
              <div>
                <label htmlFor="subject" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: COLORS.TEXT_MEDIUM }}>Subject</label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{ ...inputStyle, appearance: 'none', paddingRight: '2.5rem' }}
                  >
                    <option value="General">General</option>
                    <option value="Partnership">Partnership Inquiry</option>
                    <option value="Support">Technical Support</option>
                  </select>
                  {/* Custom arrow for select element */}
                  <div style={{ pointerEvents: 'none', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', color: COLORS.TEXT_MEDIUM }}>
                    <svg style={{ fill: 'currentColor', width: '1rem', height: '1rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: COLORS.TEXT_MEDIUM }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                ></textarea>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <Button>Send Message</Button>
              </div>
            </form>
          </div>

          {/* Right Column: Contact Information and Map */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: COLORS.TEXT_DARK, marginBottom: '1.5rem' }}>Contact Information</h2>
            
            {/* Contact Details List */}
            <div style={{ marginBottom: '2rem' }}>
              {contactInfo.map((item, index) => (
                <ContactItem key={index} {...item} />
              ))}
            </div>
            
            {/* Embedded Map */}
            <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '0.5rem', border: `1px solid ${COLORS.BORDER_COLOR}`, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', position: 'relative' }}>
              <iframe
                src="https://maps.google.com/maps?q=Kigali,%20Rwanda&z=12&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                aria-hidden="false"
                tabIndex="0"
                title="Location Map of Kigali"
              ></iframe>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -80%)', backgroundColor: COLORS.WHITE, padding: '0.3rem', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
                <MapPin style={{ width: '1.5rem', height: '1.5rem', color: COLORS.RED_MAP_PIN }} />
              </div>
            </div>
          </div>
        </section>

      </div>
      
      {/* --- Footer (Green Bar with Rounded Corners) --- */}
      <div style={R.footerWrapper}>
        <footer style={R.footerBar}>
          <p style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0' }}>
            Eat well. Live better. Learn always.
          </p>
          <nav style={footerLinksStyle}>
            <a href="#" style={R.footerNavLinkStyle}>Home</a>
            <a href="#" style={R.footerNavLinkStyle}>Products</a>
            <a href="#" style={R.footerNavLinkStyle}>About</a>
            <a href="#" style={R.footerNavLinkStyle}>Learn</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
