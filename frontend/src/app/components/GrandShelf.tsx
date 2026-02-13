import { ReactNode } from 'react';

interface GrandShelfProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function GrandShelf({ title, subtitle, children }: GrandShelfProps) {
  return (
    <div className="mb-20">
      {/* Shelf Title - Engraved Gold Style */}
      <div className="text-center mb-10">
        <h2 
          className="relative inline-block"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#D4AF37',
            textShadow: `
              2px 2px 0px #8B4513,
              -1px -1px 0px rgba(255, 215, 0, 0.3),
              3px 3px 6px rgba(0, 0, 0, 0.5)
            `,
            letterSpacing: '3px',
          }}
        >
          {title}
          
          {/* Decorative underline */}
          <div 
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3/4 h-1"
            style={{
              background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          />
          
          {/* Ornamental corners */}
          <div className="absolute -top-2 -left-4 text-2xl" style={{ color: '#D4AF37' }}>❧</div>
          <div className="absolute -top-2 -right-4 text-2xl" style={{ color: '#D4AF37' }}>❧</div>
        </h2>
        
        {subtitle && (
          <p 
            className="mt-6 text-amber-700 italic"
            style={{
              fontFamily: "'Crimson Text', serif",
              fontSize: '1.1rem',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Shelf Structure */}
      <div className="relative">
        {/* Books Display Area */}
        <div className="flex gap-6 justify-center items-end px-8 pb-6 min-h-[240px]">
          {children}
        </div>

        {/* Main Shelf Board */}
        <div 
          className="relative h-6 rounded-sm overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #5D4037 0%, #4E342E 50%, #3E2723 100%)',
            boxShadow: `
              0 4px 8px rgba(0, 0, 0, 0.4),
              inset 0 2px 0 rgba(255, 255, 255, 0.1),
              inset 0 -2px 4px rgba(0, 0, 0, 0.3)
            `,
            border: '1px solid #6D4C41',
          }}
        >
          {/* Wood grain texture */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 10px,
                  rgba(0, 0, 0, 0.1) 10px,
                  rgba(0, 0, 0, 0.1) 11px
                )
              `,
            }}
          />
          
          {/* Gold trim on edge */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{
              background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            }}
          />
        </div>

        {/* Shelf Shadow */}
        <div 
          className="h-2"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3), transparent)',
          }}
        />

        {/* Decorative Brackets */}
        <div className="absolute -bottom-1 left-8 w-16 h-8">
          <div 
            className="w-full h-full rounded-bl-xl"
            style={{
              border: '3px solid #6D4C41',
              borderTop: 'none',
              borderRight: 'none',
              boxShadow: 'inset -2px -2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div 
              className="absolute top-0 left-0 w-2 h-2 rounded-full"
              style={{
                background: '#D4AF37',
                boxShadow: '0 0 4px rgba(212, 175, 55, 0.6)',
              }}
            />
          </div>
        </div>

        <div className="absolute -bottom-1 right-8 w-16 h-8">
          <div 
            className="w-full h-full rounded-br-xl"
            style={{
              border: '3px solid #6D4C41',
              borderTop: 'none',
              borderLeft: 'none',
              boxShadow: 'inset 2px -2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div 
              className="absolute top-0 right-0 w-2 h-2 rounded-full"
              style={{
                background: '#D4AF37',
                boxShadow: '0 0 4px rgba(212, 175, 55, 0.6)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
