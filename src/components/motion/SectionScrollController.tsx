import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';

// The 7 canonical homepage scenes in order
export const HOMEPAGE_SECTIONS = [
  'hero',
  'about',
  'projects',
  'capabilities',
  'content',
  'experience',
  'contact',
] as const;

export type SectionId = (typeof HOMEPAGE_SECTIONS)[number];

export interface SectionMeta {
  id: SectionId;
  label: string;
  number: string;
}

export const SECTION_METAS: SectionMeta[] = [
  { id: 'hero', label: 'HERO', number: '01' },
  { id: 'about', label: 'ABOUT', number: '02' },
  { id: 'projects', label: 'PROJECTS', number: '03' },
  { id: 'capabilities', label: 'CAPABILITIES', number: '04' },
  { id: 'content', label: 'CONTENT', number: '05' },
  { id: 'experience', label: 'EXPERIENCE', number: '06' },
  { id: 'contact', label: 'CONTACT', number: '07' },
];

interface SectionScrollContextType {
  activeSectionIndex: number;
  activeSectionId: SectionId;
  isTransitioning: boolean;
  goToSection: (target: number | string, direction?: 'down' | 'up') => void;
  sections: readonly SectionId[];
  sectionMetas: SectionMeta[];
}

const SectionScrollContext = createContext<SectionScrollContextType>({
  activeSectionIndex: 0,
  activeSectionId: 'hero',
  isTransitioning: false,
  goToSection: () => {},
  sections: HOMEPAGE_SECTIONS,
  sectionMetas: SECTION_METAS,
});

export const useSectionScroll = () => useContext(SectionScrollContext);

interface SectionScrollProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export const SectionScrollProvider: React.FC<SectionScrollProviderProps> = ({
  children,
  enabled = true,
}) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const activeIndexRef = useRef<number>(0);
  activeIndexRef.current = activeSectionIndex;

  const isTransitioningRef = useRef<boolean>(false);
  isTransitioningRef.current = isTransitioning;

  const transitionTimerRef = useRef<number | null>(null);
  const wheelAccumulatorRef = useRef<number>(0);
  const wheelCooldownTimerRef = useRef<number | null>(null);

  // -------------------------------------------------------------
  // Content Completion Detection
  // Checks whether the current section still has unconsumed content in the scroll direction
  // -------------------------------------------------------------
  const isSectionContentComplete = useCallback(
    (sectionEl: HTMLElement, direction: 'down' | 'up'): boolean => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sectionTop = sectionEl.offsetTop;
      const sectionHeight = sectionEl.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;
      const threshold = 50; // Tolerance for subpixel and zoom differences

      // Short Viewport scenes (TYPE A): fits in 1 screen, always eligible
      if (sectionHeight <= viewportHeight + threshold) {
        return true;
      }

      // Long Content scenes (TYPE B): check content boundaries
      if (direction === 'down') {
        const viewportBottom = scrollY + viewportHeight;
        return viewportBottom >= sectionBottom - threshold;
      } else {
        return scrollY <= sectionTop + threshold;
      }
    },
    [],
  );

  // -------------------------------------------------------------
  // Transition to a given section (by index or id)
  // -------------------------------------------------------------
  const goToSection = useCallback(
    (target: number | string, direction?: 'down' | 'up') => {
      let targetIndex: number;
      if (typeof target === 'number') {
        targetIndex = Math.max(0, Math.min(HOMEPAGE_SECTIONS.length - 1, target));
      } else {
        const cleanedId = target.replace(/^#/, '');
        const aliasMap: Record<string, SectionId> = {
          work: 'projects',
          skills: 'capabilities',
          creator: 'content',
        };
        const resolvedId = (aliasMap[cleanedId] || cleanedId) as SectionId;
        const found = HOMEPAGE_SECTIONS.indexOf(resolvedId);
        targetIndex = found >= 0 ? found : 0;
      }

      const targetId = HOMEPAGE_SECTIONS[targetIndex];
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      // Determine movement direction if not provided
      const resolvedDirection = direction ?? (targetIndex >= activeIndexRef.current ? 'down' : 'up');

      // Lock transition state to prevent skipping
      setIsTransitioning(true);
      setActiveSectionIndex(targetIndex);

      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      // Calculate target scroll position
      let targetY = targetEl.offsetTop;

      // When navigating backwards UP into a long content section from below:
      // Land at the bottom of the section so user can naturally scroll backwards up through its cards
      if (resolvedDirection === 'up' && targetIndex < activeIndexRef.current) {
        const viewportHeight = window.innerHeight;
        if (targetEl.offsetHeight > viewportHeight + 60 && targetIndex > 0) {
          targetY = targetEl.offsetTop + targetEl.offsetHeight - viewportHeight;
        }
      }

      // Execute smooth transition using Lenis or standard smooth scroll
      const lenis = (window as any).__lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(targetY, {
          offset: 0,
          duration: 0.95,
          lock: true,
        });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }

      // Update URL hash without causing an abrupt page jump
      if (window.location.hash !== `#${targetId}`) {
        window.history.replaceState(null, '', `#${targetId}`);
      }

      // Release lock after transition settling time (~850ms)
      transitionTimerRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
      }, 850);
    },
    [],
  );

  // -------------------------------------------------------------
  // Scroll Position Sync: Accurately sync active index for both Scene & Content sections
  // -------------------------------------------------------------
  useEffect(() => {
    if (!enabled) return;

    const handleScrollSync = () => {
      if (isTransitioningRef.current) return;

      const scrollY = window.scrollY;
      const midViewport = scrollY + window.innerHeight * 0.45;
      let foundIndex = 0;

      for (let i = 0; i < HOMEPAGE_SECTIONS.length; i++) {
        const el = document.getElementById(HOMEPAGE_SECTIONS[i]);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (midViewport >= top && midViewport < bottom) {
          foundIndex = i;
          break;
        } else if (midViewport >= top) {
          foundIndex = i;
        }
      }

      if (foundIndex !== activeIndexRef.current) {
        setActiveSectionIndex(foundIndex);
      }
    };

    window.addEventListener('scroll', handleScrollSync, { passive: true });
    handleScrollSync();

    return () => {
      window.removeEventListener('scroll', handleScrollSync);
    };
  }, [enabled]);

  // -------------------------------------------------------------
  // Hybrid Wheel / Trackpad Intent Engine
  // Allows full internal content scroll before section navigation occurs
  // -------------------------------------------------------------
  useEffect(() => {
    if (!enabled) return;

    // Respect reduced motion: leave scrolling completely native
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // On mobile and tablet touch devices, leave scrolling completely natural and fluid
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const WHEEL_INTENT_THRESHOLD = 36;

    const handleWheel = (e: WheelEvent) => {
      // 1. Check if the event originates inside an internal nested scroll container (e.g. StickyScroll)
      const target = e.target as HTMLElement | null;
      const scrollable = target?.closest('[data-lenis-prevent], .overflow-y-auto') as HTMLElement | null;
      if (scrollable) {
        const isDown = e.deltaY > 0;
        const atBottom = Math.ceil(scrollable.scrollTop + scrollable.clientHeight) >= scrollable.scrollHeight - 3;
        const atTop = scrollable.scrollTop <= 3;

        // Allow internal container to scroll its own content
        if (isDown && !atBottom) return;
        if (!isDown && !atTop) return;
      }

      // 2. If already transitioning between major sections, absorb gesture momentum
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      // 3. HYBRID CHECK: Does current section have remaining content to scroll through?
      const currentSectionId = HOMEPAGE_SECTIONS[activeIndexRef.current];
      const currentSectionEl = document.getElementById(currentSectionId);
      const isDown = e.deltaY > 0;

      if (currentSectionEl) {
        const isComplete = isSectionContentComplete(currentSectionEl, isDown ? 'down' : 'up');

        // If user has NOT exhausted content in this section, allow natural Lenis scrolling!
        if (!isComplete) {
          wheelAccumulatorRef.current = 0;
          return;
        }
      }

      // 4. Section content is exhausted in this direction: accumulate section-switch intent
      wheelAccumulatorRef.current += e.deltaY;

      if (wheelCooldownTimerRef.current) {
        window.clearTimeout(wheelCooldownTimerRef.current);
      }
      wheelCooldownTimerRef.current = window.setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 140);

      // 5. Meaningful intent threshold reached -> advance to adjacent section
      if (Math.abs(wheelAccumulatorRef.current) >= WHEEL_INTENT_THRESHOLD) {
        const direction = wheelAccumulatorRef.current > 0 ? 1 : -1;
        const currentIdx = activeIndexRef.current;
        const nextIdx = currentIdx + direction;

        wheelAccumulatorRef.current = 0;

        if (nextIdx >= 0 && nextIdx < HOMEPAGE_SECTIONS.length) {
          e.preventDefault();
          goToSection(nextIdx, direction > 0 ? 'down' : 'up');
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
      if (wheelCooldownTimerRef.current) window.clearTimeout(wheelCooldownTimerRef.current);
    };
  }, [enabled, goToSection, isSectionContentComplete]);

  // -------------------------------------------------------------
  // Keyboard Navigation: ArrowUp, ArrowDown, PageUp, PageDown, Home, End
  // -------------------------------------------------------------
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      const currentIdx = activeIndexRef.current;
      const currentSectionId = HOMEPAGE_SECTIONS[currentIdx];
      const currentSectionEl = document.getElementById(currentSectionId);

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        if (currentSectionEl && !isSectionContentComplete(currentSectionEl, 'down')) {
          // Allow natural page scroll through long content
          return;
        }
        if (currentIdx < HOMEPAGE_SECTIONS.length - 1) {
          e.preventDefault();
          goToSection(currentIdx + 1, 'down');
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        if (currentSectionEl && !isSectionContentComplete(currentSectionEl, 'up')) {
          // Allow natural page scroll through long content
          return;
        }
        if (currentIdx > 0) {
          e.preventDefault();
          goToSection(currentIdx - 1, 'up');
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSection(0, 'up');
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSection(HOMEPAGE_SECTIONS.length - 1, 'down');
      }
    };

    // Keep active section in sync when user tabs through elements
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      const sectionEl = target?.closest('.cinematic-section') as HTMLElement | null;
      if (sectionEl && sectionEl.id) {
        const id = sectionEl.id as SectionId;
        const idx = HOMEPAGE_SECTIONS.indexOf(id);
        if (idx >= 0 && idx !== activeIndexRef.current) {
          setActiveSectionIndex(idx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('focusin', handleFocusIn);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('focusin', handleFocusIn);
    };
  }, [enabled, goToSection, isSectionContentComplete]);

  // -------------------------------------------------------------
  // Initial Hash Sync: on page load or back/forward
  // -------------------------------------------------------------
  useEffect(() => {
    if (!enabled) return;

    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) {
        goToSection(hash);
      }
    };

    const timer = setTimeout(syncFromHash, 100);
    window.addEventListener('popstate', syncFromHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', syncFromHash);
    };
  }, [enabled, goToSection]);

  const activeSectionId = HOMEPAGE_SECTIONS[activeSectionIndex];

  return (
    <SectionScrollContext.Provider
      value={{
        activeSectionIndex,
        activeSectionId,
        isTransitioning,
        goToSection,
        sections: HOMEPAGE_SECTIONS,
        sectionMetas: SECTION_METAS,
      }}
    >
      {children}
    </SectionScrollContext.Provider>
  );
};

export default SectionScrollProvider;
