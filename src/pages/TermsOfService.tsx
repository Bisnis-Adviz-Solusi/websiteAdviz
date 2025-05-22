import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, FileText, Globe,  AlertCircle, Users, Scale, CopyCheck, Trash2, Link } from "lucide-react";
import { BottomNav, Footer } from "@/components";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// TypeScript interface for section data
interface SectionData {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
}

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const mainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

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
      title: "Pendahuluan",
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Terima kasih telah mengunjungi situs web resmi PT Bisnis Adviz Solusi ("<strong>Adviz</strong>"). Dengan mengakses atau menggunakan situs ini, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat pada syarat dan ketentuan penggunaan ini. Jika Anda tidak menyetujui ketentuan ini, Anda disarankan untuk tidak menggunakan situs ini.
          </p>
          <p className="mb-4">
            Adviz berhak untuk mengubah, memperbarui, atau menyesuaikan syarat dan ketentuan ini kapan pun tanpa pemberitahuan sebelumnya. Perubahan akan mulai berlaku sejak diperbarui di situs ini, dan Anda dianggap menyetujui perubahan tersebut dengan tetap menggunakan situs setelah perubahan dimaksud.
          </p>
        </div>
      )
    },
    {
      id: "copyright",
      title: "Hak Cipta dan Kepemilikan Konten",
      icon: <CopyCheck className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Seluruh konten yang ditampilkan di situs ini, termasuk namun tidak terbatas pada teks, gambar, ikon, grafik, logo, serta materi lain, merupakan milik Adviz atau pihak ketiga yang memberikan lisensi kepada Adviz, dan dilindungi oleh undang-undang hak cipta, merek dagang, dan hukum kekayaan intelektual yang berlaku.
          </p>
          <p className="mb-4">
            Anda diperbolehkan untuk mengunduh atau mencetak salinan dari bagian situs ini hanya untuk penggunaan pribadi, non-komersial, selama Anda tidak menghapus atau mengubah informasi kepemilikan atau hak cipta yang menyertainya. Penggunaan konten untuk tujuan lain tanpa izin tertulis dari Adviz dilarang.
          </p>
        </div>
      )
    },
    {
      id: "prohibited-use",
      title: "Larangan Penggunaan",
      icon: <Trash2 className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Pengguna dilarang menggunakan situs ini untuk:
          </p>
          
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Tujuan komersial tanpa persetujuan tertulis dari Adviz</li>
            <li>Mengganggu, merusak, atau membebani sistem dan infrastruktur digital milik Adviz</li>
            <li>Mengakses konten atau data menggunakan alat otomatis</li>
            <li>Melakukan tindakan yang melanggar hukum atau hak pihak ketiga</li>
          </ul>
        </div>
      )
    },
    {
      id: "third-party-links",
      title: "Tautan ke Situs Pihak Ketiga",
      icon: <Link className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Situs ini mungkin memuat tautan ke situs lain yang tidak dikelola oleh Adviz. Tautan tersebut disediakan hanya untuk kenyamanan Anda. Adviz tidak bertanggung jawab atas isi, kebijakan, atau praktik dari situs pihak ketiga tersebut, dan tidak menjamin keamanan atau keakuratan informasi yang ditampilkan pada situs tersebut.
          </p>
        </div>
      )
    },
    {
      id: "disclaimer",
      title: "Pengecualian",
      icon: <AlertCircle className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Semua informasi di situs ini disediakan "apa adanya", tanpa jaminan apa pun, baik tersurat maupun tersirat. Adviz tidak menjamin bahwa situs ini bebas dari kesalahan, gangguan, atau virus, atau bahwa kontennya sepenuhnya akurat atau mutakhir. Penggunaan Anda atas situs ini sepenuhnya menjadi tanggung jawab Anda sendiri.
          </p>
        </div>
      )
    },
    {
      id: "limitation",
      title: "Batasan Tanggung Jawab",
      icon: <Scale className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Adviz tidak bertanggung jawab atas kerugian langsung, tidak langsung, incidental atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan situs ini, termasuk kehilangan data, gangguan bisnis atau kerusakan sistem.
          </p>
        </div>
      )
    },
    {
      id: "information-submission",
      title: "Penyampaian Informasi",
      icon: <Users className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Setiap informasi, ide, atau saran yang Anda kirimkan ke situs ini melalui formulir atau surat elektronik akan dianggap sebagai komunikasi tidak rahasia, kecuali secara tegas ditandai sebagai informasi rahasia. Adviz berhak untuk menggunakan informasi tersebut untuk tujuan pengembangan layanan, kecuali informasi tersebut tergolong data pribadi sebagaimana diatur dalam Kebijakan Privasi.
          </p>
        </div>
      )
    },
    {
      id: "governing-law",
      title: "Hukum yang Berlaku",
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Syarat dan ketentuan ini tunduk dan ditafsirkan berdasarkan hukum Republik Indonesia. Sengketa yang timbul dari penggunaan situs ini akan diselesaikan melalui jalur hukum yang berlaku di wilayah hukum Indonesia.
          </p>
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
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-400 to-blue-600">
              Syarat dan Ketentuan
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-center text-xl text-gray-300 leading-relaxed">
            Dokumen ini mengatur penggunaan situs web dan layanan PT Bisnis Adviz Solusi. Harap baca dengan seksama sebelum menggunakan situs kami.
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
                  Daftar Isi
                </h3>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center ${
                        activeSection === section.id
                          ? "bg-blue-900/30 text-white border-l-2 border-orange-400"
                          : "text-gray-300 hover:bg-blue-800/20 hover:text-white"
                      }`}
                    >
                      <span className="mr-2">{section.icon}</span>
                      <span>{section.title}</span>
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
                  <h2 className="text-2xl font-bold mb-4 text-center">Hubungi Kami</h2>
                  <p className="text-center mb-6">
                    Jika Anda memiliki pertanyaan atau kekhawatiran tentang Syarat dan Ketentuan kami, jangan ragu untuk menghubungi kami.
                  </p>
                  <div className="text-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-600 transition-all duration-300 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black">
                      Hubungi Kami
                    </button>
                    <p className="mt-4 text-sm text-gray-400">
                      Terakhir diperbarui: 20 Mei 2025
                    </p>
                  </div>
                </div>
              </section>
        </div>
      </div>
     <BottomNav/>
      <Footer/>
    </div>
  );
}