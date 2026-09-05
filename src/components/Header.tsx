import { useState } from 'react';
import { 
  Compass, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Calendar, 
  School
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockClubs';
import { toggleSound, getSoundState, playPop } from '../utils/soundEffects';

interface HeaderProps {
  activeTab: 'clubs' | 'search' | 'quiz' | 'teacher';
  setActiveTab: (tab: 'clubs' | 'search' | 'quiz' | 'teacher') => void;
  registeredCount: number;
  totalSeats: number;
}

export function Header({
  activeTab,
  setActiveTab,
  registeredCount,
  totalSeats
}: HeaderProps) {
  const [soundOn, setSoundOn] = useState<boolean>(getSoundState());

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const handleTabChange = (tab: 'clubs' | 'search' | 'quiz' | 'teacher') => {
    playPop();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-cyan-100 shadow-xs transition-all">
      {/* Top Banner Notice */}
      <div className="bg-linear-to-r from-cyan-600 via-sky-600 to-indigo-600 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900 animate-pulse">
              เปิดระบบ
            </span>
            <span className="font-medium">{SCHOOL_INFO.registrationPeriod}</span>
            <span className="hidden md:inline text-cyan-200">|</span>
            <span className="hidden md:inline text-cyan-100">สำหรับนักเรียนระดับชั้น ป.1 - ป.6</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-cyan-100">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              เรียนทุกวันพุธ คาบที่ 7
            </span>
            <span>•</span>
            <span>{SCHOOL_INFO.affiliation}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* School Emblem & Title */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => handleTabChange('clubs')}>
            {/* Creative School Tech Shield Logo */}
            <div className="relative w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20 flex-shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Micro tech pattern */}
                <div className="absolute inset-0 bg-linear-to-br from-cyan-50 to-blue-50 opacity-80" />
                <School className="w-6 h-6 text-cyan-600 relative z-10" />
                <span className="text-[9px] font-extrabold text-blue-700 tracking-tighter leading-none relative z-10 font-tech">
                  ว.ค.ส.
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight leading-tight">
                  {SCHOOL_INFO.name}
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-cyan-100 text-cyan-800 rounded-full border border-cyan-200">
                  ระบบชุมนุม 2568
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span>{SCHOOL_INFO.subName}</span>
                <span>•</span>
                <span className="text-cyan-600 font-medium">หนูน้อยเทคโนโลยีสร้างสรรค์</span>
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Tab: Clubs Directory */}
            <button
              id="nav-tab-clubs"
              onClick={() => handleTabChange('clubs')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'clubs'
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                  : 'text-slate-600 hover:text-cyan-700 hover:bg-cyan-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>รายการชุมนุม</span>
            </button>

            {/* Tab: Check Status / Print Pass */}
            <button
              id="nav-tab-search"
              onClick={() => handleTabChange('search')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'search'
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                  : 'text-slate-600 hover:text-cyan-700 hover:bg-cyan-50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>ตรวจสถานะ / พิมพ์บัตร</span>
            </button>

            {/* Tab: Club Matcher AI Quiz */}
            <button
              id="nav-tab-quiz"
              onClick={() => handleTabChange('quiz')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-linear-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-purple-500/25'
                  : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>บอทช่วยเลือกชุมนุม</span>
            </button>

            {/* Tab: Teacher Admin Dashboard */}
            <button
              id="nav-tab-teacher"
              onClick={() => handleTabChange('teacher')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'teacher'
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>สำหรับคุณครู</span>
            </button>

            {/* Sound Toggle Button */}
            <button
              id="btn-sound-toggle"
              onClick={handleSoundToggle}
              title={soundOn ? 'ปิดเสียงเอฟเฟกต์การ์ตูน' : 'เปิดเสียงเอฟเฟกต์การ์ตูน'}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 transition-colors ml-1"
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-cyan-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
