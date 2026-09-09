import React from 'react';
import Preloader from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContentCreationSection } from './components/ContentCreationSection';
import { ContactSection } from './components/ContactSection';
import { InternalPageLayout } from './components/InternalPageLayout';
import { GlobalSmoothScroll } from '@/components/ui/smooth-scroll';
import { CustomCursor } from './components/motion/CustomCursor';
import { PageTransition } from './components/motion/PageTransition';
import { SectionScrollProvider } from './components/motion/SectionScrollController';
import { usePathname } from './hooks/usePathname';
import SoftAurora from './components/SoftAurora';

function App() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';

  // Soft Aurora background is strictly active ONLY from About section to Contact section (NOT on Home Hero)
  const [showAurora, setShowAurora] = React.useState(!isHome);

  React.useEffect(() => {
    if (!isHome) {
      setShowAurora(true);
      return;
    }

    const checkAuroraVisibility = () => {
      const about = document.getElementById('about');
      const hero = document.getElementById('hero');
      if (about) {
        const aboutRect = about.getBoundingClientRect();
        // Activate as About section enters viewport
        setShowAurora(aboutRect.top <= window.innerHeight * 0.75);
      } else if (hero) {
        const heroRect = hero.getBoundingClientRect();
        // Hero has scrolled away
        setShowAurora(heroRect.bottom <= window.innerHeight * 0.3);
      }
    };

    window.addEventListener('scroll', checkAuroraVisibility, { passive: true });
    checkAuroraVisibility();

    const aboutEl = document.getElementById('about');
    let observer: IntersectionObserver | null = null;
    if (aboutEl) {
      observer = new IntersectionObserver(
        () => {
          checkAuroraVisibility();
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] }
      );
      observer.observe(aboutEl);
    }

    return () => {
      window.removeEventListener('scroll', checkAuroraVisibility);
      if (observer) observer.disconnect();
    };
  }, [isHome, pathname]);

  const renderInternalPage = () => {
    switch (pathname) {
      case '/about':
        return <AboutSection />;
      case '/projects':
      case '/work':
        return <ProjectsSection />;
      case '/capabilities':
      case '/skills':
        return <SkillsSection />;
      case '/content':
      case '/creator':
        return <ContentCreationSection />;
      case '/experience':
        return <ExperienceSection />;
      case '/contact':
        return <ContactSection />;
      default:
        // Any other internal/non-home route
        return (
          <>
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ContentCreationSection />
            <ExperienceSection />
            <ContactSection />
          </>
        );
    }
  };

  return (
    <>
      {/* INITIAL PAGE LOADING ANIMATION (Triggers on refresh & initial load) */}
      <Preloader />

      <GlobalSmoothScroll>
        <SectionScrollProvider enabled={isHome}>
          <div className="relative w-full min-h-screen bg-[#050403] text-[#E8DFD8] selection:bg-[#cbb59d] selection:text-black overflow-x-clip">
            {/* Global Desktop Spring Cursor */}
            <CustomCursor />

            {/* CINEMATIC HOME BACKGROUND (HOME HERO ONLY): Rich dark atmosphere with gold ambient glows */}
            {isHome && (
              <div
                className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-opacity duration-700 ${
                  showAurora ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {/* Deep Studio Ambient Gold Radial Crown */}
                <div className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[140vw] h-[1000px] bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.08)_0%,_rgba(140,109,79,0.035)_40%,_transparent_75%)]" />

                {/* Left Warm Amber Glow */}
                <div className="absolute top-1/4 -left-36 w-[38rem] h-[38rem] bg-[#D4AF37]/[0.035] rounded-full blur-[180px]" />

                {/* Right Cosmic Gold Glow */}
                <div className="absolute top-1/3 -right-36 w-[42rem] h-[42rem] bg-[#C99E5D]/[0.04] rounded-full blur-[200px]" />

                {/* Lower Center Bronze Depth */}
                <div className="absolute bottom-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#8C6D4F]/[0.025] rounded-full blur-[170px]" />

                {/* Subtle Luxury Constellation Grid Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_0.75px,_transparent_0.75px)] [background-size:48px_48px] opacity-[0.035]" />
              </div>
            )}

            {/* SOFT AURORA WEBGL BACKGROUND — APPLIED STRICTLY FROM ABOUT TO CONTACT */}
            <div
              className={`fixed inset-0 pointer-events-none z-[1] transition-opacity duration-1000 ease-out ${
                showAurora ? 'opacity-90' : 'opacity-0'
              }`}
            >
              <SoftAurora
                speed={0.6}
                scale={1.5}
                brightness={1}
                color1="#f7f7f7"
                color2="#e100ff"
                noiseFrequency={2.5}
                noiseAmplitude={1}
                bandHeight={0.5}
                bandSpread={1}
                octaveDecay={0.1}
                layerOffset={0}
                colorSpeed={1}
                enableMouseInteraction
                mouseInfluence={0.25}
                paused={!showAurora}
              />
              {/* Subtle dark tint overlay to keep perfect typographic contrast */}
              <div className="absolute inset-0 bg-[#050403]/30 pointer-events-none" />
            </div>

            {/* SITE CONTENT: Sits above background */}
            <div className="site-content relative z-10">
              {/* Global Sticky/Floating Luxury Navigation Bar */}
              <Navbar pathname={pathname} />

              <PageTransition pathname={pathname}>
                {isHome ? (
                  <>
                    <HeroSection />
                    <AboutSection />
                    <ProjectsSection />
                    <SkillsSection />
                    <ContentCreationSection />
                    <ExperienceSection />
                    <ContactSection />
                  </>
                ) : (
                  <InternalPageLayout pathname={pathname}>
                    {renderInternalPage()}
                  </InternalPageLayout>
                )}
              </PageTransition>
            </div>
          </div>
        </SectionScrollProvider>
      </GlobalSmoothScroll>
    </>
  );
}

export default App;