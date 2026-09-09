import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutImg from '../assets/aditya-hero.jpg';
import StrokeText from './StrokeText';
import LogoLoop, { type LogoItem } from './ui/LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiPytorch,
  SiTailwindcss,
  SiTensorflow,
  SiHuggingface,
  SiNodedotjs,
  SiDocker,
  SiPostgresql,
  SiFastapi,
  SiGit,
} from 'react-icons/si';

const OpenAIIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.401-.686zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L8.909 9.2297V6.8974a.0662.0662 0 0 1 .0331-.0615l4.9807-2.8764a4.4992 4.4992 0 0 1 6.5283 4.9082zM12 13.5786l-2.6114-1.5074 2.6114-1.5074 2.6114 1.5074z" />
  </svg>
);

const techLogos: LogoItem[] = [
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <OpenAIIcon className="w-5 h-5 text-[#10A37F]" />
        <span className="text-xs font-mono font-medium tracking-wider">OpenAI</span>
      </span>
    ),
    title: 'OpenAI',
    href: 'https://openai.com',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiPython className="w-5 h-5 text-[#3776AB]" />
        <span className="text-xs font-mono font-medium tracking-wider">Python</span>
      </span>
    ),
    title: 'Python',
    href: 'https://www.python.org',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiPytorch className="w-5 h-5 text-[#EE4C2C]" />
        <span className="text-xs font-mono font-medium tracking-wider">PyTorch</span>
      </span>
    ),
    title: 'PyTorch',
    href: 'https://pytorch.org',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiTensorflow className="w-5 h-5 text-[#FF6F00]" />
        <span className="text-xs font-mono font-medium tracking-wider">TensorFlow</span>
      </span>
    ),
    title: 'TensorFlow',
    href: 'https://www.tensorflow.org',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiHuggingface className="w-5 h-5 text-[#FFD21E]" />
        <span className="text-xs font-mono font-medium tracking-wider">Hugging Face</span>
      </span>
    ),
    title: 'Hugging Face',
    href: 'https://huggingface.co',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiReact className="w-5 h-5 text-[#61DAFB]" />
        <span className="text-xs font-mono font-medium tracking-wider">React</span>
      </span>
    ),
    title: 'React',
    href: 'https://react.dev',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiNextdotjs className="w-5 h-5 text-white" />
        <span className="text-xs font-mono font-medium tracking-wider">Next.js</span>
      </span>
    ),
    title: 'Next.js',
    href: 'https://nextjs.org',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiTypescript className="w-5 h-5 text-[#3178C6]" />
        <span className="text-xs font-mono font-medium tracking-wider">TypeScript</span>
      </span>
    ),
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" />
        <span className="text-xs font-mono font-medium tracking-wider">Tailwind CSS</span>
      </span>
    ),
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiFastapi className="w-5 h-5 text-[#009688]" />
        <span className="text-xs font-mono font-medium tracking-wider">FastAPI</span>
      </span>
    ),
    title: 'FastAPI',
    href: 'https://fastapi.tiangolo.com',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiNodedotjs className="w-5 h-5 text-[#5FA04E]" />
        <span className="text-xs font-mono font-medium tracking-wider">Node.js</span>
      </span>
    ),
    title: 'Node.js',
    href: 'https://nodejs.org',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiDocker className="w-5 h-5 text-[#2496ED]" />
        <span className="text-xs font-mono font-medium tracking-wider">Docker</span>
      </span>
    ),
    title: 'Docker',
    href: 'https://www.docker.com',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiPostgresql className="w-5 h-5 text-[#4169E1]" />
        <span className="text-xs font-mono font-medium tracking-wider">PostgreSQL</span>
      </span>
    ),
    title: 'PostgreSQL',
    href: 'https://www.postgresql.org',
  },
  {
    node: (
      <span className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#14100D]/70 border border-[#8C6D4F]/25 text-[#C4B7AA] hover:text-[#FFF2D6] hover:border-[#D4AF37]/60 transition-all duration-300">
        <SiGit className="w-5 h-5 text-[#F05032]" />
        <span className="text-xs font-mono font-medium tracking-wider">Git</span>
      </span>
    ),
    title: 'Git',
    href: 'https://git-scm.com',
  },
];


gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  // Container & Section refs
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const portraitWrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cornerBracketsRef = useRef<HTMLDivElement>(null);

  const [isCardHovered, setIsCardHovered] = useState(false);

  // 1. Framer Motion Values for 3D physics on portrait card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(200);
  const spotlightY = useMotionValue(200);

  // 2. Springs for smooth 3D tilting
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 22, stiffness: 220 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 22, stiffness: 220 });

  // 3. Holographic Spotlight Background
  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(circle 240px at ${x}px ${y}px, rgba(255,255,255,0.3), rgba(212,175,55,0.16), transparent 80%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsCardHovered(true);

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // GSAP ScrollTrigger Choreography
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {

      // -----------------------------------------------------------
      // PHASE 1: CHOREOGRAPHED ENTRANCE SEQUENCE
      // -----------------------------------------------------------
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 30%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // 1. Centered "ABOUT-US" label reveals
      if (badgeRef.current) {
        entranceTl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -16, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
          0
        );
      }

      // 2. Editorial About Paragraph reveals smoothly
      if (bodyRef.current) {
        entranceTl.fromTo(
          bodyRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0.2
        );
      }

      // 4. Portrait Card Entrance & Frame Bracket Reveal
      if (portraitWrapperRef.current) {
        entranceTl.fromTo(
          portraitWrapperRef.current,
          { opacity: 0.85, scale: 0.97, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power3.out' },
          0.35
        );
      }

      if (cornerBracketsRef.current) {
        const brackets = cornerBracketsRef.current.children;
        entranceTl.fromTo(
          brackets,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.5)' },
          0.65
        );
      }

      // -----------------------------------------------------------
      // PHASE 2: SUBTLE DESKTOP PARALLAX
      // -----------------------------------------------------------
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Subtle portrait parallax (10-18px)
        if (portraitWrapperRef.current) {
          gsap.to(portraitWrapperRef.current, {
            y: 18,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }

        // Ambient background glow drift
        const bgGlowLeft = section.querySelector('.ambient-glow-left');
        const bgGlowRight = section.querySelector('.ambient-glow-right');
        if (bgGlowLeft) {
          gsap.to(bgGlowLeft, {
            y: -25,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });
        }
        if (bgGlowRight) {
          gsap.to(bgGlowRight, {
            y: 25,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });
        }
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      data-scroll-type="scene"
      data-scroll-section
      className="cinematic-section relative w-full min-h-[100svh] bg-black/60 backdrop-blur-sm text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 overflow-hidden flex flex-col justify-center border-t border-[#D4AF37]/20 shadow-[0_-20px_50px_rgba(0,0,0,0.95)]"
    >
      {/* ================= BACKGROUND GLOWS & AMBIENT ATMOSPHERE ================= */}
      <div 
        className="ambient-glow-left absolute top-1/4 -left-12 sm:left-1/12 w-[22rem] sm:w-[32rem] h-[22rem] sm:h-[32rem] bg-[#D4AF37] rounded-full blur-[140px] sm:blur-[170px] opacity-[0.10] pointer-events-none"
      />
      <div 
        className="ambient-glow-right absolute bottom-1/5 right-0 sm:right-1/12 w-[20rem] sm:w-[28rem] h-[20rem] sm:h-[28rem] bg-[#8C6D4F] rounded-full blur-[150px] sm:blur-[180px] opacity-[0.08] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col">
        
        {/* ================= 1. SECTION LABEL - CENTERED (MATCHING PROJECTS STYLE) ================= */}
        <div className="w-full flex justify-center mb-6 sm:mb-8 lg:mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center space-x-4 text-center mx-auto"
          >
            <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8C6D4F]/40 to-[#D4AF37]/80" />
            <span
              className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              01 / ABOUT ME
            </span>
            <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
          </motion.div>
        </div>



        {/* ================= 2. MAIN ABOUT 2-COLUMN GRID ================= */}
        {/*
            Desktop: ~60% Left (Headline + Paragraph), ~40% Right (Photo/Portrait)
            Mobile: Single column (ABOUT-US -> HEADLINE -> PARAGRAPH -> PHOTO)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-14 items-center">
          
          {/* ================= LEFT COLUMN (~60%): HEADLINE + PARAGRAPH ================= */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center w-full">
            
            {/* Top: Main Headline (StrokeText Motion Reveal) */}
            <div className="about-headline-container mb-6 sm:mb-7 select-none w-full">
              <h2 className="sr-only">I TURN MESSY IDEAS INTO REAL PRODUCTS.</h2>
              <div className="flex flex-col gap-1 w-full max-w-[620px]">
                <div className="w-full">
                  <StrokeText
                    text="I TURN MESSY IDEAS"
                    strokeColor="#D4AF37"
                    fillColor="#FFFFFF"
                    strokeWidth={1.5}
                    drawDuration={1.5}
                    fillDelay={0.15}
                    stagger={0.04}
                    ease="power2.out"
                    trigger="scroll"
                    fillMode="wipe"
                    fontSize={64}
                    fontWeight={800}
                    letterSpacing={-1}
                    align="left"
                    replayOnHover={true}
                    fontFamily="'Bebas Neue', sans-serif"
                  />
                </div>
                <div className="w-full">
                  <StrokeText
                    text="INTO REAL PRODUCTS."
                    strokeColor="#D4AF37"
                    fillColor="#F3DBB3"
                    strokeWidth={1.5}
                    drawDuration={1.5}
                    fillDelay={0.25}
                    stagger={0.04}
                    ease="power2.out"
                    trigger="scroll"
                    fillMode="wipe"
                    fontSize={64}
                    fontWeight={800}
                    letterSpacing={-1}
                    align="left"
                    replayOnHover={true}
                    fontFamily="'Bebas Neue', sans-serif"
                  />
                </div>
              </div>
            </div>

            {/* Bottom: Editorial About Paragraph */}
            <div ref={bodyRef} className="space-y-3.5 max-w-[620px]">
              <p 
                className="text-xs sm:text-[13.5px] md:text-[14.5px] font-normal text-[#C4B7AA] leading-[1.8] tracking-wide"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                I'm <strong className="text-[#F3DBB3] font-semibold tracking-normal">Aditya</strong> — Founder of <a href="https://www.instagram.com/nxtaura_innovations/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] font-semibold tracking-wide drop-shadow-[0_0_10px_rgba(212,175,55,0.25)] hover:text-[#FFF2D6] underline decoration-[#D4AF37]/50 hover:decoration-[#D4AF37] underline-offset-4 transition-colors">NxtAura</a>, a CS / AI-ML student at <strong className="text-[#F3DBB3] font-semibold">NIAT</strong>, and the creator behind <a href="https://www.instagram.com/adityakvideos_/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] font-medium hover:text-[#FFF2D6] underline decoration-[#D4AF37]/50 hover:decoration-[#D4AF37] underline-offset-4 transition-colors">@adityakvideos_</a>. I'm the one who turns messy ideas into products that feel inevitable.
              </p>

              <p 
                className="text-xs sm:text-[13px] md:text-[14px] font-light text-[#A8988B] leading-[1.8] tracking-wide"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                I care about design that breathes, code that ships, and AI that actually works. Moving across the entire product journey — from rough ideas and strategy to UX, full-stack development, AI integration, automation, deployment and iteration — I build technology that's meant to work in the real world.
              </p>

              {/* Verified Social Identity Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://www.instagram.com/adityakvideos_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#8C6D4F]/30 bg-[#14100D]/60 hover:bg-[#1A1510] hover:border-[#D4AF37] text-xs text-[#E8DFD8] hover:text-[#F7E7C4] transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.5)] group"
                >
                  <svg className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="font-mono text-[10.5px] tracking-wider text-[#8C6D4F] uppercase group-hover:text-[#A8988B]">Creator //</span>
                  <span className="font-medium text-[#D4AF37] group-hover:text-[#FFF2D6]">@adityakvideos_</span>
                </a>

                <a
                  href="https://www.instagram.com/nxtaura_innovations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#8C6D4F]/30 bg-[#14100D]/60 hover:bg-[#1A1510] hover:border-[#D4AF37] text-xs text-[#E8DFD8] hover:text-[#F7E7C4] transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.5)] group"
                >
                  <svg className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="font-mono text-[10.5px] tracking-wider text-[#8C6D4F] uppercase group-hover:text-[#A8988B]">Company //</span>
                  <span className="font-medium text-[#D4AF37] group-hover:text-[#FFF2D6]">@nxtaura_innovations</span>
                </a>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN (~40%): PORTRAIT / PHOTO ================= */}
          <div 
            ref={portraitWrapperRef}
            className="lg:col-span-5 xl:col-span-5 w-full flex items-center justify-center relative perspective-[1400px]"
          >
            {/* Ambient Gold Glow Ring Behind Frame */}
            <motion.div 
              animate={{
                scale: isCardHovered ? 1.12 : 1,
                opacity: isCardHovered ? 0.32 : 0.15,
                rotate: isCardHovered ? 180 : 0
              }}
              transition={{ duration: 3.2, ease: "easeOut" }}
              className="absolute -inset-6 bg-[conic-gradient(from_0deg,#D4AF37_0%,#8C6D4F_30%,transparent_60%,#D4AF37_100%)] blur-2xl rounded-3xl pointer-events-none"
            />

            {/* Drifting Gold Spark Embers on Hover */}
            {isCardHovered && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10, x: -20 }}
                  animate={{ opacity: [0, 1, 0], y: -50, x: -30 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute top-1/4 -left-6 w-1.5 h-1.5 bg-[#F3DBB3] rounded-full blur-[1px] shadow-[0_0_8px_#D4AF37] pointer-events-none z-30"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20, x: 20 }}
                  animate={{ opacity: [0, 1, 0], y: -60, x: 40 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
                  className="absolute bottom-1/3 -right-6 w-2 h-2 bg-[#D4AF37] rounded-full blur-[1px] shadow-[0_0_10px_#D4AF37] pointer-events-none z-30"
                />
              </>
            )}

            {/* 3D Holographic Main Card Container */}
            <motion.div
              ref={cardRef}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative p-3 sm:p-3.5 border border-[#8C6D4F]/40 rounded-sm bg-[#120F0C]/85 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] cursor-pointer group transition-colors duration-500 hover:border-[#D4AF37]/80 w-full max-w-[320px] sm:max-w-[350px] lg:max-w-[380px]"
            >
              {/* Dynamic Laser Border Sweep on Card Perimeter */}
              <div className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{ x: isCardHovered ? ['-100%', '200%'] : '-100%' }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent skew-x-12"
                />
              </div>

              {/* Locked Corner Gold Accent Brackets */}
              <div ref={cornerBracketsRef} className="pointer-events-none">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
              </div>

              {/* Portrait Image Canvas */}
              <div className="relative overflow-hidden w-full aspect-[4/5] bg-black rounded-sm">
                {/* Main Portrait */}
                <img
                  src={aboutImg}
                  alt="Aditya Yadav — Founder & AI Engineer"
                  className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.05] saturate-[1.02] group-hover:scale-105 group-hover:brightness-105 group-hover:contrast-[1.10] transition-all duration-700 ease-out"
                />

                {/* Mouse-Tracked Holographic Glass Spotlight Sweep */}
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
                  style={{
                    background: spotlightBg,
                    opacity: isCardHovered ? 1 : 0,
                  }}
                />

                {/* Bottom Film Noir Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                {/* Monoline Signature */}
                <div className="absolute bottom-3 right-4 z-20 select-none">
                  <span 
                    className="text-2xl sm:text-3xl text-[#F2D8A7] drop-shadow-[0_0_12px_rgba(242,216,167,0.5)] transition-colors duration-300 group-hover:text-white"
                    style={{ fontFamily: "'Herr Von Muellerhoff', cursive" }}
                  >
                    Aditya Yadav
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ================= 3. CORE ENGINEERING ECOSYSTEM (<LogoLoop />) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-14 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-[#8C6D4F]/20 w-full flex flex-col items-center select-none"
        >
          <div className="flex items-center space-x-3 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span
              className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] uppercase text-[#8C6D4F]"
            >
              CORE TECHNOLOGIES &amp; ENGINEERING ECOSYSTEM
            </span>
          </div>

          <div className="w-full relative py-2 overflow-hidden">
            <LogoLoop
              logos={techLogos}
              speed={65}
              direction="left"
              logoHeight={32}
              gap={24}
              pauseOnHover={true}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="#000000"
              ariaLabel="Core Tech Stack & Tools"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;