import { motion } from "motion/react";
import { AnimatedBackground } from "./AnimatedBackground";
import { AnimatedCharacter } from "./AnimatedCharacter";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const units = [
  { id: 1, path: "/unit/One/lesson/1", color: '#6a3996', name: 'Unit One' },
  { id: 2, path: "/unit/Two/lesson/1", color: '#6a3996', name: 'Unit Two' },
  { id: 3, path: "/unit/Three/lesson/1", color: '#6a3996', name: 'Unit Three' },
  { id: 4, path: "/unit/Four/lesson/1", color: '#6a3996', name: 'Unit Four' },
];

export default function UnitsPage({ onUnitSelect }) {
  const navigate = useNavigate();
  const [openUnitId, setOpenUnitId] = useState(null);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">

      <AnimatedBackground />
      <AnimatedCharacter />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-12 text-center relative z-10"
        style={{ color: '#284660' }}
      >
        Choose a Unit
      </motion.h1>

      {/* Units Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl w-full relative z-10">
        {units.map((unit, index) => (
          <motion.div
            key={unit.id}
            role="button"
            tabIndex={0}
            onClick={() => setOpenUnitId(openUnitId === unit.id ? null : unit.id)}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all relative group flex items-center gap-4 sm:gap-6 cursor-pointer"
          >

            {/* Colored Icon Background */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: unit.color }}
            >
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            {/* Text */}
            <div className="flex-1 text-left">
              <div
                className="text-2xl sm:text-3xl font-semibold"
                style={{ color: unit.color }}
              >
                {unit.name}
              </div>
            </div>

            {/* Arrow */}
            <motion.div
              className="text-gray-300 group-hover:text-gray-400"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>

            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl"
              style={{ backgroundColor: unit.color }}
            />

            {openUnitId === unit.id && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 w-full bg-white rounded-2xl shadow-lg mt-2 p-4 z-20 flex flex-col gap-3"
              >
                {/* Story */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(unit.path);
                  }}
                  className="py-2 px-4 rounded-xl hover:bg-gray-100 text-left"
                >
                  📖 Story
                </button>

                {/* Quiz */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`${unit.path}/quiz`);
                  }}
                  className="py-2 px-4 rounded-xl hover:bg-gray-100 text-left"
                >
                  📝 Quiz
                </button>

                {/* Feedback */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`${unit.path}/feedBack`);
                  }}
                  className="py-2 px-4 rounded-xl hover:bg-gray-100 text-left"
                >
                  💬 Feedback
                </button>
              </motion.div>
            )}



          </motion.div>
        ))}
      </div>
    </div>
  );
}
