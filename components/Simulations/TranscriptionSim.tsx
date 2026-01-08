
import React, { useState } from 'react';
import { CheckCircle2, RefreshCcw, ArrowRight } from 'lucide-react';

const TranscriptionSim: React.FC = () => {
  const dnaTemplate = ['T', 'A', 'C', 'G', 'G', 'A', 'A', 'T'];
  const [mRNA, setMRNA] = useState<(string | null)[]>(new Array(8).fill(null));
  const [completed, setCompleted] = useState(false);

  const getRNAComplement = (base: string) => {
    if (base === 'T') return 'A';
    if (base === 'A') return 'U';
    if (base === 'C') return 'G';
    if (base === 'G') return 'C';
    return '';
  };

  const handleRNASelection = (base: string) => {
    const nextIdx = mRNA.findIndex(b => b === null);
    if (nextIdx === -1) return;

    if (base === getRNAComplement(dnaTemplate[nextIdx])) {
      const newRNA = [...mRNA];
      newRNA[nextIdx] = base;
      setMRNA(newRNA);
      if (nextIdx === dnaTemplate.length - 1) setCompleted(true);
    }
  };

  return (
    <div className="flex-1 p-8 flex flex-col items-center justify-center space-y-8 bg-amber-50/20">
      <div className="text-center max-w-2xl">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Mô phỏng Phiên mã</h3>
        <p className="text-sm text-slate-600">RNA Polymerase trượt trên mạch khuôn theo chiều <b>3' → 5'</b> để tổng hợp mRNA theo chiều <b>5' → 3'</b>.</p>
      </div>

      <div className="w-full max-w-4xl bg-white p-12 rounded-3xl shadow-xl border border-slate-200 relative">
        <div className="space-y-12">
           {/* DNA Template Strand */}
           <div className="flex items-center">
             <div className="w-32 text-right pr-4 border-r-2 border-red-100 mr-4">
                <span className="block text-[8px] font-black text-red-400 uppercase">Mạch khuôn DNA</span>
                <span className="text-xl font-black text-red-600">3'</span>
             </div>
             <div className="flex gap-1.5 bg-red-50/50 p-2 rounded-xl">
               {dnaTemplate.map((base, i) => (
                 <div key={i} className={`w-10 h-12 flex items-center justify-center rounded-lg font-black text-white text-sm bg-red-400 border-b-4 border-red-600 shadow-sm`}>
                   {base}
                 </div>
               ))}
             </div>
             <div className="ml-4 text-xl font-black text-red-600">5'</div>
           </div>

           {/* RNA Polymerase Action Area */}
           <div className="flex items-center relative py-4">
              <div className="absolute left-32 right-32 h-1 bg-slate-100 -z-0"></div>
              <div className="w-full flex justify-center">
                 <div className="bg-orange-500/10 border-2 border-dashed border-orange-300 px-4 py-1 rounded-full text-[10px] font-bold text-orange-600 uppercase">Khu vực đang phiên mã</div>
              </div>
           </div>

           {/* mRNA Strand */}
           <div className="flex items-center">
             <div className="w-32 text-right pr-4 border-r-2 border-blue-100 mr-4">
                <span className="block text-[8px] font-black text-blue-400 uppercase">mRNA (Mạch mới)</span>
                <span className="text-xl font-black text-blue-600">5'</span>
             </div>
             <div className="flex gap-1.5 bg-blue-50/50 p-2 rounded-xl">
               {mRNA.map((base, i) => (
                 <div key={i} className={`w-10 h-12 flex items-center justify-center rounded-lg font-black text-white text-sm transition-all duration-500 transform ${base ? 'bg-blue-500 translate-y-0 opacity-100 shadow-md' : 'bg-white border-2 border-dashed border-blue-200 translate-y-4 opacity-30'}`}>
                   {base}
                 </div>
               ))}
               {!completed && <div className="w-10 h-12 flex items-center justify-center"><ArrowRight className="text-blue-300 animate-bounce-x" /></div>}
             </div>
             <div className="ml-4 text-xl font-black text-blue-600">3'</div>
           </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
          {!completed ? (
            <div className="flex justify-center gap-6">
              {['A', 'U', 'G', 'C'].map(base => (
                <button
                  key={base}
                  onClick={() => handleRNASelection(base)}
                  className="w-14 h-14 bg-white border-2 border-blue-500 text-blue-600 rounded-2xl font-black text-lg hover:bg-blue-600 hover:text-white transition-all shadow-lg active:scale-90 flex items-center justify-center"
                >
                  {base}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center animate-in zoom-in">
              <div className="flex items-center justify-center gap-4 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-xl mb-6">
                <CheckCircle2 size={28}/>
                <div className="text-left">
                   <p className="font-black text-lg">Phiên mã thành công!</p>
                   <p className="text-xs text-blue-100">Phân tử mRNA đã được tạo ra sẵn sàng cho quá trình dịch mã.</p>
                </div>
              </div>
              <button onClick={() => {setMRNA(new Array(8).fill(null)); setCompleted(false);}} className="text-slate-500 flex items-center gap-2 mx-auto font-bold hover:text-slate-800 transition-colors">
                <RefreshCcw size={16}/> Thực hiện lại quá trình
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptionSim;
