import { 
  Bot, 
  Sparkles, 
  Plane, 
  Leaf, 
  FlaskConical, 
  Palette, 
  Music, 
  Smile, 
  Globe, 
  Utensils, 
  Gamepad2, 
  Trophy,
  Users,
  MapPin,
  Clock,
  UserCheck,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Club } from '../types';
import { playSelectSound } from '../utils/soundEffects';

interface ClubCardProps {
  key?: string;
  club: Club;
  onSelect: (club: Club) => void;
}

const ICON_MAP: Record<string, typeof Bot> = {
  Bot,
  Sparkles,
  Plane,
  Leaf,
  FlaskConical,
  Palette,
  Music,
  Smile,
  Globe,
  Utensils,
  Gamepad2,
  Trophy
};

export function ClubCard({ club, onSelect }: ClubCardProps) {
  const IconComponent = ICON_MAP[club.iconName] || Bot;
  const isFull = club.registeredCount >= club.maxSeats;
  const seatsLeft = Math.max(0, club.maxSeats - club.registeredCount);
  const percentage = Math.min(100, Math.round((club.registeredCount / club.maxSeats) * 100));

  const handleCardClick = () => {
    playSelectSound();
    onSelect(club);
  };

  // Color theme mapping for cartoon vibes
  const themeStyles: Record<string, { bg: string; border: string; text: string; lightBg: string }> = {
    cyan: { bg: 'bg-cyan-500', border: 'border-cyan-200', text: 'text-cyan-700', lightBg: 'bg-cyan-50' },
    violet: { bg: 'bg-violet-500', border: 'border-violet-200', text: 'text-violet-700', lightBg: 'bg-violet-50' },
    blue: { bg: 'bg-blue-500', border: 'border-blue-200', text: 'text-blue-700', lightBg: 'bg-blue-50' },
    emerald: { bg: 'bg-emerald-500', border: 'border-emerald-200', text: 'text-emerald-700', lightBg: 'bg-emerald-50' },
    amber: { bg: 'bg-amber-500', border: 'border-amber-200', text: 'text-amber-700', lightBg: 'bg-amber-50' },
    rose: { bg: 'bg-rose-500', border: 'border-rose-200', text: 'text-rose-700', lightBg: 'bg-rose-50' },
    purple: { bg: 'bg-purple-500', border: 'border-purple-200', text: 'text-purple-700', lightBg: 'bg-purple-50' },
    pink: { bg: 'bg-pink-500', border: 'border-pink-200', text: 'text-pink-700', lightBg: 'bg-pink-50' },
    indigo: { bg: 'bg-indigo-500', border: 'border-indigo-200', text: 'text-indigo-700', lightBg: 'bg-indigo-50' },
    orange: { bg: 'bg-orange-500', border: 'border-orange-200', text: 'text-orange-700', lightBg: 'bg-orange-50' },
    teal: { bg: 'bg-teal-500', border: 'border-teal-200', text: 'text-teal-700', lightBg: 'bg-teal-50' },
    red: { bg: 'bg-rose-600', border: 'border-rose-200', text: 'text-rose-700', lightBg: 'bg-rose-50' }
  };

  const currentTheme = themeStyles[club.colorTheme] || themeStyles.cyan;

  return (
    <div
      id={`club-card-${club.id}`}
      onClick={handleCardClick}
      className={`group relative bg-white rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1.5 ${
        isFull 
          ? 'border-slate-200 bg-slate-50/70 opacity-90' 
          : `${currentTheme.border} hover:border-cyan-400`
      }`}
    >
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Club Icon with Tech Glow Container */}
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${currentTheme.bg} group-hover:rotate-6 transition-transform flex-shrink-0`}>
            <IconComponent className="w-6 h-6" />
          </div>

          {/* Status Badges */}
          <div className="flex flex-col items-end gap-1.5">
            <span className="font-tech text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
              {club.code}
            </span>

            {isFull ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                <AlertCircle className="w-3 h-3" />
                เต็มแล้ว
              </span>
            ) : seatsLeft <= 5 ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                เหลือ {seatsLeft} ที่สุดท้าย!
              </span>
            ) : (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                ว่าง {seatsLeft} ที่นั่ง
              </span>
            )}
          </div>
        </div>

        {/* Category Pill */}
        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg ${currentTheme.lightBg} ${currentTheme.text} mb-2`}>
          {club.category}
        </span>

        {/* Club Title */}
        <h3 className="text-base font-bold text-slate-800 leading-snug group-hover:text-cyan-600 transition-colors mb-2 line-clamp-2">
          {club.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {club.description}
        </p>
      </div>

      {/* Meta details & Capacity */}
      <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
        
        {/* Eligible Grades */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-400 font-medium">ระดับชั้น:</span>
          {club.allowedGrades.map((g) => (
            <span
              key={g}
              className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Teacher & Location */}
        <div className="flex flex-col gap-1 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-600 truncate">
            <UserCheck className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
            <span className="truncate">{club.teacher}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{club.room}</span>
          </div>
        </div>

        {/* Quota Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
            <span className="flex items-center gap-1 text-slate-500">
              <Users className="w-3 h-3" />
              จำนวนสมาชิก
            </span>
            <span className="text-slate-700">
              <strong className={isFull ? 'text-rose-600' : 'text-cyan-700'}>{club.registeredCount}</strong> / {club.maxSeats} คน
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFull
                  ? 'bg-rose-500'
                  : percentage > 80
                  ? 'bg-amber-500'
                  : 'bg-linear-to-r from-cyan-500 to-blue-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          id={`btn-select-club-${club.id}`}
          className={`w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            isFull
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-sm hover:shadow-md'
          }`}
          disabled={isFull}
        >
          {isFull ? (
            <span>ชุมนุมเต็มแล้ว</span>
          ) : (
            <>
              <span>ดูข้อมูลและลงทะเบียน</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
