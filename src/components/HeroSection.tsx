import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import TechText from './TechText';
import CrystalizedBall from './ui/CrystalizedBall';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  // Scroll choreography for subtle cinematic depth
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      id="hero"
      data-scroll-type="scene"
      data-scroll-section
      ref={heroRef}
      className="cinematic-section relative w-full min-h-[100svh] overflow-hidden bg-[#050403] text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black cursor-default flex flex-col justify-center items-center"
    >
      {/* Studio Ambient Depth Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[55rem] h-[55rem] bg-[#D4AF37]/[0.035] rounded-full blur-[200px] pointer-events-none" />

      {/* ================= CRYSTALIZED BALL WEBGL BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto overflow-hidden">
        <div style={{ width: '100%', height: '100%', minHeight: '600px', position: 'relative' }}>
          <CrystalizedBall
            preset="plasma"
            color="#F25BD0"
            size={0.7}
            crackle={0.85}
            fill={0.5}
            interactive
            hoverStrength={0.7}
            strands={6}
            flares={0.65}
            glow={0.9}
            sparks={0.6}
            particleCount={15000}
            motion="rise"
            particleShape="square"
            depth={0.6}
            sway={0.5}
            twinkle={0.5}
            haze={0.7}
            dustSpeed={1}
            speed={1}
            intro
            paused={false}
          />
        </div>
      </div>

      {/* Subtle Dark Vignette Overlay for Crisp Typography Legibility */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-radial from-transparent via-black/30 to-black/75" />

      {/* ================= CENTERED CONTENT LAYER ================= */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full px-4 sm:px-10 lg:px-16 pt-20 sm:pt-24 pb-10 sm:pb-12 pointer-events-none my-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: headlineY }}
          className="hero-headline-safe-zone pointer-events-auto z-20 w-full max-w-5xl flex flex-col items-center text-center mx-auto"
        >

          {/* Centered TechText Headline */}
          <motion.div variants={fadeUpVariants} className="relative mb-5 sm:mb-6 select-none w-full">
            <div
              className="hero-tech-headline flex flex-col items-center justify-center text-center w-full"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <div className="hero-tech-line flex justify-center items-center w-full">
                <TechText
                  text="FOUNDER"
                  align="center"
                  fontFamily="'Bebas Neue', sans-serif"
                  fontWeight={600}
                  fontSize={120}
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  specks={15}
                  color="#F2EBE5"
                  accentColor="#E5D6C5"
                  letterSpacing={0.02}
                  reach={200}
                  softness={0.7}
                  strokeWidth={1.5}
                  speed={1}
                  lineStyle="dashed"
                  selection={false}
                  labels={false}
                  draggable={false}
                  sweep={true}
                />
              </div>
              <div className="hero-tech-line flex justify-center items-center w-full">
                <TechText
                  text="FULL-STACK DEVELOPER &"
                  align="center"
                  fontFamily="'Bebas Neue', sans-serif"
                  fontWeight={600}
                  fontSize={110}
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  specks={15}
                  color="#F7E7C4"
                  accentColor="#D4AF37"
                  letterSpacing={0.01}
                  reach={200}
                  softness={0.7}
                  strokeWidth={1.5}
                  speed={1}
                  lineStyle="dashed"
                  selection={false}
                  labels={false}
                  draggable={false}
                  sweep={true}
                />
              </div>
              <div className="hero-tech-line flex justify-center items-center w-full">
                <TechText
                  text="AI SOLUTIONS BUILDER"
                  align="center"
                  fontFamily="'Bebas Neue', sans-serif"
                  fontWeight={600}
                  fontSize={110}
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  specks={15}
                  color="#DFBE8A"
                  accentColor="#D4AF37"
                  letterSpacing={0.01}
                  reach={200}
                  softness={0.7}
                  strokeWidth={1.5}
                  speed={1}
                  lineStyle="dashed"
                  selection={false}
                  labels={false}
                  draggable={false}
                  sweep={true}
                />
              </div>
            </div>
          </motion.div>

          {/* Centered Quote Block */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col items-center text-center pt-1 mb-6 sm:mb-8 max-w-lg mx-auto px-2"
          >
            <div className="hero-quote flex items-center justify-center space-x-2.5 sm:space-x-3 text-center">
              <span className="hero-quote__mark text-[#D4AF37]">“</span>
              <div className="hero-quote__text text-center text-xs sm:text-sm md:text-base tracking-[0.14em] sm:tracking-[0.2em] text-[#E8DFD8]/95 font-light">
                <span>BUILD. SHIP. SOLVE. DELIVER &amp; GROW.</span>
              </div>
              <span className="hero-quote__mark text-[#D4AF37]">”</span>
            </div>
            <div className="hero-quote__divider w-24 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mt-3" />
          </motion.div>

          {/* Centered CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-1 mb-6 sm:mb-8 w-full max-w-md sm:max-w-none"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {/* Explore My Work CTA */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-7 sm:px-10 py-3.5 sm:py-4 border border-[#8C6D4F] bg-[#120F0C]/90 hover:border-[#D4AF37] text-[#EAD8C7] hover:text-[#FFF5EB] text-[11px] sm:text-xs font-medium tracking-[0.22em] sm:tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.22)] min-h-[44px]"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8D7C5]/50 to-transparent pointer-events-none" />
              <span>EXPLORE MY WORK</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                ↗
              </span>
            </motion.a>

            {/* Download Resume Button */}
            <motion.a
              href="/resume.pdf"
              download="Aditya_Yadav_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center justify-center space-x-2 w-full sm:w-auto px-7 sm:px-10 py-3.5 sm:py-4 border border-[#8C6D4F]/50 hover:border-[#8C6D4F] text-[#BFA895] hover:text-[#EAD8C7] text-[11px] sm:text-xs font-medium tracking-[0.22em] sm:tracking-[0.24em] uppercase transition-all duration-300 bg-black/50 backdrop-blur-sm min-h-[44px]"
            >
              <span>DOWNLOAD RESUME</span>
              <span className="transform transition-transform duration-300 group-hover:translate-y-0.5 text-xs">
                ↓
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;