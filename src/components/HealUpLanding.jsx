import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function HealUpLanding() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Fetch all meal images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/meals");
        const imageUrls = res.data
          .filter(meal => meal.photo)
          .map(meal => `http://localhost:5000/uploads/${meal.photo}`);
        setImages(imageUrls);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
    fetchImages();
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh", padding: "24px" }}>
      <style>{`
        .container { max-width: 1100px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .logo-box { display: flex; align-items: center; gap: 12px; }
        .logo { width: 56px; height: 56px; background: linear-gradient(135deg, #059669, #10b981); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.4rem; }
        .nav button { margin-left: 8px; padding: 12px 24px; border-radius: 9999px; font-size: 14px; border: none; cursor: pointer; transition: all 0.3s ease; }
        .btn-order { background: linear-gradient(135deg, #059669, #10b981); color: white; font-weight: 600; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .btn-order:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(0,0,0,0.15); }
        .btn-light { background: white; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
        .btn-light:hover { background: #f3f4f6; }

        .main { display: flex; flex-direction: column; gap: 32px; align-items: center; }

        /* Larger card styles */
        .card { 
            background: white; 
            padding: 48px; 
            padding-bottom: 60px; 
            border-radius: 16px; 
            box-shadow: 0 8px 24px rgba(0,0,0,0.1); 
            width: 100%; 
            max-width: 900px; 
            text-align: left; 
            position: relative; 
        }
        .card h1 { font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 12px; }
        .card p { font-size: 1.2rem; color: #4b5563; line-height: 1.8; margin-bottom: 32px; }

        .card-actions {
            display: flex;
            gap: 16px;
            margin-bottom: 40px;
        }
        .btn-main-order {
            padding: 14px 26px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            background-color: #059669;
            color: white;
            box-shadow: 0 4px 8px rgba(5, 150, 105, 0.4);
        }
        .btn-main-plans {
            padding: 14px 26px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            background-color: white;
            color: #059669;
            border: 1px solid #d1d5db;
        }

        /* Feature Boxes Grid */
        .features-grid {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            width: 100%;
        }
        .feature-item {
            flex: 1;
            padding: 20px;
            border-radius: 10px;
            background: #ffffff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
            text-align: left;
            position: relative;
        }
        .feature-item strong {
            font-size: 1rem;
        }
        .feature-item span {
            font-size: 0.9rem;
        }
        .feature-icon {
            position: absolute;
            top: 18px;
            left: 12px;
            font-size: 20px;
            line-height: 1;
        }
        .icon-green { color: #10b981; }
        .icon-orange { color: #f97316; }
        .icon-star { color: #10b981; }

        .image-card { position: relative; width: 100%; max-width: 900px; height: 500px; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
        .image-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; }
        .image-card img:hover { transform: scale(1.05); }
        .dots { display: flex; justify-content: center; margin-top: 12px; gap: 8px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; background: #d1d5db; cursor: pointer; transition: all 0.3s ease; }
        .dot.active { background: #059669; transform: scale(1.2); }
      `}</style>



      {/* Main Section */}
      <main className="container main">
        {/* Text Card */}
        <section className="card">
          <h1>Eat & Heal — Nutritionist-Guided Meals</h1>
          <p>Delicious, balanced meals designed by nutritionists to help you prevent and manage lifestyle diseases.</p>

          {/* Action Buttons */}
          <div className="card-actions">
            <button
              className="btn-main-order"
              onClick={() => navigate("/HomeMenu/manager")}
            >
              Menu
            </button>
            <button className="btn-main-plans">See Meal Plans</button>
          </div>

          {/* Feature Boxes */}
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon icon-green">&#x2756;</span>
              <div><strong>Fresh Local Ingredients</strong><span>Sourced from Rwandan farmers</span></div>
            </div>
            <div className="feature-item">
              <span className="feature-icon icon-orange">&#x25CF;</span>
              <div><strong>Nutritionist Approved</strong><span>Meals built around you</span></div>
            </div>
            <div className="feature-item">
              <span className="feature-icon icon-star">&#9733;</span>
              <div><strong>Balanced Nutrition</strong><span>Macro and micronutrient focused</span></div>
            </div>
          </div>
        </section>

        {/* Image Slider */}
        <figure className="image-card">
          {images.length > 0 ? (
            <img src={images[current]} alt={`healthy meal ${current + 1}`} />
          ) : (
            <p style={{ textAlign: "center", paddingTop: "200px" }}>Loading images...</p>
          )}
          <div className="dots">
            {images.map((_, idx) => (
              <span key={idx} className={`dot ${current === idx ? "active" : ""}`} onClick={() => setCurrent(idx)}></span>
            ))}
          </div>
        </figure>
      </main>
    </div>
  );
}
