
import React, { useState, useEffect, useCallback } from 'react';
import { Target, Trophy, Clock, RotateCcw, Brain, CheckCircle2, Info, ArrowRight } from 'lucide-react';

interface ProteinPuzzleProps {
  onFinish: (score: number) => void;
}

const GENETIC_CODE: Record<string, { aa: string, name: string }> = {
  'AUG': { aa: 'Met', name: 'Mở đầu' },
  'UUU': { aa: 'Phe', name: 'Phenylalanine' },
  'AAA': { aa: 'Lys', name: 'Lysine' },
  'GGG': { aa: 'Gly', name: 'Glycine' },
  'CCC': { aa: 'Pro', name: 'Proline' },
  'UUA': { aa: 'Leu', name: 'Leucine' },
  'GGC': { aa: 'Gly', name: 'Glycine' },
  'UAA': { aa: 'STOP', name: 'Kết thúc' },
  'UAG': { aa: 'STOP', name: 'Kết thúc' },
};

const AMINO_ACIDS = [
  { id: 'Met', color: 'bg-emerald-500' },
  { id: 'Phe', color: 'bg-blue-500' },
  { id: 'Lys', color: 'bg-amber-500' },
  { id: 'Gly', color: 'bg-rose-500' },
  { id: 'Pro', color: 'bg-violet-500' },
  { id: 'Leu', color: 'bg-cyan-500' },
  { id: 'STOP', color: 'bg-slate-700' },
];

const ProteinPuzzle: React.FC<ProteinPuzzleProps> = ({ onFinish }) => {
  const [currentCodon, setCurrentCodon] = useState('');
  const [proteinChain, setProteinChain] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameStarted, setGameStarted] = useState(false);
  const [feedback, setFeedback] = useState<{ status: 'correct' | 'wrong', msg: string } | null>(null);

  const generateCodon = useCallback(() => {
    const keys = Object.keys(GENETIC_CODE);
    const random = keys[Math.floor(Math.random() * keys.length)];
    setCurrentCodon(random);
  }, []);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameStarted) {
      // Game over logic is handled by the render
    }
  }, [gameStarted, timeLeft]);

  const handleAASelection = (aaId: string) => {
    if (!gameStarted || timeLeft <= 0) return;

    const correctAA = GENETIC_CODE[currentCodon].aa;
    
    if (aaId === correctAA) {
      setScore(prev => prev + 25);
      setProteinChain(prev => [...prev, aaId]);
      setFeedback({ status: 'correct', msg: `Chính xác! ${currentCodon} mã hóa cho ${GENETIC_CODE[currentCodon].name}` });
      generateCodon();
    } else {
      setScore(prev => Math.max(0, prev - 10));
      setFeedback({ status: 'wrong', msg: 'Sai rồi! Hãy xem lại bảng mã.' });
    }
    
    setTimeout(() => setFeedback(null), 2000);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(45);
    setProteinChain([]);
    setGameStarted(true);
    generateCodon();
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-950 rounded-[4rem] border-8 border-indigo-900/30 shadow-2xl p-12 flex flex-col items-center relative overflow-hidden min-h-[700px]">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-500 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500 blur-[100px] rounded-full"></div>
      </div>

      {/* HUD */}
      <div className="w-full flex justify-between items-center mb-12 relative z-10">
        <div className="flex gap-4">
          <StatBox icon={<Clock className="text-blue-400" />} val={`${timeLeft}s`} label="Thời gian" />
          <StatBox icon={<Trophy className="text-yellow-400" />} val={score} label="Điểm số" />
        </div>
        <div className="text-right">
           <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl">
              <Brain className="text-indigo-400" size={18} />
              <span className="text-xs font-black text-indigo-300 uppercase tracking-widest">Nhiệm vụ: Giải mã Protein</span>
           </div>
        </div>
      </div>

      {!gameStarted ? (
        <div className="text-center space-y-8 animate-in zoom-in z-10 py-20">
           <div className="w-32 h-32 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto border-4 border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.3)]">
              <Target size={64} className="text-indigo-400 animate-pulse" />
           </div>
           <div className="space-y-4 max-w-md mx-auto">
             <h3 className="text-5xl font-black text-white tracking-tighter">Nhà Sinh học nhí</h3>
             <p className="text-slate-400 leading-relaxed font-medium">
               Dựa trên mã bộ ba (Codon) của mRNA, hãy chọn đúng Amino Acid tương ứng để lắp ghép chuỗi polypeptide hoàn chỉnh.
             </p>
           </div>
           <button 
             onClick={startGame}
             className="bg-indigo-600 text-white px-12 py-6 rounded-[2.5rem] font-black text-xl hover:bg-indigo-500 transition-all shadow-2xl active:scale-95"
           >
             BẮT ĐẦU GIẢI MÃ
           </button>
        </div>
      ) : timeLeft > 0 ? (
        <div className="w-full space-y-12 z-10">
          {/* Current mRNA View */}
          <div className="flex flex-col items-center">
             <div className="bg-slate-900/80 border-2 border-white/10 p-10 rounded-[3rem] shadow-2xl flex flex-col items-center gap-4 relative">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">mRNA Codon</span>
                <h4 className="text-7xl font-black text-white tracking-widest">{currentCodon}</h4>
                <div className="absolute -right-4 -top-4 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-slate-950">
                   <Target size={20} className="text-white" />
                </div>
             </div>
             
             {feedback && (
                <div className={`mt-6 px-6 py-3 rounded-2xl font-bold text-sm animate-in slide-in-from-top-2 flex items-center gap-2 border ${
                  feedback.status === 'correct' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}>
                  {feedback.status === 'correct' ? <CheckCircle2 size={16}/> : <Info size={16}/>}
                  {feedback.msg}
                </div>
             )}
          </div>

          {/* User Options */}
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
             {AMINO_ACIDS.map(aa => (
               <button
                 key={aa.id}
                 onClick={() => handleAASelection(aa.id)}
                 className={`group h-24 rounded-3xl flex flex-col items-center justify-center transition-all hover:-translate-y-2 active:scale-90 border-2 border-white/5 bg-slate-900/50 hover:bg-indigo-600/20`}
               >
                  <div className={`w-10 h-10 rounded-full ${aa.color} mb-2 shadow-lg group-hover:scale-125 transition-transform`}></div>
                  <span className="text-sm font-black text-white">{aa.id}</span>
               </button>
             ))}
          </div>

          {/* Growing Protein Chain */}
          <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
             <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Chuỗi Protein đang lắp ghép</span>
                <div className="h-px flex-1 bg-white/10"></div>
             </div>
             <div className="flex flex-wrap gap-2 min-h-[50px] items-center">
                {proteinChain.length === 0 && <span className="text-slate-600 italic text-xs">Chưa có mắt xích nào...</span>}
                {proteinChain.map((aa, i) => (
                  <React.Fragment key={i}>
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black text-white shadow-lg animate-in zoom-in ${AMINO_ACIDS.find(a => a.id === aa)?.color || 'bg-indigo-600'}`}>
                      {aa}
                    </div>
                    {i < proteinChain.length - 1 && <ArrowRight size={12} className="text-slate-700" />}
                  </React.Fragment>
                ))}
             </div>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-8 animate-in zoom-in z-10 py-10">
           <div className="w-32 h-32 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.3)]">
              <Trophy size={64} className="text-yellow-500" />
           </div>
           <div>
             <h3 className="text-5xl font-black text-white tracking-tighter">Sứ mệnh hoàn tất!</h3>
             <p className="text-slate-400 mt-2 font-medium">Bạn đã tổng hợp được một chuỗi Protein gồm {proteinChain.length} Amino Acid.</p>
             <div className="text-6xl font-black text-indigo-400 mt-4">{score} pts</div>
           </div>
           <div className="flex gap-4 justify-center">
             <button onClick={startGame} className="bg-white text-slate-950 px-10 py-5 rounded-[2rem] font-black text-lg flex items-center gap-3 hover:scale-105 transition-all">
               <RotateCcw size={22}/> Thử lại
             </button>
             <button onClick={() => onFinish(score)} className="bg-white/10 text-white px-10 py-5 rounded-[2rem] font-black text-lg border border-white/10 hover:bg-white/20 transition-all">
               Về sảnh
             </button>
           </div>
        </div>
      )}

      {/* Mini Help Table */}
      {gameStarted && timeLeft > 0 && (
        <div className="absolute bottom-6 right-12 z-20">
           <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl flex gap-6">
              <p className="text-[10px] font-black text-slate-500 uppercase rotate-180 [writing-mode:vertical-lr] border-r border-white/10 pr-2">Ghi chú mã</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                 <HintItem codon="AUG" aa="Met" />
                 <HintItem codon="UUU" aa="Phe" />
                 <HintItem codon="AAA" aa="Lys" />
                 <HintItem codon="GGG" aa="Gly" />
                 <HintItem codon="CCC" aa="Pro" />
                 <HintItem codon="UUA" aa="Leu" />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const StatBox = ({ icon, val, label }: any) => (
  <div className="bg-slate-900 border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-4 shadow-xl">
    <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
    <div>
       <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{label}</p>
       <span className="text-2xl font-black text-white font-mono leading-none">{val}</span>
    </div>
  </div>
);

const HintItem = ({ codon, aa }: { codon: string, aa: string }) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] font-mono font-bold text-white">{codon}</span>
    <span className="text-[8px] text-indigo-400 font-black">➔</span>
    <span className="text-[10px] font-black text-slate-400">{aa}</span>
  </div>
);

export default ProteinPuzzle;
