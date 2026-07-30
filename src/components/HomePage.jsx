import React, { useState, useEffect } from 'react';
import Header from './Header'; // Adjust the relative path if needed
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [popularDrinks, setPopularDrinks] = useState([]);
  const [inspirationArticles, setInspirationArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toggle states for "View All" functionality
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  const [showAllDrinks, setShowAllDrinks] = useState(false);
  const [showAllArticles, setShowAllArticles] = useState(false);

  // Fetch live data from backend endpoint on mount
  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://heal-up-backend-pi.vercel.app/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Handle array or object response structure and filter popular drinks where is_popular == 'yes'
        if (Array.isArray(data)) {
          setFeaturedProducts(data);
          const popular = data.filter(
            (item) => String(item.is_popular).trim().toLowerCase() === 'yes' || item.is_popular === true
          );
          setPopularDrinks(popular);
        } else {
          const prods = data.products || [];
          if (prods) setFeaturedProducts(prods);

          const drinksSource = data.drinks || prods;
          const popular = drinksSource.filter(
            (item) => String(item.is_popular).trim().toLowerCase() === 'yes' || item.is_popular === true
          );
          setPopularDrinks(popular);

          if (data.articles) setInspirationArticles(data.articles);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load live data. Please check your backend connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="healup-container">
      {/* Internal CSS Styles for Page Content */}
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .healup-container {
          background-color: #f8f9fa;
          color: #333;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Hero Section */
        .hero-section {
          max-width: 1280px;
          margin: 24px auto;
          padding: 0 16px;
        }

        .hero-banner {
          background: linear-gradient(90deg, #d8f3dc 0%, #b7e4c7 50%, #95d5b2 100%);
          border-radius: 24px;
          padding: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
          gap: 20px;
        }

        .hero-text {
          max-width: 550px;
          z-index: 2;
        }

        .live-tag {
          background-color: rgba(255, 255, 255, 0.85);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: bold;
          color: #1b4332;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 16px;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }

        .hero-text h2 {
          font-size: 42px;
          color: #1b4332;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .hero-text p {
          font-size: 14px;
          color: #374151;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .hero-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background-color: #1b4332;
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
        }

        .btn-primary:hover {
          background-color: #2d6a4f;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background-color: #ffffff;
          color: #1b4332;
          border: 1px solid #1b4332;
          padding: 12px 24px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-secondary:hover {
          background-color: #f0fdf4;
        }

        .hero-card {
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          padding: 20px;
          border-radius: 16px;
          width: 300px;
          z-index: 2;
          border: 1px solid #ffffff;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .hero-card h4 {
          font-size: 13px;
          color: #1b4332;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .journey-section {
          font-size: 12px;
        }

        .journey-group-title {
          color: #9ca3af;
          font-weight: bold;
          margin-bottom: 6px;
          margin-top: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 10px;
        }

        .journey-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #4b5563;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .journey-item.inactive {
          color: #9ca3af;
        }

        /* Features Bar */
        .features-grid {
          max-width: 1280px;
          margin: 20px auto;
          padding: 0 16px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .feature-box {
          background-color: #ffffff;
          border: 1px solid #f3f4f6;
          padding: 16px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .feature-icon {
          background-color: #f0fdf4;
          color: #1b4332;
          padding: 10px;
          border-radius: 12px;
          font-weight: bold;
          font-size: 16px;
        }

        .feature-box h5 {
          font-size: 12px;
          font-weight: bold;
          color: #1f2937;
        }

        .feature-box p {
          font-size: 11px;
          color: #6b7280;
        }

        /* Promo Dual Boxes */
        .promo-grid {
          max-width: 1280px;
          margin: 24px auto;
          padding: 0 16px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .promo-card {
          background-color: #f4f9f4;
          border: 1px solid #d8f3dc;
          border-radius: 24px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 220px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .promo-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(27, 67, 50, 0.06);
        }

        .promo-card h3 {
          font-size: 24px;
          color: #1b4332;
          font-weight: 800;
        }

        .promo-card .subtitle {
          font-size: 12px;
          color: #52b788;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .promo-card p {
          font-size: 12px;
          color: #4b5563;
          margin-bottom: 24px;
          max-width: 380px;
          line-height: 1.4;
        }

        /* Products & Sections Common */
        .section-container {
          max-width: 1280px;
          margin: 32px auto;
          padding: 0 16px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-header h3 {
          font-size: 18px;
          font-weight: bold;
          color: #1b4332;
        }

        .section-header button.view-all-btn {
          background: none;
          border: none;
          font-size: 12px;
          font-weight: 600;
          color: #52b788;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s;
        }

        .section-header button.view-all-btn:hover {
          color: #1b4332;
          text-decoration: underline;
        }

        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 24px;
          color: #6b7280;
          font-size: 13px;
          background: #ffffff;
          border-radius: 12px;
          border: 1px dashed #e5e7eb;
        }

        .error-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 24px;
          color: #dc2626;
          font-size: 13px;
          background: #fef2f2;
          border-radius: 12px;
          border: 1px dashed #fecaca;
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .product-card {
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .product-card:hover {
          border-color: #b7e4c7;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }

        .product-img {
          width: 100%;
          height: 110px;
          background-color: #f3f4f6;
          border-radius: 10px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 11px;
          font-weight: 500;
        }

        .product-card h5 {
          font-size: 12px;
          font-weight: bold;
          color: #1f2937;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-rating {
          font-size: 10px;
          color: #d97706;
          margin: 4px 0;
          font-weight: 500;
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
        }

        .product-price {
          font-size: 12px;
          font-weight: bold;
          color: #1b4332;
        }

        .add-btn {
          width: 28px;
          height: 28px;
          background-color: #1b4332;
          color: #ffffff;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .add-btn:hover {
          background-color: #52b788;
        }

        /* Drinks Grid */
        .drinks-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .drink-card {
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .drink-card:hover {
          border-color: #b7e4c7;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }

        .drink-img {
          width: 100%;
          height: 120px;
          background-color: #f0fdf4;
          border-radius: 10px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1b4332;
          font-size: 11px;
          font-weight: 500;
        }

        .drink-card h5 {
          font-size: 12px;
          font-weight: bold;
          color: #1f2937;
        }

        .drink-card p {
          font-size: 10px;
          color: #6b7280;
          margin-bottom: 10px;
        }

        .drink-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #f3f4f6;
          padding-top: 8px;
        }

        .order-btn {
          background-color: #1b4332;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .order-btn:hover {
          background-color: #52b788;
        }

        /* Inspiration Grid */
        .inspiration-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .inspiration-card {
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }

        .inspiration-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.05);
        }

        .inspiration-img {
          height: 120px;
          background-color: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          font-size: 11px;
          font-weight: 500;
        }

        .inspiration-body {
          padding: 16px;
        }

        .badge {
          background-color: #ecfdf5;
          color: #059669;
          font-size: 10px;
          font-weight: bold;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .inspiration-body h5 {
          font-size: 12px;
          font-weight: bold;
          color: #1f2937;
          margin-top: 8px;
          line-height: 1.3;
        }

        /* Newsletter */
        .newsletter-box {
          background-color: #1b4332;
          color: #ffffff;
          border-radius: 24px;
          padding: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .newsletter-input-group {
          display: flex;
          gap: 8px;
          width: 400px;
        }

        .newsletter-input-group input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 12px 16px;
          border-radius: 9999px;
          color: #ffffff;
          font-size: 12px;
          outline: none;
          flex: 1;
        }

        .newsletter-input-group input::placeholder {
          color: #d1d5db;
        }

        .newsletter-btn {
          background-color: #ffffff;
          color: #1b4332;
          border: none;
          padding: 12px 24px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .newsletter-btn:hover {
          background-color: #d8f3dc;
        }

        /* Footer */
        .footer-guarantees {
          background-color: #ffffff;
          border-top: 1px solid #e5e7eb;
          margin-top: 48px;
          padding: 24px 16px;
        }

        .guarantees-content {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          font-size: 12px;
          color: #4b5563;
          font-weight: 500;
          flex-wrap: wrap;
          gap: 16px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .drinks-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .inspiration-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-banner {
            flex-direction: column;
            padding: 24px;
          }
          .hero-card {
            width: 100%;
          }
          .promo-grid {
            grid-template-columns: 1fr;
          }
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .drinks-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .newsletter-box {
            flex-direction: column;
            align-items: flex-start;
          }
          .newsletter-input-group {
            width: 100%;
          }
        }
      `}</style>

      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-banner">
          <div className="hero-text">
            <div className="live-tag">
              <span className="live-dot"></span> LIVE NOW | HealMart & HealUp Café (Takeaway)
            </div>
            <h2>Healthy Living Starts Here</h2>
            <p>
              Shop nutritious foods at HealMart and enjoy freshly prepared juices, smoothies, and herbal tisanes from HealUp Café – all in one place.
            </p>
            <div className="hero-buttons">
              <Link to="/HealMart" style={{ textDecoration: 'none' }}>
                <button className="btn-primary">🌿 Shop HealMart</button>
              </Link>
              <button className="btn-secondary">Order a Healthy Drink</button>
            </div>
          </div>

          <div className="hero-card">
            <h4>The HealUp-Kira Journey</h4>
            <div className="journey-section">
              <div className="journey-group-title">Available Today</div>
              <div className="journey-item">✅ HealMart</div>
              <div className="journey-item">✅ HealUp Café (Takeaway)</div>
              
              <div className="journey-group-title">Growing Soon</div>
              <div className="journey-item inactive">⏱️ Nutrition Consultation</div>
              <div className="journey-item inactive">⏱️ Wellness & Natural Beauty</div>
              <div className="journey-item inactive">⏱️ Learning Hub</div>
              <div className="journey-item inactive">⏱️ Community Programs</div>
            </div>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon">🛡️</div>
            <div>
              <h5>Carefully Selected Products</h5>
              <p>Quality you can trust</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon">🌿</div>
            <div>
              <h5>Nutrition-Focused</h5>
              <p>Better for you & family</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon">🚚</div>
            <div>
              <h5>Fast Takeaway Service</h5>
              <p>Fresh & convenient</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon">❤️</div>
            <div>
              <h5>Community Lifestyle</h5>
              <p>Healthy living for all</p>
            </div>
          </div>
        </div>
      </section>

      {/* HealMart vs HealUp Café Banners */}
      <section className="section-container">
        <div className="promo-grid">
          <div className="promo-card">
            <div>
              <h3>HealMart</h3>
              <div className="subtitle">Nature's best for your health.</div>
              <p>Explore a wide range of healthy, natural and organic products carefully selected to nourish your body and support a better lifestyle.</p>
            </div>
            <div>
              <button className="btn-primary" style={{padding: '10px 20px', fontSize: '12px'}}>Explore Products</button>
            </div>
          </div>

          <div className="promo-card">
            <div>
              <h3>HealUp Café</h3>
              <div className="subtitle">Fresh. Healthy. Delicious.</div>
              <p>Enjoy freshly made juices, smoothies and herbal tisanes prepared daily with natural ingredients.</p>
            </div>
            <div>
              <button className="btn-primary" style={{padding: '10px 20px', fontSize: '12px'}}>View Menu</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Dynamic Endpoint Data */}
      <section className="section-container">
        <div className="section-header">
          <h3>Featured Products</h3>
          <button 
            className="view-all-btn" 
            onClick={() => setShowAllFeatured(!showAllFeatured)}
          >
            {showAllFeatured ? 'Show Less ↑' : 'View All →'}
          </button>
        </div>
        <div className="products-grid">
          {loading && <div className="empty-state">Loading products from https://heal-up-backend-pi.vercel.app/api/products...</div>}
          {error && <div className="error-state">{error}</div>}
          {!loading && !error && featuredProducts.length === 0 && (
            <div className="empty-state">No products found.</div>
          )}
          {!loading && !error && (showAllFeatured ? featuredProducts : featuredProducts.slice(0, 5)).map((item, index) => (
            <div key={item.id || index} className="product-card">
              <div>
                <div className="product-img">
                  {item.image ? <img src={item.image} alt={item.product_name || item.name} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'10px'}} /> : '[Image]'}
                </div>
                <h5>{item.product_name || item.name}</h5>
                <div className="product-rating">⭐ {item.rating || '4.5'}</div>
              </div>
              <div className="product-footer">
                <span className="product-price">Rfw {item.price}</span>
                <button className="add-btn">+</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Drinks (Filtered where is_popular == yes) */}
      <section className="section-container">
        <div className="section-header">
          <h3>Popular Drinks</h3>
          <button 
            className="view-all-btn" 
            onClick={() => setShowAllDrinks(!showAllDrinks)}
          >
            {showAllDrinks ? 'Show Less ↑' : 'View All →'}
          </button>
        </div>
        <div className="drinks-grid">
          {loading && <div className="empty-state">Loading drinks...</div>}
          {!loading && popularDrinks.length === 0 && (
            <div className="empty-state">No popular drinks found where is_popular is yes.</div>
          )}
          {(showAllDrinks ? popularDrinks : popularDrinks.slice(0, 5)).map((drink, index) => (
            <div key={drink.id || index} className="drink-card">
              <div>
                <div className="drink-img">
                  {drink.image ? <img src={drink.image} alt={drink.name || drink.product_name} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'10px'}} /> : '[Drink Image]'}
                </div>
                <h5>{drink.name || drink.product_name}</h5>
                <p>{drink.desc || drink.description || 'Freshly prepared healthy drink'}</p>
              </div>
              <div className="drink-footer">
                <span className="product-price">Rfw {drink.price}</span>
                <button className="order-btn">Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Healthy Living Inspiration */}
      <section className="section-container">
        <div className="section-header">
          <h3>Healthy Living Inspiration</h3>
          <button 
            className="view-all-btn" 
            onClick={() => setShowAllArticles(!showAllArticles)}
          >
            {showAllArticles ? 'Show Less ↑' : 'View All Articles →'}
          </button>
        </div>
        <div className="inspiration-grid">
          {loading && <div className="empty-state">Loading articles...</div>}
          {!loading && inspirationArticles.length === 0 && (
            <div className="empty-state">No articles fetched from endpoint.</div>
          )}
          {(showAllArticles ? inspirationArticles : inspirationArticles.slice(0, 4)).map((article, index) => (
            <div key={article.id || index} className="inspiration-card">
              <div className="inspiration-img">
                {article.image ? <img src={article.image} alt={article.title} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : '[Article Image]'}
              </div>
              <div className="inspiration-body">
                <span className="badge">{article.cat || article.category}</span>
                <h5>{article.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-container">
        <div className="newsletter-box">
          <div>
            <h3 style={{fontSize: '22px', marginBottom: '4px'}}>Join the HealUp Family</h3>
            <p style={{fontSize: '12px', color: '#d1d5db'}}>Be the first to know about new products, special offers, healthy tips and exclusive rewards.</p>
          </div>
          <div className="newsletter-input-group">
            <input type="email" placeholder="Enter your email address" />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer Guarantees */}
      <footer className="footer-guarantees">
        <div className="guarantees-content">
          <div>🔒 100% Secure Payments</div>
          <div>🚚 Fast & Reliable Delivery</div>
          <div>🌿 100% Natural Products</div>
          <div>❤️ Good for you & the planet</div>
          <div>💬 We are here for you</div>
        </div>
      </footer>
    </div>
  );
}