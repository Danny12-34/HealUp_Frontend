import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HealUpLanding() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://healupbackend-production.up.railway.app/api/meals");
        const imageUrls = res.data
          .filter(meal => meal.photo)
          .map(meal => `http://healupbackend-production.up.railway.app/uploads/${meal.photo}`);
        setImages(imageUrls);
        setRelated(res.data.slice(0, 6)); // show 6 related items
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#f5f7fa", minHeight: "100vh", padding: "24px" }}>
      <style>{`
        .container { 
          max-width: 1100px; 
          margin: 0 auto; 
          display: flex; 
          gap: 24px; 
          flex-wrap: wrap; 
        }

        /* Fixed left column */
        .left-column { 
          flex: 1; 
          min-width: 280px; 
          display: flex; 
          flex-direction: column; 
          gap: 24px; 
          position: sticky;
          top: 20px;
          height: fit-content;
          align-self: flex-start;
        }

        .right-column { 
          flex: 2; 
          min-width: 300px; 
          display: flex; 
          flex-direction: column; 
          gap: 24px; 
        }

        .card { 
          background: linear-gradient(135deg, #ffffff, #f9fafb); 
          padding: 24px; 
          border-radius: 20px; 
          box-shadow: 0 15px 35px rgba(0,0,0,0.08); 
        }
        .card h1 { font-size: 1.7rem; font-weight: 700; margin-bottom: 12px; color: #059669; }
        .card p { font-size: 1rem; color: #4b5563; line-height: 1.6; margin-bottom: 24px; }

        .card-actions { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
        .btn-main-order { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .btn-main-order:hover { transform: translateY(-2px); opacity: 0.9; }
        .btn-main-plans { padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; border: 1px solid #10b981; color: #10b981; background: white; transition: all 0.3s; }
        .btn-main-plans:hover { background: #ecfdf5; }

        .features-grid { display: flex; flex-direction: column; gap: 12px; }
        .feature-item { padding: 12px; border-radius: 16px; background: white; box-shadow: 0 6px 20px rgba(0,0,0,0.05); display: flex; align-items: center; gap: 12px; transition: all 0.3s; cursor: default; }
        .feature-item:hover { transform: translateX(5px); }
        .feature-item strong { font-size: 0.95rem; color: #059669; }
        .feature-item span { font-size: 0.85rem; color: #6b7280; }

        .image-card { width: 100%; border-radius: 20px; overflow: hidden; height: 350px; box-shadow: 0 12px 30px rgba(0,0,0,0.12); position: relative; }
        .image-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; border-radius: 20px; }
        .image-card img:hover { transform: scale(1.05); }
        .dots { display: flex; justify-content: center; margin-top: 12px; gap: 8px; position: absolute; bottom: 12px; width: 100%; }
        .dot { width: 12px; height: 12px; border-radius: 50%; background: #d1d5db; cursor: pointer; transition: all 0.3s ease; }
        .dot.active { background: #059669; transform: scale(1.3); }

        /* Related Content Styles */
        .related-section { margin-top: 40px; }
        .related-header { font-size: 1.5rem; font-weight: 700; margin-bottom: 16px; color: #1f2937; }
        .related-grid { display: flex; gap: 16px; flex-wrap: wrap; }
        .related-card { flex: 1 1 calc(33.33% - 16px); background: linear-gradient(145deg, #ffffff, #f0fdf4); border-radius: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); overflow: hidden; cursor: pointer; transition: all 0.4s; }
        .related-card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(0,0,0,0.15); }
        .related-card img { width: 100%; height: 160px; object-fit: cover; }
        .related-card-content { padding: 12px; }
        .related-card-content h3 { font-size: 1rem; font-weight: 600; margin-bottom: 4px; color: #059669; }
        .related-card-content p { font-size: 0.85rem; color: #4b5563; }
      `}</style>

      <main className="container">
        {/* Left Column */}
        <div className="left-column">
          <section className="card">
            <h1>Eat & Heal</h1>
            <p>Nutritionist-guided meals designed to help prevent and manage lifestyle diseases.</p>

            <div className="card-actions">
              <button className="btn-main-order" onClick={() => navigate("/HomeMenu/manager")}>Menu</button>
              <button className="btn-main-plans">Meal Plans</button>
            </div>

            <div className="features-grid">
              <div className="feature-item">
                <span>&#x1F33F;</span>
                <div>
                  <strong>Fresh Ingredients</strong>
                  <span>Locally sourced</span>
                </div>
              </div>
              <div className="feature-item">
                <span>&#x1F9C0;</span>
                <div>
                  <strong>Nutritionist Approved</strong>
                  <span>Tailored for you</span>
                </div>
              </div>
              <div className="feature-item">
                <span>&#x2728;</span>
                <div>
                  <strong>Balanced Nutrition</strong>
                  <span>Macro & micronutrients</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Image Slider */}
        <div className="right-column">
          <figure className="image-card">
            {images.length > 0 ? (
              <img src={images[current]} alt={`healthy meal ${current + 1}`} />
            ) : (
              <p style={{ textAlign: "center", paddingTop: "140px" }}>Loading images...</p>
            )}
            <div className="dots">
              {images.map((_, idx) => (
                <span key={idx} className={`dot ${current === idx ? "active" : ""}`} onClick={() => setCurrent(idx)}></span>
              ))}
            </div>
          </figure>
        </div>
      </main>

      {/* Related Content Section */}
      <section className="related-section container">
        <h2 className="related-header">Related Meals & Tips</h2>
        <div className="related-grid">
          {related.map((item, idx) => (
            <div key={idx} className="related-card" onClick={() => navigate(`/meal/${item.id}`)}>
              <img src={`http://healupbackend-production.up.railway.app/uploads/${item.photo}`} alt={item.name} />
              <div className="related-card-content">
                <h3>{item.name}</h3>
                <p>{item.description?.substring(0, 60)}...</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
