"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  Sparkles,
  Video,
  Terminal,
  Layers,
  BookOpen,
  Volume2,
  VolumeX,
  Shuffle,
  Activity,
} from 'lucide-react';

export interface ColorProfile {
  id: string;
  name: string;
  hue: string;
  secondaryHue: string;
  freq: number;
  gradient: string;
  fluidConic: string;
  glowShadow: string;
}

export const COLOR_PALETTES: ColorProfile[] = [
  {
    id: "cyan",
    name: "Cyan Caustic",
    hue: "#00F2FE",
    secondaryHue: "#4FACFE",
    freq: 520,
    gradient: "linear-gradient(135deg, rgba(0, 242, 254, 0.3) 0%, rgba(79, 172, 254, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #00F2FE 90deg, #4FACFE 180deg, transparent 270deg, #00F2FE 360deg)",
    glowShadow: "rgba(0, 242, 254, 0.5)"
  },
  {
    id: "fuchsia",
    name: "Fuchsia Pulse",
    hue: "#FF007F",
    secondaryHue: "#7928CA",
    freq: 660,
    gradient: "linear-gradient(135deg, rgba(255, 0, 127, 0.3) 0%, rgba(121, 40, 202, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #FF007F 90deg, #7928CA 180deg, transparent 270deg, #FF007F 360deg)",
    glowShadow: "rgba(255, 0, 127, 0.5)"
  },
  {
    id: "emerald",
    name: "Acid Emerald",
    hue: "#00FFA3",
    secondaryHue: "#00B894",
    freq: 780,
    gradient: "linear-gradient(135deg, rgba(0, 255, 163, 0.3) 0%, rgba(0, 184, 148, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #00FFA3 90deg, #00B894 180deg, transparent 270deg, #00FFA3 360deg)",
    glowShadow: "rgba(0, 255, 163, 0.5)"
  },
  {
    id: "plasma",
    name: "Solar Plasma",
    hue: "#FF8A00",
    secondaryHue: "#FF0055",
    freq: 880,
    gradient: "linear-gradient(135deg, rgba(255, 138, 0, 0.3) 0%, rgba(255, 0, 85, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #FF8A00 90deg, #FF0055 180deg, transparent 270deg, #FF8A00 360deg)",
    glowShadow: "rgba(255, 138, 0, 0.5)"
  },
  {
    id: "violet",
    name: "Hyper Violet",
    hue: "#8B5CF6",
    secondaryHue: "#EC4899",
    freq: 980,
    gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #8B5CF6 90deg, #EC4899 180deg, transparent 270deg, #8B5CF6 360deg)",
    glowShadow: "rgba(139, 92, 246, 0.5)"
  },
  {
    id: "amber",
    name: "Radiant Gold",
    hue: "#FFD700",
    secondaryHue: "#FF6A00",
    freq: 1100,
    gradient: "linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 106, 0, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #FFD700 90deg, #FF6A00 180deg, transparent 270deg, #FFD700 360deg)",
    glowShadow: "rgba(255, 215, 0, 0.5)"
  },
  {
    id: "electric-blue",
    name: "Electric Azure",
    hue: "#0066FF",
    secondaryHue: "#00F2FE",
    freq: 580,
    gradient: "linear-gradient(135deg, rgba(0, 102, 255, 0.3) 0%, rgba(0, 242, 254, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #0066FF 90deg, #00F2FE 180deg, transparent 270deg, #0066FF 360deg)",
    glowShadow: "rgba(0, 102, 255, 0.5)"
  },
  {
    id: "crimson",
    name: "Neon Crimson",
    hue: "#FF2A6D",
    secondaryHue: "#05D9E8",
    freq: 720,
    gradient: "linear-gradient(135deg, rgba(255, 42, 109, 0.3) 0%, rgba(5, 217, 232, 0.05) 100%)",
    fluidConic: "conic-gradient(from 0deg, transparent 0deg, #FF2A6D 90deg, #05D9E8 180deg, transparent 270deg, #FF2A6D 360deg)",
    glowShadow: "rgba(255, 42, 109, 0.5)"
  }
];

interface ContentPillar {
  id: number;
  number: string;
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  metrics: { label: string; value: string };
  defaultPaletteIndex: number;
}

const contentPillars: ContentPillar[] = [
  {
    id: 1,
    number: '01',
    category: 'AI & VISION DEEP DIVES',
    title: 'Computer Vision & Deepfake Telemetry',
    description:
      'In-depth engineering tutorials unpacking real-time active liveness verification, facial geometry with MediaPipe, and neural model optimization for client deployment.',
    icon: <Video className="w-5 h-5 text-current" />,
    tags: ['OpenCV', 'MediaPipe', 'FastAPI', 'Neural Models'],
    metrics: { label: 'TOPIC FOCUS', value: 'Applied AI Pipelines' },
    defaultPaletteIndex: 0, // Cyan Caustic
  },
  {
    id: 2,
    number: '02',
    category: 'SYSTEM DESIGN & CODE PATTERNS',
    title: 'Full-Stack Architecture Blueprints',
    description:
      'Step-by-step breakdowns of scalable full-stack applications, resilient REST/GraphQL APIs, microservice patterns, and high-performance React/Next.js architectures.',
    icon: <Terminal className="w-5 h-5 text-current" />,
    tags: ['React', 'Node.js', 'System Architecture', 'Clean Code'],
    metrics: { label: 'BLUEPRINTS', value: 'Production Systems' },
    defaultPaletteIndex: 4, // Hyper Violet
  },
  {
    id: 3,
    number: '03',
    category: 'STARTUP & BUILD IN PUBLIC',
    title: 'Founder Dev Vlogs & Client Workflows',
    description:
      'Documenting the raw realities of tech entrepreneurship: negotiating enterprise client contracts, scoping deliverables, pricing systems, and bootstrapping NxtAura.',
    icon: <Layers className="w-5 h-5 text-current" />,
    tags: ['NxtAura', 'Build In Public', 'Client Contracts', 'Roadmap'],
    metrics: { label: 'DELIVERED', value: 'Real Client Stories' },
    defaultPaletteIndex: 5, // Radiant Gold
  },
  {
    id: 4,
    number: '04',
    category: 'DEVELOPER TOOLING & AUTOMATION',
    title: 'Autonomous Workflows & Open-Source',
    description:
      'Hands-on guides to integrating n8n automations, custom AI agents, CI/CD pipelines, and open-source boilerplates designed to eliminate repetitive engineering toil.',
    icon: <BookOpen className="w-5 h-5 text-current" />,
    tags: ['n8n', 'Agentic AI', 'Git Workflows', 'Automation'],
    metrics: { label: 'COMMUNITY', value: 'Open Source Guides' },
    defaultPaletteIndex: 2, // Acid Emerald
  },
];


export const ContentCreationSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // States from fluid cascade widget architecture
  const [colorIndices, setColorIndices] = useState<number[]>([0, 4, 5, 2]);
  const [activeCardId, setActiveCardId] = useState<number | null>(1);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [allFluidActive, setAllFluidActive] = useState(true);
  const [flowSpeed] = useState<number>(1);

  const lastShuffleTime = useRef<number>(0);

  // 3D perspective mouse physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 26, stiffness: 140 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridContainerRef.current) return;
    const rect = gridContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Web Audio Synthesizer Tone Engine
  const playHarmonicTone = useCallback(
    (freq: number) => {
      if (!soundEnabled) return;
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);
        osc1.frequency.exponentialRampToValueAtTime(freq * 1.35, now + 0.12);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2.01, now);
        osc2.frequency.exponentialRampToValueAtTime(freq * 0.65, now + 0.08);

        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.15);
        osc2.stop(now + 0.15);
      } catch {
        // Fallback for autoplay policy
      }
    },
    [soundEnabled]
  );

  // Rotate color palette for a card
  const triggerColorShuffle = useCallback(
    (cardIndex: number) => {
      const now = Date.now();
      if (now - lastShuffleTime.current < 120) return;
      lastShuffleTime.current = now;

      setColorIndices((prev) => {
        const newIndices = [...prev];
        newIndices[cardIndex] = (newIndices[cardIndex] + 1) % COLOR_PALETTES.length;
        return newIndices;
      });

      const nextPalette =
        COLOR_PALETTES[
          (colorIndices[cardIndex] + 1) % COLOR_PALETTES.length
        ];
      if (nextPalette) {
        playHarmonicTone(nextPalette.freq);
      }
    },
    [colorIndices, playHarmonicTone]
  );

  // Manual shuffle across all 4 cards
  const handleShuffleAll = () => {
    setColorIndices((prev) =>
      prev.map((idx) => (idx + 1 + Math.floor(Math.random() * 2)) % COLOR_PALETTES.length)
    );
    playHarmonicTone(880);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const ambientGlowY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="content"
      data-scroll-type="content"
      data-scroll-section
      ref={containerRef}
      className="cinematic-section relative w-full min-h-[100svh] h-auto bg-black/60 backdrop-blur-sm text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-20 sm:py-24 lg:py-28 px-4 sm:px-12 lg:px-20 overflow-visible flex flex-col justify-center border-t border-[#D4AF37]/20 shadow-[0_-20px_50px_rgba(0,0,0,0.95)]"
    >
      <span id="creator" className="sr-only" />

      {/* Ambient Atmospheric Glows */}
      <motion.div
        style={{ y: ambientGlowY }}
        className="absolute top-1/4 right-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/[0.045] rounded-full blur-[180px] pointer-events-none"
      />
      <div className="absolute bottom-1/4 left-1/4 w-[32rem] h-[32rem] bg-[#8C6D4F]/[0.035] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between h-full">
        {/* Section Header */}
        <div>
          {/* Eyebrow Header - Centered */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center space-x-4 mb-5 text-center mx-auto"
          >
            <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8C6D4F]/40 to-[#D4AF37]/80" />
            <span
              className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37] flex items-center gap-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              05 / CONTENT CREATOR &amp; TECH EDUCATOR
            </span>
            <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
          </motion.div>

          {/* Headline and narrative - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mb-10 max-w-4xl mx-auto"
          >
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.88] select-none text-center mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                DOCUMENTING THE BUILD.
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
                SCALING REAL IMPACT.
              </span>
            </h2>

            <div className="flex flex-col items-center gap-4 max-w-xl mx-auto text-center">
              <p
                className="text-xs sm:text-sm font-light text-[#A8988B] leading-relaxed text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Bridging complex engineering architectures with creator storytelling. Unpacking real-world AI pipelines, founder insights, and production full-stack systems.
              </p>

              {/* Caustic Interactive Toolbar - Centered */}
              <div className="flex items-center justify-center flex-wrap gap-2.5 pt-1 mx-auto">
                <button
                  type="button"
                  onClick={() => setSoundEnabled((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border text-[10px] sm:text-[10.5px] font-mono tracking-widest uppercase transition-all duration-300 min-h-[40px] cursor-pointer ${
                    soundEnabled
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F7E7C4] shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                      : 'border-[#8C6D4F]/30 bg-[#120F0C] text-[#8C6D4F] hover:text-[#E8DFD8] hover:border-[#8C6D4F]/60'
                  }`}
                  title="Toggle Interactive Harmonic Synthesizer on Hover"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>AUDIO ACTIVE</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-[#8C6D4F]" />
                      <span>AUDIO MUTED</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleShuffleAll}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-[#8C6D4F]/30 bg-[#120F0C] hover:border-[#D4AF37]/60 text-[10px] sm:text-[10.5px] font-mono tracking-widest uppercase text-[#C4B5A5] hover:text-[#F7E7C4] transition-all duration-300 shadow-sm min-h-[40px] cursor-pointer"
                  title="Cycle Fluid Palettes Across Cards"
                >
                  <Shuffle className="w-3 h-3 text-[#D4AF37]" />
                  <span>SHUFFLE FLUIDS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAllFluidActive((prev) => !prev)}
                  className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border text-[10px] sm:text-[10.5px] font-mono tracking-widest uppercase transition-all duration-300 min-h-[40px] cursor-pointer ${
                    allFluidActive
                      ? 'border-[#8C6D4F]/40 bg-[#14100D] text-[#D4AF37]'
                      : 'border-white/10 bg-transparent text-white/40'
                  }`}
                  title="Toggle Continuous Caustic Fluid Borders"
                >
                  <Activity className="w-3 h-3" />
                  <span>{allFluidActive ? 'FLUID ON' : 'HOVER ONLY'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3D Perspective Fluid Cascade Cards Grid */}
        <div
          style={{ perspective: 1400 }}
          className="relative w-full mb-12"
        >
          <motion.div
            ref={gridContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7"
          >
            {contentPillars.map((pillar, idx) => {
              const color =
                COLOR_PALETTES[
                  colorIndices[idx] % COLOR_PALETTES.length
                ];
              const isActive = activeCardId === pillar.id;

              return (
                <FluidPillarCard
                  key={pillar.title}
                  pillar={pillar}
                  color={color}
                  isActive={isActive}
                  allFluidActive={allFluidActive}
                  flowSpeed={flowSpeed}
                  onHover={() => {
                    playHarmonicTone(color.freq);
                  }}
                  onClick={() => {
                    setActiveCardId(pillar.id);
                    triggerColorShuffle(idx);
                  }}
                />
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

// ============================================================================
// DYNAMIC FLUID CAUSTIC PILLAR CARD COMPONENT
// ============================================================================
interface FluidPillarCardProps {
  pillar: ContentPillar;
  color: ColorProfile;
  isActive: boolean;
  allFluidActive: boolean;
  flowSpeed: number;
  onHover: () => void;
  onClick: () => void;
}

function FluidPillarCard({
  pillar,
  color,
  isActive,
  allFluidActive,
  flowSpeed,
  onHover,
  onClick,
}: FluidPillarCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const showFluid = allFluidActive || isActive || isHovered;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      className="relative w-full rounded-[20px] sm:rounded-[24px] p-[2px] cursor-pointer select-none group"
    >
      {/* Dynamic Rotating Fluid Conic Border */}
      {showFluid && (
        <div className="absolute -inset-[1.8px] rounded-[22px] sm:rounded-[26px] overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: (isActive ? 3.2 : 5.8) / flowSpeed,
            }}
            className="w-[260%] h-[260%] -top-[80%] -left-[80%] absolute transition-all duration-500"
            style={{
              background: color.fluidConic,
            }}
          />

          <div
            className={`absolute inset-0 rounded-[22px] blur-[12px] transition-all duration-500 ${
              isActive ? 'opacity-100' : isHovered ? 'opacity-85' : 'opacity-40'
            }`}
            style={{
              background: `linear-gradient(135deg, ${color.hue}, ${color.secondaryHue})`,
            }}
          />
        </div>
      )}

      {/* Internal Card Glass Surface */}
      <div className="relative w-full h-full rounded-[18px] sm:rounded-[22px] bg-[#0A0D14]/92 backdrop-blur-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.92),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-2px_4px_rgba(0,0,0,0.8)] overflow-hidden z-10 transition-colors duration-500">
        
        {/* Caustic Screen Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-70 mix-blend-screen transition-all duration-500"
          style={{
            background: color.gradient,
          }}
        />

        {/* Ambient Pulsing Glow Core */}
        <motion.div
          animate={{
            scale: isActive ? [1, 1.25, 1] : isHovered ? [1, 1.15, 1] : 1,
            opacity: isActive ? 0.6 : isHovered ? 0.45 : 0.2,
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: color.hue }}
        />

        {/* Top Highlight Flare Line */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* Top Header Row */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            {/* Left: Category Badge & Dynamic Beacon */}
            <div className="flex items-center space-x-3">
              <motion.span
                animate={{
                  scale: isActive ? [1, 1.4, 1] : 1,
                  opacity: isActive ? 1 : 0.7,
                }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full shadow-md transition-colors duration-500"
                style={{
                  backgroundColor: color.hue,
                  boxShadow: `0 0 10px ${color.glowShadow}`,
                }}
              />
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A8988B] font-mono group-hover:text-[#E8DFD8] transition-colors">
                {pillar.category}
              </span>
            </div>

            {/* Right: Numeric Index & Orb Icon Node */}
            <div className="flex items-center space-x-3">
              <span
                className="text-xs font-mono font-bold tracking-widest transition-colors duration-500"
                style={{ color: isHovered || isActive ? color.hue : '#8C6D4F' }}
              >
                {pillar.number}
              </span>

              {/* Glowing Gem Circular Icon */}
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-300"
                style={{
                  color: color.hue,
                  boxShadow: isHovered ? `0 0 18px ${color.glowShadow}` : undefined,
                }}
              >
                {pillar.icon}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-xl sm:text-2xl text-[#E8DFD8] group-hover:text-white font-medium mb-3 tracking-wide transition-colors leading-snug"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {pillar.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#A8988B] leading-relaxed mb-6 font-light">
            {pillar.description}
          </p>
        </div>

        {/* Footer Meta & Tags */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {pillar.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-mono rounded bg-white/5 border transition-colors duration-500"
                style={{
                  borderColor: isHovered || isActive ? `${color.hue}40` : 'rgba(255,255,255,0.08)',
                  color: isHovered || isActive ? '#FFFFFF' : '#C4B5A5',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-3">
            {/* Palette Identifier Badge */}
            <span
              className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 transition-colors duration-500"
              style={{ color: color.hue }}
            >
              {color.name}
            </span>

            {/* Metrics */}
            <div className="text-right">
              <span className="block text-[8px] uppercase tracking-widest text-[#8A7D70] font-mono">
                {pillar.metrics.label}
              </span>
              <span
                className="text-xs font-semibold font-mono transition-colors duration-500"
                style={{ color: color.hue }}
              >
                {pillar.metrics.value}
              </span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default ContentCreationSection;
