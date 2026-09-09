// src/components/ContactSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiGithub,
  SiInstagram,
  SiYoutube,
  SiWhatsapp,
  SiLeetcode,
  SiFacebook,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import Magnetic from './motion/Magnetic';

export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/adityaonline000-bot',
    icon: SiGithub,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/adityakvideos_',
    icon: SiInstagram,
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@adityakvideos-o4t',
    icon: SiYoutube,
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/919519429362',
    icon: SiWhatsapp,
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/Z1DC8b0Uy1/',
    icon: SiLeetcode,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/1cVbSwJTMR/',
    icon: SiFacebook,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/adityayadav001/',
    icon: FaLinkedin,
  },
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      data-scroll-type="scene"
      data-scroll-section
      className="cinematic-section relative w-full min-h-[100svh] bg-black/60 backdrop-blur-sm text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-20 sm:py-24 lg:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center border-t border-[#D4AF37]/20 shadow-[0_-20px_50px_rgba(0,0,0,0.95)]"
    >
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
            05 / CONTACT &amp; ENGAGEMENT
          </span>
          <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Headline - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-12 max-w-4xl mx-auto"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none text-center mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              START A PROJECT.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              LET&apos;S TALK.
            </span>
          </h2>
          <p
            className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-relaxed max-w-xl text-center mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Whether you need an AI-powered system, a full-stack platform, workflow automation, or want to discuss a venture engagement with NxtAura — reach out directly below.
          </p>
        </motion.div>

        {/* Centered Monolith Terminal Form */}
        <div className="max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Top Gold Horizon Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            
            {/* Precision Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/60" />

            {sent ? (
              <div className="py-16 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#D4AF37] text-[#D4AF37] text-sm">
                  ✓
                </div>
                <h3 className="text-3xl text-white font-normal uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  TRANSMISSION DELIVERED
                </h3>
                <p className="text-xs text-[#A8988B] font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Message registered successfully. I will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      // SENDER
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      // CHANNEL
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                      className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                    // PROJECT DETAILS &amp; INQUIRY
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, system requirements, or timeline..."
                    className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 p-4 outline-none rounded-sm transition-colors resize-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                <Magnetic strength={0.15} className="w-full">
                  <button
                    type="submit"
                    data-cursor="send"
                    className="w-full py-3.5 border border-[#8C6D4F]/50 bg-[#14100D] hover:border-[#D4AF37] hover:bg-[#1A1510] text-[#E8DFD8] hover:text-[#F7E7C4] text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    SEND TRANSMISSION ↗
                  </button>
                </Magnetic>

              </form>
            )}
          </motion.div>
        </div>

        {/* Direct Connections & Developer Profiles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 max-w-4xl mx-auto w-full"
        >
          {/* Section Indicator */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span
              className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#C4B5A5]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              DIRECT CHANNELS &amp; DEVELOPER PROFILES
            </span>
          </div>

          {/* Connection Cards / Tiles */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Magnetic key={social.name} strength={0.15}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="group flex items-center space-x-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-[#14100D]/80 border border-[#8C6D4F]/30 hover:border-[#D4AF37]/80 hover:bg-[#1D1713] transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <Icon className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                    <span
                      className="text-xs font-mono tracking-wide text-[#E8DFD8] group-hover:text-white transition-colors"
                    >
                      {social.name}
                    </span>
                    <span className="text-xs text-[#8C6D4F] group-hover:text-[#D4AF37] transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0">
                      ↗
                    </span>
                  </a>
                </Magnetic>
              );
            })}
          </div>
        </motion.div>

        {/* System Footer Line */}
        <div className="pt-16 mt-16 border-t border-[#8C6D4F]/15 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <span className="text-[10px] font-mono tracking-widest text-[#8C6D4F] uppercase">
            ADITYA YADAV // NXTAURA
          </span>
          <span className="text-[10px] font-mono text-[#8C6D4F]">
            © {new Date().getFullYear()} • FOUNDER, AI/ML &amp; FULL-STACK ENGINEER
          </span>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;