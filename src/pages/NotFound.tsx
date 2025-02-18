import { useNavigate } from 'react-router';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 my-28 ">
        <div className="text-center space-y-8">
          {/* Animated 404 Text */}
          <div className="animate-bounce">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300">
              404
            </h1>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold text-white">
              Oops! page Not Pound 🚀
            </h2>
            
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Sepertinya halaman yang kamu cari telah diculik oleh alien, 
              atau mungkin sedang menjelajahi galaksi lain. 
              Sementara kita menunggu kembalinya, mari kita kembali ke Bumi!
            </p>

            {/* Space Illustration */}
            <div className="py-8">
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl animate-pulse" />
                <div className="relative space-y-4">
                  <div className="w-32 h-32 mx-auto bg-indigo-500 rounded-full animate-float" />
                  <div className="w-16 h-16 ml-16 bg-pink-500 rounded-full animate-float-delayed" />
                </div>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="group relative inline-flex items-center px-8 py-4 bg-white bg-opacity-10 border border-white border-opacity-25 rounded-lg backdrop-blur-lg hover:bg-opacity-20 transition-all duration-300"
            >
              <span className="text-lg font-medium text-white">
                🪐 Kembali ke Beranda
              </span>
              <div className="ml-2 -mr-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;