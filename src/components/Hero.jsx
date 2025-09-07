import React, { useState, useEffect } from 'react';

const Hero = () => {
  const slides = [
    {
      img: "data:image/jpeg;base64,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",
      heading: "Heal Your Body, One Meal at a Time",
      desc: "Discover fresh, nutritious meals delivered right to your door."
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStSd0tXtN_MHIupw-rc6E4Jniwf4IOk7w6nA&s",
      heading: "Organic & Healthy Products",
      desc: "Choose from a wide variety of natural, organic ingredients."
    },
    {
      img: "",
      heading: "Personalized Nutrition Plans",
      desc: "Tailored meal plans to fit your lifestyle and wellness goals."
    },
    {
      img: "https://images.unsplash.com/photo-1603052875632-1e992a68f1b8?crop=entropy&cs=tinysrgb&fit=max&h=500&w=900",
      heading: "Fast & Reliable Delivery",
      desc: "Get your healthy meals delivered fresh and on time."
    },
    {
      img: "https://images.unsplash.com/photo-1598514983079-0d0a7d03a6b2?crop=entropy&cs=tinysrgb&fit=max&h=500&w=900",
      heading: "Eat Well, Live Better",
      desc: "Transform your eating habits and enjoy a healthier lifestyle."
    },
  ];

  const features = [
    { title: "Fresh & Organic", desc: "All products are 100% natural and organic.", img: "https://img.icons8.com/color/96/000000/leaf.png" },
    { title: "Custom Meal Plans", desc: "Personalized nutrition plans for everyone.", img: "https://img.icons8.com/color/96/000000/meal.png" },
    { title: "Fast Delivery", desc: "Receive your orders quickly and safely.", img: "https://img.icons8.com/color/96/000000/delivery.png" },
    { title: "Healthy Recipes", desc: "Learn to cook nutritious meals easily.", img: "https://img.icons8.com/color/96/000000/cooking-book.png" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f9f9f9', borderRadius: '15px', padding: '50px 20px' }}>
      
      {/* Hero Slider */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: '45%', flex: '1 1 300px', zIndex: 2, paddingRight: '20px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2', color: '#27ae60' }}>
            {slides[current].heading}
          </h1>
          <p style={{ fontSize: '18px', marginBottom: '25px', color: '#555' }}>{slides[current].desc}</p>
          <div>
            <button style={{ padding: '12px 24px', marginRight: '15px', borderRadius: '6px', border: 'none', backgroundColor: '#2ecc71', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
              Shop Now
            </button>
            <button style={{ padding: '12px 24px', borderRadius: '6px', border: 'none', backgroundColor: '#ddd', color: '#333', fontWeight: '600', cursor: 'pointer' }}>
              Learn More
            </button>
          </div>
        </div>

        <div style={{ maxWidth: '50%', flex: '1 1 300px', textAlign: 'center', position: 'relative' }}>
          <img
            src={slides[current].img}
            alt="Hero Slide"
            style={{ width: '100%', maxHeight: '450px', borderRadius: '15px', objectFit: 'cover', boxShadow: '0 10px 20px rgba(0,0,0,0.15)', transition: 'opacity 1s ease-in-out' }}
          />
        </div>
      </div>

      {/* Arrows */}
      <div onClick={prevSlide} style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', fontSize: '32px', color: '#27ae60', background: '#fff', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
        &#10094;
      </div>
      <div onClick={nextSlide} style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)', fontSize: '32px', color: '#27ae60', background: '#fff', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
        &#10095;
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
        {slides.map((_, idx) => (
          <div key={idx} onClick={() => setCurrent(idx)} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: current === idx ? '#27ae60' : '#ccc', cursor: 'pointer' }} />
        ))}
      </div>

      {/* Features Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '60px' }}>
        {features.map((f, idx) => (
          <div key={idx} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', transition: 'transform 0.3s', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <img src={f.img} alt={f.title} style={{ width: '80px', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '20px', color: '#27ae60', marginBottom: '10px' }}>{f.title}</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
