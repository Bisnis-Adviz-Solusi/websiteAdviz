import { HillightCard } from '@/components';
import { motion } from 'framer-motion';
import { Briefcase, BarChart, Users, Clock, } from 'lucide-react';
import Tilt from 'react-parallax-tilt';


const HighlightSection = () => {
  const features = [
    {
      icon: Briefcase,
      title: "Professional Expertise",
      badge: "A Years",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      color: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-600 dark:text-blue-300",
      image: "https://static.vecteezy.com/system/resources/previews/010/872/211/original/3d-professional-graphic-designer-png.png",
    },
    {
      icon: BarChart,
      title: "Business Growth",
      badge: "45% Avg Growth",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      color: "bg-purple-100 dark:bg-purple-900/30",
      textColor: "text-purple-600 dark:text-purple-300",
      image: "https://static.vecteezy.com/system/resources/previews/010/873/246/original/3d-business-man-presenting-business-growth-illustration-png.png",
    },
    {
      icon: Users,
      title: "Dream Team",
      badge: "More Experts",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
      color: "bg-pink-100 dark:bg-pink-900/30",
      textColor: "text-pink-600 dark:text-pink-300",
      image: "https://cdni.iconscout.com/illustration/free/thumb/teamwork-2112512-1785594.png",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      badge: "1-3 Weeks",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      color: "bg-orange-100 dark:bg-orange-900/30",
      textColor: "text-orange-600 dark:text-orange-300",
      image: "https://static.vecteezy.com/system/resources/previews/010/872/911/original/3d-man-scheduling-work-deadline-png.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <section className="py-24 px-4 lg:px-8 bg-gradient-to-br from-blue-50/50 to-green-50/50 dark:from-gray-900/70 dark:to-gray-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[url('/grid.svg')] bg-repeat" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-7xl mx-auto relative"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm mb-6">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">Why Choose Us?</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Transforming Business Vision into Reality
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nobis temporibus dolores voluptate repellat voluptas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Tilt> <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute top-0 right-2 mt-5">
                <span className={`${feature.textColor} px-3 py-1 rounded-full text-sm font-medium shadow-sm`}>
                  {feature.badge}
                </span>
              </div>

              {/* Background Image - Modified to include opacity and gradient */}
              <div
                className="absolute bottom-0 right-2 w-28 h-28 bg-cover bg-center rounded-tl-xl"
                style={{
                  backgroundImage: `url(${feature.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'left bottom',
                  opacity: 0.3,
                  backgroundBlendMode: 'overlay',
               
                }}
              />
              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300`}>
                <feature.icon className={`w-10 h-10 ${feature.textColor} stroke-[1.5]`} />
              </div>

              <h3 className={`text-2xl font-bold ${feature.textColor} mb-4`}>{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
            </motion.div></Tilt>
             
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center">
     
<button className="border  shadow-md shadow-blue-700 dark:text-gray-50 text-balck  duration-300 relative group cursor-pointer   overflow-hidden h-16 w-72 rounded-md dark:bg-neutral-900 bg-gray-100 p-2  font-extrabold ">

  <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-700 right-12 top-12 bg-yellow-500"></div>
  <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150  duration-700 right-20 -top-6 bg-orange-500"></div>
  <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8   rounded-full group-hover:scale-150  duration-700 right-32 top-6 bg-pink-500"></div>
  <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4   rounded-full group-hover:scale-150  duration-700 right-2 top-12 bg-red-600"></div>
  <p className="z-10 absolute bottom-2 left-2">Get Free Consutation</p>
</button>


          </motion.div>
        </motion.div>
      </section>

      <div>
        <motion.div variants={itemVariants} className="text-center mt-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Why Choose Us?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Integrated business consulting solutions for your company’s transformation
          </p>
        </motion.div>
        <HillightCard />
      </div>
    </>
  );
};

export default HighlightSection;
