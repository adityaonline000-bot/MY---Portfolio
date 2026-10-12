import { usePathname } from '../hooks/usePathname';
import CursorGrid from './CursorGrid';
import './GlobalCursorGrid.css';

export default function GlobalCursorGrid() {
  const pathname = usePathname();

  // Route rule: disable on home page "/", enable on all internal routes
  if (pathname === '/' || pathname === '') return null;

  return (
    <div className="global-cursor-grid">
      <CursorGrid
        cellSize={70}
        color="#C9A45C"
        radius={140}
        falloff="smooth"
        holdTime={400}
        fadeDuration={800}
        lineWidth={1.2}
        maxOpacity={0.8}
        fillOpacity={0}
        gridOpacity={0}
        cellRadius={0}
        clickPulse
        pulseSpeed={600}
      />
    </div>
  );
}

export { GlobalCursorGrid };
