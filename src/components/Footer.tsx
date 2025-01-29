
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import img from './../assets/logo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Hover animation for links
  const linkHoverVariants = {
    hover: { 
      y: -3,
      color: '#00f2fe',
      transition: { duration: 0.2 }
    }
  };

  // Grid line animation
  const gridVariants = {
    animate: {
      opacity: [0.2, 0.3, 0.2],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Animated Background Grid */}
      <motion.div
        variants={gridVariants}
        animate="animate"
        className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:24px_24px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <img className="h-10 w-32" alt="logo" src={img} />
            <p className="text-gray-400 max-w-xs">
              Creating tomorrow's digital experiences today. Explore the future with us.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-300">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Services', 'Projects', 'Contact'].map((item) => (
                <motion.li key={item} whileHover="hover" variants={linkHoverVariants}>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <ExternalLink size={14} />
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-300">Connect</h4>
            <div className="flex space-x-4">
              {[
                { icon: Github, link: '#' },
                { icon: Twitter, link: '#' },
                { icon: Linkedin, link: '#' },
                { icon: Mail, link: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <social.icon size={20} className="text-cyan-400" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              © {currentYear} Adviz. All rights reserved.
            </motion.p>
            
            <div className="flex space-x-6 text-sm text-gray-400">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover="hover"
                  variants={linkHoverVariants}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-20" />
      <div className="absolute bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-10" />
    </footer>
  );
};

export default Footer;