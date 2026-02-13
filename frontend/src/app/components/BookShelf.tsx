import { ReactNode } from 'react';

interface BookShelfProps {
  title: string;
  children: ReactNode;
}

export function BookShelf({ title, children }: BookShelfProps) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-serif text-amber-900 mb-6 text-center tracking-wide">
        {title}
      </h2>
      <div className="relative">
        {/* Books container */}
        <div className="flex gap-4 justify-center items-end px-8 pb-4">
          {children}
        </div>
        {/* Shelf */}
        <div className="h-4 bg-gradient-to-b from-amber-800 to-amber-900 rounded-sm shadow-lg" />
        {/* Shelf edge shadow */}
        <div className="h-1 bg-gradient-to-b from-amber-950 to-transparent opacity-50" />
        {/* Decorative brackets */}
        <div className="absolute -bottom-2 left-4 w-12 h-6 border-l-4 border-b-4 border-amber-900/40 rounded-bl-lg" />
        <div className="absolute -bottom-2 right-4 w-12 h-6 border-r-4 border-b-4 border-amber-900/40 rounded-br-lg" />
      </div>
    </div>
  );
}
