import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const mainCursorControls = useAnimation();
  const trailCursorControls = useAnimation();
  const auraCursorControls = useAnimation();

  // Update mouse position
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  // Handle hover effects
  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-hover]');
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Animate cursor based on hover state
  useEffect(() => {
    if (isHovering) {
      mainCursorControls.start({
        scale: 1.5,
        backgroundColor: 'transparent',
        border: '2px solid #FF6B6B',
      });
      trailCursorControls.start({
        scale: 3,
        backgroundColor: 'rgba(255, 107, 107, 0.3)',
        opacity: 1,
      });
      auraCursorControls.start({
        scale: 4,
        opacity: 0.5,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
      });
    } else {
      mainCursorControls.start({
        scale: 1,
        backgroundColor: 'transparent',
        border: '2px solid #4A90E2',
      });
      trailCursorControls.start({
        scale: 2,
        backgroundColor: 'rgba(74, 144, 226, 0.3)',
        opacity: 0,
      });
      auraCursorControls.start({
        scale: 3,
        opacity: 0,
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
      });
    }
  }, [isHovering, mainCursorControls, trailCursorControls, auraCursorControls]);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 border-2"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          zIndex: 9999,
          background: 'radial-gradient(circle, rgba(74,144,226,0.8) 0%, rgba(255,107,107,0.8) 100%)',
        }}
        animate={mainCursorControls}
        transition={{
          duration: 0.2,
          ease: 'easeInOut',
        }}
      />

      {/* Cursor Trail */}
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          zIndex: 9998,
        }}
        animate={trailCursorControls}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
      />

      {/* Cursor Aura (Glow Effect) */}
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          zIndex: 9997,
        }}
        animate={auraCursorControls}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
      />
    </>
  );
};

export default CustomCursor;