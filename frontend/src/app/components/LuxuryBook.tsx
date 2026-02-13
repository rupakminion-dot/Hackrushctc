import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, DollarSign } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  category?: string;
  avg_income?: number;
  providers?: number;
  demand_index?: number;
  growth?: string;
}

interface LuxuryBookProps {
  skill: Skill;
  color: string;
  onClick: () => void;
  isProfitable?: boolean;
}

export default function LuxuryBook({
  skill,
  color,
  onClick,
  isProfitable = false,
}: LuxuryBookProps) {
  const [isHovered, setIsHovered] = useState(false);

  const goldAccent = "#D4AF37";

  // Derived values from backend
  const avgEarnings = skill.avg_income
    ? `$${skill.avg_income.toLocaleString()}/mo`
    : "N/A";

  const providers = skill.providers || 0;
  const demandIndex = skill.demand_index || 0;

  const popularity = demandIndex; // can map this smarter later
  const growth =
    skill.growth ||
    (demandIndex > 90
      ? "+20%"
      : demandIndex > 75
      ? "+15%"
      : "+8%");

  return (
    <div className="relative h-56 w-36 perspective-1000">
      <motion.div
        className="relative w-full h-full cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        animate={{
          y: isHovered ? -25 : 0,
          rotateX: isHovered ? 8 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Spine */}
        <div
          className="relative h-full w-full rounded-r-md"
          style={{
            background: `linear-gradient(to right,
              ${color}f0,
              ${color}cc,
              ${color}aa)`,
            border: `2px solid ${color}`,
            borderLeft: `4px solid ${goldAccent}`,
            boxShadow: isHovered
              ? `0 0 25px ${goldAccent}50`
              : `8px 12px 24px rgba(0,0,0,0.4)`,
          }}
        >
          {/* Title */}
          <div className="absolute inset-0 flex items-center justify-center px-3">
            <h3 className="text-center text-sm font-serif font-bold text-[#FFF8DC]">
              {skill.name}
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full ml-6 top-0 z-50 w-72"
          >
            <div className="bg-[#F5E6D3] rounded-lg shadow-2xl border-2 border-[#D4AF37]">
              {/* Header */}
              <div
                className="px-4 py-3 border-b border-amber-700"
                style={{
                  background: `linear-gradient(180deg, ${color}, ${color}cc)`,
                }}
              >
                <h4 className="text-white font-semibold text-center">
                  {skill.name}
                </h4>
                <p className="text-amber-200 text-xs text-center">
                  {skill.category || "Technology"}
                </p>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 text-sm text-amber-900">
                {!isProfitable ? (
                  <>
                    <Row icon={<DollarSign size={16} />} label="Avg Income" value={avgEarnings} />
                    <Row icon={<Users size={16} />} label="Providers" value={providers} />
                    <Row icon={<TrendingUp size={16} />} label="Demand Index" value={`${demandIndex}/100`} />
                  </>
                ) : (
                  <>
                    <Row icon={<DollarSign size={16} />} label="Monthly Income" value={avgEarnings} />
                    <Row icon={<TrendingUp size={16} />} label="Demand Index" value={`${demandIndex}/100`} />
                    <Row icon={<TrendingUp size={16} />} label="Growth" value={growth} />
                  </>
                )}

                <p className="text-xs italic text-center text-amber-700">
                  Click to explore →
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Reusable Row */
function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between border-b border-amber-800/20 pb-2">
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
