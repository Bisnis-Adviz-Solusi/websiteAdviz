import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ContactUs = () => {
  const token = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;
  const [isDark, setIsDark] = useState(false);

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

  const mapConfig = {
    longitude: 106.83902712917678,
    latitude: -6.193666433316111,
    zoom: 15,
    markers: [
      {
        longitude: 106.83902712917678,
        latitude: -6.193666433316111,
        title: 'Gedung Arva Cikini',
      },
    ],
  };

  const contactItems = [
    {
      icon: <MapPin className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      title: "Our Location",
      content: (
        <>
          Arva Building, 4th floor, Cikini Raya Street No. 60,<br />
          Jakarta Pusat, Provinsi DKI Jakarta
        </>
      )
    },
    {
      icon: <Phone className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      title: "Phone Number",
      content: "+62 21 1234 5678"
    },
    {
      icon: <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      title: "Email Address",
      content: "marketing@adviz.id"
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      title: "Business Hours",
      content: (
        <>
          Monday - Friday: 8:30 AM - 5:30 PM<br />
          Saturday - Sunday: Closed
        </>
      )
    }
  ];

  return (
    <div className='min-h-screen p-8 bg-gray-50 dark:bg-gray-900'>
      <div 
        className="w-full max-w-7xl mx-auto backdrop-blur-md rounded-3xl p-8
                  bg-white/70 dark:bg-gray-800/80
                  border border-gray-200/50 dark:border-gray-700/50"
        style={{  
          boxShadow: isDark
            ? "0px 20px 60px -20px rgba(79, 70, 229, 0.4)"
            : "0px 20px 60px -20px rgba(59, 130, 246, 0.3)"
        }}
      >
        {/* Company Profile Section */}
        <section className="relative py-12">
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3
                            bg-gradient-to-r from-blue-600 to-orange-600 dark:from-blue-400 dark:to-orange-400
                            bg-clip-text text-transparent">
                Contact Us
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Building Tomorrow's Solutions Today
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                    Get in Touch
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 font-medium mb-8">
                    We'd love to hear from you. Please fill out the form or contact us using the information below.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-xl
                                bg-gray-50/50 dark:bg-gray-700/30
                                hover:bg-white dark:hover:bg-gray-700/50
                                transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div 
                        className="flex-shrink-0 w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center
                                  border border-blue-200/30 dark:border-blue-400/20
                                  bg-white/50 dark:bg-gray-600/50"
                        whileHover={{ 
                          rotate: 360,
                          backgroundColor: isDark ? "rgba(251, 146, 60, 0.2)" : "rgba(59, 130, 246, 0.1)",
                          transition: { duration: 0.5 }
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      <div className="space-y-1">
                        <h3 className="font-semibold mb-1 text-blue-600 dark:text-blue-400">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Map Section */}
              <div className="p-2 m-5 rounded-lg border-2 border-gray-200/70 dark:border-gray-600/50
                            bg-gray-100/50 dark:bg-gray-700/30">
                <Map
                  mapboxAccessToken={token}
                  initialViewState={{
                    longitude: mapConfig.longitude,
                    latitude: mapConfig.latitude,
                    zoom: mapConfig.zoom,
                  }}
                  style={{ width: '100%', height: '100%', borderRadius: '12px' }}
                  mapStyle={isDark ? 
                    "mapbox://styles/mapbox/dark-v11" : 
                    "mapbox://styles/mapbox/streets-v12"}
                >
                  {mapConfig.markers.map((marker, index) => (
                    <Marker
                      key={index}
                      longitude={marker.longitude}
                      latitude={marker.latitude}
                      anchor="bottom"
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center
                                    bg-blue-600/90 dark:bg-orange-400/90 animate-pulse">
                        <MapPin className="w-5 h-5 text-white dark:text-gray-900" />
                      </div>
                    </Marker>
                  ))}
                </Map>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default ContactUs;