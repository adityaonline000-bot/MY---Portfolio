'use client';

import React, { useEffect, useRef } from 'react';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import type { LenisOptions } from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface SmoothScrollProps {
  children: React.ReactNode;
  options?: LenisOptions;
  root?: boolean | 'asChild';
  className?: string;
}

/**
 * GlobalSmoothScroll Component
 * 
 * Instantiates the single application-wide ReactLenis instance.
 * Integrated with GSAP ScrollTrigger, section snapping, and anchor navigation.
 * NO DEMO CONTENT - purely the foundational smooth scrolling engine.
 */
export const GlobalSmoothScroll: React.FC<SmoothScrollProps> = ({
  children,
  options,
  root = true,
  className = '',
}) => {
  const lenisRef = useRef<LenisRef | null>(null);

  // Standard responsive smooth scroll options
  const defaultOptions: LenisOptions = {
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
    autoRaf: true,
    ...options,
  };

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Attach instance to window.__lenis for global interop with SectionScrollController
    const checkAndAttach = () => {
      const instance = lenisRef.current?.lenis;
      if (instance) {
        (window as any).__lenis = instance;

        const handleScroll = () => {
          ScrollTrigger.update();
          window.dispatchEvent(new Event('scroll'));
        };

        instance.on('scroll', handleScroll);

        // Smooth anchor link click handler (#about, #projects, etc.)
        const handleAnchorClick = (e: MouseEvent) => {
          const target = (e.target as HTMLElement).closest('a');
          if (!target) return;
          const href = target.getAttribute('href');
          if (href && href.startsWith('#') && href.length > 1) {
            const el = document.querySelector(href);
            if (el) {
              e.preventDefault();
              instance.scrollTo(el as HTMLElement, { offset: 0, duration: 1.0 });
            }
          }
        };

        document.addEventListener('click', handleAnchorClick);
        document.documentElement.classList.add('section-snap-enabled');

        return () => {
          instance.off('scroll', handleScroll);
          document.removeEventListener('click', handleAnchorClick);
          document.documentElement.classList.remove('section-snap-enabled');
          if ((window as any).__lenis === instance) {
            delete (window as any).__lenis;
          }
        };
      }
    };

    const cleanup = checkAndAttach();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <ReactLenis
      root={root}
      options={defaultOptions}
      ref={lenisRef}
      className={className}
    >
      {children}
    </ReactLenis>
  );
};

export const SmoothScroll = GlobalSmoothScroll;
export { useLenis, ReactLenis };
export default GlobalSmoothScroll;
