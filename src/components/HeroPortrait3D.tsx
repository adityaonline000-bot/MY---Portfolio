'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HeroPortrait3DProps {
  imageSrc?: string;
  className?: string;
}

// 18 micro-particles for the floating spatial dust field
const PARTICLE_SEEDS = [
  { id: 1, x: '12%', y: '18%', size: 2.5, depth: 35, duration: 6.2, delay: 0 },
  { id: 2, x: '82%', y: '15%', size: 3, depth: 55, duration: 7.4, delay: 0.8 },
  { id: 3, x: '22%', y: '78%', size: 2, depth: 40, duration: 5.8, delay: 1.4 },
  { id: 4, x: '88%', y: '72%', size: 3.5, depth: 65, duration: 8.1, delay: 0.4 },
  { id: 5, x: '8%', y: '45%', size: 2, depth: 25, duration: 6.8, delay: 2.1 },
  { id: 6, x: '92%', y: '42%', size: 2.8, depth: 70, duration: 7.9, delay: 1.1 },
  { id: 7, x: '35%', y: '8%', size: 2, depth: 45, duration: 5.5, delay: 2.6 },
  { id: 8, x: '68%', y: '88%', size: 3, depth: 60, duration: 6.9, delay: 0.9 },
  { id: 9, x: '18%', y: '90%', size: 1.8, depth: 30, duration: 7.1, delay: 1.8 },
  { id: 10, x: '78%', y: '28%', size: 2.2, depth: 50, duration: 6.4, delay: 0.3 },
  { id: 11, x: '28%', y: '32%', size: 1.5, depth: 20, duration: 5.9, delay: 1.7 },
  { id: 12, x: '85%', y: '58%', size: 2.6, depth: 62, duration: 8.4, delay: 2.4 },
  { id: 13, x: '45%', y: '92%', size: 2, depth: 42, duration: 6.6, delay: 1.2 },
  { id: 14, x: '55%', y: '5%', size: 3.2, depth: 58, duration: 7.2, delay: 0.7 },
  { id: 15, x: '15%', y: '62%', size: 1.8, depth: 38, duration: 6.0, delay: 2.0 },
  { id: 16, x: '72%', y: '82%', size: 2.4, depth: 52, duration: 7.5, delay: 1.5 },
  { id: 17, x: '62%', y: '18%', size: 2, depth: 48, duration: 6.3, delay: 0.5 },
  { id: 18, x: '38%', y: '72%', size: 2.8, depth: 56, duration: 7.8, delay: 2.3 },
];

export const HeroPortrait3D: React.FC<HeroPortrait3DProps> = ({
  imageSrc = '/images/aditya-hero.jpg',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Mouse coordinate values normalized between -0.5 and 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth cinematic springs with aerodynamic mass/damping for weightless flight
  const springConfig = { damping: 24, stiffness: 190, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Perspective Rotations (Controlled, elegant pitch & yaw within ±4° and ±6°)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4.5, -4.5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6.5, 6.5]);

  // Spatial Translation Parallax (Object shifts subtly in response to cursor flight)
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8]);

  // Dynamic specular light reflection coordinates
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['15%', '85%']);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['15%', '85%']);

  // Parallax for orbital rings
  const orbitRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [68 + 4, 68 - 4]);
  const orbitRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-18 - 5, -18 + 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="explore"
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ perspective: 1400 }}
    >
      {/* ==================================================================== */}
      {/* 1. CINEMATIC WARM-GOLD ATMOSPHERE & AMBIENT NEBULA                   */}
      {/* ==================================================================== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-visible">
        {/* Deep Restrained Champagne Radial Glow */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: isHovered ? 1.12 : [1, 1.06, 1],
                  opacity: isHovered ? 0.38 : [0.22, 0.32, 0.22],
                }
          }
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-[125%] h-[125%] sm:w-[140%] sm:h-[140%] rounded-full blur-[110px]"
          style={{
            background:
              'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(201,164,92,0.10) 38%, transparent 72%)',
          }}
        />

        {/* Outer Bronze Atmospheric Ambient Field */}
        <div
          className="absolute w-[160%] h-[160%] rounded-full blur-[140px] opacity-25"
          style={{
            background:
              'radial-gradient(circle, rgba(140,109,79,0.18) 0%, rgba(18,15,12,0.08) 55%, transparent 75%)',
          }}
        />
      </div>

      {/* ==================================================================== */}
      {/* 2. SPATIAL ORBITAL RING SYSTEM                                      */}
      {/* ==================================================================== */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none -z-5"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* PRIMARY ORBITAL RING: Pitched elliptical trajectory */}
        <motion.div
          style={{
            rotateX: prefersReducedMotion ? 68 : orbitRotateX,
            rotateY: prefersReducedMotion ? -18 : orbitRotateY,
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-15px)',
          }}
          className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] md:w-[490px] md:h-[490px] lg:w-[530px] lg:h-[530px] rounded-full border border-[#D4AF37]/35 shadow-[0_0_25px_rgba(212,175,55,0.12)]"
        >
          {/* Revolving Orbital Beacon Node 01 */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFF5EB] shadow-[0_0_12px_#D4AF37,0_0_24px_#D4AF37]" />
                <span className="absolute w-5 h-5 rounded-full bg-[#D4AF37]/30 blur-sm animate-pulse" />
              </div>
            </motion.div>
          )}

          {/* Hairline Dash Segment */}
          <div className="absolute inset-2 rounded-full border border-dashed border-[#D4AF37]/15" />
        </motion.div>

        {/* SECONDARY COUNTER-ORBITAL RING: Subtle bronze depth */}
        <motion.div
          style={{
            rotateX: prefersReducedMotion ? 62 : 62,
            rotateY: prefersReducedMotion ? 24 : 24,
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-28px)',
          }}
          className="absolute w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] md:w-[560px] md:h-[560px] lg:w-[610px] lg:h-[610px] rounded-full border border-[#8C6D4F]/25 opacity-60"
        >
          {/* Counter-revolving Node 02 */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
            >
              <div className="absolute bottom-0 right-1/4 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C99E5D] shadow-[0_0_8px_#C99E5D]" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ==================================================================== */}
      {/* 3. FLOATING SPATIAL PARTICLE DUST FIELD                              */}
      {/* ==================================================================== */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none overflow-visible"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {PARTICLE_SEEDS.map((p) => (
            <motion.div
              key={p.id}
              animate={{
                y: [0, -14, 0],
                x: [0, p.id % 2 === 0 ? 6 : -6, 0],
                opacity: [0.25, 0.75, 0.25],
                scale: [0.9, 1.25, 0.9],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: p.delay,
              }}
              style={{
                left: p.x,
                top: p.y,
                width: `${p.size}px`,
                height: `${p.size}px`,
                transform: `translateZ(${p.depth}px)`,
              }}
              className="absolute rounded-full bg-[#FFF5EB] shadow-[0_0_8px_#D4AF37]"
            />
          ))}
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. MAIN WEIGHTLESS LEVITATING 3D HERO OBJECT                         */}
      {/* ==================================================================== */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: isHovered ? -6 : [0, -12, 0],
                x: isHovered ? 0 : [0, 4, -3, 0],
                rotateZ: isHovered ? 0 : [0, 0.8, -0.8, 0],
              }
        }
        transition={{
          y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 6.8, repeat: Infinity, ease: 'easeInOut' },
          rotateZ: { duration: 5.6, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          x: prefersReducedMotion ? 0 : translateX,
          y: prefersReducedMotion ? 0 : translateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[410px] md:h-[410px] lg:w-[440px] lg:h-[440px] xl:w-[470px] xl:h-[470px] cursor-pointer"
      >
        {/* Layer 2.1: Outer Aerodynamic Bezel Glass Edge */}
        <div
          className="absolute -inset-2.5 sm:-inset-3.5 rounded-[38px] sm:rounded-[44px] border border-[#D4AF37]/40 bg-gradient-to-b from-[#D4AF37]/20 via-[#8C6D4F]/08 to-[#16120E]/40 p-[1.5px] shadow-[0_20px_50px_rgba(0,0,0,0.92),0_0_35px_rgba(212,175,55,0.18)] backdrop-blur-md"
          style={{ transform: 'translateZ(10px)' }}
        >
          {/* Inner Precision Bezel Ring */}
          <div className="relative w-full h-full rounded-[36px] sm:rounded-[42px] border border-white/10 p-1 bg-black/60">
            
            {/* Layer 2.2: The Master Portrait Totem Surface */}
            <div className="relative w-full h-full rounded-[32px] sm:rounded-[38px] overflow-hidden bg-[#0A0806] shadow-inner">
              
              {/* High-Resolution Portrait with Stereoscopic Forward Projection */}
              <motion.img
                src={imageSrc}
                alt="Aditya Yadav — Founder & AI Engineer"
                className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.06] transition-transform duration-700 ease-out"
                style={{
                  transform: 'translateZ(26px) scale(1.03)',
                }}
                draggable={false}
              />

              {/* Seamless Studio Vignette Edge Mask for Complete Deep-Black Fusion */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/45 pointer-events-none" />

              {/* Dynamic Interactive Specular Light Glare Sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  opacity: isHovered ? 0.38 : 0.16,
                  background: `radial-gradient(circle 320px at ${glareX} ${glareY}, rgba(255,255,255,0.45) 0%, rgba(212,175,55,0.18) 45%, transparent 75%)`,
                  mixBlendMode: 'overlay',
                  transform: 'translateZ(42px)',
                }}
              />

              {/* Precision Gold Architectural HUD Framing Brackets */}
              <div
                className="absolute inset-3 sm:inset-4 pointer-events-none"
                style={{ transform: 'translateZ(48px)' }}
              >
                {/* Top-Left Bracket */}
                <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]/80" />
                {/* Top-Right Bracket */}
                <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]/80" />
                {/* Bottom-Left Bracket */}
                <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]/80" />
                {/* Bottom-Right Bracket */}
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]/80" />

                {/* Subtle Coordinate Watermark */}
                <span className="absolute bottom-1 left-2 text-[8px] font-mono tracking-widest text-[#E8D7C5]/40 select-none">
                  SYS.ID // 28.6139°N
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 5. FLOATING 3D TELEMETRY HUD BADGES (High Z-depth for intense 3D parallax) */}
        {/* ==================================================================== */}
        
        {/* TOP-LEFT TELEMETRY BADGE: AI Solutions Architect */}
        <motion.div
          style={{ transform: 'translateZ(64px)' }}
          className="absolute -top-3.5 -left-3 sm:-top-4 sm:-left-4 px-3.5 py-1.5 rounded-sm border border-[#D4AF37]/50 bg-[#120F0C]/92 backdrop-blur-xl shadow-[0_12px_28px_rgba(0,0,0,0.85)] flex items-center space-x-2 z-30 pointer-events-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
          <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-[#E5D6C5]">
            <span className="text-[#D4AF37] font-semibold">AI/ML</span> ARCHITECT
          </span>
        </motion.div>

        {/* BOTTOM-RIGHT TELEMETRY BADGE: Founder Identity with Pulsing Quantum Ping */}
        <motion.div
          style={{ transform: 'translateZ(76px)' }}
          className="absolute -bottom-4 -right-3 sm:-bottom-5 sm:-right-4 px-4 py-2.5 rounded-md border border-[#D4AF37]/70 bg-[#14100D]/95 backdrop-blur-2xl shadow-[0_16px_38px_rgba(0,0,0,0.92),0_0_20px_rgba(212,175,55,0.15)] flex items-center space-x-3 z-30 pointer-events-none"
        >
          {/* Live Pulsing Beacon */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
          </span>

          <div className="flex flex-col text-left">
            <div className="flex items-center space-x-1.5">
              <span className="text-[8.5px] font-mono tracking-[0.24em] text-[#D4AF37] font-bold uppercase leading-tight">
                FOUNDER
              </span>
              <span className="text-[7.5px] font-mono text-[#8C6D4F]">
                //
              </span>
              <span className="text-[8.5px] font-mono tracking-[0.2em] text-[#FFF5EB] font-medium uppercase leading-tight">
                NXTAURA
              </span>
            </div>
            <span className="text-[10.5px] font-sans font-semibold text-[#F7E7C4] tracking-wider leading-tight pt-0.5">
              ADITYA YADAV
            </span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default HeroPortrait3D;
