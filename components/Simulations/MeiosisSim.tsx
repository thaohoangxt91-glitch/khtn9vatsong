
import React, { useState } from 'react';
import { RefreshCw, Info, Layers } from 'lucide-react';

const MeiosisSim: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { name: 'Kì đầu I', desc: 'NST tương đồng tiếp hợp và trao đổi chéo.', details: 'Tạo ra các tổ hợp gene mới, tăng biến dị.' },
    { name: 'Kì giữa I', desc: 'Các cặp NST tương đồng xếp thành 2 hàng.', details: 'Xếp ngẫu nhiên ở mặt phẳng xích đạo.' },
    { name: 'Kì sau I', desc: 'NST kép trong cặp tương đồng tách nhau về 2 cực.', details: 'Số lượng NST giảm đi một nửa (từ 2n kép về n kép).' },
    { name: 'Kì cuối I', desc: 'Hình thành 2 tế bào con có bộ NST n kép.', details: 'Kết thúc giảm phân I.' },
    { name: 'Kì đầu II', desc: 'NST n kép co xoắn lại.', details: 'Bắt đầu giai đoạn giống Nguyên phân.' },
    { name: 'Kì giữa II', desc: 'NST n kép xếp thành 1 hàng.', details: 'Đính vào thoi phân bào tại tâm động.' },
    { name: 'Kì sau II', desc: 'Các chromatid tách nhau và đi về 2 cực.', details: 'Mỗi chromatid thành 1 NST đơn.' },
    { name: 'Kì cuối II', desc: 'Tạo ra 4 tế bào con có bộ NST n đơn.', details: 'Các tế bào này sẽ phát triển thành giao tử.' }
  ];

  const ChromosomeX = ({ color1, color2, className }: { color1: string, color2?: string, className?: string }) => (
    <svg width="30" height="50" viewBox="0 0 24 40" className={className}>
      <path d="M4,4 L12,20 L4,36" stroke={color1} strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M20,4 L12,20 L20,36" stroke={color2 || color1} strokeWidth="7" strokeLinecap="round" fill="none" />
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
    <div className="bg-slate-950 rounded-[4rem] border-8 border-violet-900/30 p-16 shadow-2xl flex flex-col items-center relative overflow-hidden min-h-[700px] animate-in zoom-in duration-500">
      <div className="mb-12 text-center z-10">
         <div className="inline-block bg-violet-600 text-white px-8 py-3 rounded-full text-lg font-black mb-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            GIẢM PHÂN {step < 4 ? 'I' : 'II'}: {steps[step].name}
         </div>
         <p className="text-violet-100 text-2xl font-bold max-w-2xl">{steps[step].desc}</p>
         <p className="text-violet-400/60 mt-2 font-medium">{steps[step].details}</p>
      </div>

      <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
        {/* Render logic based on step */}
        {step === 0 && (
          <div className="flex gap-12 animate-in pulse duration-1000">
             <div className="flex flex-col items-center">
                <div className="flex -space-x-4">
                  <ChromosomeX color1="#f87171" color2="#60a5fa" className="rotate-6" />
                  <ChromosomeX color1="#60a5fa" color2="#f87171" className="-rotate-6" />
                </div>
                <span className="text-[10px] font-black text-violet-400 mt-4 uppercase">Cặp tương đồng tiếp hợp</span>
             </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4 items-center">
             <div className="flex gap-4 border-r-4 border-dashed border-white/10 pr-4">
                <ChromosomeX color1="#f87171" color2="#60a5fa" />
                <ChromosomeX color1="#f87171" />
             </div>
             <div className="flex gap-4 border-l-4 border-dashed border-white/10 pl-4">
                <ChromosomeX color1="#60a5fa" color2="#f87171" />
                <ChromosomeX color1="#60a5fa" />
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full flex justify-between px-20">
             <div className="flex flex-col gap-8 animate-in slide-in-from-right-20">
                <ChromosomeX color1="#f87171" color2="#60a5fa" />
                <ChromosomeX color1="#f87171" />
             </div>
             <div className="flex flex-col gap-8 animate-in slide-in-from-left-20">
                <ChromosomeX color1="#60a5fa" color2="#f87171" />
                <ChromosomeX color1="#60a5fa" />
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex w-full h-full animate-in zoom-in">
             <div className="flex-1 flex flex-col items-center justify-center gap-4 border-r-2 border-white/5">
                <div className="w-40 h-40 rounded-full border-4 border-violet-500/30 bg-violet-500/5 flex items-center justify-center gap-4">
                   {/* FIXED: Replaced 'scale' prop with 'className' for scaling */}
                   <ChromosomeX color1="#f87171" color2="#60a5fa" className="scale-[0.8]" />
                   <ChromosomeX color1="#f87171" className="scale-[0.8]" />
                </div>
                <span className="text-xs font-black text-violet-500">n kép = 2</span>
             </div>
             <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <div className="w-40 h-40 rounded-full border-4 border-violet-500/30 bg-violet-500/5 flex items-center justify-center gap-4">
                   {/* FIXED: Replaced 'scale' prop with 'className' for scaling */}
                   <ChromosomeX color1="#60a5fa" color2="#f87171" className="scale-[0.8]" />
                   <ChromosomeX color1="#60a5fa" className="scale-[0.8]" />
                </div>
                <span className="text-xs font-black text-violet-500">n kép = 2</span>
             </div>
          </div>
        )}

        {step === 5 && (
           <div className="flex w-full gap-20 justify-center">
              <div className="flex flex-col gap-2 rotate-90"><ChromosomeX color1="#f87171" /><ChromosomeX color1="#60a5fa" /></div>
              <div className="flex flex-col gap-2 rotate-90"><ChromosomeX color1="#60a5fa" /><ChromosomeX color1="#f87171" /></div>
           </div>
        )}

        {step === 7 && (
          <div className="grid grid-cols-4 gap-4 w-full px-8 animate-in zoom-in">
             {[1,2,3,4].map(i => (
               <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 rounded-full border-2 border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center">
                     <div className="flex gap-1">
                        <ChromosomeI color={i % 2 === 0 ? "#f87171" : "#60a5fa"} />
                        <ChromosomeI color={i > 2 ? "#60a5fa" : "#f87171"} />
                     </div>
                  </div>
                  <span className="text-[10px] font-black text-emerald-500">Giao tử (n)</span>
               </div>
             ))}
          </div>
        )}
      </div>

      <div className="mt-20 w-full max-w-3xl px-12 z-10">
         <div className="flex justify-between mb-4">
            <span className="text-[10px] font-black text-violet-500 uppercase">Giai đoạn I (2n -> n kép)</span>
            <span className="text-[10px] font-black text-emerald-500 uppercase">Giai đoạn II (n kép -> n đơn)</span>
         </div>
         <input 
            type="range" min="0" max="7" step="1" 
            value={step} onChange={(e) => setStep(parseInt(e.target.value))}
            className="w-full h-4 bg-white/5 rounded-full appearance-none cursor-pointer accent-violet-500 border border-white/10"
         />
         <div className="flex justify-between mt-6 text-[8px] font-black text-slate-500 uppercase tracking-tighter">
            {steps.map((s, i) => <span key={i} className={step === i ? 'text-violet-400 scale-125 transition-all' : ''}>{s.name}</span>)}
         </div>
      </div>

      <div className="absolute bottom-8 left-8 flex gap-4">
         <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <Layers size={14} className="text-violet-400" />
            <span className="text-[10px] font-black text-slate-400">2n = 4</span>
         </div>
         <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <Info size={14} className="text-emerald-400" />
            <span className="text-[10px] font-black text-slate-400">Tạo 4 giao tử</span>
         </div>
      </div>

      <button onClick={() => setStep(0)} className="absolute top-8 right-8 bg-violet-600 p-4 rounded-2xl text-white hover:rotate-180 transition-all duration-700">
        <RefreshCw size={24}/>
      </button>
    </div>
  );
};

export default MeiosisSim;
