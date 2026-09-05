import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MascotReaction } from '../types';
import { playRobotBeep, playPop } from '../utils/soundEffects';

interface MascotProps {
  reaction?: MascotReaction;
  customMessage?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSpeechBubble?: boolean;
  onMascotClick?: () => void;
  className?: string;
}

const DEFAULT_MESSAGES: Record<MascotReaction, string[]> = {
  welcome: [
    'สวัสดีครับเพื่อนๆ! ยินดีต้อนรับสู่ระบบลงทะเบียนชุมนุม โรงเรียนวัดคู่สร้างนะคร้าบ! 🚀',
    'น้องคู่สร้างบอทพร้อมช่วยเพื่อนๆ เลือกชุมนุมสุดเจ๋งแล้วครับ!',
    'ปีนี้มีชุมนุมหุ่นยนต์ AI โดรน และศิลปะเพียบเลยนะ!'
  ],
  happy: [
    'เย้! ชุมนุมนี้สนุกมากๆ เลยนะ ลองดูรายละเอียดได้เลยครับ!',
    'เลือกชุมนุมที่ชอบ พัฒนาทักษะแห่งอนาคตไปด้วยกันครับ!'
  ],
  thinking: [
    'กำลังวิเคราะห์ข้อมูล... อื้มมม ชุมนุมนี้น่าสนใจมากๆ เลยนะ!',
    'กำลังตรวจสอบระดับชั้นและที่นั่งคงเหลือคร้าบ...'
  ],
  success: [
    'ยินดีด้วยนะคร้าบ! ลงทะเบียนสำเร็จแล้ว! เจอกันในคาบชุมนุมนะ! 🎉',
    'ดาวน์โหลดบัตรสมาชิกชุมนุมไปอวดเพื่อนๆ ได้เลยยย!'
  ],
  alert: [
    'เอ๊ะ! อย่าลืมตรวจสอบระดับชั้นให้ตรงกับเงื่อนไขของชุมนุมน้า!',
    'ที่นั่งชุมนุมนี้มีจำนวนจำกัด รีบลงทะเบียนก่อนเต็มนะคร้าบ!'
  ],
  cheer: [
    'สุดยอดเลย! ชุมนุมวัดคู่สร้างสร้างสรรค์เทคโนโลยีเพื่ออนาคต!',
    'เด็กวัดคู่สร้าง เก่ง ดี มีคุณธรรม ทันเทคโนโลยี!'
  ]
};

export function TechCartoonMascot({
  reaction = 'welcome',
  customMessage,
  size = 'md',
  showSpeechBubble = true,
  onMascotClick,
  className = ''
}: MascotProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const [blink, setBlink] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto blink animation every 3-5 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleClick = () => {
    playRobotBeep();
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1200);
    setCurrentMessageIndex((prev) => (prev + 1) % (DEFAULT_MESSAGES[reaction]?.length || 1));
    if (onMascotClick) onMascotClick();
  };

  const currentMessage = customMessage || DEFAULT_MESSAGES[reaction][currentMessageIndex % DEFAULT_MESSAGES[reaction].length];

  // Dimensions based on size
  const scaleMap = {
    sm: 'w-20 h-24',
    md: 'w-32 h-36',
    lg: 'w-44 h-48',
    hero: 'w-56 h-60 md:w-64 md:h-72'
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      {showSpeechBubble && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="mb-3 max-w-xs md:max-w-sm px-4 py-2.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border-2 border-cyan-300 text-slate-800 text-xs md:text-sm font-medium relative z-10"
          >
            <div className="flex items-start gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-ping mt-1 flex-shrink-0" />
              <p className="leading-relaxed">{currentMessage}</p>
            </div>
            {/* Bubble Tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-cyan-300 transform rotate-45" />
          </motion.div>
        </AnimatePresence>
      )}

      {/* SVG Robot Character Container */}
      <motion.div
        className={`relative cursor-pointer ${scaleMap[size]} group`}
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true);
          playPop();
        }}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -8, 0],
          rotate: isWaving ? [0, -3, 3, -3, 0] : [0, 1, 0, -1, 0]
        }}
        transition={{
          y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          rotate: isWaving ? { duration: 0.6 } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        {/* Floating tech holograms around mascot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-3 -right-3 text-cyan-400 opacity-70 pointer-events-none"
        >
          <svg className="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 -left-4 text-emerald-400 opacity-60 pointer-events-none"
        >
          <div className="w-3 h-3 rounded-full border border-emerald-400 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          </div>
        </motion.div>

        {/* Glow Shadow under hover */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-cyan-500/25 rounded-full blur-md animate-pulse" />

        {/* The Robot Mascot SVG */}
        <svg
          viewBox="0 0 240 260"
          className="w-full h-full drop-shadow-xl overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Robot Body Gradient */}
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>

            {/* Screen Glass Gradient */}
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            {/* Cyan Neon Glow */}
            <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Orange Thruster Flame */}
            <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>

            {/* Filter for glowing antenna */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Jet Thruster Flames (animated) */}
          <g>
            <motion.path
              d="M75 220 Q70 245 75 255 Q80 245 85 220 Z"
              fill="url(#flameGrad)"
              animate={{ scaleY: [1, 1.4, 0.9, 1.3, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
            <motion.path
              d="M155 220 Q150 245 155 255 Q160 245 165 220 Z"
              fill="url(#flameGrad)"
              animate={{ scaleY: [1, 1.3, 1, 1.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
            />
          </g>

          {/* Robot Antenna */}
          <g>
            {/* Antenna Stem */}
            <rect x="116" y="24" width="8" height="24" rx="4" fill="#64748b" />
            {/* Antenna Spring/Rings */}
            <ellipse cx="120" cy="36" rx="7" ry="2.5" fill="#38bdf8" />
            <ellipse cx="120" cy="30" rx="6" ry="2" fill="#0284c7" />
            {/* Antenna Orb with pulsing glow */}
            <motion.circle
              cx="120"
              cy="18"
              r="10"
              fill="#38bdf8"
              filter="url(#glow)"
              animate={{ r: [9, 12, 9], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <circle cx="118" cy="15" r="3" fill="#ffffff" />
          </g>

          {/* Headphone Ears / Side Sensor Pods */}
          <g>
            {/* Left Ear */}
            <rect x="30" y="70" width="14" height="40" rx="7" fill="#0284c7" />
            <rect x="34" y="76" width="6" height="28" rx="3" fill="#38bdf8" />
            {/* Right Ear */}
            <rect x="196" y="70" width="14" height="40" rx="7" fill="#0284c7" />
            <rect x="200" y="76" width="6" height="28" rx="3" fill="#38bdf8" />
          </g>

          {/* Robot Head (Outer Frame) */}
          <rect
            x="40"
            y="44"
            width="160"
            height="100"
            rx="34"
            fill="url(#bodyGrad)"
            stroke="#0284c7"
            strokeWidth="5"
          />

          {/* Visor Screen (Dark Glass) */}
          <rect
            x="54"
            y="56"
            width="132"
            height="76"
            rx="24"
            fill="url(#screenGrad)"
            stroke="#38bdf8"
            strokeWidth="2.5"
          />

          {/* Screen Glass Reflection */}
          <path
            d="M58 64 C80 60, 140 60, 170 66 C150 78, 90 84, 58 78 Z"
            fill="#ffffff"
            opacity="0.12"
          />

          {/* Face Display (Interactive based on reaction) */}
          {blink ? (
            /* Blinking Eyes (Horizontal Lines) */
            <g stroke="#38bdf8" strokeWidth="4" strokeLinecap="round">
              <line x1="75" y1="92" x2="100" y2="92" />
              <line x1="140" y1="92" x2="165" y2="92" />
            </g>
          ) : reaction === 'success' || reaction === 'cheer' ? (
            /* Cheerful Happy Eyes (Stars/Curved ^_^) */
            <g fill="#38bdf8">
              <path d="M74 95 Q88 78 102 95 Q88 88 74 95 Z" />
              <path d="M138 95 Q152 78 166 95 Q152 88 138 95 Z" />
            </g>
          ) : reaction === 'thinking' ? (
            /* Thinking Expression */
            <g fill="#38bdf8">
              <circle cx="88" cy="90" r="10" />
              <circle cx="152" cy="86" r="12" />
              <path d="M140 76 Q152 72 164 78" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            /* Default Friendly Robot Eyes */
            <g fill="#38bdf8">
              <rect x="76" y="80" width="22" height="24" rx="8" />
              <rect x="142" y="80" width="22" height="24" rx="8" />
              {/* Eye pupils */}
              <circle cx="83" cy="87" r="4" fill="#ffffff" />
              <circle cx="149" cy="87" r="4" fill="#ffffff" />
            </g>
          )}

          {/* Cute Blushing Cheeks */}
          <ellipse cx="68" cy="108" rx="7" ry="4" fill="#f43f5e" opacity="0.6" />
          <ellipse cx="172" cy="108" rx="7" ry="4" fill="#f43f5e" opacity="0.6" />

          {/* Smiling Cyber Mouth */}
          <path
            d="M106 112 Q120 124 134 112"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Body / Torso */}
          <g>
            {/* Neck Joint */}
            <rect x="104" y="142" width="32" height="10" rx="4" fill="#64748b" />

            {/* Chest Main Body */}
            <rect
              x="62"
              y="150"
              width="116"
              height="74"
              rx="24"
              fill="url(#bodyGrad)"
              stroke="#0284c7"
              strokeWidth="4"
            />

            {/* School Emblem / Chest Heart Core: Wat Khusang Tech Badge */}
            <g transform="translate(120, 186)">
              {/* Chest Plate Arc */}
              <circle cx="0" cy="0" r="20" fill="#0284c7" />
              <motion.circle
                cx="0"
                cy="0"
                r="16"
                fill="#38bdf8"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* School "ค.ส." Initials or Tech Atom */}
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="12"
                fontWeight="bold"
                className="font-tech"
              >
                ค.ส.
              </text>
            </g>

            {/* Chest Status Bars (Green/Cyan/Yellow) */}
            <rect x="74" y="162" width="20" height="4" rx="2" fill="#10b981" />
            <rect x="98" y="162" width="16" height="4" rx="2" fill="#38bdf8" />
            <rect x="118" y="162" width="16" height="4" rx="2" fill="#f59e0b" />
          </g>

          {/* Left Arm (Waving animation or resting) */}
          <g>
            <motion.path
              d={isWaving ? "M58 165 C40 140, 25 110, 35 90 C45 80, 55 95, 45 125 Z" : "M62 165 C45 175, 40 195, 48 208 C54 216, 62 208, 62 195 Z"}
              fill="#bae6fd"
              stroke="#0284c7"
              strokeWidth="3.5"
              strokeLinejoin="round"
              animate={isWaving ? { rotate: [0, -15, 10, -15, 0] } : {}}
              transition={{ duration: 0.8 }}
            />
            {/* Left Hand Clamp / Glove */}
            <circle cx={isWaving ? 35 : 50} cy={isWaving ? 85 : 208} r="8" fill="#0284c7" />
          </g>

          {/* Right Arm */}
          <g>
            <path
              d="M178 165 C195 175, 200 195, 192 208 C186 216, 178 208, 178 195 Z"
              fill="#bae6fd"
              stroke="#0284c7"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Right Hand Clamp */}
            <circle cx="190" cy="208" r="8" fill="#0284c7" />
          </g>

          {/* Hover Thruster Pods (Left & Right) */}
          <rect x="70" y="214" width="20" height="12" rx="5" fill="#475569" stroke="#0284c7" strokeWidth="2" />
          <rect x="150" y="214" width="20" height="12" rx="5" fill="#475569" stroke="#0284c7" strokeWidth="2" />
        </svg>

        {/* Hover Hint */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800 text-white text-[11px] px-2.5 py-1 rounded-full pointer-events-none shadow-md"
          >
            คลิกที่น้องเพื่อทักทาย! 👆
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
