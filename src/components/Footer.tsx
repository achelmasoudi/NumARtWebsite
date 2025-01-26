import React from 'react';
import { motion } from 'framer-motion';
import { Github, Trello, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:border-r md:border-purple-800 pr-8">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-righteous text-2xl mb-4"
            >
              NumARt
            </motion.h3>
            <p className="text-purple-200 mb-4">
              Making math learning fun and interactive through augmented reality.
            </p>
            <div className="mt-6">
              <p className="text-purple-200 text-sm mb-1">Developed by</p>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-green-500 font-bold text-lg"
              >
                ACHRAF EL MASOUDI
              </motion.p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:border-r md:border-purple-800 pr-8">
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-bold mb-4 text-lg"
            >
              Quick Links
            </motion.h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Technology', 'Contact'].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-purple-200 hover:text-green-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:border-r md:border-purple-800 pr-8">
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-bold mb-4 text-lg"
            >
              Legal
            </motion.h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'COPPA Compliance', 'GDPR Ready'].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a 
                    href="#" 
                    className="text-purple-200 hover:text-green-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-purple-200 text-center mb-4"
            >
              Explore the source code on GitHub, follow our development process on Trello, or connect with me professionally on LinkedIn.
            </motion.p>
            <motion.div 
              className="flex gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <motion.a
                href="https://github.com/achelmasoudi/NumARt"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="flex flex-col items-center group"
              >
                <div className="p-3 bg-purple-800 rounded-full group-hover:bg-green-500 transition-colors">
                  <Github size={24} className="text-white" />
                </div>
                <span className="mt-2 text-sm text-purple-200 group-hover:text-green-500 transition-colors">
                  GitHub
                </span>
              </motion.a>

              <motion.a
                href="https://trello.com/your-board-url"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="flex flex-col items-center group"
              >
                <div className="p-3 bg-purple-800 rounded-full group-hover:bg-green-500 transition-colors">
                  <Trello size={24} className="text-white" />
                </div>
                <span className="mt-2 text-sm text-purple-200 group-hover:text-green-500 transition-colors">
                  Trello
                </span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/achelmasoudi/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="flex flex-col items-center group"
              >
                <div className="p-3 bg-purple-800 rounded-full group-hover:bg-green-500 transition-colors">
                  <Linkedin size={24} className="text-white" />
                </div>
                <span className="mt-2 text-sm text-purple-200 group-hover:text-green-500 transition-colors">
                  LinkedIn
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="pt-8 border-t border-purple-800">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {[
              { 
                name: 'Android Studio', 
                url: 'https://developer.android.com/studio',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Android_Studio_icon_%282023%29.svg/2048px-Android_Studio_icon_%282023%29.svg.png'
              },
              { 
                name: 'Firebase', 
                url: 'https://firebase.google.com/',
                logo: 'https://cdn-public.softwarereviews.com/production/favicons/offerings/8915/original/Firebase_fav.png'
              },
              { 
                name: 'ARCore', 
                url: 'https://developers.google.com/ar',
                logo: 'https://cdn.iconscout.com/icon/free/png-256/free-google-arcore-logo-icon-download-in-svg-png-gif-file-formats--youtube-pack-logos-icons-1721677.png'
              },
              { 
                name: 'Tinkercad', 
                url: 'https://www.tinkercad.com/',
                logo: 'https://www.mechabau.com/wp-content/uploads/Tinkercad-logo.png'
              }
            ].map((tech, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <a href={tech.url} target="_blank" rel="noopener noreferrer">
                  <motion.img
                    src={tech.logo}
                    alt={tech.name}
                    className="h-12 mb-2"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                  />
                </a>
                <p className="text-purple-200 text-sm">{tech.name}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <p className="text-purple-200">
              &copy; {new Date().getFullYear()} NumARt. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;