import { useState, useId, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle,
  Send,
  User,
  Phone,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Club, GradeLevel, StudentRegistration } from '../types';
import { TechCartoonMascot } from './TechCartoonMascot';
import { playSuccessChime, playPop } from '../utils/soundEffects';

interface RegistrationModalProps {
  club: Club;
  onClose: () => void;
  onRegisterSuccess: (reg: StudentRegistration) => void;
  existingRegistrations: StudentRegistration[];
}

export function RegistrationModal({
  club,
  onClose,
  onRegisterSuccess,
  existingRegistrations
}: RegistrationModalProps) {
  const formId = useId();
  const [studentId, setStudentId] = useState('');
  const [prefix, setPrefix] = useState<'ด.ช.' | 'ด.ญ.'>('ด.ช.');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [grade, setGrade] = useState<GradeLevel>(club.allowedGrades[0] || 'ป.4');
  const [roomNumber, setRoomNumber] = useState('1');
  const [seatNumber, setSeatNumber] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if chosen grade is allowed
  const isGradeAllowed = club.allowedGrades.includes(grade);

  // Check if student ID already registered
  const existingReg = existingRegistrations.find(
    (r) => r.studentId.trim() === studentId.trim() && studentId.trim().length === 5
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!studentId || studentId.trim().length !== 5) {
      setErrorMessage('กรุณาระบุรหัสนักเรียน 5 หลักให้ถูกต้อง (เช่น 10452)');
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage('กรุณากรอกชื่อและนามสกุลให้ครบถ้วน');
      return;
    }

    if (!seatNumber.trim() || isNaN(Number(seatNumber))) {
      setErrorMessage('กรุณาระบุเลขที่นักเรียนเป็นตัวเลข');
      return;
    }

    if (!parentPhone.trim() || parentPhone.trim().length < 9) {
      setErrorMessage('กรุณาระบุเบอร์โทรศัพท์ผู้ปกครอง 9-10 หลัก');
      return;
    }

    if (!isGradeAllowed) {
      setErrorMessage(`ชุมนุมนี้เปิดรับเฉพาะระดับชั้น ${club.allowedGrades.join(', ')} เท่านั้นครับ`);
      return;
    }

    if (existingReg) {
      setErrorMessage(`รหัสนักเรียน ${studentId} ได้ลงทะเบียน "${existingReg.clubName}" ไปแล้ว`);
      return;
    }

    if (club.registeredCount >= club.maxSeats) {
      setErrorMessage('ขออภัยครับ ชุมนุมนี้มีผู้ลงทะเบียนเต็มจำนวนแล้ว');
      return;
    }

    setIsSubmitting(true);

    // Confetti celebration animation
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    playSuccessChime();

    const newReg: StudentRegistration = {
      id: `reg-${Date.now()}`,
      studentId: studentId.trim(),
      prefix,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      grade,
      roomNumber,
      seatNumber: seatNumber.trim(),
      parentPhone: parentPhone.trim(),
      clubId: club.id,
      clubName: club.name,
      registeredAt: new Date().toISOString(),
      notes: notes.trim()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onRegisterSuccess(newReg);
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl shadow-2xl border-2 border-cyan-300 w-full max-w-2xl overflow-hidden my-auto"
        >
          {/* Modal Header */}
          <div className="bg-linear-to-r from-cyan-600 via-sky-600 to-blue-600 p-5 text-white relative">
            <button
              id="btn-close-registration-modal"
              onClick={() => {
                playPop();
                onClose();
              }}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-tech px-2 py-0.5 rounded-md bg-white/20 text-xs tracking-wider">
                {club.code}
              </span>
              <span className="text-xs bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-md">
                {club.category}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold leading-tight pr-8">
              {club.name}
            </h2>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-cyan-100">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {club.room}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {club.dayTime}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
            {/* Mascot Guiding Strip */}
            <div className="bg-cyan-50/70 border border-cyan-200 rounded-2xl p-3 sm:p-4 mb-5 flex items-center gap-3 sm:gap-4">
              <TechCartoonMascot
                size="sm"
                reaction={!isGradeAllowed ? 'alert' : 'welcome'}
                showSpeechBubble={false}
                className="flex-shrink-0"
              />
              <div className="text-xs text-slate-700 leading-relaxed">
                <p className="font-bold text-cyan-800 mb-0.5">
                  น้องคู่สร้างบอท พร้อมบันทึกข้อมูลครับ! 🤖
                </p>
                <p>
                  ชุมนุมนี้รับระดับชั้น{' '}
                  <strong className="text-cyan-700">
                    {club.allowedGrades.join(', ')}
                  </strong>{' '}
                  (ที่นั่งว่างเหลือ {Math.max(0, club.maxSeats - club.registeredCount)} คน)
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {/* Registration Form */}
            <form id={formId} onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Student ID & Prefix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label htmlFor="reg-input-studentId" className="block text-xs font-semibold text-slate-700 mb-1">
                    รหัสนักเรียน (5 หลัก) *
                  </label>
                  <input
                    id="reg-input-studentId"
                    type="text"
                    maxLength={5}
                    placeholder="เช่น 10425"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value.replace(/\D/g, ''))}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 font-tech"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="reg-input-prefix" className="block text-xs font-semibold text-slate-700 mb-1">
                    คำนำหน้า *
                  </label>
                  <select
                    id="reg-input-prefix"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value as 'ด.ช.' | 'ด.ญ.')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white"
                  >
                    <option value="ด.ช.">เด็กชาย (ด.ช.)</option>
                    <option value="ด.ญ.">เด็กหญิง (ด.ญ.)</option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="reg-input-grade" className="block text-xs font-semibold text-slate-700 mb-1">
                    ระดับชั้น *
                  </label>
                  <select
                    id="reg-input-grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as GradeLevel)}
                    className={`w-full px-3 py-2 border rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white ${
                      !isGradeAllowed ? 'border-amber-400 bg-amber-50' : 'border-slate-300'
                    }`}
                  >
                    <option value="ป.1">ชั้นประถมศึกษาปีที่ 1 (ป.1)</option>
                    <option value="ป.2">ชั้นประถมศึกษาปีที่ 2 (ป.2)</option>
                    <option value="ป.3">ชั้นประถมศึกษาปีที่ 3 (ป.3)</option>
                    <option value="ป.4">ชั้นประถมศึกษาปีที่ 4 (ป.4)</option>
                    <option value="ป.5">ชั้นประถมศึกษาปีที่ 5 (ป.5)</option>
                    <option value="ป.6">ชั้นประถมศึกษาปีที่ 6 (ป.6)</option>
                  </select>
                </div>
              </div>

              {!isGradeAllowed && (
                <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  ⚠️ ชุมนุมนี้เปิดรับเฉพาะชั้น {club.allowedGrades.join(', ')} กรุณาเลือกระดับชั้นให้ตรงหรือเลือกชุมนุมอื่น
                </p>
              )}

              {/* Row 2: First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="reg-input-firstName" className="block text-xs font-semibold text-slate-700 mb-1">
                    ชื่อ *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="reg-input-firstName"
                      type="text"
                      placeholder="เช่น กิตติศักดิ์"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-input-lastName" className="block text-xs font-semibold text-slate-700 mb-1">
                    นามสกุล *
                  </label>
                  <input
                    id="reg-input-lastName"
                    type="text"
                    placeholder="เช่น รักษ์เทคโน"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Row 3: Room, Seat Number & Parent Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="reg-input-roomNumber" className="block text-xs font-semibold text-slate-700 mb-1">
                    ห้องเรียน *
                  </label>
                  <select
                    id="reg-input-roomNumber"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white"
                  >
                    <option value="1">ห้อง 1</option>
                    <option value="2">ห้อง 2</option>
                    <option value="3">ห้อง 3</option>
                    <option value="4">ห้อง 4</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="reg-input-seatNumber" className="block text-xs font-semibold text-slate-700 mb-1">
                    เลขที่ *
                  </label>
                  <input
                    id="reg-input-seatNumber"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="เช่น 12"
                    value={seatNumber}
                    onChange={(e) => setSeatNumber(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 font-tech"
                  />
                </div>

                <div>
                  <label htmlFor="reg-input-parentPhone" className="block text-xs font-semibold text-slate-700 mb-1">
                    เบอร์โทรผู้ปกครอง *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="reg-input-parentPhone"
                      type="tel"
                      placeholder="08X-XXX-XXXX"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Reason / Notes */}
              <div>
                <label htmlFor="reg-input-notes" className="block text-xs font-semibold text-slate-700 mb-1">
                  เหตุผลหรือสิ่งที่อยากเรียนรู้ในชุมนุมนี้ (ถ้ามี)
                </label>
                <input
                  id="reg-input-notes"
                  type="text"
                  placeholder="เช่น อยากเขียนโปรแกรมสั่งการหุ่นยนต์ดูดฝุ่น"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Club Highlights reminder */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
                  <span>จุดเด่นของกิจกรรมชุมนุมนี้:</span>
                </div>
                <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                  {club.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  id="btn-cancel-registration"
                  onClick={() => {
                    playPop();
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors"
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  id="btn-confirm-registration"
                  disabled={isSubmitting || !isGradeAllowed}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    !isGradeAllowed
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/25'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'กำลังบันทึกข้อมูล...' : 'ยืนยันลงทะเบียนเข้าชุมนุม'}</span>
                </button>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
