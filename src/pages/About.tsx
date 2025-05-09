import React, { useEffect, useRef,  } from "react";
import { Users, Target, ChartLine, Award, Globe,} from 'lucide-react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import herovid from "@/assets/herrovid4.mp4";
import { TypeAnimation } from "react-type-animation";
import { Footer } from "@/components";
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const BusinessConsultantSection = () => {
  const smoother = useRef<ScrollSmoother | null>(null);
  const smoothWrapper = useRef(null);
  const smoothContent = useRef(null);
  const heroSection = useRef<HTMLElement | null>(null);
  const strategicSection = useRef<HTMLElement | null>(null);
  const leadershipSection = useRef(null);
  const pathRefs = useRef<SVGPathElement[]>([]);
  const teamRefs = useRef<HTMLDivElement[]>([]);

  // Add refs to the pathRefs array
  const addToPathRefs = (el: SVGPathElement | null): void => {
    if (el && !pathRefs.current.includes(el)) {
      pathRefs.current.push(el);
    }
  };

  // Add refs to the teamRefs array
  const addToTeamRefs = (el: HTMLDivElement | null): void => {
    if (el && !teamRefs.current.includes(el)) {
      teamRefs.current.push(el);
    }
  };

  const companyTeam = [
    { 
      name: "Edric Kurniadi", 
      position: "CEO", 
      image: "https://static.wixstatic.com/media/35ce7a_7671fca6c89747af9aceb2cba91a3289~mv2.png/v1/fill/w_353,h_431,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Edric%20Kurniadi.png",
      bio: "An experienced leader with years in business consulting"
    },
    { 
      name: "Tasya",  
      position: "Software Engineer", 
      image: "https://media.licdn.com/dms/image/v2/D5603AQEB7uXeRAMsLg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730348713548?e=1743638400&v=beta&t=iRJFzXDBt2DQl-QODnWtIUjRYQZhDqx3FAmsoPy0zy8",
      bio: "Expert in global business strategies and digital transformation"
    },
    { 
      name: "Rizny Ananda",  
      position: "Marketing Director", 
      image: "/api/placeholder/400/400",
      bio: "Strategic visionary with a proven track record in market expansion"
    }
  ];

  const achievements = [
    { number: "95%", text: "Client Satisfaction" },
    { number: "150+", text: "Successful Projects" },
    { number: "25+", text: "Global Markets" },
    { number: "50+", text: "Industry Experts" }
  ];

  // Initialize ScrollSmoother and GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create ScrollSmoother instance
      smoother.current = ScrollSmoother.create({
        wrapper: smoothWrapper.current,
        content: smoothContent.current,
        smooth: 4.5,
        effects: true,
        normalizeScroll: true
      });

      // Hero section animation
      if (heroSection.current) {
        gsap.fromTo(
          heroSection.current.querySelector("h1"),
          { opacity: 0, y: 100 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.5,
            ease: "power3.out"
          }
        );

        // Animate text gradient
        gsap.to(heroSection.current.querySelector("h1"), {
          backgroundPosition: "200% center",
          duration: 15,
          repeat: -1,
          ease: "none"
        });
      }

      // SVG path animations
      pathRefs.current.forEach((path, index) => {
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { 
            strokeDasharray: length,
            strokeDashoffset: length 
          });

          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2 + index * 0.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: path,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1
            }
          });
        }
      });

      // Strategic section cards animation
      if (strategicSection.current) {
        const strategicCards = strategicSection.current.querySelectorAll(".strategy-card");

        strategicCards.forEach((card: Element, index: number) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: index * 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%"
              }
            }
          );
        });
      }

      // Team section animations
      teamRefs.current.forEach((member, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: member,
            start: "top 80%"
          }
        });

        tl.fromTo(
          member,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: index * 0.2 }
        ).fromTo(
          member.querySelector(".image-container"),
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.5"
        );
      });

      // Achievements counter animation
      const achievementItems = document.querySelectorAll(".achievement-item");
      achievementItems.forEach((item) => {
        const numberElement = item.querySelector(".number");
        if (!numberElement) return;
        
        const endValue = numberElement.textContent || "0";
        const startValue = 0;
        
        // Remove any non-numeric characters for the counter
        const numericValue = endValue.replace(/\D/g, "");
        
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%"
            },
            onStart: () => {
              const obj = { value: startValue };
              gsap.to(obj, {
                value: parseInt(numericValue),
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  numberElement.textContent = endValue.replace(
                    numericValue,
                    Math.floor(obj.value).toString()
                  );
                }
              });
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={smoothWrapper} className="smooth-wrapper overflow-hidden">
      <div ref={smoothContent} className="smooth-content">
        {/* Background animated pattern */}
        <div className="fixed inset-0 z-0 opacity-90 pointer-events-none">
          <svg viewBox="0 200 1000 1000" className="w-full h-full">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff9933" />
                <stop offset="100%" stopColor="#0066ff" />
              </linearGradient>
              <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff9933" />
                <stop offset="100%" stopColor="#0066ff" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="20" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path 
              ref={addToPathRefs}
              d="M100,300 C300,100 700,100 900,300 S1100,700 900,900 S300,1100 100,900 S-100,500 100,300"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="8"
              filter="url(#glow)"
            />
            <path 
              ref={addToPathRefs}
              d="M300,100 C500,300 500,700 300,900 S-100,700 100,500 S300,-100 300,100"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="10.5"
              filter="url(#glow)"
            />
          </svg>
        </div>
        
        {/* Hero Section */}
        <section 
          ref={heroSection} 
          className="relative min-h-screen flex items-center justify-center overflow-hidden py-56"
          data-speed="0.5"
        > 
        <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          src={herovid} 
        />
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10"></div>
       </div>
          <div className="container -mt-14 mx-auto px-4 text-center z-10">
            <h1 className="text-6xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-200 bg-clip-text text-transparent bg-size-100"
                style={{ backgroundSize: "200% 50%" }}>
              Integrated Business 
              <span className="block mt-2">Consulting Solutions</span>
            </h1>
            
            <p className="text-lg  h-36 md:text-lg text-white  max-w-3xl mx-auto leading-relaxed">
            <TypeAnimation
                        sequence={[
                          " Gain expert insights into balance sheets, income statements, and cash flow reports. Develop practical, hands-on financial analysis skills to make smarter business decisions.",
                        ]}
                        speed={70}
                        className="w-full h-full"
                      />
            </p>
           
            
            <motion.div
           initial={{ opacity: 0, x: -50, rotateY: -30 }}
           animate={{ opacity: 1, x: 10, rotateY: 5 }}
           transition={{ duration: 2.2, type: "tween", bounce: 4.4 }}
            className="flex flex-wrap  justify-center gap-4"
          >
              <button className="px-8 py-4 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 text-white rounded-full text-lg font-semibold hover:shadow-lg transform hover:translate-y-1 transition-all">
                Get Started
              </button>
              <button className="px-8 py-4 bg-white  border border-orange-500 text-orange-600 dark:text-orange-400 rounded-full text-lg font-semibold hover:shadow-lg transform hover:translate-y-1 transition-all">
                Learn More
              </button>
              
            </motion.div>
         
          </div>
        </section>
        
        {/* Strategic Goals Section */}
        <section 
          ref={strategicSection} 
          className="py-24 bg-gradient-to-b from-white to-orange-100/20 dark:from-gray-900 dark:to-orange-900/20"
          data-speed="0.9"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 dark:text-white">
              <span className="relative dark:text-white text-black">
                Strategic Business Goals
                <span className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-green-500 rounded-full"></span>
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Strategic Goals */}
              <div className="strategy-card p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl dark:shadow-orange-900/10 transition-all duration-300 border-t-4 border-orange-600">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-orange-600 to-orange-600 rounded-xl shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold dark:text-white">Business Objectives</h3>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur reiciendis quas commodi, vel dolores facilis amet eligendi incidunt tempore nostrum iure minima accusantium natus delectus sint.
                </p>
                <ul className="space-y-3">
                  {['Market expansion strategy', 'Revenue growth acceleration', 
                    'Operational efficiency', 'Digital transformation'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vision & Mission */}
              <div className="strategy-card p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl dark:shadow-green-900/10 transition-all duration-300 border-t-4 border-green-600">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-green-600 to-orange-600 rounded-xl shadow-lg">
                    <ChartLine className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold dark:text-white">Vision & Mission</h3>
                </div>

                <div className="space-y-8">
                  <div className="border-l-4 border-orange-500 dark:border-orange-400 pl-4">
                    <h4 className="text-xl font-semibold mb-2 dark:text-gray-100">Our Vision</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod amet iste minima dolorum, similique neque.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 dark:border-green-400 pl-4">
                    <h4 className="text-xl font-semibold mb-2 dark:text-gray-100">Our Mission</h4>
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
              </div>
            </div>
          </div>
        </section>
        
        {/* Achievements Section */}
        <section className="py-24 bg-gradient-to-r from-orange-600 to-orange-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-item text-center">
                  <div className="text-5xl md:text-6xl font-bold mb-2 number">
                    {achievement.number}
                  </div>
                  <div className="text-lg md:text-xl opacity-90">
                    {achievement.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
{/* Leadership Team */}
<section 
  ref={leadershipSection} 
  className="py-24 bg-gradient-to-b from-orange-50/20 to-orange-200 dark:from-orange-900/20 dark:to-blue-900"
  data-speed="0.9"
>
  <div className="container mx-auto px-4">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 dark:text-white">
      <span className="relative">
        Executive Leadership
        <span className="absolute -bottom-3 left-0 right-0 bg-gradient-to-r from-orange-600 to-orange-600 rounded-full"></span>
      </span>
    </h2>

    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {companyTeam.map((member, index) => (
        <div 
          key={index}
          ref={addToTeamRefs}
          className="group relative overflow-hidden rounded-3xl shadow-lg shadow-orange-600 dark:shadow-blue-600 transition-shadow duration-500 hover:shadow-2xl"
        >
          <div className="absolute  inset-0">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover scale-110"
              data-speed="0.9"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-700/90 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>
          <div className="relative p-10 text-center z-10 flex flex-col justify-end h-96">
            <h3 className="text-2xl font-bold text-white">{member.name}</h3>
            <p className="text-orange-300 font-medium mb-2">{member.position}</p>
            <p className="text-gray-200">{member.bio}</p>
            <div className="mt-4 flex gap-2 justify-center">
              {['linkedin', 'twitter', 'mail'].map((social, i) => (
                <button key={i} className="p-2 rounded-full bg-gray-200/20 hover:bg-gray-200/40 transition-colors">
                  <span className="sr-only">{social}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

        
        {/* Global Structure */}
        <section className=" relative py-20 bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-orange-900/20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">
              <span className="relative">
                Global Structure
               
              </span>
            </h2>
            
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <Users />, 
                  title: 'Professional Network',
                  text: '50+ Professional Consultants with expertise in various business domains' 
                },
                { 
                  icon: <Globe />, 
                  title: 'Global Presence',
                  text: 'Operations in 25+ cities across multiple continents' 
                },
                { 
                  icon: <Award />, 
                  title: 'Client Success',
                  text: '95% Client Retention Rate with ongoing partnerships' 
                }
              ].map((item, i) => (
                <div key={i} className="strategy-card p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl dark:shadow-orange-900/10 transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-br from-orange-600 to-green-500 rounded-xl shadow-lg mb-6">
                      {React.cloneElement(item.icon, { className: 'w-8 h-8 text-white' })}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-10 opacity-90">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia iusto debitis nobis.
            </p>
            <button className="px-8 py-4 bg-white text-orange-600 rounded-full text-lg font-semibold hover:shadow-lg transform hover:translate-y-1 transition-all">
              Contact Us Today
            </button>
          </div>
        </section>
        <Footer/>
      </div>
     
    </div>
  );
};

export default BusinessConsultantSection;