import React from 'react';

const About = () => {
  const aboutStyle = {
    padding: '60px 20px',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6'
  };
  const headingStyle = { fontSize: '28px', marginBottom: '20px', color: '#2ecc71' };
  const textStyle = { fontSize: '16px', color: '#444' };

  return (
    <section style={aboutStyle}>
      <h2 style={headingStyle}>About Us</h2>
      <p style={textStyle}>
        Heal Up is a platform that provides health tips, products, and meal plans
        designed to improve your lifestyle.
      </p>
    </section>
  );
};

export default About;
