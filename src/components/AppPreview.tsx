import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone, Tablet, X } from 'lucide-react';

const AppPreview = () => {
  const [selectedView, setSelectedView] = useState('phone');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef(null);
  
  // Zoom and pan state
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const scaleRef = useRef(1);
  const positionRef = useRef({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const screenshotCategories = [
    {
      screenshots: [
        {
          phone: "https://www.dropbox.com/scl/fi/cvfogdpsrtz3vfujit7d3/Launch-Screen.png?rlkey=ftuxd3cjrk3m33razcqwzzz4s&st=cl2as1am&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/cvfogdpsrtz3vfujit7d3/Launch-Screen.png?rlkey=ftuxd3cjrk3m33razcqwzzz4s&st=cl2as1am&dl=1",
          label: "Launch Screen"
        },
        {
          phone: "https://www.dropbox.com/scl/fi/4k85fkxo0xqgv50isaup5/Sign-In-Interface.png?rlkey=ommwhxqkbk64hyu79dqu6lram&st=316pem7g&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/4k85fkxo0xqgv50isaup5/Sign-In-Interface.png?rlkey=ommwhxqkbk64hyu79dqu6lram&st=316pem7g&dl=1",
          label: "Sign-In Interface"
        },
      ]
    },
    {
      screenshots: [
        {
          phone: "https://www.dropbox.com/scl/fi/88ck3ipti930782jn16na/Registration-Portal.png?rlkey=himj4rhe4np6ahftqkcic6qdz&st=dyke70oh&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/88ck3ipti930782jn16na/Registration-Portal.png?rlkey=himj4rhe4np6ahftqkcic6qdz&st=dyke70oh&dl=1",
          label: "Registration Portal"
        },
        {
          phone: "https://www.dropbox.com/scl/fi/lumq3bpckqahdr595qgl3/Password-Recovery-Module.png?rlkey=whbznvd533zevxsmwer1l0dxn&st=dbhqi29p&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/lumq3bpckqahdr595qgl3/Password-Recovery-Module.png?rlkey=whbznvd533zevxsmwer1l0dxn&st=dbhqi29p&dl=1",
          label: "Password Recovery Module"
        },
      ]
    },
    {
      screenshots: [
        {
          phone: "https://www.dropbox.com/scl/fi/azfxxync4d3qto9m497cb/Primary-Dashboard.png?rlkey=ucskd2y2ybjsf2lub2k4n1n9r&st=kinoxse4&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/azfxxync4d3qto9m497cb/Primary-Dashboard.png?rlkey=ucskd2y2ybjsf2lub2k4n1n9r&st=kinoxse4&dl=1",
          label: "Primary Dashboard"
        },
        {
          phone: "https://www.dropbox.com/scl/fi/6hvrfyjr7wsb4onuoa0uo/Premium-Access-Modal.png?rlkey=s1acbb4sehvrr7390iotexxzv&st=466zh7wc&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/6hvrfyjr7wsb4onuoa0uo/Premium-Access-Modal.png?rlkey=s1acbb4sehvrr7390iotexxzv&st=466zh7wc&dl=1",
          label: "Premium Access Modal"
        },
      ]
    },
    {
      screenshots: [
        {
          phone: "https://www.dropbox.com/scl/fi/6jl1dwlsb8hw3igo2jlnh/Easy-Level-Interface.png?rlkey=v3a3man5wt16vhaigdn6xabdu&st=cjgmdm9x&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/6jl1dwlsb8hw3igo2jlnh/Easy-Level-Interface.png?rlkey=v3a3man5wt16vhaigdn6xabdu&st=cjgmdm9x&dl=1",
          label: "Easy Level Interface"
        },
        {
          phone: "https://www.dropbox.com/scl/fi/jovjw6e7jnwxhktxv62i7/Pre-Game-Configuration.png?rlkey=nz1v2mwjgflhf4drwa9pw5bbl&st=mioc67eo&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/jovjw6e7jnwxhktxv62i7/Pre-Game-Configuration.png?rlkey=nz1v2mwjgflhf4drwa9pw5bbl&st=mioc67eo&dl=1",
          label: "Pre-Game Configuration"
        },
      ]
    },
    {
      screenshots: [
        {
          phone: "https://www.dropbox.com/scl/fi/2o5ucd6d6ff144ceb6h8h/Victory-Summary-Screen.png?rlkey=jfa90qso29jshlzfl87o7bd3q&st=ex6b2gak&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/2o5ucd6d6ff144ceb6h8h/Victory-Summary-Screen.png?rlkey=jfa90qso29jshlzfl87o7bd3q&st=ex6b2gak&dl=1",
          label: "Victory Summary Screen"
        },
        {
          phone: "https://www.dropbox.com/scl/fi/wbsc96v4oynfth3rxn7oh/Retry-Challenge-Interface.png?rlkey=fgatb2nx8nwemmjc04s0eb9n5&st=tsdly5s0&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/wbsc96v4oynfth3rxn7oh/Retry-Challenge-Interface.png?rlkey=fgatb2nx8nwemmjc04s0eb9n5&st=tsdly5s0&dl=1",
          label: "Retry Challenge Interface"
        },
      ]
    },
    {
      screenshots: [
        {
          phone: "https://www.dropbox.com/scl/fi/fmqix6wson7p7gohid8to/User-Profile-Dashboard.png?rlkey=ys0b5b6jfbfq3j06i9qc12zig&st=xp7x3t2u&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/fmqix6wson7p7gohid8to/User-Profile-Dashboard.png?rlkey=ys0b5b6jfbfq3j06i9qc12zig&st=xp7x3t2u&dl=1",
          label: "User Profile Dashboard"
        },
        {
          phone: "https://www.dropbox.com/scl/fi/447vnbhzi5bfn7kgw1rnx/Premium-Account-Dashboard.png?rlkey=zdeqpzo5hw5p1xv7hff9rm515&st=zugt3car&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/447vnbhzi5bfn7kgw1rnx/Premium-Account-Dashboard.png?rlkey=zdeqpzo5hw5p1xv7hff9rm515&st=zugt3car&dl=1",
          label: "Premium Account Dashboard"
        },
      ]
    },
    {
      screenshots: [
        {
          phone: "https://www.dropbox.com/scl/fi/he1fa6617lqtjyiezen56/Language-Preferences-Modal.png?rlkey=rh9u696pxelzczfq09p5ywbro&st=gxfx2lf6&dl=1",
          tablet: "https://www.dropbox.com/scl/fi/he1fa6617lqtjyiezen56/Language-Preferences-Modal.png?rlkey=rh9u696pxelzczfq09p5ywbro&st=gxfx2lf6&dl=1",
          label: "Language Preferences Modal"
        },
      ]
    }
  ];

  const flattenedScreenshots = screenshotCategories.flatMap(c => c.screenshots);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Zoom and pan handlers
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = scaleRef.current * delta;

    if (newScale < 1 || newScale > 3) return;

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const oldScale = scaleRef.current;
    const oldX = positionRef.current.x;
    const oldY = positionRef.current.y;

    const newX = mouseX - (mouseX - oldX) * (newScale / oldScale);
    const newY = mouseY - (mouseY - oldY) * (newScale / oldScale);

    scaleRef.current = newScale;
    positionRef.current = { x: newX, y: newY };
    setTransform({ scale: newScale, x: newX, y: newY });
  };

  const handleMouseDown = (e) => {
    if (scaleRef.current <= 1) return;

    isPanning.current = true;
    startPos.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isPanning.current) return;

    const newX = e.clientX - startPos.current.x;
    const newY = e.clientY - startPos.current.y;

    positionRef.current = { x: newX, y: newY };
    setTransform(prev => ({ ...prev, x: newX, y: newY }));
  };

  const handleMouseUp = () => {
    isPanning.current = false;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : flattenedScreenshots.length - 1));
          break;
        case 'ArrowRight':
          setCurrentImageIndex(prev => (prev < flattenedScreenshots.length - 1 ? prev + 1 : 0));
          break;
        case 'Escape':
          setSelectedImage(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  useEffect(() => {
    scaleRef.current = 1;
    positionRef.current = { x: 0, y: 0 };
    setTransform({ scale: 1, x: 0, y: 0 });
  }, [currentImageIndex, selectedImage]);

  return (
    <section className="py-16 bg-white-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-3xl md:text-4xl font-righteous text-center text-purple-800 mb-3"
          >
            Experience NumARt
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how our AR-powered platform transforms mathematical learning through immersive interactions
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12">
          {['phone', 'tablet'].map((device) => (
            <motion.button
              key={device}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedView(device)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-colors ${
                selectedView === device 
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-600 shadow-md hover:shadow-lg'
              }`}
            >
              {device === 'phone' ? <Phone size={24} /> : <Tablet size={24} />}
              <span className="text-lg font-medium">
                {device.charAt(0).toUpperCase() + device.slice(1)} View
              </span>
            </motion.button>
          ))}
        </div>

        <div className="relative mt-12 pb-8">
          <motion.button
            onClick={() => handleScroll('left')}
            className="absolute left-0 z-10 p-3 rounded-full bg-purple-600 text-white shadow-xl hover:bg-purple-700 transition-all"
            style={{ top: '40%', transform: 'translateY(-50%)' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={32} />
          </motion.button>

          <motion.button
            onClick={() => handleScroll('right')}
            className="absolute right-0 z-10 p-3 rounded-full bg-purple-600 text-white shadow-xl hover:bg-purple-700 transition-all"
            style={{ top: '40%', transform: 'translateY(-50%)' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={32} />
          </motion.button>

          <div
            ref={containerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-7 pb-3 snap-x snap-mandatory mx-16"
          >
            {flattenedScreenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    mass: 0.5
                  }
                }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                className="flex-shrink-0 w-[270px] snap-center group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-t-2xl w-full flex justify-center items-center h-80">
                  <motion.img
                    src={selectedView === 'phone' ? screenshot.phone : screenshot.tablet}
                    alt={`${screenshot.label} ${selectedView} screenshot`}
                    className="h-full h-80 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(screenshot);
                      setCurrentImageIndex(index);
                    }}
                    className="absolute inset-0 w-full h-full bg-black/0 group-hover:bg-black/20 transition-colors"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-0 text-center">
                    {screenshot.label}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <button
                    className="text-white hover:text-purple-300 transition-colors"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X size={32} />
                  </button>
                  <div className="flex gap-4">
                    <button
                      className="text-white hover:text-purple-300 transition-colors"
                      onClick={() => setCurrentImageIndex(prev => 
                        prev > 0 ? prev - 1 : flattenedScreenshots.length - 1
                      )}
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button
                      className="text-white hover:text-purple-300 transition-colors"
                      onClick={() => setCurrentImageIndex(prev => 
                        prev < flattenedScreenshots.length - 1 ? prev + 1 : 0
                      )}
                    >
                      <ChevronRight size={32} />
                    </button>
                  </div>
                </div>
                
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white rounded-xl overflow-hidden shadow-2xl"
                >
                  <div 
                    className="relative w-full h-[70vh] overflow-hidden"
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{ 
                      cursor: isPanning.current ? 'grabbing' : transform.scale > 1 ? 'grab' : 'auto'
                    }}
                  >
                    <motion.img
                      src={selectedView === 'phone' 
                        ? flattenedScreenshots[currentImageIndex].phone 
                        : flattenedScreenshots[currentImageIndex].tablet}
                      alt={flattenedScreenshots[currentImageIndex].label}
                      className="w-full h-full object-contain"
                      style={{ 
                        scale: transform.scale,
                        x: transform.x,
                        y: transform.y,
                      }}
                      draggable="false"
                    />
                  </div>
                  <div className="p-6 bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-900 text-center">
                      {flattenedScreenshots[currentImageIndex].label}
                    </h3>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AppPreview;