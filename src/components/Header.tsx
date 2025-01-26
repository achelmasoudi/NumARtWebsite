import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Add your Dropbox URLs here
  const iconUrl = "https://www.dropbox.com/scl/fi/yiwdx2zz9j213v27u38y9/NumARt_icon.png?rlkey=ngw61wleb4vjzm3zk87jucoxb&st=uudnon6s&dl=1";
  const apkDownloadUrl = "https://www.dropbox.com/scl/fi/mbwuzv5ctr9jnfhvfxt5z/NumARt.apk?rlkey=se1ojwag9m91i4y26yo1g4qf2&st=d4yicoc9&dl=1";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'AR Features', href: '#features', id: 'features' },
    { name: 'Technology Stack', href: '#technology', id: 'technology' },
    { name: 'Pricing', href: '#pricing', id: 'pricing' }
  ];

  const handleTabClick = (tabId: string, href: string) => {
    setActiveTab(tabId);
    
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            {/* Updated Logo */}
            <img
              src={iconUrl}
              alt=""
              className="w-12 h-12"
            />
            <span className="font-righteous text-2xl text-green-600">NumARt</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                className={`relative text-gray-500 hover:text-green-600 transition-colors cursor-pointer ${
                  activeTab === item.id ? 'font-bold' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(item.id, item.href);
                }}
              >
                {item.name}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600"
                  />
                )}
              </motion.a>
            ))}
            {/* Updated Download Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-800 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-green-600 transition-colors"
              onClick={() => {
                const link = document.createElement('a');
                link.href = apkDownloadUrl;
                link.download = 'NumARt.apk';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download size={20} />
              Download APK
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 90 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: -90 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 overflow-hidden"
            >
              {navigation.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick(item.id, item.href);
                    setIsMenuOpen(false);
                  }}
                  className={`block py-2 text-gray-700 hover:text-purple-800 transition-colors ${
                    activeTab === item.id ? 'font-bold' : ''
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
              {/* Updated Mobile Download Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 bg-purple-800 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-purple-900 transition-colors"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = apkDownloadUrl;
                  link.download = 'NumARt.apk';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download size={20} />
                Download APK
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;