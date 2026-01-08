
import React, { useState } from 'react';
import QuizModule from './QuizModule';
import ChromosomeSim from './Simulations/ChromosomeSim';
import { Layers, Info, Target, ChevronRight, Microscope, Sparkles } from 'lucide-react';

const Lesson35: React.FC = () => {
  const [section, setSection] = useState(1);

  return (
    <div className="min-h-screen -m-8 p-8 bg-slate-950 text-slate-200 animate-in fade-in duration-500 pb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Bar */}
        <div className="flex justify-between items-center bg-white/5 backdrop-blur-xl p-3 rounded-3xl border border-white/10 sticky top-4 z-50 shadow-2xl">
          <NavStep active={section === 1} num={1} label="Lý thuyết" onClick={() => setSection(1)} color="bg-purple-600" />
          <NavStep active={section === 2} num={2} label="Mô phỏng 3D" onClick={() => setSection(2)} color="bg-purple-600" />
          <NavStep active={section === 3} num={3} label="Bài tập" onClick={() => setSection(3)} color="bg-purple-600" />
        </div>

        <div className="mt-8">
          {section === 1 && (
            <div className="space-y-10 animate-in slide-in-from-right-4">
              <header className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                   <Microscope size={40} className="text-white" />
                </div>
                <div>
                  <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-tighter">Bài 35: Nhiễm sắc thể</h2>
                  <p className="text-purple-300/60 font-bold uppercase tracking-widest text-sm mt-2">Chromosome & Micro-structure</p>
                </div>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:border-purple-500/50 transition-all shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-purple-500/10 group-hover:scale-150 transition-transform">
                     <Layers size={100} />
                  </div>
                  <h3 className="text-2xl font-black text-purple-400 flex items-center gap-3 mb-6"><Info /> Cấu trúc NST</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    NST là cấu trúc nằm trong nhân tế bào, chứa <b>DNA và protein Histone</b>. Chúng co xoắn để nén DNA dài hàng mét vào nhân tế bào siêu nhỏ.
                  </p>
                </div>
                <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:border-pink-500/50 transition-all shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-pink-500/10 group-hover:scale-150 transition-transform">
                     <Target size={100} />
                  </div>
                  <h3 className="text-2xl font-black text-pink-400 flex items-center gap-3 mb-6"><Sparkles /> Bộ NST (2n)</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    Mỗi loài có bộ NST đặc trưng. Ở người <b>2n = 46</b>. NST tồn tại thành từng cặp tương đồng giống nhau về hình dạng và kích thước.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/40 to-slate-900 p-12 rounded-[3.5rem] border border-purple-500/20 shadow-[0_0_100px_rgba(168,85,247,0.1)]">
                 <h3 className="text-3xl font-black mb-8 text-center text-white">Thành phần cấu tạo siêu hiển vi</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <DataBox label="DNA" val="Mang thông tin" color="text-pink-400" />
                    <DataBox label="Histone" val="Protein cuộn nén" color="text-purple-400" />
                    <DataBox label="Nucleosome" val="Đơn vị cấu trúc" color="text-indigo-400" />
                 </div>
              </div>
              
              <button onClick={() => setSection(2)} className="bg-purple-600 hover:bg-purple-500 text-white px-12 py-6 rounded-[2rem] font-black text-xl flex items-center gap-4 shadow-[0_20px_40px_rgba(168,85,247,0.3)] ml-auto transition-all active:scale-95">
                 Vào phòng soi hiển vi <ChevronRight size={28} />
              </button>
            </div>
          )}

          {section === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
               <header className="flex justify-between items-end mb-4">
                  <div>
                    <h2 className="text-4xl font-black text-white tracking-tight">Mô phỏng Nucleosome</h2>
                    <p className="text-purple-400/70 font-medium">Phóng to để thấy DNA quấn quanh các hạt Histone.</p>
                  </div>
                  <div className="bg-purple-500/10 text-purple-400 px-6 py-2 rounded-2xl text-xs font-black border border-purple-500/20 uppercase">
                     Kính hiển vi ảo
                  </div>
               </header>

               <div className="h-[700px] border-4 border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                  <ChromosomeSim />
               </div>

               <button onClick={() => setSection(3)} className="bg-white text-slate-950 px-12 py-6 rounded-[2rem] font-black text-xl flex items-center gap-4 shadow-xl ml-auto transition-all hover:bg-purple-400">
                  Làm bài tập đánh giá <ChevronRight size={28} />
               </button>
            </div>
          )}

          {section === 3 && (
            <div className="animate-in slide-in-from-right-4 bg-white/5 p-12 rounded-[4rem] border border-white/10 shadow-2xl">
               <header className="mb-12 text-center">
                  <h2 className="text-5xl font-black text-white">Kiểm tra Bài 35</h2>
                  <p className="text-purple-400 mt-4 text-lg">Hoàn thành để hiểu rõ về cấu trúc Nhiễm sắc thể.</p>
               </header>
               <div className="max-w-4xl mx-auto">
                <QuizModule onComplete={() => {}} />
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DataBox = ({ label, val, color }: any) => (
  <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
    <p className={`text-2xl font-black ${color} mb-1`}>{label}</p>
    <p className="text-slate-500 text-sm font-bold uppercase">{val}</p>
  </div>
);

const NavStep = ({ active, num, label, onClick, color }: any) => (
  <button onClick={onClick} className={`flex items-center gap-4 px-8 py-4 rounded-2xl transition-all ${active ? `${color} text-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] scale-105` : 'text-slate-500 hover:text-slate-300'}`}>
    <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${active ? 'bg-white text-slate-900' : 'bg-white/5'}`}>{num}</span>
    <span className="font-black text-sm hidden md:block uppercase tracking-wider">{label}</span>
  </button>
);

export default Lesson35;
