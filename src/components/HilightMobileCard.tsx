import { TrendingUp, HelpCircle, ChevronRight, ArrowRight, } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useState, useEffect } from 'react';
import { balanceSheetItems, items } from '../dummy/hillight-data';
import { useTranslation } from 'react-i18next';

const HilightMoblieCard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openHoverCardIndex, setOpenHoverCardIndex] = useState<string | null>(null);
  const { t } = useTranslation();
  

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Function to toggle hover card state
  const toggleHoverCard = (index: string): void => {
    setOpenHoverCardIndex((prev: string | null) => prev === index ? null : index);
  };

 
  
 

 
 

  interface NumberFormatOptions {
    currency: string;
    maximumFractionDigits: number;
  }

  const formatNumber = (num: number): string => 
    new Intl.NumberFormat('id-ID', { 
      // style: 'currency', 
      currency: 'IDR',
      maximumFractionDigits: 0
    } as NumberFormatOptions).format(num);

  

  return (
    <div className=" bg-transparent flex justify-center items-start ">
      <div className="w-full max-w-full space-y-full ">
        {/* First Row - Flipbox 1 and Text */}
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row gap-8'} items-center lg:items-start`}>
          {/* FlipBox 1 */}
          <div className={`${isMobile ? 'w-full' : 'flex-1'} transform transition-transform duration-300 hover:scale-105 mb-8`}>
           {/* Back Side */}
            <div
              className="w-full lg:w-[200%] lg:h-[100%] h-[100%]"
            >
               
              <div className="absolute inset-0 " />
              <div className=" lg:mt-0  p-2">
                <div className="w-full md:w-96 max-w-lg backdrop-blur-sm rounded-xl overflow-auto shadow-2xl relative bg-white/90 dark:bg-gray-800/30">
                  <div className="border-b border-gray-200 dark:border-gray-700 p-1">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 lg:p-3 rounded-xl bg-blue-100/30 dark:bg-blue-900/30 shadow-sm">
                        <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-200">
                          {t("home.hilightCard.profitLoss")}
                        </h2>
                        <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {t("home.hilightCard.periodProfit")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                  
                <div className="h-96 lg:h-96 lg:w-[90%]  dark:bg-black mt-4 shadow-xl  p-2  bg-white rounded-xl">
                  {items.map((item, index) => (
                    <HoverCard key={index} openDelay={100} closeDelay={100} open={isMobile ? openHoverCardIndex === `pl-${index}` : undefined}>
                      <HoverCardTrigger asChild>
                        <div
                          className={`group relative h-[1.3rem] flex items-center cursor-pointer text-xs lg:text-sm ${
                            item.isHighlight
                              ? 'bg-orange-50/80 dark:bg-orange-900/20'
                              : item.isSection
                              ? 'bg-gray-50/40 dark:bg-gray-700/40'
                              : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50'
                          } transition-all duration-300 ease-in-out`}
                          onClick={() => isMobile && toggleHoverCard(`pl-${index}`)}
                        >
                          <div className="lg:w-96 w-full md:w-96 max-w-lg backdrop-blur-sm shadow-2xl relative bg-white/90 dark:bg-gray-800/50">
                            <div className="flex items-center justify-between px-2 lg:px-10">
                              <div className="flex items-center gap-2 ">
                                <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span
                                  className={`transition-colors duration-300 ${
                                    item.isHeader || item.isHighlight
                                      ? 'font-semibold text-gray-800 dark:text-gray-200'
                                      : 'text-gray-600 dark:text-gray-400'
                                  } ${item.isSection ? 'font-medium' : ''} group-hover:text-black font-mono dark:group-hover:text-blue-400`}
                                >
                                  {t(item.title)}
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
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent 
                        className="w-64 h-64 lg:h-full md:w-96 shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto"
                        align="end"
                        sideOffset={5}
                      >
                         {isMobile && (
                        <button
                        onClick={() => setOpenHoverCardIndex(null)}
                        className="absolute top-2 right-2 z-20 p-1 bg-gray-600/75 text-white rounded-full"
                        >
                        ✕
                        </button>
                        )}
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <HelpCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {t(item.title)}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap break-words">
                              {t(item.description)}
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
        
        {/* Second Row - Text and Flipbox 2 */}
        <div className="mt-14 lg:mt-0">
          {/* FlipBox 2 */}
          <div className={`${isMobile ? 'w-full' : 'flex-1'} transform transition-transform duration-300 hover:scale-105 `}>
              <div
              className=" w-full  lg:w-[200%] lg:h-[100%] h-[80%]"
              style={{ marginLeft: isMobile ? '0' : '-23rem' }}
            >
            
              <div className="absolute inset-0" />
             <div className="h-full w-full lg:w-[90%]  ">
                <div className="w-full md:w-96 max-w-lg backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl relative bg-white/90 dark:bg-gray-800/90" >
                  <div className="border-b border-gray-200 dark:border-gray-700 p-1">
                    <div className="flex items-center space-x-1">
                      <div className="p-3 rounded-xl bg-blue-100/30 dark:bg-blue-900/30 shadow-sm">
                        <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                      </div>
                      <div>
                        <h2 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-200">
                          {t("home.hilightCard.balanceSheet")}
                        </h2>
                        <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {t("home.hilightCard.period")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[225%] lg:h-96 overflow-auto dark:bg-black mt-4 shadow-xl p-2 lg:p-3 bg-white rounded-xl">
                  {balanceSheetItems.map((item, index) => (
                    <HoverCard key={index} openDelay={100} closeDelay={100} open={isMobile ? openHoverCardIndex === `bs-${index}` : undefined}>
                      <HoverCardTrigger asChild>
                        <div
                          className={`group relative h-[1.6rem] flex items-center cursor-pointer text-xs lg:text-lg ${
                            item.isHighlight
                              ? 'bg-orange-50/80 dark:bg-orange-900/20'
                              : item.isSection
                              ? 'bg-gray-50/40 dark:bg-gray-700/40'
                              : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50'
                          } transition-all duration-300 ease-in-out`}
                          onClick={() => isMobile && toggleHoverCard(`bs-${index}`)}
                        >
                          <div className="md:w-96 w-full lg:ml-96 max-w-lg backdrop-blur-sm shadow-2xl relative bg-white/90 dark:bg-gray-800/50">
                            <div className="flex items-center justify-between lg:px-4 px-0">
                              <div className="flex items-center gap-1 overflow-hidden">
                                <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span
                                  className={`transition-colors duration-300 ${
                                    item.isHeader || item.isHighlight
                                      ? 'font-semibold text-gray-800 dark:text-gray-200'
                                      : 'text-gray-600 dark:text-gray-400'
                                  } ${item.isSection ? 'font-medium' : ''} group-hover:text-black dark:group-hover:text-blue-400`}
                                >
                                  {t(item.title)}
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
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent 
                        className="md:w-96 w-56 h-52 shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto"
                        align="end"
                        sideOffset={5}
                      >
                         {isMobile && (
                            <button
                            onClick={() => setOpenHoverCardIndex(null)}
                            className="absolute top-2 right-2 z-20 p-1 bg-gray-600/75 text-white rounded-full"
                            >
                            ✕
                            </button>
                        )}
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <HelpCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {t(item.title)}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {t(item.description)}
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
    </div>
  );
};

export default HilightMoblieCard;