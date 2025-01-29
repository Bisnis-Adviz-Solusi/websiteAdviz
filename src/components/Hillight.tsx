import { TrendingUp, HelpCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useEffect, useState } from 'react';

const Hillight = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const FlipBox: React.FC<{
    frontImage: string; 
    backImage: string; 
    title: string; 
    description: string; 
    metric?: string; 
    trend?: string;
    icon?: React.ComponentType;
  }> = ({ frontImage, backImage, title, description, metric }) => {
    return (
      <div className="box-item group ">
        <div className="flip-box relative h-full w-full ">
          <div
            className="flip-box-front absolute inset-0 bg-cover bg-center rounded-2xl shadow-xl"
            style={{ backgroundImage: `url(${frontImage})` }}
          >
            <div className="absolute inset-0" />
            <div className="inner relative  flex flex-col justify-center items-center p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
              <p className="text-gray-200 dark:text-gray-300 mb-6">{description}</p>
              {metric && (
                <div className="text-center mt-4">
                  <span className="px-4 py-2 rounded-full bg-blue-100/20 dark:bg-blue-900/20 text-white backdrop-blur-sm">
                    {metric}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div
            className="flip-box-back absolute inset-0 bg-cover bg-center rounded-2xl shadow-xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]"
            style={{ backgroundImage: `url(${backImage})` }}
          >
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm" />
            <div className="inner relative h-full p-6">
              <div className="w-full max-w-lg backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl relative bg-white/90 dark:bg-gray-800/90">
                <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-blue-100/30 dark:bg-blue-900/30 shadow-sm">
                      <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Laporan Laba Rugi
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Periode: Januari 2024
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative ">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent calc(1.6rem - 1px), 
                        ${isDark ? 'rgba(55, 65, 81, 0.3)' : 'rgba(0, 0, 0, 0.1)'} calc(1.6rem - 1px), 
                        ${isDark ? 'rgba(55, 65, 81, 0.3)' : 'rgba(0, 0, 0, 0.1)'} 1.6rem
                      )`,
                    }}
                  />
                  <div className="relative">
                    {items.map((item, index) => (
                      <HoverCard key={index} openDelay={100} closeDelay={100}>
                        <HoverCardTrigger asChild>
                          <div
                            className={`group relative h-[1.6rem] w-full flex items-center cursor-pointer text-sm ${
                              item.isHighlight
                                ? 'bg-orange-50/80 dark:bg-orange-900/20'
                                : item.isSection
                                ? 'bg-gray-50/40 dark:bg-gray-700/40'
                                : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50'
                            } transition-all duration-300 ease-in-out`}
                          >
                            <div className="flex items-center justify-between w-full px-4">
                              <div className="flex items-center gap-2 overflow-hidden">
                                <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span
                                  className={`transition-colors duration-300 ${
                                    item.isHeader || item.isHighlight
                                      ? 'font-semibold text-gray-800 dark:text-gray-200'
                                      : 'text-gray-600 dark:text-gray-400'
                                  } ${item.isSection ? 'font-medium' : ''} group-hover:text-blue-700 dark:group-hover:text-blue-400`}
                                >
                                  {item.title}
                                </span>
                              </div>
                              {item.value !== undefined && (
                                <span
                                  className={`font-mono transition-all duration-300 ${
                                    item.isNegative 
                                      ? 'text-red-600 dark:text-red-400' 
                                      : 'text-emerald-600 dark:text-emerald-400'
                                  } group-hover:scale-110`}
                                >
                                  {item.value < 0 ? '(' : ''}
                                  {formatNumber(Math.abs(item.value))}
                                  {item.value < 0 ? ')' : ''}
                                </span>
                              )}
                            </div>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent 
                          className="w-80 shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                          align="start"
                        >
                          <div className="flex justify-between space-x-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                  {item.title}
                                </h4>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {item.description}
                              </p>
                              {item.value !== undefined && (
                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-blue-500/20 dark:border-blue-400/20">
                                  <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                  <span className="text-sm font-mono text-emerald-600 dark:text-emerald-400">
                                    {formatNumber(item.value)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const formatNumber = (num: number | bigint) => 
    new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);

    const items = [
      {
        title: 'Pendapatan',
        value: 12133310,
        description: 'Total uang yang diterima dari penjualan produk atau jasa sebelum dikurangi biaya-biaya.',
        isHeader: true,
      },
      {
        title: 'Harga Pokok Penjualan',
        value: 10462299,
        description: 'Biaya langsung yang terkait dengan produksi barang atau jasa yang dijual.',
        isHeader: true,
      },
      {
        title: 'Laba Kotor',
        value: 1671010,
        description: 'Selisih antara pendapatan dan harga pokok penjualan, menunjukkan keuntungan sebelum dikurangi beban operasional.',
        isHighlight: true,
      },
      {
        title: 'Beban Operasional:',
        description: 'Biaya-biaya yang dikeluarkan untuk menjalankan bisnis sehari-hari.',
        isSection: true,
      },
      { title: 'Gaji & Tunjangan Karyawan', value: 304968, description: 'Biaya untuk membayar gaji, bonus, dan tunjangan karyawan.' },
      { title: 'Biaya Pemasaran', value: 28567, description: 'Biaya untuk aktivitas promosi dan pemasaran produk atau jasa.' },
      { title: 'Beban Utiliti, Adm, Sewa & Lainnya', value: 374360, description: 'Biaya utilitas, administrasi, sewa gedung, dan biaya lainnya.' },
      { title: 'Biaya Perbaikan & Pemeliharaan', value: 7608, description: 'Biaya untuk memperbaiki dan memelihara aset perusahaan.' },
      { title: 'Biaya Penyusutan & Amortisasi', value: 71765, description: 'Biaya penurunan nilai aset tetap dan amortisasi aset tidak berwujud.' },
      { title: 'Jumlah Beban Operasional', value: 787267, description: 'Total seluruh beban operasional perusahaan.', isSubtotal: true },
      { title: 'Laba Operasi', value: 883744, description: 'Keuntungan yang dihasilkan dari aktivitas operasional utama perusahaan.', isHighlight: true },
      {
        title: 'Pendapatan (Beban) lain-lain:',
        description: 'Pendapatan atau biaya lain yang tidak terkait langsung dengan aktivitas utama perusahaan.',
        isSection: true,
      },
      { title: 'Beban Keuangan', value: -216840, description: 'Biaya bunga atau biaya keuangan lainnya.', isNegative: true },
      { title: 'Laba (Rugi) Selisih Kurs', value: -135044, description: 'Kerugian yang disebabkan oleh fluktuasi nilai tukar mata uang.', isNegative: true },
      { title: 'Lainnya', value: -1258, description: 'Pendapatan atau beban lain yang tidak dikategorikan.', isNegative: true },
      { title: 'Jumlah Pendapatan (Beban) lain-lain', value: -353142, description: 'Total pendapatan atau beban lain-lain.', isSubtotal: true },
      { title: 'Laba (Rugi) Sebelum Pajak', value: 530602, description: 'Keuntungan atau kerugian sebelum dikenakan pajak.', isHighlight: true },
    ];

  const quickStatBoxes = [
    {
      frontImage: 'https://png.pngtree.com/thumb_back/fh260/background/20230623/pngtree-rendering-of-a-blue-background-concept-for-a-3d-finance-consultant-image_3658446.jpg',
      backImage: 'https://s25.postimg.cc/hj4c4qnov/cta-3.png',
      title: "Profit and loss",
      description: "Analisis lengkap pendapatan dan pengeluaran perusahaan",
      metric: "32.5%"
    },
    {
      frontImage: 'https://img.freepik.com/premium-photo/stock-market-graphs-generative-ai_896686-4364.jpg?w=996',
      backImage: 'https://s25.postimg.cc/hj4c4qnov/cta-3.png',
      title: "Balance sheet",
      description: "Laporan posisi keuangan perusahaan secara komprehensif",
      metric: "32.5%"
    },
  ];

  return (
    <div className="min-h-screen p-10 py-40 flex justify-center items-start">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
        {quickStatBoxes.map((box, index) => (
          <FlipBox
            key={index}
            frontImage={box.frontImage}
            backImage={box.backImage}
            title={box.title}
            description={box.description}
            metric={box.metric}
          />
        ))}
      </div>
    </div>
  );
};

export default Hillight;