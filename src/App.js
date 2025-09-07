import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import HealMart from './components/HealMart';
import ProductsTable from './Lists/ProductsTable';
import GrainProductsTable from './Lists/GrainProductsTable';
import HealthProductsTable from './Lists/HealthProductsTable';
import FitnessProductsTable from './Lists/FitnessProductsTable';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/healmart" element={<HealMart />} />
          <Route path="/nutrition" element={<ProductsTable />} />
          <Route path="/grain" element={<GrainProductsTable />} />
          <Route path="/health" element={<HealthProductsTable />} />
          <Route path="/fitness" element={<FitnessProductsTable/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
