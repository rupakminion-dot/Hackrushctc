import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

interface SkillBookProps {
  title: string;
  color: string;
  level: string;
  learners: number;
  onClick: () => void;
}

export function SkillBook({ title, color, level, learners, onClick }: SkillBookProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative h-48 w-32">
      <motion.div
        className="absolute bottom-0 w-full h-44 cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        animate={{
          y: isHovered ? -20 : 0,
          rotateX: isHovered ? 5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Book spine */}
        <div
          className="h-full w-full rounded-sm shadow-lg flex flex-col justify-between p-3 border-2 border-amber-900/30"
          style={{
            background: `linear-gradient(to right, ${color}, ${color}dd)`,
            boxShadow: '4px 4px 8px rgba(0,0,0,0.3), inset -2px 0 4px rgba(0,0,0,0.2)',
          }}
        >
          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-amber-50 font-serif transform -rotate-0 text-center text-sm leading-tight">
              {title}
            </h3>
          </div>
          <div className="text-amber-100/70 text-xs">
            <BookOpen size={16} className="mx-auto" />
          </div>
        </div>

        {/* Book pages effect */}
        <div className="absolute right-0 top-1 h-[calc(100%-8px)] w-1 bg-amber-50/80" />
        <div className="absolute right-0.5 top-2 h-[calc(100%-16px)] w-0.5 bg-amber-100/60" />
      </motion.div>

      {/* Hover details popup */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute left-full ml-4 top-0 z-50 w-64 bg-amber-50 rounded-lg shadow-2xl p-4 border-2 border-amber-900/20"
        >
          <h4 className="font-serif text-lg text-amber-900 mb-2">{title}</h4>
          <div className="space-y-1 text-sm text-amber-800">
            <p><span className="font-semibold">Level:</span> {level}</p>
            <p><span className="font-semibold">Learners:</span> {learners.toLocaleString()}</p>
            <p className="text-xs text-amber-600 mt-2 italic">Click to explore this skill</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
