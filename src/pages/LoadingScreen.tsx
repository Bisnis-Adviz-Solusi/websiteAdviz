import { useEffect, useState, Dispatch, SetStateAction, useRef } from "react";

// Custom split text implementation (no need for GSAP plugin)
const createSplitText = (text: string) => {
  return text.split('').map((char, index) => (
    <span 
      key={index} 
      className="inline-block transition-all duration-300 hover:text-orange-400 hover:scale-110"
      style={{ 
        animationDelay: `${index * 0.04}s`,
        opacity: 0,
        transform: 'translateY(20px)',
        animation: 'fadeInUp 0.5s forwards'
      }}
    >
      {char}
    </span>
  ));
};

const LoadingScreen = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [fadeOut, setFadeOut] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  
  // Loading messages
  const messages = [
    "Initializing...",
    "Loading modules...",
    "Preparing interface...",
    "Almost ready..."
  ];

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 1200);
    }, 4000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Fade out animation
  useEffect(() => {
    if (fadeOut && containerRef.current) {
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transition = "opacity 1s ease-in-out";
    }
  }, [fadeOut]);

  // Rotate logo animation
  useEffect(() => {
    const logoInner = logoRef.current?.querySelector('.logo-inner');
    if (logoInner) {
      logoInner.classList.add('animate-spin-slow');
    }
    
    // Subtle floating animation for the logo
    if (logoRef.current) {
      const animate = () => {
        const y = 5 * Math.sin(Date.now() / 1000);
        if (logoRef.current) {
          logoRef.current.style.transform = `translateY(${y}px)`;
        }
        requestAnimationFrame(animate);
      };
      
      const animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
  }, []);

  // Cycle through loading messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2000);
    
    return () => clearInterval(messageInterval);
  }, [messages.length]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1f1f1f] to-[#121212] overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          />
        ))}
      </div>

  

      {/* Animated Logo */}
      <div 
        ref={logoRef} 
        className="w-44 h-44 mb-12 relative flex items-center justify-center transition-transform duration-1000"
      >
        <div className="logo-inner w-full h-full relative">
          <div className="absolute inset-0 rounded-full border-8 border-orange-500 opacity-30"></div>
          <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-orange-400 opacity-60 animate-spin-slow"></div>
          <div className="absolute inset-4 rounded-full border-8 border-r-transparent border-orange-300 animate-spin-reverse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-extrabold text-orange-500">V</span>
          </div>
        </div>
      </div>

      {/* Loading text with split text animation */}
      <div className="text-xl text-white font-medium mt-4">
        {createSplitText(messages[messageIndex])}
      </div>

      {/* Loading progress bar */}
      <div className="w-64 h-1 bg-gray-700 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-orange-500 animate-progress-bar"></div>
      </div>
    </div>
  );
};



export default LoadingScreen;