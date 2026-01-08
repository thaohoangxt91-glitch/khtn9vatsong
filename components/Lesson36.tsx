
import React, { useState } from 'react';
import QuizModule from './QuizModule';
import MitosisSim from './Simulations/MitosisSim';
import MeiosisSim from './Simulations/MeiosisSim';
import { GitBranch, RefreshCw, ChevronRight, Info, ArrowRightLeft, Activity } from 'lucide-react';

const Lesson36: React.FC = () => {
  const [section, setSection] = useState(1);
  const [simType, setSimType] = useState<'mitosis' | 'meiosis'>('mitosis');

  return (
    <div className="min-h-screen -m-8 p-8 bg-emerald-950 text-emerald-100 animate-in fade-in duration-500 pb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-white/5 backdrop-blur-xl p-3 rounded-3xl border border-white/10 sticky top-4 z-50 shadow-2xl">
          <NavStep active={section === 1} num={1} label="Lý thuyết" onClick={() => setSection(1)} color="bg-emerald-600" />
          <NavStep active={section === 2} num={2} label="Mô phỏng Phân bào" onClick={() => setSection(2)} color="bg-emerald-600" />
          <NavStep active={section === 3} num={3} label="Kiểm tra" onClick={() => setSection(3)} color="bg-emerald-600" />
        </div>

        <div className="mt-8">
          {section === 1 && (
            <div className="space-y-10 animate-in slide-in-from-right-4">
              <header className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                   <GitBranch size={40} className="text-white" />
                </div>
                <div>
                  <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 tracking-tighter">Bài 36: Nguyên phân - Giảm phân</h2>
                  <p className="text-emerald-300/60 font-bold uppercase tracking-widest text-sm mt-2">Cell Division & Continuity</p>
                </div>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-emerald-900/40 p-10 rounded-[3rem] border border-emerald-500/20 hover:border-emerald-500/50 transition-all shadow-2xl relative overflow-hidden group">
                  <h3 className="text-3xl font-black text-emerald-400 mb-6 flex items-center gap-3"><Activity /> Nguyên phân</h3>
                  <p className="text-emerald-100/70 leading-relaxed text-lg italic mb-6">"Duy trì bộ NST đặc trưng (2n → 2n)"</p>
                  <ul className="space-y-4 text-emerald-200/80 font-medium">
                     <li className="flex items-center gap-3"><div className="w-2 h-2 bg-emerald-400 rounded-full" /> Giúp cơ thể lớn lên, thay thế tế bào chết.</li>
                     <li className="flex items-center gap-3"><div className="w-2 h-2 bg-emerald-400 rounded-full" /> Tế bào con giống hệt tế bào mẹ ban đầu.</li>
                  </ul>
                </div>
                <div className="bg-orange-950/40 p-10 rounded-[3rem] border border-orange-500/20 hover:border-orange-500/50 transition-all shadow-2xl relative overflow-hidden group">
                  <h3 className="text-3xl font-black text-orange-400 mb-6 flex items-center gap-3"><ArrowRightLeft /> Giảm phân</h3>
                  <p className="text-orange-100/70 leading-relaxed text-lg italic mb-6">"Tạo giao tử (2n → n)"</p>
                  <ul className="space-y-4 text-orange-200/80 font-medium">
                     <li className="flex items-center gap-3"><div className="w-2 h-2 bg-orange-400 rounded-full" /> Diễn ra tại cơ quan sinh sản khi trưởng thành.</li>
                     <li className="flex items-center gap-3"><div className="w-2 h-2 bg-orange-400 rounded-full" /> Tạo ra 4 tế bào con có NST giảm đi một nửa.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 p-10 rounded-[3rem] border border-emerald-500/20 text-center">
                 <h4 className="text-xl font-black text-emerald-400 mb-4 uppercase tracking-tighter">Ý nghĩa sinh học</h4>
                 <p className="text-emerald-100/60 leading-relaxed max-w-3xl mx-auto">Sự kết hợp giữa Nguyên phân, Giảm phân và Thụ tinh đảm bảo duy trì ổn định bộ NST đặc trưng của loài qua các thế hệ và tạo ra biến dị di truyền phong phú.</p>
              </div>
              
              <button onClick={() => setSection(2)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-6 rounded-[2rem] font-black text-xl flex items-center gap-4 shadow-xl ml-auto transition-all active:scale-95">
                 Quan sát quá trình phân bào <ChevronRight size={28} />
              </button>
            </div>
          )}

          {section === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
               <header className="flex flex-col md:flex-row justify-between items-center bg-white/5 p-6 rounded-[2.5rem] border border-white/10 gap-4">
                  <div>
                    <h2 className="text-3xl font-black text-white">Phòng thí nghiệm Phân bào</h2>
                    <p className="text-emerald-400 text-sm font-bold">Chọn quá trình bạn muốn quan sát chi tiết</p>
                  </div>
                  <div className="flex bg-slate-900 p-2 rounded-2xl border border-white/10">
                    <button 
                      onClick={() => setSimType('mitosis')}
                      className={`px-6 py-3 rounded-xl font-black text-sm transition-all ${simType === 'mitosis' ? 'bg-emerald-500 text-slate-900' : 'text-slate-500 hover:text-emerald-400'}`}
                    >
                      NGUYÊN PHÂN
                    </button>
                    <button 
                      onClick={() => setSimType('meiosis')}
                      className={`px-6 py-3 rounded-xl font-black text-sm transition-all ${simType === 'meiosis' ? 'bg-violet-600 text-white' : 'text-slate-500 hover:text-violet-400'}`}
                    >
                      GIẢM PHÂN
                    </button>
                  </div>
               </header>

               <div className="min-h-[700px]">
                 {simType === 'mitosis' ? <MitosisSim /> : <MeiosisSim />}
               </div>

               <button onClick={() => setSection(3)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-6 rounded-[2rem] font-black text-xl flex items-center gap-4 shadow-xl ml-auto transition-all">
                  Làm bài trắc nghiệm <ChevronRight size={28} />
               </button>
            </div>
          )}

          {section === 3 && (
            <div className="animate-in slide-in-from-right-4 bg-white/5 p-12 rounded-[4rem] border border-white/10">
               <header className="mb-12 text-center">
                  <h2 className="text-5xl font-black text-white tracking-tight">Thử thách Phân bào</h2>
                  <p className="text-emerald-400 mt-4 text-lg">Bạn đã hiểu rõ về quá trình Nguyên phân và Giảm phân?</p>
               </header>
               <QuizModule onComplete={() => {}} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NavStep = ({ active, num, label, onClick, color }: any) => (
  <button onClick={onClick} className={`flex items-center gap-4 px-8 py-4 rounded-2xl transition-all ${active ? `${color} text-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] scale-105` : 'text-slate-500 hover:text-slate-300'}`}>
    <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${active ? 'bg-white text-slate-900' : 'bg-white/5'}`}>{num}</span>
    <span className="font-black text-sm hidden md:block uppercase tracking-wider">{label}</span>
  </button>
);

export default Lesson36;
