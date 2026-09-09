import React from 'react';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import Magnetic from './motion/Magnetic';
import { Meteors } from './ui/meteors';

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  tech: string[];
  metrics: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    number: '01',
    title: 'SmartFaceGuard',
    category: 'AI / IDENTITY VERIFICATION PLATFORM',
    description:
      'A browser-based identity verification platform combining real-time face detection, active liveness verification (blink and head pose analysis), authenticity scoring, and deepfake detection into a single AI-powered authentication workflow.',
    githubUrl: '#contact',
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
  },
];


export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      data-scroll-type="content"
      data-scroll-section
      className="cinematic-section projects-section relative w-full min-h-[100svh] h-auto bg-black/60 backdrop-blur-sm text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-20 sm:py-24 lg:py-28 px-6 sm:px-12 lg:px-20 flex flex-col justify-start overflow-visible border-t border-[#D4AF37]/20 shadow-[0_-20px_50px_rgba(0,0,0,0.95)]"
    >
      <span id="work" className="sr-only" />
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
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
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            02 / SELECTED WORK
          </span>
          <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16 max-w-4xl mx-auto"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none text-center mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              SELECTED WORKS.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              ENGINEERED VALUE.
            </span>
          </h2>

          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-md leading-relaxed text-center mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Scroll down to unfold the system architecture cards. Each platform was built to solve complex challenges and deliver tangible outcomes.
          </p>
        </motion.div>

        {/* React Bits Stacking Deck */}
        <ScrollStack
          itemDistance={20}
          itemScale={0.035}
          itemStackDistance={28}
          stackPosition="15%"
          scaleEndPosition="6%"
          baseScale={0.88}
          useWindowScroll={true}
        >
          {projects.map((project) => (
            <ScrollStackItem key={project.title}>
              <div className="relative w-full group">
                {/* Meteors Ambient Radiant Glow Backdrop */}
                <div className="absolute inset-0 h-full w-full scale-[0.85] transform rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#8C6D4F]/25 to-[#C9A45C]/15 blur-3xl pointer-events-none opacity-75 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Meteor Card Container */}
                <div
                  data-cursor="view"
                  className="relative w-full rounded-2xl border border-[#8C6D4F]/50 bg-[#0E0C0A]/95 backdrop-blur-xl p-6 sm:p-10 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.98)] overflow-hidden transition-colors duration-500 hover:border-[#D4AF37]"
                >
                  {/* Top Gold Border Light Flare */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent z-20" />

                  {/* Corner Minimal L-Brackets */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors z-20" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors z-20" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors z-20" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors z-20" />

                  {/* Big Background Watermark Number */}
                  <span
                    className="absolute -bottom-6 -right-3 text-8xl sm:text-9xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none z-0"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {project.number}
                  </span>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                    
                    {/* Left Column (7 Cols) */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Meteor Badge & Category Tag */}
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-[#16120E] shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-3 w-3 text-[#F7E7C4]"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                              />
                            </svg>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#D4AF37]">
                            {project.number} //
                          </span>
                          <span className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#A8988B]">
                            {project.category}
                          </span>
                        </div>

                        <h3
                          className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-2 group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.9]"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {project.title}
                        </h3>

                        {project.liveUrl && (
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 underline underline-offset-4 tracking-wider flex items-center space-x-1.5 transition-colors"
                            >
                              <span>{project.liveUrl.replace(/^https?:\/\//, '')}</span>
                              <span className="text-xs">↗</span>
                            </a>
                          </div>
                        )}

                        <p
                          className="text-xs sm:text-sm md:text-[14px] font-light text-[#BDB0A4] leading-[1.85] tracking-wide mb-8 max-w-2xl"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-[#8C6D4F]/25">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] group-hover:border-[#D4AF37]/50 transition-all duration-300"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Column (5 Cols) */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:border-l lg:border-[#8C6D4F]/25">
                      <div className="space-y-3">
                        <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] block mb-2">
                          // ARCHITECTURE METRICS
                        </span>
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="p-3.5 rounded-sm border border-[#8C6D4F]/25 bg-[#050403] flex items-center justify-between"
                          >
                            <span className="text-[10px] font-mono text-[#A8988B]">
                              {m.label}
                            </span>
                            <span className="text-[11px] font-mono font-medium text-[#F7E7C4]">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Magnetic strength={0.2} className="w-full">
                        <a
                          href={project.liveUrl || project.githubUrl}
                          target={(project.liveUrl || project.githubUrl).startsWith('http') ? '_blank' : undefined}
                          rel={(project.liveUrl || project.githubUrl).startsWith('http') ? 'noopener noreferrer' : undefined}
                          data-cursor="view"
                          className="w-full inline-flex items-center justify-center space-x-3 px-6 py-3.5 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          <span>{project.liveUrl ? 'VISIT LIVE WEBSITE' : 'VIEW SYSTEM DETAILS'}</span>
                          <span className="text-xs">↗</span>
                        </a>
                      </Magnetic>
                    </div>


                  </div>

                  {/* Meteor Effect Animation Layer */}
                  <Meteors
                    number={26}
                    spread={1200}
                    className="bg-[#EAD8C7] shadow-[0_0_0_1px_rgba(212,175,55,0.25)] before:from-[#D4AF37] before:to-transparent"
                  />
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

      </div>
    </section>
  );
};

export default ProjectsSection;