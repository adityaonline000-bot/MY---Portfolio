import React from 'react';
import { motion } from 'framer-motion';
import { useSectionScroll } from './SectionScrollController';

export const SectionScrollIndicator: React.FC = () => {
  const { activeSectionIndex, goToSection, sectionMetas } = useSectionScroll();

  return (
    <aside
      aria-label="Section navigation rail"
      className="fixed right-5 lg:right-7 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none pointer-events-auto"
    >
      {/* Background track line */}
      <div className="absolute top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-[#8C6D4F]/25 to-transparent -z-10" />

      {/* Section Node Items */}
      <div className="flex flex-col items-center space-y-4">
        {sectionMetas.map((section, idx) => {
          const isActive = activeSectionIndex === idx;

          return (
            <button
              key={section.id}
              onClick={() => goToSection(idx)}
              aria-label={`Jump to section ${section.number}: ${section.label}`}
              className="group relative flex items-center justify-end py-1 px-1 focus:outline-none"
            >
              {/* Luxury Hover/Active Tooltip */}
              <span
                className={`absolute right-7 px-2.5 py-0.5 rounded-sm bg-[#120F0C]/90 border border-[#8C6D4F]/30 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase pointer-events-none transition-all duration-300 whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.8)] ${
                  isActive
                    ? 'text-[#F7E7C4] opacity-100 translate-x-0'
                    : 'text-[#8C6D4F] opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {section.number} // {section.label}
              </span>

              {/* Node Indicator */}
              <div className="relative flex items-center justify-center">
                {/* Glowing ring when active */}
                {isActive && (
                  <motion.div
                    layoutId="active-section-glow"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    className="absolute -inset-1.5 rounded-full bg-[#D4AF37]/20 blur-[3px]"
                  />
                )}

                {/* Node Pill / Dot */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.25 : 1,
                    height: isActive ? 18 : 6,
                    width: isActive ? 3 : 3,
                    backgroundColor: isActive ? '#D4AF37' : '#8C6D4F',
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.3 }}
                  className="rounded-full shadow-[0_0_8px_rgba(212,175,55,0.4)] transition-all group-hover:opacity-90 group-hover:bg-[#F7E7C4]"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Ultra-minimal bottom numeric indicator */}
      <div className="mt-5 flex flex-col items-center text-[9px] font-mono tracking-widest text-[#8C6D4F]/70">
        <span className="text-[#D4AF37] font-semibold">
          {sectionMetas[activeSectionIndex]?.number ?? '01'}
        </span>
        <div className="w-2.5 h-[1px] bg-[#8C6D4F]/30 my-0.5" />
        <span>{sectionMetas[sectionMetas.length - 1]?.number ?? '07'}</span>
      </div>
    </aside>
  );
};

export default SectionScrollIndicator;
