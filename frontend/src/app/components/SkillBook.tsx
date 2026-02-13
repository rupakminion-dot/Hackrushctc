import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

interface Skill {
  id?: number;
  name: string;
  demand_index?: number;
  level?: string;
}

interface SkillBookProps {
  skill: Skill;
  color: string;
  onClick: () => void;
}

export default function SkillBook({
  skill,
  color,
  onClick,
}: SkillBookProps) {
  const [isHovered, setIsHovered] = useState(false);

  const level = skill.level || "All Levels";
  const learners = skill.demand_index || 0;

  return (
    <div className="relative h-48 w-32">

      {/* Animated Book */}
      <motion.div
        className="absolute bottom-0 w-full h-44 cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        animate={{
          y: isHovered ? -18 : 0,
          rotateX: isHovered ? 6 : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 22,
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Spine */}
        <div
          className="h-full w-full rounded-sm shadow-lg flex flex-col justify-between p-3 border border-amber-900/30"
          style={{
            background: `linear-gradient(to right, ${color}, ${color}dd)`,
            boxShadow:
              "4px 6px 12px rgba(0,0,0,0.35), inset -2px 0 4px rgba(0,0,0,0.25)",
          }}
        >
          {/* Title */}
          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-amber-50 font-serif text-center text-sm leading-tight">
              {skill.name}
            </h3>
          </div>

          {/* Icon */}
          <div className="text-amber-100/80 text-xs">
            <BookOpen size={16} className="mx-auto" />
          </div>
        </div>

        {/* Page edges */}
        <div className="absolute right-0 top-1 h-[calc(100%-8px)] w-1 bg-amber-50/80" />
        <div className="absolute right-0.5 top-2 h-[calc(100%-16px)] w-0.5 bg-amber-100/60" />
      </motion.div>

      {/* Hover Popup */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full ml-4 top-0 z-50 w-64 bg-amber-50 rounded-lg shadow-2xl p-4 border border-amber-900/20"
          >
            <h4 className="font-serif text-lg text-amber-900 mb-2">
              {skill.name}
            </h4>

            <div className="space-y-1 text-sm text-amber-800">
              <p>
                <span className="font-semibold">Level:</span> {level}
              </p>
              <p>
                <span className="font-semibold">Demand Index:</span>{" "}
                {learners}/100
              </p>
              <p className="text-xs text-amber-600 mt-2 italic">
                Click to explore this skill →
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
