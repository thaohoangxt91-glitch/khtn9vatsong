
import React, { useState } from 'react';
import { CheckCircle2, RefreshCcw, Info } from 'lucide-react';

const ReplicationSim: React.FC = () => {
  const originalStrand = ['A', 'T', 'G', 'C', 'G', 'A', 'T', 'C'];
  const [userStrand, setUserStrand] = useState<(string | null)[]>(new Array(8).fill(null));
  const [feedback, setFeedback] = useState<{ index: number; correct: boolean } | null>(null);
  const [completed, setCompleted] = useState(false);

  const getComplement = (base: string) => {
    if (base === 'A') return 'T';
    if (base === 'T') return 'A';
    if (base === 'G') return 'C';
    if (base === 'C') return 'G';
    return '';
  };

  const handleBaseClick = (base: string) => {
    const nextIndex = userStrand.findIndex(b => b === null);
    if (nextIndex === -1) return;

    const correctBase = getComplement(originalStrand[nextIndex]);
    if (base === correctBase) {
      const newStrand = [...userStrand];
      newStrand[nextIndex] = base;
      setUserStrand(newStrand);
      setFeedback({ index: nextIndex, correct: true });
      if (nextIndex === originalStrand.length - 1) setCompleted(true);
    } else {
      setFeedback({ index: nextIndex, correct: false });
    }
    
    setTimeout(() => setFeedback(null), 800);
  };

  const reset = () => {
    setUserStrand(new Array(8).fill(null));
    setFeedback(null);
    setCompleted(false);
  };

  return (
    <div className="flex-1 p-8 flex flex-col items-center justify-center space-y-8 bg-slate-50">
      <div className="text-center max-w-2xl">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Mô phỏng Nhân đôi DNA</h3>
        <p className="text-sm text-slate-600">Enzyme DNA polymerase tổng hợp mạch mới theo nguyên tắc bổ sung và luôn theo <b>chiều 5' → 3'</b>.</p>
      </div>

      <div className="w-full max-w-4xl bg-white p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
        {/* Hướng dẫn chiều */}
        <div className="absolute top-4 left-10 flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
           <span className="flex items-center gap-1"><Info size={12}/> Chiều tổng hợp: 5' → 3'</span>
        </div>

        <div className="space-y-12">
          {/* Mạch gốc (Khuôn) */}
          <div className="flex items-center">
            <div className="w-20 flex flex-col items-end pr-4 border-r-2 border-slate-100 mr-4">
               <span className="text-[10px] font-black text-red-500">MẠCH KHUÔN</span>
               <span className="text-lg font-black text-slate-800">3'</span>
            </div>
            <div className="flex gap-2">
              {originalStrand.map((base, i) => (
                <div key={`orig-${i}`} className={`w-10 h-12 flex items-center justify-center rounded-lg font-black text-white shadow-sm transition-all ${getBaseColor(base)}`}>
                  {base}
                </div>
              ))}
            </div>
            <div className="ml-4 text-lg font-black text-slate-800">5'</div>
          </div>

          {/* Mạch mới đang tổng hợp */}
          <div className="flex items-center">
            <div className="w-20 flex flex-col items-end pr-4 border-r-2 border-slate-100 mr-4">
               <span className="text-[10px] font-black text-blue-500">MẠCH MỚI</span>
               <span className="text-lg font-black text-slate-800">5'</span>
            </div>
            <div className="flex gap-2">
              {userStrand.map((base, i) => (
                <div key={`new-${i}`} className={`w-10 h-12 flex items-center justify-center rounded-lg font-black border-2 transition-all duration-300 ${
                  base ? getBaseColor(base) + ' text-white border-transparent scale-100' : 
                  (feedback?.index === i ? (feedback.correct ? 'border-emerald-500 bg-emerald-50 scale-110' : 'border-red-500 bg-red-50 shake') : 'border-slate-200 bg-slate-50 border-dashed')
                }`}>
                  {base}
                </div>
              ))}
              {/* Con trỏ chỉ hướng */}
              {!completed && (
                <div className="w-10 h-12 flex items-center justify-center animate-pulse">
                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
              )}
            </div>
            <div className="ml-4 text-lg font-black text-slate-800">3'</div>
          </div>
        </div>

        {/* Bảng điều khiển */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
          {!completed ? (
            <div className="flex gap-6">
              {['A', 'T', 'G', 'C'].map(base => (
                <button
                  key={base}
                  onClick={() => handleBaseClick(base)}
                  className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black text-white shadow-lg hover:translate-y-[-4px] active:translate-y-0 transition-all ${getBaseColor(base)}`}
                >
                  <span className="text-xl">{base}</span>
                  <span className="text-[8px] opacity-80 font-medium">Nucleotide</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center animate-in zoom-in">
              <div className="bg-emerald-50 text-emerald-700 px-8 py-4 rounded-2xl border border-emerald-100 flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                   <CheckCircle2 size={24} />
                </div>
                <div className="text-left">
                   <p className="font-black">Hoàn thành Nhân đôi!</p>
                   <p className="text-xs opacity-80">Mạch mới đã được tổng hợp chính xác theo NTBS và chiều 5'→3'.</p>
                </div>
              </div>
              <button onClick={reset} className="flex items-center gap-2 mx-auto text-blue-600 font-bold hover:underline bg-white px-4 py-2 rounded-xl border border-blue-100 shadow-sm">
                <RefreshCcw size={18} /> Thử lại mô phỏng
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getBaseColor = (base: string) => {
  switch (base) {
    case 'A': return 'bg-red-500';
    case 'T': return 'bg-emerald-500';
    case 'G': return 'bg-blue-600';
    case 'C': return 'bg-amber-500';
    default: return 'bg-slate-300';
  }
};

export default ReplicationSim;
