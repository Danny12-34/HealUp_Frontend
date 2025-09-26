import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import HealMart from './components/HealMart';
import ProductsTable from './Lists/ProductsTable';
import GrainProductsTable from './Lists/GrainProductsTable';
import MealsPage from './components/Menu/MealsPage';
import HomeMenuPage from './components/Menu/ClientHomeMenu';
import HealthProductsTable from './Lists/HealthProductsTable';
import FitnessProductsTable from './Lists/FitnessProductsTable';
import ProductDetails from './Lists/ProductDetails';
import CategoryManager from './ManagerSide/CategoryManager';
import OrdersManager from './ManagerSide/OrdersManager';
import ProductManager from './ManagerSide/ProductManager';
import ManagerDashboard from './ManagerSide/ManagerDashboard';
import Sidebar from './ManagerSide/Sidebar';
import Layout from "./components/Layout";
import CaseManage from "./components/CasesManager";
import CartPage from './components/CartPage'; // ✅ import your cart page
import HealUpLanding from './components/HealUpLanding';

function App() {
  // ✅ add cart state here
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Layout>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />

          {/* ✅ Pass cart state into HealMart */}
          <Route
            path="/healmart"
            element={<HealMart cartItems={cartItems} setCartItems={setCartItems} />}
          />

          {/* ✅ Cart page route */}
          <Route
            path="/cart"
            element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />}
          />

          <Route path="/nutrition" element={<ProductsTable />} />
          <Route path="/grain" element={<GrainProductsTable />} />
          <Route path="/health" element={<HealthProductsTable />} />
          <Route path="/fitness" element={<FitnessProductsTable />} />
          <Route path="/category/manager" element={<CategoryManager />} />
          <Route path="/menu/manager" element={<MealsPage />} />
          <Route path="/HomeMenu/manager" element={<HomeMenuPage />} />
          <Route path="/manager/product" element={<ProductManager />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/manager/dash" element={<ManagerDashboard />} />
          <Route path="/manager/navigation" element={<Sidebar />} />
          <Route path="/manager/order" element={<OrdersManager />} />
          <Route path="/manager/cases" element={<CaseManage />} />
          <Route path="/Home/HealUpLanding" element={<HealUpLanding />} />
        </Routes>
      </div></Layout>
    </Router>
  );
}

export default App;
