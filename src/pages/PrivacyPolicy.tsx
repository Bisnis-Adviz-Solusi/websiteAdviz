
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Globe, Lock, Database, Scale, AlertCircle, Users, FileText } from "lucide-react";
import { BottomNav, Footer } from "@/components";
import { useTranslation } from "react-i18next";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// TypeScript interface for section data
interface SectionData {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;

}

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const mainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('privacyPolicy');

  useEffect(() => {
    // Initial animations
    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // Sidebar animation
      gsap.from(sidebarRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5
      });

      // Glow effect animation
      gsap.to(glowRef.current, {
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Section animations
      gsap.utils.toArray<HTMLElement>(".section-content").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Animate section titles
      gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
        gsap.fromTo(
          title,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Section data
  const sections: SectionData[] = [
    {
      id: "introduction",
      title: t("introduction.title"),
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            {t("introduction.description")}
          </p>
        </div>
      )
    },
    {
      id: "data-types",
      title: t("dataTypes.title"),
      icon: <Database className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            {t("dataTypes.description")}
          </p>

          <h3 className="text-xl font-semibold mb-3 text-orange-400"> {t("dataTypes.personalInfoTitle")} </h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>{t("dataTypes.personalInfoList.name")}</li>
            <li>{t("dataTypes.personalInfoList.email")}</li>
            <li>{t("dataTypes.personalInfoList.address")}</li>
            <li>{t("dataTypes.personalInfoList.number")}</li>
          </ul>


          <h3 className="text-xl font-semibold mb-3 text-orange-400">
            {t("dataTypes.autoInfoTitle")}
          </h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>{t("dataTypes.autoInfoList.ip")}</li>
            <li>{t("dataTypes.autoInfoList.log")}</li>
            <li>{t("dataTypes.autoInfoList.interaction")}</li>
            <li>{t("dataTypes.autoInfoList.device")}</li>
            <li>{t("dataTypes.autoInfoList.duration")}</li>
            <li>{t("dataTypes.autoInfoList.payment")}</li>
          </ul>
          <h3 className="text-xl font-semibold mb-3 text-orange-400">
            {t("dataTypes.thirdPartyTitle")}</h3>
          <p>{t("dataTypes.thirdPartyContent")}</p>

        </div>
      )
    },
    {
      id: "usage",
      title: t("usage.title"),
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">{t("usage.desc")}</p>

          <h3 className="text-xl font-semibold mb-3 text-orange-400">{t("usage.usage1")}</h3>
          <p className="mb-4">{t("usage.1content")}</p>

          <h3 className="text-xl font-semibold mb-3 text-orange-400">{t("usage.usage2")}</h3>
          <p className="mb-4">{t("usage.2content")}</p>

          <h3 className="text-xl font-semibold mb-3 text-orange-400">{t("usage.usage3")}</h3>
          <p className="mb-4">{t("usage.3content")}</p>

          <h3 className="text-xl font-semibold mb-3 text-orange-400">{t("usage.usage4")}</h3>
          <p>{t("usage.4content")}</p>
        </div>
      )
      
    },
    {
      id: "consent",
      title: t("consent.title"),
      icon: <Lock className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">{t("consent.description")}</p>

          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Adviz</li>
            <li>{t("consent.list.bussinessPartners")}</li>
            <li>{t("consent.list.thirdParty")}</li>
            <li>{t("consent.list.authorities")}</li>
          </ul>
        </div>
      )
      
    },
    {
      id: "data-transfer",
      title: t("dataTransfer.title"),
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">{t("dataTransfer.par1")}</p>
          <p>{t("dataTransfer.par2")}</p>
        </div>
      )
    },    
    {
      id: "rights",
      title: t("rights.title"),
      icon: <Users className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">{t("rights.desc")}</p>

          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>{t("rights.list.par1")}</li>
            <li>{t("rights.list.par2")}</li>
            <li>{t("rights.list.par3")}</li>
            <li>{t("rights.list.par4")}</li>
            <li>{t("rights.list.par5")}</li>
            <li>{t("rights.list.par6")}</li>
          </ul>

          <p>{t("rights.conclude")}</p>
        </div>
      )
    },    
    {
      id: "security",
      title: t("security.title"),
      icon: <AlertCircle className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">{t("security.par1")}</p>
          <p className="mb-4">{t("security.par2")}</p>
          <p>{t("security.par3")}</p>
        </div>
      )
    },    
    {
      id: "updates",
      title: t("updates.title"),
      icon: <Scale className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">{t("updates.par1")}</p>
          <p>{t("updates.par2")}</p>
        </div>
      )
    }
    
  ];

  const handleSectionClick = (id: string) => {
    setActiveSection(id);

    // Smooth scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Background gradient and grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900/30 to-orange-900/20 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOGg2djZoNnY2aDZ2NmgtNnY2SGh6TTMwIDMwaDZ2NmgtNnptMC0xMmg2djZoLTZ6IiBmaWxsPSIjMjAyMDM1IiBvcGFjaXR5PSIwLjIiLz48L2c+PC9zdmc+')] opacity-10 z-0"></div>

      {/* Glow effects */}
      <div
        ref={glowRef}
        className="absolute left-1/4 top-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl z-0"
      ></div>
      <div className="absolute right-1/4 bottom-1/4 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl z-0"></div>

      {/* Hero Section */}
      <div className="py-20 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center mb-6"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-400 to-blue-700">
              {t("title")}
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-center text-xl text-gray-300 leading-relaxed">
           {t("subTitle")}
          </p>
        </div>

        {/* Hero background decorative elements */}
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-700/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-blue-700/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main content with sidebar */}
      <div className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row">
            {/* Left sidebar */}
            <div
              ref={sidebarRef}
              className="lg:w-64 lg:flex-shrink-0 mb-8 lg:mb-0 sticky top-8 self-start"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-500">
                  {t("toc")}
                </h3>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center ${activeSection === section.id
                          ? "bg-blue-900/30 text-white border-l-2 border-orange-400"
                          : "text-gray-300 hover:bg-blue-800/20 hover:text-white"
                        }`}
                    >
                      <span className="mr-2">{section.icon}</span>
                      <span>{t(section.title)}</span>
                      {activeSection === section.id && (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main content */}
            <main ref={mainRef} className="lg:flex-1 lg:pl-8">
              {sections.map((section) => (
                <section
                  id={section.id}
                  key={section.id}
                  className="mb-16 scroll-mt-20"
                >
                  <div className="mb-6 flex items-center section-title">
                    <div className="mr-4 p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/20 backdrop-blur-sm border border-white/10">
                      {section.icon}
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-500">
                      {section.title}
                    </h2>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg section-content">
                    <div className="prose prose-invert max-w-none">
                      {section.content}
                    </div>
                  </div>
                </section>
              ))}


            </main>
          </div>
          {/* Final section */}
          <section className="mb-20 section-content">
            <div className="bg-gradient-to-r from-orange-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">{t("final.contactUs")}</h2>
              <p className="text-center mb-6">{t("final.contactDesc")}</p>
              <div className="text-center">
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-600 transition-all duration-300 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black">
                  {t("final.contactUs")}
                </button>
                <p className="mt-4 text-sm text-gray-400">{t("final.lastUpdated")}</p>
              </div>

            </div>
          </section>
        </div>
      </div>
      <BottomNav />
      <Footer />
    </div>
  );
}