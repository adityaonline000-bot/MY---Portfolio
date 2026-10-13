// src/components/ContactSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Magnetic from './motion/Magnetic';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${formData.name} (via adityayadav.space)`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nProject Scope & Requirements:\n${formData.message}\n`
    );
    window.location.href = `mailto:adityaonline000@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      data-scroll-type="scene"
      data-scroll-section
      className="cinematic-section relative w-full min-h-[100svh] bg-black/60 backdrop-blur-sm text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-20 sm:py-24 lg:py-28 px-4 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center border-t border-[#D4AF37]/20 shadow-[0_-20px_50px_rgba(0,0,0,0.95)]"
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
            className="relative w-full rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806] p-5 xs:p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Top Gold Horizon Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            
            {/* Precision Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/60" />

            {sent ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#D4AF37] text-[#D4AF37] text-lg bg-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                  ✓
                </div>
                <h3 className="text-3xl text-white font-normal uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  TRANSMISSION DISPATCHED
                </h3>
                <p className="text-xs text-[#A8988B] font-light max-w-md mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Your email client has been prepared with your inquiry details. If it did not launch automatically, tap below or reach out directly on WhatsApp.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <a
                    href={`mailto:adityaonline000@gmail.com?subject=${encodeURIComponent(`Project Inquiry: ${formData.name}`)}&body=${encodeURIComponent(formData.message)}`}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 min-h-[44px] rounded-sm border border-[#D4AF37] bg-[#D4AF37]/15 text-[#F7E7C4] text-xs font-mono uppercase tracking-wider hover:bg-[#D4AF37]/25 transition-colors"
                  >
                    <span>Open Mail Client ↗</span>
                  </a>
                  <a
                    href="https://wa.me/919519429362"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 min-h-[44px] rounded-sm border border-[#8C6D4F]/50 bg-[#120F0C] text-[#E8DFD8] text-xs font-mono uppercase tracking-wider hover:border-[#D4AF37] transition-colors"
                  >
                    <span>Chat on WhatsApp ↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 min-h-[44px] rounded-sm border border-[#8C6D4F]/30 text-[#8C6D4F] text-xs font-mono uppercase tracking-wider hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-sender-name" className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2 cursor-pointer">
                      // SENDER
                    </label>
                    <input
                      id="contact-sender-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      className="w-full min-h-[44px] bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-sender-email" className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2 cursor-pointer">
                      // CHANNEL
                    </label>
                    <input
                      id="contact-sender-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                      className="w-full min-h-[44px] bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-sender-message" className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2 cursor-pointer">
                    // PROJECT DETAILS &amp; INQUIRY
                  </label>
                  <textarea
                    id="contact-sender-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, system requirements, or timeline..."
                    className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 p-4 outline-none rounded-sm transition-colors resize-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                <Magnetic strength={0.15} className="w-full">
                  <button
                    type="submit"
                    data-cursor="send"
                    className="w-full min-h-[48px] py-3.5 border border-[#8C6D4F]/50 bg-[#14100D] hover:border-[#D4AF37] hover:bg-[#1A1510] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] text-[#E8DFD8] hover:text-[#F7E7C4] text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    SEND TRANSMISSION ↗
                  </button>
                </Magnetic>

              </form>
            )}
          </motion.div>
        </div>

        {/* Direct Channels Strip */}
        <div className="max-w-2xl mx-auto w-full mt-6 flex flex-wrap items-center justify-between gap-3 px-2 text-[11px] font-mono text-[#8C6D4F]">
          <a
            href="mailto:adityaonline000@gmail.com"
            className="hover:text-[#D4AF37] transition-colors inline-flex items-center space-x-1.5 min-h-[40px] py-2"
          >
            <span>✉ adityaonline000@gmail.com</span>
          </a>
          <a
            href="https://wa.me/919519429362"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition-colors inline-flex items-center space-x-1.5 min-h-[40px] py-2"
          >
            <span>💬 +91 95194 29362</span>
          </a>
          <span className="text-[#8C6D4F]/70 py-2">Typical response &lt; 24h</span>
        </div>

        {/* System Footer Line */}
        <div className="pt-12 mt-12 border-t border-[#8C6D4F]/15 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
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
