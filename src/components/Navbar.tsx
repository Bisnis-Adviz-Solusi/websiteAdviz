import { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router';
import img from '../assets/logo.png';
import Switch from './ui/switch';
import LangSwitch from './ui/langSwitch';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen] = useState(false);
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

  return (
    <nav
      className={`fixed top-0 w-full transition-all duration-300 ease-in-out z-50 transform
        ${isScrolled ? 'bg-transparent  shadow-lg' : 'bg-transparent'}
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="">
            <img className="w-26 h-8" src={img} alt="Logo" />
          </div>

          {/* Switch Button */}
          <div className="flex items-center gap-8">
            <LangSwitch />
            <Switch />
          </div>

        
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden backdrop-blur-lg rounded-lg m-2 border border-gray-200/50 dark:border-gray-700/50">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Switch Button for Mobile Menu */}
              <div className="flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
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
