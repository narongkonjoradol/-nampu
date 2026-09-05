import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Club } from '../types';
import { TechCartoonMascot } from './TechCartoonMascot';
import { playPop, playSuccessChime, playSelectSound } from '../utils/soundEffects';

interface ClubQuizTabProps {
  clubs: Club[];
  onSelectClub: (club: Club) => void;
}

interface Question {
  id: number;
  question: string;
  categoryTag: string;
  options: {
    label: string;
    description: string;
    category: 'tech' | 'art' | 'sci' | 'life';
    iconEmoji: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'เวลาว่างหรือพักเที่ยง น้องๆ ชอบทำอะไรมากที่สุด? 🎮🎨',
    categoryTag: 'ความชอบส่วนตัว',
    options: [
      {
        label: 'ชอบเล่นแท็บเล็ต ทดลองโค้ดดิ้ง หรือต่อเลโก้กลไก',
        description: 'ชอบอุปกรณ์ไอที หุ่นยนต์ และเทคโนโลยีใหม่ๆ',
        category: 'tech',
        iconEmoji: '🤖'
      },
      {
        label: 'ชอบวาดรูป ระบายสี ฟังเพลง ร้องเพลง หรือเต้นตามจังหวะ',
        description: 'มีจินตนาการทางศิลปะและสุนทรียภาพ',
        category: 'art',
        iconEmoji: '🎨'
      },
      {
        label: 'ชอบสังเกตธรรมชาติ ปลูกต้นไม้ หรือทดลองวิทยาศาสตร์',
        description: 'ชอบค้นหาคำตอบว่าสิ่งต่างๆ รอบตัวทำงานอย่างไร',
        category: 'sci',
        iconEmoji: '🔬'
      },
      {
        label: 'ชอบเล่นบอร์ดเกม หมากรุก หรือช่วยทำขนมทำอาหาร',
        description: 'ชอบฝึกคิดแก้ปัญหาและทักษะการทำงานร่วมกับผู้อื่น',
        category: 'life',
        iconEmoji: '🍰'
      }
    ]
  },
  {
    id: 2,
    question: 'ถ้าได้รับอุปกรณ์ไฮเทคจากโลกอนาคต 1 ชิ้น อยากได้สิ่งไหน? 🚀✨',
    categoryTag: 'จินตนาการเทคโนโลยี',
    options: [
      {
        label: 'โดรนสำรวจอัจฉริยะ พร้อมระบบขับเคลื่อนอัตโนมัติ AI',
        description: 'อยากบินสำรวจและเขียนคำสั่งนำทาง',
        category: 'tech',
        iconEmoji: '🚁'
      },
      {
        label: 'พู่กันดิจิทัลโฮโลแกรม วาดแล้วภาพกลายเป็นการ์ตูนมีชีวิต',
        description: 'อยากสร้างแอนิเมชันและตัวการ์ตูนสุดน่ารัก',
        category: 'art',
        iconEmoji: '🪄'
      },
      {
        label: 'เซนเซอร์ตรวจจับสภาพอากาศและเรือนเพาะชำอัจฉริยะ IoT',
        description: 'ช่วยดูแลธรรมชาติและปลูกผักอินทรีย์เพื่อโลกสวย',
        category: 'sci',
        iconEmoji: '🌱'
      },
      {
        label: 'แว่นตา VR ท่องโลกภาษาอังกฤษและจำลองห้องทำอาหาร',
        description: 'ฝึกพูดภาษาและคิดค้นสูตรขนมแสนอร่อย',
        category: 'life',
        iconEmoji: '🥽'
      }
    ]
  },
  {
    id: 3,
    question: 'น้องๆ อยากให้ผลงานจากชุมนุมออกมาเป็นอย่างไรมากที่สุด? 🏆🌟',
    categoryTag: 'เป้าหมายความสำเร็จ',
    options: [
      {
        label: 'ประดิษฐ์หุ่นยนต์/แอปพลิเคชันไปแข่งงานศิลปหัตถกรรม',
        description: 'สร้างชื่อเสียงให้โรงเรียนวัดคู่สร้างด้านเทคโนโลยี',
        category: 'tech',
        iconEmoji: '🥇'
      },
      {
        label: 'คลิปแอนิเมชันหรือผลงานศิลปะจัดแสดงบนเพจโรงเรียน',
        description: 'แบ่งปันความสุขและรอยยิ้มให้เพื่อนๆ และผู้ปกครอง',
        category: 'art',
        iconEmoji: '🎬'
      },
      {
        label: 'ผักสวนครัวไฮโดรโปนิกส์สดๆ และการทดลองวิทย์สนุกๆ',
        description: 'นำความรู้กลับไปดูแลต้นไม้ที่บ้านได้จริง',
        category: 'sci',
        iconEmoji: '🥬'
      },
      {
        label: 'ได้เพื่อนใหม่ เล่นบอร์ดเกมอย่างมีน้ำใจนักกีฬา และชิมขนมฝีมือตัวเอง',
        description: 'มีความสุข สนุกสนาน และมีทักษะชีวิตติดตัว',
        category: 'life',
        iconEmoji: '🤝'
      }
    ]
  }
];

export function ClubQuizTab({ clubs, onSelectClub }: ClubQuizTabProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'tech' | 'art' | 'sci' | 'life'>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, category: 'tech' | 'art' | 'sci' | 'life') => {
    playSelectSound();
    const updated = { ...selectedAnswers, [questionId]: category };
    setSelectedAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        playPop();
      }, 250);
    } else {
      setTimeout(() => {
        setIsCompleted(true);
        playSuccessChime();
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }, 300);
    }
  };

  const handleReset = () => {
    playPop();
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  // Calculate scores
  type QuizCategory = 'tech' | 'art' | 'sci' | 'life';
  const categoryScores: Record<QuizCategory, number> = {
    tech: 0,
    art: 0,
    sci: 0,
    life: 0
  };

  (Object.values(selectedAnswers) as QuizCategory[]).forEach((cat) => {
    categoryScores[cat] = (categoryScores[cat] || 0) + 1;
  });

  // Recommended clubs
  const sortedCategories = (Object.keys(categoryScores) as QuizCategory[]).sort(
    (a, b) => categoryScores[b] - categoryScores[a]
  );
  const topCategory = sortedCategories[0];

  const recommendedClubs = clubs.filter((c) => {
    if (topCategory === 'tech') return c.category === 'เทคโนโลยีและคอมพิวเตอร์';
    if (topCategory === 'art') return c.category === 'ศิลปะและสื่อสร้างสรรค์' || c.category === 'ดนตรีและนาฏศิลป์';
    if (topCategory === 'sci') return c.category === 'วิทยาศาสตร์และสิ่งแวดล้อม';
    return c.category === 'ทักษะชีวิตและอาชีพ' || c.category === 'ภาษาและการสื่อสาร';
  }).slice(0, 3);

  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Quiz Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>มินิเกมค้นหาชุมนุมที่ใช่</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          น้องคู่สร้างบอทช่วยเลือกชุมนุม 🤖
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          ตอบคำถาม 3 ข้อสั้นๆ แล้วระบบจะจับคู่ชุมนุมที่ตรงกับความชอบและระดับชั้นของน้องๆ ให้ทันที!
        </p>
      </div>

      {!isCompleted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-violet-200 shadow-xl relative overflow-hidden">
          {/* Progress indicators */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <span className="text-xs font-bold text-violet-700 font-tech">
              คำถามข้อที่ {currentStep + 1} / {QUESTIONS.length}
            </span>
            <div className="flex items-center gap-1.5">
              {QUESTIONS.map((q, idx) => (
                <div
                  key={q.id}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentStep
                      ? 'w-8 bg-violet-600'
                      : idx < currentStep
                      ? 'w-4 bg-emerald-500'
                      : 'w-4 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-200 mb-2">
              {currentQ.categoryTag}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === option.category;
              return (
                <button
                  key={idx}
                  id={`btn-quiz-opt-${currentQ.id}-${idx}`}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, option.category)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-violet-500 bg-violet-50/70 shadow-md'
                      : 'border-slate-200 hover:border-violet-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl p-1 bg-white rounded-xl shadow-xs border border-slate-100 flex-shrink-0">
                    {option.iconEmoji}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">
                      {option.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {option.description}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                    isSelected ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mascot companion note */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
            <TechCartoonMascot
              size="sm"
              reaction="thinking"
              showSpeechBubble={false}
              className="flex-shrink-0"
            />
            <p className="text-xs text-slate-500">
              💡 <strong>คำแนะนำจากน้องบอท:</strong> เลือกคำตอบที่รู้สึกว่า "ใช่ตัวเรามากที่สุด" ไม่ต้องกังวลเรื่องถูกผิดนะคร้าบ!
            </p>
          </div>
        </div>
      ) : (
        /* Completed Results View */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-xl text-center relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
            <Sparkles className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
            วิเคราะห์ผลสำเร็จแล้ว! 🎉
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            น้องคู่สร้างบอทได้จับคู่ชุมนุมที่เหมาะกับทักษะและความสนใจของน้องๆ 3 อันดับแรก:
          </p>

          {/* Recommended Clubs List */}
          <div className="space-y-3 my-6 text-left">
            {recommendedClubs.map((club, idx) => (
              <div
                key={club.id}
                id={`quiz-recommended-${club.id}`}
                className="p-4 rounded-2xl border-2 border-cyan-200 bg-linear-to-r from-cyan-50/50 to-white hover:border-cyan-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      {idx === 0 ? 'ตรงกับความชอบ 98%' : idx === 1 ? 'ตรงกับความชอบ 92%' : 'ตรงกับความชอบ 85%'}
                    </span>
                    <span className="text-xs font-tech text-slate-500">
                      {club.code}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">
                    {club.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {club.room} • {club.teacher} • ว่าง {Math.max(0, club.maxSeats - club.registeredCount)} ที่
                  </p>
                </div>

                <button
                  id={`btn-select-quiz-club-${club.id}`}
                  onClick={() => {
                    playSelectSound();
                    onSelectClub(club);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all flex-shrink-0"
                >
                  <span>เลือกลงทะเบียน</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3">
            <button
              id="btn-quiz-reset"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ทำแบบทดสอบใหม่</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
