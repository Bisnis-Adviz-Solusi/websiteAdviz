import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Mail, Phone } from 'lucide-react';
import img from './../assets/logo.png';
import CardSosmed from './ui/cardSosmed';

interface NavLinkType {
  id: string;
  label: string;
  path: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkHoverVariants = {
    hover: {
      y: -2,
      color: '#00f2fe',
      transition: { duration: 0.2 }
    }
  };

  const navLinks: NavLinkType[] = [
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'services', label: 'Our Services', path: '/services' },
    { id: 'contact', label: 'Our Contact', path: '/contact' },
    { id: 'simulation', label: 'Simulation', path: '/simulation' },
    { id: 'case-studies', label: 'Case Studies', path: '/' },
    { id: 'privacy-policy', label: 'Privacy Policy', path: '/privacy-policy' },
    { id: 'terms-of-service', label: 'Terms of Service', path: '/terms-of-service' },
  ];

  // Grid line animation
  const gridVariants = {
    animate: {
      opacity: [0.1, 0.15, 0.1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Section fade-in animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getPathByLabel = (label: string): string => {
    const navLink = navLinks.find(link => link.label === label ||
      link.label === `Our ${label}` ||
      link.label === `${label} Us`);
    return navLink ? navLink.path : '#';
  };

  return (
    <footer className="relative bg-gray-900 dark:bg-[#1A1A1A] text-white overflow-hidden">
      {/* Gradient Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-blue-700 to-orange-400"></div>

      {/* Animated Background Grid */}
      <motion.div
        variants={gridVariants}
        animate="animate"
        className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:24px_24px]"
      />

      {/* Glowing Orbs */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand Section */}
          <motion.div
            variants={fadeInUp}
            className="space-y-6 w-96"
          >
            <img className="h-12 w-auto" alt="Adviz logo" src={img} />
            <p className="text-gray-400 leading-relaxed">
              Where numbers meet understanding. <p>Let's simplify finance together.</p>
            </p>
           
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeInUp}
            className="space-y-6 lg:ml-24"
          >
            <h4 className="text-lg font-semibold text-gray-200">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Services', 'Case Studies', 'Contact'].map((item: string) => (
                <motion.li key={item} whileHover="hover" variants={linkHoverVariants}>
                  <a
                    href={getPathByLabel(item)}
                    className="text-gray-400  hover:text-orange-400 transition-colors flex items-center gap-2 group"
                  >
                    <ExternalLink size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            variants={fadeInUp}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-gray-200">Our Services</h4>
            <ul className="space-y-3">
              {['Financial Consultant', 'HR Management Consultant'].map((item: string) => (
                <motion.li key={item} whileHover="hover" variants={linkHoverVariants}>
                  <a
                    href={getPathByLabel('Services')}
                    className="text-gray-400  hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={fadeInUp}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-gray-200">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 w-5 h-5 text-orange-200 flex-shrink-0" />
                <span className="text-gray-400">
                  Arva Building, 4th floor, Cikini Raya Street No. 60,
                  Jakarta Pusat, Provinsi DKI Jakarta
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-200 flex-shrink-0" />
                <a href="mailto:marketing@adviz.id" className="text-gray-400  hover:text-orange-400 transition-colors">
                  marketing@adviz.id
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-200 flex-shrink-0" />
                <a href="tel:+6281234567890" className="text-gray-400  hover:text-orange-400 transition-colors">
                  +62 812 3456 7890
                </a>
              </li>
              <div className="pt-4">
                <CardSosmed />
              </div>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm">
              Â© {currentYear} <span className="text-orange-200">Adviz</span>. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
              {['Privacy Policy', 'Terms of Service'].map((item) => (
                <motion.a
                  key={item}
                  href={getPathByLabel(item)}
                  whileHover="hover"
                  variants={linkHoverVariants}
                  className=" hover:text-orange-400 transition-colors"
                >
                  {item}
                </motion.a>
                
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20" />
    </footer>
  );
};

export default Footer;