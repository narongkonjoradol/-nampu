/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  Compass, 
  Search, 
  Filter, 
  Sparkles, 
  Bot, 
  Users, 
  CheckCircle2, 
  ArrowUpDown,
  BookOpen,
  Calendar,
  School,
  Heart,
  Cpu,
  Layers,
  ChevronRight,
  HelpCircle,
  X
} from 'lucide-react';
import { Club, StudentRegistration, GradeLevel, ClubCategory } from './types';
import { INITIAL_CLUBS, INITIAL_REGISTRATIONS, SCHOOL_INFO } from './data/mockClubs';
import { Header } from './components/Header';
import { ClubCard } from './components/ClubCard';
import { RegistrationModal } from './components/RegistrationModal';
import { ClubPassModal } from './components/ClubPassModal';
import { StudentSearchTab } from './components/StudentSearchTab';
import { ClubQuizTab } from './components/ClubQuizTab';
import { TeacherDashboard } from './components/TeacherDashboard';
import { TechCartoonMascot } from './components/TechCartoonMascot';
import { playPop, playSelectSound } from './utils/soundEffects';

const STORAGE_KEY_CLUBS = 'khusang_clubs_data_v2';
const STORAGE_KEY_REGS = 'khusang_registrations_data_v2';

export default function App() {
  // Navigation tabs: 'clubs' | 'search' | 'quiz' | 'teacher'
  const [activeTab, setActiveTab] = useState<'clubs' | 'search' | 'quiz' | 'teacher'>('clubs');

  // Core Data state
  const [clubs, setClubs] = useState<Club[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CLUBS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_CLUBS;
  });

  const [registrations, setRegistrations] = useState<StudentRegistration[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_REGISTRATIONS;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CLUBS, JSON.stringify(clubs));
    } catch {
      // ignore
    }
  }, [clubs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REGS, JSON.stringify(registrations));
    } catch {
      // ignore
    }
  }, [registrations]);

  // Modals state
  const [selectedClubForModal, setSelectedClubForModal] = useState<Club | null>(null);
  const [activePassReg, setActivePassReg] = useState<StudentRegistration | null>(null);

  // Filters state for Clubs tab
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<'all' | GradeLevel | 'junior' | 'senior'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ClubCategory>('all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Mascot interaction trigger
  const [mascotCheerCount, setMascotCheerCount] = useState(0);

  // Statistics
  const totalSeats = useMemo(() => clubs.reduce((sum, c) => sum + c.maxSeats, 0), [clubs]);
  const totalRegistered = useMemo(() => registrations.length, [registrations]);
  const availableSeats = Math.max(0, totalSeats - totalRegistered);

  // Filtered Clubs
  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      // Search keyword
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase().trim();
        const matchTitle = club.name.toLowerCase().includes(q);
        const matchDesc = club.description.toLowerCase().includes(q);
        const matchTeacher = club.teacher.toLowerCase().includes(q);
        const matchCode = club.code.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchTeacher && !matchCode) return false;
      }

      // Grade filter
      if (selectedGrade !== 'all') {
        if (selectedGrade === 'junior') {
          // ป.1 - ป.3
          const matchJunior = club.allowedGrades.some((g) => ['ป.1', 'ป.2', 'ป.3'].includes(g));
          if (!matchJunior) return false;
        } else if (selectedGrade === 'senior') {
          // ป.4 - ป.6
          const matchSenior = club.allowedGrades.some((g) => ['ป.4', 'ป.5', 'ป.6'].includes(g));
          if (!matchSenior) return false;
        } else {
          // Exact grade
          if (!club.allowedGrades.includes(selectedGrade)) return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && club.category !== selectedCategory) {
        return false;
      }

      // Only available seats
      if (onlyAvailable && club.registeredCount >= club.maxSeats) {
        return false;
      }

      return true;
    });
  }, [clubs, searchKeyword, selectedGrade, selectedCategory, onlyAvailable]);

  // Handle successful registration
  const handleRegisterSuccess = (newReg: StudentRegistration) => {
    // 1. Add to registrations
    setRegistrations((prev) => [newReg, ...prev]);

    // 2. Increment club registered count
    setClubs((prev) =>
      prev.map((c) =>
        c.id === newReg.clubId
          ? { ...c, registeredCount: Math.min(c.maxSeats, c.registeredCount + 1) }
          : c
      )
    );

    // 3. Close registration modal and open pass badge
    setSelectedClubForModal(null);
    setActivePassReg(newReg);
  };

  // Handle cancel registration
  const handleCancelRegistration = (regId: string) => {
    playPop();
    const targetReg = registrations.find((r) => r.id === regId);
    if (!targetReg) return;

    // Decrement club count
    setClubs((prev) =>
      prev.map((c) =>
        c.id === targetReg.clubId
          ? { ...c, registeredCount: Math.max(0, c.registeredCount - 1) }
          : c
      )
    );

    // Remove from registrations
    setRegistrations((prev) => prev.filter((r) => r.id !== regId));
  };

  // Teacher actions: update seats
  const handleUpdateClubSeats = (clubId: string, newMax: number) => {
    setClubs((prev) =>
      prev.map((c) => (c.id === clubId ? { ...c, maxSeats: newMax } : c))
    );
  };

  // Teacher actions: toggle status
  const handleToggleClubStatus = (clubId: string) => {
    setClubs((prev) =>
      prev.map((c) => (c.id === clubId ? { ...c, isOpen: !c.isOpen } : c))
    );
  };

  const categories: ClubCategory[] = [
    'เทคโนโลยีและคอมพิวเตอร์',
    'วิทยาศาสตร์และสิ่งแวดล้อม',
    'ศิลปะและสื่อสร้างสรรค์',
    'ภาษาและการสื่อสาร',
    'ทักษะชีวิตและอาชีพ',
    'ดนตรีและนาฏศิลป์'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        registeredCount={totalRegistered}
        totalSeats={totalSeats}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'clubs' && (
          <div>
            {/* Hero Tech Cartoon Showcase */}
            <section className="relative overflow-hidden bg-linear-to-b from-cyan-100/70 via-sky-50 to-white pt-8 pb-12 border-b border-cyan-100">
              {/* Background decorative circuits & radars */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70d_1px,transparent_1px),linear-gradient(to_bottom,#0284c70d_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-200/40 blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  
                  {/* Left Column: Heading & Mascot Interactive Speech */}
                  <div className="max-w-2xl text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-cyan-300 text-cyan-800 text-xs font-bold shadow-xs mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{SCHOOL_INFO.affiliation}</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
                      ชุมนุมสร้างสรรค์ <br className="hidden sm:inline" />
                      <span className="bg-linear-to-r from-cyan-600 via-sky-600 to-blue-600 bg-clip-text text-transparent">
                        เทคโนโลยีเพื่ออนาคต
                      </span>
                    </h2>

                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                      ขอเชิญนักเรียนชั้นประถมศึกษาปีที่ 1 - 6 โรงเรียนประถมศึกษาวัดคู่สร้าง 
                      ร่วมเปิดประตูสู่การเรียนรู้ยุคดิจิทัล หุ่นยนต์ โค้ดดิ้ง AI 
                      และกิจกรรมเสริมสร้างทักษะชีวิตกว่า 12 ชุมนุม
                    </p>

                    {/* Live Metric Badges */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mt-6">
                      <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-cyan-200 shadow-xs flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-cyan-500 text-white flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] text-slate-400 font-medium">ลงทะเบียนแล้ว</p>
                          <p className="text-sm font-bold text-slate-800 font-tech">
                            {totalRegistered} <span className="text-xs font-normal text-slate-500">/ {totalSeats} คน</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-emerald-200 shadow-xs flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] text-slate-400 font-medium">ที่นั่งว่างคงเหลือ</p>
                          <p className="text-sm font-bold text-emerald-700 font-tech">
                            {availableSeats} <span className="text-xs font-normal text-slate-500">ที่นั่ง</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-indigo-200 shadow-xs flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] text-slate-400 font-medium">ชุมนุมที่เปิดรับ</p>
                          <p className="text-sm font-bold text-indigo-700 font-tech">
                            {clubs.length} <span className="text-xs font-normal text-slate-500">ชุมนุม</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick CTA buttons */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6">
                      <button
                        id="btn-hero-quiz"
                        onClick={() => {
                          playSelectSound();
                          setActiveTab('quiz');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-violet-600/20 transition-all flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>ยังไม่แน่ใจ? ให้น้องบอทช่วยเลือกชุมนุม</span>
                      </button>

                      <button
                        id="btn-hero-search"
                        onClick={() => {
                          playPop();
                          setActiveTab('search');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-300 shadow-xs transition-all flex items-center gap-2"
                      >
                        <Search className="w-4 h-4 text-cyan-600" />
                        <span>ตรวจสถานะ / พิมพ์บัตรชุมนุม</span>
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Hero Mascot "น้องคู่สร้าง AI Bot" */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <TechCartoonMascot
                      size="hero"
                      reaction={mascotCheerCount % 2 === 0 ? 'welcome' : 'cheer'}
                      onMascotClick={() => setMascotCheerCount((c) => c + 1)}
                    />
                    <div className="text-center mt-3">
                      <span className="inline-block text-xs font-bold text-cyan-800 bg-white/90 px-3 py-1 rounded-full border border-cyan-200 shadow-xs">
                        น้องคู่สร้าง AI บอท • มาสคอตประจำระบบ 🤖
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-5 space-y-4">
                
                {/* Search & Status Row */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      id="input-search-club"
                      type="text"
                      placeholder="ค้นหาชื่อชุมนุม, ชื่อคุณครูที่ปรึกษา, รหัส เช่น CS-TECH-01..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                    />
                    {searchKeyword && (
                      <button
                        onClick={() => setSearchKeyword('')}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Available Seats Toggle Checkbox */}
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                    <input
                      id="checkbox-available-only"
                      type="checkbox"
                      checked={onlyAvailable}
                      onChange={(e) => {
                        playPop();
                        setOnlyAvailable(e.target.checked);
                      }}
                      className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                    />
                    <span>เฉพาะชุมนุมที่มีที่ว่าง ({availableSeats} ที่)</span>
                  </label>
                </div>

                {/* Grade Level Filter Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                    <Filter className="w-3 h-3" /> ระดับชั้น:
                  </span>
                  
                  {[
                    { id: 'all', label: 'ทั้งหมด (ป.1 - ป.6)' },
                    { id: 'junior', label: 'ประถมต้น (ป.1 - ป.3)' },
                    { id: 'senior', label: 'ประถมปลาย (ป.4 - ป.6)' },
                    { id: 'ป.1', label: 'ป.1' },
                    { id: 'ป.2', label: 'ป.2' },
                    { id: 'ป.3', label: 'ป.3' },
                    { id: 'ป.4', label: 'ป.4' },
                    { id: 'ป.5', label: 'ป.5' },
                    { id: 'ป.6', label: 'ป.6' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      id={`filter-grade-${g.id}`}
                      onClick={() => {
                        playPop();
                        setSelectedGrade(g.id as typeof selectedGrade);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedGrade === g.id
                          ? 'bg-cyan-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>

                {/* Categories Filter Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                    <Layers className="w-3 h-3" /> หมวดหมู่:
                  </span>

                  <button
                    id="filter-category-all"
                    onClick={() => {
                      playPop();
                      setSelectedCategory('all');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-slate-800 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ทุกหมวดหมู่
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat}
                      id={`filter-category-${cat}`}
                      onClick={() => {
                        playPop();
                        setSelectedCategory(cat);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-slate-800 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

              </div>
            </section>

            {/* Clubs Grid Display */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-cyan-600" />
                    <span>รายการชุมนุมที่เปิดรับสมัคร</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    พบ {filteredClubs.length} ชุมนุม (คลิกที่การ์ดเพื่อดูรายละเอียดและลงทะเบียน)
                  </p>
                </div>

                {(searchKeyword || selectedGrade !== 'all' || selectedCategory !== 'all' || onlyAvailable) && (
                  <button
                    onClick={() => {
                      playPop();
                      setSearchKeyword('');
                      setSelectedGrade('all');
                      setSelectedCategory('all');
                      setOnlyAvailable(false);
                    }}
                    className="text-xs text-cyan-600 hover:underline font-semibold"
                  >
                    ล้างตัวกรองทั้งหมด
                  </button>
                )}
              </div>

              {filteredClubs.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">ไม่พบชุมนุมที่ตรงกับเงื่อนไข</h4>
                  <p className="text-xs text-slate-500 mb-4">
                    ลองปรับเปลี่ยนตัวกรองระดับชั้น หรือล้างคำค้นหาเพื่อดูชุมนุมทั้งหมด
                  </p>
                  <button
                    onClick={() => {
                      setSearchKeyword('');
                      setSelectedGrade('all');
                      setSelectedCategory('all');
                      setOnlyAvailable(false);
                    }}
                    className="px-5 py-2 rounded-xl bg-cyan-500 text-white font-bold text-xs shadow-xs"
                  >
                    แสดงชุมนุมทั้งหมด
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClubs.map((club) => (
                    <ClubCard
                      key={club.id}
                      club={club}
                      onSelect={(c) => {
                        setSelectedClubForModal(c);
                      }}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* Tab: Check Status / Print Pass */}
        {activeTab === 'search' && (
          <StudentSearchTab
            registrations={registrations}
            clubs={clubs}
            onViewPass={(reg) => {
              setActivePassReg(reg);
            }}
            onCancelRegistration={handleCancelRegistration}
            onGoToDirectory={() => setActiveTab('clubs')}
          />
        )}

        {/* Tab: Mini-game Quiz Matcher */}
        {activeTab === 'quiz' && (
          <ClubQuizTab
            clubs={clubs}
            onSelectClub={(c) => {
              setSelectedClubForModal(c);
            }}
          />
        )}

        {/* Tab: Teacher Admin Dashboard */}
        {activeTab === 'teacher' && (
          <TeacherDashboard
            clubs={clubs}
            registrations={registrations}
            onUpdateClubSeats={handleUpdateClubSeats}
            onToggleClubStatus={handleToggleClubStatus}
          />
        )}
      </main>

      {/* Registration Modal Form */}
      {selectedClubForModal && (
        <RegistrationModal
          club={selectedClubForModal}
          onClose={() => setSelectedClubForModal(null)}
          onRegisterSuccess={handleRegisterSuccess}
          existingRegistrations={registrations}
        />
      )}

      {/* Digital Club Pass Modal (Printable Badge) */}
      {activePassReg && (
        <ClubPassModal
          registration={activePassReg}
          club={clubs.find((c) => c.id === activePassReg.clubId)}
          onClose={() => setActivePassReg(null)}
        />
      )}

      {/* Official Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 print:hidden mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <School className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {SCHOOL_INFO.name}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {SCHOOL_INFO.affiliation}
                </p>
              </div>
            </div>

            <div className="text-center md:text-right text-[11px]">
              <p className="text-slate-300">
                สถานที่: {SCHOOL_INFO.address}
              </p>
              <p className="text-cyan-400 mt-0.5">
                กิจกรรมชุมนุมพัฒนาผู้เรียน • {SCHOOL_INFO.meetingSchedule}
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <p>© 2568 {SCHOOL_INFO.name}. สงวนลิขสิทธิ์ทุกประการ.</p>
            <p className="flex items-center gap-1">
              <span>พัฒนาด้วยความใส่ใจเพื่อเด็กไทยยุคเทคโนโลยีสร้างสรรค์</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
