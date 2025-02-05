import { TrendingUp, HelpCircle, ChevronRight, ArrowRight, BadgeInfo, AlertCircle, CalendarDays } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useEffect, useState } from 'react';
import { balanceSheetItems, items, quickStatBoxes } from '../dummy/hillight-data';

const HillightCard = () => {
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
    updateDate?: string;
    status?: 'updated' | 'needs-review';
  }> = ({ 
    frontImage, 
    backImage, 
    title, 
    description, 
    metric,
    updateDate = '2024-02-28',
    status = 'updated'
  }) => {
    return (
      <div className=' '> 
 <div className="box-item group ">
        <div className="flip-box relative h-full w-full ">
          {/* Front Side */}
          <div
            className="flip-box-front shadow-xl shadow-blue-600"
            style={{ backgroundImage: `url(${frontImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80" />
            <div className="inner relative flex flex-col justify-between h-full p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  <BadgeInfo className="w-4 h-4 text-white" />
                  <span className="text-xs font-medium text-white">Monthly Report</span>
                </div>
                {status === 'needs-review' && (
                  <div className="bg-amber-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-medium text-amber-100">Needs Review</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-100">
                  <CalendarDays className="w-5 h-5" />
                  <span className="text-sm font-medium">Last updated: {updateDate}</span>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight">{title}</h3>
                <p className="text-gray-200 text-opacity-90 text-sm leading-relaxed">{description}</p>
                {metric && (
                  <div className="animate-pulse-slow bg-gradient-to-r from-blue-500/30 to-emerald-500/30 p-0.5 rounded-full inline-block">
                    <div className="px-6 py-2 rounded-full bg-gray-900/30 backdrop-blur-sm">
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-emerald-200 bg-clip-text text-transparent">
                        {metric}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="flip-box-back absolute inset-0 bg-cover bg-center "
            style={{ backgroundImage: `url(${backImage})` }}
          >
            <div className="absolute inset-0" />
            <div className="inner relative h-full p-2">
              <div className="w-full max-w-lg backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl relative bg-white/90 dark:bg-gray-800/90">
                <div className="border-b border-gray-200 dark:border-gray-700 p-1">
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
                      calc(1.6rem - 1px), 
                        ${isDark ? 'rgba(55, 65, 81, 0.3)' : 'rgba(0, 0, 0, 0.1)'} calc(1.6rem - 1px), 
                        ${isDark ? 'rgba(55, 65, 81, 0.3)' : 'rgba(0, 0, 0, 0.1)'} 1.6rem
                      )`,
                    }}
                  />
                
                </div>
                  
              </div><div className="h-96 overflow-auto dark:bg-black mt-4   p-3 bg-white rounded-xl">
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
                            <div className="flex items-center  gap-2 overflow-hidden">
                              <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <span
                                className={`transition-colors duration-300 ${
                                  item.isHeader || item.isHighlight
                                    ? 'font-semibold text-gray-800 dark:text-gray-200'
                                    : 'text-gray-600 dark:text-gray-400'
                                } ${item.isSection ? 'font-medium' : ''} group-hover:text-black dark:group-hover:text-blue-400`}
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
      className="w-48 shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto"
      align="end"
    >
      <div className="flex justify-between space-x-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {item.title}
            </h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap break-words">
            {item.description}
          </p>
          {item.value !== undefined && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-blue-500/20 dark:border-blue-400/20">
              <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-mono text-emerald-600 dark:text-emerald-400">
                {item.value < 0 ? '(' : ''}
                {formatNumber(Math.abs(item.value))}
                {item.value < 0 ? ')' : ''}
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
     
    );
  };
  const FlipBox2: React.FC<{
    frontImage: string; 
    backImage: string; 
    title: string; 
    description: string; 
    metric?: string; 
    trend?: string;
    updateDate?: string;
    status?: 'updated' | 'needs-review';
  }> = ({ 
    frontImage, 
    backImage, 
    title, 
    description, 
    metric,
    updateDate = '2024-02-28',
    status = 'updated'
  }) => {
    return (
      <div className=' '> 
 <div className="box-item group ">
        <div className="flip-box relative h-full w-full ">
          {/* Front Side */}
          <div
            className="flip-box-front shadow-xl shadow-orange-600"
            style={{ backgroundImage: `url(${frontImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80" />
            <div className="inner relative flex flex-col justify-between h-full p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  <BadgeInfo className="w-4 h-4 text-white" />
                  <span className="text-xs font-medium text-white">Monthly Report</span>
                </div>
                {status === 'needs-review' && (
                  <div className="bg-amber-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-medium text-amber-100">Needs Review</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-100">
                  <CalendarDays className="w-5 h-5" />
                  <span className="text-sm font-medium">Last updated: {updateDate}</span>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight">{title}</h3>
                <p className="text-gray-200 text-opacity-90 text-sm leading-relaxed">{description}</p>
                {metric && (
                  <div className="animate-pulse-slow bg-gradient-to-r from-blue-500/30 to-emerald-500/30 p-0.5 rounded-full inline-block">
                    <div className="px-6 py-2 rounded-full bg-gray-900/30 backdrop-blur-sm">
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-emerald-200 bg-clip-text text-transparent">
                        {metric}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
  className="flip-box-back absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: `url(${backImage})` }}
>
  <div className="absolute inset-0" />
  <div className="inner relative h-full p-1 "> 
    <div className="w-full max-w-lg backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl relative bg-white/90 dark:bg-gray-800/90">
      <div className="border-b border-gray-200 dark:border-gray-700 p-1">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-blue-100/30 dark:bg-blue-900/30 shadow-sm">
            <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Neraca
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Periode: Januari 2024
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              calc(1.6rem - 1px), 
              ${isDark ? 'rgba(55, 65, 81, 0.3)' : 'rgba(0, 0, 0, 0.1)'} calc(1.6rem - 1px), 
              ${isDark ? 'rgba(55, 65, 81, 0.3)' : 'rgba(0, 0, 0, 0.1)'} 1.6rem
            )`,
          }}
        />
      </div>
        
    </div>
    <div className="h-96 overflow-auto dark:bg-black mt-4   p-3 bg-white rounded-xl">
      {balanceSheetItems.map((item, index) => (
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
                    } ${item.isSection ? 'font-medium' : ''} group-hover:text-black dark:group-hover:text-blue-400`}
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
            className="w-48 shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            align="end"
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
                      {item.value < 0 ? '(' : ''}
                      {formatNumber(Math.abs(item.value))}
                      {item.value < 0 ? ')' : ''}
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
     
    );
  };

  const formatNumber = (num: number | bigint) => 
    new Intl.NumberFormat('id-ID', { 
      // style: 'currency', 
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);


   

  return (<>
  
    <div className="min-h-screen p-10 bg-transparent]] flex justify-center items-start">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {quickStatBoxes.map((box, index) => (
          <>
          
         
          <FlipBox
            key={index}
            frontImage={box.frontImage}
            backImage={box.backImage}
            title="Profit & Loss Statement"
            description="Monthly financial performance report showing revenue, expenses, and net profit"
            metric={box.metric}
          />
          <FlipBox2
            key={index}
            frontImage="https://th.bing.com/th/id/OIP.kcMEOdtRU7-eOUyRVYnE8wHaEK?w=1920&h=1080&rs=1&pid=ImgDetMain"
            backImage={box.backImage}
            title="Balance Sheet"
            description="Statement of assets, liabilities, and equity"
            metric={box.metric}
          /> </>
        ))}
      </div>
      
    </div>
  </>
    
  );
};

export default HillightCard;