// src/components/ExperienceSection.tsx
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Award,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileCheck,
  Trophy,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

// ============================================================================
// DATA MODELS & TYPES
// ============================================================================
export interface RouteStop {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
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
  },
  {
    id: '02',
    year: 'INNOVATION',
    title: 'AI & PRODUCT BUILDER',
    organization: 'NXTWAVE × OPENAI BUILDATHON',
    description:
      'High-velocity AI experimentation and rapid prototyping. Engineered AI-powered solution prototypes, integrating advanced prompt engineering, API workflows, and collaborative execution.',
  },
  {
    id: '03',
    year: 'PROGRAMME',
    title: 'AI VALUE ENGINEERING',
    organization: 'BRAVE — BOOSTING REVENUE THROUGH AI VALUE ENGINEERING',
    description:
      'Focused on connecting artificial intelligence and automation directly to commercial business value, conversion optimization, and measurable client revenue outcomes.',
  },
  {
    id: '04',
    year: 'ACADEMIC',
    title: 'B.TECH IN COMPUTER SCIENCE (AI & ML)',
    organization: 'COMPUTER SCIENCE & ENGINEERING',
    description:
      'Specializing in Artificial Intelligence and Machine Learning. Building foundational depth across computer vision, machine learning models, data structures, and production-grade full-stack architecture.',
  },
];

// ----------------------------------------------------------------------------
// 2. VERIFIED ACHIEVEMENTS, CERTIFICATIONS & PROOF OF WORK
// (Populated with verified milestones from the codebase; ready to receive user's images/links)
// ----------------------------------------------------------------------------
export const initialAchievements: AchievementItem[] = [
  {
    id: 'ach-01',
    type: 'Hackathon',
    title: 'TOP 100 NATIONAL TEAM',
    issuer: 'MYNTRA WEFORSHE HACKERRAMP',
    date: '2026',
    image: '',
    proofUrl: '',
    description:
      'Ranked among the Top 100 nationwide teams across thousands of competitive applicants, demonstrating technical capability, algorithmic problem-solving, and rapid engineering execution.',
    featured: true,
  },
  {
    id: 'ach-02',
    type: 'Hackathon',
    title: 'AI PRODUCT BUILDER PROTOTYPE',
    issuer: 'NXTWAVE × OPENAI BUILDATHON',
    date: '2025',
    image: '',
    proofUrl: '',
    description:
      'High-velocity AI prototyping sprint delivering functional AI solution prototypes combining prompt engineering, API orchestration, and agentic workflows.',
    featured: false,
  },
  {
    id: 'ach-03',
    type: 'Program',
    title: 'AI VALUE ENGINEERING COHORT',
    issuer: 'BRAVE — REVENUE THROUGH AI VALUE ENGINEERING',
    date: '2025',
    image: '',
    proofUrl: '',
    description:
      'Selected for high-impact initiative focused on connecting artificial intelligence, LLMs, and automation pipelines directly to measurable client revenue and commercial ROI.',
    featured: false,
  },
];

type FilterCategory = 'ALL' | 'CERTIFICATES' | 'AWARDS & HACKATHONS' | 'PROGRAMS';

// ============================================================================
// MAIN EXPERIENCE SECTION COMPONENT
// ============================================================================
export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');
  const [lightboxItem, setLightboxItem] = useState<AchievementItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Filtered achievements
  const filteredAchievements = useMemo(() => {
    if (activeFilter === 'ALL') return initialAchievements;
    if (activeFilter === 'CERTIFICATES')
      return initialAchievements.filter((item) => item.type === 'Certificate');
    if (activeFilter === 'AWARDS & HACKATHONS')
      return initialAchievements.filter(
        (item) => item.type === 'Award' || item.type === 'Hackathon' || item.type === 'Competition'
      );
    if (activeFilter === 'PROGRAMS')
      return initialAchievements.filter(
        (item) => item.type === 'Program' || item.type === 'Recognition'
      );
    return initialAchievements;
  }, [activeFilter]);

  // Featured Hero Item (Top credibility proof)
  const featuredItem = useMemo(() => {
    return initialAchievements.find((item) => item.featured) || initialAchievements[0];
  }, []);

  // Lightbox navigation handlers
  const openLightbox = (item: AchievementItem) => {
    setLightboxItem(item);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
  };

  const handleNextLightbox = useCallback(() => {
    if (!lightboxItem) return;
    const currentIndex = initialAchievements.findIndex((a) => a.id === lightboxItem.id);
    const nextIndex = (currentIndex + 1) % initialAchievements.length;
    setLightboxItem(initialAchievements[nextIndex]);
  }, [lightboxItem]);

  const handlePrevLightbox = useCallback(() => {
    if (!lightboxItem) return;
    const currentIndex = initialAchievements.findIndex((a) => a.id === lightboxItem.id);
    const prevIndex =
      (currentIndex - 1 + initialAchievements.length) % initialAchievements.length;
    setLightboxItem(initialAchievements[prevIndex]);
  }, [lightboxItem]);

  // Keyboard accessibility for Lightbox (Esc, Left, Right)
  useEffect(() => {
    if (!lightboxItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNextLightbox();
      if (e.key === 'ArrowLeft') handlePrevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem, handleNextLightbox, handlePrevLightbox]);

  return (
    <section
      id="experience"
      data-scroll-type="content"
      data-scroll-section
      ref={containerRef}
      className="cinematic-section relative w-full min-h-[100svh] h-auto bg-black/60 backdrop-blur-sm text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-20 sm:py-24 lg:py-28 px-6 sm:px-12 lg:px-20 overflow-visible flex flex-col justify-center border-t border-[#D4AF37]/20 shadow-[0_-20px_50px_rgba(0,0,0,0.95)]"
    >
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46rem] h-[46rem] bg-[#D4AF37]/[0.035] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[38rem] h-[38rem] bg-[#8C6D4F]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
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
            Documenting the trajectory from foundational computer science and high-velocity hackathons to venture building at NxtAura.
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
                  
                  <span 
                    className="block text-[10px] font-medium tracking-[0.2em] uppercase text-[#8C6D4F] mb-2 text-center"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {stop.organization}
                  </span>
                  
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

        {/* ==================================================================== */}
        {/* 3. ACHIEVEMENTS & PROOF OF WORK LAYER                                 */}
        {/* ==================================================================== */}
        <div className="pt-16 border-t border-[#8C6D4F]/20 w-full flex flex-col items-center">
          
          {/* Eyebrow Subheader */}
          <div className="flex items-center space-x-3 mb-4 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4AF37]">
              PROOF OF WORK // CREDENTIALS &amp; RECOGNITION
            </span>
          </div>

          <h3
            className="text-4xl sm:text-5xl text-center uppercase tracking-tight text-white mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E8DFD8] to-[#8C6D4F]">
              VERIFIED ACHIEVEMENTS &amp; RECOGNITION
            </span>
          </h3>

          {/* Minimalist Editorial Category Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 select-none">
            {(['ALL', 'AWARDS & HACKATHONS', 'PROGRAMS', 'CERTIFICATES'] as FilterCategory[]).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 rounded-sm border text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
                    activeFilter === cat
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F7E7C4] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'border-[#8C6D4F]/30 bg-[#120F0C]/60 text-[#8C6D4F] hover:text-[#E8DFD8] hover:border-[#8C6D4F]/60'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* A. FEATURED ACHIEVEMENT MODULE (Highlighted Hero Proof)            */}
          {/* ------------------------------------------------------------------ */}
          {featuredItem && activeFilter === 'ALL' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full mb-12"
            >
              <div className="relative p-6 sm:p-8 rounded-sm border border-[#D4AF37]/40 bg-[#120F0C]/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden group">
                
                {/* Background Subtle Gradient Flare */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />

                {/* Corner Brackets Accent */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: Featured Visual / Preview Frame */}
                  <div
                    onClick={() => openLightbox(featuredItem)}
                    className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[4/3] rounded-sm overflow-hidden bg-black/80 border border-[#8C6D4F]/40 cursor-pointer flex items-center justify-center group/card"
                  >
                    {featuredItem.image ? (
                      <img
                        src={featuredItem.image}
                        alt={`Proof for ${featuredItem.title} - ${featuredItem.issuer}`}
                        className="w-full h-full object-contain p-3 group-hover/card:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      // High-end Architectural Placeholder while user provides image
                      <div className="w-full h-full p-6 flex flex-col justify-between items-center text-center bg-gradient-to-br from-[#1A1410] via-[#0E0C0A] to-black">
                        <div className="w-full flex justify-between items-center text-[9px] font-mono text-[#D4AF37]">
                          <span>FEATURED PROOF</span>
                          <span>{featuredItem.date}</span>
                        </div>
                        <div className="flex flex-col items-center my-auto">
                          <Trophy className="w-10 h-10 text-[#D4AF37] mb-2 drop-shadow-[0_0_10px_#D4AF37]" />
                          <span className="text-xs font-mono tracking-widest text-[#E8DFD8]">
                            {featuredItem.issuer}
                          </span>
                        </div>
                        <div className="inline-flex items-center space-x-1.5 text-[9px] font-mono tracking-widest text-[#8C6D4F] group-hover/card:text-[#D4AF37] transition-colors">
                          <Maximize2 className="w-3 h-3" />
                          <span>CLICK TO INSPECT FULL PROOF</span>
                        </div>
                      </div>
                    )}

                    {/* Hover Glow Mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                  </div>

                  {/* Right: Featured Narrative & Metadata */}
                  <div className="lg:col-span-7 flex flex-col justify-center text-left">
                    <div className="flex items-center space-x-2.5 mb-2">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-sm bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[9.5px] font-mono tracking-widest text-[#D4AF37] uppercase">
                        <Sparkles className="w-3 h-3 mr-1" />
                        FEATURED // {featuredItem.type}
                      </span>
                      {featuredItem.date && (
                        <span className="text-[10px] font-mono text-[#8C6D4F]">
                          // {featuredItem.date}
                        </span>
                      )}
                    </div>

                    <h4
                      className="text-3xl sm:text-4xl text-white tracking-wide uppercase mb-1 leading-tight group-hover:text-[#F7E7C4] transition-colors"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {featuredItem.title}
                    </h4>

                    <span
                      className="text-xs font-mono tracking-widest uppercase text-[#D4AF37] mb-3 block"
                    >
                      {featuredItem.issuer}
                    </span>

                    <p
                      className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-relaxed mb-6"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {featuredItem.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => openLightbox(featuredItem)}
                        className="inline-flex items-center space-x-2 px-4 py-2 border border-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-white hover:text-black text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>INSPECT CREDENTIAL</span>
                      </button>

                      {featuredItem.proofUrl && (
                        <a
                          href={featuredItem.proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 px-3 py-2 text-[#D4AF37] hover:text-[#FFF2D6] text-xs font-mono tracking-wider transition-colors"
                        >
                          <span>VERIFY PROOF</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------------------------ */}
          {/* B. CURATED ACHIEVEMENTS GRID (Supporting Proof Items)              */}
          {/* ------------------------------------------------------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredAchievements.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                onClick={() => openLightbox(item)}
                className="group relative p-5 rounded-sm border border-[#8C6D4F]/30 hover:border-[#D4AF37] bg-[#120F0C]/80 backdrop-blur-md transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.85)] cursor-pointer flex flex-col justify-between"
              >
                {/* Top: Card Header & Type Badge */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase">
                      {item.type === 'Award' || item.type === 'Hackathon' ? (
                        <Trophy className="w-2.5 h-2.5 mr-1 text-[#D4AF37]" />
                      ) : (
                        <FileCheck className="w-2.5 h-2.5 mr-1 text-[#D4AF37]" />
                      )}
                      {item.type}
                    </span>

                    {item.date && (
                      <span className="text-[10px] font-mono text-[#8C6D4F] tracking-wider">
                        {item.date}
                      </span>
                    )}
                  </div>

                  {/* Card Visual / Thumbnail Preview */}
                  <div className="w-full aspect-[16/10] bg-black/60 rounded-sm mb-4 border border-white/5 overflow-hidden flex items-center justify-center relative group-hover:border-[#D4AF37]/40 transition-colors">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={`Certificate for ${item.title} issued by ${item.issuer}`}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-[#14100D] to-black">
                        <Award className="w-8 h-8 text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors mb-2" />
                        <span className="text-[10px] font-mono text-[#C4B7AA] uppercase tracking-wider">
                          {item.issuer}
                        </span>
                      </div>
                    )}

                    {/* Quick Inspect Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-mono text-[#F7E7C4] tracking-widest uppercase inline-flex items-center space-x-1 bg-[#120F0C]/90 px-2.5 py-1 rounded-sm border border-[#D4AF37]/50">
                        <Maximize2 className="w-3 h-3 mr-1 text-[#D4AF37]" />
                        VIEW PROOF
                      </span>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <h5
                    className="text-2xl text-white group-hover:text-[#F7E7C4] uppercase tracking-wide leading-tight mb-1 transition-colors"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {item.title}
                  </h5>

                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#8C6D4F] block mb-2">
                    {item.issuer}
                  </span>

                  {item.description && (
                    <p
                      className="text-xs text-[#A8988B] font-light leading-relaxed mb-4 line-clamp-3"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono tracking-wider text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors">
                  <span>INSPECT PROOF</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* 4. FULLSCREEN / LIGHTBOX CERTIFICATE VIEWER MODAL                    */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 select-none"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Proof viewer for ${lightboxItem.title}`}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#120F0C] border border-[#D4AF37]/50 rounded-sm shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Top Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#8C6D4F]/30 bg-[#0E0C0A]">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                    {lightboxItem.type} // {lightboxItem.issuer}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Prev / Next controls */}
                  <button
                    onClick={handlePrevLightbox}
                    className="p-1.5 rounded hover:bg-white/10 text-[#C4B7AA] hover:text-white transition-colors"
                    title="Previous (Left Arrow)"
                    aria-label="Previous proof"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextLightbox}
                    className="p-1.5 rounded hover:bg-white/10 text-[#C4B7AA] hover:text-white transition-colors"
                    title="Next (Right Arrow)"
                    aria-label="Next proof"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {/* Close button */}
                  <button
                    onClick={closeLightbox}
                    className="p-1.5 rounded hover:bg-white/10 text-[#C4B7AA] hover:text-white transition-colors ml-2"
                    title="Close (Esc)"
                    aria-label="Close proof viewer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Modal Image Area */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col items-center justify-center bg-black/70 min-h-[320px]">
                {lightboxItem.image ? (
                  <div className="w-full flex items-center justify-center max-h-[55vh]">
                    <img
                      src={lightboxItem.image}
                      alt={`Full Certificate for ${lightboxItem.title} - ${lightboxItem.issuer}`}
                      className="max-h-[55vh] w-auto max-w-full object-contain rounded-sm border border-white/10 shadow-2xl"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-lg aspect-[16/10] rounded-sm border border-[#8C6D4F]/40 bg-gradient-to-b from-[#18120E] to-black p-8 flex flex-col items-center justify-center text-center shadow-inner">
                    <Trophy className="w-16 h-16 text-[#D4AF37] mb-4 drop-shadow-[0_0_15px_#D4AF37]" />
                    <h3
                      className="text-3xl text-white uppercase tracking-wider mb-2"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {lightboxItem.title}
                    </h3>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
                      {lightboxItem.issuer}
                    </span>
                    <span className="text-[11px] font-mono text-[#8C6D4F]">
                      {lightboxItem.date ? `Year / Date: ${lightboxItem.date}` : 'Verified Credential'}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Modal Metadata & CTAs */}
              <div className="p-6 bg-[#0E0C0A] border-t border-[#8C6D4F]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="max-w-xl text-left">
                  <h4
                    className="text-2xl text-white uppercase tracking-wide leading-tight mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {lightboxItem.title}
                  </h4>
                  <p
                    className="text-xs text-[#A8988B] font-light leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {lightboxItem.description}
                  </p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  {lightboxItem.proofUrl ? (
                    <a
                      href={lightboxItem.proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-5 py-2.5 border border-[#D4AF37] bg-[#D4AF37] hover:bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    >
                      <span>VERIFY PROOF</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 text-[10px] font-mono text-[#8C6D4F] uppercase">
                      <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                      <span>OFFICIALLY REGISTERED</span>
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceSection;