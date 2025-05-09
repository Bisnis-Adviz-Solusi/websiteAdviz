// import {  BarChart, Smartphone, Star } from 'lucide-react';
// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';


// export const Timeline = () => {
//   return (
//     <div>
//       <div className="py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//         <VerticalTimeline lineColor="#EB6404">
//           <VerticalTimelineElement
//             className="vertical-timeline-element--work cursor-pointer"
//           contentStyle={{ 
//             background: 'linear-gradient(to right, #4338ca, #3730a3)', 
//             color: '#fff',
//             boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)',
//             borderRadius: '12px',
//             transition: 'all 0.3s ease'
//           }}
//           contentArrowStyle={{ borderRight: '7px solid #4338ca' }}
//           date="Brand A"
//           iconStyle={{ 
//             background: '#4338ca',
//             color: '#fff',
//             boxShadow: '0 0 0 4px #EB6404, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)'
//           }}
//           icon={<Smartphone size={20} />}
//         >
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="vertical-timeline-element-title text-xl font-bold text-white">Brand A</h3>
//             <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
//               <Star size={16} className="text-yellow-300 mr-1" fill="#facc15" />
//               {/* <span className="text-white text-sm font-medium">4.8</span> */}
//             </div>
//           </div>
//           <p className="text-blue-100 italic">
//             The high-end choice for tech enthusiasts who want cutting-edge innovation.
//           </p>
//         </VerticalTimelineElement>

//         <VerticalTimelineElement
//           className="vertical-timeline-element--work cursor-pointer"
//           contentStyle={{ 
//             background: 'linear-gradient(to right, #EB6404, #1e3a8a)', 
//             color: '#fff',
//             boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)',
//             borderRadius: '12px',
//             transition: 'all 0.3s ease'
//           }}
//           contentArrowStyle={{ borderRight: '7px solid #EB6404' }}
//           date="Brand B"
//           iconStyle={{ 
//             background: '#4338ca',
//             color: '#fff',
//             boxShadow: '0 0 0 4px #EB6404, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)'
//           }}
//           icon={<BarChart size={20} />}
//         >
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="vertical-timeline-element-title text-xl font-bold text-white">Brand B</h3>
//             <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
//               <Star size={16} className="text-yellow-300 mr-1" fill="#facc15" />
//               {/* <span className="text-white text-sm font-medium">4.5</span> */}
//             </div>
//           </div>
//           <p className="text-blue-100 italic">
//             The perfect balance of performance and price, ideal for everyday users.
//           </p>
//         </VerticalTimelineElement>

//         <VerticalTimelineElement
//           className="vertical-timeline-element--work cursor-pointer"
//           contentStyle={{ 
//             background: 'linear-gradient(to right, #EB6404, #1d4ed8)', 
//             color: '#fff',
//             boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)',
//             borderRadius: '12px',
//             transition: 'all 0.3s ease'
//           }}
//           contentArrowStyle={{ borderRight: '7px solid #EB6404' }}
//           date="Brand C"
//           iconStyle={{ 
//             background: '#4338ca',
//             color: '#fff',
//             boxShadow: '0 0 0 4px #EB6404, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05)'
//           }}
//           icon={<Smartphone size={20} />}
//         >
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="vertical-timeline-element-title text-xl font-bold text-white">Brand C</h3>
//             <div className="flex items-center bg-blue-500 bg-opacity-20 rounded-full px-3 py-1">
//               <Star size={16} className="text-yellow-300 mr-1" fill="#facc15" />
//               {/* <span className="text-white text-sm font-medium">4.2</span> */}
//             </div>
//           </div>
//           <p className="text-blue-100 italic">
//             A budget-friendly option, great for those who need a reliable smartphone without breaking the bank.
//           </p>
//           </VerticalTimelineElement>
//         </VerticalTimeline>
//       </div>
//     </div>
//   );
// };