import { useEffect, useState, useRef } from 'react';
// import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { BottomNav, Footer, Navbar } from '@/components';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import LeafletMap from '@/components/MapContact';

L.Marker.prototype.options.icon = L.icon({
  iconUrl,
  shadowUrl,
});

// Separate component for the GLTF model
const Scene = () => {
  const gltf = useLoader(GLTFLoader, '/models/earth.glb');

  return (

    <>
      <ambientLight intensity={1} />
      <directionalLight
        position={[-1, 8, 4]}
        intensity={10}
        castShadow
      />




      <primitive
        object={gltf.scene}
        position={[0, 0, 0]}
        scale={[6.4, 6.4, 6.4]}
      />
      <OrbitControls
        target={[0, -0.1, 0]}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate
        autoRotateSpeed={1.5}
      />
    </>
  );
};
// Animated stars background
const StarBackground = () => {
  const starsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      // Rotate around Y axis slowly
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      // Add slight wobble on X and Z axes
      starsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
      starsRef.current.rotation.z = Math.cos(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <points ref={starsRef}>
      <Stars radius={100} depth={50} count={2000} factor={4} />
    </points>
  );
};


const ContactUs = () => {
  const [isDark, setIsDark] = useState(false);
  const [, setHoverIndex] = useState<number | null>(null);
  // const token = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;
  const { t } = useTranslation();
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  // const mapConfig = {
  //   longitude: 106.83902712917678,
  //   latitude: -6.193666433316111,
  //   zoom: 15,
  //   markers: [
  //     {
  //       longitude: 106.83902712917678,
  //       latitude: -6.193666433316111,
  //       title: t('contact.buildingName'),
  //     },
  //   ],
  // };

  // const mapContainerStyle = {
  //   width: '100%',
  //   height: '500px',
  //   borderRadius: '12px'
  // };

  const contactItems = [
    {
      icon: <MapPin className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      title: t('contact.ourLocation'),
      content: (
        <>
          <span className="font-bold">{t('contact.officeAddress.building')}</span><br />
          {t('contact.officeAddress.street')}<br />
          {t('contact.officeAddress.district')}<br />
          {t('contact.officeAddress.postalCode')}<br />
        </>
      )
    },
    {
      icon: <Phone className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      title: t('contact.phoneNumber'),
      content: "+62 21 1234 5678"
    },
    {
      icon: <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      title: t('contact.email'),
      content: "marketing@adviz.id"
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      title: t('contact.businessHours'),
      content: (
        <>
          {t('contact.hoursWeekday')} <br />
          {t('contact.hoursWeekend')}
        </>
      )
    }
  ];

  return (

    <>
    <Navbar/>
    <BottomNav/>
    <div className="min-h-screen lg:mx-10 mx-5  relative overflow-hidden">
      {/* Background Stars */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <StarBackground />
        </Canvas>
      </div>

      {/* Rest of your component JSX... */}
          <div className="relative  z-10 w-full  lg:mt-32 mt-20 mx-auto rounded-3xl p-3 bg-white/20 dark:bg-slate-900/50 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
        {/* Company Profile Section */}
        <section className="relative py-12">
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="select-none cursor-default  md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-orange-600 dark:from-blue-400 dark:to-orange-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                {t('contact.contactUs')}
              </h1>
              <p className="select-none cursor-default text-xl text-gray-600 dark:text-gray-300 animate-fade-in">
                Where numbers meet understanding.
                Let's simplify finance together.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:px-4 px-0">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="select-none space-y-8">
                  {contactItems.map((item, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
     className="flex items-start lg:space-x-4 space-x-2 lg:p-6 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/30 
                               hover:bg-white dark:hover:bg-gray-700/50 transition-all duration-300
                               hover:shadow-lg hover:scale-102 transform cursor-pointer"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center
                                    border border-blue-200/30 dark:border-blue-400/20 bg-white/50 dark:bg-gray-600/50
                                    hover:rotate-12 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3D Model Section */}
              <div
                className="">
                <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                  <Scene />
                </Canvas>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
          <section className="py-16 px-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto">
                <h2 className="select-none cursor-default text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
                  {t('contact.findUs')}
                </h2>
                <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
    
                  {typeof window !== 'undefined' ? (
                    <LeafletMap isDark={isDark} />
                  ) : (
                    <div className="select-none cursor-default h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-red-500">
                      {t('warning.undefined')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
      </div>
      <Footer />
    </div>
    </>
      
  );
};

export default ContactUs;