import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import AppPreview from './components/AppPreview';
import Features from './components/Features';
import Technology from './components/Technology';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <>
    <CustomCursor />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Header />
      <main>
        <Hero />
        <AppPreview />
        <Features />
        <Technology />
        <Pricing />
      </main>
      <Footer />
    </motion.div>
    </>
  );
}

export default App;