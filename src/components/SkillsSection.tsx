import React from 'react';
import { motion } from 'framer-motion';
import { StickyScroll, type StickyScrollItem } from './ui/sticky-scroll-reveal';
import OrbitingSkills from './ui/orbiting-skills';

const stickyCapabilities: StickyScrollItem[] = [
  {
    title: 'AI PRODUCT DEVELOPMENT & VISION',
    badge: 'CORE PILLAR',
    stat: 'AI & ML SYSTEMS',
    description:
      'Building practical AI-powered applications and intelligent systems for real-world use cases—including face analysis, active liveness verification, deepfake detection, intelligent dashboards, and AI agents.',
    items: [
      'Computer Vision',
      'OpenCV',
      'MediaPipe',
      'Deepfake Detection',
      'Face Analysis',
      'AI Agents',
      'Python',
      'FastAPI',
    ],
    content: (
      <div className="relative flex flex-col justify-between h-full w-full p-6 bg-gradient-to-br from-[#15120E] via-[#0E0C0A] to-[#000000] text-white">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">
              AI_VISION // ENGINE ACTIVE
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#8C6D4F]">v2.6.4</span>
        </div>
        <div className="my-auto space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#A8988B]">Liveness Verification</span>
            <span className="text-emerald-400 font-semibold">99.8% PASS</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-[#D4AF37] to-emerald-400 h-full w-[99.8%]" />
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#A8988B]">Deepfake Detection</span>
            <span className="text-[#D4AF37] font-semibold">AUTHENTIC</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#F3DBB3] h-full w-[96.4%]" />
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#A8988B]">Face Mesh Landmarks</span>
            <span className="text-cyan-400 font-semibold">468 PTS / 60 FPS</span>
          </div>
        </div>
        <div className="pt-3 border-t border-[#8C6D4F]/20 flex items-center justify-between text-[10px] font-mono text-[#8C6D4F]">
          <span>OPENCV + MEDIAPIPE</span>
          <span className="text-[#D4AF37]">FASTAPI RUNTIME</span>
        </div>
      </div>
    ),
  },
  {
    title: 'FULL-STACK SYSTEMS',
    badge: 'END-TO-END',
    stat: 'PRODUCTION READY',
    description:
      'Designing and developing complete web products from interactive frontend interfaces to resilient backend systems, secure APIs, databases, and production deployments.',
    items: ['React.js', 'Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'MySQL', 'REST APIs'],
    content: (
      <div className="relative flex flex-col justify-between h-full w-full p-6 bg-gradient-to-br from-[#111318] via-[#0B0D12] to-[#000000] text-white">
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-cyan-400">
              SYSTEM_ARCHITECTURE // DISTRIBUTED
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-300/60">REST &amp; SQL</span>
        </div>
        <div className="my-auto space-y-2.5 font-mono text-xs">
          <div className="p-2.5 rounded bg-black/40 border border-cyan-500/20">
            <div className="flex justify-between text-[11px] text-[#A8988B]">
              <span>GET /api/v1/auth/verify</span>
              <span className="text-emerald-400">200 OK (8ms)</span>
            </div>
          </div>
          <div className="p-2.5 rounded bg-black/40 border border-cyan-500/20">
            <div className="flex justify-between text-[11px] text-[#A8988B]">
              <span>POST /api/v1/cluster/sync</span>
              <span className="text-cyan-400">STREAMING</span>
            </div>
          </div>
          <div className="flex justify-between text-[11px] text-[#A8988B] pt-1 px-1">
            <span>Uptime SLA</span>
            <span className="text-emerald-400 font-semibold">99.98% High Availability</span>
          </div>
        </div>
        <div className="pt-3 border-t border-cyan-500/20 flex items-center justify-between text-[10px] font-mono text-cyan-400/80">
          <span>REACT + NODE + TYPESCRIPT</span>
          <span>MONGODB / MYSQL</span>
        </div>
      </div>
    ),
  },
  {
    title: 'WORKFLOW AUTOMATION',
    badge: 'OPERATIONS',
    stat: 'EFFICIENCY ENGINE',
    description:
      'Designing automated workflows that eliminate repetitive manual work and seamlessly connect business operations with modern AI tools and third-party services.',
    items: ['n8n', 'AI Workflows', 'API Automation', 'Process Automation', 'Lead Pipelines'],
    content: (
      <div className="relative flex flex-col justify-between h-full w-full p-6 bg-gradient-to-br from-[#1A0E18] via-[#100914] to-[#000000] text-white">
        <div className="flex items-center justify-between border-b border-pink-500/30 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-pink-400">
              N8N_PIPELINE // AUTOMATED DISPATCH
            </span>
          </div>
          <span className="text-[10px] font-mono text-pink-300/60">0ms DELAY</span>
        </div>
        <div className="my-auto space-y-2.5">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">Webhook</span>
            <span className="text-[#8C6D4F]">→</span>
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">AI Classifier</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-[#8C6D4F] pl-6">↳</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">CRM Sync</span>
            <span className="text-[#8C6D4F]">→</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Slack Dispatch</span>
          </div>
          <div className="pt-2 flex justify-between text-[11px] font-mono text-[#A8988B]">
            <span>Repetitive Task Reduction</span>
            <span className="text-pink-400 font-semibold">-85% Human Hours</span>
          </div>
        </div>
        <div className="pt-3 border-t border-pink-500/20 flex items-center justify-between text-[10px] font-mono text-pink-400/80">
          <span>AI AGENTS &amp; APIS</span>
          <span>LEAD AUTOMATION</span>
        </div>
      </div>
    ),
  },
  {
    title: 'SAAS & DIGITAL EXPERIENCES',
    badge: 'BUSINESS VALUE',
    stat: 'BUSINESS TRACTION',
    description:
      'Building custom business software, operational dashboards, client portals, and premium conversion-focused web experiences that turn operational requirements into working technology.',
    items: [
      'SaaS Platforms',
      'Management Systems',
      'Client Portals',
      'Internal Tools',
      'UI/UX Design',
      'Vercel',
    ],
    content: (
      <div className="relative flex flex-col justify-between h-full w-full p-6 bg-gradient-to-br from-[#161208] via-[#0E0B05] to-[#000000] text-white">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37]">
              SAAS_PLATFORM // NXTAURA STACK
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#8C6D4F]">PRODUCTION</span>
        </div>
        <div className="my-auto space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#A8988B]">User Conversion Lift</span>
            <span className="text-[#D4AF37] font-semibold">+340% ENGAGEMENT</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-[#8C6D4F] to-[#D4AF37] h-full w-[88%]" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A8988B]">Core Web Vitals</span>
            <span className="text-emerald-400 font-semibold">99/100 SPEED INDEX</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A8988B]">Client Portals &amp; CRM</span>
            <span className="text-[#F3DBB3] font-semibold">ENTERPRISE READY</span>
          </div>
        </div>
        <div className="pt-3 border-t border-[#8C6D4F]/20 flex items-center justify-between text-[10px] font-mono text-[#8C6D4F]">
          <span>TAILWIND + VERCEL</span>
          <span className="text-[#D4AF37]">CONVERSION-FOCUSED</span>
        </div>
      </div>
    ),
  },
];

interface TechCategory {
  title: string;
  items: string[];
}

const techCategories: TechCategory[] = [
  {
    title: 'LANGUAGES',
    items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'HTML', 'CSS'],
  },
  {
    title: 'FRONTEND',
    items: ['React.js'],
  },
  {
    title: 'BACKEND',
    items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs'],
  },
  {
    title: 'DATABASE',
    items: ['MongoDB', 'MySQL'],
  },
  {
    title: 'AI / COMPUTER VISION',
    items: [
      'OpenCV',
      'MediaPipe',
      'Machine Learning',
      'Computer Vision',
      'Deepfake Detection',
      'Face Analysis',
    ],
  },
  {
    title: 'AUTOMATION',
    items: ['n8n', 'AI Workflows'],
  },
  {
    title: 'DEPLOYMENT / TOOLS',
    items: ['Git', 'GitHub', 'Vercel', 'Hostinger', 'VS Code'],
  },
];


export const SkillsSection: React.FC = () => {
  return (
    <section
      id="capabilities"
      data-scroll-type="content"
      data-scroll-section
      className="cinematic-section relative w-full min-h-[100svh] h-auto bg-black/60 backdrop-blur-sm text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-16 sm:py-20 lg:py-24 px-4 sm:px-12 lg:px-20 overflow-visible flex flex-col justify-center border-t border-[#D4AF37]/20 shadow-[0_-20px_50px_rgba(0,0,0,0.95)]"
    >
      <span id="skills" className="sr-only" />
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[34rem] h-[34rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-[#8C6D4F]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header - Centered */}
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
            03 / CAPABILITIES &amp; TECH MATRIX
          </span>
          <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-12 max-w-4xl mx-auto"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none mb-4 text-center"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              WHAT I BUILD.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              SOLUTIONS DELIVERED.
            </span>
          </h2>
          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-xl leading-relaxed text-center mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Scroll through the capability matrix below to explore architecture pillars, tech stacks, and live interactive system previews.
          </p>
        </motion.div>

        {/* Sticky Scroll Reveal Capabilities */}
        <div className="mb-14">
          <StickyScroll content={stickyCapabilities} />
        </div>

        {/* ================================================================= */}
        {/* PRODUCTION TECH STACK — EDITORIAL ARCHITECTURE CATALOGUE         */}
        {/* ================================================================= */}
        <div className="mt-20 sm:mt-24 lg:mt-28 w-full relative">
          {/* Section Header with integrated thin gold horizontal dividers */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mb-10 sm:mb-14"
          >
            {/* Top Hairline Accent Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-[1px] bg-gradient-to-r from-[#C9A45C]/45 via-[#8C6D4F]/30 to-[#C9A45C]/15 origin-left"
            />

            {/* Header Content Row */}
            <div className="py-4 sm:py-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              {/* Left Label */}
              <div className="flex items-center space-x-2">
                <span
                  className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.22em] uppercase text-[#C9A45C]"
                  style={{ fontFamily: "'Montserrat', monospace" }}
                >
                  // PRODUCTION TECH STACK
                </span>
              </div>

              {/* Right Meta Indicator */}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#8C6D4F]"
                style={{ fontFamily: "'Montserrat', monospace" }}
              >
                CURATED &amp; DEPLOYED
              </motion.span>
            </div>

            {/* Bottom Hairline Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-[1px] bg-gradient-to-r from-[#C9A45C]/35 via-[#8C6D4F]/20 to-transparent origin-left"
            />
          </motion.div>

          {/* Main Grid: Orbiting Ecosystem on Left + Curated Tech Chips Matrix on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Interactive Orbiting Tech Ecosystem Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 rounded-[8px] border border-[#C9A45C]/20 bg-[#0E0B08]/75 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.7)] relative overflow-hidden group"
            >
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute inset-0 bg-radial from-[#C9A45C]/[0.05] via-transparent to-transparent pointer-events-none" />

              <div className="flex items-center space-x-2 mb-2 select-none z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] animate-pulse" />
                <span
                  className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#C9A45C]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  ACTIVE SYSTEM ORBITS
                </span>
              </div>

              {/* The Live Interactive Orbiting Animation */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <OrbitingSkills />
              </div>

              <span className="text-[9px] font-mono text-[#8C6D4F] mt-2 text-center tracking-[0.18em] uppercase select-none z-10">
                TOUCH / HOVER TO PAUSE ORBIT DYNAMICS
              </span>
            </motion.div>

            {/* Curated Tech Stack Matrix */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 sm:gap-y-8">
              {techCategories.map((group, groupIdx) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{
                    duration: 0.55,
                    delay: groupIdx * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col space-y-2.5"
                >
                  {/* Category Title */}
                  <span
                    className="text-[10.5px] font-medium tracking-[0.2em] uppercase text-[#C9A45C] block select-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {group.title}
                  </span>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, itemIdx) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: groupIdx * 0.03 + itemIdx * 0.015,
                          ease: 'easeOut',
                        }}
                        whileHover={{
                          y: -2,
                          transition: { duration: 0.2, ease: 'easeOut' },
                        }}
                        className="px-3 py-1.5 text-xs font-mono tracking-wide rounded-[5px] border border-[#C9A45C]/22 bg-[#0E0B08]/85 text-[#E8DFD8] hover:border-[#C9A45C]/65 hover:bg-[#C9A45C]/[0.08] hover:text-[#FFF7ED] hover:shadow-[0_4px_18px_rgba(201,164,92,0.15)] transition-all duration-200 cursor-default select-none"
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default SkillsSection;