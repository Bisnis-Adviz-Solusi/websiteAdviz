import { TrendingUp, HelpCircle, ChevronRight, ArrowRight, AlertCircle, } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useState } from 'react';
import { balanceSheetItems, items, quickStatBoxes } from '../dummy/hillight-data';
import imgFL from '../assets/PL.png';
import imgBL from '../assets/BS.png';

const HillightCard = () => {

  const [hoveredFlipbox, setHoveredFlipbox] = useState<number | null>(null);



 const FlipBox: React.FC<{
  frontImage: string;
  backImage: string;
  title: string;
  description: string;
  metric?: string;
  updateDate?: string;
  status?: 'updated' | 'needs-review';
  flipboxIndex: number;

}> = ({ 
  frontImage,
  backImage,
  title,
  description,
  metric,
  status = 'updated',
  flipboxIndex,


}) => {
  return (
    <div className="relative"
    onMouseEnter={() => setHoveredFlipbox(flipboxIndex)}
    onMouseLeave={() => setHoveredFlipbox(null)}>
      <div className="">
      <div className="flip-box">
          {/* Front Side */}
          <div
          className="flip-box-front shadow-xl  shadow-orange-600"
          style={{ backgroundImage: `url(${frontImage})` }}
        >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80" />
          <div className="inner relative flex flex-col justify-between h-full p-6">
            <div className="flex justify-between items-start">
            
              {status === 'needs-review' && (
                <div className="bg-amber-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-medium text-amber-100">Needs Review</span>
                </div>
              )}
            </div> 
            
            <div className="space-y-4">
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

 {/* Back Side */}
 <div
          className="flip-box-back  "
          style={{ backgroundImage: `url(${backImage})` }}
        >
          <div className="absolute inset-0"  />
          <div className="inner h-full p-2 ">
              <div className="w-96 max-w-lg backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl relative bg-white/90 dark:bg-gray-800/30">
                <div className="border-b border-gray-200 dark:border-gray-700 p-1">
                  <div className="flex items-center space-x-4" >
                    <div className="p-3 rounded-xl bg-blue-100/30 dark:bg-blue-900/30 shadow-sm">
                      <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Profit and Loss
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Period: January 2024
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative ">
                  <div
                    className="absolute inset-0"
                 
                  />
                
                </div>
                  
              </div><div className="h-96 overflow-auto dark:bg-black mt-4 shadow-xl p-3 bg-white rounded-xl">
              {items.map((item, index) => (
  <HoverCard key={index} openDelay={100} closeDelay={100}>
       <HoverCardTrigger asChild>
                        <div
                          className={`group relative h-[1.3rem] flex items-center cursor-pointer text-sm ${
                            item.isHighlight
                              ? 'bg-orange-50/80 dark:bg-orange-900/20'
                              : item.isSection
                              ? 'bg-gray-50/40 dark:bg-gray-700/40'
                              : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50'
                          } transition-all duration-300 ease-in-out`}
                        >
                          <div className="w-96 max-w-lg backdrop-blur-sm  overflow-hidden shadow-2xl relative bg-white/90 dark:bg-gray-800/50">
                            <div className="flex items-center justify-between px-4">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <span
                                className={`transition-colors duration-300 ${
                                  item.isHeader || item.isHighlight
                                    ? 'font-semibold text-gray-800 dark:text-gray-200'
                                    : 'text-gray-600 dark:text-gray-400'
                                } ${item.isSection ? 'font-medium' : ''} group-hover:text-black font-mono dark:group-hover:text-blue-400`}
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
                         
                        </div>
                      </HoverCardTrigger>
    <HoverCardContent 
      className="w-80 h-96 shadow-xl bg-white  dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto"
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
    flipboxIndex: number;
 
  }> = ({ 
    frontImage, 
  
    title, 
    description, 
    metric,
    status = 'updated',
    flipboxIndex,
   
  
    
  }) => {
    return (
      <div className="relative"
      onMouseEnter={() => setHoveredFlipbox(flipboxIndex)}
      onMouseLeave={() => setHoveredFlipbox(null)}>
        <div className="">
        <div className="flip-box2">
            {/* Front Side */}
            <div
            className="flip-box-front2 shadow-xl  shadow-blue-600"
            style={{ backgroundImage: `url(${frontImage})` }}
          >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80" />
            <div className="inner2 relative flex flex-col justify-between h-full p-6">
              <div className="flex justify-between items-start">
               
                {status === 'needs-review' && (
                  <div className="bg-amber-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-medium text-amber-100">Needs Review</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                
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
  
   {/* Back Side */}
   <div
            className="flip-box-back2 "
            style={{marginLeft: '-29rem'}}
          >
            <div className="absolute inset-0" />
            <div className="inner2 h-full p-2 ">
                <div className="w-96 max-w-lg ml-96 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl relative bg-white/90 dark:bg-gray-800/90" >
                  <div className="border-b border-gray-200 dark:border-gray-700 p-1">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-blue-100/30 dark:bg-blue-900/30 shadow-sm">
                        <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Balance Sheet
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Period: January 2024
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
                      
                      )`,
                    }}
                  />
                
                </div>
                  
              </div><div className="h-96 overflow-auto dark:bg-black mt-4 shadow-xl  p-3 bg-white rounded-xl">
              {balanceSheetItems.map((item, index) => (
  <HoverCard key={index} openDelay={100} closeDelay={100}>
       <HoverCardTrigger asChild>
                        <div
                          className={`group relative h-[1.6rem]  flex items-center cursor-pointer text-sm ${
                            item.isHighlight
                              ? 'bg-orange-50/80 dark:bg-orange-900/20'
                              : item.isSection
                              ? 'bg-gray-50/40 dark:bg-gray-700/40'
                              : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50'
                          } transition-all duration-300 ease-in-out`}
                        >
                          <div className="w-96 ml-96 max-w-lg backdrop-blur-sm rounded-md overflow-hidden shadow-2xl relative bg-white/90 dark:bg-gray-800/90">
                            <div className="flex items-center justify-between px-4">
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
                         
                        </div>
                      </HoverCardTrigger>
          <HoverCardContent 
           className="w-96 h-52 shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto"
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


   

    return (
      <div className="min-h-screen p-10 bg-transparent flex justify-center items-start mb-40">
        <div className="w-full max-w-5xl space-y-12">
          {/* Baris Pertama - Flipbox 1 dan Text */}
          <div className="flex gap-8 items-start mb-40">
            {/* FlipBox 1 */}
            <div className="flex-1 transform transition-transform duration-300 hover:scale-105">
              <FlipBox
                frontImage={imgFL}
                backImage={quickStatBoxes[0].backImage}
                title=" Profit & Loss Statement For January"
                description="BudiPhone Profit and Loss Statement For January"
                flipboxIndex={1}
              />
            </div>
      
            {/* Text Penjelasan */}
            <div className={`flex-1  transition-opacity duration-300 ${hoveredFlipbox === 1 ? 'opacity-0' : 'opacity-100'}`}>
            <div className="bg-sky-700 rounded-2xl shadow-sm shadow-sky-500 outline outline-slate-400 -outline-offset-8">

</div>          
{/* Text Penjelasan */}
<div className={`flex-1   rounded-xl transition-opacity duration-300 ${hoveredFlipbox === 2 ? 'opacity-0' : 'opacity-100'}`}>          
        
           <div
             className="cursor-pointer group overflow-hidden  duration-1000 hover:duration-1000 relative rounded-xl"
           >
             <div
               className="bg-transparent group-hover:scale-150 -top-12 -left-12 absolute shadow-yellow-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"
             ></div>
             <div
               className="bg-transparent group-hover:scale-150 top-44 left-14 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"
             ></div>
             <div
               className="bg-transparent group-hover:scale-150 top-24 left-56 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"
             ></div>
             <div
               className="bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"
             ></div>
             <div
               className="bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-green-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"
             ></div>
             <div
               className="bg-transparent group-hover:scale-150 -top-24 -left-12 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"
             ></div>
             <div
               className="bg-transparent group-hover:scale-150 top-24 left-12 absolute shadow-sky-500 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"
             ></div>
             <div
               className="w-full h-full p-3  rounded-xl flex-col gap-2 flex justify-center"
             >
              <div
             className="group relative cursor-pointer overflow-hidden  rounded-2xl  pt-12 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl "
           >
             <span
               className="absolute top-0 left-0 z-0 h-32 w-32 rounded-full bg-gradient-to-r from-blue-500/80 to-blue-500/10 opacity-75 transition-all duration-1000 transform group-hover:scale-[20]"
             ></span>
             <div className="relative z-10 mx-auto max-w-md">
               <div className='flex flex-row gap-5'>
               <span
                 className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 transform group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500"
               >
                 <svg
                   className="h-12 w-12 text-white transition-all"
                   stroke="currentColor"
                   stroke-width="1.5"
                   viewBox="0 0 24 24"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path
                     d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                     stroke-linejoin="round"
                     stroke-linecap="round"
                   ></path>
                 </svg>
               </span>
               <div className="group overflow-hidden relative after:duration-500 before:duration-500  duration-500 hover:after:duration-500 hover:after:translate-x-24 hover:before:translate-y-12 hover:before:-translate-x-32 ml-10 -mt- hover:duration-500 after:absolute  after:bg-sky-700 after:rounded-full  after:blur-xl after:bottom-20 after:right-16 after:w-12 after:h-12  before:absolute  before:bg-sky-400 before:rounded-full  before:blur-xl before:top-20 before:right-16 before:w-12 before:h-12  hover:rotate-12 flex justify-center items-center h-28 w-80  dark:bg-neutral-900/50 bg-slate-100/60  rounded-2xl outline outline-slate-400 -outline-offset-8">
                    <div className="z-10 flex flex-col items-center">
                    <span className="text-slate-400 text-4xl font-bold">Profit and Loss</span>
               </div>
           </div>
           
               </div>
             
               <div
                 className=" text-lg p-5 leading-8 text-gray-700 transition-all duration-500 group-hover:text-white"
               >
                
                         <p className="text-gray-600 dark:text-gray-100 text-lg leading-relaxed">
                         A statement that summarize revenue, cost of goods sold, expenses and any other items
                         </p>
                             </div>
                           </div>
                           
                         </div>
             </div>
           </div>
                       
            </div>
              
            </div>
          </div>
          
      
          {/* Baris Kedua - Text dan Flipbox 2 */}
          <div className="flex gap-8 items-start">
            {/* Text Penjelasan */}
            <div className={`flex-1   rounded-xl transition-opacity duration-300 ${hoveredFlipbox === 2 ? 'opacity-0' : 'opacity-100'}`}>
           
        
<div
  className="cursor-pointer group overflow-hidden  duration-1000 hover:duration-1000 relative rounded-xl"
>
  <div
    className="bg-transparent group-hover:scale-150 -top-12 -left-12 absolute shadow-yellow-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"
  ></div>
  <div
    className="bg-transparent group-hover:scale-150 top-44 left-14 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"
  ></div>
  <div
    className="bg-transparent group-hover:scale-150 top-24 left-56 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"
  ></div>
  <div
    className="bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"
  ></div>
  <div
    className="bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-green-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"
  ></div>
  <div
    className="bg-transparent group-hover:scale-150 -top-24 -left-12 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"
  ></div>
  <div
    className="bg-transparent group-hover:scale-150 top-24 left-12 absolute shadow-sky-500 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"
  ></div>
  <div
    className="w-full h-full p-3  rounded-xl flex-col gap-2 flex justify-center"
  >
   <div
  className="group relative cursor-pointer overflow-hidden  rounded-2xl  pt-12 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl "
>
  <span
    className="absolute top-0 left-0 z-0 h-32 w-32 rounded-full bg-gradient-to-r from-orange-500/80 to-blue-500/90 opacity-75 transition-all duration-1000 transform group-hover:scale-[20]"
  ></span>
  <div className="relative z-10 mx-auto max-w-md">
    <div className='flex flex-row gap-5'>
    <span
      className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 transform group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500"
    >
      <svg
        className="h-12 w-12 text-white transition-all"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <div className="group overflow-hidden relative after:duration-500 before:duration-500  duration-500 hover:after:duration-500 hover:after:translate-x-24 hover:before:translate-y-12 hover:before:-translate-x-32 hover:duration-500 after:absolute  after:bg-sky-700 after:rounded-full  after:blur-xl after:bottom-32 after:right-16 after:w-12 after:h-12  before:absolute  before:bg-sky-400 before:rounded-full  before:blur-xl before:top-20 before:right-16 before:w-12 before:h-12  hover:rotate-12 flex justify-center items-center h-28 w-80  dark:bg-neutral-900 bg-slate-100/70  ml-10 -mt-5 rounded-2xl outline outline-slate-400 -outline-offset-8">
         <div className="z-10 flex flex-col items-center">
         <span className="text-slate-400  text-4xl font-bold">Balance Sheet</span>
    </div>
</div>

    </div>
  
    <div
      className=" text-lg p-5 leading-8 text-gray-700 transition-all duration-500 group-hover:text-white"
    >
     
              <p className="text-gray-600 dark:text-gray-100 hover:text-white text-lg leading-relaxed">
               A statement of the assets, liabilities, and equity at one point of time
              </p>
        </div>
      </div>          
    </div>
  </div>
</div>
            
 </div>
      {/* FlipBox 2 */}
            <div className="flex-1transform transition-transform duration-300 hover:scale-105">
              <FlipBox2
                frontImage={imgBL}
                backImage={quickStatBoxes[0].backImage}
                title="Balance Sheet"
                description="Statement of assets, liabilities, and equity"
                flipboxIndex={2}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HillightCard;