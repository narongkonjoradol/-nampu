import { useState, FormEvent } from 'react';
import { 
  Search, 
  IdCard, 
  CheckCircle2, 
  Trash2, 
  Calendar, 
  MapPin, 
  UserCheck, 
  HelpCircle,
  Eye
} from 'lucide-react';
import { StudentRegistration, Club } from '../types';
import { TechCartoonMascot } from './TechCartoonMascot';
import { playPop, playRobotBeep } from '../utils/soundEffects';

interface StudentSearchTabProps {
  registrations: StudentRegistration[];
  clubs: Club[];
  onViewPass: (reg: StudentRegistration) => void;
  onCancelRegistration: (regId: string) => void;
  onGoToDirectory: () => void;
}

export function StudentSearchTab({
  registrations,
  clubs,
  onViewPass,
  onCancelRegistration,
  onGoToDirectory
}: StudentSearchTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const filteredRegistrations = registrations.filter((reg) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return false;
    return (
      reg.studentId.includes(q) ||
      reg.firstName.toLowerCase().includes(q) ||
      reg.lastName.toLowerCase().includes(q)
    );
  });

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    playRobotBeep();
    setSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-3">
          <IdCard className="w-3.5 h-3.5" />
          <span>ระบบตรวจสอบสถานะ & พิมพ์บัตรชุมนุม</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          ค้นหาผลการลงทะเบียนชุมนุม
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          กรอกรหัสนักเรียน 5 หลัก หรือชื่อ-นามสกุล เพื่อตรวจสอบชุมนุมที่สังกัด และดาวน์โหลดบัตรสมาชิก
        </p>
      </div>

      {/* Mascot & Search Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-cyan-200 shadow-xl relative overflow-hidden mb-8">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d40a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d40a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <TechCartoonMascot
            size="md"
            reaction={searched && filteredRegistrations.length > 0 ? 'success' : 'thinking'}
            customMessage={
              searched
                ? filteredRegistrations.length > 0
                  ? 'เย้! พบน้องในระบบแล้วครับ คลิกดูบัตรสมาชิกได้เลย!'
                  : 'ไม่พบข้อมูล ลองตรวจสอบรหัสนักเรียน 5 หลักอีกครั้งนะคร้าบ'
                : 'พิมพ์รหัสนักเรียน 5 หลักแล้วกดค้นหาได้เลยครับ!'
            }
            className="flex-shrink-0"
          />

          <div className="w-full flex-1">
            <form onSubmit={handleSearch} className="space-y-3">
              <label htmlFor="search-input-query" className="block text-xs font-bold text-slate-700">
                ค้นหาด้วยรหัสนักเรียน (5 หลัก) หรือ ชื่อ-นามสกุล
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="search-input-query"
                    type="text"
                    placeholder="เช่น 10421 หรือ กิตติศักดิ์"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white"
                  />
                </div>
                <button
                  type="submit"
                  id="btn-submit-search"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>ค้นหา</span>
                </button>
              </div>

              {/* Sample test IDs */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>ตัวอย่างรหัสทดสอบ:</span>
                {['10421', '10488', '10234', '10115', '10512'].map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setSearchQuery(id);
                      setSearched(true);
                      playPop();
                    }}
                    className="underline text-cyan-600 hover:text-cyan-800 font-tech"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Search Results Display */}
      {searched && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <span>ผลการค้นหา</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-200 text-slate-700">
              {filteredRegistrations.length} รายการ
            </span>
          </h3>

          {filteredRegistrations.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center mb-3">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 mb-1">ยังไม่พบข้อมูลการลงทะเบียน</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                อาจยังไม่ได้ลงทะเบียน หรือระบุรหัสไม่ถูกต้อง สามารถไปเลือกชุมนุมและลงทะเบียนใหม่ได้ทันที
              </p>
              <button
                id="btn-go-to-directory"
                onClick={onGoToDirectory}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs shadow-sm transition-all"
              >
                ไปหน้ารายการชุมนุม
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRegistrations.map((reg) => {
                const club = clubs.find((c) => c.id === reg.clubId);
                return (
                  <div
                    key={reg.id}
                    id={`search-result-${reg.id}`}
                    className="bg-white rounded-2xl p-5 border-2 border-cyan-300 shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="font-tech text-[11px] font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200">
                            รหัส: {reg.studentId}
                          </span>
                          <h4 className="text-base font-bold text-slate-800 mt-1">
                            {reg.prefix} {reg.firstName} {reg.lastName}
                          </h4>
                          <p className="text-xs text-slate-500">
                            ชั้น {reg.grade}/{reg.roomNumber} เลขที่ {reg.seatNumber}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          ลงทะเบียนแล้ว
                        </span>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 my-3 text-xs space-y-1.5">
                        <div className="font-bold text-cyan-800 line-clamp-1">
                          {reg.clubName}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                          <UserCheck className="w-3 h-3 text-cyan-600" />
                          <span>{club?.teacher || 'ครูที่ปรึกษาประจำชุมนุม'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                          <MapPin className="w-3 h-3 text-cyan-600" />
                          <span>{club?.room || 'ห้องเรียนประจำชุมนุม'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                          <Calendar className="w-3 h-3 text-cyan-600" />
                          <span>{club?.dayTime || 'ทุกวันพุธ 14:30 - 15:30 น.'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button
                        id={`btn-view-pass-${reg.id}`}
                        onClick={() => {
                          playPop();
                          onViewPass(reg);
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>ดู/พิมพ์บัตรสมาชิก</span>
                      </button>

                      <button
                        id={`btn-cancel-reg-${reg.id}`}
                        onClick={() => {
                          if (confirm(`ยืนยันการยกเลิกการลงทะเบียนของคุณ ${reg.firstName} ใช่หรือไม่?`)) {
                            onCancelRegistration(reg.id);
                          }
                        }}
                        title="ยกเลิกการลงทะเบียนเพื่อเปลี่ยนชุมนุม"
                        className="py-2 px-3 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-medium transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
