import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './motion/Magnetic';
import { useSectionScroll } from './motion/SectionScrollController';

interface NavbarProps {
  pathname?: string;
}

interface NavItem {
  name: string;
  targetId: string;
}

const navItems: NavItem[] = [
  { name: 'ABOUT', targetId: 'about' },
  { name: 'PROJECTS', targetId: 'projects' },
  { name: 'CAPABILITIES', targetId: 'capabilities' },
  { name: 'CONTENT', targetId: 'content' },
  { name: 'EXPERIENCE', targetId: 'experience' },
  { name: 'CONTACT', targetId: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ pathname = '/' }) => {
  const { activeSectionId, goToSection } = useSectionScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === '/' || pathname === '';

  // Synchronize active section with controller on home page
  useEffect(() => {
    if (isHome && activeSectionId) {
      setActiveSection(activeSectionId);
    }
  }, [isHome, activeSectionId]);

  // Track scroll position to toggle glassmorphic backdrop & detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      if (!isHome) {
        return;
      }

      // Detect active section on home page
      const sectionIds = ['hero', 'about', 'projects', 'capabilities', 'content', 'experience', 'contact'];
      const scrollThreshold = scrollY + 160;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollThreshold >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Smooth scroll handler using SectionScrollController
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (isHome) {
      goToSection(targetId);
    } else {
      // Internal page: Navigate back to home and scroll to section
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('pushstate'));

      setTimeout(() => {
        goToSection(targetId);
      }, 150);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-400 ease-out ${
          isScrolled
            ? 'bg-black/85 backdrop-blur-xl border-b border-[#D4AF37]/20 py-3.5 sm:py-4 px-6 sm:px-12 lg:px-16 shadow-[0_12px_35px_rgba(0,0,0,0.85)]'
            : 'bg-transparent border-b border-transparent py-5 sm:py-6 px-6 sm:px-12 lg:px-16'
        }`}
        style={{
          paddingTop: isScrolled
            ? 'max(0.875rem, env(safe-area-inset-top, 0px))'
            : 'max(1.25rem, env(safe-area-inset-top, 0px))',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          {/* Brand / Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            data-cursor="home"
            className="group flex items-center space-x-2 text-xs sm:text-sm tracking-[0.25em] font-medium uppercase text-[#EAD8C7] hover:text-[#D4AF37] transition-colors duration-300 select-none min-h-[44px]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span>ADITYA YADAV</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] opacity-80 group-hover:scale-125 transition-transform duration-300" />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-10 text-[11px] tracking-[0.28em] font-light uppercase text-[#C4B5A5]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {navItems.map((item) => {
              const isActive = isHome && activeSection === item.targetId;

              return (
                <a
                  key={item.name}
                  href={`#${item.targetId}`}
                  onClick={(e) => handleNavClick(e, item.targetId)}
                  data-cursor="explore"
                  className={`relative py-1 transition-colors duration-300 select-none ${
                    isActive ? 'text-[#FFF5EB] font-normal' : 'hover:text-[#FFF5EB]'
                  }`}
                >
                  {item.name}
                  {/* Subtle Gold Active / Hover Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ${
                      isActive
                        ? 'w-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.7)]'
                        : 'w-0 bg-[#D4AF37]/50 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Action (Magnetic Contact CTA) & Mobile Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                data-cursor="connect"
                className="group flex items-center space-x-2 text-[11px] tracking-[0.24em] font-light uppercase py-2 px-4 border border-[#8C6D4F]/50 hover:border-[#D4AF37] text-[#EAD8C7] transition-all duration-300 backdrop-blur-sm bg-black/40 hover:bg-[#D4AF37]/10 rounded-sm min-h-[44px]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span>CONTACT</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                  ↗
                </span>
              </a>
            </Magnetic>

            {/* Mobile Menu Toggle Button (44px min touch target) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="md:hidden flex flex-col items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 space-y-1.5 border border-[#8C6D4F]/40 bg-black/60 backdrop-blur-sm text-[#EAD8C7] rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
            >
              <span
                className={`block w-4 h-[1px] bg-[#D4AF37] transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-4 h-[1px] bg-[#D4AF37] transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-4 h-[1px] bg-[#D4AF37] transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="md:hidden fixed inset-0 top-[64px] bg-black/95 backdrop-blur-2xl z-40 px-6 py-6 sm:p-8 flex flex-col justify-between border-t border-[#D4AF37]/20 overflow-y-auto"
            style={{
              paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 0px))',
            }}
          >
            <nav className="flex flex-col space-y-4 pt-2" aria-label="Mobile Navigation">
              {navItems.map((item, idx) => {
                const isActive = isHome && activeSection === item.targetId;

                return (
                  <motion.a
                    key={item.name}
                    href={`#${item.targetId}`}
                    onClick={(e) => handleNavClick(e, item.targetId)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={`text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase transition-colors py-1 min-h-[44px] flex items-center ${
                      isActive ? 'text-[#D4AF37]' : 'text-[#E8DFD8] hover:text-[#D4AF37]'
                    }`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-[#8C6D4F]/30 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="flex items-center justify-center space-x-2 py-3 px-4 border border-[#D4AF37]/60 bg-[#D4AF37]/10 text-[#F7E7C4] text-xs font-mono tracking-widest uppercase rounded-sm min-h-[44px]"
                >
                  <span>GET IN TOUCH ↗</span>
                </a>
                <a
                  href="/resume.pdf"
                  download="Aditya_Yadav_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 py-3 px-4 border border-[#8C6D4F]/40 bg-black/50 text-[#C4B5A5] text-xs font-mono tracking-widest uppercase rounded-sm min-h-[44px]"
                >
                  <span>DOWNLOAD RESUME ↓</span>
                </a>
              </div>

              <div className="text-[10px] text-[#A8988B] font-mono flex items-center justify-between">
                <span>NXTAURA DIGITAL SYSTEM</span>
                <span className="text-[#D4AF37]">// ADITYA YADAV</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
