
import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';
import { CheckCircle2, XCircle, ChevronRight, Award, RotateCcw, Timer } from 'lucide-react';

interface QuizModuleProps {
  onComplete: (score: number) => void;
}

const QuizModule: React.FC<QuizModuleProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const currentQuestion = QUESTIONS[currentIndex];

  useEffect(() => {
    if (showResult || isFinished) return;
    
    if (timeLeft <= 0) {
      handleOptionClick(-1); // Tự động sai nếu hết thời gian
      return;
    }

    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult, isFinished]);

  const handleOptionClick = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
    setShowResult(true);
    if (idx === currentQuestion.correctAnswer) {
      setScore(prev => prev + 5); // Mỗi câu 5 điểm
    }
  };

  const nextQuestion = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setIsFinished(true);
      onComplete(score);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
    setTimeLeft(30);
  };

  if (isFinished) {
    return (
      <div className="bg-white rounded-3xl p-10 shadow-xl text-center max-w-2xl mx-auto border border-slate-200 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
           <Award className="text-yellow-600" size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">Hoàn thành thử thách!</h2>
        <p className="text-slate-500 text-lg mb-8">Bạn đã xuất sắc vượt qua bài kiểm tra năng lực.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <p className="text-xs font-bold text-blue-600 uppercase mb-1">Điểm số</p>
              <p className="text-4xl font-black text-blue-800">{score}/100</p>
           </div>
           <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <p className="text-xs font-bold text-emerald-600 uppercase mb-1">Tỉ lệ đúng</p>
              <p className="text-4xl font-black text-emerald-800">{(score/100)*100}%</p>
           </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={restart}
            className="flex-1 bg-white border-2 border-slate-200 px-6 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw size={18} /> Làm lại
          </button>
          <button className="flex-1 bg-blue-600 px-6 py-4 rounded-2xl font-bold text-white shadow-lg hover:bg-blue-700 transition-all">
            Xem giải thích
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${
              currentQuestion.level === 'Nhận biết' ? 'bg-green-100 text-green-700' :
              currentQuestion.level === 'Thông hiểu' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
            }`}>
              {currentQuestion.level}
            </div>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Câu {currentIndex + 1} / {QUESTIONS.length}</span>
          </div>
          
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border transition-colors ${timeLeft < 10 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
            <Timer size={16} />
            <span className="font-mono font-bold">{timeLeft}s</span>
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-900 leading-relaxed mb-8">{currentQuestion.text}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={`text-left p-6 rounded-2xl border-2 transition-all relative group ${
                showResult 
                  ? (idx === currentQuestion.correctAnswer 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                      : (selectedOption === idx ? 'border-red-500 bg-red-50 text-red-900' : 'border-slate-100 opacity-40'))
                  : 'border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-sm transition-colors ${
                  showResult && idx === currentQuestion.correctAnswer ? 'bg-emerald-500 text-white' : 
                  showResult && selectedOption === idx ? 'bg-red-500 text-white' : 'bg-slate-100 border border-slate-200 text-slate-700 group-hover:bg-blue-500 group-hover:text-white'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-bold text-lg">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="mt-8 pt-8 border-t border-slate-100 animate-in slide-in-from-bottom-4">
            <div className={`p-6 rounded-2xl mb-6 ${selectedOption === currentQuestion.correctAnswer ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-200' : 'bg-red-50 text-red-800 border-2 border-red-200'}`}>
              <div className="flex items-center gap-2 mb-2 font-black uppercase text-xs tracking-wider">
                {selectedOption === currentQuestion.correctAnswer ? <CheckCircle2 size={18}/> : <XCircle size={18}/>}
                {selectedOption === currentQuestion.correctAnswer ? 'Chính xác!' : 'Đáp án chưa đúng!'}
              </div>
              <p className="text-sm font-semibold leading-relaxed">{currentQuestion.explanation}</p>
            </div>
            <button 
              onClick={nextQuestion}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black shadow-2xl hover:bg-slate-800 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              CÂU TIẾP THEO <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
      
      {/* Thanh tiến trình bên dưới */}
      <div className="mt-6 flex gap-1.5 justify-center px-4">
         {QUESTIONS.map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${i < currentIndex ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : i === currentIndex ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'}`}></div>
         ))}
      </div>
    </div>
  );
};

export default QuizModule;
