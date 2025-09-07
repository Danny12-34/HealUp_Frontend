import React from 'react';

const services = [
  { title: "HealMart", desc: "Shop healthy products", img: "/images/healmart.jpg" },
  { title: "Eat & Meal", desc: "Nutritious meal plans", img: "/images/eat-meal.jpg" },
  { title: "Healthy Bread", desc: "Fresh, healthy bread", img: "/images/bread.jpg" },
  { title: "Learn", desc: "YouTube tutorials", img: "/images/learn.jpg" }
];

const Services = () => {
  const sectionStyle = { padding: '50px 40px', backgroundColor: '#f9f9f9' };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' };
  const cardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  };
  const imageStyle = { width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' };

  return (
    <section style={sectionStyle}>
      <h2 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '30px' }}>Our Services</h2>
      <div style={gridStyle}>
        {services.map((s, i) => (
          <div key={i} style={cardStyle}>
            <img src={s.img} alt={s.title} style={imageStyle} />
            <h3 style={{ fontSize: '20px', fontWeight: '600' }}>{s.title}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
