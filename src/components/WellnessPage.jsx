import React from "react";
import {
  Heart,
  Dumbbell,
  Leaf,
  Apple,
  HandHeart,
  CheckCircle,
  BookOpen,
  Zap,
  Globe,
} from "lucide-react";

export default function HealUpWellness() {
  const categories = [
    { icon: Heart, title: "Mindfulness & Yoga" },
    { icon: Dumbbell, title: "Fitness & Sports Recovery" },
    { icon: Leaf, title: "Natural Beauty (Skin & Hair)" },
    { icon: Apple, title: "Herbal Nutrition" },
    { icon: HandHeart, title: "Massage Therapy & Reflexology" },
  ];

  const products = [
    {
      name: "Herbal Soap",
      price: "$10",
      img: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Rose Hydrating Oil",
      price: "$15",
      img: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Lavender Body Scrub",
      price: "$18",
      img: "https://images.pexels.com/photos/3737584/pexels-photo-3737584.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Shea Butter",
      price: "$12",
      img: "https://images.pexels.com/photos/932577/pexels-photo-932577.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const reasons = [
    { icon: CheckCircle, text: "100% Natural Ingredients" },
    { icon: Heart, text: "Supports Relaxation & Healing" },
    { icon: BookOpen, text: "Boosts Body & Mind" },
    { icon: Zap, text: "Supports Natural Energy" },
    { icon: Globe, text: "Eco-friendly & Sustainable" },
  ];

  return (
    <div style={styles.container}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <h1 style={styles.heroTitle}>Nourish Your Body, Naturally</h1>
        <div style={styles.heroButtons}>
          <button style={styles.primaryBtn}>Shop Products</button>
          <button style={styles.secondaryBtn}>Explore Wellness</button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Product & Wellness Categories</h2>
        <div style={styles.categories}>
          {categories.map((cat, i) => (
            <div key={i} style={styles.categoryCard}>
              <cat.icon size={36} color="#2f3e2f" />
              <p style={styles.categoryText}>{cat.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Product Grid</h2>
        <div style={styles.products}>
          {products.map((prod, i) => (
            <div key={i} style={styles.productCard}>
              <img src={prod.img} alt={prod.name} style={styles.productImg} />
              <h3 style={styles.productName}>{prod.name}</h3>
              <p style={styles.productPrice}>{prod.price}</p>
              <button style={styles.addToCartBtn}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Choose Heal Up Wellness</h2>
        <div style={styles.reasons}>
          {reasons.map((r, i) => (
            <div key={i} style={styles.reasonItem}>
              <r.icon size={28} color="#2f3e2f" />
              <p style={styles.reasonText}>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.footerSection}>
        <h2 style={styles.footerTitle}>
          Embrace Full Natural Wellness with Heal Up
        </h2>
        <div style={styles.footerButtons}>
          <button style={styles.primaryBtn}>Get Started</button>
          <button style={styles.secondaryBtn}>Learn More</button>
        </div>
      </section>
    </div>
  );
}

// INTERNAL CSS
const styles = {
  container: {
    fontFamily: "Georgia, serif",
    backgroundColor: "#f5f1e6",
    color: "#2f3e2f",
    textAlign: "center",
    lineHeight: 1.5,
  },
  hero: {
    position: "relative",
    backgroundImage:
      "url('https://images.pexels.com/photos/4041393/pexels-photo-4041393.jpeg?auto=compress&cs=tinysrgb&w=1200')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "420px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 20px",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(245,241,230,0.7)",
  },
  heroTitle: {
    fontSize: "2.8rem",
    fontWeight: "bold",
    zIndex: 1,
    marginBottom: "25px",
  },
  heroButtons: {
    zIndex: 1,
    display: "flex",
    gap: "15px",
  },
  primaryBtn: {
    backgroundColor: "#4b6043",
    color: "#fff",
    border: "none",
    padding: "12px 28px",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  secondaryBtn: {
    backgroundColor: "#fff",
    border: "2px solid #4b6043",
    color: "#4b6043",
    padding: "12px 28px",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  section: {
    padding: "60px 20px",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  categories: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  categoryCard: {
    backgroundColor: "#fff",
    width: "180px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "25px 10px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  categoryText: {
    marginTop: "12px",
    fontWeight: "bold",
  },
  products: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "25px",
  },
  productCard: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    width: "220px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  productImg: {
    width: "100%",
    height: "150px",
    borderRadius: "8px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  productName: {
    fontWeight: "bold",
  },
  productPrice: {
    color: "#4b6043",
    marginBottom: "10px",
  },
  addToCartBtn: {
    backgroundColor: "#4b6043",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  reasons: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "30px",
  },
  reasonItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    maxWidth: "250px",
    textAlign: "left",
  },
  reasonText: {
    fontSize: "14px",
  },
  footerSection: {
    backgroundColor: "#4b6043",
    color: "#fff",
    padding: "70px 20px",
  },
  footerTitle: {
    fontSize: "1.9rem",
    fontWeight: "bold",
    marginBottom: "25px",
  },
  footerButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
};
