"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardStackItem {
  id: string | number;
  title: string;
  badge?: string;
  stat?: string;
  description: string;
  items?: string[];
  content?: React.ReactNode;
}

export interface CardStackProps {
  items: CardStackItem[];
  offset?: number;
  scaleFactor?: number;
  autoAdvance?: boolean;
  interval?: number;
  fanOutOnHover?: boolean;
  className?: string;
  cardClassName?: string;
  onCardChange?: (index: number) => void;
}

export const CardStack: React.FC<CardStackProps> = ({
  items,
  offset = 16,
  scaleFactor = 0.05,
  autoAdvance = true,
  interval = 4800,
  fanOutOnHover = false,
  className = "",
  cardClassName = "",
  onCardChange,
}) => {
  const [cards, setCards] = useState<CardStackItem[]>(items);
  const [isFannedOut, setIsFannedOut] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [dragDirection, setDragDirection] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCards(items);
  }, [items]);

  const moveToEnd = useCallback(() => {
    setCards((prev) => {
      if (prev.length <= 1) return prev;
      const [first, ...rest] = prev;
      const updated = [...rest, first];
      onCardChange?.(items.findIndex((item) => item.id === updated[0].id));
      return updated;
    });
  }, [items, onCardChange]);

  const moveToPrev = useCallback(() => {
    setCards((prev) => {
      if (prev.length <= 1) return prev;
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, -1);
      const updated = [last, ...rest];
      onCardChange?.(items.findIndex((item) => item.id === updated[0].id));
      return updated;
    });
  }, [items, onCardChange]);

  const bringToFront = (id: string | number) => {
    setCards((prev) => {
      const index = prev.findIndex((c) => c.id === id);
      if (index === -1 || index === 0) return prev;
      const selected = prev[index];
      const rest = prev.filter((c) => c.id !== id);
      const updated = [selected, ...rest];
      onCardChange?.(items.findIndex((item) => item.id === selected.id));
      return updated;
    });
    setIsFannedOut(false);
  };

  // Auto-advance loop
  useEffect(() => {
    if (!autoAdvance || isHovered || isFannedOut) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      moveToEnd();
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoAdvance, interval, isHovered, isFannedOut, moveToEnd]);

  const handleDragEnd = (_e: any, info: PanInfo) => {
    const swipeThreshold = 60;
    const velocityThreshold = 400;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      setDragDirection(-1);
      moveToEnd();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      setDragDirection(1);
      moveToPrev();
    }
    setTimeout(() => setDragDirection(0), 300);
  };

  const fanned = isFannedOut || (fanOutOnHover && isHovered);

  return (
    <div
      className={cn("relative w-full flex flex-col items-center select-none", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive Controls Bar */}
      <div className="flex items-center justify-between w-full max-w-4xl px-2 mb-6 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsFannedOut((prev) => !prev)}
            data-cursor="action"
            className={cn(
              "inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-sm border transition-all duration-300",
              fanned
                ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#FFF5EB] shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                : "border-[#8C6D4F]/40 bg-[#14100D]/80 text-[#C4B5A5] hover:border-[#D4AF37]/70 hover:text-white"
            )}
          >
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">
              {fanned ? "STACK CARDS" : "FAN OUT 3D"}
            </span>
            <span className="text-xs">{fanned ? "⊞" : "▥"}</span>
          </button>

          <span className="text-[10px] text-[#8C6D4F] hidden sm:inline tracking-wider">
            // DRAG TO SWIPE
          </span>
        </div>

        {/* Navigation Arrows & Indicators */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 mr-2">
            {items.map((it, idx) => {
              const isCurrent = cards[0]?.id === it.id;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => bringToFront(it.id)}
                  aria-label={`Jump to card ${idx + 1}`}
                  className={cn(
                    "h-1.5 transition-all duration-300 rounded-full",
                    isCurrent
                      ? "w-6 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"
                      : "w-1.5 bg-[#8C6D4F]/40 hover:bg-[#D4AF37]/60"
                  )}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={moveToPrev}
            aria-label="Previous card"
            data-cursor="prev"
            className="w-8 h-8 flex items-center justify-center rounded-sm border border-[#8C6D4F]/40 bg-[#120F0D] text-[#E8DFD8] hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all duration-300"
          >
            ←
          </button>
          <button
            type="button"
            onClick={moveToEnd}
            aria-label="Next card"
            data-cursor="next"
            className="w-8 h-8 flex items-center justify-center rounded-sm border border-[#8C6D4F]/40 bg-[#120F0D] text-[#E8DFD8] hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all duration-300"
          >
            →
          </button>
        </div>
      </div>

      {/* 3D Card Stack Canvas */}
      <div
        className="relative w-full max-w-4xl min-h-[440px] sm:min-h-[420px] md:min-h-[390px] flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => {
            const isTop = index === 0;
            const total = cards.length;

            // Stacked 3D state
            const stackY = index * offset;
            const stackScale = 1 - index * scaleFactor;
            const stackZIndex = total - index;
            const stackOpacity = 1 - index * 0.16;
            const stackRotate = index === 0 ? 0 : index % 2 === 1 ? index * 1.4 : -index * 1.4;

            // Fan-out 3D state
            const fanSpacing = 90; // px
            const centerOffset = (total - 1) / 2;
            const fanX = (index - centerOffset) * fanSpacing;
            const fanRotate = (index - centerOffset) * 4.5;
            const fanY = Math.abs(index - centerOffset) * 14;

            const targetX = fanned ? fanX : 0;
            const targetY = fanned ? fanY : stackY;
            const targetRotate = fanned ? fanRotate : stackRotate;
            const targetScale = fanned ? (isTop ? 1 : 0.96) : stackScale;
            const targetZIndex = isTop ? 50 : fanned ? 30 - Math.abs(index - centerOffset) : stackZIndex;

            return (
              <motion.div
                key={card.id}
                layout
                initial={{
                  scale: 0.85,
                  opacity: 0,
                  y: dragDirection > 0 ? -40 : 40,
                }}
                animate={{
                  x: targetX,
                  y: targetY,
                  scale: targetScale,
                  rotateZ: targetRotate,
                  zIndex: targetZIndex,
                  opacity: Math.max(0.2, stackOpacity),
                  transition: {
                    type: "spring",
                    stiffness: 280,
                    damping: 24,
                    mass: 0.8,
                  },
                }}
                exit={{
                  x: dragDirection < 0 ? -280 : 280,
                  opacity: 0,
                  scale: 0.8,
                  rotateZ: dragDirection < 0 ? -12 : 12,
                  transition: { duration: 0.35, ease: "easeOut" },
                }}
                drag={isTop && !fanned ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (fanned || !isTop) {
                    bringToFront(card.id);
                  }
                }}
                whileHover={
                  isTop && !fanned
                    ? { y: stackY - 6, transition: { duration: 0.2 } }
                    : fanned
                    ? { y: targetY - 14, scale: 1.02, zIndex: 60 }
                    : undefined
                }
                whileTap={isTop ? { cursor: "grabbing" } : undefined}
                className={cn(
                  "absolute w-full max-w-3xl rounded-xl border p-6 sm:p-9 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-colors duration-400 cursor-grab active:cursor-grabbing",
                  isTop
                    ? "border-[#D4AF37]/70 bg-[#120F0D]/95 text-[#E8DFD8] shadow-[0_25px_70px_rgba(212,175,55,0.12)]"
                    : "border-[#8C6D4F]/35 bg-[#0C0A08]/90 text-[#C4B7AA] hover:border-[#D4AF37]/50",
                  cardClassName
                )}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Top Subtle Flare */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

                {/* Minimal Corner Pins */}
                <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]/50" />
                <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]/50" />
                <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]/50" />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]/50" />

                {/* Card Watermark Number */}
                <span
                  className="absolute -bottom-4 right-4 text-7xl sm:text-8xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  0{items.findIndex((it) => it.id === card.id) + 1}
                </span>

                {card.content ? (
                  card.content
                ) : (
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Meta Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                          <span className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] font-semibold">
                            {card.badge || "CAPABILITY"}
                          </span>
                        </div>
                        {card.stat && (
                          <span className="text-[10px] font-mono px-3 py-1 border border-[#8C6D4F]/40 text-[#D5CBC0] bg-[#16120E] rounded-sm">
                            {card.stat}
                          </span>
                        )}
                      </div>

                      {/* Main Title */}
                      <h3
                        className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-white mb-3 uppercase leading-[0.95]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-xs sm:text-[13.5px] md:text-[14px] text-[#B8AAA0] font-light leading-relaxed mb-6 max-w-2xl"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {card.description}
                      </p>
                    </div>

                    {/* Interactive Tech Tags */}
                    {card.items && card.items.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-[#8C6D4F]/25">
                        {card.items.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] transition-colors"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardStack;
