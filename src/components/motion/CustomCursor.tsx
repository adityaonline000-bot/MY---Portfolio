import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for fluid trailing motion
  const springX = useSpring(mouseX, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    // Only run on desktop devices with fine pointer (mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for interactive targets
      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor]');
      const inputEl = target.closest('input, textarea, [contenteditable="true"]');

      setIsPointer(!!interactiveEl);
      setIsInput(!!inputEl);

      const customBadge = interactiveEl?.getAttribute('data-cursor');
      setCursorText(customBadge ? customBadge.toUpperCase() : null);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorText(null);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* 1. Trailing Outer Ring / Badge */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#D4AF37]/50 flex items-center justify-center backdrop-blur-[1px]"
        style={{
          x: springX,
          y: springY,
          translateX: cursorText ? -28 : isPointer ? -24 : isInput ? -10 : -14,
          translateY: cursorText ? -28 : isPointer ? -24 : isInput ? -10 : -14,
        }}
        animate={{
          width: cursorText ? 56 : isPointer ? 48 : isInput ? 20 : 28,
          height: cursorText ? 56 : isPointer ? 48 : isInput ? 20 : 28,
          backgroundColor: cursorText
            ? 'rgba(212, 175, 55, 0.15)'
            : isPointer
            ? 'rgba(212, 175, 55, 0.08)'
            : 'rgba(212, 175, 55, 0.02)',
          borderColor: isPointer || cursorText ? 'rgba(212, 175, 55, 0.8)' : 'rgba(212, 175, 55, 0.35)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-widest text-[#F7E7C4] uppercase font-semibold">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* 2. Inner Precision Gold Dot */}
      {!cursorText && !isInput && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#EAD8C7] shadow-[0_0_8px_rgba(212,175,55,0.8)]"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: -3,
            translateY: -3,
          }}
          animate={{
            scale: isPointer ? 0.6 : 1,
            opacity: isPointer ? 0.8 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      )}
    </div>
  );
};

export default CustomCursor;
