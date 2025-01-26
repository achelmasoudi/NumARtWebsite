import React from 'react';
import { motion } from 'framer-motion';
import { Database, Shield, Smartphone, Cuboid as Cube, Github } from 'lucide-react';

const Technology = () => {
  const technologies = [
    {
      category: 'Backend & Data Management',
      items: [
        { name: 'Firebase Realtime Database', description: 'Real-time sync for user progress', icon: <Database /> },
        { name: 'Firebase Storage', description: '3D model hosting & management', icon: <Database /> }
      ],
      color: 'purple'
    },
    {
      category: 'Development',
      items: [
        { name: 'Android Studio', description: 'Kotlin development environment', icon: <Smartphone /> },
        { name: 'XML Layouts', description: 'UI/UX design framework', icon: <Smartphone /> }
      ],
      color: 'purple'
    },
    {
      category: 'AR & 3D',
      items: [
        { name: 'ARSceneView SDK', description: 'Augmented reality integration', icon: <Cube /> },
        { name: 'Tinkercad', description: 'GLB 3D model creation', icon: <Cube /> }
      ],
      color: 'purple'
    },
    {
      category: 'Security',
      items: [
        { name: 'Firebase Authentication', description: 'Secure user login/registration', icon: <Shield /> }
      ],
      color: 'purple'
    }
  ];

   // Updated animations
   const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: { 
        type: "spring",
        stiffness: 300
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, -15, 15, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="technology" className="py-16 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-3xl md:text-4xl font-righteous text-center text-purple-800 mb-12"
        >
          Technology Stack
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group relative overflow-hidden"
            >
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              <h3 className={`text-xl font-bold text-purple-800 mb-4`}>
                {tech.category}
              </h3>
              
              <div className="space-y-4">
                {tech.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      variants={iconVariants}
                      className="text-green-600 bg-green-100 p-2 rounded-lg"
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <div className="font-bold text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technology;