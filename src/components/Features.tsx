import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Star, Trophy, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-green-600" />, // Green icon color
      title: "Interactive Learning",
      description: "3D numbers and shapes that children can manipulate in real space"
    },
    {
      icon: <Star className="w-6 h-6 text-green-600" />, // Green icon color
      title: "Progress Tracking",
      description: "Real-time feedback and detailed progress reports for parents"
    },
    {
      icon: <Trophy className="w-6 h-6 text-green-600" />, // Green icon color
      title: "Achievement System",
      description: "Rewards and badges to keep children motivated"
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />, // Green icon color
      title: "Parent Dashboard",
      description: "Monitor your child's learning journey and customize their experience"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 15,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-righteous text-center text-purple-800 mb-12"
        >
          Why Choose NumARt?
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.div
                className="mb-4 bg-green-100 p-2 rounded-lg w-fit" // Light green background with padding
                whileHover="hover"
                variants={iconVariants}
              >
                {feature.icon} {/* Icon with green color */}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;