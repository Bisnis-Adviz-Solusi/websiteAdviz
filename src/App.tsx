import React, { useEffect, useRef, useState, useMemo } from "react";
import { ThemeProvider } from "@/components/theme-provider"
import { Footer, Herro, Navbar } from "./components"
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { About, Contact, HighlightSection, NotFoundPage, OurServices } from "./pages";
import { PPH21Calculator } from "./components/simulation";


const ScrollLine = React.memo(({ scroll }: { scroll: number }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const strokeColor = useMemo(() => {
    const endColor = [128, 0, 255];
    const startColor = [255, 165, 0];
    
    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * scroll);
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * scroll);
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * scroll);
    
    return `rgb(${r},${g},${b})`;
  }, [scroll]);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      <svg
        viewBox="0 10 150 150"
        className="w-full h-full"
        style={{ filter: "url(#glow)" }}
      >
        <path
          ref={pathRef}
          d="M 0,0 C 150,50 150,150 50,100 S -50,50 50,0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - scroll * pathLength}
        />
        <path
          ref={pathRef}
           d="M 0,60 C 150,20 150,150 -20,100 S -20,40 0,0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={1}
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - scroll * pathLength}
        />
        <path
          ref={pathRef}
           d="M 150,10 C 50,0 150,150 -30,100 S -30,30 30,0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - scroll * pathLength}
        />
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" />
            <feMerge>
              <feMergeNode />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
});

function App() {
  const [scroll, setScroll] = useState(0);
  const rafId = useRef<number>();
  const totalHeightRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateDimensions = () => {
      totalHeightRef.current = document.documentElement.scrollHeight - window.innerHeight;
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    const handleScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      rafId.current = requestAnimationFrame(() => {
        const progress = window.scrollY / totalHeightRef.current;
        setScroll(Math.min(1, Math.max(0, progress)));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateDimensions);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div ref={containerRef} className="relative min-h-screen"  style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='88' viewBox='0 0 88 88'%3E%3Cg fill='%239C92AC' fill-opacity='0.11'%3E%3Cpath fill-rule='evenodd' d='M29.42 29.41c.36-.36.58-.85.58-1.4V0h-4v26H0v4h28c.55 0 1.05-.22 1.41-.58h.01zm0 29.18c.36.36.58.86.58 1.4V88h-4V62H0v-4h28c.56 0 1.05.22 1.41.58zm29.16 0c-.36.36-.58.85-.58 1.4V88h4V62h26v-4H60c-.55 0-1.05.22-1.41.58h-.01zM62 26V0h-4v28c0 .55.22 1.05.58 1.41.37.37.86.59 1.41.59H88v-4H62zM18 36c0-1.1.9-2 2-2h10a2 2 0 1 1 0 4H20a2 2 0 0 1-2-2zm0 16c0-1.1.9-2 2-2h10a2 2 0 1 1 0 4H20a2 2 0 0 1-2-2zm16-26a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4zm16 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4zM34 58a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4zm16 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4zM34 78a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-6zm16 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-6zM34 4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4zm16 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4zm-8 82a2 2 0 1 1 4 0v2h-4v-2zm0-68a2 2 0 1 1 4 0v10a2 2 0 1 1-4 0V18zM66 4a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0V4zm0 72a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0v-8zm-48 0a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0v-8zm0-72a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0V4zm24-4h4v2a2 2 0 1 1-4 0V0zm0 60a2 2 0 1 1 4 0v10a2 2 0 1 1-4 0V60zm14-24c0-1.1.9-2 2-2h10a2 2 0 1 1 0 4H58a2 2 0 0 1-2-2zm0 16c0-1.1.9-2 2-2h10a2 2 0 1 1 0 4H58a2 2 0 0 1-2-2zm-28-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 26a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM36 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 68a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16-34a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16-12a2 2 0 1 0 0 4 6 6 0 1 1 0 12 2 2 0 1 0 0 4 10 10 0 1 0 0-20zm-64 0a2 2 0 1 1 0 4 6 6 0 1 0 0 12 2 2 0 1 1 0 4 10 10 0 1 1 0-20zm56-12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 48a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-48 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-48a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm24 32a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-4a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm36-36a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM10 44c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4h-8a2 2 0 0 1-2-2zm56 0c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4h-8a2 2 0 0 1-2-2zm8 24c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4h-8a2 2 0 0 1-2-2zM3 68c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4H5a2 2 0 0 1-2-2zm0-48c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4H5a2 2 0 0 1-2-2zm71 0c0-1.1.9-2 2-2h8a2 2 0 1 1 0 4h-8a2 2 0 0 1-2-2zm6 66a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 86a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-68A6 6 0 1 1 8 2a6 6 0 0 1 0 12zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm36 36a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'/%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
          <ScrollLine scroll={scroll} />
          <Navbar />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={
                <>
                  <Herro />
                  <HighlightSection/>
               
                  
                </>
              } />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<OurServices />} />
              <Route path="/simulation" element={<PPH21Calculator />} />
              <Route path="*" element={< NotFoundPage/>} />
            </Routes>  
            <Footer />
          </div>
        </div>
      
      </Router>
    </ThemeProvider>
    
  );
}

export default App;