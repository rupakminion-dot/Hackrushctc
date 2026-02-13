import { ReactNode } from "react";

interface GrandShelfProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function GrandShelf({
  title,
  subtitle,
  children,
}: GrandShelfProps) {
  return (
    <section className="mb-24">

      {/* Title Block */}
      <div className="text-center mb-12 relative">
        <h2
          className="
            relative inline-block
            font-serif font-extrabold
            text-3xl md:text-4xl
            tracking-widest
            text-[#D4AF37]
          "
          style={{
            textShadow: `
              2px 2px 0px #8B4513,
              -1px -1px 0px rgba(255, 215, 0, 0.3),
              3px 3px 6px rgba(0, 0, 0, 0.5)
            `,
          }}
        >
          {title}

          {/* Ornamental Corners */}
          <span className="absolute -top-3 -left-6 text-xl text-[#D4AF37]">
            ❧
          </span>
          <span className="absolute -top-3 -right-6 text-xl text-[#D4AF37]">
            ❧
          </span>

          {/* Gold underline */}
          <span
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-1 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #D4AF37, transparent)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          />
        </h2>

        {subtitle && (
          <p className="mt-6 text-amber-700 italic text-sm md:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {/* Shelf Structure */}
      <div className="relative w-full">

        {/* Books Area */}
        <div className="flex gap-8 justify-center items-end px-6 pb-8 min-h-[260px] overflow-x-auto">
          {children}
        </div>

        {/* Main Shelf Board */}
        <div
          className="
            relative h-6 rounded-sm
            border border-[#6D4C41]
            shadow-2xl
          "
          style={{
            background:
              "linear-gradient(180deg, #5D4037 0%, #4E342E 50%, #3E2723 100%)",
          }}
        >
          {/* Wood Grain */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 9px)",
            }}
          />

          {/* Gold Trim */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, #D4AF37, transparent)",
            }}
          />
        </div>

        {/* Shadow Depth */}
        <div className="h-3 bg-gradient-to-b from-black/30 to-transparent" />

        {/* Decorative Brackets */}
        <Bracket position="left" />
        <Bracket position="right" />
      </div>
    </section>
  );
}

/* Decorative Bracket Component */
function Bracket({ position }: { position: "left" | "right" }) {
  const isLeft = position === "left";

  return (
    <div
      className={`absolute -bottom-2 ${
        isLeft ? "left-8" : "right-8"
      } w-16 h-8`}
    >
      <div
        className={`w-full h-full ${
          isLeft ? "rounded-bl-xl" : "rounded-br-xl"
        }`}
        style={{
          border: "3px solid #6D4C41",
          borderTop: "none",
          ...(isLeft
            ? { borderRight: "none" }
            : { borderLeft: "none" }),
          boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.3)",
        }}
      >
        <div
          className={`absolute top-0 ${
            isLeft ? "left-0" : "right-0"
          } w-2 h-2 rounded-full`}
          style={{
            background: "#D4AF37",
            boxShadow: "0 0 6px rgba(212,175,55,0.7)",
          }}
        />
      </div>
    </div>
  );
}
