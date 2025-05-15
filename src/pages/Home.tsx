import { useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
// import { Smartphone, Layers, FileText } from 'lucide-react';
import { BadgeDollarSign, Calculator, Wallet, BadgeEuro, Percent, Handshake, ChartArea, FileLineChart, AlignHorizontalDistributeCenter, Globe, Smartphone, Layers, FileText, LucideIcon } from 'lucide-react';
import { Html, OrbitControls, useProgress } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "@/components/theme-provider";
import { Footer, HillightCard } from '@/components';
import bg from '@/assets/bg6.mp4';
import bg2 from '@/assets/bg8.mp4';


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Scene = () => {
  const gltf = useLoader(GLTFLoader, '/models/adviz.glb');

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[-1.3, 6.0, 4.4]} castShadow intensity={0.8} />

      <primitive
        object={gltf.scene}
        position={[0, -0.5, 0]}
        castShadow
        receiveShadow
      />
      <OrbitControls
        target={[0, -0.1, 0]}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate
        autoRotateSpeed={2}
      />
    </>
  );
};

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="bg-orange-900/80 px-4 py-2 rounded-lg">
        <p className="text-orange-50 font-medium">{progress.toFixed(0)}Adviz</p>
      </div>
    </Html>
  );
};

const FloatingIcon = ({ icon: Icon, color, delay, duration = 10 }: { icon: LucideIcon; color: string; delay: number; duration?: number }) => (
  <motion.div
    initial={{ opacity: 30, y: 30 }}
    animate={{
      opacity: 4,
      y: [0, -20, 0],
      rotate: [0, 10, -30, 0]
    }}
    transition={{
      opacity: { duration: 0.5, delay },
      y: { duration, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: duration * 1.5, repeat: Infinity, ease: "easeInOut" }
    }}
    className={`absolute ${color}`}
  >
    <Icon className="w-10 h-10" />
  </motion.div>
);

const FloatingIcon2 = ({ icon: Icon, color, delay, duration = 6 }: { icon: LucideIcon; color: string; delay: number; duration?: number }) => (
  <motion.div
    initial={{ opacity: 10, y: 10 }}
    animate={{
      opacity: 1,
      y: [0, -10, 0],
      rotate: [0, 40, -30, 0]
    }}
    transition={{
      opacity: { duration: 0.2, delay },
      y: { duration, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: duration * 2.5, repeat: Infinity, ease: "easeInOut" }
    }}
    className={`absolute ${color}`}
  >
    <Icon className="w-10 h-10 font-extralight" />
  </motion.div>
);

const Home = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Refs for GSAP animations
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const model3DRef = useRef(null);
  const featureCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const brandCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize GSAP ScrollSmoother and animations
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2.5,
      effects: true,
      wrapper: smoothWrapperRef.current,
      content: smoothContentRef.current,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    // Hero section animations (keeping the existing animations)
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(
      model3DRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Features section animations - Enhanced
    if (featuresRef.current) {
      // Animate the section title and description
      gsap.fromTo(
        featuresRef.current.querySelector('.feature-heading'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate the feature cards with staggered effect
      featureCardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Animate smartphone brand cards with horizontal entrance
      brandCardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Parallax effect for the background elements
      gsap.to(
        featuresRef.current.querySelector('.bg-gradient-1'),
        {
          y: -100,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      gsap.to(
        featuresRef.current.querySelector('.bg-gradient-2'),
        {
          y: 100,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }

    return () => {
      // Clean up animations
      if (smoother) smoother.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // 

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div ref={smoothWrapperRef} className="smooth-wrapper overflow-hidden">
      <div ref={smoothContentRef} className="smooth-content">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center relative overflow-hidden transition-all duration-300"
          data-speed="0.8"
        >
          {/* Background video that changes based on theme */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
              style={{ opacity: isDarkMode ? 0.3 : 8 }}
              src={isDarkMode ? bg : bg2}
            />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">


              {/* Left Side - Content */}
              <div className="space-y-8">
                <div className="relative">
                  <h1
                    className="text-9xl lg:text-[70px] font-extrabold text-transparent bg-clip-text relative cursor-default tracking-wide"
                    ref={headingRef}
                    data-speed="1.24"
                  >
                    <span className="bg-gradient-to-r dark:from-slate-400 dark:via-slate-200 dark:to-indigo-200 from-indigo-900 via-sky-600 to-indigo-900 bg-clip-text text-transparent">
                      REPORT MADE
                    </span>{' '}
                    <span className="bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 bg-clip-text text-transparent">
                      SIMPLE
                    </span>
                    <span className="absolute -bottom-3 left-0 h-[3px] w-0 bg-gradient-to-r from-transparent dark:via-cyan-400 via-orange-700 to-transparent gsap-underline-1" />
                    <span className="absolute bottom-[-5px] left-0 h-[2px] w-0 bg-gradient-to-r from-transparent dark:orange-400 via-orange-700 to-transparent opacity-70 gsap-underline-2" />

                    <span className="absolute inset-0 blur-md bg-gradient-to-r dark:from-cyan-400/20 dark:to-purple-500/5 from-orange-900/5 to-orange-900/5 gsap-glow" />
                  </h1>
                </div>




                {/* Welcome Text */}
                <div className="mt-4" ref={headingRef} data-speed="1.4">
                  <TypeAnimation
                    sequence={[
                      "SELAMAT DATANG",
                      2000,
                      "WELCOME",
                      2000,
                      "ようこそ",
                      2000,
                      "MABUHAY",
                      2000,
                      "欢迎",
                      2000,
                      "환영합니다",
                      2000,
                      "KARIBU",
                      2000,
                    ]}
                    speed={30}
                    className="text-2xl lg:text-5xl font-extrabold bg-[conic-gradient(var(--tw-gradient-stops))] dark:from-gray-400 dark:via-gray-500 dark:to-gray-400 from-orange-400 via-orange-700 to-orange-400 bg-clip-text text-transparent"
                    repeat={Infinity}
                  />
                </div>

                {/* Main Description */}
                <div className="mt-6" ref={headingRef} data-speed="1.5">
                  <div className="rounded-xl relative">
                    <div className="relative group">
                      <div className="absolute -inset-1 rounded-lg blur opacity-30 group-hover:opacity-95 transition duration-1000" />
                      <span className="absolute top-0 w-1 h-full bg-gradient-to-b from-orange-400 to-orange-600 animate-pulse" />
                      <div className="lg:text-xl h-28 text-gray-500 dark:text-gray-400 pl-3 relative">
                        <span>
                          <TypeAnimation
                            sequence={[
                              "Gain expert insights into balance sheets, income statements, and cash flow reports. Develop practical, hands-on financial analysis skills to make smarter business decisions.",
                            ]}
                            speed={70}
                            className="w-full h-full"
                          />
                        </span>
                      </div>
                      <span className="absolute inset-0 blur-lg bg-gradient-to-r dark:from-cyan-400/20 dark:to-purple-500/20 from-orange-900/0 to-orange-400/0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - 3D Visualization */}
              <div
                ref={model3DRef}
                className="relative h-[680px] w-full ml-10 "
                data-speed="1.9"
              >
                {/* Floating Icons */}
                <FloatingIcon icon={Wallet} color="dark:text-gray-600 text-gray-400 bottom-10 right-40 font-extralight"  delay={0.2}  />
                <FloatingIcon2 icon={BadgeDollarSign} color="dark:text-gray-600 text-gray-400 top-52 left-40" delay={0.7} />
                <FloatingIcon icon={Calculator} color="dark:text-gray-600 text-gray-400 top-60 right-40" delay={0.4} />
                <FloatingIcon icon={Globe} color="dark:text-gray-600 text-gray-400 bottom-20 left-40" delay={0.2} />
                <FloatingIcon icon={BadgeEuro} color="dark:text-gray-600 text-gray-400 top-20 left-40" delay={0.7} />
                <FloatingIcon2 icon={FileLineChart} color="dark:text-gray-600 text-gray-400 top-20 right-40" delay={0.7} />
                <FloatingIcon2 icon={AlignHorizontalDistributeCenter} color="dark:text-gray-600 text-gray-400 bottom-40 right-14" delay={0.4} />
                <FloatingIcon2 icon={Percent} color="dark:text-gray-600 text-gray-400 top-36 right-20" delay={0.2} />
                <FloatingIcon icon={Handshake} color="dark:text-gray-600 text-gray-400 bottom-40 left-40" delay={0.7} />
                <FloatingIcon2 icon={ChartArea} color="dark:text-gray-600 text-gray-400 top-60 left-10" delay={0.4} />

                {/* 3D Canvas */}
                <div className="absolute inset-0"
                  ref={model3DRef}
                  data-speed="2.9"
                >
                  <Canvas
                    camera={{ position: [-0.9, 0.5, 2], fov: 35 }}
                    className="rounded-full"
                  >
                    <Suspense fallback={<Loader />}>
                      <Scene />
                    </Suspense>
                  </Canvas>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={featuresRef}
          className="py-24 px-4 mt-20 lg:px-8 relative overflow-hidden"
        >
          {/* Improved decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="bg-gradient-1 absolute top-0 right-0 w-2/5 h-2/5 bg-gradient-to-br from-orange-500 to-purple-500 rounded-full blur-3xl" />
            <div className="bg-gradient-2 absolute bottom-0 left-0 w-2/5 h-2/5 bg-gradient-to-tr from-pink-500 to-orange-500 rounded-full blur-3xl" />
          </div>

          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto relative">
            {/* Section Header */}
            <div className="text-center mb-20 mt-24 feature-heading">
              <motion.div
                variants={pulseVariants}
                animate="pulse"
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg mb-6"
              >
                <span className="text-5xl font-bold  bg-gradient-to-r  bg-clip-text ">
                  Case Study: BudiPhone
                </span>
              </motion.div>

              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r mt-10 from-orange-400 via-orange-500 to-pink-400 bg-clip-text text-transparent">
                Numbers Tell a Story. Let's Uncover It!
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Do you know that you can tell a story with numbers? Financial reports aren't just about income and expenses - they reveal the real health of a business.
              </p>
            </div>

            {/* Business Introduction Card - Improved */}
            <div
              ref={el => featureCardsRef.current[0] = el}
              className="mb-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-8 feature-item"
            >
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-6 flex items-center">
                <motion.span
                  variants={floatVariants}
                  animate="float"
                  className="inline-flex mr-3 h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-purple-500 shadow-lg"
                >
                  <Smartphone className="h-5 w-5 text-white" />
                </motion.span>
                Meet Pak Budi's Smartphone Empire
              </h3>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Pak Budi is the proud owner of BudiPhone, a thriving smartphone store in town. He has carefully selected three smartphone brands to cater to different customer needs:
              </p>

              {/* Smartphone Brands Cards - New Component */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    name: "Brand A",
                    description: "Premium smartphones with exceptional quality and integration",
                    color: "from-blue-500 to-blue-600",
                    icon: "📲",
                    features: ["Premium build", "Ecosystem integration", "Long-term support"]
                  },
                  {
                    name: "Brand B",
                    description: "Feature-rich devices with cutting-edge technology",
                    color: "from-purple-500 to-indigo-600",
                    icon: "📲",
                    features: ["Versatile features", "Great cameras", "Expandable storage"]
                  },
                  {
                    name: "Brand C",
                    description: "Budget-friendly options without compromising quality",
                    color: "from-green-500 to-teal-600",
                    icon: "📲",
                    features: ["Affordable", "Good performance", "Essential features"]
                  }
                ].map((brand, index) => (
                  <motion.div
                    key={index}
                    ref={el => brandCardsRef.current[index] = el}
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden shadow-lg transition-all duration-300"
                  >
                    <div className={`bg-gradient-to-r ${brand.color} h-2 w-full`}></div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-bold text-gray-700 dark:text-gray-200">{brand.name}</h4>
                        <span className="text-2xl">{brand.icon}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{brand.description}</p>
                      <div className="space-y-2">
                        {brand.features.map((feature, i) => (
                          <div key={i} className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 mr-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                To complement his smartphone sales, Pak Budi also offers essential accessories: chargers, cases, earphones, and more - ensuring that every customer finds everything they need in one place.
              </p>
            </div>

            {/* Let's Dive Into Numbers Section */}
            <div
              ref={el => featureCardsRef.current[1] = el}
              className="text-center mb-16 feature-item"
            >
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-6">Let's Dive Into The Numbers</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Now, let's take a closer look at BudiPhone's financial reports and see if you can uncover the story behind the numbers!
              </p>
            </div>

            {/* Other Information Section - Improved */}
            <div
              ref={el => featureCardsRef.current[2] = el}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-8 overflow-hidden relative feature-item"
            >
              <HillightCard />

              {/* Improved decorative elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />

              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-8 relative z-10">Other Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <motion.div
                  ref={el => featureCardsRef.current[3] = el}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 border border-white/10 p-6 rounded-xl relative overflow-hidden feature-item"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5" />
                  <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6 flex items-center relative z-10">
                    <FileText className="w-5 h-5 mr-2 text-orange-400" /> Profit & Loss Exclusions
                  </h4>

                  <div className="space-y-4 relative z-10">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      For simplicity, the following items are <span className="font-semibold">not included</span> in the Profit & Loss statement examples:
                    </p>

                    {[
                      "Other Income / Expenses",
                      "Income Tax"
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="flex items-center p-3 bg-white/5 border border-white/10 rounded-lg"
                      >
                        <div className={`w-2 h-2 rounded-full bg-orange-500 mr-3`}></div>
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="absolute bottom-4 right-4 w-24 h-24 opacity-20"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="url(#blueGradient)" strokeWidth="8" />
                      <defs>
                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#60A5FA" />
                          <stop offset="100%" stopColor="#7C3AED" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                </motion.div>

                <motion.div
                  ref={el => featureCardsRef.current[4] = el}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 border border-white/10 p-6 rounded-xl relative overflow-hidden feature-item"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5" />
                  <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6 flex items-center relative z-10">
                    <Layers className="w-5 h-5 mr-2 text-pink-400" /> Balance Sheet Elements
                  </h4>

                  <div className="space-y-4 relative z-10">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      In the <span className="font-semibold">Balance Sheet</span>, some elements such as:
                    </p>

                    {[
                      "Prepayments",
                      "Long Term Liabilities"
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="flex items-center p-3 bg-white/5 border border-white/10 rounded-lg"
                      >
                        <div className={`w-2 h-2 rounded-full bg-pink-500 mr-3`}></div>
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className="absolute bottom-4 right-4 w-24 h-24 opacity-20"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="url(#pinkGradient)" strokeWidth="8" />
                      <defs>
                        <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#EC4899" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Home;