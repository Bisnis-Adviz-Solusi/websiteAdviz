import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BadgeDollarSign, Calculator, Wallet, BadgeEuro, Percent, Handshake, ChartArea, FileLineChart, AlignHorizontalDistributeCenter, Globe } from 'lucide-react';
import { Html, OrbitControls, useProgress } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import darkBg from '../assets/bg3.svg';
import { useTheme } from "@/components/theme-provider"; 
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
      <div className="bg-blue-900/80 px-4 py-2 rounded-lg">
        <p className="text-orange-50 font-medium">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
};
const ScrollLine = ({ scroll }: { scroll: number }) => {
  const r = (1 - scroll) * 455 + scroll * 155; // Merah
  const g = (1 - scroll) * 0 + scroll * 455; // Hijau
  const b = (1 - scroll) * 255 + scroll * 0; // Biru
  const strokeColor = `rgb(${r}, ${g}, ${b})`;

  return (
    <svg
      viewBox="50 200 900 150"
      className="w-screen -ml-36   absolute h-full"
      style={{ filter: "url(#glow)" }}
    >
      {/* Multiple glowing paths */}
      {[...Array(3)].map((_, i) => (
        <path
          key={i}
          d={`M 50,${150 + i * 20} 
              C 200,${100 + i * 30} 400,${200 + i * 50} 600,${150 + i * 20} 
              S 900,${100 + i * 50} 1100,${200 + i * 20}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1 + i }
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1000"
          strokeDashoffset={1000 - scroll * 4000}
          style={{
            transition: "stroke-dashoffset 0.4s ease-out, stroke 0.4s ease-out",
          }}
        />
      ))}

    
      

      {/* Enhanced glow effect */}
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="100%">
          <feGaussianBlur stdDeviation="9" result="coloredBlur" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};
const FloatingIcon = ({ icon: Icon, color, delay, duration = 10 }: { icon: React.ElementType; color: string; delay: number; duration?: number }) => (
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
const FloatingIcon2 = ({ icon: Icon, color, delay, duration = 6 }: { icon: React.ElementType; color: string; delay: number; duration?: number }) => (
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
    <Icon className="w-10 h-10" />
  </motion.div>
);




const Herro = () => {
  const { theme } = useTheme(); 
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScroll(Math.min(1, Math.max(0, progress)));
    };

    // Add smooth scroll behavior to document
    document.documentElement.style.scrollBehavior = 'smooth';

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  return (
    <motion.div
    key={theme}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen flex items-center relative overflow-hidden transition-all duration-300"

  >
      {/* Animated Background Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
       
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 mt-24 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl -mt-28 font-bold">
                <span className="bg-orange-500 font-serif text-transparent bg-clip-text">
                  Welcome
                </span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-2 text-orange-500"
                >
                  _
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className=" text-sm lg:text-md leading-relaxed max-w-xl"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#EA580C" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center gap-3 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-orange-700/50 rounded-xl transition-all flex items-center gap-3 hover:border-orange-500/50"
              >
                <Sparkles className="w-5 h-5" />
                Learn More
              </motion.button>
              <ScrollLine scroll={scroll} />
            </motion.div>
          </motion.div>
       
          {/* Right Side - 3D Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[600px] w-full -mt-20"
          >
            {/* Decorative Elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 border-2 border-orange-500/20 rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 border-4 border-pink-500/20 rounded-full"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 0],
              }}
            
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-8 border-4 border-blue-400/20  rounded-full"
            />

            {/* Floating Icons */}
            <FloatingIcon icon={Wallet} color="text-blue-400 bottom-10 right-40" delay={0.2} />
            <FloatingIcon2 icon={BadgeDollarSign} color="text-blue-400 top-52 left-40" delay={0.7} />
            <FloatingIcon icon={Calculator} color="text-blue-600 top-60 right-40" delay={0.4} />
            <FloatingIcon icon={Globe} color="text-blue-400 bottom-20 left-40" delay={0.2} />
            <FloatingIcon icon={BadgeEuro} color="text-blue-400 top-20 left-40" delay={0.7} />
            <FloatingIcon2 icon={FileLineChart} color="text-blue-400 top-20 right-40" delay={0.7} />
            <FloatingIcon2 icon={AlignHorizontalDistributeCenter} color="text-blue-600 bottom-40 right-14" delay={0.4} />
            <FloatingIcon2 icon={Percent} color="text-blue-400 top-36 right-20" delay={0.2} />
            <FloatingIcon icon={Handshake} color="text-blue-400 bottom-40 left-40" delay={0.7} />
            <FloatingIcon2 icon={ChartArea} color="text-blue-600 top-60 left-10" delay={0.4} />

          

            {/* 3D Canvas */}
            <div className="absolute inset-0">
              <Canvas 
                camera={{ position: [-0.5, 0.5, 2], fov: 35 }}
                className="bg-orange-900/10 rounded-full"
              >
                <Suspense fallback={<Loader />}>
                  <Scene />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};
export default Herro;