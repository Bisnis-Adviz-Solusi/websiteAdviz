
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Globe, Lock, Database, Scale, AlertCircle, Users, FileText } from "lucide-react";
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

export default function PrivacyPolicy() {
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
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Kami menghargai hak privasi Anda dan berkomitmen untuk melindungi informasi pribadi yang Anda percayakan kepada kami. Kebijakan Privasi ini menjelaskan secara rinci jenis informasi yang kami kumpulkan, bagaimana kami menggunakannya, dengan siapa kami dapat membagikannya, serta pilihan yang Anda miliki terkait informasi tersebut.
          </p>
        </div>
      )
    },
    {
      id: "data-types",
      title: "Jenis-Jenis Data Pribadi",
      icon: <Database className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Kami mengumpulkan dan memproses jenis informasi pribadi sebagai berikut:
          </p>
          
          <h3 className="text-xl font-semibold mb-3 text-orange-400">A. Informasi Personal</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Nama</li>
            <li>Email</li>
            <li>Alamat</li>
            <li>Nomor Telepon</li>
          </ul>
          
          <h3 className="text-xl font-semibold mb-3 text-orange-400">B. Informasi Otomatis</h3>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Alamat IP</li>
            <li>Data log</li>
            <li>Riwayat interaksi</li>
            <li>Tipe perangkat dan browser</li>
            <li>Durasi Penggunaan</li>
            <li>Riwayat pembayaran dan alat pembayaran (jika tersedia)</li>
          </ul>
          
          <h3 className="text-xl font-semibold mb-3 text-orange-400">C. Informasi Pihak Ketiga</h3>
          <p>
            Kami dapat menerima informasi dari pihak ketiga seperti mitra bisnis, penyedia layanan, atau integrasi media sosial (misalnya saat Anda login menggunakan akun Google).
          </p>
        </div>
      )
    },
    {
      id: "usage",
      title: "Penggunaan Informasi",
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Informasi pribadi yang Anda berikan kepada kami dapat digunakan untuk berbagai keperluan yang bertujuan meningkatkan kualitas layanan dan pengalaman Anda sebagai pengguna, antara lain:
          </p>
          
          <h3 className="text-xl font-semibold mb-3 text-orange-400">1. Personalisasi Pengalaman Pengguna</h3>
          <p className="mb-4">
            Kami menggunakan informasi seperti kebutuhan bisnis, bidang industri, dan tujuan klien untuk menyesuaikan pendekatan konsultasi kami sesuai dengan kebutuhan spesifik Anda.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 text-orange-400">2. Manajemen Komunikasi Proyek</h3>
          <p className="mb-4">
            Informasi kontak dan detail proyek digunakan untuk memfasilitasi komunikasi yang efisien selama berlangsungnya kerja sama, termasuk pengiriman proposal, laporan, dan dokumen kerja lainnya.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 text-orange-400">3. Pemeliharaan Hubungan Klien</h3>
          <p className="mb-4">
            Kami dapat menggunakan informasi Anda untuk membangun relasi jangka panjang, termasuk mengundang Anda ke acara, webinar, atau mengirimkan buletin dan pembaruan yang relevan dengan bidang Anda.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 text-orange-400">4. Pengembangan Produk atau Layanan</h3>
          <p>
            Informasi yang dikumpulkan dapat digunakan untuk melakukan analisis tren dan kebutuhan pasar, sehingga kami dapat menyempurnakan penawaran layanan, metodologi, dan pendekatan kami. Untuk mendukung tujuan ini, kami menggunakan layanan analitik pihak ketiga seperti Google Analytics, yang membantu kami memahami bagaimana situs kami digunakan. Data yang dikumpulkan melalui layanan ini bersifat agregat, tidak digunakan untuk mengidentifikasi individu secara langsung, dan dapat diproses di luar yurisdiksi Indonesia sesuai kebijakan masing-masing penyedia layanan. Kami tidak bertanggung jawab atas kebijakan privasi penyedia layanan pihak ketiga tersebut, dan menganjurkan Anda untuk meninjau kebijakan mereka secara langsung.
          </p>
        </div>
      )
    },
    {
      id: "consent",
      title: "Persetujuan Penggunaan Data",
      icon: <Lock className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Dengan mengakses situs web kami melalui perangkat atau sarana apa pun, mengisi formulir, menghubungi tim kami, menggunakan layanan konsultasi kami baik secara daring maupun luring, atau melalui komunikasi lainnya (termasuk email, telepon, atau pertemuan langsung), Anda memberikan persetujuan bahwa data pribadi Anda dapat dikumpulkan, disimpan, digunakan, dan dibagikan oleh:
          </p>
          
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Adviz</li>
            <li>Mitra Kerja</li>
            <li>Pihak Ketiga yang bekerja sama dengan kami secara profesional untuk pengembangan dan pengelolaan layanan</li>
            <li>Lembaga yang berwenang berdasarkan ketentuan hukum yang berlaku</li>
          </ul>
        </div>
      )
    },
    {
      id: "data-transfer",
      title: "Transfer Data Lintas Negara",
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Adviz dapat mentransfer informasi pribadi Anda ke negara lain di luar yurisdiksi tempat tinggal Anda. Hal ini dilakukan apabila layanan konsultasi kami melibatkan entitas internasional, proyek lintas negara, atau penggunaan penyedia layanan dan mitra profesional kami yang berbasis di berbagai negara.
          </p>
          <p>
            Selain itu, transfer juga dapat terjadi apabila Anda sendiri mengakses layanan kami dari luar wilayah negara tempat Adviz beroperasi.
          </p>
        </div>
      )
    },
    {
      id: "rights",
      title: "Hak Pengguna",
      icon: <Users className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Sebagai pengguna, Anda memiliki hak-hak berikut terkait data pribadi Anda:
          </p>
          
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Hak untuk mengakses data pribadi Anda yang kami simpan</li>
            <li>Hak untuk meminta koreksi data yang tidak akurat</li>
            <li>Hak untuk membatasi pemrosesan data Anda dalam kondisi tertentu</li>
            <li>Hak untuk menolak pemrosesan data Anda dalam kondisi tertentu</li>
            <li>Hak untuk meminta penghapusan data Anda dalam kondisi tertentu</li>
            <li>Hak untuk meminta informasi tentang apakah kami memproses data Anda</li>
          </ul>
          
          <p>
            Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak yang tersedia di situs web kami.
          </p>
        </div>
      )
    },
    {
      id: "security",
      title: "Keamanan Data",
      icon: <AlertCircle className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Kami mengimplementasikan langkah-langkah keamanan teknis dan organisasional yang tepat untuk melindungi data pribadi Anda dari pengolahan yang tidak sah atau melanggar hukum, kehilangan, perusakan, atau kerusakan yang tidak disengaja.
          </p>
          <p className="mb-4">
            Namun, meskipun kami berusaha untuk melindungi informasi pribadi Anda, kami tidak dapat menjamin keamanan absolut dari data yang Anda kirimkan kepada kami. Transmisi melalui internet selalu berisiko, dan meskipun kami berupaya sebaik mungkin untuk melindungi data pribadi, kami tidak dapat menjamin keamanan data selama dalam transmisi.
          </p>
          <p>
            Kami secara teratur meninjau dan memperbarui praktik keamanan kami untuk memastikan perlindungan informasi Anda sesuai dengan standar industri terkini.
          </p>
        </div>
      )
    },
    {
      id: "updates",
      title: "Pembaruan Kebijakan",
      icon: <Scale className="w-5 h-5" />,
      content: (
        <div>
          <p className="mb-4">
            Kebijakan Privasi ini dapat diperbarui sewaktu-waktu oleh Adviz, sejalan dengan kebutuhan bisnis, perubahan operasional, atau ketentuan hukum yang berlaku.
          </p>
          <p>
            Versi terbaru akan selalu tersedia pada situs web kami, dan Anda dianggap telah menerima perubahan tersebut dengan tetap mengakses atau menggunakan layanan kami setelah kebijakan diperbarui.
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
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-400 to-blue-700">
              Kebijakan Privasi
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-center text-xl text-gray-300 leading-relaxed">
            PT Bisnis Adviz Solusi berkomitmen untuk melindungi privasi dan data pribadi Anda. Dokumen ini menjelaskan praktik pengumpulan dan penggunaan data kami.
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
                    Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi kami atau penanganan data Anda, jangan ragu untuk menghubungi kami.
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