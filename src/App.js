import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import PoseDetection from './pages/PoseDetection';
import TechStack from './pages/TechStack';
import Results from './pages/Results';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pose-detection" element={<PoseDetection />} />
          <Route path="/tech-stack" element={<TechStack />} />
          <Route path="/results" element={<Results />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
