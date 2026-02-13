import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

interface LuxuryBookProps {
  title: string;
  category?: string;
  avgEarnings?: string;
  providers?: number;
  popularity?: number;
  color: string;
  goldAccent?: string;
  onClick: () => void;
  isProfitable?: boolean;
  demandIndex?: number;
  growth?: string;
}

export function LuxuryBook({ 
  title, 
  category = 'Technology',
  avgEarnings = '$4,500/mo',
  providers = 342,
  popularity = 95,
  color, 
  goldAccent = '#D4AF37',
  onClick,
  isProfitable = false,
  demandIndex = 87,
  growth = '+15%'
}: LuxuryBookProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="relative h-56 w-36 perspective-1000">
      <motion.div
        className="relative w-full h-full cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={onClick}
        animate={{
          y: isHovered ? -25 : 0,
          rotateX: isHovered ? 8 : 0,
          scale: isPressed ? 0.98 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25 
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Book Spine */}
        <div
          className="relative h-full w-full rounded-r-md"
          style={{
            background: `linear-gradient(to right, 
              ${color}f0, 
              ${color}dd 20%, 
              ${color}cc 50%, 
              ${color}bb 80%, 
              ${color}aa)`,
            boxShadow: `
              8px 12px 24px rgba(0, 0, 0, 0.4),
              inset -3px 0 6px rgba(0, 0, 0, 0.3),
              inset 3px 0 3px rgba(255, 255, 255, 0.1),
              ${isHovered ? `0 0 30px ${goldAccent}40` : '0 0 0 transparent'}
            `,
            border: `2px solid ${color}`,
            borderLeft: `4px solid ${goldAccent}`,
          }}
        >
          {/* Gold Decorative Top */}
          <div 
            className="absolute top-0 left-0 right-0 h-2"
            style={{
              background: `linear-gradient(90deg, ${goldAccent}, ${goldAccent}cc, ${goldAccent})`,
              boxShadow: `0 2px 4px rgba(0, 0, 0, 0.3)`,
            }}
          />

          {/* Gold Decorative Bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-2"
            style={{
              background: `linear-gradient(90deg, ${goldAccent}, ${goldAccent}cc, ${goldAccent})`,
              boxShadow: `0 -2px 4px rgba(0, 0, 0, 0.3)`,
            }}
          />

          {/* Book Title - Embossed Style */}
          <div className="absolute inset-0 flex items-center justify-center px-3 py-6">
            <div className="w-full">
              <h3 
                className="text-center transform rotate-0 select-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.95rem',
                  lineHeight: '1.3',
                  fontWeight: 700,
                  color: '#FFF8DC',
                  textShadow: `
                    1px 1px 0px rgba(0, 0, 0, 0.8),
                    -1px -1px 0px rgba(255, 255, 255, 0.1),
                    2px 2px 3px rgba(0, 0, 0, 0.5)
                  `,
                  letterSpacing: '0.5px',
                }}
              >
                {title}
              </h3>
              
              {/* Small ornamental line */}
              <div 
                className="w-12 h-0.5 mx-auto mt-2"
                style={{
                  background: goldAccent,
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                }}
              />
            </div>
          </div>

          {/* Page edges effect (right side) */}
          <div className="absolute right-0 top-3 bottom-3 w-1.5 flex flex-col gap-0.5 pr-0.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-amber-50/70"
                style={{
                  boxShadow: 'inset -1px 0 1px rgba(0, 0, 0, 0.2)',
                }}
              />
            ))}
          </div>

          {/* Leather texture overlay */}
          <div 
            className="absolute inset-0 opacity-20 rounded-r-md pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 2px,
                  rgba(0, 0, 0, 0.1) 2px,
                  rgba(0, 0, 0, 0.1) 4px
                ),
                repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 2px,
                  rgba(0, 0, 0, 0.1) 2px,
                  rgba(0, 0, 0, 0.1) 4px
                )
              `,
            }}
          />

          {/* Glow effect when hovered */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-r-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: `radial-gradient(circle at center, ${goldAccent}15, transparent)`,
              }}
            />
          )}
        </div>
      </motion.div>

      {/* Tooltip Popup */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full ml-6 top-0 z-50 w-72"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              className="rounded-lg shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FFF8DC 0%, #F5E6D3 100%)',
                border: `3px solid ${goldAccent}`,
                boxShadow: `
                  0 20px 40px rgba(0, 0, 0, 0.3),
                  0 0 0 1px rgba(212, 175, 55, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.5)
                `,
              }}
            >
              {/* Newspaper-style header */}
              <div 
                className="px-4 py-3"
                style={{
                  background: `linear-gradient(180deg, ${color}dd, ${color})`,
                  borderBottom: `2px solid ${goldAccent}`,
                }}
              >
                <h4 
                  className="text-amber-50 text-center"
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {title}
                </h4>
                <p className="text-amber-200 text-xs text-center mt-1 italic">
                  {category}
                </p>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {!isProfitable ? (
                  <>
                    <div className="flex items-center justify-between py-2 border-b border-amber-900/20">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-amber-700" />
                        <span className="text-sm text-amber-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Avg. Earnings
                        </span>
                      </div>
                      <span className="font-bold text-amber-900" style={{ fontFamily: "'Crimson Text', serif" }}>
                        {avgEarnings}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-amber-900/20">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-amber-700" />
                        <span className="text-sm text-amber-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Providers
                        </span>
                      </div>
                      <span className="font-bold text-amber-900" style={{ fontFamily: "'Crimson Text', serif" }}>
                        {providers}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-amber-700" />
                        <span className="text-sm text-amber-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Popularity
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-amber-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: `${popularity}%`,
                              background: `linear-gradient(90deg, ${goldAccent}, ${color})`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-bold text-amber-900">{popularity}%</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between py-2 border-b border-amber-900/20">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-amber-700" />
                        <span className="text-sm text-amber-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Monthly Income
                        </span>
                      </div>
                      <span className="font-bold text-amber-900" style={{ fontFamily: "'Crimson Text', serif" }}>
                        {avgEarnings}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-amber-900/20">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-green-700" />
                        <span className="text-sm text-amber-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Demand Index
                        </span>
                      </div>
                      <span className="font-bold text-green-700" style={{ fontFamily: "'Crimson Text', serif" }}>
                        {demandIndex}/100
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-emerald-700" />
                        <span className="text-sm text-amber-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Growth
                        </span>
                      </div>
                      <span className="font-bold text-emerald-700" style={{ fontFamily: "'Crimson Text', serif" }}>
                        {growth}
                      </span>
                    </div>
                  </>
                )}

                <div className="pt-2 text-center">
                  <p 
                    className="text-xs italic"
                    style={{ 
                      fontFamily: "'Crimson Text', serif",
                      color: color,
                    }}
                  >
                    Click to explore this skill →
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
