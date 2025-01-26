import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Pricing = () => {
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 200
      }
    })
  };

  const checkmarkVariants = {
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <section id="pricing" className="py-16 bg-purple-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-righteous text-center text-purple-800 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.2
          }}
        >
          Choose Your Learning Journey
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {/* Free Plan */}
          <motion.div
            className="flex-1 max-w-md bg-white rounded-2xl shadow-lg p-8"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 10px 30px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 120,
              damping: 15,
              delay: 0.3
            }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Free</h3>
            <p className="text-gray-600 mb-6">Perfect for getting started</p>
            <motion.div 
              className="text-3xl font-bold text-purple-800 mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
            >
              ₺0
            </motion.div>
            
            <ul className="space-y-4 mb-8">
              {['10 Basic Levels', 'Weekly Summary Reports', 'Limited Banner Ads'].map((item, index) => (
                <motion.li 
                  key={index}
                  variants={listItemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center gap-2"
                >
                  <motion.span 
                    whileHover={checkmarkVariants.hover}
                    transition={checkmarkVariants.transition}
                  >
                    <Check className="text-green-500" />
                  </motion.span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              className="w-full bg-purple-800 text-white px-6 py-3 rounded-full relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 8px 24px rgba(106, 27, 154, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Started Free</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              />
            </motion.button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            className="flex-1 max-w-md bg-purple-800 rounded-2xl shadow-lg p-8 relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 10px 30px rgba(55, 160, 0, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 120,
              damping: 15,
              delay: 0.3
            }}
          >
            <motion.div
  className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-1 rounded-lg inline-block mb-4"
  animate={{
    scale: [1, 1.05, 1],
    x: [0, -3, 3, 0],
    background: ["linear-gradient(to right, #48bb78, #38a169)", "linear-gradient(to right, #38a169, #48bb78)"]
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity
  }}
>
  Most Popular
</motion.div>

            <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
            <p className="text-purple-200 mb-6">Full access to all features</p>
            <motion.div 
              className="text-3xl font-bold text-white mb-6"
            >
              ₺250/year
            </motion.div>
            
            <ul className="space-y-4 mb-8 text-white">
              {['30+ Advanced Levels', 'Real-Time Dashboard', 'Ad-Free Experience', 'Priority Support'].map((item, index) => (
                <motion.li 
                  key={index}
                  variants={listItemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center gap-2"
                >
                  <motion.span 
                    whileHover={checkmarkVariants.hover}
                    transition={checkmarkVariants.transition}
                  >
                    <Check className="text-green-500" />
                  </motion.span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              className="w-full bg-green-600 text-white px-6 py-3 rounded-full relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 8px 24px rgba(55, 160, 0, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Upgrade to Premium</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-transparent"
                animate={{
                  x: ["-100%", "150%"],
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;