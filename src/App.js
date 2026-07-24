import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CategoryCreate from './components/Dashboards/Manager/Categories/CategoryCreate';
import CategoryList from './components/Dashboards/Manager/Categories/CategoryList';
import MainPhotoCreate from './components/Dashboards/Manager/MainPhoto/MainPhotoCreate';
import MainPhotoList from './components/Dashboards/Manager/MainPhoto/MainPhotoList';
import ProductCreate from './components/Dashboards/Manager/Product/ProductCreate';
import ProductList from './components/Dashboards/Manager/Product/ProductList';
import ManagerDashboard from './components/Dashboards/Manager/ManagerDashboard';
import Home from './components/HomePage';
import HealMate from './components/HealMat';
import HealUpCafePage from './components/HealUpCafePage';
import AboutUsPage from './components/AboutUs';
import HealthyLivingPage from './components/HealthyLivingPage';
import ContactPage from './components/ContactPage';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <Routes>
          {/* Home is now set as the direct landing page */}
          <Route path="/" element={<Home />} />
          
          {/* Manager Dashboard and Sub-Routes */}
          <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
          <Route path="/CatList" element={<CategoryList />} />
          <Route path="/MainPhotoList" element={<MainPhotoList />} />
          <Route path="/ProdList" element={<ProductList />} />
          <Route path="/CatCreate" element={<CategoryCreate />} />
          <Route path="/MainphotoCrea" element={<MainPhotoCreate />} />
          <Route path="/ProductCreate" element={<ProductCreate />} />
          <Route path="/HealMart" element={<HealMate />} />
          <Route path="/HealUpCafe" element={<HealUpCafePage />} />
          <Route path="/Aboutus" element={<AboutUsPage />} />
          <Route path="/HealthLiving" element={<HealthyLivingPage />} />
          <Route path="/ContactUs" element={<ContactPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;