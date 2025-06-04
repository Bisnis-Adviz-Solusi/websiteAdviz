import { useState, useEffect, useRef } from 'react';
import {
  BiHomeAlt2,
  // BiBriefcase,
  BiEnvelope,
  // BiCalculator,
  // BiBuildings
} from 'react-icons/bi';
import { Link, useLocation } from 'react-router';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register the SplitText plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

interface NavLinkType {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType;
}

const navLinks: NavLinkType[] = [
  // { id: 'about', label: 'About', path: '/about', icon: BiBuildings },
  // { id: 'services', label: 'Services', path: '/services', icon: BiBriefcase },
  { id: '/', label: 'Home', path: '/', icon: BiHomeAlt2 },
  { id: 'contact', label: 'Contact', path: '/contact', icon: BiEnvelope },
  // { id: 'simulation', label: 'Simulation', path: '/simulation', icon: BiCalculator },
];

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?";
const getRandomChar = () => chars.charAt(Math.floor(Math.random() * chars.length));

const Nav = () => {
  const location = useLocation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [hoverLink, setHoverLink] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const labelRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});
  const scrambleTimelines = useRef<{ [key: string]: gsap.core.Timeline }>({});

  // Set active link based on current path when component mounts or route changes
  useEffect(() => {
    const currentPath = location.pathname;

    // Find the matching nav link for current path
    const matchingLink = navLinks.find(link => link.path === currentPath);

    // Set the active link to the matching link's id, or default to home if no match
    if (matchingLink) {
      setActiveLink(matchingLink.id);
    } else {
      // Handle potential nested routes by checking if current path starts with any nav link path
      const matchingParentLink = navLinks.find(
        link => link.path !== '/' && currentPath.startsWith(link.path)
      );

      if (matchingParentLink) {
        setActiveLink(matchingParentLink.id);
      } else {
        // Default to home if no match is found
        setActiveLink('/');
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 50) {
        setHasScrolled(true);
        setShowNav(true);
      }

      if (window.scrollY > lastScrollY && window.scrollY > 150) {
        setShowNav(false);
      }
      else if (window.scrollY < lastScrollY || hasScrolled) {
        setShowNav(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, hasScrolled]);

  const handleLinkClick = (id: string): void => {
    setActiveLink(id);
    setIsExpanded(true);
    setTimeout(() => setIsExpanded(false), 500);
  };

  interface ScrambleParams {
    id: string;
  }

  const startScrambleAnimation = ({ id }: ScrambleParams): void => {
    if (!labelRefs.current[id] || typeof window === 'undefined') return;

    const element: HTMLSpanElement = labelRefs.current[id];
    const originalText: string = element.innerText;
    const duration: number = 1.2;

    // Kill any existing animation for this element
    if (id in scrambleTimelines.current) {
      scrambleTimelines.current[id].kill();
    }

    // Create a new timeline for this animation
    const tl: gsap.core.Timeline = gsap.timeline();
    scrambleTimelines.current[id] = tl;

    const iterations: number = Math.ceil(duration * 10); // Number of scramble iterations
    let scrambledText: string = '';

    // Initialize the scrambled text with random characters
    for (let i: number = 0; i < originalText.length; i++) {
      scrambledText += getRandomChar();
    }

    element.innerText = scrambledText;

    // Gradually reveal the original characters
    for (let i: number = 0; i < iterations; i++) {
      tl.add((): void => {
        let newText: string = '';
        for (let j: number = 0; j < originalText.length; j++) {
          if (j <= (i / iterations) * originalText.length) {
            newText += originalText[j];
          } else {
            newText += getRandomChar();
          }
        }
        element.innerText = newText;
      }, i * (duration / iterations));
    }

    tl.add((): void => {
      element.innerText = originalText;
    }, duration);
  };

  interface ScrambleAnimationParams {
    id: string;
  }

  const stopScrambleAnimation = ({ id }: ScrambleAnimationParams): void => {
    if (!labelRefs.current[id] || typeof window === 'undefined') return;

    const element = labelRefs.current[id];
    element.innerText = navLinks.find(link => link.id === id)?.label || '';

    if (id in scrambleTimelines.current) {
      scrambleTimelines.current[id].kill();
    }
  };

  return (
    <nav
      className={`fixed bottom-3 mb-5 lg:mb-5   lg:bottom-6 w-full z-50 transition-all duration-500 ${showNav ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
    >
      <div className="container mx-auto lg:px-0 px-4">
        <div
          className={`
            w-full dark:bg-blue-500/20 shadow-md dark:shadow-sky-500 shadow-orange-700 bg-gray-500/20 backdrop-blur-sm p-2 rounded-full max-w-[220px] mx-auto px-4 
            flex justify-between items-center text-white border border-white/10 
             transition-all duration-300
            ${isExpanded ? 'scale-105' : 'scale-100'}
            relative
          `}
        >
          {/* Animated background pulse effect */}
          <div className={`
            absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-600/10
            transition-opacity duration-500 ease-in-out rounded-full
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}></div>

          {/* Animated light beam effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className={`
              w-32 h-[300px] bg-white/10 
              rotate-45 absolute -top-[250px] -left-20
              transition-transform duration-1000
              ${isExpanded ? 'translate-y-[400px] translate-x-[400px]' : ''}
            `}></div>
          </div>

          {/* Nav items */}
          <div className="flex justify-between items-center w-full relative z-10 py-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeLink === link.id;
              const isHovered = hoverLink === link.id;

              return (
                <div
                  key={link.id}
                  className="relative group cursor-pointer flex flex-col items-center justify-center"
                  onMouseEnter={() => {
                    setHoverLink(link.id);
                    startScrambleAnimation({ id: link.id });
                  }}
                  onMouseLeave={() => {
                    setHoverLink(null);
                    stopScrambleAnimation({ id: link.id });
                  }}
                >
                  <Link
                    to={link.path}
                    onClick={() => handleLinkClick(link.id)}
                    className="flex items-center justify-center"
                  >
                    {/* Icon container with glow effect */}
                    <div className={`
                      w-14 h-10 rounded-full transition-all duration-300 
                      flex items-center justify-center
                      ${isActive ? 'bg-gradient-to-br from-orange-500 to-purple-600' : 'bg-black/40'} 
                      ${isHovered && !isActive ? 'bg-gradient-to-br from-orange-400/80 to-purple-500/80' : ''}
                      transform transition-transform duration-300
                      ${isHovered ? 'scale-110' : 'scale-100'}
                      relative overflow-hidden
                      border dark:border-white/20 border-black/50 bg-transparent dark:bg-slate-400/20 shadow-md dark:shadow-blue-500 shadow-orange-900
                    `}>
                      {/* Pulsing animation for active or hovered item */}
                      <div className={`
                        absolute inset-0 rounded-full 
                        ${isActive || isHovered ? 'animate-pulse bg-blue-400/30' : ''}
                        ${isActive ? 'shadow-sm shadow-orange-500/50' : ''}
                        ${isHovered ? 'shadow-sm shadow-orange-500/30' : ''}
                      `}></div>

                      {/* Rotating outer circle for active item */}
                      {isActive && (
                        <div className="absolute inset-[-3px] rounded-full border border-dashed border-orange-400/30 animate-spin-slow"></div>
                      )}

                      <div
                        className={`
                          text-xl transition-all duration-300 z-10
                          ${isActive ? 'text-white' : 'text-gray-600/70 '}
                          ${isHovered ? 'text-blue-300 ' : 'dark:text-white text:blue-500  '}
                        `}
                      >
                        <Icon />
                      </div>
                    </div>
                  </Link>

                  {/* Label tooltip with scramble effect positioned above with sufficient space */}
                  <div
                    className={`
                      absolute pointer-events-none left-1/2 transform -translate-x-1/2 -top-14
                      transition-all duration-300 min-w-max
                      ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
                    `}
                  >
                    <div className="flex flex-col items-center">
                      <span
                        ref={el => labelRefs.current[link.id] = el}
                        className={`
                          px-3 py-1 rounded-xl shadow-md  dark:shadow-blue-500  text-md font-medium tracking-wider font-mono
                          ${isActive ? 'bg-orange-500/70 text-white ' : 'bg-slate-500/80 text-white '}
                          shadow-lg scramble-text
                        `}
                      >
                        {link.label}
                      </span>
                      {/* Triangle pointer */}
                      <div
                        className={`
                          h-2 w-2 rotate-45 mt-0.5
                          ${isActive ? 'bg-orange-500/70' : 'bg-slate-500/80'}
                        `}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Add this to your CSS or Tailwind config
const customStyles = `
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 10s linear infinite;
}

.scramble-text {
  font-family: monospace;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
`;

// Append the styles to head or include them in your global CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = customStyles;
  document.head.appendChild(style);
}

export default Nav;