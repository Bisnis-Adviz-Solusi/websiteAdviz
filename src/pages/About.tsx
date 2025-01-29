import { Users, Target, Building, ChartLine } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const BusinessConsultantSection = () => {
  const companyTeam = [
    { 
      name: "John Anderson", 
      position: "CEO", 
      image: "/api/placeholder/200/200",
      bio: "An experienced leader with 15+ years in business consulting"
    },
    { 
      name: "Sarah Mitchell",  
      position: "Chief Strategy Officer", 
      image: "/api/placeholder/200/200",
      bio: "Expert in global business strategies and digital transformation"
    }
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-16 dark:bg-gray-900">
      {/* Main Section */}
      <section className="mb-24">
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent"
        >
          Integrated Business Consulting Solutions
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Strategic Goals */}
          <motion.div 
            variants={fadeInVariants}
            className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/50 dark:to-green-900/50 shadow-xl hover:shadow-2xl dark:shadow-gray-800/30 transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-blue-600 dark:bg-blue-400 rounded-xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold dark:text-white">Strategic Business Goals</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Transform your organization with our data-driven approach combining 
              industry expertise and innovative solutions for sustainable growth.
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
                  To be the global leader in transformative business solutions that 
                  drive sustainable success in the digital age.
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
                { icon: <Users />, text: '200+ Professional Consultants' },
                { icon: <ChartLine />, text: '35+ Countries Coverage' },
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
  );
};

export default BusinessConsultantSection;