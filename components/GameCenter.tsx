
import React, { useState, useEffect } from 'react';
import { Target, Trophy, Clock, Play, RotateCcw, Zap, ChevronLeft, Star } from 'lucide-react';
import NucleotideMatch from './Games/NucleotideMatch.tsx';
import ProteinPuzzle from './Games/ProteinPuzzle.tsx';

enum GameState {
  LOBBY = 'lobby',
  PLAYING_MATCH = 'playing_match',
  PLAYING_PROTEIN = 'playing_protein'
}

const GameCenter: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.LOBBY);
  const [highScore, setHighScore] = useState(0);
  const [proteinScore, setProteinScore] = useState(0);

  if (gameState === GameState.PLAYING_MATCH) {
    return (
      <div className="animate-in fade-in duration-500">
        <button 
          onClick={() => setGameState(GameState.LOBBY)}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold bg-slate-800 px-4 py-2 rounded-xl"
        >
          <ChevronLeft size={20} /> Quay lại sảnh chờ
        </button>
        <NucleotideMatch onFinish={(score) => {
          if (score > highScore) setHighScore(score);
          setGameState(GameState.LOBBY);
        }} />
      </div>
    );
  }

  if (gameState === GameState.PLAYING_PROTEIN) {
    return (
      <div className="animate-in fade-in duration-500">
        <button 
          onClick={() => setGameState(GameState.LOBBY)}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold bg-slate-800 px-4 py-2 rounded-xl"
        >
          <ChevronLeft size={20} /> Quay lại sảnh chờ
        </button>
        <ProteinPuzzle onFinish={(score) => {
          if (score > proteinScore) setProteinScore(score);
          setGameState(GameState.LOBBY);
        }} />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-block px-4 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
          Arena of Biology
        </div>
        <h2 className="text-5xl font-black text-slate-800 tracking-tighter">Đấu trường Sinh học</h2>
        <p className="text-slate-500 text-lg font-medium">Vượt qua các thử thách để trở thành "Nhà di truyền học đại tài".</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GameCard 
          title="Ai nhanh - Ai đúng"
          desc="Thử thách phản xạ ghép đôi Nucleotide (A-T, G-C) theo thời gian thực. Càng nhanh điểm càng cao!"
          icon={<Zap size={40} />}
          badge="Phản xạ cực nhanh"
          gradient="from-orange-500 via-red-500 to-pink-600"
          onClick={() => setGameState(GameState.PLAYING_MATCH)}
          stats={`Kỷ lục: ${highScore} pts`}
        />
        <GameCard 
          title="Nhà Sinh học nhí"
          desc="Hành trình lắp ghép chuỗi Protein hoàn chỉnh qua việc giải các mật mã di truyền hóc búa."
          icon={<Target size={40} />}
          badge="Tư duy logic"
          gradient="from-blue-600 via-indigo-600 to-purple-700"
          onClick={() => setGameState(GameState.PLAYING_PROTEIN)}
          stats={`Kỷ lục: ${proteinScore} pts`}
        />
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 border-4 border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] opacity-10 rotate-12">
            <Trophy size={200} className="text-yellow-500" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-yellow-500 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.4)]">
              <Trophy className="text-slate-900" size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Bảng vàng danh dự</h3>
              <p className="text-slate-400 text-sm">Những học sinh có điểm số cao nhất tuần này.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              { name: "Trần Bảo Nam", score: 1250, time: "1:45", rank: 1 },
              { name: "Lê Minh Anh", score: 1100, time: "2:10", rank: 2 },
              { name: "Nguyễn Hà Chi", score: 980, time: "2:05", rank: 3 },
            ].map((user, i) => (
              <div key={i} className="group flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-all hover:bg-white/10">
                <div className="flex items-center gap-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                    user.rank === 1 ? 'bg-yellow-500 text-slate-900 shadow-[0_0_15px_#eab308]' : 
                    user.rank === 2 ? 'bg-slate-300 text-slate-700' : 'bg-orange-400 text-orange-900'
                  }`}>
                    {user.rank}
                  </div>
                  <div>
                    <span className="font-black text-white text-lg block">{user.name}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-black">Lớp 9A1 • Cánh Diều</span>
                  </div>
                </div>
                <div className="flex gap-10 text-right">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Điểm số</p>
                    <p className="text-xl font-black text-yellow-500">{user.score}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Thời gian</p>
                    <p className="text-xl font-black text-white">{user.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GameCard = ({ title, desc, icon, badge, gradient, onClick, stats, disabled }: any) => (
  <div 
    onClick={!disabled ? onClick : undefined} 
    className={`group relative h-[420px] rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-500 ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-4 cursor-pointer active:scale-95'}`}
  >
    {/* Background Gradient & Pattern */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} z-0`}></div>
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,transparent_1px)] bg-[size:20px_20px] z-0"></div>
    
    {/* Glass Content */}
    <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
      <div className="flex justify-between items-start">
        <div className="bg-white/20 backdrop-blur-xl p-5 rounded-[2rem] text-white shadow-2xl group-hover:scale-110 transition-transform border border-white/20">
          {icon}
        </div>
        <div className="text-right">
           <span className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
             {badge}
           </span>
           <p className="text-white/60 text-[10px] font-black mt-2 uppercase tracking-tighter">{stats}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-4xl font-black text-white tracking-tighter leading-none">{title}</h4>
        <p className="text-white/80 text-sm font-medium leading-relaxed line-clamp-2">{desc}</p>
        
        <div className="pt-4">
           <button className={`w-full py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all ${
             disabled ? 'bg-black/20 text-white/50 border border-white/10' : 'bg-white text-slate-900 shadow-2xl hover:bg-slate-100'
           }`}>
             {disabled ? 'Sắp ra mắt' : <><Play fill="currentColor" size={20} /> Chơi ngay</>}
           </button>
        </div>
      </div>
    </div>

    {/* Decorative Element */}
    <div className="absolute right-[-20%] top-[-10%] opacity-20 pointer-events-none group-hover:rotate-45 transition-transform duration-1000">
       <Star size={300} strokeWidth={0.5} className="text-white" />
    </div>
  </div>
);

export default GameCenter;
