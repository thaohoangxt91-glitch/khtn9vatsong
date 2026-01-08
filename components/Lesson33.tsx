
import React, { useState } from 'react';
import DNA3DViewer from './Molecular3D/DNA3DViewer.tsx';
import QuizModule from './QuizModule.tsx';
import { Info, Boxes, BrainCircuit, ChevronRight } from 'lucide-react';

const Lesson33: React.FC = () => {
  const [section, setSection] = useState<number>(1);

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-2 rounded-2xl shadow-sm border border-slate-200 sticky top-0 z-40">
        <NavStep active={section === 1} num={1} label="Kiến thức" onClick={() => setSection(1)} />
        <div className="h-px bg-slate-200 flex-1 mx-2"></div>
        <NavStep active={section === 2} num={2} label="Mô hình 3D" onClick={() => setSection(2)} />
        <div className="h-px bg-slate-200 flex-1 mx-2"></div>
        <NavStep active={section === 3} num={3} label="Kiểm tra" onClick={() => setSection(3)} />
      </div>

      <div className="mt-8">
        {section === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <header>
              <h2 className="text-3xl font-black text-slate-800">1. Kiến thức cần nhớ</h2>
              <p className="text-slate-500 mt-2">Nội dung trọng tâm về Gene và cấu trúc DNA theo SGK Cánh Diều.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm space-y-3">
                <h3 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                   <Info size={20} /> Khái niệm Gene
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  <b>Gene</b> là một đoạn của phân tử DNA mang thông tin quy định sản phẩm là chuỗi polypeptide hoặc RNA.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border-l-4 border-emerald-500 shadow-sm space-y-3">
                <h3 className="text-lg font-bold text-emerald-700 flex items-center gap-2">
                   <Boxes size={20} /> Cấu tạo Nucleotide
                </h3>
                <p className="text-slate-600">DNA gồm 4 loại đơn phân: <b>A, T, G, C</b>. Mỗi nucleotide gồm: Nhóm phosphate, đường deoxyribose và base nitơ.</p>
              </div>

              <div className="md:col-span-2 bg-gradient-to-br from-indigo-50 to-white p-6 rounded-3xl border border-indigo-100 shadow-sm">
                 <h3 className="text-lg font-bold text-indigo-800 mb-4">Mô hình xoắn kép của Watson - Crick</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-4 rounded-xl border border-indigo-100">
                       <p className="font-bold text-indigo-600">Kích thước</p>
                       <p className="text-slate-500">Đường kính 2nm, mỗi chu kì dài 3.4nm (10 cặp nu).</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-indigo-100">
                       <p className="font-bold text-indigo-600">Liên kết</p>
                       <p className="text-slate-500">A-T (2 liên kết H), G-C (3 liên kết H).</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-indigo-100">
                       <p className="font-bold text-indigo-600">Chiều dài</p>
                       <p className="text-slate-500">Hai mạch song song, ngược chiều nhau (3'-5' và 5'-3').</p>
                    </div>
                 </div>
              </div>
            </div>
            
            <button onClick={() => setSection(2)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg ml-auto">
               Khám phá mô hình 3D <ChevronRight size={20} />
            </button>
          </div>
        )}

        {section === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
             <header className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-black text-slate-800">2. Mô phỏng tương tác 3D</h2>
                  <p className="text-slate-500 mt-2">Chạm vào mô hình để quan sát các thành phần cấu tạo.</p>
                </div>
                <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100">
                   Mô phỏng DNA xoắn kép
                </div>
             </header>

             <div className="h-[550px] bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                <DNA3DViewer />
             </div>

             <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-amber-800 text-sm flex gap-3 italic">
                <span>💡</span>
                <span>Thử xoay mô hình để thấy rõ các cặp base liên kết với nhau ở giữa phân tử và khung xương đường-phosphate ở bên ngoài.</span>
             </div>

             <button onClick={() => setSection(3)} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg ml-auto">
                Làm bài kiểm tra năng lực <ChevronRight size={20} />
             </button>
          </div>
        )}

        {section === 3 && (
          <div className="animate-in slide-in-from-right-4">
             <header className="mb-8 text-center">
                <h2 className="text-3xl font-black text-slate-800">3. Thử thách năng lực</h2>
                <p className="text-slate-500 mt-2">Hoàn thành bộ câu hỏi để đánh giá mức độ hiểu bài.</p>
             </header>
             <QuizModule onComplete={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
};

const NavStep = ({ active, num, label, onClick }: { active: boolean, num: number, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all ${active ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
  >
    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${active ? 'bg-white text-blue-600' : 'bg-slate-100'}`}>{num}</span>
    <span className="font-bold text-sm hidden md:block">{label}</span>
  </button>
);

export default Lesson33;
