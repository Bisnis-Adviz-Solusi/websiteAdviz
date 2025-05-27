import { TrendingUp, HelpCircle, ChevronRight, ArrowRight, AlertCircle } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useState, useEffect } from 'react';
import { balanceSheetItems, items } from '../dummy/hillight-data';
import imgFL from '../assets/PL.png';
import imgBL from '../assets/BS.png';
import { useTranslation } from 'react-i18next';

const HillightCard = () => {
  const [hoveredFlipbox, setHoveredFlipbox] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openHoverCardIndex, setOpenHoverCardIndex] = useState<string | null>(null);
  const { t } = useTranslation();

  // Detect if we're on mobile or tablet
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

  interface FlipBoxProps {
    frontImage: string;
    title: string;
    description: string;
    status?: 'updated' | 'needs-review';
    flipboxIndex: number;
  }
  
  const FlipBox = ({ 
      frontImage,
      title,
      description,
      status = 'updated',
      flipboxIndex,
    }: FlipBoxProps) => {
    return (
 <div
  className="relative w-full"
  onMouseEnter={() => !isMobile && setHoveredFlipbox(flipboxIndex)}
  onMouseLeave={() => !isMobile && setHoveredFlipbox(null)}
>
        <div className="w-full">
          <div className="flip-box w-full md:h-[400px] h-[300px]">
            {/* Front Side */}
            <div
              className="flip-box-front w-full md:h-[450px] h-[300px] shadow-xl shadow-orange-600"
              style={{ backgroundImage: `url(${frontImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80" />
              <div className="inner relative flex flex-col justify-between h-full p-4 md:p-6">
                <div className="flex justify-between items-start">
                  {status === 'needs-review' && (
                    <div className="dark:bg-amber-500/20  backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-300" />
                      <span className="text-xs font-medium text-amber-100">Needs Review</span>
                    </div>
                  )}
                </div> 
                
                <div className="space-y-4 p-4 lg:p-10">
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{title}</h3>
                  <p className="text-sm text-gray-200 text-opacity-90 leading-relaxed">{description}</p>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div
              className="flip-box-back w-full md:w-[200%] md:h-[100%] h-[100%]"
            >
               {/* tombol close hanya di mobile */}
  {isMobile && (
    <button
      onClick={() => setHoveredFlipbox(null)}
      className="absolute top-2 right-2 z-10 p-2 bg-gray-700/50 text-white rounded-full"
    >
      ✕
    </button>
  )}
              <div className="absolute inset-0"/>
              <div className="inner mt-16 md:mt-0 p-2">
                <div className="w-full md:w-96 max-w-lg backdrop-blur-sm rounded-xl overflow-auto shadow-2xl relative bg-white/90 dark:bg-gray-800/30">
                  <div className="border-b border-gray-200 dark:border-gray-700 p-1">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 md:p-3 rounded-xl bg-blue-100/30 dark:bg-blue-900/30 shadow-sm">
                        <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200">
                          {t("home.hilightCard.profitLoss")}
                        </h2>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {t("home.hilightCard.periodProfit")}
                        </p>

                      </div>
                    </div>
                  </div>
                </div>
                  
                <div className="h-96 md:h-96 md:w-[90%]  dark:bg-black mt-4 shadow-xl  p-2  bg-white rounded-xl">
                  {items.map((item, index) => (
                    <HoverCard key={index} openDelay={100} closeDelay={100} open={isMobile ? openHoverCardIndex === `pl-${index}` : undefined}>
                      <HoverCardTrigger asChild>
                        <div
                          className={`group relative h-[1.3rem] flex items-center cursor-pointer text-xs md:text-sm ${
                            item.isHighlight
                              ? 'bg-orange-50/80 dark:bg-orange-900/20'
                              : item.isSection
                              ? 'bg-gray-50/40 dark:bg-gray-700/40'
                              : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50'
                          } transition-all duration-300 ease-in-out`}
                          onClick={() => isMobile && toggleHoverCard(`pl-${index}`)}
                        >
                          <div className="lg:w-96 w-full max-w-lg backdrop-blur-sm shadow-2xl relative bg-white/90 dark:bg-gray-800/50">
                            <div className="flex items-center justify-between px-2 md:px-2">
                              <div className="flex items-center gap-2 ">
                                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span
                                  className={`transition-colors duration-300 ${
                                    item.isHeader || item.isHighlight
                                      ? 'font-semibold text-gray-800 dark:text-gray-200'
                                      : 'text-gray-600 dark:text-gray-400'
                                  } ${item.isSection ? 'font-medium' : ''} group-hover:text-black font-mono dark:group-hover:text-blue-400`}
                                >
                                 { t(item.title)}
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
                        className="w-64 h-64 md:h-96 md:w-96 shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto"
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
      </div>
    );
  };

  interface FlipBox2Props {
    frontImage: string;
    title: string;
    description: string;
    metric?: string;
    status?: 'updated' | 'needs-review';
    flipboxIndex: number;
  }

  const FlipBox2 = ({
    frontImage,
    title,
    description,
    metric,
    status = 'updated',
    flipboxIndex,
  }: FlipBox2Props) => {
    return (
     <div
  className="relative w-full mt-24 md:mt-0"
  onMouseEnter={() => !isMobile && setHoveredFlipbox(flipboxIndex)}
  onMouseLeave={() => !isMobile && setHoveredFlipbox(null)}
>

        <div className="w-full">
          <div className="flip-box2 w-full md:h-[450px] h-[150px]">
            {/* Front Side */}
            <div
              className="flip-box-front2 w-full md:h-[450px] h-[300px] shadow-xl shadow-blue-600"
              style={{ backgroundImage: `url(${frontImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute  inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80" />
              <div className="inner2 relative flex flex-col justify-between h-full p-4 md:p-6">
                <div className="flex justify-between items-start">
                  {status === 'needs-review' && (
                    <div className="bg-amber-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-300" />
                      <span className="text-xs font-medium text-amber-100">Needs Review</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4 p-4 lg:p-10">
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{title}</h3>
                  <p className="text-sm text-gray-200 text-opacity-90 leading-relaxed">{description}</p>
                  {metric && (
                    <div className="animate-pulse-slow bg-gradient-to-r from-blue-500/30 to-emerald-500/30 p-0.5 rounded-full inline-block">
                      <div className="px-4 md:px-6 py-2 rounded-full bg-gray-900/30 backdrop-blur-sm">
                        <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-300 to-emerald-200 bg-clip-text text-transparent">
                          {metric}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
  
            {/* Back Side */}
            <div
              className="flip-box-back2 w-full md:w-[200%] md:h-[100%] h-[80%]"
              style={{ marginLeft: isMobile ? '0' : '-23rem' }}
            >
              {isMobile && (
    <button
      onClick={() => setHoveredFlipbox(null)}
      className="absolute top-2 right-2 z-10 p-2 bg-gray-700/50 text-white rounded-full"
    >
      ✕
    </button>
  )}
              <div className="absolute inset-0" />
             <div className="inner2 h-full w-full lg:w-[80%]   p-2 ">
                <div className="w-full md:w-96 max-w-lg backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl relative bg-white/90 dark:bg-gray-800/90" >
                  <div className="border-b border-gray-200 dark:border-gray-700 p-1">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-blue-100/30 dark:bg-blue-900/30 shadow-sm">
                        <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200">
                          {t("home.hilightCard.balanceSheet")}
                        </h2>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {t("home.hilightCard.period")}
                        </p>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[225%] md:h-96 overflow-auto dark:bg-black mt-4 shadow-xl p-2 md:p-3 bg-white rounded-xl">
                  {balanceSheetItems.map((item, index) => (
                    <HoverCard key={index} openDelay={100} closeDelay={100} open={isMobile ? openHoverCardIndex === `bs-${index}` : undefined}>
                      <HoverCardTrigger asChild>
                        <div
                          className={`group relative h-[1.6rem] flex items-center cursor-pointer text-xs md:text-md ${
                            item.isHighlight
                              ? 'bg-orange-50/80 dark:bg-orange-900/20'
                              : item.isSection
                              ? 'bg-gray-50/40 dark:bg-gray-700/40'
                              : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50'
                          } transition-all duration-300 ease-in-out`}
                          onClick={() => isMobile && toggleHoverCard(`bs-${index}`)}
                        >
                          <div className="lg:w-96 w-full lg:ml-96 max-w-lg backdrop-blur-sm shadow-2xl relative bg-white/90 dark:bg-gray-800/50">
                            <div className="flex items-center justify-between md:px-4 px-0">
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
                        align="start"
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
    );
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

  // Modified ExplanatoryCard to be hidden on mobile and tablet
  const ExplanatoryCard = ({ type }: { type: 'pl' | 'bs' }) => {
    // Don't render on mobile and tablet
    if (isMobile) return null;
    
    return (
      <div className={`flex-1 rounded-xl transition-opacity duration-300 ${
        (type === 'pl' && hoveredFlipbox === 1) || 
        (type === 'bs' && hoveredFlipbox === 2) 
          ? 'opacity-0' 
          : 'opacity-100'
      }`}>          
        <div className="cursor-pointer group overflow-hidden duration-1000 hover:duration-1000 relative rounded-xl">
          <div className="bg-transparent group-hover:scale-150 -top-12 -left-12 absolute shadow-yellow-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
          <div className="bg-transparent group-hover:scale-150 top-44 left-14 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
          <div className="bg-transparent group-hover:scale-150 top-24 left-56 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
          <div className="bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
          <div className="bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-green-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"></div>
          <div className="bg-transparent group-hover:scale-150 -top-24 -left-12 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"></div>
          <div className="bg-transparent group-hover:scale-150 top-24 left-12 absolute shadow-sky-500 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"></div>
          
          <div className="w-full h-full p-3 rounded-xl flex-col gap-2 flex justify-center">
            <div className="group relative cursor-pointer overflow-hidden rounded-2xl pt-12 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl">
              <span className={`absolute top-0 left-0 z-0 h-32 w-32 rounded-full bg-gradient-to-r ${
                type === 'pl' 
                  ? 'from-blue-500/80 to-blue-500/10' 
                  : 'from-orange-500/80 to-blue-500/90'
              } opacity-75 transition-all duration-1000 transform group-hover:scale-[20]`}></span>
              
              <div className="relative z-10 mx-auto max-w-md">
                <div className='flex flex-row gap-5'>
                  <span className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 transform group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500">
                    <svg
                      className="h-12 w-12 text-white transition-all"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </span>
                  
                  <div className="group overflow-hidden relative after:duration-500 before:duration-500 duration-500 hover:after:duration-500 hover:after:translate-x-24 hover:before:translate-y-12 hover:before:-translate-x-32 hover:duration-500 after:absolute after:bg-sky-700 after:rounded-full after:blur-xl after:bottom-20 after:right-16 after:w-12 after:h-12 before:absolute before:bg-sky-400 before:rounded-full before:blur-xl before:top-20 before:right-16 before:w-12 before:h-12 hover:rotate-12 flex justify-center items-center h-28 w-80 dark:bg-neutral-900/50 bg-slate-100/60 rounded-2xl outline outline-slate-400 -outline-offset-8 ml-4">
                    <div className="z-10 flex flex-col items-center">
                      <span className="text-slate-400 text-3xl md:text-4xl font-bold">
                        {type === 'pl' ? t('home.hilightCard.profitLoss') : t('home.hilightCard.balanceSheet')}

                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-lg p-5 leading-8 text-gray-700 transition-all duration-500 group-hover:text-white">
                  <p className="text-gray-600 dark:text-gray-100 text-lg leading-relaxed">
                    {type === 'pl'
                      ? t("home.hilightCard.descPL")
                      : t("home.hilightCard.descBS")}
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen mt-16 p-4 md:mt-32 md:p-10 bg-transparent flex justify-center items-start mb-20 md:mb-40">
      <div className="w-full max-w-5xl space-y-8 md:space-y-12">
        {/* First Row - Flipbox 1 and Text */}
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row gap-8'} items-center md:items-start mb-12 md:mb-40`}>
          {/* FlipBox 1 */}
          <div className={`${isMobile ? 'w-full' : 'flex-1'} transform transition-transform duration-300 hover:scale-105 mb-8 md:mb-0`}>
            <FlipBox
              frontImage={imgFL}
              title={t("home.hilightCard.flipbox.pl.title")}
              description={t("home.hilightCard.flipbox.pl.description")}
              flipboxIndex={1}
            />
          </div>
    
          {/* Explanatory Text - Hidden on mobile and tablet */}
          <ExplanatoryCard type="pl" />
        </div>
        
        {/* Second Row - Text and Flipbox 2 */}
        <div className={`flex ${isMobile ? 'flex-col-reverse' : 'flex-row gap-8'} items-center md:items-start`}>
          {/* Explanatory Text - Hidden on mobile and tablet */}
          <ExplanatoryCard type="bs" />
          
          {/* FlipBox 2 */}
          <div className={`${isMobile ? 'w-full' : 'flex-1'} transform transition-transform duration-300 hover:scale-105 mb-40 md:mb-0`}>
            <FlipBox2
              frontImage={imgBL}
              title={t("home.hilightCard.flipbox.bs.title")}
              description={t("home.hilightCard.flipbox.bs.description")}
              flipboxIndex={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HillightCard;