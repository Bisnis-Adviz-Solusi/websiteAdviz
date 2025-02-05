import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BadgeDollarSign, Calculator, Wallet, BadgeEuro, Percent, Handshake, ChartArea, FileLineChart, AlignHorizontalDistributeCenter, Globe, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Html, OrbitControls, useProgress } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useTheme } from "@/components/theme-provider"; 
import Bg from "../assets/bg.png"
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

  return (
    <motion.div
    key={theme}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen flex items-center relative overflow-hidden transition-all duration-300"
   
    
  ><div 
  className="absolute inset-0 z-0"
  style={{
    backgroundImage: `url(${Bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.3  
  }}
/>
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
              <h1 className="text-4xl lg:text-7xl  font-bold">
                <span className="bg-orange-500 text-transparent bg-clip-text">
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
              className="text-sm lg:text-lg  max-w-xl"
            >
             Lorem ipsum dolor sit amet, consectetur adipisicing elit.
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
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl flex items-center gap-3 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
              >
                Launch Dashboard
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-orange-700/50 rounded-xl transition-all flex items-center gap-3 hover:border-orange-500/50"
              >
                <Sparkles className="w-5 h-5" />
                Explore Features
              </motion.button>
            </motion.div>
{/* Social Links */}
<div className="space-y-4">
            <div className="flex space-x-4">
              {[
                { icon: Github, link: '#' },
                { icon: Twitter, link: '#' },
                { icon: Linkedin, link: '#' },
                { icon: Mail, link: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="p-2 rounded-lg bg-transparent hover:shadow-md hover:shadow-orange-600  transition-colors"
                >
                  <social.icon size={32} className="text-gray-400" />
                </motion.a>
              ))}
            </div>
          </div>
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
                scale: [1.1, 1, 1.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15,
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