"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StickyScrollItem {
  title: string;
  badge?: string;
  stat?: string;
  description: string;
  items?: string[];
  content?: React.ReactNode | any;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: StickyScrollItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - (cardsBreakpoints[acc] ?? 0))) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "#0B0A08", // deep obsidian
    "#000000", // pure black
    "#120F0C", // dark studio bronze
    "#080706", // cosmic noir
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #D4AF37, #8C6D4F)", // gold to bronze
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan to emerald
    "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink to indigo
    "linear-gradient(to bottom right, #f97316, #eab308)", // orange to amber
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      data-lenis-prevent="true"
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-[34rem] justify-center space-x-8 lg:space-x-12 overflow-y-auto rounded-xl p-6 sm:p-10 border border-[#8C6D4F]/30 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.85)] custom-scrollbar"
      ref={ref}
    >
      <div className="relative flex items-start px-2 sm:px-4 w-full max-w-xl">
        <div className="w-full">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-16 first:mt-4 last:mb-28">
              {item.badge && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-sm bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                    {item.badge}
                  </span>
                  {item.stat && (
                    <span className="text-[10px] font-mono tracking-widest text-[#8C6D4F]">
                      // {item.stat}
                    </span>
                  )}
                </div>
              )}
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.35,
                }}
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl font-bold tracking-wide text-[#F3DBB3]"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-xs sm:text-sm leading-relaxed text-[#BFA895] max-w-md font-light"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {item.description}
              </motion.p>
              {item.items && item.items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.25 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-1.5 mt-5 max-w-md"
                >
                  {item.items.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] sm:text-[11px] px-2.5 py-1 rounded-sm bg-[#14100D] text-[#E8DFD8] border border-[#8C6D4F]/30 font-mono tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
          <div className="h-32" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-8 hidden h-72 w-80 lg:h-80 lg:w-96 overflow-hidden rounded-xl border border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.95)] lg:block self-start shrink-0",
          contentClassName,
        )}
      >
        {content[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
};
