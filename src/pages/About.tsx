import React, { useEffect, useRef, useState, useMemo } from "react";
import { Users, Target, Building, ChartLine } from 'lucide-react';
import { motion } from 'framer-motion';


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
            <feGaussianBlur stdDeviation="28" />
            <feMerge>
              <feMergeNode />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
});

const BusinessConsultantSection = () => {

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

  const companyTeam = [
    { 
      name: "Edric Kurniadi", 
      position: "CEO", 
      image: "https://static.wixstatic.com/media/35ce7a_7671fca6c89747af9aceb2cba91a3289~mv2.png/v1/fill/w_353,h_431,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Edric%20Kurniadi.png",
      bio: "An experienced leader with years in business consulting"
    },
    { 
      name: "Tasya",  
      position: "Chief IT Officer", 
      image: "https://media.licdn.com/dms/image/v2/D5603AQEB7uXeRAMsLg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730348713548?e=1743638400&v=beta&t=iRJFzXDBt2DQl-QODnWtIUjRYQZhDqx3FAmsoPy0zy8",
      bio: "Expert in global business strategies and digital transformation"
    }
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div  ref={containerRef}>
        <ScrollLine scroll={scroll} />
    <div className="container mx-auto px-4 py-16 ">
        
      {/* Main Section */}
    
      <section className="mb-24 mt-28 ">
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent"
        >
          Integrated Business Consulting Solutions
        </motion.h1>

        <div  className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Strategic Goals */}
          <motion.div 
            variants={fadeInVariants}
            className="p-8 rounded-2xl bg-gradient-to-br from-blue-50/90 to-green-50/90 dark:from-blue-900/90 dark:to-green-900/90 shadow-xl hover:shadow-2xl dark:shadow-gray-800/30 transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-blue-600 dark:bg-blue-400 rounded-xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold dark:text-white">Strategic Business Goals</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur reiciendis quas commodi, vel dolores facilis amet eligendi incidunt tempore nostrum iure minima accusantium natus delectus sint.
            </p>
          </motion.div>

          {/* Vision & Mission */}
          <motion.div 
            variants={fadeInVariants}
            className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl dark:shadow-gray-800/50 transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-green-600 dark:bg-green-400 rounded-xl">
                <ChartLine className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold dark:text-white">Vision & Mission</h2>
            </div>

            <div className="space-y-8">
              <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-4">
                <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod amet iste minima dolorum, similique neque.
                </p>
              </div>

              <div className="border-l-4 border-green-500 dark:border-green-400 pl-4">
                <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Our Mission</h3>
                <ul className="space-y-3">
                  {['Drive digital transformation', 'Empower data-driven decisions', 
                    'Foster innovation culture', 'Deliver measurable results'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full" />
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <motion.h2 
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="text-4xl font-bold text-center mb-16 dark:text-white"
        >
          Executive Leadership
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {companyTeam.map((member, index) => (
            <motion.div 
              key={index}
              variants={fadeInVariants}
              className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl dark:shadow-gray-800/50 transition-all"
            >
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors" />
              <div className="flex flex-col items-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-48 h-48 rounded-full object-cover mb-6 shadow-lg border-4 border-white dark:border-gray-800"
                />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{member.position}</p>
                <p className="text-gray-600 dark:text-gray-300 text-center">{member.bio}</p>
              </div>
            </motion.div>
          ))}

          {/* Organizational Structure */}
          <motion.div 
            variants={fadeInVariants}
            className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/50 dark:to-blue-900/50 shadow-xl dark:shadow-gray-800/30"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-purple-600 dark:bg-purple-400 rounded-xl">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold dark:text-white">Global Structure</h3>
            </div>

            <ul className="space-y-6">
              {[
                { icon: <Users />, text: '50+ Professional Consultants' },
                { icon: <ChartLine />, text: '25+ Citys Coverage' },
                { icon: <Target />, text: '95% Client Retention Rate' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm dark:shadow-none">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    {React.cloneElement(item.icon, { className: 'w-6 h-6 text-purple-600 dark:text-purple-400' })}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </div>

    </div>
  );
};

export default BusinessConsultantSection;