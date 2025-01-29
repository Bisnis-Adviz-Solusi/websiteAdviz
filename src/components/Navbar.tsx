import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import img from "../assets/logo.png";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { id: "services", label: "Services", path: "/services" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#" 
              className="text-2xl font-bold transition-transform hover:scale-105"
            >
              <img 
                className="w-24 h-auto dark:invert-[0.9]" 
                src={img} 
                alt="Logo" 
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={() => setActiveLink(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-all
                  ${
                    activeLink === item.id 
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  }`}
              >
                {item.label}
                {activeLink === item.id && (
                  <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400 rounded-full origin-bottom transition-transform duration-300" />
                )}
              </a>
            ))}

            {/* Theme Switch */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-orange-400 transition-transform hover:rotate-12" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 transition-transform hover:rotate-12" />
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-lg rounded-lg m-2 border border-gray-200/50 dark:border-gray-700/50">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={() => {
                    setActiveLink(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md transition-colors
                    ${
                      activeLink === item.id
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Theme Switch */}
              <div
                onClick={toggleTheme}
                className="flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-5 w-5 mr-2 text-orange-400" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 mr-2 text-gray-600" />
                    Dark Mode
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;