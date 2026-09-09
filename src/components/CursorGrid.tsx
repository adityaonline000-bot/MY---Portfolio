import React, { useEffect, useRef } from 'react';

export interface CursorGridProps {
  cellSize?: number;
  color?: string;
  radius?: number;
  falloff?: 'smooth' | 'linear' | 'gaussian';
  holdTime?: number;
  fadeDuration?: number;
  lineWidth?: number;
  maxOpacity?: number;
  fillOpacity?: number;
  gridOpacity?: number;
  cellRadius?: number;
  clickPulse?: boolean;
  pulseSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface Pulse {
  x: number;
  y: number;
  startTime: number;
  maxRadius: number;
}

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    return {
      r: parseInt(cleanHex[0] + cleanHex[0], 16),
      g: parseInt(cleanHex[1] + cleanHex[1], 16),
      b: parseInt(cleanHex[2] + cleanHex[2], 16),
    };
  }
  const full = cleanHex.padEnd(6, '0');
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
};

export const CursorGrid: React.FC<CursorGridProps> = ({
  cellSize = 70,
  color = '#C9A45C',
  radius = 140,
  falloff = 'smooth',
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1.2,
  maxOpacity = 0.8,
  fillOpacity = 0,
  gridOpacity = 0,
  cellRadius = 0,
  clickPulse = true,
  pulseSpeed = 600,
  className = '',
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const activeCells = useRef<Map<string, { lastActive: number; initialIntensity: number }>>(new Map());
  const pulses = useRef<Pulse[]>([]);
  const rgb = useRef(hexToRgb(color));

  useEffect(() => {
    rgb.current = hexToRgb(color);
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Track pointer globally across whole page so content sitting above canvas is interactive
    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handlePointerLeave = () => {
      mousePos.current.x = -1000;
      mousePos.current.y = -1000;
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!clickPulse) return;
      pulses.current.push({
        x: e.clientX,
        y: e.clientY,
        startTime: performance.now(),
        maxRadius: Math.max(radius * 2.8, 380),
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Helper for falloff calculation
    const calcFalloff = (dist: number, maxDist: number): number => {
      if (dist >= maxDist) return 0;
      const t = dist / maxDist;
      if (falloff === 'linear') {
        return Math.max(0, 1 - t);
      }
      if (falloff === 'gaussian') {
        return Math.exp(-((t / 0.5) ** 2));
      }
      // 'smooth' default: cubic hermite curve
      return 1 - 3 * t * t + 2 * t * t * t;
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const effectiveRadius = isMobile ? Math.min(radius, width * 0.35) : radius;
      const effectiveMaxOpacity = isMobile ? maxOpacity * 0.75 : maxOpacity;

      const { r, g, b } = rgb.current;

      // Draw faint base grid if gridOpacity > 0
      if (gridOpacity > 0) {
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${gridOpacity})`;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        for (let x = 0; x <= width; x += cellSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += cellSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();
      }

      // Activate cells around cursor
      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      if (mx >= 0 && my >= 0 && mx <= width && my <= height) {
        const startCol = Math.max(0, Math.floor((mx - effectiveRadius) / cellSize));
        const endCol = Math.min(Math.floor(width / cellSize), Math.ceil((mx + effectiveRadius) / cellSize));
        const startRow = Math.max(0, Math.floor((my - effectiveRadius) / cellSize));
        const endRow = Math.min(Math.floor(height / cellSize), Math.ceil((my + effectiveRadius) / cellSize));

        for (let c = startCol; c <= endCol; c++) {
          for (let row = startRow; row <= endRow; row++) {
            const cx = c * cellSize + cellSize / 2;
            const cy = row * cellSize + cellSize / 2;
            const dist = Math.hypot(mx - cx, my - cy);
            if (dist < effectiveRadius) {
              const intensity = calcFalloff(dist, effectiveRadius);
              const key = `${c},${row}`;
              activeCells.current.set(key, { lastActive: now, initialIntensity: intensity });
            }
          }
        }
      }

      // Update and draw active pulses
      pulses.current = pulses.current.filter(p => {
        const elapsed = now - p.startTime;
        const currentR = (elapsed / 1000) * pulseSpeed;
        if (currentR > p.maxRadius) return false;

        const pulseAlpha = (1 - currentR / p.maxRadius) * effectiveMaxOpacity * 0.7;

        // Draw expanding pulse circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${pulseAlpha})`;
        ctx.lineWidth = lineWidth * 1.5;
        ctx.stroke();

        // Also illuminate nearby cells touched by pulse
        const pCol = Math.floor(p.x / cellSize);
        const pRow = Math.floor(p.y / cellSize);
        const spread = Math.ceil(currentR / cellSize) + 1;
        const sC = Math.max(0, pCol - spread);
        const eC = Math.min(Math.floor(width / cellSize), pCol + spread);
        const sR = Math.max(0, pRow - spread);
        const eR = Math.min(Math.floor(height / cellSize), pRow + spread);

        for (let c = sC; c <= eC; c++) {
          for (let row = sR; row <= eR; row++) {
            const cx = c * cellSize + cellSize / 2;
            const cy = row * cellSize + cellSize / 2;
            const dist = Math.hypot(p.x - cx, p.y - cy);
            const diff = Math.abs(dist - currentR);
            if (diff < cellSize * 0.8) {
              const intensity = (1 - diff / (cellSize * 0.8)) * pulseAlpha;
              const key = `${c},${row}`;
              const existing = activeCells.current.get(key);
              if (!existing || existing.initialIntensity < intensity) {
                activeCells.current.set(key, { lastActive: now, initialIntensity: intensity });
              }
            }
          }
        }

        return true;
      });

      // Render decaying active cells
      const totalFadeTime = holdTime + fadeDuration;
      activeCells.current.forEach((data, key) => {
        const elapsed = now - data.lastActive;
        if (elapsed > totalFadeTime) {
          activeCells.current.delete(key);
          return;
        }

        let decayFactor = 1;
        if (elapsed > holdTime) {
          decayFactor = Math.max(0, 1 - (elapsed - holdTime) / fadeDuration);
        }

        const alpha = data.initialIntensity * decayFactor * effectiveMaxOpacity;
        if (alpha <= 0.005) return;

        const [colStr, rowStr] = key.split(',');
        const col = parseInt(colStr, 10);
        const row = parseInt(rowStr, 10);
        const x = col * cellSize;
        const y = row * cellSize;

        // Fill cell if fillOpacity > 0
        if (fillOpacity > 0) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * fillOpacity})`;
          if (cellRadius > 0 && typeof ctx.roundRect === 'function') {
            ctx.beginPath();
            ctx.roundRect(x, y, cellSize, cellSize, cellRadius);
            ctx.fill();
          } else {
            ctx.fillRect(x, y, cellSize, cellSize);
          }
        }

        // Stroke cell borders
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = lineWidth;
        if (cellRadius > 0 && typeof ctx.roundRect === 'function') {
          ctx.beginPath();
          ctx.roundRect(x, y, cellSize, cellSize, cellRadius);
          ctx.stroke();
        } else {
          ctx.strokeRect(x, y, cellSize, cellSize);
        }
      });

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const cellsRef = activeCells.current;
    const pulsesRef = pulses.current;

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cellsRef.clear();
      pulsesRef.length = 0;
    };
  }, [cellSize, falloff, holdTime, fadeDuration, lineWidth, maxOpacity, fillOpacity, gridOpacity, cellRadius, clickPulse, pulseSpeed, radius]);

  return (
    <canvas
      ref={canvasRef}
      className={`cursor-grid ${className}`.trim()}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
};

export default CursorGrid;
