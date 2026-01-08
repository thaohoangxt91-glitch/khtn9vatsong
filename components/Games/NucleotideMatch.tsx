
import React, { useState, useEffect, useCallback } from 'react';
import { Zap, Clock, Trophy, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

interface NucleotideMatchProps {
  onFinish: (score: number) => void;
}

const NucleotideMatch: React.FC<NucleotideMatchProps> = ({ onFinish }) => {
  const BASES = ['A', 'T', 'G', 'C'];
  const COMPLEMENTS: Record<string, string> = { 'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G' };
  
  const [currentBase, setCurrentBase] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateNewBase = useCallback(() => {
    const random = BASES[Math.floor(Math.random() * BASES.length)];
    setCurrentBase(random);
  }, []);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      // Kết thúc game
    }
  }, [gameStarted, timeLeft]);

  const handleMatch = (choice: string) => {
    if (timeLeft <= 0) return;
    
    if (choice === COMPLEMENTS[currentBase]) {
      setScore(prev => prev + 10);
      setFeedback('correct');
      generateNewBase();
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setFeedback('wrong');
    }
    setTimeout(() => setFeedback(null), 300);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameStarted(true);
    generateNewBase();
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-950 rounded-[4rem] border-8 border-slate-900 shadow-2xl p-12 flex flex-col items-center relative overflow-hidden">
      {/* HUD */}
      <div className="w-full flex justify-between items-center mb-16 relative z-10">
        <div className="flex gap-4">
          <div className="bg-slate-900 border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
             <Clock className="text-orange-500" size={24} />
             <span className={`text-2xl font-black font-mono ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
          </div>
          <div className="bg-slate-900 border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
             <Trophy className="text-yellow-500" size={24} />
             <span className="text-2xl font-black text-white font-mono">{score}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mục tiêu</p>
          <p className="text-white font-bold text-sm">Chọn Base bổ sung chính xác</p>
        </div>
      </div>

      {/* Main Game Area */}
      {!gameStarted ? (
        <div className="text-center space-y-8 animate-in zoom-in duration-500">
           <div className="w-32 h-32 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.3)]">
              <Zap size={64} className="text-orange-500 animate-pulse" />
           </div>
           <div className="space-y-2">
             <h3 className="text-4xl font-black text-white tracking-tighter">Sẵn sàng chưa?</h3>
             <p className="text-slate-400">Ghi càng nhiều điểm càng tốt trong 30 giây.</p>
           </div>
           <button 
             onClick={startGame}
             className="bg-white text-slate-950 px-12 py-6 rounded-[2.5rem] font-black text-xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95"
           >
             BẮT ĐẦU NGAY
           </button>
        </div>
      ) : timeLeft > 0 ? (
        <div className="w-full flex flex-col items-center space-y-16">
          {/* Question Base */}
          <div className={`w-48 h-48 rounded-[3rem] flex items-center justify-center transition-all duration-300 relative ${
            feedback === 'correct' ? 'bg-emerald-500 scale-110 shadow-[0_0_80px_rgba(16,185,129,0.5)]' :
            feedback === 'wrong' ? 'bg-red-500 shake shadow-[0_0_80px_rgba(239,68,68,0.5)]' :
            'bg-slate-900 border-4 border-white/10 shadow-2xl'
          }`}>
             <span className="text-8xl font-black text-white">{currentBase}</span>
             <div className="absolute -bottom-4 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black text-white/50 uppercase">Base Gốc</div>
          </div>

          {/* User Choices */}
          <div className="grid grid-cols-4 gap-6 w-full">
            {BASES.map(base => (
              <button
                key={base}
                onClick={() => handleMatch(base)}
                className={`group h-32 rounded-[2rem] border-4 border-white/5 flex flex-col items-center justify-center transition-all hover:-translate-y-2 active:scale-90 ${getBaseStyles(base)}`}
              >
                <span className="text-4xl font-black mb-1">{base}</span>
                <span className="text-[10px] font-black opacity-50 uppercase tracking-tighter">Bổ sung?</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center space-y-8 animate-in zoom-in duration-500">
           <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(234,179,8,0.3)]">
              <Trophy size={48} className="text-slate-900" />
           </div>
           <div>
             <h3 className="text-5xl font-black text-white tracking-tight">Hết giờ!</h3>
             <p className="text-yellow-500 text-2xl font-black mt-2">Tổng điểm: {score}</p>
           </div>
           <div className="flex gap-4">
             <button onClick={startGame} className="bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-black text-lg flex items-center gap-3">
               <RotateCcw size={20}/> Chơi lại
             </button>
             <button onClick={() => onFinish(score)} className="bg-white/10 border border-white/10 text-white px-10 py-5 rounded-[2rem] font-black text-lg">
               Kết thúc
             </button>
           </div>
        </div>
      )}

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
};

const getBaseStyles = (base: string) => {
  switch (base) {
    case 'A': return 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white hover:shadow-[0_0_40px_rgba(239,68,68,0.4)]';
    case 'T': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]';
    case 'G': return 'bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500 hover:text-white hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]';
    case 'C': return 'bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500 hover:text-white hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]';
    default: return '';
  }
};

export default NucleotideMatch;
