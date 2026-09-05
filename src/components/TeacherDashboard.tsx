import { useState } from 'react';
import { 
  Users, 
  Download, 
  Search, 
  Settings2, 
  CheckCircle, 
  AlertCircle, 
  School,
  Plus,
  Minus,
  ToggleLeft,
  ToggleRight,
  Printer,
  FileSpreadsheet
} from 'lucide-react';
import { Club, StudentRegistration } from '../types';
import { SCHOOL_INFO } from '../data/mockClubs';
import { playPop, playSuccessChime } from '../utils/soundEffects';

interface TeacherDashboardProps {
  clubs: Club[];
  registrations: StudentRegistration[];
  onUpdateClubSeats: (clubId: string, newMax: number) => void;
  onToggleClubStatus: (clubId: string) => void;
}

export function TeacherDashboard({
  clubs,
  registrations,
  onUpdateClubSeats,
  onToggleClubStatus
}: TeacherDashboardProps) {
  const [selectedClubId, setSelectedClubId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalRegistered = registrations.length;
  const totalCapacity = clubs.reduce((acc, c) => acc + c.maxSeats, 0);
  const fillRate = totalCapacity > 0 ? Math.round((totalRegistered / totalCapacity) * 100) : 0;

  // Filter registrations
  const filteredList = registrations.filter((reg) => {
    const matchClub = selectedClubId === 'all' || reg.clubId === selectedClubId;
    const q = searchQuery.trim().toLowerCase();
    const matchQuery = !q || (
      reg.studentId.includes(q) ||
      reg.firstName.toLowerCase().includes(q) ||
      reg.lastName.toLowerCase().includes(q) ||
      reg.clubName.toLowerCase().includes(q)
    );
    return matchClub && matchQuery;
  });

  // Export CSV with UTF-8 BOM for Thai support in Excel
  const handleExportCSV = () => {
    playSuccessChime();
    const headers = [
      'ลำดับ',
      'รหัสนักเรียน',
      'คำนำหน้า',
      'ชื่อ',
      'นามสกุล',
      'ระดับชั้น',
      'ห้อง',
      'เลขที่',
      'เบอร์โทรผู้ปกครอง',
      'ชุมนุมที่ลงทะเบียน',
      'วันที่เวลาลงทะเบียน',
      'หมายเหตุ'
    ];

    const rows = filteredList.map((r, idx) => [
      idx + 1,
      `"${r.studentId}"`,
      `"${r.prefix}"`,
      `"${r.firstName}"`,
      `"${r.lastName}"`,
      `"${r.grade}"`,
      `"${r.roomNumber}"`,
      `"${r.seatNumber}"`,
      `"${r.parentPhone}"`,
      `"${r.clubName.replace(/"/g, '""')}"`,
      `"${new Date(r.registeredAt).toLocaleString('th-TH')}"`,
      `"${(r.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `รายชื่อลงทะเบียนชุมนุม_วัดคู่สร้าง_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintRoster = () => {
    playPop();
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0">
      {/* Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-white text-xs font-bold mb-2">
            <School className="w-3.5 h-3.5 text-cyan-400" />
            <span>แผงควบคุมฝ่ายบริหารวิชาการและครูที่ปรึกษา</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            ระบบจัดการและสรุปข้อมูลกิจกรรมชุมนุม
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {SCHOOL_INFO.name} • {SCHOOL_INFO.term}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-export-csv"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>ส่งออก Excel (CSV)</span>
          </button>
          <button
            id="btn-print-roster"
            onClick={handlePrintRoster}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์รายงาน</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 print:hidden">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">นักเรียนลงทะเบียนแล้ว</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-bold text-cyan-700 font-tech">
              {totalRegistered}
            </span>
            <span className="text-xs text-slate-400">คน</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-1">จากเป้าหมาย {totalCapacity} ที่นั่ง</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">อัตราการครองที่นั่ง</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-bold text-indigo-700 font-tech">
              {fillRate}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${fillRate}%` }} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">จำนวนชุมนุมทั้งหมด</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-bold text-slate-800 font-tech">
              {clubs.length}
            </span>
            <span className="text-xs text-slate-400">ชุมนุม</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">ครอบคลุม 6 หมวดสาระ</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">สถานะการเปิดรับ</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-emerald-700">เปิดรับสมัครตามกำหนด</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{SCHOOL_INFO.registrationPeriod}</p>
        </div>
      </div>

      {/* Clubs Quota Quick Management Section */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-8 print:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-cyan-600" />
            <h3 className="font-bold text-slate-800 text-sm">
              จัดการโควตาที่นั่งและสถานะเปิด/ปิดรับสมัครชุมนุม
            </h3>
          </div>
          <span className="text-xs text-slate-400">คุณครูสามารถปรับจำนวนที่นั่งได้ทันที</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between gap-2"
            >
              <div>
                <div className="flex items-center justify-between gap-1 text-[11px]">
                  <span className="font-tech text-slate-500">{club.code}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    club.isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {club.isOpen ? 'เปิดรับ' : 'ปิดรับ'}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">
                  {club.name}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {club.registeredCount} / {club.maxSeats} คน
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                {/* Seat +/- buttons */}
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-500">โควตา:</span>
                  <button
                    id={`btn-dec-seat-${club.id}`}
                    onClick={() => onUpdateClubSeats(club.id, Math.max(club.registeredCount, club.maxSeats - 1))}
                    disabled={club.maxSeats <= club.registeredCount}
                    className="w-6 h-6 rounded bg-white border border-slate-300 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-tech font-bold text-xs px-1 text-slate-700">
                    {club.maxSeats}
                  </span>
                  <button
                    id={`btn-inc-seat-${club.id}`}
                    onClick={() => onUpdateClubSeats(club.id, club.maxSeats + 1)}
                    className="w-6 h-6 rounded bg-white border border-slate-300 flex items-center justify-center hover:bg-slate-100"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Toggle Open/Close */}
                <button
                  id={`btn-toggle-club-${club.id}`}
                  onClick={() => onToggleClubStatus(club.id)}
                  className="text-slate-600 hover:text-cyan-600 flex items-center gap-1 text-[11px]"
                >
                  {club.isOpen ? (
                    <ToggleRight className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Registrations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Filter Controls */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50 print:hidden">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1">
            {/* Filter by Club */}
            <select
              id="filter-select-club"
              value={selectedClubId}
              onChange={(e) => setSelectedClubId(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">-- แสดงทุกชุมนุม ({registrations.length} คน) --</option>
              {clubs.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code}: {c.name.slice(0, 32)}... ({c.registeredCount}/{c.maxSeats})
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="filter-input-search"
                type="text"
                placeholder="ค้นหาชื่อ, รหัสนักเรียน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-white"
              />
            </div>
          </div>

          <div className="text-xs text-slate-500">
            แสดง <strong>{filteredList.length}</strong> จากทั้งหมด {registrations.length} คน
          </div>
        </div>

        {/* Print Header only when printing */}
        <div className="hidden print:block p-4 border-b">
          <h2 className="text-xl font-bold text-slate-900">{SCHOOL_INFO.name}</h2>
          <p className="text-xs text-slate-600">บัญชีรายชื่อนักเรียนลงทะเบียนกิจกรรมชุมนุม {SCHOOL_INFO.term}</p>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3 w-12 text-center">#</th>
                <th className="py-3 px-3">รหัสนักเรียน</th>
                <th className="py-3 px-3">ชื่อ - นามสกุล</th>
                <th className="py-3 px-3">ระดับชั้น</th>
                <th className="py-3 px-3">เลขที่</th>
                <th className="py-3 px-3">ชุมนุมที่เลือก</th>
                <th className="py-3 px-3">เบอร์ผู้ปกครอง</th>
                <th className="py-3 px-3">เวลาลงทะเบียน</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    ไม่พบข้อมูลนักเรียนที่ตรงกับเงื่อนไข
                  </td>
                </tr>
              ) : (
                filteredList.map((r, idx) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 text-center text-slate-400 font-tech">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-3 font-tech font-bold text-cyan-700">
                      {r.studentId}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">
                      {r.prefix} {r.firstName} {r.lastName}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {r.grade}/{r.roomNumber}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-tech">
                      {r.seatNumber}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-700 max-w-xs truncate">
                      {r.clubName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 font-tech">
                      {r.parentPhone}
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-400">
                      {new Date(r.registeredAt).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
