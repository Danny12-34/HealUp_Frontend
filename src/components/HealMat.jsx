import React, { useState } from 'react';
import Header from './Header';

export default function HealMate() {
  const [cartCount, setCartCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Nuts & Seeds');
  const [sortBy, setSortBy] = useState('Popular');
  const [priceRange, setPriceRange] = useState(25000);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Sample Product Dataset matching the design layout
  const products = [
    {
      id: 1,
      name: 'Pure Natural Honey (500g)',
      category: 'Nuts & Seeds',
      priceRaw: 6000,
      price: 'FRw 6,000',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=500&q=80',
      badge: 'Best Seller',
      badgeColor: '#38a169',
      diet: ['Organic', 'Sugar-Free'],
      goal: ['Immunity Boost'],
      brand: 'HealUp Organic',
      date: '2026-01-10'
    },
    {
      id: 2,
      name: 'Brown Rice (1kg)',
      category: 'Grains & Flours',
      priceRaw: 2500,
      price: 'FRw 2,500',
      rating: 4.7,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
      badge: null,
      diet: ['Gluten-Free', 'Vegan'],
      goal: ['Weight Loss', 'Heart Health'],
      brand: 'Natural Vibe',
      date: '2026-02-01'
    },
    {
      id: 3,
      name: 'Whole Wheat Flour (Ingano) 1kg',
      category: 'Grains & Flours',
      priceRaw: 2000,
      price: 'FRw 2,000',
      rating: 4.6,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
      badge: null,
      diet: ['Vegan'],
      goal: ['Heart Health'],
      brand: 'Ingano',
      date: '2025-12-15'
    },
    {
      id: 4,
      name: 'Flaxseed (250g)',
      category: 'Nuts & Seeds',
      priceRaw: 1800,
      price: 'FRw 1,800',
      rating: 4.7,
      reviews: 64,
      image: 'https://images.unsplash.com/photo-1515942661991-f96602e11802?auto=format&fit=crop&w=500&q=80',
      badge: null,
      diet: ['Organic', 'Vegan', 'Gluten-Free'],
      goal: ['High Protein', 'Heart Health'],
      brand: 'HealUp Organic',
      date: '2026-02-10'
    },
    {
      id: 5,
      name: 'Chia Seeds (250g)',
      category: 'Nuts & Seeds',
      priceRaw: 2500,
      price: 'FRw 2,500',
      rating: 4.8,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=500&q=80',
      badge: 'Organic',
      badgeColor: '#3182ce',
      diet: ['Organic', 'Vegan', 'Gluten-Free', 'Sugar-Free'],
      goal: ['Weight Loss', 'High Protein', 'Heart Health'],
      brand: 'HealUp Organic',
      date: '2026-02-18'
    },
    {
      id: 6,
      name: 'Moringa Herbal Tea (20 Tea Bags)',
      category: 'Herbs & Teas',
      priceRaw: 2500,
      price: 'FRw 2,500',
      rating: 4.6,
      reviews: 55,
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80',
      badge: 'New',
      badgeColor: '#d69e2e',
      diet: ['Organic', 'Sugar-Free', 'Vegan'],
      goal: ['Immunity Boost', 'Weight Loss'],
      brand: 'Natural Vibe',
      date: '2026-03-01'
    },
    {
      id: 7,
      name: 'Fresh Tofu (500g)',
      category: 'Plant-Based',
      priceRaw: 2500,
      price: 'FRw 2,500',
      rating: 4.7,
      reviews: 88,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
      badge: null,
      diet: ['Vegan', 'Gluten-Free'],
      goal: ['High Protein'],
      brand: 'Natural Vibe',
      date: '2026-01-20'
    },
    {
      id: 8,
      name: 'Soya Milk (1L)',
      category: 'Plant-Based',
      priceRaw: 2500,
      price: 'FRw 2,500',
      rating: 4.6,
      reviews: 70,
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80',
      badge: null,
      diet: ['Vegan', 'Sugar-Free'],
      goal: ['High Protein', 'Heart Health'],
      brand: 'Natural Vibe',
      date: '2026-01-25'
    },
    {
      id: 9,
      name: 'Extra Virgin Olive Oil (500ml)',
      category: 'Oils & Fats',
      priceRaw: 7500,
      price: 'FRw 7,500',
      rating: 4.8,
      reviews: 93,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80',
      badge: 'Cold Pressed',
      badgeColor: '#276749',
      diet: ['Organic', 'Gluten-Free', 'Sugar-Free'],
      goal: ['Heart Health'],
      brand: 'HealUp Organic',
      date: '2026-02-05'
    },
    {
      id: 10,
      name: 'Mixed Nuts (250g)',
      category: 'Healthy Snacks',
      priceRaw: 4000,
      price: 'FRw 4,000',
      rating: 4.8,
      reviews: 105,
      image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=500&q=80',
      badge: null,
      diet: ['Gluten-Free', 'Sugar-Free'],
      goal: ['High Protein', 'Heart Health'],
      brand: 'HealUp Organic',
      date: '2026-02-12'
    },
    {
      id: 11,
      name: 'Almonds (250g)',
      category: 'Nuts & Seeds',
      priceRaw: 4000,
      price: 'FRw 4,000',
      rating: 4.7,
      reviews: 90,
      image: 'https://images.unsplash.com/photo-1508061253366-f7da15bbf6d4?auto=format&fit=crop&w=500&q=80',
      badge: null,
      diet: ['Vegan', 'Gluten-Free', 'Sugar-Free'],
      goal: ['High Protein', 'Heart Health'],
      brand: 'HealUp Organic',
      date: '2026-02-14'
    },
    {
      id: 12,
      name: 'Dried Fruits Mix (250g)',
      category: 'Healthy Snacks',
      priceRaw: 3500,
      price: 'FRw 3,500',
      rating: 4.7,
      reviews: 83,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
      badge: 'Natural',
      badgeColor: '#38a169',
      diet: ['Vegan', 'Gluten-Free'],
      goal: ['Weight Loss'],
      brand: 'Natural Vibe',
      date: '2026-02-20'
    }
  ];

  const categoriesList = [
    { name: 'Nuts & Seeds', count: 28 },
    { name: 'Grains & Flours', count: 18 },
    { name: 'Healthy Carbs', count: 9 },
    { name: 'Herbs & Teas', count: 22 },
    { name: 'Natural Sweeteners', count: 6 },
    { name: 'Plant-Based', count: 12 },
    { name: 'Oils & Fats', count: 14 },
    { name: 'Supplements', count: 20 },
    { name: 'Healthy Snacks', count: 15 },
    { name: 'Bundles & Offers', count: 8 },
  ];

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const handleCheckboxChange = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Filtering Logic
  const filteredProducts = products.filter(item => {
    // Category filter (if we want category selection to filter, let's match category or show all if general)
    if (selectedCategory && item.category !== selectedCategory) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesCategory = item.category.toLowerCase().includes(query);
      if (!matchesName && !matchesCategory) return false;
    }
    // Price range filter
    if (item.priceRaw > Number(priceRange)) {
      return false;
    }
    // Dietary Preference filter
    if (selectedDiet.length > 0) {
      const hasAllDiets = selectedDiet.every(diet => item.diet.includes(diet));
      if (!hasAllDiets) return false;
    }
    // Health Goal filter
    if (selectedGoal.length > 0) {
      const hasAllGoals = selectedGoal.every(goal => item.goal.includes(goal));
      if (!hasAllGoals) return false;
    }
    // Brand filter
    if (selectedBrand !== 'All Brands' && item.brand !== selectedBrand) {
      return false;
    }
    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Popular') {
      return b.reviews - a.reviews;
    } else if (sortBy === 'PriceLow') {
      return a.priceRaw - b.priceRaw;
    } else if (sortBy === 'PriceHigh') {
      return b.priceRaw - a.priceRaw;
    } else if (sortBy === 'Newest') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  const styles = {
    pageContainer: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      color: '#2d3748',
      margin: 0,
      padding: 0,
    },
    topBar: {
      backgroundColor: '#1b4332',
      color: '#ffffff',
      fontSize: '13px',
      padding: '8px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    topBarLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    topBarCenter: {
      fontWeight: '500',
    },
    topBarRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    socialIcons: {
      display: 'flex',
      gap: '12px',
      cursor: 'pointer',
    },
    navBar: {
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    },
    brandContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    logoBadge: {
      backgroundColor: '#2d6a4f',
      color: '#fff',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    brandTextContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    brandName: {
      fontSize: '20px',
      fontWeight: '800',
      color: '#1b4332',
      lineHeight: '1.1',
    },
    brandTagline: {
      fontSize: '11px',
      color: '#718096',
    },
    navLinks: {
      display: 'flex',
      gap: '24px',
      fontWeight: '600',
      fontSize: '14px',
    },
    navLinkItem: (isActive) => ({
      color: isActive ? '#2d6a4f' : '#4a5568',
      textDecoration: 'none',
      cursor: 'pointer',
      paddingBottom: '4px',
      borderBottom: isActive ? '2px solid #2d6a4f' : '2px solid transparent',
    }),
    navRightActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    searchBoxWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    searchInput: {
      padding: '8px 14px 8px 14px',
      paddingRight: '36px',
      borderRadius: '20px',
      border: '1px solid #cbd5e0',
      fontSize: '13px',
      outline: 'none',
      width: '220px',
      backgroundColor: '#f7fafc',
    },
    searchIcon: {
      position: 'absolute',
      right: '12px',
      color: '#718096',
      cursor: 'pointer',
    },
    userAction: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      color: '#2d3748',
      textDecoration: 'none',
    },
    cartBadgeContainer: {
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontWeight: '600',
    },
    cartCounterBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-10px',
      backgroundColor: '#38a169',
      color: '#fff',
      borderRadius: '50%',
      padding: '2px 6px',
      fontSize: '10px',
      fontWeight: 'bold',
    },
    mainContentLayout: {
      maxWidth: '1280px',
      margin: '20px auto',
      padding: '0 20px',
    },
    breadcrumb: {
      fontSize: '12px',
      color: '#718096',
      marginBottom: '16px',
    },
    heroBanner: {
      background: 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)',
      borderRadius: '12px',
      padding: '30px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      backgroundImage: 'url("https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
    },
    heroLeftText: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '450px',
    },
    heroTitle: {
      fontSize: '32px',
      fontWeight: '800',
      color: '#1b4332',
      margin: '0 0 8px 0',
    },
    heroSubtitle: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#2d3748',
      margin: '0 0 12px 0',
    },
    heroDesc: {
      fontSize: '13px',
      color: '#4a5568',
      lineHeight: '1.5',
      margin: 0,
    },
    heroRightPromo: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'right',
    },
    promoHeading: {
      fontSize: '28px',
      fontWeight: '800',
      color: '#1b4332',
      lineHeight: '1.2',
      margin: 0,
    },
    promoSubheading: {
      fontSize: '28px',
      fontWeight: '800',
      color: '#38a169',
      lineHeight: '1.2',
      margin: '0 0 8px 0',
    },
    shopHealthyText: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#4a5568',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      justifyContent: 'flex-end',
    },
    catalogGridSection: {
      display: 'flex',
      gap: '30px',
    },
    sidebar: {
      width: '260px',
      flexShrink: 0,
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      height: 'fit-content',
    },
    sidebarSectionTitle: {
      fontSize: '15px',
      fontWeight: '700',
      color: '#1a202c',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '14px',
    },
    categoryListContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      borderBottom: '1px solid #edf2f7',
      paddingBottom: '16px',
      marginBottom: '16px',
    },
    categoryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '13px',
      color: '#4a5568',
      cursor: 'pointer',
      padding: '4px 0',
    },
    filterHeaderRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    clearAllText: {
      fontSize: '12px',
      color: '#3182ce',
      cursor: 'pointer',
      fontWeight: '600',
    },
    filterGroup: {
      marginBottom: '16px',
      borderBottom: '1px solid #edf2f7',
      paddingBottom: '14px',
    },
    filterLabelTitle: {
      fontSize: '13px',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '8px',
    },
    priceSliderContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    rangeInput: {
      width: '100%',
      accentColor: '#38a169',
      cursor: 'pointer',
    },
    priceRangeLabels: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '11px',
      color: '#718096',
      fontWeight: '600',
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '13px',
      color: '#4a5568',
      marginBottom: '6px',
      cursor: 'pointer',
    },
    selectDropdown: {
      width: '100%',
      padding: '8px',
      borderRadius: '6px',
      border: '1px solid #cbd5e0',
      fontSize: '13px',
      backgroundColor: '#fff',
      outline: 'none',
    },
    productArea: {
      flex: 1,
    },
    productAreaHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      fontSize: '13px',
      color: '#718096',
    },
    sortFilterRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    sortSelect: {
      padding: '6px 12px',
      borderRadius: '6px',
      border: '1px solid #cbd5e0',
      fontSize: '13px',
      backgroundColor: '#fff',
      outline: 'none',
    },
    productsGrid: {
      display: viewMode === 'grid' ? 'grid' : 'flex',
      flexDirection: viewMode === 'grid' ? 'unset' : 'column',
      gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(210px, 1fr))' : 'unset',
      gap: '20px',
    },
    productCard: {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: viewMode === 'grid' ? 'column' : 'row',
      justifyContent: 'space-between',
      boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    productImageContainer: {
      width: viewMode === 'grid' ? '100%' : '180px',
      height: viewMode === 'grid' ? '160px' : '100%',
      backgroundColor: '#f7fafc',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
    },
    productImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    productBadge: (bgColor) => ({
      position: 'absolute',
      top: '8px',
      left: '8px',
      backgroundColor: bgColor || '#38a169',
      color: '#fff',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: '700',
    }),
    productBody: {
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    productTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '6px',
      lineHeight: '1.3',
    },
    ratingRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      marginBottom: '8px',
    },
    starIcon: {
      color: '#d69e2e',
    },
    reviewCount: {
      color: '#a0aec0',
      fontSize: '11px',
    },
    priceText: {
      fontSize: '14px',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '10px',
    },
    cardFooterActions: {
      display: 'flex',
      alignItems: 'center',
      gap: viewMode === 'grid' ? '0' : '8px',
      justifyContent: viewMode === 'grid' ? 'space-between' : 'flex-start',
      padding: '0 12px 12px 12px',
    },
    addToCartBtn: {
      backgroundColor: '#276749',
      color: '#fff',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    iconActionBtn: {
      background: 'none',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#718096',
    },
    footerFeaturesBar: {
      backgroundColor: '#f1f5f3',
      borderTop: '1px solid #e2e8f0',
      marginTop: '50px',
      padding: '24px 20px',
    },
    featuresContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    },
    featureIconBox: {
      fontSize: '28px',
    },
    featureTitle: {
      fontSize: '13px',
      fontWeight: '700',
      color: '#1a202c',
      margin: '0 0 2px 0',
    },
    featureDesc: {
      fontSize: '11px',
      color: '#718096',
      margin: 0,
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Header />


      {/* 3. Content Body Layout */}
      <div style={styles.mainContentLayout}>
        <div style={styles.breadcrumb}>Home &gt; HealUp-Kira Store</div>

        {/* Hero Banner Section */}
        <div style={styles.heroBanner}>
          <div style={styles.heroOverlay}></div>
          <div style={styles.heroLeftText}>
            <h1 style={styles.heroTitle}>HealMart</h1>
            <h3 style={styles.heroSubtitle}>Nature's Best for Your Health</h3>
            <p style={styles.heroDesc}>Explore our carefully selected range of natural, nutritious and organic products to support your healthy lifestyle.</p>
          </div>
          <div style={styles.heroRightPromo}>
            <h2 style={styles.promoHeading}>Eat Better.</h2>
            <h2 style={styles.promoSubheading}>Live Better.</h2>
            <div style={styles.shopHealthyText}>Shop Healthier. 🌿</div>
          </div>
        </div>

        {/* Catalog Grid Section (Sidebar + Products) */}
        <div style={styles.catalogGridSection}>
          
          {/* Sidebar Filters */}
          <div style={styles.sidebar}>
            <div style={styles.sidebarSectionTitle}>
              <span>Shop by Category</span>
              <span>∧</span>
            </div>
            
            <div style={styles.categoryListContainer}>
              {categoriesList.map((cat, idx) => (
                <div key={idx} style={styles.categoryItem} onClick={() => setSelectedCategory(cat.name)}>
                  <span style={{ fontWeight: selectedCategory === cat.name ? 'bold' : 'normal', color: selectedCategory === cat.name ? '#2d6a4f' : '#4a5568' }}>
                    {cat.name}
                  </span>
                  <span style={{ color: '#a0aec0' }}>({cat.count})</span>
                </div>
              ))}
            </div>

            <div style={styles.filterHeaderRow}>
              <span style={styles.filterLabelTitle}>Filter By</span>
              <span 
                style={styles.clearAllText} 
                onClick={() => { 
                  setPriceRange(50000); 
                  setSelectedDiet([]); 
                  setSelectedGoal([]); 
                  setSelectedBrand('All Brands');
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
              >
                Clear All
              </span>
            </div>

            {/* Price Range Filter */}
            <div style={styles.filterGroup}>
              <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: '#4a5568' }}>Price Range</div>
              <div style={styles.priceSliderContainer}>
                <input 
                  type="range" 
                  min="500" 
                  max="50000" 
                  value={priceRange} 
                  onChange={(e) => setPriceRange(e.target.value)}
                  style={styles.rangeInput}
                />
                <div style={styles.priceRangeLabels}>
                  <span>FRw 500</span>
                  <span>FRw {Number(priceRange).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Dietary Preference Filter */}
            <div style={styles.filterGroup}>
              <div style={styles.filterLabelTitle}>Dietary Preference</div>
              {['Vegan', 'Gluten-Free', 'Organic', 'Sugar-Free'].map((diet, idx) => (
                <label key={idx} style={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={selectedDiet.includes(diet)}
                    onChange={() => handleCheckboxChange(selectedDiet, setSelectedDiet, diet)}
                  /> {diet}
                </label>
              ))}
            </div>

            {/* Health Goal Filter */}
            <div style={styles.filterGroup}>
              <div style={styles.filterLabelTitle}>Health Goal</div>
              {['Weight Loss', 'Diabetes-Friendly', 'High Protein', 'Heart Health', 'Immunity Boost'].map((goal, idx) => (
                <label key={idx} style={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={selectedGoal.includes(goal)}
                    onChange={() => handleCheckboxChange(selectedGoal, setSelectedGoal, goal)}
                  /> {goal}
                </label>
              ))}
            </div>

            {/* Brand Filter */}
            <div>
              <div style={styles.filterLabelTitle}>Brand</div>
              <select 
                style={styles.selectDropdown} 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="All Brands">All Brands</option>
                <option value="HealUp Organic">HealUp Organic</option>
                <option value="Ingano">Ingano</option>
                <option value="Natural Vibe">Natural Vibe</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid Area */}
          <div style={styles.productArea}>
            <div style={styles.productAreaHeader}>
              <span>Showing {sortedProducts.length} filtered products</span>
              <div style={styles.sortFilterRight}>
                <span>Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  style={styles.sortSelect}
                >
                  <option value="Popular">Popular</option>
                  <option value="PriceLow">Price: Low to High</option>
                  <option value="PriceHigh">Price: High to Low</option>
                  <option value="Newest">Newest Arrivals</option>
                </select>
                <span>
                  View: 
                  <span 
                    style={{ cursor: 'pointer', margin: '0 4px', fontWeight: viewMode === 'grid' ? 'bold' : 'normal' }}
                    onClick={() => setViewMode('grid')}
                  >
                    🗂️
                  </span> 
                  <span 
                    style={{ cursor: 'pointer', fontWeight: viewMode === 'list' ? 'bold' : 'normal' }}
                    onClick={() => setViewMode('list')}
                  >
                    ☰
                  </span>
                </span>
              </div>
            </div>

            <div style={styles.productsGrid}>
              {sortedProducts.length > 0 ? (
                sortedProducts.map((item) => (
                  <div key={item.id} style={styles.productCard}>
                    <div style={{ display: viewMode === 'list' ? 'flex' : 'block', flex: viewMode === 'list' ? 1 : 'unset' }}>
                      <div style={styles.productImageContainer}>
                        <img src={item.image} alt={item.name} style={styles.productImage} />
                        {item.badge && (
                          <div style={styles.productBadge(item.badgeColor)}>{item.badge}</div>
                        )}
                      </div>
                      <div style={styles.productBody}>
                        <div style={styles.productTitle}>{item.name}</div>
                        <div style={styles.ratingRow}>
                          <span style={styles.starIcon}>★</span>
                          <span style={{ fontWeight: '600', color: '#2d3748' }}>{item.rating}</span>
                          <span style={styles.reviewCount}>({item.reviews})</span>
                        </div>
                        <div style={styles.priceText}>{item.price}</div>
                      </div>
                    </div>

                    <div style={styles.cardFooterActions}>
                      <button style={styles.addToCartBtn} onClick={handleAddToCart}>
                        🛒 Add to Cart
                      </button>
                      <button style={styles.iconActionBtn} title="Wishlist">♡</button>
                      <button style={styles.iconActionBtn} title="Quick View">👁️</button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#718096' }}>
                  No products found matching your active filters. Try clearing your filters or search query.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 4. Footer Trust Badges Bar */}
      <div style={styles.footerFeaturesBar}>
        <div style={styles.featuresContainer}>
          <div style={styles.featureItem}>
            <div style={styles.featureIconBox}>🚚</div>
            <div>
              <h4 style={styles.featureTitle}>Fast &amp; Reliable Delivery</h4>
              <p style={styles.featureDesc}>Right to your door</p>
            </div>
          </div>
          <div style={styles.featureItem}>
            <div style={styles.featureIconBox}>🔒</div>
            <div>
              <h4 style={styles.featureTitle}>100% Secure Payments</h4>
              <p style={styles.featureDesc}>Multiple safe payment options</p>
            </div>
          </div>
          <div style={styles.featureItem}>
            <div style={styles.featureIconBox}>🌿</div>
            <div>
              <h4 style={styles.featureTitle}>100% Natural Products</h4>
              <p style={styles.featureDesc}>Carefully selected for you</p>
            </div>
          </div>
          <div style={styles.featureItem}>
            <div style={styles.featureIconBox}>🎧</div>
            <div>
              <h4 style={styles.featureTitle}>Excellent Support</h4>
              <p style={styles.featureDesc}>We are here for you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}