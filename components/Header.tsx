
import React, { useState, useEffect } from 'react';
import { Microscope, Key, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

declare global {
  // Define AIStudio interface to be used in Window augmentation.
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Removed readonly modifier to fix "All declarations of 'aistudio' must have identical modifiers" error
    aistudio: AIStudio;
  }
}

const Header: React.FC = () => {
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
          const status = await window.aistudio.hasSelectedApiKey();
          setHasApiKey(status);
        }
      } catch (error) {
        console.error("Lỗi kiểm tra API Key:", error);
      }
    };
    checkApiKey();
  }, []);

  const handleSelectKey = async () => {
    try {
      if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        await window.aistudio.openSelectKey();
        // Sau khi mở dialog, giả định người dùng đã chọn (theo yêu cầu xử lý race condition)
        setHasApiKey(true);
      }
    } catch (error) {
      console.error("Lỗi mở trình chọn API Key:", error);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Microscope className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-tight">DI TRUYỀN HỌC 9</h1>
          <p className="text-xs text-slate-500 font-medium tracking-wide">CHƯƠNG TRÌNH GDPT 2018 - CÁNH DIỀU</p>
        </div>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        {/* Nút quản lý API Key */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSelectKey}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-bold ${
              hasApiKey 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                : 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100 animate-pulse'
            }`}
          >
            {hasApiKey ? <CheckCircle2 size={14} /> : <Key size={14} />}
            <span className="hidden sm:inline">{hasApiKey ? 'Đã chọn API' : 'Thiết lập API'}</span>
          </button>
          
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors"
            title="Hướng dẫn tạo API Key & Thanh toán"
          >
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-bold text-blue-600 uppercase">Trạng thái</span>
          <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Trực tuyến
          </span>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors">
          <span className="font-bold text-xs">HS</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
