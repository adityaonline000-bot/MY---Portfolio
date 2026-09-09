import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // ms
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, minDuration = 1800 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable body scroll while loading
    document.body.style.overflow = 'hidden';

    const intervalTime = Math.max(16, minDuration / 65);
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = '';
            onComplete?.();
          }, 350);
          return 100;
        }
        // Organic acceleration
        const increment = prev > 75 ? 3 : prev > 40 ? 2 : 1;
        return Math.min(100, prev + increment);
      });
    }, intervalTime);

    return () => {
      clearInterval(progressTimer);
      document.body.style.overflow = '';
    };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(14px)',
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          }}
          className="preloader-overlay"
        >
          {/* Subtle Studio Ambient Depth Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52rem] h-[52rem] bg-[#D4AF37]/[0.09] rounded-full blur-[180px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-[#8C6D4F]/[0.08] rounded-full blur-[130px] pointer-events-none" />

          {/* Top Brand Identity */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center space-x-3.5 mb-12 sm:mb-16 select-none z-10"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_12px_#D4AF37] animate-pulse" />
            <span
              className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.38em] uppercase text-[#F7E7C4]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ADITYA YADAV // PORTFOLIO
            </span>
          </motion.div>

          {/* THE UIVERSE LOADER COMPONENT */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="loader">
              <div className="text"><span>Loading</span></div>
              <div className="text"><span>Loading</span></div>
              <div className="text"><span>Loading</span></div>
              <div className="text"><span>Loading</span></div>
              <div className="text"><span>Loading</span></div>
              <div className="text"><span>Loading</span></div>
              <div className="text"><span>Loading</span></div>
              <div className="text"><span>Loading</span></div>
              <div className="text"><span>Loading</span></div>
              <div className="line"></div>
            </div>
          </div>

          {/* Bottom Telemetry Counter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center space-y-3.5 mt-12 sm:mt-16 select-none z-10"
          >
            <div className="flex items-center space-x-3 text-xs sm:text-sm md:text-base font-mono tracking-[0.25em] text-[#8C6D4F]">
              <span>INITIALIZING SYSTEM</span>
              <span className="text-[#D4AF37] font-semibold text-sm sm:text-base md:text-lg">{progress}%</span>
            </div>
            {/* Fine Luxury Progress Track */}
            <div className="w-64 sm:w-80 md:w-96 h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8C6D4F] via-[#D4AF37] to-[#F7E7C4] shadow-[0_0_10px_#D4AF37]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
