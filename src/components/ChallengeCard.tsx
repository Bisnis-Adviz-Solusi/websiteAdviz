import { useState } from 'react';

const ContactCard = () => {
  const [isMobile] = useState(false);

  const AnimatedArrow = () => {
    return (
      <div className="relative flex flex-col items-center "> 
       {/* Animated Down Arrow */}
<div className="relative">
  {/* Glow effect */}
  <div className="absolute inset-0 blur-sm">
    <svg 
      width="60" 
      height="60" 
      viewBox="0 0 24 24" 
      className="text-cyan-400 animate-bounce"
    >
      
      <path 
        fill="currentColor" 
        d="M12 3l0 14.5 5-5 1.5 1.5L12 20.5 5.5 14l1.5-1.5 5 5L12 3z"
      />
    </svg>
  </div>
  
  {/* Main arrow */}
  <svg 
    width="60" 
    height="60" 
    viewBox="0 0 24 24" 
    className="relative text-gradient-to-br from-cyan-500 to-blue-600 animate-bounce drop-shadow-lg"
    style={{ animationDelay: '0.5s' }}
  >
    <defs>
      <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>
    <path 
      fill="url(#arrowGradient)" 
      d="M12 3l0 14.5 5-5 1.5 1.5L12 20.5 5.5 14l1.5-1.5 5 5L12 3z"
    />
  </svg>
  
  {/* Pulsing rings */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div className="w-16 h-16 border-2 border-cyan-400 rounded-full animate-ping opacity-30"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-blue-400 rounded-full animate-ping opacity-20" style={{ animationDelay: '0.5s' }}></div>
  </div>
</div>
        
        {/* Floating particles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-4 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-12 right-6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-8 left-12 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    );
  };

const FlipBox = () => {
  return (
    <div className="justify-center items-center w-full h-full hidden lg:block ">
      <div className="flip-box w-80 h-48 md:w-96 md:h-48 transition-all duration-500  hover:scale-105">
        {/* Front Side */}
        <div className="flip-box-front w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-500 rounded-xl shadow-2xl shadow-orange-500/30 border border-slate-300/70 dark:border-slate-600/50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-400/20 to-slate-500/40 dark:via-black/40 dark:to-black/70 rounded-xl" />
          <div className="relative inner y-10 flex flex-col justify-center items-center h-full p-6 text-center">
            <div className="flex inner flex-col justify-center items-center h-48 p-6 space-y-6">
              <a className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-base md:text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 min-w-48">
                <span className="relative z-10">📧 Email Us</span>
              </a>

              <div className="flex items-center space-x-2 w-full max-w-xs">
                <div className="flex-1 h-2 bg-gradient-to-r from-transparent to-gray-500 dark:to-gray-400"></div>
                <div className="text-gray-600 dark:text-gray-300 font-light text-sm">or</div>
                <div className="flex-1 h-2 bg-gradient-to-l from-transparent to-gray-500 dark:to-gray-400"></div>
              </div>

              <a className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-base md:text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 min-w-48">
                <span className="relative z-10">💬 WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-box-back w-full h-full bg-gradient-to-br p-7 from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-2xl border border-slate-300/70 dark:border-slate-700/50">
          <div className="space-y-4s">
            <a href="mailto:education@adviz.id" className="group relative inline-flex items-center justify-center px-8 py-2 text-slate-700 dark:text-white rounded-full text-base md:text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 min-w-48">
              <span className="relative z-10">education@adviz.id</span>
            </a>

            <div className="flex items-center space-x-2 w-full max-w-xs">
              <div className="flex-1 h-2 bg-gradient-to-r from-transparent to-gray-500 dark:to-gray-400"></div>
              <div className="text-gray-600 dark:text-gray-300 font-light text-sm">or</div>
              <div className="flex-1 h-2 bg-gradient-to-l from-transparent to-gray-500 dark:to-gray-400"></div>
            </div>

            <a href="https://wa.me/+62-12345678" className="group relative inline-flex items-center justify-center px-8 py-2 text-slate-700 dark:text-white rounded-full text-base md:text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 min-w-48">
              <span className="relative z-10">+62-12345678</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const FlipBox2 = () => {
  return (
    <div className="justify-center block lg:hidden items-center w-full h-full ">
      <div className="flip-box w-80 h-48 md:w-96 md:h-48 transition-all duration-500  hover:scale-105">
        {/* Front Side */}
        <div className=" w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-500 rounded-xl shadow-2xl shadow-orange-500/30 border border-slate-300/70 dark:border-slate-600/50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-400/20 to-slate-500/40 dark:via-black/40 dark:to-black/70 rounded-xl" />
          <div className="relative inner y-10 flex flex-col justify-center items-center h-full p-6 text-center">
            <div className="flex inner flex-col justify-center items-center h-48 p-6 space-y-6">
              <a className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-base md:text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 min-w-48">
                <span className="relative z-10">📧 Email Us</span>
              </a>

              <div className="flex items-center space-x-2 w-full max-w-xs">
                <div className="flex-1 h-2 bg-gradient-to-r from-transparent to-gray-500 dark:to-gray-400"></div>
                <div className="text-gray-600 dark:text-gray-300 font-light text-sm">or</div>
                <div className="flex-1 h-2 bg-gradient-to-l from-transparent to-gray-500 dark:to-gray-400"></div>
              </div>

              <a className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-base md:text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 min-w-48">
                <span className="relative z-10">💬 WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
};


  return (
    <div className=" transition-colors duration-300">
      <div className="w-full max-w-2xl mx-auto ">
        <div className="flex flex-col justify-center items-center mb-10">
          {/* Animated Arrow Component */}
          <AnimatedArrow />
          
          {/* Flip Box */}
          <div className={`${isMobile ? 'w-full' : 'w-auto'} transform transition-transform duration-300`}>
            <FlipBox />
            <FlipBox2/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;