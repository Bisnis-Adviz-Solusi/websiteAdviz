import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Users, ArrowRight, CheckCircle } from 'lucide-react';
import React from 'react';



const ScrollLine = React.memo(({ scroll }: { scroll: number }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const strokeColor = useMemo(() => {
    const endColor = [128, 0, 255];
    const startColor = [255, 165, 0];
    
    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * scroll);
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * scroll);
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * scroll);
    
    return `rgb(${r},${g},${b})`;
  }, [scroll]);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      <svg
        viewBox="0 10 150 150"
        className="w-full h-full"
        style={{ filter: "url(#glow)" }}
      >
        <path
          ref={pathRef}
          d="M 0,0 C 150,50 150,150 50,100 S -50,50 50,0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - scroll * pathLength}
        />
        <path
          ref={pathRef}
           d="M 0,60 C 150,20 150,150 -20,100 S -20,40 0,0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={1}
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - scroll * pathLength}
        />
        <path
          ref={pathRef}
           d="M 150,10 C 50,0 150,150 -30,100 S -30,30 30,0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - scroll * pathLength}
        />
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
            <feMerge>
              <feMergeNode />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
});
const OurServices = () => {
  const [activeService, setActiveService] = useState(0);
  const [scroll, setScroll] = useState(0);
    const rafId = useRef<number>();
    const totalHeightRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const calculateDimensions = () => {
        totalHeightRef.current = document.documentElement.scrollHeight - window.innerHeight;
      };
  
      calculateDimensions();
      window.addEventListener('resize', calculateDimensions);
  
      const handleScroll = () => {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
        
        rafId.current = requestAnimationFrame(() => {
          const progress = window.scrollY / totalHeightRef.current;
          setScroll(Math.min(1, Math.max(0, progress)));
        });
      };
  
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', calculateDimensions);
        if (rafId.current) cancelAnimationFrame(rafId.current);
      };
    }, []);

  // Service data configuration
  const services = [
    {
      icon: <DollarSign className="w-16 h-16" aria-label="Financial Consultant Icon" />,
      title: "Financial Consultant",
      description: "Optimize your financial strategy and growth",
      features: [
        "Financial Planning",
        "Investment Advisory",
        "Risk Management",
        "Tax Optimization"
      ],
      color: "from-green-500 to-green-600 dark:from-green-400 dark:to-green-500"
    },
    {
      icon: <Users className="w-16 h-16" aria-label="HR Management Consultant Icon" />,
      title: "HR Management Consultant",
      description: "Enhance your workforce and organizational effectiveness",
      features: [
        "Talent Acquisition",
        "Employee Engagement",
        "Performance Management",
        "HR Compliance"
      ],
      color: "from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500"
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120 }
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full py-16 md:py-24"
      ref={containerRef}
    >
      <div className="container mx-auto px-4 md:px-8">
      <ScrollLine scroll={scroll} />
        {/* Section Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="max-w-4xl mt-24 mx-auto text-center mb-12 md:mb-20"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent"
          >
            Our Professional Services
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            Transform your business with our expert solutions tailored to your unique needs
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden group  rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-300 
                ${activeService === index 
                  ? 'ring-4 ring-opacity-50 ring-blue-500 dark:ring-blue-400 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700' 
                  : 'bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-700/50'
                }`}
              onClick={() => setActiveService(index)}
            >
              {/* Animated background gradient */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 dark:opacity-10`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />  
             

              <div className="relative z-10 text-center space-y-4 md:space-y-6 ">
                {/* Icon Container */}
                <motion.div 
                  className="inline-flex  items-center justify-center rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-600 p-5 shadow-lg"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  {service.icon}
                </motion.div>
              <div className="absolute group-hover:-top-1 group-hover:right-72 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-700 right-12 top-12 bg-yellow-500/20"></div>
              <div className="absolute group-hover:-top-1 group-hover:right-72 z-10 w-12 h-12 rounded-full group-hover:scale-150  duration-700 right-20 -top-6 bg-orange-500/20"></div>
              <div className="absolute group-hover:-top-1 group-hover:right-72 z-10 w-8 h-8   rounded-full group-hover:scale-150  duration-700 right-32 top-6 bg-pink-500/20"></div>
              <div className="absolute group-hover:-top-1 group-hover:right-72 z-10 w-4 h-4   rounded-full group-hover:scale-150  duration-700 right-2 top-12 bg-red-600/20"></div>

                {/* Service Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 md:text-lg">
                    {service.description}
                  </p>
                </div>

                {/* CTA Button */}
                <motion.button 
                  whileHover={{ x: 10 }}
                  className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-2 transition-all mx-auto group/button"
                >
                  <span className="group-hover/button:text-blue-700 dark:group-hover/button:text-blue-300">
                    Explore Service
                  </span>
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                  >
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Service Details */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="rounded-2xl shadow-xl p-6 md:p-12 max-w-6xl mx-auto bg-gradient-to-br from-blue-50/50 to-green-50/50 dark:from-blue-900/50 dark:to-green-900/50  hover:shadow-2xl dark:shadow-gray-800/30 transition-shadow relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-green-50/30 dark:from-blue-900/20 dark:to-green-900/20" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column - Service Overview */}
              <div className="text-center lg:text-left space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${services[activeService].color} text-white shadow-lg mx-auto lg:mx-0`}
                >
                  {React.cloneElement(services[activeService].icon, { className: 'w-12 h-12' })}
                </motion.div>

                <div className="space-y-4">
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white"
                  >
                    {services[activeService].title}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 dark:text-gray-300 md:text-lg"
                  >
                    {services[activeService].description}
                  </motion.p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-br from-blue-600 to-green-500 dark:from-blue-500 dark:to-green-400 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300 inline-flex items-center gap-3 mx-auto lg:mx-0"
                >
                  <span className="text-base md:text-lg font-medium">Start Your Journey</span>
                  <motion.div
                    animate={{ x: [0, 8, 0], rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
                  </motion.div>
                </motion.button>
              </div>

              {/* Right Column - Key Features */}
              <div className="space-y-6">
                <motion.h4 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white text-center lg:text-left"
                >
                  Key Features
                </motion.h4>
                
                <ul className="grid grid-cols-1 gap-3 md:gap-4">
                  {services[activeService].features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-3 p-3 md:p-4 rounded-lg md:rounded-xl bg-white dark:bg-gray-700 shadow-md hover:shadow-lg dark:hover:shadow-gray-600/50 transition-all"
                    >
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-200 md:text-lg">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default OurServices;