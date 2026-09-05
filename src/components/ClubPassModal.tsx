import { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Printer, 
  Sparkles, 
  Calendar, 
  MapPin, 
  UserCheck, 
  CheckCircle,
  QrCode,
  School
} from 'lucide-react';
import { StudentRegistration, Club } from '../types';
import { SCHOOL_INFO } from '../data/mockClubs';
import { playPop } from '../utils/soundEffects';

interface ClubPassModalProps {
  registration: StudentRegistration;
  club?: Club;
  onClose: () => void;
}

export function ClubPassModal({ registration, club, onClose }: ClubPassModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    playPop();
    window.print();
  };

  const formattedDate = new Date(registration.registeredAt).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl shadow-2xl border-2 border-cyan-300 w-full max-w-lg overflow-hidden my-auto print:border-none print:shadow-none print:max-w-none"
        >
          {/* Top Control Bar (Hidden on print) */}
          <div className="p-4 bg-slate-800 text-white flex items-center justify-between print:hidden">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold">บัตรประจำตัวสมาชิกชุมนุมดิจิทัล</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                id="btn-print-pass"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold transition-all shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>พิมพ์ / บันทึกบัตร</span>
              </button>
              <button
                id="btn-close-pass-modal"
                onClick={() => {
                  playPop();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Card Area */}
          <div ref={cardRef} className="p-5 sm:p-6 bg-linear-to-b from-cyan-50 via-white to-sky-50 print:p-8">
            
            {/* The Badge Container */}
            <div className="bg-white rounded-2xl border-3 border-cyan-400 p-5 shadow-xl relative overflow-hidden print:border-2 print:border-slate-800">
              
              {/* Holographic Top Banner Strip */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-linear-to-r from-cyan-400 via-sky-400 via-indigo-400 to-amber-300" />

              {/* Watermark Logo */}
              <div className="absolute right-2 bottom-2 text-cyan-500/5 pointer-events-none select-none">
                <School className="w-40 h-40" />
              </div>

              {/* School Header */}
              <div className="flex items-center justify-between gap-3 border-b border-cyan-100 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xs">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight">
                      {SCHOOL_INFO.name}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {SCHOOL_INFO.term}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block font-tech text-[10px] font-bold bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full border border-cyan-200">
                    PASS NO: {registration.studentId}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">ยืนยันแล้ว</p>
                </div>
              </div>

              {/* Student Identity Card Content */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {/* Cartoon Mascot Avatar for the student */}
                <div className="relative w-20 h-20 rounded-2xl bg-linear-to-br from-cyan-100 to-sky-200 p-1 flex items-center justify-center border-2 border-cyan-300 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Cute student avatar with robot ears */}
                    <circle cx="50" cy="48" r="32" fill="#bae6fd" />
                    <rect x="25" y="38" width="50" height="24" rx="10" fill="#0284c7" />
                    <circle cx="40" cy="48" r="5" fill="#38bdf8" />
                    <circle cx="60" cy="48" r="5" fill="#38bdf8" />
                    <circle cx="42" cy="46" r="1.5" fill="#fff" />
                    <circle cx="62" cy="46" r="1.5" fill="#fff" />
                    <path d="M45 54 Q50 58 55 54" stroke="#fff" strokeWidth="2" fill="none" />
                    <ellipse cx="32" cy="52" rx="3" ry="2" fill="#f43f5e" opacity="0.6" />
                    <ellipse cx="68" cy="52" rx="3" ry="2" fill="#f43f5e" opacity="0.6" />
                    {/* Headband / Antenna */}
                    <circle cx="50" cy="14" r="4" fill="#38bdf8" />
                    <line x1="50" y1="16" x2="50" y2="22" stroke="#64748b" strokeWidth="3" />
                  </svg>
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full shadow-xs">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Student Info */}
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[11px] font-semibold text-cyan-600">
                    รหัสนักเรียน: <strong className="font-tech text-xs">{registration.studentId}</strong>
                  </span>
                  <h4 className="text-base font-bold text-slate-800">
                    {registration.prefix} {registration.firstName} {registration.lastName}
                  </h4>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1 text-xs text-slate-600">
                    <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      ชั้น {registration.grade}/{registration.roomNumber}
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      เลขที่ {registration.seatNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Club Membership Info */}
              <div className="space-y-2.5 text-xs">
                <div className="bg-cyan-500 text-white p-3 rounded-xl shadow-xs">
                  <div className="text-[10px] uppercase font-bold text-cyan-100 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    ชุมนุมที่สังกัด
                  </div>
                  <div className="text-sm font-bold mt-0.5 leading-snug">
                    {registration.clubName}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                      <UserCheck className="w-3 h-3 text-cyan-600" />
                      ครูที่ปรึกษา
                    </div>
                    <div className="font-semibold text-slate-700 mt-0.5 truncate">
                      {club?.teacher || 'ครูที่ปรึกษาประจำชุมนุม'}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                      <MapPin className="w-3 h-3 text-cyan-600" />
                      สถานที่จัดกิจกรรม
                    </div>
                    <div className="font-semibold text-slate-700 mt-0.5 truncate">
                      {club?.room || 'ห้องเรียนประจำชุมนุม'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-600" />
                    {club?.dayTime || SCHOOL_INFO.meetingSchedule}
                  </span>
                  <span>ลงทะเบียน: {formattedDate}</span>
                </div>
              </div>

              {/* Barcode & Simulated QR Code Footer */}
              <div className="mt-4 pt-3 border-t border-dashed border-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg p-1 border border-slate-200 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-slate-700" />
                  </div>
                  <div>
                    <div className="font-tech text-[10px] font-bold text-slate-700 tracking-wider">
                      WKS-{registration.studentId}-2568
                    </div>
                    <div className="text-[9px] text-slate-400">
                      แสดงบัตรนี้แก่ครูที่ปรึกษาในคาบแรก
                    </div>
                  </div>
                </div>

                {/* Simulated Barcode lines */}
                <div className="flex items-center gap-0.5 h-6">
                  <div className="w-1 h-full bg-slate-800" />
                  <div className="w-0.5 h-full bg-slate-800" />
                  <div className="w-1.5 h-full bg-slate-800" />
                  <div className="w-0.5 h-full bg-slate-800" />
                  <div className="w-1 h-full bg-slate-800" />
                  <div className="w-2 h-full bg-slate-800" />
                  <div className="w-0.5 h-full bg-slate-800" />
                  <div className="w-1 h-full bg-slate-800" />
                </div>
              </div>

            </div>

            <p className="text-center text-[11px] text-slate-400 mt-3 print:text-[10px]">
              โรงเรียนประถมศึกษาวัดคู่สร้าง • ระบบลงทะเบียนกิจกรรมพัฒนาผู้เรียน
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
