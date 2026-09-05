import { Club, StudentRegistration } from '../types';

export const INITIAL_CLUBS: Club[] = [
  {
    id: 'club-robotics',
    code: 'CS-TECH-01',
    name: 'ชุมนุมหุ่นยนต์จิ๋วและโค้ดดิ้งสร้างสรรค์ (Kids Robotics & Scratch)',
    category: 'เทคโนโลยีและคอมพิวเตอร์',
    description: 'เรียนรู้การเขียนโค้ดบล็อกคำสั่ง บังคับหุ่นยนต์เดินตามเส้น และประดิษฐ์ระบบอัตโนมัติด้วยบอร์ด Micro:bit และ Lego Education',
    highlights: [
      'ฝึกตรรกะและกระบวนการคิดเชิงคำนวณ (Computational Thinking)',
      'ลงมือประกอบและเขียนโปรแกรมสั่งการหุ่นยนต์จริง',
      'โอกาสร่วมแข่งขันงานศิลปหัตถกรรมนักเรียน'
    ],
    teacher: 'ครูธนากร กลิ่นสุคนธ์ (ครูบอล)',
    room: 'ห้องปฏิบัติการคอมพิวเตอร์ 1 (อาคารเฉลิมพระเกียรติ)',
    dayTime: 'ทุกวันพุธ 14:30 - 15:30 น.',
    allowedGrades: ['ป.4', 'ป.5', 'ป.6'],
    maxSeats: 25,
    registeredCount: 21,
    colorTheme: 'cyan',
    iconName: 'Bot',
    prerequisites: 'มีความสนใจและพร้อมเรียนรู้คอมพิวเตอร์',
    isOpen: true
  },
  {
    id: 'club-ai-creator',
    code: 'CS-TECH-02',
    name: 'ชุมนุมหนูน้อย AI & ดิจิทัลครีเอเตอร์ (AI Kidz & Media Creators)',
    category: 'เทคโนโลยีและคอมพิวเตอร์',
    description: 'สำรวจโลกปัญญาประดิษฐ์ AI ฝึกสร้างภาพการ์ตูน ทำคลิปวิดีโอแอนิเมชันเพื่อการเรียนรู้ และรู้เท่าทันสื่อดิจิทัลอย่างปลอดภัย',
    highlights: [
      'ทำความรู้จัก AI และการสั่งการคำสั่ง Prompt สร้างสรรค์',
      'ฝึกตัดต่อวิดีโอสั้น นำเสนอโครงงานโรงเรียนวัดคู่สร้าง',
      'เรียนรู้จริยธรรมการใช้สื่อออนไลน์อย่างปลอดภัย'
    ],
    teacher: 'ครูปรียานุช แสงทอง (ครูปลา)',
    room: 'ห้องสมุดดิจิทัลและศูนย์การเรียนรู้ ICT',
    dayTime: 'ทุกวันพุธ 14:30 - 15:30 น.',
    allowedGrades: ['ป.3', 'ป.4', 'ป.5', 'ป.6'],
    maxSeats: 30,
    registeredCount: 26,
    colorTheme: 'violet',
    iconName: 'Sparkles',
    isOpen: true
  },
  {
    id: 'club-drone-stem',
    code: 'CS-TECH-03',
    name: 'ชุมนุมอากาศยานไร้คนขับและนักบินโดรนตัวน้อย (Junior Drone Explorer)',
    category: 'เทคโนโลยีและคอมพิวเตอร์',
    description: 'ฝึกทักษะการเป็นนักบินโดรนรุ่นเยาว์ ควบคุมและเขียนโค้ดจำลองการบิน พร้อมเรียนรู้ฟิสิกส์การบินเบื้องต้น',
    highlights: [
      'ฝึกทักษะการควบคุมโดรนจำลอง (Flight Simulator)',
      'การเขียนโปรแกรมควบคุมเส้นทางการบินอัตโนมัติ',
      'ความปลอดภัยและกฎการบินโดรนเบื้องต้น'
    ],
    teacher: 'ครูศุภชัย คงเจริญ (ครูโอ๋)',
    room: 'ลานอเนกประสงค์ / โดมกิจกรรมอุ่นไอรัก',
    dayTime: 'ทุกวันพุธ 14:30 - 15:30 น.',
    allowedGrades: ['ป.4', 'ป.5', 'ป.6'],
    maxSeats: 20,
    registeredCount: 19,
    colorTheme: 'blue',
    iconName: 'Plane',
    isOpen: true
  },
  {
    id: 'club-smart-farm',
    code: 'CS-SCI-01',
    name: 'ชุมนุมฟาร์มอัจฉริยะและนักวิทย์ IoT สิ่งแวดล้อม (Smart Farm & Eco IoT)',
    category: 'วิทยาศาสตร์และสิ่งแวดล้อม',
    description: 'ทดลองปลูกผักไฮโดรโปนิกส์ด้วยระบบรดน้ำอัตโนมัติ IoT ตรวจวัดความชื้นและสภาพอากาศตามแนวทางเศรษฐกิจพอเพียง',
    highlights: [
      'เรียนรู้การทำงานของเซนเซอร์วัดดิน แดด และน้ำ',
      'ปลูกผักสวนครัวอินทรีย์ ปลอดภัย นำไปประกอบอาหาร',
      'สร้างระบบดูแลต้นไม้อัตโนมัติในโรงเรียน'
    ],
    teacher: 'ครูรัตนาพร มั่งคั่ง (ครูเปิ้ล)',
    room: 'เรือนเพาะชำอัจฉริยะ ข้างแปลงเกษตรเพื่อน้อง',
    dayTime: 'ทุกวันพุธ 14:30 - 15:30 น.',
    allowedGrades: ['ป.3', 'ป.4', 'ป.5', 'ป.6'],
    maxSeats: 25,
    registeredCount: 18,
    colorTheme: 'emerald',
    iconName: 'Leaf',
    isOpen: true
  },
  {
    id: 'club-science-magic',
    code: 'CS-SCI-02',
    name: 'ชุมนุมนักประดิษฐ์สะเต็มและการทดลองแสนสนุก (STEM Magic Lab)',
    category: 'วิทยาศาสตร์และสิ่งแวดล้อม',
    description: 'ปลดปล่อยจินตนาการด้วยการทดลองวิทยาศาสตร์สุดมหัศจรรย์ ประดิษฐ์จรวดขวดน้ำ รถพลังงานลม และสะพานกระดาษทนแรง',
    highlights: [
      'ลงมือทดลองจริงทุกสัปดาห์ ไม่มีแต่ทฤษฎี',
      'ประดิษฐ์ของเล่นวิทยาศาสตร์กลับบ้าน',
      'ส่งเสริมความช่างสังเกตและการตั้งสมมติฐาน'
    ],
    teacher: 'ครูวิลาวัลย์ มีสุข (ครูแอน)',
    room: 'ห้องปฏิบัติการวิทยาศาสตร์ประถม',
    dayTime: 'ทุกวันพุธ 14:30 - 15:30 น.',
    allowedGrades: ['ป.1', 'ป.2', 'ป.3', 'ป.4'],
    maxSeats: 30,
    registeredCount: 27,
    colorTheme: 'amber',
    iconName: 'FlaskConical',
    isOpen: true
  },
  {
    id: 'club-digital-art',
    code: 'CS-ART-01',
    name: 'ชุมนุมศิลปะดิจิทัลและแอนิเมชัน 2D (Digital Art & 2D Cartoon)',
    category: 'ศิลปะและสื่อสร้างสรรค์',
    description: 'ฝึกวาดภาพการ์ตูนตัวโปรด ออกแบบสติกเกอร์ และสร้างแอนิเมชันขยับได้ด้วยแท็บเล็ตและโปรแกรมวาดภาพดิจิทัล',
    highlights: [
      'ออกแบบตัวละครมาสคอตโรงเรียนวัดคู่สร้าง',
      'เรียนรู้ทฤษฎีสีและลายเส้นแอนิเมชัน',
      'จัดแสดงผลงานบนนิทรรศการออนไลน์ของโรงเรียน'
    ],
    teacher: 'ครูณัฐวุฒิ บุญมี (ครูนัท)',
    room: 'ห้องศิลปะสร้างสรรค์ (อาคาร 2 ชั้น 2)',
    dayTime: 'ทุกวันพุธ 14:30 - 15:30 น.',
    allowedGrades: ['ป.1', 'ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6'],
    maxSeats: 25,
    registeredCount: 22,
    colorTheme: 'rose',
    iconName: 'Palette',
    isOpen: true
  },
  {
    id: 'club-music-sound',
    code: 'CS-MUS-01',
    name: 'ชุมนุมดนตรีสากลร่วมสมัยและซาวด์แล็บ (Smart Music & Melody Lab)',
    category: 'ดนตรีและนาฏศิลป์',
    description: 'ฝึกร้องเพลง เล่นอูคูเลเล่ คีย์บอร์ด และสร้างเสียงดนตรีดิจิทัล สนุกกับจังหวะเมโลดี้ร่วมกับเพื่อนๆ',
    highlights: [
      'ฝึกทักษะจังหวะและการฟังดนตรี',
      'ร่วมฝึกเล่นเป็นวงดนตรีรุ่นเยาว์ของโรงเรียน',
      'ร่วมแสดงในกิจกรรมวันสำคัญและงานประจำปี'
    ],
    teacher: 'ครูเกรียงไกร สมบูรณ์ (ครูต้อม)',
    room: 'ห้องดนตรีสากล (อาคาร 3 ชั้น 1)',
    dayTime: 'ทุกวันพุธ 14:30 - 15:30 น.',
    allowedGrades: ['ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6'],
    maxSeats: 25,
    registeredCount: 16,
    colorTheme: 'purple',
    iconName: 'Music',
    isOpen: true
  },
  {
    id: 'club-thai-dance',
    code: 'CS-MUS-02',
    name: 'ชุมนุมนาฏศิลป์ร่วมสมัยวัดคู่สร้างแชแนล (Modern Cultural Dance)',
    category: 'ดนตรีและนาฏศิลป์',
    description: 'สืบสานศิลปวัฒนธรรมไทยผสมผสานการเต้นร่วมสมัย พร้อมบันทึกวิดีโอเผยแพร่ลงช่องสื่อการเรียนรู้โรงเรียน',
    highlights: [
      'ฝึกบุคลิกภาพ ความสง่างาม และความมั่นใจในตนเอง',
      'การแสดงนาฏศิลป์ไทยประยุกต์ร่วมสมัย',
      'ได้ร่วมแสดงเป็นตัวแทนโรงเรียนในงานชุมชน'
    ],
    teacher: 'ครูสุพัตรา ชื่นใจ (ครูเอ๋)',
    room: 'ห้องนาฏศิลป์ (อาคารอเนกประสงค์ ชั้น 2)',
    dayTime: 'ทุกวันพุธ 14:30 - 15:30 น.',
    allowedGrades: ['ป.1', 'ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6'],
    maxSeats: 30,
    registeredCount: 20,
    colorTheme: 'pink',
    iconName: 'Smile',
    isOpen: true
  },
  {
    id: 'club-global-english',
    code: 'CS-LANG-01',
    name: 'ชุมนุมภาษาอังกฤษอัจฉริยะท่องโลกเสมือน (Global English VR Tour)',
    category: 'ภาษาและการสื่อสาร',
    description: 'ฝึกพูดภาษาอังกฤษผ่านเกมสถานการณ์จำลอง แว่นตา VR ท่องเที่ยวรอบโลก และพูดคุยกับเพื่อนใหม่สไตล์อินเตอร์',
    highlights: [
      'ฝึกออกเสียงภาษาอังกฤษอย่างมั่นใจ สนุก ไม่เกร็ง',
      'สัมผัสสถานที่สำคัญทั่วโลกผ่านเทคโนโลยี Virtual Reality',
      'เกมและกิจกรรม Interactive หลากหลาย'
    ],
    teacher: 'Teacher Michael & ครูวรรณา ใจดี',
    room: 'ห้อง Sound Lab & English Center',
    dayTime: 'ทุกวันพุธ 14:30 - 15:30 น.',
    allowedGrades: ['ป.1', 'ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6'],
    maxSeats: 30,
    registeredCount: 24,
    colorTheme: 'indigo',
    iconName: 'Globe',
    isOpen: true
  },
  {
    id: 'club-little-chef',
    code: 'CS-LIFE-01',
    name: 'ชุมนุมยอดเชฟตัวน้อยและวิทยาศาสตร์อาหาร (Junior MasterChef & Food Lab)',
    category: 'ทักษะชีวิตและอาชีพ',
    description: 'เรียนรู้การทำอาหารว่าง ขนมไทยโบราณ และเบเกอรี่เพื่อสุขภาพ พร้อมเข้าใจวิทยาศาสตร์การเปลี่ยนรูปของอาหารแสนอร่อย',
    highlights: [
      'สุขอนามัยและความปลอดภัยในครัว',
      'ลงมือทำขนมและอาหารว่างทานได้จริงทุกสัปดาห์',
      'ต่อยอดเป็นทักษะชีวิตและการค้าขายยุคใหม่'
    ],
    teacher: 'ครูสมใจ พึ่งพา (ครูหน่อย)',
    room: 'ห้องคหกรรมและการงานอาชีพ',
    dayTime: 'ทุกวันพุธ 14:30 - 15:30 น.',
    allowedGrades: ['ป.3', 'ป.4', 'ป.5', 'ป.6'],
    maxSeats: 25,
    registeredCount: 24,
    colorTheme: 'orange',
    iconName: 'Utensils',
    isOpen: true
  },
  {
    id: 'club-mind-games',
    code: 'CS-LIFE-02',
    name: 'ชุมนุมบอร์ดเกมและหมากรุกกลยุทธ์ปัญญา (Brain Strategy & Board Games)',
    category: 'ทักษะชีวิตและอาชีพ',
    description: 'ฝึกสมองประลองปัญญาผ่านหมากรุกไทย หมากฮอส และบอร์ดเกมพัฒนาทักษะการตัดสินใจ การวางแผน และการทำงานเป็นทีม',
    highlights: [
      'ฝึกสมาธิและความอดทนในการแก้ปัญหา',
      'เล่นบอร์ดเกมหลากหลายแนว ฝึกทักษะเจรจาต่อรอง',
      'แข่งขันเชื่อมสัมพันธ์ภายในโรงเรียน'
    ],
    teacher: 'ครูประสิทธิ์ ยิ้มแย้ม (ครูสิทธิ์)',
    room: 'ห้องบอร์ดเกมและพัฒนาสมอง (อาคาร 1 ชั้น 3)',
    dayTime: 'ทุกวันพุธ 14:30 - 15:30 น.',
    allowedGrades: ['ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6'],
    maxSeats: 28,
    registeredCount: 23,
    colorTheme: 'teal',
    iconName: 'Gamepad2',
    isOpen: true
  },
  {
    id: 'club-esport-edu',
    code: 'CS-TECH-04',
    name: 'ชุมนุมอีสปอร์ตเชิงบวกและการคิดเชิงระบบ (Positive E-Sports & Logic)',
    category: 'เทคโนโลยีและคอมพิวเตอร์',
    description: 'เรียนรู้กีฬาอีสปอร์ตอย่างมีวินัย พัฒนาไหวพริบ ความเร็ว การสื่อสารในทีม และแบ่งเวลาเรียนรู้ได้อย่างมีประสิทธิภาพ',
    highlights: [
      'การแข่งขันเกมเชิงกลยุทธ์และการศึกษา',
      'การจัดสรรเวลาเล่นเกม สุขภาพสายตา และการยืดเหยียด',
      'เรียนรู้บทบาทแคสเตอร์ นักพากย์เกม และผู้ดูแลระบบ'
    ],
    teacher: 'ครูอนุชา รอดเจริญ (ครูนุ)',
    room: 'ห้อง E-Sports Arena & Multimedia',
    dayTime: 'ทุกวันพุธ 14:30 - 15:30 น.',
    allowedGrades: ['ป.4', 'ป.5', 'ป.6'],
    maxSeats: 24,
    registeredCount: 24, // Full for realistic demo!
    colorTheme: 'red',
    iconName: 'Trophy',
    isOpen: true
  }
];

export const INITIAL_REGISTRATIONS: StudentRegistration[] = [
  {
    id: 'reg-001',
    studentId: '10421',
    prefix: 'ด.ช.',
    firstName: 'กิตติศักดิ์',
    lastName: 'รักษ์เทคโน',
    grade: 'ป.5',
    roomNumber: '1',
    seatNumber: '04',
    parentPhone: '081-234-5678',
    clubId: 'club-robotics',
    clubName: 'ชุมนุมหุ่นยนต์จิ๋วและโค้ดดิ้งสร้างสรรค์ (Kids Robotics & Scratch)',
    registeredAt: '2026-09-01T09:30:00Z',
    notes: 'อยากประดิษฐ์หุ่นยนต์ดูดฝุ่น'
  },
  {
    id: 'reg-002',
    studentId: '10488',
    prefix: 'ด.ญ.',
    firstName: 'ณิชาภัทร',
    lastName: 'สมใจดี',
    grade: 'ป.6',
    roomNumber: '2',
    seatNumber: '12',
    parentPhone: '089-876-5432',
    clubId: 'club-ai-creator',
    clubName: 'ชุมนุมหนูน้อย AI & ดิจิทัลครีเอเตอร์ (AI Kidz & Media Creators)',
    registeredAt: '2026-09-01T10:15:00Z',
    notes: 'ชอบทำคลิปตัดต่อแอนิเมชัน'
  },
  {
    id: 'reg-003',
    studentId: '10234',
    prefix: 'ด.ช.',
    firstName: 'ภานุวัฒน์',
    lastName: 'คู่สร้างเจริญ',
    grade: 'ป.4',
    roomNumber: '3',
    seatNumber: '08',
    parentPhone: '086-555-1234',
    clubId: 'club-drone-stem',
    clubName: 'ชุมนุมอากาศยานไร้คนขับและนักบินโดรนตัวน้อย (Junior Drone Explorer)',
    registeredAt: '2026-09-02T13:40:00Z'
  },
  {
    id: 'reg-004',
    studentId: '10115',
    prefix: 'ด.ญ.',
    firstName: 'กัญญาณัฐ',
    lastName: 'วาดฝัน',
    grade: 'ป.3',
    roomNumber: '1',
    seatNumber: '15',
    parentPhone: '084-321-9988',
    clubId: 'club-digital-art',
    clubName: 'ชุมนุมศิลปะดิจิทัลและแอนิเมชัน 2D (Digital Art & 2D Cartoon)',
    registeredAt: '2026-09-03T11:20:00Z'
  },
  {
    id: 'reg-005',
    studentId: '10512',
    prefix: 'ด.ช.',
    firstName: 'ธนวัฒน์',
    lastName: 'เกมเมอร์',
    grade: 'ป.6',
    roomNumber: '1',
    seatNumber: '01',
    parentPhone: '082-999-7711',
    clubId: 'club-esport-edu',
    clubName: 'ชุมนุมอีสปอร์ตเชิงบวกและการคิดเชิงระบบ (Positive E-Sports & Logic)',
    registeredAt: '2026-09-01T08:35:00Z'
  }
];

export const SCHOOL_INFO = {
  name: 'โรงเรียนประถมศึกษาวัดคู่สร้าง',
  subName: 'Wat Khusang Elementary School',
  affiliation: 'สำนักงานเขตพื้นที่การศึกษาประถมศึกษาสมุทรปราการ เขต 1',
  term: 'ภาคเรียนที่ 1 ปีการศึกษา 2568',
  registrationPeriod: 'เปิดรับลงทะเบียน: 1 - 10 พฤษภาคม 2568',
  meetingSchedule: 'ทุกวันพุธ เวลา 14:30 - 15:30 น.',
  supportPhone: '02-425-XXXX',
  address: 'ตำบลในคลองบางปลากด อำเภอพระสมุทรเจดีย์ จังหวัดสมุทรปราการ'
};
