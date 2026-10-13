// src/components/ExperienceSection.tsx
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ExternalLink,
  Compass,
} from 'lucide-react';
import type { CarouselItem } from './FlexCarousel';
import { ACHIEVEMENTS, type Achievement } from '../data/achievements';

const FlexCarousel = lazy(() => import('./FlexCarousel'));

// ============================================================================
// DATA MODELS & TYPES
// ============================================================================
export interface RouteStop {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  link?: string;
  linkText?: string;
}

export type AchievementType =
  | 'Certificate'
  | 'Award'
  | 'Hackathon'
  | 'Program'
  | 'Competition'
  | 'Recognition';

export interface AchievementItem {
  id: string;
  type: AchievementType;
  title: string;
  issuer: string;
  date?: string;
  image?: string;
  proofUrl?: string;
  description?: string;
  featured?: boolean;
}

// ----------------------------------------------------------------------------
// 1. VERIFIED PROFESSIONAL & BUILDER JOURNEY
// ----------------------------------------------------------------------------
const journey: RouteStop[] = [
  {
    id: '01',
    year: 'FOUNDER',
    title: 'FOUNDER & TECHNOLOGY BUILDER',
    organization: 'NXTAURA',
    description:
      'Building NxtAura into a technology venture across AI solutions, full-stack development, SaaS, and automation. Crossed ₹2L+ in revenue across 4+ client engagements with a 5-member multidisciplinary team.',
    link: 'https://www.instagram.com/nxtaura_innovations/',
    linkText: '@nxtaura_innovations',
  },
  {
    id: '02',
    year: 'CREATOR',
    title: 'TECH CREATOR & VISUAL STORYTELLER',
    organization: '@ADITYAKVIDEOS_ • YOUTUBE & INSTAGRAM',
    description:
      'Creating high-impact engineering tutorials, computer vision breakdowns, and founder dev vlogs under @adityakvideos_. Documenting the journey of building NxtAura in public, sharing real-world AI pipelines, and growing an engaged developer community.',
    link: 'https://www.instagram.com/adityakvideos_/',
    linkText: '@adityakvideos_',
  },
  {
    id: '03',
    year: 'INNOVATION',
    title: 'AI & PRODUCT BUILDER',
    organization: 'NXTWAVE × OPENAI BUILDATHON',
    description:
      'High-velocity AI experimentation and rapid prototyping. Engineered AI-powered solution prototypes, integrating advanced prompt engineering, API workflows, and collaborative execution.',
  },
  {
    id: '04',
    year: 'PROGRAMME',
    title: 'AI VALUE ENGINEERING',
    organization: 'BRAVE — BOOSTING REVENUE THROUGH AI VALUE ENGINEERING',
    description:
      'Focused on connecting artificial intelligence and automation directly to commercial business value, conversion optimization, and measurable client revenue outcomes.',
  },
  {
    id: '05',
    year: 'ACADEMIC',
    title: 'B.TECH IN COMPUTER SCIENCE (AI & ML)',
    organization: 'COMPUTER SCIENCE & ENGINEERING',
    description:
      'Specializing in Artificial Intelligence and Machine Learning. Building foundational depth across computer vision, machine learning models, data structures, and production-grade full-stack architecture.',
  },
];

// ----------------------------------------------------------------------------
// 2. VERIFIED ACHIEVEMENTS, CERTIFICATIONS & PROOF OF WORK CAROUSEL ITEMS
// (Directly connected to the single source of truth in src/data/achievements.ts)
// ----------------------------------------------------------------------------
export const initialAchievements: Achievement[] = ACHIEVEMENTS;

// Include ALL achievements — items without `image` will render the auto-generated
// credential card design via createCredentialCardCanvas inside FlexCarousel.
export const achievementCarouselItems: CarouselItem[] = ACHIEVEMENTS
  .map((item) => ({
    src: item.image ?? '',          // '' triggers canvas fallback — intentional
    alt: `${item.title} - ${item.organization}`,
    title: item.title,
    subtitle: item.date ? `${item.organization} // ${item.date}` : item.organization,
    link: item.link,
    category: item.category,
    date: item.date,
  }));

type CarouselPresetType = 'liquid' | 'ribbon' | 'vortex' | 'arch';

// ============================================================================
// MAIN EXPERIENCE SECTION COMPONENT
// ============================================================================
export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselStageRef = useRef<HTMLDivElement>(null);
  const [activePreset, setActivePreset] = useState<CarouselPresetType>('liquid');
  const [shouldLoadCarousel, setShouldLoadCarousel] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const presets: { id: CarouselPresetType; label: string }[] = [
    { id: 'liquid', label: 'LIQUID LENS' },
    { id: 'ribbon', label: 'SILK RIBBON' },
    { id: 'vortex', label: 'WARP VORTEX' },
    { id: 'arch', label: 'ARCHWAY' },
  ];

  useEffect(() => {
    const stage = carouselStageRef.current;
    if (!stage) return;
    if (!('IntersectionObserver' in window)) {
      setShouldLoadCarousel(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadCarousel(true);
        observer.disconnect();
      },
      { rootMargin: '500px 0px' }
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      data-scroll-type="content"
      data-scroll-section
      ref={containerRef}
      className="cinematic-section relative w-full min-h-[100svh] h-auto bg-black/60 backdrop-blur-sm text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-20 sm:py-24 lg:py-28 overflow-visible flex flex-col justify-center border-t border-[#D4AF37]/20 shadow-[0_-20px_50px_rgba(0,0,0,0.95)]"
    >
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46rem] h-[46rem] bg-[#D4AF37]/[0.035] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[38rem] h-[38rem] bg-[#8C6D4F]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* 1 & 2: Main Header and Builder Timeline */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-12 lg:px-20 relative z-10">
        
        {/* ==================================================================== */}
        {/* 1. SECTION HEADER (Consistent with global portfolio layout)          */}
        {/* ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center space-x-4 mb-6 text-center mx-auto"
        >
          <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8C6D4F]/40 to-[#D4AF37]/80" />
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            04 / EXPERIENCE &amp; MILESTONES
          </span>
          <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16 max-w-4xl mx-auto"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none mb-4 text-center"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              BUILT THROUGH EXPERIENCE.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              PROVEN THROUGH ACTION.
            </span>
          </h2>
          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-xl leading-relaxed text-center mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Documenting the trajectory from foundational computer science, technical content creation, and high-velocity hackathons to venture building at NxtAura.
          </p>
        </motion.div>

        {/* ==================================================================== */}
        {/* 2. THE BUILDER JOURNEY (Vertical Timeline)                           */}
        {/* ==================================================================== */}
        <div className="relative w-full max-w-4xl mx-auto mb-24">
          
          {/* Background Track Line */}
          <div className="absolute left-[19px] md:left-[140px] top-4 bottom-8 w-[1px] bg-[#8C6D4F]/20" />
          
          {/* Animated Gold Glowing Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[19px] md:left-[140px] top-4 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#C99E5D] to-[#8C6D4F]/10 shadow-[0_0_10px_#D4AF37] origin-top"
          />

          <div className="space-y-12">
            {journey.map((stop, idx) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className="relative flex flex-col md:flex-row items-start group"
              >
                {/* Desktop Year / Category (Left of track) */}
                <div className="hidden md:block w-[140px] shrink-0 pr-8 pt-0.5 text-right">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors">
                    {stop.year}
                  </span>
                </div>

                {/* Route Node */}
                <div className="absolute left-[19px] md:left-[140px] top-1.5 -translate-x-1/2 flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 group-hover:scale-150 transition-all duration-700 ease-out" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#120F0C] border border-[#8C6D4F] group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_12px_#D4AF37] transition-colors duration-300" />
                </div>

                {/* Content (Right side of track) */}
                <div className="ml-14 md:ml-12 pl-2 flex-1 flex flex-col items-center text-center">
                  {/* Mobile Year Badge */}
                  <div className="md:hidden mb-1.5 text-center">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37]">
                      {stop.year}
                    </span>
                  </div>

                  <h3
                    className="text-3xl sm:text-4xl tracking-wide text-white group-hover:text-[#F7E7C4] transition-colors mb-1 leading-none text-center"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {stop.title}
                  </h3>
                  
                  {stop.link ? (
                    <a 
                      href={stop.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-[10px] font-medium tracking-[0.2em] uppercase text-[#8C6D4F] hover:text-[#D4AF37] transition-colors mb-2 text-center group-hover:text-[#D4AF37]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <span>{stop.organization}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70 group-hover:opacity-100" />
                    </a>
                  ) : (
                    <span 
                      className="block text-[10px] font-medium tracking-[0.2em] uppercase text-[#8C6D4F] mb-2 text-center"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {stop.organization}
                    </span>
                  )}
                  
                  <p 
                    className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-[1.7] max-w-lg mx-auto group-hover:text-[#D5CBC0] transition-colors text-center"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {stop.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. VERIFIED ACHIEVEMENTS & RECOGNITION (Full-Bleed Stage)             */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-12 lg:px-20 pt-16 border-t border-[#8C6D4F]/20 flex flex-col items-center relative z-10">
        
        {/* Eyebrow Subheader */}
        <div className="flex items-center space-x-3 mb-4 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4AF37]">
            PROOF OF WORK // CREDENTIALS &amp; RECOGNITION
          </span>
        </div>

        <h3
          className="text-4xl sm:text-5xl text-center uppercase tracking-tight text-white mb-3"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E8DFD8] to-[#8C6D4F]">
            VERIFIED ACHIEVEMENTS &amp; RECOGNITION
          </span>
        </h3>

        <p
          className="text-xs sm:text-[13px] font-light text-[#A8988B] max-w-lg text-center mx-auto mb-8 leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Interactive liquid WebGL lens showcasing validated hackathons, AI cohorts, and venture contracts. Drag to flex the glass, or tap any card to open and zoom.
        </p>

        {/* Minimal Interactive Preset Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 select-none">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setActivePreset(preset.id)}
              className={`px-3.5 py-1.5 min-h-[40px] flex items-center justify-center rounded-sm border text-[10px] font-mono tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer ${
                activePreset === preset.id
                  ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F7E7C4] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'border-[#8C6D4F]/30 bg-[#120F0C]/60 text-[#8C6D4F] hover:text-[#E8DFD8] hover:border-[#8C6D4F]/60'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* FULL-BLEED SEAMLESS CONTINUOUS CAROUSEL STAGE (NO OUTER BORDER)      */}
      {/* ==================================================================== */}
      <div
        ref={carouselStageRef}
        className="w-full max-w-none relative min-h-[520px] h-[clamp(540px,64vh,760px)] overflow-hidden select-none z-10 my-2"
      >
        {shouldLoadCarousel ? (
          <Suspense
            fallback={
              <div className="h-full w-full" role="status" aria-label="Loading achievements carousel" />
            }
          >
            <FlexCarousel
              items={achievementCarouselItems}
              preset={activePreset}
              intro="rise"
              cardHeight={0.48}
              gap={20}
              radius={8}
              squeeze={0.2}
              focusOnClick={true}
              captions={true}
              autoplay={true}
              interval={3.5}
              captureWheel={false}
              fit="landscape"
            />
          </Suspense>
        ) : (
          <div className="h-full w-full" aria-hidden="true" />
        )}

        {/* Subtle Interactive Instruction Tooltip at bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 px-3 py-1 bg-black/60 border border-[#8C6D4F]/20 rounded-full backdrop-blur-md pointer-events-none text-[9.5px] font-mono text-[#C4B7AA] tracking-wider uppercase z-20 max-w-[92vw] text-center">
          <Compass className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
          <span className="truncate">DRAG / SWIPE TO FLEX • CLICK / TAP TO ZOOM</span>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;