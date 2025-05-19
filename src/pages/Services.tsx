import { useEffect, useRef, useState } from "react";
import { DollarSign, Users, ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from "gsap/all";
import { BottomNav, Footer, Navbar } from "@/components";
import herovid3 from "@/assets/herrovid2.mp4";
import { AnimatePresence,motion } from "framer-motion";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

const OurServices = () => {
  const [activeService, setActiveService] = useState(0);
  const smoother = useRef<ScrollSmoother | null>(null);
  const smoothWrapper = useRef(null);
  const smoothContent = useRef(null);
  const sectionRef = useRef(null);
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const featureItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const detailsSectionRef = useRef(null);
  const processStepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaSectionRef = useRef(null);
  
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
      color: "from-green-500 to-green-600 dark:from-green-400 dark:to-green-500",
      bgClass: "bg-green-500"
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
      color: "from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500",
      bgClass: "bg-orange-500"
    },
  ];

  // Initialize ScrollSmoother and GSAP animations
  useEffect(() => {
    // Create ScrollSmoother instance
    if (typeof window !== 'undefined' && smoothWrapper.current && smoothContent.current) {
      smoother.current = ScrollSmoother.create({
        wrapper: smoothWrapper.current,
        content: smoothContent.current,
        smooth: 3.5,
        effects: true, 
        normalizeScroll: true,
        ignoreMobileResize: true, 
      });
    }

    // Initial animations that play on page load
    const tl = gsap.timeline();
    
    // Staggered entrance for header elements
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 80 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2,
          ease: "power3.out" 
        }
      );
    }

    // Service cards animation with 3D effect
    serviceCardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, rotationX: 10 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 0.8, 
          delay: 0.4 + (index * 0.15), 
          ease: "back.out(1.7)"
        }
      );
    });

    // ScrollTrigger animations

    // Details section reveal
    gsap.fromTo(
      detailsSectionRef.current,
      { opacity: 0, y: 100, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: detailsSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Process steps staggered entrance
    processStepsRef.current.forEach((step, index) => {
      gsap.fromTo(
        step,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Testimonials floating animation
    testimonialRefs.current.forEach((testimonial, index) => {
      // Initial appear animation
      gsap.fromTo(
        testimonial,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonial,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Subtle floating animation
      gsap.to(testimonial, {
        y: "10px",
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // CTA section reveal with glow effect
    gsap.fromTo(
      ctaSectionRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );

    // Add a subtle glow pulse to CTA
    gsap.to(ctaSectionRef.current, {
      boxShadow: "0 0 30px 5px rgba(59, 130, 246, 0.3)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Scroll indicator bounce animation
    gsap.to(".scroll-indicator", {
      y: "10px",
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      // Clean up ScrollTrigger when component unmounts
      if (smoother.current) {
        smoother.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Update animations when active service changes
  useEffect(() => {
    if (featureItemsRef.current.length) {
      // Reset refs array to avoid duplicates
      featureItemsRef.current = [];
      
      // Delay slightly to ensure DOM is updated
      setTimeout(() => {
        // Animate feature items with staggered reveal
        gsap.fromTo(
          document.querySelectorAll(".feature-item"),
          { opacity: 0, x: -30, scale: 0.9 },
          { 
            opacity: 1, 
            x: 0, 
            scale: 1,
            duration: 0.5, 
            stagger: 0.1, 
            ease: "back.out(1.5)"
          }
        );
      }, 50);
    }
  }, [activeService]);

  interface ServiceAnimationProps {
    scale: number;
    boxShadow: string;
    y: number;
    duration: number;
    ease: string;
  }

  const handleServiceHover = (index: number): void => {
    gsap.to(serviceCardsRef.current[index], {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      y: -10,
      duration: 0.4,
      ease: "power2.out"
    } as ServiceAnimationProps);
  };

  interface ServiceAnimationProps {
    scale: number;
    boxShadow: string;
    y: number;
    duration: number;
    ease: string;
  }

  const handleServiceLeave = (index: number): void => {
    gsap.to(serviceCardsRef.current[index], {
      scale: 1,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    } as ServiceAnimationProps);
  };

  const scrollToDetails = () => {
    if (smoother.current) {
      smoother.current.scrollTo(detailsSectionRef.current, true, "center center");
    }
  };

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(SplitText);
  }

  const splitTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!splitTextRef.current) return;
  
    const split = new SplitText(splitTextRef.current, {
      type: "chars,words",
    });
  
    // Initial Animasi: masuk dari bawah secara stagger
    gsap.from(split.chars, {
      yPercent: 100,
      opacity: 0,
      duration: 0.6,
      stagger: 0.02,
      ease: "back.out(1.7)",
    });
  
    // Animasi Hover (trigger saat mouse masuk & keluar)
    const hoverEnter = () => {
      gsap.to(split.chars, {
        yPercent: -30,
        color: "#F97316", 
        duration: 0.3,
        stagger: 0.01,
        ease: "power2.out",
      });
    };
  
    const hoverLeave = () => {
      gsap.to(split.chars, {
        yPercent: 0,
        color: "",
        duration: 0.3,
        stagger: 0.01,
        ease: "power2.inOut",
      });
    };
  
    const currentEl = splitTextRef.current;
    currentEl.addEventListener('mouseenter', hoverEnter);
    currentEl.addEventListener('mouseleave', hoverLeave);
  
    return () => {
      split.revert();
      currentEl.removeEventListener('mouseenter', hoverEnter);
      currentEl.removeEventListener('mouseleave', hoverLeave);
    };
  }, []);
  


  return (
    <div ref={smoothWrapper} className="smooth-wrapper overflow-hidden">
       <Navbar/>
  <BottomNav/>
      <div ref={smoothContent} className="smooth-content">
        <section 
          ref={sectionRef}
          className="w-full  bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative"
        >
          <div className="container ">
            {/* Section Header with enhanced design */}
            
            <div 
              ref={headerRef}
              className="max-w-full mx-full h-screen text-center"
              data-speed="0.9"
            ><div className="absolute inset-0 z-0">
            <video
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                  playsInline
                  controls={false}
                  disablePictureInPicture
                  src={herovid3} 
            />
            {/* Overlay gradient for better text visibility */}
            <div className="absolute inset-0  bg-gradient-to-t item-center   from-black/90 to-black/40"></div>
           </div>
           <div className="z-10 relative flex flex-col items-center justify-center h-full"
             >
              <span className="inline-block px-4 py-2 rounded-full bg-orange-900 text-orange-300 text-sm font-medium mb-6 transform transition-all hover:scale-105">
                Professional Solutions
              </span>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-600 via-orange-500 to-green-500 dark:from-orange-400 dark:via-orange-400 dark:to-green-400 bg-clip-text text-transparent">
                Our Expert Services
              </h2>
              
              <p
  ref={splitTextRef}
  className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-3xl mx-auto cursor-pointer"
>
  Transform your business with our comprehensive suite of expert solutions tailored to your unique challenges and opportunities.
</p>

           </div>

              {/* Scroll indicator */}
              <div className="scroll-indicator absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center mt-16 cursor-pointer" onClick={scrollToDetails}>
                <span className="text-gray-500 dark:text-gray-400 text-sm mb-2">Scroll to explore</span>
                <ChevronDown className="w-6 h-6 text-orange-500 dark:text-orange-400" />
              </div>
            </div>

            {/* Services Grid with enhanced cards */}
            <div 
              className="grid grid-cols-1 md:grid-cols-2 item-center gap-8 md:gap-10 mb-20 md:mb-32"
              data-speed="1.25"
            >
              {services.map((service, index) => (
                <div
                key={index}
                ref={el => serviceCardsRef.current[index] = el}
                className={`group relative overflow-hidden rounded-3xl mx-14 p-8 md:p-10 cursor-pointer transition-all duration-500 
                  backdrop-blur-sm ${activeService === index 
                    ? 'ring-4 ring-opacity-70 ring-orange-500 dark:ring-orange-400 bg-white/90 dark:bg-gray-800/90 shadow-2xl shadow-orange-500/20' 
                    : 'bg-white/80 dark:bg-gray-800/80 shadow-xl hover:shadow-2xl'
                  }`}
                onClick={() => {
                  setActiveService(index);
                  scrollToDetails();
                }}
                onMouseEnter={() => handleServiceHover(index)}
                onMouseLeave={() => handleServiceLeave(index)}
              >
              
                  {/* Enhanced background elements */}
                  <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-10 blur-2xl ${service.bgClass}`}></div>
                  <div className={`absolute -top-20 -left-20 w-40 h-40 rounded-full opacity-10 blur-xl ${service.bgClass}`}></div>
                  
                  <div className="relative z-10 text-center space-y-6">
                    {/* Icon Container with improved styling */}
                    <div 
                      className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} p-6 shadow-lg text-white transform transition-all duration-500 hover:rotate-3 hover:scale-110`}
                    >
                      {service.icon}
                    </div>
                    <div className="absolute group-hover:-top-1 group-hover:right-96 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-700 right-12 top-12 bg-yellow-500/20"></div>
              <div className="absolute group-hover:-top-1 group-hover:right-96 z-10 w-12 h-12 rounded-full group-hover:scale-150  duration-700 right-20 -top-6 bg-orange-500/20"></div>
              <div className="absolute group-hover:-top-1 group-hover:right-96 z-10 w-8 h-8   rounded-full group-hover:scale-150  duration-700 right-32 top-6 bg-pink-500/20"></div>
              <div className="absolute group-hover:-top-1 group-hover:right-96 z-10 w-4 h-4   rounded-full group-hover:scale-150  duration-700 right-2 top-12 bg-red-600/20"></div>

                    {/* Service Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {service.description}
                      </p>
                    </div>

                    {/* CTA Button with improved animation */}
                    <button 
                      className={`text-orange-600 dark:text-orange-400 font-medium inline-flex items-center gap-2 transition-all mx-auto group relative overflow-hidden px-4 py-2 rounded-lg`}
                    >
                      <span className="relative z-10 group-hover:text-orange-700 dark:group-hover:text-orange-300">
                        Explore Service
                      </span>
                      <ArrowRight className="w-5 h-5 stroke-2 group-hover:translate-x-1 transition-transform relative z-10" />
                      <span className="absolute inset-0 bg-orange-100 dark:bg-orange-900/30 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-lg"></span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Service Details with enhanced visuals */}
            <AnimatePresence mode="wait">
            <motion.div 
              ref={detailsSectionRef}
              className="rounded-3xl shadow-2xl p-8 md:p-16 max-w-6xl mx-auto bg-white/90 dark:bg-gray-800/90 hover:shadow-2xl transition-shadow relative overflow-hidden backdrop-blur-sm"
              data-speed="0.95"
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1, type: 'spring' }}
              key={activeService}
            >
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${services[activeService].color}`} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-800/50 to-transparent opacity-70 background-blur-xl"></div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                {/* Left Column - Service Overview */}
                <div className="text-center lg:text-left space-y-8">
                  <div 
                    className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${services[activeService].color} text-white shadow-lg mx-auto lg:mx-0 transform transition-all hover:rotate-6 hover:scale-105`}
                  >
                    {React.cloneElement(services[activeService].icon, { className: 'w-14 h-14' })}
                  </div>

                  <div className="space-y-5">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                      {services[activeService].title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed">
                      {services[activeService].description}
                    </p>
                  </div>

                  <button 
                    className={`bg-gradient-to-br ${services[activeService].color} text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3 mx-auto lg:mx-0 group relative overflow-hidden`}
                  >
                    <span className="text-lg md:text-xl font-medium relative z-10">Start Your Journey</span>
                    <ArrowRight className="w-6 h-6 md:w-7 md:h-7 stroke-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                  </button>
                </div>

                {/* Right Column - Key Features with enhanced animation */}
                <div className="space-y-8">
                  <h4 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center lg:text-left">
                    Key Features
                  </h4>
                  
                  <ul className="grid grid-cols-1 gap-4 md:gap-5">
                    {services[activeService].features.map((feature, index) => (
                      <li 
                        key={index}
                        className="feature-item flex items-center gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                        ref={el => featureItemsRef.current[index] = el}
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${services[activeService].color}`}>
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-200 text-lg md:text-xl">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            </AnimatePresence>

            {/* Process Section with enhanced visuals */}
            <div className="mt-32 max-w-6xl mx-auto" data-speed="1.05">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-sm font-medium mb-4">
                  Our Approach
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white" >
                  How We Work With You
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" >
                  Our streamlined process ensures we deliver exceptional results that meet your business needs.
                </p>
              </div>

              <div  className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
                {[
                  {
                    number: "01",
                    title: "Consultation",
                    description: "We start by understanding your business needs and challenges through in-depth discussions.",
                    color: "bg-orange-500"
                  },
                  {
                    number: "02",
                    title: "Strategy Development",
                    description: "Our experts develop a customized strategy tailored to your specific goals and requirements.",
                    color: "bg-green-500"
                  },
                  {
                    number: "03",
                    title: "Implementation & Support",
                    description: "We execute the strategy and provide ongoing support to ensure your continued success.",
                    color: "bg-orange-500"
                  }
                ].map((step, index) => (
                  <div 
                    key={index} 
                    ref={el => processStepsRef.current[index] = el}
                    className="relative  bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 backdrop-blur-sm border border-gray-100 dark:border-gray-700"
                   >
                    <div className={`w-full h-1 ${step.color} absolute top-0 left-0 right-0 rounded-t-2xl`}></div>
                    <div className={`inline-flex ${step.color} text-white text-4xl font-bold rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-lg transform transition-transform hover:rotate-12 hover:scale-110`}>
                      {step.number}
                    </div>
                    <h3  className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{step.title}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300" >{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Section with floating animation */}
            <div className="mt-32 max-w-6xl mx-auto" data-speed="0.95">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 text-sm font-medium mb-4">
                  Client Testimonials
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
                  What Our Clients Say
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  {
                    quote: "The team delivered exceptional results that far exceeded our expectations. Their expertise in financial consulting has been instrumental to our growth.",
                    name: "Sarah Johnson",
                    title: "CEO, TechStart Inc.",
                    color: "border-orange-500",
                    bgGradient: "from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20"
                  },
                  {
                    quote: "Working with their HR management consultants has transformed our talent acquisition process. Highly recommended for any growing business.",
                    name: "Michael Chen",
                    title: "HR Director, Global Solutions",
                    color: "border-green-500",
                    bgGradient: "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20"
                  }
                ].map((testimonial, index) => (
                  <div 
                    key={index} 
                    ref={el => testimonialRefs.current[index] = el}
                    className={`bg-gradient-to-br ${testimonial.bgGradient} backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-l-4 ${testimonial.color} relative overflow-hidden`}
                  >
                    <div className="text-gray-300 dark:text-gray-600 text-8xl font-serif absolute -top-4 left-4 opacity-20">"</div>
                    <div className="relative z-10">
                      <p className="text-gray-700 dark:text-gray-200 mb-8 italic text-lg md:text-xl leading-relaxed">{testimonial.quote}</p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-200">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-800 dark:text-white" >{testimonial.name}</h4>
                          <p className="text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section with enhanced visuals */}

      
            <div 
              ref={ctaSectionRef}
              className="mt-32 text-center bg-gradient-to-r from-orange-600 via-orange-500 to-orange-500 text-white rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden"
              data-speed="1.1"
            >
              {/* Background animated particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 md:w-6 md:h-6 rounded-full bg-white opacity-10"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Transform Your Business?</h2>
                <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">Let our experts help you achieve your business goals with tailored solutions designed for your success.</p>
                <button className="bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl hover:bg-orange-50 transition-all transform hover:-translate-y-1 group relative overflow-hidden">
                  <span className="relative z-10">Schedule a Consultation</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-50 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Custom CSS animations */}
          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-20px) scale(1.2); }
            }
          `}</style>
        </section>
        <Footer/>
      </div>
    </div>
  );
};

export default OurServices;