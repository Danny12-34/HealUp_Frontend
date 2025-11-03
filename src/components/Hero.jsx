import React, { useState, useEffect } from 'react';

// ⚠️ Note: Local imports are commented out. Use this area to import your
// high-resolution image files once you have replaced the low-quality files.
// import Slide1 from '../components/Images/Slide1.jpeg';
// import DeliveryImage from '../components/Images/Delivery.jpeg';
// import Organizer from '../components/Images/Organize.jpeg';
// import Heal from '../components/Images/Heal.jpeg';
// import Org from '../components/Images/Org.jpeg';

const Hero = () => {
  // --- Component Data: Slides using high-quality Unsplash/Pexels URLs ---
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop",
      heading: "Heal Your Body, One Meal at a Time",
      desc: "Discover fresh, nutritious meals delivered right to your door."
    },
    {
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop",
      heading: "Organic & Healthy Products",
      desc: "Choose from a wide variety of natural, organic ingredients."
    },
    {
      img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop",
      heading: "Eat Well, Thrive Well",
      desc: "Fuel your body with ingredients chosen for health and taste."
    },


    {
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop",
      heading: "Fresh Ingredients, Better Living",
      desc: "Fuel your day with high-quality, nutrient-rich foods."
    },
    {
      img: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?q=80&w=1600&auto=format&fit=crop",
      heading: "Healthy Plates, Happy Hearts",
      desc: "Balance your meals with colorful fruits and vegetables."
    },
    {
      img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1600&auto=format&fit=crop",
      heading: "Nature’s Best at Your Table",
      desc: "Enjoy the freshness of farm-picked ingredients."
    },
    {
      img: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1600&auto=format&fit=crop",
      heading: "Eat Clean, Live Strong",
      desc: "Support your body with pure and clean nutrition."
    },
    {
      img: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=1600&auto=format&fit=crop",
      heading: "A Healthier You Starts Here",
      desc: "Choose food that gives you energy and joy every day."
    }


    // {
    //   img: "https://cdn.pixabay.com/photo/2017/06/07/04/00/business-2378949_1280.jpg", 
    //   heading: "Personalized Nutrition Plans",
    //   desc: "Tailored meal plans to fit your lifestyle and wellness goals."
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1582213782179-e0d53f0017a9?q=80&w=1600&auto=format&fit=crop", 
    //   heading: "Fast & Reliable Delivery",
    //   desc: "Get your healthy meals delivered fresh and on time."
    // },
    // {
    //   img: "https://cdn.pixabay.com/photo/2017/05/23/22/33/healthy-food-2338042_1280.jpg",
    //   heading: "Eat Well, Live Better",
    //   desc: "Transform your eating habits and enjoy a healthier lifestyle."
    // },
  ];

  // --- Component Data: Feature Cards ---
  const features = [
    { title: "Fresh & Organic", desc: "All products are 100% natural and organic.", img: "https://img.icons8.com/color/96/000000/leaf.png" },
    { title: "Custom Meal Plans", desc: "Personalized nutrition plans for everyone.", img: "https://img.icons8.com/color/96/000000/meal.png" },
    { title: "Fast Delivery", desc: "Receive your orders quickly and safely.", img: "https://img.icons8.com/color/96/000000/delivery.png" },
    // A fourth feature is available if you uncomment this line:
    // { title: "Healthy Recipes", desc: "Learn to cook nutritious meals easily.", img: "https://img.icons8.com/color/96/000000/cooking-book.png" },
  ];

  // --- State and Effects (Slider Logic) ---
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Auto-advance the slider every 5 seconds
    const timer = setInterval(() => nextSlide(), 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // --- Inline Styles for Attractive Design ---
  const styles = {
    section: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#fff',
      borderRadius: '25px',
      padding: '40px',
      margin: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    },
    sliderContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      minHeight: '400px',
      gap: '30px',
    },
    textSide: {
      flex: '1 1 40%',
      zIndex: 2,
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '15px',
    },
    heading: {
      fontSize: '38px',
      fontWeight: '800',
      marginBottom: '15px',
      lineHeight: '1.2',
      color: '#27ae60', // Vibrant green
    },
    desc: {
      fontSize: '18px',
      marginBottom: '30px',
      color: '#555',
    },
    buttonPrimary: {
      padding: '12px 28px',
      marginRight: '15px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#2ecc71',
      color: '#fff',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      boxShadow: '0 4px 10px rgba(46, 204, 113, 0.4)',
    },
    buttonSecondary: {
      padding: '12px 28px',
      borderRadius: '8px',
      border: '2px solid #ddd',
      backgroundColor: '#fff',
      color: '#333',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'border-color 0.3s, background-color 0.3s',
    },
    imageSide: {
      flex: '1 1 50%',
      textAlign: 'center',
      position: 'relative',
      minWidth: '350px',
    },
    image: {
      width: '100%',
      maxHeight: '450px',
      borderRadius: '20px',
      objectFit: 'cover',
      boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
      transition: 'opacity 1s ease-in-out',
    },
    arrow: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '36px',
      color: '#27ae60',
      background: '#ffffff',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      zIndex: 10,
    },
    dotsContainer: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '12px',
      zIndex: 5,
    },
    dot: (isActive) => ({
      width: '14px',
      height: '14px',
      borderRadius: '50%',
      backgroundColor: isActive ? '#2ecc71' : '#ccc',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.3s',
      transform: isActive ? 'scale(1.1)' : 'scale(1)',
    }),
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '30px',
      marginTop: '60px',
      paddingTop: '30px',
      borderTop: '1px solid #eee',
    },
    featureCard: {
      backgroundColor: '#f7fcf9',
      padding: '30px 20px',
      borderRadius: '15px',
      textAlign: 'center',
      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
      border: '1px solid #e0f2e0',
    },
    featureIcon: {
      width: '60px',
      marginBottom: '15px',
    },
    featureTitle: {
      fontSize: '18px',
      color: '#27ae60',
      marginBottom: '8px',
      fontWeight: '700',
    },
    featureDesc: {
      fontSize: '14px',
      color: '#777',
    }
  };


  // --- Render Method ---
  return (
    <section style={styles.section}>

      {/* Hero Slider Content */}
      <div style={styles.sliderContainer}>
        <div style={styles.textSide}>
          <h1 style={styles.heading}>
            {slides[current].heading}
          </h1>
          <p style={styles.desc}>{slides[current].desc}</p>
          <div>
            <button
              style={styles.buttonPrimary}
            // Add actual routing/functionality here
            >
              Shop Now
            </button>
            <button
              style={styles.buttonSecondary}
            // Add actual routing/functionality here
            >
              Learn More
            </button>
          </div>
        </div>

        <div style={styles.imageSide}>
          <img
            key={current}
            src={slides[current].img}
            alt="Hero Slide"
            style={styles.image}
          />
        </div>
      </div>

      {/* Arrows (Positioned relative to the main section) */}
      <div
        onClick={prevSlide}
        style={{ ...styles.arrow, left: '20px' }}
      >
        &#10094;
      </div>
      <div
        onClick={nextSlide}
        style={{ ...styles.arrow, right: '20px' }}
      >
        &#10095;
      </div>

      {/* Dots (Positioned absolute to the main section) */}
      <div style={styles.dotsContainer}>
        {slides.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx)}
            style={styles.dot(current === idx)}
          />
        ))}
      </div>

      {/* --- Features Section --- */}
      <div style={styles.featuresGrid}>
        {features.map((f, idx) => (
          <div
            key={idx}
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-7px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
            }}
          >
            <img src={f.img} alt={f.title} style={styles.featureIcon} />
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;