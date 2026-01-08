
import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Info, Layers } from 'lucide-react';

const ChromosomeSim: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(1); // 1: Chromosome, 2: Fiber, 3: Nucleosome

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 rounded-[2.5rem] overflow-hidden relative border-8 border-slate-900 shadow-2xl">
      {/* HUD Overlay */}
      <div className="absolute top-8 left-8 z-20 flex gap-3">
        <button 
          onClick={() => setZoomLevel(Math.max(1, zoomLevel - 1))}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white p-4 rounded-2xl border border-white/10 transition-all shadow-lg active:scale-90"
        >
          <ZoomOut size={24} />
        </button>
        <button 
          onClick={() => setZoomLevel(Math.min(3, zoomLevel + 1))}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white p-4 rounded-2xl border border-white/10 transition-all shadow-lg active:scale-90"
        >
          <ZoomIn size={24} />
        </button>
      </div>

      <div className="absolute top-8 right-8 z-20">
        <div className="bg-indigo-600/30 border border-indigo-400/50 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl">
           <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block mb-1">Cấp độ quan sát</span>
           <span className="text-white font-black text-lg">
             {zoomLevel === 1 && "1. Nhiễm sắc thể kép"}
             {zoomLevel === 2 && "2. Sợi nhiễm sắc (30nm)"}
             {zoomLevel === 3 && "3. Cấu trúc Nucleosome"}
           </span>
        </div>
      </div>

      {/* Main Render Area */}
      <div className="flex-1 flex items-center justify-center relative bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_#020617_100%)]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {zoomLevel === 1 && (
          <div className="animate-in zoom-in duration-700 flex flex-col items-center">
            <svg width="240" height="360" viewBox="0 0 200 300">
              <defs>
                <linearGradient id="chromoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:'#6366f1', stopOpacity:1}} />
                  <stop offset="50%" style={{stopColor:'#a855f7', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#ec4899', stopOpacity:1}} />
                </linearGradient>
                <filter id="neonGlow">
                  <feGaussianBlur stdDeviation="5" result="blur"/>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
              </defs>
              <path d="M70,20 Q105,150 70,280" stroke="url(#chromoGrad)" strokeWidth="40" strokeLinecap="round" fill="none" filter="url(#neonGlow)" />
              <path d="M130,20 Q95,150 130,280" stroke="url(#chromoGrad)" strokeWidth="40" strokeLinecap="round" fill="none" filter="url(#neonGlow)" />
              <circle cx="100" cy="150" r="18" fill="white" className="animate-pulse shadow-2xl" />
            </svg>
            <div className="mt-8 text-indigo-400 font-black text-xs uppercase tracking-[0.2em] animate-bounce">Phóng to để soi sợi DNA</div>
          </div>
        )}

        {zoomLevel === 2 && (
          <div className="animate-in zoom-in duration-700 w-full h-full flex items-center justify-center">
             <div className="relative">
                <svg width="600" height="300" viewBox="0 0 600 300">
                   <path 
                     d="M0,150 Q75,50 150,150 T300,150 T450,150 T600,150" 
                     stroke="#f472b6" strokeWidth="30" fill="none" strokeDasharray="10 10"
                     className="animate-[dash_20s_linear_infinite]"
                   />
                   {[75, 225, 375, 525].map((cx, i) => (
                      <circle key={i} cx={cx} cy={i % 2 === 0 ? 95 : 205} r="20" fill="#6366f1" className="animate-pulse" />
                   ))}
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 rounded-2xl text-white text-center">
                   <p className="font-bold text-sm mb-1 uppercase tracking-wider text-indigo-300">Sợi siêu xoắn</p>
                   <p className="text-[10px] opacity-70">Đường kính khoảng 30nm</p>
                </div>
             </div>
          </div>
        )}

        {zoomLevel === 3 && (
          <div className="animate-in zoom-in duration-700 w-full h-full flex flex-col items-center justify-center">
            <div className="flex gap-32 items-center">
               {/* Nucleosome Unit */}
               <div className="relative group perspective-1000">
                  {/* Histone Core - Improved Visual as a solid block */}
                  <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-indigo-900 via-indigo-600 to-blue-400 shadow-[0_0_80px_rgba(79,70,229,0.4)] border-4 border-white/20 relative flex items-center justify-center">
                     <div className="grid grid-cols-2 grid-rows-2 gap-1 w-3/4 h-3/4 opacity-40">
                        <div className="bg-white/20 rounded-full"></div>
                        <div className="bg-white/20 rounded-full"></div>
                        <div className="bg-white/20 rounded-full"></div>
                        <div className="bg-white/20 rounded-full"></div>
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] text-white font-black text-center px-4 uppercase tracking-tighter">Lõi 8 Protein Histone</span>
                     </div>
                  </div>

                  {/* DNA Wrapping - Improved as a thick thread around the spool */}
                  <div className="absolute inset-0 -m-8 pointer-events-none">
                     <svg width="100%" height="100%" viewBox="0 0 200 200" className="overflow-visible animate-[spin_10s_linear_infinite]">
                        <circle cx="100" cy="100" r="110" fill="none" stroke="#fb7185" strokeWidth="12" strokeDasharray="500 200" strokeLinecap="round" />
                        <circle cx="100" cy="100" r="105" fill="none" stroke="#f43f5e" strokeWidth="4" opacity="0.5" />
                     </svg>
                  </div>
                  
                  <div className="absolute -right-20 top-0 bg-rose-600 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-xl border border-rose-400/50">
                    DNA quấn 1.67 vòng
                  </div>
               </div>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl px-10">
               <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl">
                  <h5 className="text-indigo-400 font-black text-xs mb-3 flex items-center gap-2"><Layers size={14}/> THÀNH PHẦN</h5>
                  <p className="text-white/80 text-[11px] leading-relaxed">DNA mang thông tin di truyền kết hợp với protein Histone để bảo vệ và nén thông tin.</p>
               </div>
               <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl">
                  <h5 className="text-rose-400 font-black text-xs mb-3 flex items-center gap-2"><Info size={14}/> NUCLEOSOME</h5>
                  <p className="text-white/80 text-[11px] leading-relaxed">Là đơn vị cơ bản. Mỗi nucleosome nén DNA ngắn lại khoảng 7 lần.</p>
               </div>
               <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl">
                  <h5 className="text-emerald-400 font-black text-xs mb-3 flex items-center gap-2">💡 Ý NGHĨA</h5>
                  <p className="text-white/80 text-[11px] leading-relaxed">Giúp nén phân tử DNA dài vài cm vào trong nhân tế bào chỉ rộng vài micromet.</p>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Legend */}
      <div className="p-8 bg-slate-900 border-t border-white/5 flex justify-between items-center">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_#f43f5e]"></div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sợi DNA</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_15px_#6366f1]"></div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Khối Histone</span>
            </div>
         </div>
         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 italic bg-white/5 px-4 py-2 rounded-full border border-white/5">
            Mô phỏng Khoa học Tự nhiên 9 - Cánh Diều
         </div>
      </div>
    </div>
  );
};

export default ChromosomeSim;
