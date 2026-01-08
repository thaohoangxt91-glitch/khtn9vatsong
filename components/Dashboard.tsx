
import React from 'react';
import { AppView } from '../types';
import { BookOpen, Activity, Dna, BrainCircuit, Gamepad2, ArrowRight, Layers, GitBranch } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-[3rem] p-12 text-white shadow-2xl overflow-hidden relative border-8 border-white/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-black uppercase tracking-widest mb-6">
            Học tập tương tác 2024
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">Bản đồ Di truyền học</h2>
          <p className="text-blue-100 text-xl mb-8 leading-relaxed opacity-80 font-medium">
            Khám phá thế giới vi mô qua các mô phỏng 3D sống động theo chương trình Cánh Diều.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => onNavigate(AppView.LESSON_33)} className="bg-white text-blue-900 font-black py-4 px-10 rounded-2xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)] flex items-center gap-2">
              Bắt đầu ngay <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="absolute right-[-100px] top-[-100px] opacity-20 pointer-events-none rotate-12 scale-150">
            <Dna size={400} strokeWidth={0.5} />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard 
          title="Bài 33: Gene & DNA"
          desc="Cấu trúc xoắn kép & Nucleotide."
          icon={<BookOpen size={28} />}
          gradient="from-blue-600 to-cyan-500"
          onClick={() => onNavigate(AppView.LESSON_33)}
        />
        <FeatureCard 
          title="Bài 34: Các quá trình"
          desc="Nhân đôi, Phiên mã, Dịch mã."
          icon={<Activity size={28} />}
          gradient="from-orange-500 to-amber-400"
          onClick={() => onNavigate(AppView.LESSON_34)}
        />
        <FeatureCard 
          title="Bài 35: NST"
          desc="Cấu trúc siêu hiển vi Nucleosome."
          icon={<Layers size={28} />}
          gradient="from-purple-600 to-pink-500"
          onClick={() => onNavigate(AppView.LESSON_35)}
        />
        <FeatureCard 
          title="Bài 36: Phân bào"
          desc="Nguyên phân & Giảm phân trực quan."
          icon={<GitBranch size={28} />}
          gradient="from-emerald-600 to-teal-500"
          onClick={() => onNavigate(AppView.LESSON_36)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white border border-white/5 shadow-2xl group hover:border-indigo-500/50 transition-all">
           <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-500 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                <BrainCircuit size={32} />
              </div>
              <h3 className="text-2xl font-black">Luyện tập & Đánh giá</h3>
           </div>
           <p className="text-slate-400 mb-8 leading-relaxed">Hệ thống 80+ câu hỏi phân hóa từ nhận biết đến vận dụng cao.</p>
           <button onClick={() => onNavigate(AppView.QUIZ)} className="w-full bg-white/5 py-4 rounded-2xl font-black text-white border border-white/10 hover:bg-white hover:text-slate-900 transition-all">Vào phòng thi</button>
        </section>
        <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white border border-white/5 shadow-2xl group hover:border-orange-500/50 transition-all">
           <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-500 rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                <Gamepad2 size={32} />
              </div>
              <h3 className="text-2xl font-black">Giải trí Khoa học</h3>
           </div>
           <p className="text-slate-400 mb-8 leading-relaxed">Xây dựng chuỗi DNA và Protein qua các mini-game hấp dẫn.</p>
           <button onClick={() => onNavigate(AppView.GAME)} className="w-full bg-white/5 py-4 rounded-2xl font-black text-white border border-white/10 hover:bg-white hover:text-slate-900 transition-all">Chơi game</button>
        </section>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc, icon, gradient, onClick }: any) => (
  <div onClick={onClick} className={`bg-gradient-to-br ${gradient} p-8 rounded-[2.5rem] text-white shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer group relative overflow-hidden h-64 flex flex-col justify-end`}>
    <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-3 rounded-2xl group-hover:scale-125 transition-transform">
      {icon}
    </div>
    <div className="relative z-10">
      <h4 className="text-xl font-black mb-2">{title}</h4>
      <p className="text-white/70 text-xs font-medium leading-relaxed">{desc}</p>
    </div>
    <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
       {icon}
    </div>
  </div>
);

export default Dashboard;
