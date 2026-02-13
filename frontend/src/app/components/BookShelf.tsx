import { ReactNode } from "react";

interface BookShelfProps {
  title: string;
  children: ReactNode;
}

export default function BookShelf({ title, children }: BookShelfProps) {
  return (
    <section className="mb-20">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-serif text-amber-900 mb-8 text-center tracking-wide relative">
        <span className="relative z-10">{title}</span>
        <div className="absolute inset-x-0 bottom-1 h-2 bg-amber-200/50 rounded-full blur-sm" />
      </h2>

      {/* Shelf Wrapper */}
      <div className="relative w-full">

        {/* Books Container */}
        <div
          className="
            flex gap-6 
            justify-center items-end 
            px-6 pb-6 
            overflow-x-auto
            scrollbar-thin scrollbar-thumb-amber-700/40
          "
        >
          {children}
        </div>

        {/* Main Shelf Wood */}
        <div
          className="
            relative h-6 
            bg-gradient-to-b 
            from-amber-800 
            via-amber-900 
            to-amber-950 
            rounded-sm 
            shadow-2xl
          "
        />

        {/* Depth Shadow */}
        <div className="h-2 bg-gradient-to-b from-black/40 to-transparent opacity-40" />

        {/* Decorative Brackets */}
        <div className="absolute -bottom-2 left-6 w-12 h-6 border-l-4 border-b-4 border-amber-900/50 rounded-bl-lg" />
        <div className="absolute -bottom-2 right-6 w-12 h-6 border-r-4 border-b-4 border-amber-900/50 rounded-br-lg" />
      </div>
    </section>
  );
}
