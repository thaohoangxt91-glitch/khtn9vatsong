
import React, { useState } from 'react';
import { PlayCircle, CheckCircle2, RotateCcw } from 'lucide-react';

const TranslationSim: React.FC = () => {
  const codons = ['AUG', 'GGC', 'UUA', 'UAA'];
  const anticodons = ['UAC', 'CCG', 'AAU', '---'];
  const aminoAcids = ['Met', 'Gly', 'Leu', 'KẾT THÚC'];
  
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextStep = () => {
    if (step < codons.length - 1) {
      setIsAnimating(true);
      // Giả lập thời gian dịch chuyển ribosome
      setTimeout(() => {
        setStep(prev => prev + 1);
        setIsAnimating(false);
      }, 1000);
    }
  };

  const reset = () => {
    setStep(0);
    setIsAnimating(false);
  };

  return (
    <div className="flex-1 p-8 flex flex-col items-center justify-center space-y-8 bg-purple-50/20">
      <div className="text-center max-w-2xl">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Mô phỏng Dịch mã</h3>
        <p className="text-sm text-slate-600">Ribosome dịch chuyển dọc theo mRNA theo chiều <b>5' → 3'</b> để tổng hợp chuỗi polypeptide.</p>
      </div>

      <div className="w-full max-w-5xl bg-white p-16 rounded-[3rem] shadow-2xl relative min-h-[500px] border border-slate-200 overflow-hidden">
        
        {/* mRNA Strand with 5' and 3' ends */}
        <div className="absolute bottom-20 left-10 right-10 flex items-center">
           <span className="text-xl font-black text-purple-600 mr-4">5'</span>
           <div className="flex-1 h-12 bg-purple-100 rounded-full flex items-center px-4 gap-2 relative overflow-hidden border-2 border-purple-200">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,purple_1px,transparent_1px)] bg-[size:10px_10px]"></div>
              {codons.map((codon, i) => (
                <div key={i} className={`flex-1 h-10 flex items-center justify-center rounded-lg font-mono text-sm font-black transition-all duration-500 ${step === i ? 'bg-white text-purple-700 shadow-sm scale-110 z-10' : 'text-purple-400'}`}>
                  {codon}
                </div>
              ))}
           </div>
           <span className="text-xl font-black text-purple-600 ml-4">3'</span>
        </div>

        {/* Ribosome (Dịch chuyển) */}
        <div 
          className="absolute transition-all duration-1000 ease-in-out flex flex-col items-center"
          style={{ 
            left: `${15 + (step * (70 / (codons.length - 1)))}%`,
            bottom: '100px',
            transform: 'translateX(-50%)'
          }}
        >
          {/* Tiểu phần lớn */}
          <div className="w-48 h-32 bg-yellow-400/90 rounded-t-[4rem] border-4 border-yellow-500 flex flex-col items-center justify-center shadow-xl relative">
             <span className="text-[8px] font-black text-yellow-800 absolute top-4">TIỂU PHẦN LỚN RIBOSOME</span>
             
             {/* P Site and A Site visualization */}
             <div className="flex gap-4 mt-4">
                <div className="w-16 h-20 bg-yellow-600/20 rounded-lg border-2 border-dashed border-yellow-500/50 flex items-center justify-center text-[8px] text-yellow-800 font-bold">Vị trí P</div>
                <div className="w-16 h-20 bg-yellow-600/20 rounded-lg border-2 border-dashed border-yellow-500/50 flex items-center justify-center text-[8px] text-yellow-800 font-bold">Vị trí A</div>
             </div>
          </div>

          {/* Tiểu phần nhỏ */}
          <div className="w-48 h-10 bg-yellow-300 rounded-b-2xl border-x-4 border-b-4 border-yellow-500 shadow-lg flex items-center justify-center">
             <span className="text-[8px] font-black text-yellow-800">TIỂU PHẦN NHỎ</span>
          </div>

          {/* tRNA & Amino Acid (Dòng chảy) */}
          {step < codons.length - 1 && !isAnimating && (
             <div className="absolute -top-32 flex flex-col items-center animate-in slide-in-from-top-10 duration-700">
                <div className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center font-black shadow-xl ring-4 ring-purple-200">
                  {aminoAcids[step]}
                </div>
                <div className="w-1 h-8 bg-slate-300"></div>
                <div className="bg-blue-500 text-white px-3 py-1 rounded-lg font-mono font-bold text-xs shadow-md">
                  {anticodons[step]}
                </div>
                <div className="text-[8px] font-bold text-blue-600 mt-1 uppercase">tRNA</div>
             </div>
          )}
        </div>

        {/* Chuỗi Polypeptide đang hình thành */}
        <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chuỗi Polypeptide</span>
           <div className="flex gap-1">
             {aminoAcids.slice(0, step).map((aa, i) => (
                <div key={i} className="flex items-center">
                   <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-black shadow-md border-2 border-white">
                      {aa}
                   </div>
                   {i < step - 1 && <div className="w-2 h-1 bg-indigo-200"></div>}
                </div>
             ))}
           </div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          {step < codons.length - 1 ? (
            <button 
              onClick={nextStep}
              disabled={isAnimating}
              className={`bg-purple-600 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 shadow-2xl hover:bg-purple-700 hover:scale-105 transition-all active:scale-95 disabled:opacity-50 ${isAnimating ? 'cursor-wait' : ''}`}
            >
              {isAnimating ? (
                <>
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  Ribosome đang dịch chuyển...
                </>
              ) : (
                <>
                  <PlayCircle size={24} /> Khớp đối mã & Trượt Ribosome
                </>
              )}
            </button>
          ) : (
            <div className="text-center animate-in zoom-in">
              <div className="flex items-center gap-4 bg-emerald-600 text-white px-10 py-5 rounded-[2rem] shadow-2xl mb-6">
                <CheckCircle2 size={32} />
                <div className="text-left">
                   <p className="text-xl font-black">Dịch mã Hoàn tất!</p>
                   <p className="text-sm opacity-90">Ribosome gặp mã kết thúc (UAA) và giải phóng chuỗi Polypeptide.</p>
                </div>
              </div>
              <button onClick={reset} className="flex items-center gap-2 mx-auto text-purple-600 font-bold hover:underline bg-white px-6 py-2 rounded-xl border border-purple-100 shadow-sm">
                <RotateCcw size={18} /> Khởi động lại quá trình
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationSim;
