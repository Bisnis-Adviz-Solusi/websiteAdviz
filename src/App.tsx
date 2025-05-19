import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { About, Contact, NotFoundPage, OurServices, LoadingScreen, Home } from "./pages";
import { PPH21Calculator } from "./components/simulation";
import "./i18n";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

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
     
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={
                  <>
                   <Home />
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