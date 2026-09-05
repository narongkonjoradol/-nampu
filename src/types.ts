export type GradeLevel = 'ป.1' | 'ป.2' | 'ป.3' | 'ป.4' | 'ป.5' | 'ป.6';

export type ClubCategory = 
  | 'เทคโนโลยีและคอมพิวเตอร์'
  | 'วิทยาศาสตร์และสิ่งแวดล้อม'
  | 'ศิลปะและสื่อสร้างสรรค์'
  | 'ภาษาและการสื่อสาร'
  | 'ทักษะชีวิตและอาชีพ'
  | 'ดนตรีและนาฏศิลป์';

export interface Club {
  id: string;
  code: string;
  name: string;
  category: ClubCategory;
  description: string;
  highlights: string[];
  teacher: string;
  room: string;
  dayTime: string;
  allowedGrades: GradeLevel[];
  maxSeats: number;
  registeredCount: number;
  colorTheme: string; // e.g. cyan, violet, emerald, amber, rose
  iconName: string;
  prerequisites?: string;
  isOpen: boolean;
}

export interface StudentRegistration {
  id: string;
  studentId: string; // 5 digits
  prefix: 'ด.ช.' | 'ด.ญ.';
  firstName: string;
  lastName: string;
  grade: GradeLevel;
  roomNumber: string; // e.g. "1", "2", "3"
  seatNumber: string; // เลขที่
  parentPhone: string;
  clubId: string;
  clubName: string;
  registeredAt: string; // ISO string
  notes?: string;
}

export type MascotReaction = 'welcome' | 'happy' | 'thinking' | 'success' | 'alert' | 'cheer';
