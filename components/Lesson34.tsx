
import React, { useState } from 'react';
import ReplicationSim from './Simulations/ReplicationSim.tsx';
import TranscriptionSim from './Simulations/TranscriptionSim.tsx';
import TranslationSim from './Simulations/TranslationSim.tsx';
import QuizModule from './QuizModule.tsx';
import { Activity, Zap, Cpu, ChevronRight } from 'lucide-react';

const Lesson34: React.FC = () => {
  const [section, setSection] = useState<number>(1);
  const [simType, setSimType] = useState<'rep' | 'trans' | 'transl'>('rep');

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-2 rounded-2xl shadow-sm border border-slate-200 sticky top-0 z-40">
        <NavStep active={section === 1} num={1} label="Kiến thức" onClick={() => setSection(1)} />
        <div className="h-px bg-slate-200 flex-1 mx-2"></div>
        <NavStep active={section === 2} num={2} label="Mô phỏng" onClick={() => setSection(2)} />
        <div className="h-px bg-slate-200 flex-1 mx-2"></div>
        <NavStep active={section === 3} num={3} label="Kiểm tra" onClick={() => setSection(3)} />
      </div>

      <div className="mt-8">
        {section === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <header>
              <h2 className="text-3xl font-black text-slate-800">1. Các quá trình di truyền</h2>
              <p className="text-slate-500 mt-2">Cơ chế truyền đạt thông tin di truyền qua các thế hệ tế bào và biểu hiện tính trạng.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProcessCard 
                title="Nhân đôi DNA" 
                desc="Tạo ra 2 phân tử DNA con giống hệt mẹ. Diễn ra theo NTBS và Bán bảo toàn." 
                icon={<Activity className="text-blue-500" />} 
              />
              <ProcessCard 
                title="Phiên mã" 
                desc="Tổng hợp RNA từ mạch khuôn DNA. Chỉ sử dụng 1 mạch của gene làm khuôn." 
                icon={<Zap className="text-amber-500" />} 
              />
              <ProcessCard 
                title="Dịch mã" 
                desc="Tổng hợp chuỗi polypeptide (Protein) dựa trên trình tự các codon của mRNA." 
                icon={<Cpu className="text-emerald-500" />} 
              />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
               <h3 className="font-bold text-lg border-b pb-2">Nguyên tắc bổ sung (NTBS) xuyên suốt</h3>
               <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-600">
                     <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                     <b>Nhân đôi:</b> A - T, G - C
                  </li>
                  <li className="flex items-center gap-3 text-slate-600">
                     <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                     <b>Phiên mã:</b> A(mạch khuôn) - U(mạch mới), T - A, G - C
                  </li>
                  <li className="flex items-center gap-3 text-slate-600">
                     <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                     <b>Dịch mã:</b> Codon(mRNA) khớp với Anticodon(tRNA)
                  </li>
               </ul>
            </div>
            
            <button onClick={() => setSection(2)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg ml-auto">
               Thực hành mô phỏng <ChevronRight size={20} />
            </button>
          </div>
        )}

        {section === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
             <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-800">2. Mô phỏng các quá trình</h2>
                  <p className="text-slate-500">Chọn quá trình bạn muốn thực hành tương tác.</p>
                </div>
                <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                   <button onClick={() => setSimType('rep')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${simType === 'rep' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>Nhân đôi</button>
                   <button onClick={() => setSimType('trans')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${simType === 'trans' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500'}`}>Phiên mã</button>
                   <button onClick={() => setSimType('transl')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${simType === 'transl' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}>Dịch mã</button>
                </div>
             </header>

             <div className="min-h-[550px] bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
                {simType === 'rep' && <ReplicationSim />}
                {simType === 'trans' && <TranscriptionSim />}
                {simType === 'transl' && <TranslationSim />}
             </div>

             <button onClick={() => setSection(3)} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg ml-auto">
                Kiểm tra kiến thức <ChevronRight size={20} />
             </button>
          </div>
        )}

        {section === 3 && (
          <div className="animate-in slide-in-from-right-4">
             <header className="mb-8 text-center">
                <h2 className="text-3xl font-black text-slate-800">3. Đánh giá năng lực</h2>
                <p className="text-slate-500 mt-2">Cố gắng đạt điểm tối đa để trở thành "Nhà sinh học nhí"!</p>
             </header>
             <QuizModule onComplete={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
};

const ProcessCard = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4">{icon}</div>
    <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const NavStep = ({ active, num, label, onClick }: { active: boolean, num: number, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all ${active ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
  >
    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${active ? 'bg-white text-blue-600' : 'bg-slate-100'}`}>{num}</span>
    <span className="font-bold text-sm hidden md:block">{label}</span>
  </button>
);

export default Lesson34;
