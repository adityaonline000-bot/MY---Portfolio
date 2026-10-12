import React, { lazy, Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  ExternalLink, 
  RotateCcw, 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Eye,
  ArrowDown
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import './GlassJarProjects.css';

const PaperCrumple = lazy(() => import('./PaperCrumple'));

export interface ProjectData {
  number: string;
  title: string;
  category: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  paperBg: string;
  creaseTone: string;
  accentColor: string;
  coinTone: {
    base: string;
    rim: string;
    glow: string;
  };
  coinRestPosition: {
    x: number; // offset px from jar center
    y: number; // offset px from jar floor
    rotate: number; // deg
  };
}

export const projectsData: ProjectData[] = [
  {
    number: '01',
    title: 'SmartFaceGuard',
    category: 'AI / IDENTITY VERIFICATION PLATFORM',
    description:
      'A browser-based biometric identity verification platform combining real-time face detection, active liveness verification (blink and head pose analysis), authenticity scoring, and deepfake detection into a single AI-powered authentication workflow.',
    githubUrl: '#contact',
    liveUrl: '#contact',
    tech: [
      'Python',
      'FastAPI',
      'OpenCV',
      'MediaPipe',
      'Computer Vision',
      'Deepfake Detection',
      'Active Liveness',
      'Telemetry Scoring',
    ],
    metrics: [
      { label: 'PIPELINE', value: 'Active Liveness & Deepfake' },
      { label: 'VISION ENGINE', value: 'OpenCV + MediaPipe' },
      { label: 'ARCHITECTURE', value: 'FastAPI & Decision Telemetry' },
    ],
    paperBg: '#F7F2EB', // Warm Italian parchment beige
    creaseTone: 'rgba(140, 109, 79, 0.12)',
    accentColor: '#9C6F35',
    coinTone: {
      base: 'from-[#FFE073] via-[#D4AF37] to-[#8C6D4F]',
      rim: '#A37E36',
      glow: 'rgba(212, 175, 55, 0.65)',
    },
    coinRestPosition: {
      x: -52,
      y: -22,
      rotate: -15,
    },
  },
  {
    number: '02',
    title: 'ATF Projects',
    category: 'BUSINESS SYSTEM / CLIENT CONTRACT',
    description:
      'A production-grade commercial client solution delivering a professional brand website seamlessly integrated with a custom management system built to streamline business workflows and client operations.',
    githubUrl: 'https://www.atfprojects.in/',
    liveUrl: 'https://www.atfprojects.in/',
    tech: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
      'Custom Admin Portal',
      'Production Deployment',
    ],
    metrics: [
      { label: 'CONTRACT VALUE', value: '₹1,00,000 Delivery' },
      { label: 'SYSTEM', value: 'Custom Management Portal' },
      { label: 'DEPLOYMENT', value: 'Live Production Solution' },
    ],
    paperBg: '#EDF3F8', // Subtle executive pearl light blue
    creaseTone: 'rgba(43, 108, 176, 0.12)',
    accentColor: '#2B6CB0',
    coinTone: {
      base: 'from-[#FFE898] via-[#E5B548] to-[#996515]',
      rim: '#996515',
      glow: 'rgba(229, 181, 72, 0.65)',
    },
    coinRestPosition: {
      x: 50,
      y: -20,
      rotate: 16,
    },
  },
  {
    number: '03',
    title: 'BABA PG HOUSE',
    category: 'ACCOMMODATION DIGITAL EXPERIENCE',
    description:
      'A modern responsive digital platform engineered to showcase accommodation spaces, streamline property details, and directly accelerate lead acquisition and tenant conversions.',
    githubUrl: 'https://www.babapghouse.com/',
    liveUrl: 'https://www.babapghouse.com/',
    tech: [
      'React.js',
      'Responsive UI',
      'WhatsApp API',
      'Google Maps API',
      'Information Architecture',
      'Conversion Optimization',
    ],
    metrics: [
      { label: 'CONVERSION', value: 'Direct WhatsApp Leads' },
      { label: 'INTEGRATIONS', value: 'Interactive Maps & Location' },
      { label: 'RESPONSIVENESS', value: '100% Mobile Optimized' },
    ],
    paperBg: '#FAF5EC', // Soft sunlit linen / warm sand
    creaseTone: 'rgba(192, 86, 33, 0.12)',
    accentColor: '#C05621',
    coinTone: {
      base: 'from-[#FAD02C] via-[#D4AF37] to-[#7A5210]',
      rim: '#7A5210',
      glow: 'rgba(250, 208, 44, 0.65)',
    },
    coinRestPosition: {
      x: -14,
      y: -52,
      rotate: -7,
    },
  },
  {
    number: '04',
    title: 'Bull Clothing',
    category: 'BRAND & E-COMMERCE DIGITAL EXPERIENCE',
    description:
      'A clean, modern digital brand experience showcasing clothing collections, curated product presentations, and an optimized customer journey built for maximum visual appeal and conversion.',
    githubUrl: 'https://www.bullclothings.com/',
    liveUrl: 'https://www.bullclothings.com/',
    tech: [
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'Brand Architecture',
      'E-Commerce UI',
      'UX Flow Design',
    ],
    metrics: [
      { label: 'PRODUCT JOURNEY', value: 'Streamlined Catalog Flow' },
      { label: 'BRAND IDENTITY', value: 'Modern Minimalist UI' },
      { label: 'PERFORMANCE', value: 'Optimized Mobile Experience' },
    ],
    paperBg: '#F0F4F1', // Soft sage-pearl / muted mint ivory
    creaseTone: 'rgba(47, 133, 90, 0.12)',
    accentColor: '#2F855A',
    coinTone: {
      base: 'from-[#FFDE59] via-[#C99E5D] to-[#8C6D4F]',
      rim: '#8C6D4F',
      glow: 'rgba(201, 158, 93, 0.65)',
    },
    coinRestPosition: {
      x: 30,
      y: -76,
      rotate: 12,
    },
  },
];

// Memoized blueprint canvas texture cache for PaperCrumple
const blueprintCache = new Map<string, string>();
const BLUEPRINT_CACHE_KEY = 'v3_large_readable';

export const createProjectBlueprintDataUrl = (project: ProjectData): string => {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1250;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const w = 1000;
  const h = 1250;

  // 1. Background Parchment Paper
  ctx.fillStyle = project.paperBg || '#F7F2EB';
  ctx.fillRect(0, 0, w, h);

  // 2. Technical Blueprint Grid Pattern
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
  ctx.lineWidth = 1;
  const grid = 36;
  for (let x = 0; x < w; x += grid) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += grid) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // 3. Technical Framing Border
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.22)';
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, w - 56, h - 56);

  ctx.strokeStyle = project.accentColor || '#9C6F35';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(40, 40, w - 80, h - 80);

  // Corner Accents (Rivets)
  const drawCornerRivet = (cx: number, cy: number) => {
    ctx.fillStyle = project.accentColor || '#9C6F35';
    ctx.fillRect(cx - 4, cy - 4, 8, 8);
  };
  drawCornerRivet(40, 40);
  drawCornerRivet(w - 40, 40);
  drawCornerRivet(40, h - 40);
  drawCornerRivet(w - 40, h - 40);

  // 4. Header Stamp
  ctx.fillStyle = project.accentColor || '#9C6F35';
  ctx.font = 'bold 18px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`ARCHIVAL SPEC // PROJECT ${project.number}`, 65, 85);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.font = 'bold 14.5px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('AUTHENTICATED BLUEPRINT // NXTAURA', w - 65, 85);

  // Divider
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(65, 108);
  ctx.lineTo(w - 65, 108);
  ctx.stroke();

  // 5. Category Pill
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.fillRect(65, 135, 430, 36);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.14)';
  ctx.strokeRect(65, 135, 430, 36);
  ctx.fillStyle = project.accentColor || '#9C6F35';
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(project.category.toUpperCase(), 80, 159);

  // 6. Title
  ctx.fillStyle = '#0F0B06';
  ctx.font = 'bold 56px sans-serif';
  ctx.fillText(project.title.toUpperCase(), 65, 230);

  // 7. Description Box (Bold, Large, and High Contrast)
  ctx.fillStyle = '#1C150E';
  ctx.font = '600 22px sans-serif';
  const descWords = project.description.split(' ');
  let curLine = '';
  let curY = 275;
  for (const word of descWords) {
    if (curLine.length + word.length < 46) {
      curLine += word + ' ';
    } else {
      ctx.fillText(curLine.trim(), 65, curY);
      curLine = word + ' ';
      curY += 34;
    }
  }
  if (curLine) ctx.fillText(curLine.trim(), 65, curY);

  // 8. Key Metrics Cards
  const metricBoxY = curY + 36;
  const colW = (w - 130 - 24) / 3;
  project.metrics.forEach((metric, i) => {
    const bx = 65 + i * (colW + 12);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(bx, metricBoxY, colW, 104);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(bx, metricBoxY, colW, 104);

    ctx.fillStyle = project.accentColor || '#9C6F35';
    ctx.font = 'bold 13.5px monospace';
    ctx.fillText(metric.label, bx + 16, metricBoxY + 32);

    ctx.fillStyle = '#0F0B06';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(metric.value, bx + 16, metricBoxY + 72);
  });

  // 9. Tech Stack Section
  const techY = metricBoxY + 148;
  ctx.fillStyle = project.accentColor || '#9C6F35';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('TECHNICAL ARCHITECTURE & PIPELINE', 65, techY);

  let tx = 65;
  let ty = techY + 22;
  project.tech.forEach((t) => {
    ctx.font = 'bold 15px monospace';
    const textW = ctx.measureText(t).width;
    const badgeW = textW + 24;
    if (tx + badgeW > w - 65) {
      tx = 65;
      ty += 44;
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fillRect(tx, ty, badgeW, 32);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(tx, ty, badgeW, 32);

    ctx.fillStyle = '#140E08';
    ctx.fillText(t, tx + 12, ty + 22);
    tx += badgeW + 8;
  });

  // 10. Official Stamped Seal at Bottom
  const sealY = h - 135;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.16)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(65, sealY);
  ctx.lineTo(w - 65, sealY);
  ctx.stroke();

  ctx.fillStyle = '#63441B';
  ctx.font = 'bold 15.5px monospace';
  ctx.fillText('PORTFOLIO OF ADITYA YADAV // NXTAURA INNOVATIONS', 65, sealY + 38);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.font = 'bold 13px monospace';
  ctx.fillText('SYSTEM AUDITED & VERIFIED FOR PRODUCTION DEPLOYMENT', 65, sealY + 64);

  // Gold Seal Medallion Stamp
  ctx.save();
  ctx.beginPath();
  ctx.arc(w - 120, sealY + 50, 40, 0, Math.PI * 2);
  ctx.strokeStyle = project.accentColor || '#9C6F35';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = 'rgba(212, 175, 55, 0.2)';
  ctx.fill();

  ctx.fillStyle = project.accentColor || '#9C6F35';
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('VERIFIED', w - 120, sealY + 46);
  ctx.fillText('NXTAURA', w - 120, sealY + 62);
  ctx.restore();

  return canvas.toDataURL('image/png');
};

export const getProjectBlueprintUrl = (project: ProjectData): string => {
  if (typeof document === 'undefined') return '';
  const key = `${project.number}_${BLUEPRINT_CACHE_KEY}`;
  if (blueprintCache.has(key)) {
    return blueprintCache.get(key)!;
  }
  const url = createProjectBlueprintDataUrl(project);
  blueprintCache.set(key, url);
  return url;
};

// Synthesize authentic metallic coin clink sound using Web Audio API
const playCoinDropAudio = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Metallic chime frequency
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400 + Math.random() * 500, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.16);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);

    // Glass body resonance
    const glassOsc = ctx.createOscillator();
    const glassGain = ctx.createGain();
    glassOsc.type = 'triangle';
    glassOsc.frequency.setValueAtTime(860, now);
    glassOsc.frequency.exponentialRampToValueAtTime(430, now + 0.22);
    glassGain.gain.setValueAtTime(0.03, now);
    glassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    glassOsc.connect(glassGain);
    glassGain.connect(ctx.destination);
    glassOsc.start(now);
    glassOsc.stop(now + 0.22);
  } catch {
    // Silently continue if audio context is blocked
  }
};

export const GlassJarProjects: React.FC = () => {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  
  // Track scroll through the pinned container
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ['start start', 'end end'],
  });

  const [coinsDropped, setCoinsDropped] = useState<number>(0);
  const [impactRippleActive, setImpactRippleActive] = useState<boolean>(false);
  const [jarShakeActive, setJarShakeActive] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isClosingPaper, setIsClosingPaper] = useState<boolean>(false);
  const [hoveredCoinIndex, setHoveredCoinIndex] = useState<number | null>(null);
  const isModalOpenRef = useRef<boolean>(false);
  const [viewportDimensions, setViewportDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportDimensions.width < 768;
  // Prominently enlarged paper sizing: fills comfortable viewport height and width so details are immediately readable!
  const paperSceneHeight = isMobile
    ? Math.min(580, Math.max(380, viewportDimensions.height - 130))
    : Math.min(820, Math.max(540, viewportDimensions.height - 120));
  const paperWidth = Math.min(
    isMobile ? viewportDimensions.width - 24 : 680,
    Math.round(paperSceneHeight * 0.8)
  );
  const paperHeight = Math.round(paperWidth * 1.25);

  // Synchronize scroll progression with coin dropping
  // CRITICAL FIX: Coins drop cleanly on scroll and NEVER disappear when user scrolls back or interacts with modal
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // If the details modal is open, completely lock coin state
      if (isModalOpenRef.current) return;

      let targetCount = 0;
      if (latest < 0.02) {
        targetCount = 0;
      } else if (latest >= 0.02 && latest < 0.22) {
        targetCount = 1;
      } else if (latest >= 0.22 && latest < 0.44) {
        targetCount = 2;
      } else if (latest >= 0.44 && latest < 0.66) {
        targetCount = 3;
      } else if (latest >= 0.66) {
        targetCount = 4;
      }

      setCoinsDropped((prev) => {
        // Forward progress: drop new coins with impact ripple and sound
        if (targetCount > prev) {
          playCoinDropAudio();
          setImpactRippleActive(true);
          setJarShakeActive(true);
          setTimeout(() => setImpactRippleActive(false), 750);
          setTimeout(() => setJarShakeActive(false), 350);
          return targetCount;
        }

        // Keep all previously dropped coins in the jar - never reset!
        return prev;
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Lock background scroll when modal is open so page behind never scrolls or shifts
  useEffect(() => {
    isModalOpenRef.current = Boolean(selectedProject);
    if (selectedProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      lenis?.stop();

      return () => {
        document.body.style.overflow = originalOverflow;
        lenis?.start();
        isModalOpenRef.current = false;
      };
    }
  }, [selectedProject]);

  // Close paper modal with physical crumple-in animation then unmount
  const handleClosePaper = useCallback(() => {
    setIsClosingPaper(true);
    // Give the PaperCrumple crumple animation (crumpleDuration=0.48s) time to
    // visually complete before unmounting the modal entirely.
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosingPaper(false);
    }, 600);
  }, []);

  // Keyboard navigation & close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        handleClosePaper();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, handleClosePaper]);

  // Cycle through next/prev project inside unfolded paper modal
  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = projectsData.findIndex((p) => p.number === selectedProject.number);
    const nextIndex = (currentIndex + 1) % projectsData.length;
    setSelectedProject(projectsData[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = projectsData.findIndex((p) => p.number === selectedProject.number);
    const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    setSelectedProject(projectsData[prevIndex]);
  };

  return (
    <div
      ref={scrollTrackRef}
      className="relative w-full min-h-[300vh] sm:min-h-[320vh]"
    >
      {/* =========================================================================
          PINNED / STATIC VIEWPORT STAGE:
          The entire jar frame remains completely static in the viewport while
          coins drop in. Once all 4 coins have dropped, the pin naturally releases
          and the frame moves with scrolling to the next section.
          ========================================================================= */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center px-4 sm:px-8 py-5 sm:py-7 select-none z-20 overflow-hidden">
        
        {/* =========================================================================
            HEADER SECTION (Integrated inside the pinned stage)
            ========================================================================= */}
        <div className="w-full max-w-4xl flex flex-col items-center text-center z-30 pt-2">
          
          {/* Eyebrow */}
          <div className="flex items-center justify-center space-x-3 mb-1.5">
            <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-[#8C6D4F]/40 to-[#D4AF37]/80" />
            <span
              className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-[#D4AF37]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              02 / SELECTED WORK
            </span>
            <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
          </div>

          {/* Section Headline */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight uppercase leading-[0.9] select-none text-center mb-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#8C7A6B]">
              SELECTED WORKS //{' '}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#704F22]">
              PROJECT VAULT
            </span>
          </h2>

          {/* Dynamic Scroll Progression & Live Status Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-1">
            <div className="flex items-center space-x-2 text-[10.5px] font-mono tracking-wider uppercase">
              <span
                className={`w-2 h-2 rounded-full ${
                  coinsDropped === 4 ? 'bg-emerald-400' : 'bg-[#D4AF37] animate-pulse'
                }`}
              />
              <span className="text-[#E8DFD8]">
                {coinsDropped === 4
                  ? '✓ ALL 4 COINS DEPOSITED • FRAME RELEASING'
                  : `DEPOSITING PROJECT COINS: ${coinsDropped} / ${projectsData.length}`}
              </span>
            </div>

            {/* Instruction Badge */}
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#D4AF37] bg-black/60 border border-[#8C6D4F]/40 px-3 py-1 rounded-full backdrop-blur-md">
              {coinsDropped < 4 ? (
                <>
                  <ArrowDown className="w-3 h-3 text-[#D4AF37] animate-bounce" />
                  <span>SCROLL DOWN TO DROP REMAINING COINS</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>TAP COIN TO UNFOLD • SCROLL TO ADVANCE SECTION</span>
                </>
              )}
            </div>

            {coinsDropped === 4 && (
              <button
                type="button"
                onClick={() => {
                  setCoinsDropped(0);
                  setTimeout(() => setCoinsDropped(4), 120);
                }}
                className="flex items-center space-x-1.5 text-[9.5px] font-mono text-[#C4B5A5] hover:text-[#D4AF37] border border-[#8C6D4F]/30 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md transition-all cursor-pointer hover:border-[#D4AF37]"
                title="Replay coin drop physics"
              >
                <RotateCcw className="w-3 h-3 text-[#D4AF37]" />
                <span>REPLAY DROP</span>
              </button>
            )}
          </div>

          {/* Subtle scroll progress line */}
          <div className="w-48 sm:w-64 h-[2px] bg-[#8C6D4F]/20 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8C6D4F] to-[#D4AF37] transition-all duration-150"
              style={{ width: `${Math.min(100, (coinsDropped / 4) * 100)}%` }}
            />
          </div>
        </div>

        {/* =========================================================================
            CENTRAL GLASS JAR ENCLOSURE
            ========================================================================= */}
        <div className="glass-jar-pinned-stage relative flex flex-col items-center justify-center my-auto">
          
          {/* Ambient Radial Golden Aura behind Jar */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[460px] h-[460px] bg-[radial-gradient(circle,rgba(212,175,55,0.18)_0%,rgba(140,109,79,0.08)_45%,transparent_70%)] blur-2xl pointer-events-none" />

          {/* The Glass Jar Body */}
          <div
            className={`glass-jar w-[280px] sm:w-[340px] md:w-[370px] h-[350px] sm:h-[400px] relative overflow-visible z-10 flex flex-col justify-end p-5 ${
              jarShakeActive ? 'jar-shake-active' : ''
            }`}
          >
            {/* Glass Neck & Lip Rim */}
            <div className="glass-jar-neck">
              <div className="glass-jar-lip" />
            </div>

            {/* Specular Light Reflection Stripes */}
            <div className="glass-reflection-left" />
            <div className="glass-reflection-right" />
            <div className="glass-bottom-base" />

            {/* Impact Caustic Ripple upon Coin Landing */}
            {impactRippleActive && <div className="glass-impact-ripple" />}

            {/* Empty Jar Prompt */}
            {coinsDropped === 0 && (
              <div
                onClick={() => {
                  setCoinsDropped(4);
                  playCoinDropAudio();
                  setImpactRippleActive(true);
                  setJarShakeActive(true);
                  setTimeout(() => setImpactRippleActive(false), 750);
                  setTimeout(() => setJarShakeActive(false), 350);
                }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 cursor-pointer group"
                title="Click to drop project coins into jar"
              >
                <Sparkles className="w-6 h-6 text-[#D4AF37]/60 mb-2 animate-pulse group-hover:scale-110 transition-transform" />
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C4B5A5] group-hover:text-[#D4AF37] transition-colors">
                  EMPTY GLASS JAR
                </p>
                <p className="text-[10px] text-[#A8988B] font-light mt-1">
                  Scroll down or click to drop project coins into the jar...
                </p>
              </div>
            )}

            {/* Coins Settled inside Jar Floor */}
            <div className="relative w-full h-[210px] flex items-center justify-center z-20 pointer-events-auto">
              {projectsData.map((project, idx) => {
                const isDropped = coinsDropped > idx;
                const isHovered = hoveredCoinIndex === idx;

                if (!isDropped) return null;

                return (
                  <div
                    key={project.number}
                    onClick={() => setSelectedProject(project)}
                    onMouseEnter={() => setHoveredCoinIndex(idx)}
                    onMouseLeave={() => setHoveredCoinIndex(null)}
                    style={{
                      bottom: '0px',
                      left: 'calc(50% - 44px)',
                      zIndex: 25 + idx,
                      ['--rest-x' as string]: `${project.coinRestPosition.x}px`,
                      ['--rest-y' as string]: `${project.coinRestPosition.y}px`,
                      ['--rest-rot' as string]: `${project.coinRestPosition.rotate}deg`,
                      animation: `coinDropPhysics 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.25) forwards`,
                    }}
                    className="project-coin-item w-[84px] sm:w-[90px] h-[84px] sm:h-[90px] group"
                  >
                    {/* 3D Coin Edge Layer */}
                    <div className="coin-3d-edge" />

                    {/* Coin Body Face with Rich Metallic Finish */}
                    <div
                      className={`w-full h-full rounded-full bg-gradient-to-br ${project.coinTone.base} p-1 shadow-[0_10px_25px_rgba(0,0,0,0.9)] flex items-center justify-center relative overflow-hidden`}
                    >
                      <div className="coin-metallic-rim" />
                      <div className="coin-inner-ridges" />
                      <div className="coin-shimmer" />

                      {/* Stamped Project Details on Coin Face */}
                      <div className="relative z-10 flex flex-col items-center justify-center text-center">
                        <span className="text-[8.5px] font-mono tracking-widest text-[#241B0F] font-bold uppercase">
                          PROJ
                        </span>
                        <span
                          className="text-2xl sm:text-[25px] font-bold text-[#140E06] leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {project.number}
                        </span>
                        <span className="text-[8px] font-mono uppercase text-[#3D2C13] tracking-wider truncate max-w-[64px] font-semibold">
                          {project.title.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Hover Prompt Tooltip */}
                    {isHovered && (
                      <div className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-[#14100D] border border-[#D4AF37] rounded-md shadow-2xl text-[10px] font-mono text-[#FFF2D6] z-50 pointer-events-none flex items-center space-x-1.5 animate-fadeIn">
                        <Eye className="w-3 h-3 text-[#D4AF37]" />
                        <span>UNFOLD: {project.title}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Grounding Shadow */}
          <div className="glass-jar-shadow" />
        </div>

        {/* =========================================================================
            BOTTOM PROJECT DRAWER & CONTROLS
            ========================================================================= */}
        <div className="w-full max-w-3xl z-30 pb-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {projectsData.map((project, idx) => {
              const isDropped = coinsDropped > idx;
              return (
                <button
                  key={project.number}
                  type="button"
                  onClick={() => {
                    setCoinsDropped((prev) => Math.max(prev, idx + 1));
                    setSelectedProject(project);
                  }}
                  className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg border text-left transition-all duration-300 cursor-pointer ${
                    isDropped
                      ? 'border-[#8C6D4F]/40 bg-[#14100D]/85 hover:border-[#D4AF37] hover:bg-[#1A1510] shadow-md'
                      : 'border-[#8C6D4F]/20 bg-[#0E0C0A]/60 opacity-60'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFE073] to-[#8C6D4F] flex items-center justify-center text-[10px] font-bold text-[#140E06]">
                    {project.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[11px] font-medium text-[#E8DFD8] truncate">
                      {project.title}
                    </span>
                    <span className="block text-[9px] font-mono text-[#A8988B] truncate">
                      {isDropped ? 'IN JAR • TAP' : 'PENDING'}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8C6D4F]">↗</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* =========================================================================
          REALISTIC 3D PHYSICAL PAPER CRUMPLE & UNFOLD POPUP (PORTAL TO DOCUMENT.BODY)
          Positioned mathematically dead-center in viewport; immune to parent layout!
          ========================================================================= */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <div
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md select-none overflow-y-auto"
                onClick={handleClosePaper}
              >
                {/* Floating Content Wrapper - Only the 3D Paper & Floating Minimal HUD */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 25 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative flex flex-col items-center justify-center my-auto"
                  style={{ width: `${Math.max(paperWidth, 340)}px`, maxWidth: '96vw' }}
                >
                  {/* Floating Top Header Bar */}
                  <div className="flex items-center justify-between w-full mb-3 px-1 select-none">
                    <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#8C6D4F]/40 shadow-xl">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                      <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                        ARCHIVAL SPEC // {selectedProject.number}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        type="button"
                        onClick={handlePrevProject}
                        aria-label="Previous project"
                        className="p-2 rounded-full border border-[#8C6D4F]/40 bg-black/75 backdrop-blur-md text-[#C4B5A5] hover:text-[#FFF2D6] hover:border-[#D4AF37] transition-all cursor-pointer shadow-md"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextProject}
                        aria-label="Next project"
                        className="p-2 rounded-full border border-[#8C6D4F]/40 bg-black/75 backdrop-blur-md text-[#C4B5A5] hover:text-[#FFF2D6] hover:border-[#D4AF37] transition-all cursor-pointer shadow-md"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleClosePaper}
                        className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-[#8C6D4F]/45 bg-black/80 backdrop-blur-md text-[#F7E7C4] hover:bg-[#2B2015] hover:border-[#D4AF37] text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-lg ml-1"
                      >
                        <X className="w-4 h-4 text-[#D4AF37]" />
                        <span>FOLD &amp; CLOSE</span>
                      </button>
                    </div>
                  </div>

                  {/* Pure 3D Physical Paper - Completely frameless, floats in space */}
                  <div className="relative w-full flex items-center justify-center">
                    <Suspense
                      fallback={
                        <div
                          className="w-full"
                          style={{ height: paperSceneHeight }}
                          role="status"
                          aria-label="Loading project preview"
                        />
                      }
                    >
                      <PaperCrumple
                        key={selectedProject.number}
                        src={getProjectBlueprintUrl(selectedProject)}
                        alt={selectedProject.title}
                        width={paperWidth}
                        height={paperHeight}
                        sceneHeight={paperSceneHeight}
                        releaseBehavior="creased"
                        crumpleAmount={0.88}
                        crumpleDuration={0.48}
                        releaseDuration={0.42}
                        foldCount={6}
                        foldSharpness={0.65}
                        wrinkleDepth={0.65}
                        creaseStrength={0.2}
                        paperColor={selectedProject.paperBg}
                        paperTexture={0.08}
                        draggable={true}
                        returnToOrigin={true}
                        initialCrumple={true}
                        isClosing={isClosingPaper}
                        shadow={true}
                        shadowOpacity={0.25}
                      />
                    </Suspense>
                  </div>

                  {/* Floating Action Links & Live Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3 select-none">
                    {selectedProject.liveUrl && selectedProject.liveUrl !== '#contact' && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F2D] text-[#140E06] hover:brightness-110 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.25)] cursor-pointer"
                      >
                        <span>VISIT LIVE SYSTEM</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {selectedProject.githubUrl && selectedProject.githubUrl !== '#contact' && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-[#8C6D4F]/40 bg-black/70 backdrop-blur-md hover:bg-[#1A1510] hover:border-[#D4AF37] text-[#E8DFD8] transition-all text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer shadow-lg"
                      >
                        <SiGithub className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>REPOSITORY</span>
                      </a>
                    )}

                    {selectedProject.githubUrl === '#contact' && (
                      <a
                        href="#contact"
                        onClick={handleClosePaper}
                        className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F2D] text-[#140E06] hover:brightness-110 hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.25)] cursor-pointer"
                      >
                        <span>INQUIRE / ARCHITECTURE SPECS</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Drag & Unfold Hint */}
                  <div className="flex items-center justify-center space-x-1.5 mt-2 text-[9.5px] font-mono text-[#D4AF37]/90 tracking-wider uppercase select-none">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>HOLD &amp; DRAG TO CRUMPLE • RELEASE TO UNFOLD</span>
                  </div>
                </motion.div>
              </div>

            )}
          </AnimatePresence>,
          document.body
        )}

    </div>
  );
};

export default GlassJarProjects;
