import React, { useEffect, useRef, useId } from 'react';
import { gsap } from 'gsap';
import './MaskedHeading.css';

export interface MaskedHeadingProps {
  text?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  mediaType?: 'image' | 'video';
  src?: string;
  poster?: string;
  fillScale?: number;
  parallax?: number;
  drift?: number;
  brightness?: number;
  saturation?: number;
  grayscale?: boolean;
  reveal?: 'rise' | 'wipe' | 'fade' | 'none';
  duration?: number;
  stagger?: number;
  trigger?: 'view' | 'hover' | 'load';
  align?: 'left' | 'center' | 'right';
  weight?: number | string;
  tracking?: number;
  lineHeight?: number | string;
  textScale?: number;
  className?: string;
  style?: React.CSSProperties;
}

const clampNum = (val: number, min: number, max: number): number => {
  return Math.min(Math.max(val, min), max);
};

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  text = 'Aditya Yadav',
  tag: Tag = 'div',
  mediaType: _mediaType = 'image',
  src = '/gold-texture.jpg',
  poster: _poster = '',
  fillScale = 1.15,
  parallax = 8,
  drift = 4,
  brightness = 1,
  saturation = 1,
  grayscale = false,
  reveal = 'rise',
  duration = 1.15,
  stagger = 0.08,
  trigger = 'view',
  align = 'left',
  weight = 500,
  tracking = -0.025,
  lineHeight = 1,
  textScale: _textScale = 0.055,
  className = '',
  style,
  ...rest
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const offsetRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const hasAnimatedRef = useRef(false);
  const clipId = useId();

  const words = React.useMemo(() => String(text).split(/\s+/).filter(Boolean), [text]);

  // Handle reveal animation (GSAP Rise)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const validWords = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (validWords.length === 0) return;

    const playReveal = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      tweenRef.current?.kill();

      if (reveal === 'rise') {
        gsap.set(validWords, { y: 28, opacity: 0 });
        tweenRef.current = gsap.to(validWords, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      } else if (reveal === 'fade') {
        gsap.set(validWords, { opacity: 0, scale: 0.96 });
        tweenRef.current = gsap.to(validWords, {
          opacity: 1,
          scale: 1,
          duration,
          stagger,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      } else {
        gsap.set(validWords, { y: 0, opacity: 1 });
      }
    };

    if (reveal === 'none') {
      gsap.set(validWords, { y: 0, opacity: 1 });
      return;
    }

    // Set initial hidden state slightly below
    gsap.set(validWords, { y: 28, opacity: 0 });

    if (trigger === 'hover') {
      const onEnter = () => playReveal();
      root.addEventListener('pointerenter', onEnter);
      return () => {
        root.removeEventListener('pointerenter', onEnter);
        tweenRef.current?.kill();
      };
    }

    // Check if element is already in viewport or should trigger immediately on view/load
    const rect = root.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

    let initRaf = 0;
    if (inViewport || trigger === 'load') {
      initRaf = requestAnimationFrame(() => {
        playReveal();
      });
    }

    // IntersectionObserver for scroll triggers
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          playReveal();
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(root);

    // Reliable fallback timeout to guarantee visibility
    const safetyTimer = setTimeout(() => {
      playReveal();
    }, 150);

    return () => {
      cancelAnimationFrame(initRaf);
      clearTimeout(safetyTimer);
      observer.disconnect();
      tweenRef.current?.kill();
    };
  }, [reveal, duration, stagger, trigger, words]);

  // Handle interactive parallax and ambient drift
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let rafId = 0;
    let clock = 0;
    let lastTime = performance.now();

    const updateFrame = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      clock += dt;

      const off = offsetRef.current;
      const dx = Math.sin(clock * 0.45) * drift;
      const dy = Math.cos(clock * 0.35) * (drift * 0.55);

      const ease = 1 - Math.exp(-dt / 0.16);
      off.x += (off.tx + dx - off.x) * ease;
      off.y += (off.ty + dy - off.y) * ease;

      const posX = 50 + off.x * 0.45;
      const posY = 50 + off.y * 0.45;

      wordRefs.current.forEach(el => {
        if (el) {
          el.style.backgroundPosition = `${posX}% ${posY}%`;
        }
      });

      rafId = requestAnimationFrame(updateFrame);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (parallax <= 0) return;
      const rect = root.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
      const ny = ((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1;
      offsetRef.current.tx = clampNum(nx, -1, 1) * -parallax;
      offsetRef.current.ty = clampNum(ny, -1, 1) * -parallax;
    };

    const onPointerLeave = () => {
      offsetRef.current.tx = 0;
      offsetRef.current.ty = 0;
    };

    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerleave', onPointerLeave);
    rafId = requestAnimationFrame(updateFrame);

    return () => {
      cancelAnimationFrame(rafId);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [parallax, drift]);

  const backgroundGradient = src
    ? `url(${src}), linear-gradient(135deg, #FFF8ED 0%, #F5E0B0 20%, #E2BE6C 40%, #D4AF37 55%, #FBF0D5 75%, #C2963B 90%, #7A5314 100%)`
    : 'linear-gradient(135deg, #FFF8ED 0%, #F5E0B0 20%, #E2BE6C 40%, #D4AF37 55%, #FBF0D5 75%, #C2963B 90%, #7A5314 100%)';

  const filterStyle = `brightness(${brightness}) saturate(${saturation}) ${grayscale ? 'grayscale(100%)' : ''} drop-shadow(0 2px 14px rgba(212,175,55,0.4))`;

  return (
    // @ts-expect-error Tag can be custom HTML element
    <Tag
      ref={rootRef}
      className={`masked-heading ${className}`.trim()}
      style={{
        textAlign: align,
        fontWeight: weight,
        letterSpacing: `${tracking}em`,
        lineHeight,
        position: 'relative',
        display: 'inline-block',
        overflow: 'visible',
        ...style,
      }}
      {...rest}
    >
      {/* Extended SVG Defs for complete glyph clearance (Safety: Left 16px+, Right 50px+, Top 14px+, Bottom 28px+) */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <text
              x="16"
              y="70"
              fontFamily="'Pinyon Script', cursive"
              fontSize="64"
              textAnchor="start"
            >
              {text}
            </text>
          </clipPath>
        </defs>
      </svg>

      {/* Signature Rendering Hierarchy: reveal -> clip -> media -> source */}
      <div className="masked-heading__reveal" ref={revealRef}>
        <div className="masked-heading__clip">
          <div className="masked-heading__media">
            <span className="masked-heading__source">
              {words.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="masked-heading__word-wrap"
                  style={{
                    display: 'inline-block',
                    overflow: 'visible',
                    verticalAlign: 'baseline',
                    marginRight: i === words.length - 1 ? 0 : '0.34em',
                    position: 'relative',
                  }}
                >
                  <span
                    ref={el => {
                      wordRefs.current[i] = el;
                    }}
                    className="masked-heading__word-content"
                    style={{
                      display: 'inline-block',
                      backgroundImage: backgroundGradient,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: `${Math.round(fillScale * 180)}% ${Math.round(fillScale * 180)}%`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      color: 'transparent',
                      filter: filterStyle,
                      willChange: 'transform, opacity, background-position',
                      overflow: 'visible',
                      // Extra safety padding for descenders ("y") and ending flourishes ("v")
                      paddingRight: i === words.length - 1 ? 'clamp(28px, 2.5vw, 56px)' : '0.1em',
                      paddingBottom: 'clamp(16px, 1.4vw, 30px)',
                      paddingLeft: i === 0 ? '6px' : '0',
                      paddingTop: '6px',
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default MaskedHeading;
