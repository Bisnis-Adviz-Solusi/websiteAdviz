import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { BottomNav, Navbar } from "./components";
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { About, Contact, NotFoundPage, OurServices, LoadingScreen, Home } from "./pages";
import { PPH21Calculator } from "./components/simulation";
import "./i18n";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // You can use this effect to control loading based on actual resources if needed
  useEffect(() => {
    // If you need to wait for specific resources, you can add that logic here
    // For example, wait for images to load or data to fetch
    
    // For demo purposes, we'll let the LoadingScreen component handle the timing
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {isLoading ? (
        <LoadingScreen setIsLoading={setIsLoading} />
      ) : (
        <Router>
          <div 
            className="relative min-h-screen  dark:bg-black"   
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Navbar />
            <BottomNav />
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={
                  <>
                   <Home />
                   {/* <HighlightSection/>
                   <Footer/> */}
                  </>
                } />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<OurServices />} />
                <Route path="/simulation" element={<PPH21Calculator />} />
                <Route path="*" element={< NotFoundPage/>} />
              </Routes>  
           
            </div>
          </div>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;