
import React, { useState } from 'react';
import { AppView } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import Lesson33 from './components/Lesson33.tsx';
import Lesson34 from './components/Lesson34.tsx';
import Lesson35 from './components/Lesson35.tsx';
import Lesson36 from './components/Lesson36.tsx';
import QuizModule from './components/QuizModule.tsx';
import GameCenter from './components/GameCenter.tsx';
import Header from './components/Header.tsx';
import { BookOpen, Activity, LayoutDashboard, BrainCircuit, Gamepad2, Layers, GitBranch } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard onNavigate={setCurrentView} />;
      case AppView.LESSON_33: return <Lesson33 />;
      case AppView.LESSON_34: return <Lesson34 />;
      case AppView.LESSON_35: return <Lesson35 />;
      case AppView.LESSON_36: return <Lesson36 />;
      case AppView.QUIZ: return <QuizModule onComplete={() => {}} />;
      case AppView.GAME: return <GameCenter />;
      default: return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <nav className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm">
          <div className="p-4 space-y-2 overflow-y-auto">
            <NavButton active={currentView === AppView.DASHBOARD} onClick={() => setCurrentView(AppView.DASHBOARD)} icon={<LayoutDashboard size={20} />} label="Tổng quan" />
            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:block">Bài học</div>
            <NavButton active={currentView === AppView.LESSON_33} onClick={() => setCurrentView(AppView.LESSON_33)} icon={<BookOpen size={20} />} label="Bài 33: Gene & DNA" />
            <NavButton active={currentView === AppView.LESSON_34} onClick={() => setCurrentView(AppView.LESSON_34)} icon={<Activity size={20} />} label="Bài 34: Các quá trình" />
            <NavButton active={currentView === AppView.LESSON_35} onClick={() => setCurrentView(AppView.LESSON_35)} icon={<Layers size={20} />} label="Bài 35: NST" />
            <NavButton active={currentView === AppView.LESSON_36} onClick={() => setCurrentView(AppView.LESSON_36)} icon={<GitBranch size={20} />} label="Bài 36: Phân bào" />
            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:block">Công cụ</div>
            <NavButton active={currentView === AppView.QUIZ} onClick={() => setCurrentView(AppView.QUIZ)} icon={<BrainCircuit size={20} />} label="Kiểm tra" />
            <NavButton active={currentView === AppView.GAME} onClick={() => setCurrentView(AppView.GAME)} icon={<Gamepad2 size={20} />} label="Trò chơi" />
          </div>
        </nav>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">{renderContent()}</div>
        </main>
      </div>
      <footer className="bg-white border-t border-slate-200 p-3 text-center text-sm text-slate-500">© 2024 Khoa học Tự nhiên 9 - Cánh Diều</footer>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`w-full flex items-center p-3 rounded-xl transition-all group ${active ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}>
    <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}>{icon}</span>
    <span className="ml-3 font-medium hidden md:block text-sm">{label}</span>
  </button>
);

export default App;
