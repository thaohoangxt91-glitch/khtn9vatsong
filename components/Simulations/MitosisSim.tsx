
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const MitosisSim: React.FC = () => {
  const [phase, setPhase] = useState(0); 

  const phases = [
    { name: 'Kì đầu', desc: 'NST kép co xoắn rõ rệt (hình X). Màng nhân biến mất.', details: 'NST bắt đầu đính vào thoi phân bào.' },
    { name: 'Kì giữa', desc: 'NST kép tập trung ở mặt phẳng xích đạo.', details: 'Xếp thành 1 hàng giúp phân chia đều.' },
    { name: 'Kì sau', desc: 'Các chromatid tách nhau và đi về 2 cực.', details: 'Mỗi chromatid trở thành 1 NST đơn.' },
    { name: 'Kì cuối', desc: 'Hình thành 2 nhân mới. Tế bào thắt lại.', details: 'Kết quả tạo ra 2 tế bào con giống hệt mẹ.' }
  ];

  const ChromosomeX = ({ color, className }: { color: string, className?: string }) => (
    <svg width="30" height="50" viewBox="0 0 24 40" className={className}>
      <path d="M4,4 L20,36 M20,4 L4,36" stroke={color} strokeWidth="7" strokeLinecap="round" />
      <circle cx="12" cy="20" r="4" fill="white" />
    </svg>
  );

  const ChromosomeI = ({ color, className }: { color: string, className?: string }) => (
    <svg width="15" height="50" viewBox="0 0 12 40" className={className}>
      <path d="M6,4 L6,36" stroke={color} strokeWidth="7" strokeLinecap="round" />
      <circle cx="6" cy="20" r="3" fill="white" />
    </svg>
  );

  return (
    <div className="bg-slate-950 rounded-[4rem] border-8 border-white/5 p-16 shadow-2xl flex flex-col items-center relative overflow-hidden min-h-[650px] animate-in zoom-in duration-500">
      <div className="mb-12 text-center z-10">
         <div className="inline-block bg-emerald-500 text-slate-900 px-8 py-3 rounded-full text-lg font-black mb-4 shadow-xl">
            NGUYÊN PHÂN: {phases[phase].name}
         </div>
         <p className="text-emerald-100 text-2xl font-bold max-w-2xl">{phases[phase].desc}</p>
         <p className="text-emerald-400/60 mt-2 font-medium">{phases[phase].details}</p>
      </div>

      <div className="relative w-96 h-96 border-[12px] border-emerald-500/20 rounded-full flex items-center justify-center bg-emerald-900/10 shadow-inner">
         {phase > 0 && phase < 3 && (
           <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg width="100%" height="100%">
                 <line x1="192" y1="20" x2="192" y2="376" stroke="white" strokeWidth="2" strokeDasharray="8" />
                 <path d="M192,20 Q60,192 192,376 M192,20 Q324,192 192,376" stroke="white" strokeWidth="1" strokeDasharray="4" fill="none" />
              </svg>
           </div>
         )}

         <div className="relative flex items-center justify-center w-full h-full">
            {phase === 0 && (
              <div className="grid grid-cols-2 gap-8 animate-pulse">
                 <ChromosomeX color="#f87171" className="rotate-12" />
                 <ChromosomeX color="#60a5fa" className="-rotate-12" />
                 <ChromosomeX color="#f87171" className="-rotate-45" />
                 <ChromosomeX color="#60a5fa" className="rotate-45" />
              </div>
            )}
            {phase === 1 && (
              <div className="flex flex-col gap-2 items-center animate-in zoom-in duration-500">
                 <ChromosomeX color="#f87171" className="rotate-90" />
                 <ChromosomeX color="#60a5fa" className="rotate-90" />
                 <ChromosomeX color="#f87171" className="rotate-90" />
                 <ChromosomeX color="#60a5fa" className="rotate-90" />
              </div>
            )}
            {phase === 2 && (
              <div className="w-full h-full flex justify-between px-16">
                 <div className="flex flex-col gap-8 animate-in slide-in-from-right-20 duration-1000">
                    <ChromosomeI color="#f87171" className="-rotate-90 scale-125" />
                    <ChromosomeI color="#60a5fa" className="-rotate-90 scale-125" />
                 </div>
                 <div className="flex flex-col gap-8 animate-in slide-in-from-left-20 duration-1000">
                    <ChromosomeI color="#f87171" className="rotate-90 scale-125" />
                    <ChromosomeI color="#60a5fa" className="rotate-90 scale-125" />
                 </div>
              </div>
            )}
            {phase === 3 && (
              <div className="flex w-full h-full animate-in zoom-in duration-700">
                 <div className="flex-1 border-r-4 border-dashed border-white/10 flex flex-col items-center justify-center gap-4">
                    <div className="w-32 h-32 rounded-full border-4 border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center">
                       <div className="grid grid-cols-2 gap-2"><ChromosomeI color="#f87171" className="scale-50"/><ChromosomeI color="#60a5fa" className="scale-50"/></div>
                    </div>
                 </div>
                 <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <div className="w-32 h-32 rounded-full border-4 border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center">
                       <div className="grid grid-cols-2 gap-2"><ChromosomeI color="#f87171" className="scale-50"/><ChromosomeI color="#60a5fa" className="scale-50"/></div>
                    </div>
                 </div>
              </div>
            )}
         </div>
      </div>

      <div className="mt-20 w-full max-w-2xl px-12 z-10">
         <input 
            type="range" min="0" max="3" step="1" 
            value={phase} onChange={(e) => setPhase(parseInt(e.target.value))}
            className="w-full h-4 bg-white/5 rounded-full appearance-none cursor-pointer accent-emerald-500 border border-white/10"
         />
         <div className="flex justify-between mt-6 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
            <span>Kì Đầu</span><span>Kì Giữa</span><span>Kì Sau</span><span>Kì Cuối</span>
         </div>
      </div>

      <button onClick={() => setPhase(0)} className="absolute top-8 right-8 bg-emerald-500 p-4 rounded-2xl text-slate-900 hover:rotate-180 transition-all duration-700">
        <RefreshCw size={24}/>
      </button>
    </div>
  );
};

export default MitosisSim;
