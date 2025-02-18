import { useState, useEffect, useRef } from 'react';
import { Menu, X } from "lucide-react";
import { Link } from 'react-router';
import img from '../assets/logo.png';
import Switch from './ui/switch';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const prevScrollY = useRef(0);
  const isMenuOpenRef = useRef(isMenuOpen);

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpenRef.current) return;

      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > prevScrollY.current ? 'down' : 'up';
      const isAtTop = currentScrollY === 0;
      const isAtBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight;

      if (isAtTop || isAtBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(scrollDirection === 'up');
      }

      setIsScrolled(currentScrollY > 20);
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const navLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'contact', label: 'Contact', path: '/contact' },
    { id: 'simulation', label: 'Simulation', path: '/simulation' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full transition-all duration-300 ease-in-out z-50 transform
        ${isScrolled ? 'bg-transparent backdrop-blur-md shadow-lg' : 'bg-transparent'}
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {/* Bagian JSX lainnya tetap sama */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="">
            <img className="w-26 h-8" src={img} alt="Logo" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex space-x-8">
              {navLinks.map(({ id, label, path }) => (
                <Link
                  key={id}
                  to={path}
                  onClick={() => setActiveLink(id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300
                    ${activeLink === id
                      ? ''
                      : ' hover:text-white hover:scale-105'}`}
                >
                  {label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-300
                    transform origin-left transition-transform duration-300 ease-out
                    ${activeLink === id ? 'scale-x-100' : 'scale-x-0'}`}
                  ></span>
                </Link>
              ))}  
              <div
               
                className=""
              >
                 <div className="" >
      <Switch />
    </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-lg rounded-lg m-2 border border-gray-200/50 dark:border-gray-700/50">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => {
                    setActiveLink(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md transition-colors
                    ${
                      activeLink === item.id
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <div
            
                className="flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                    <Switch />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



