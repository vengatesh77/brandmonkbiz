'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

interface ScrollStageProps {
  /** The full-viewport Hero — will be pinned sticky */
  hero: React.ReactNode;
  /** Everything below the Hero — slides up like a curtain */
  children: React.ReactNode;
}

export default function ScrollStage({ hero, children }: ScrollStageProps) {
  const reduced = useReducedMotion();

  // Detect mobile (<768px) to disable the effect and avoid jank
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Ref on the "below hero" wrapper — the element that slides up
  const belowRef = useRef<HTMLDivElement>(null);

  /**
   * scrollYProgress = 0  → Founder's top edge is at viewport BOTTOM (just entering)
   * scrollYProgress = 1  → Founder's top edge is at viewport TOP  (fully covering hero)
   */
  const { scrollYProgress } = useScroll({
    target: belowRef,
    offset: ['start end', 'start start'],
  });

  // Always call hooks — conditionally apply values afterwards
  const scaleVal = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const yVal     = useTransform(scrollYProgress, [0, 1], ['0vh', '-6vh']);
  const dimVal   = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

  const noFx = reduced || isMobile;

  return (
    <>
      {/* ═══════════════════════════════════════════
          STICKY HERO WRAPPER
          position:sticky keeps it pinned while the
          Founder slides up over it in normal flow.
          overflow:hidden clips the scale/y motion.
          No ancestor may have overflow:hidden — see
          globals.css (overflow-x: clip) and page.tsx.
      ═══════════════════════════════════════════ */}
      <div
        style={{
          position: noFx ? 'relative' : 'sticky',
          top: 0,
          height: '100svh',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Inner motion div — applies scale + parallax y */}
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformOrigin: 'center top',
            scale: noFx ? 1 : scaleVal,
            y: noFx ? 0 : yVal,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        >
          {hero}

          {/* Black dim overlay — fades in as Founder slides up */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#000',
              opacity: noFx ? 0 : dimVal,
              pointerEvents: 'none',
              zIndex: 50,
              willChange: 'opacity',
            }}
          />
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════
          BELOW-HERO CURTAIN
          Sits directly after the 100svh sticky block
          in normal flow — scrolling naturally pulls
          it up over the pinned Hero.
          box-shadow gives the "lifted card" look.
      ═══════════════════════════════════════════ */}
      <div
        ref={belowRef}
        style={{
          position: 'relative',
          zIndex: 10,
          boxShadow: '0 -30px 60px rgba(0,0,0,0.25)',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </>
  );
}
