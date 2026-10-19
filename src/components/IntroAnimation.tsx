'use client';

/**
 * IntroAnimation — GSAP entrance + Framer Motion backdrop exit.
 *
 * Lifecycle
 * ─────────
 * 1. Component mounts: backdrop visible (#0f0f0f), badge hidden via visibility:hidden in CSS.
 * 2. GSAP start-states applied outside ctx (survive ctx.revert — no StrictMode flash).
 * 3. GSAP timeline (~2.4 s): badge pops in → logo spins → divider wipes → chars rise → hold.
 * 4. Badge exits, triggerExit() fires onComplete + starts Framer Motion backdrop fade.
 *
 * Preserved
 * ─────────
 * - forceShow / key-based replay
 * - onComplete callback
 * - Progress shimmer bar
 */

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import IntroLockup from './IntroLockup';

interface IntroAnimationProps {
  forceShow?: boolean;
  onComplete?: () => void;
}

const BG = '#0f0f0f';

export default function IntroAnimation({
  forceShow = false,
  onComplete,
}: IntroAnimationProps) {
  const [shouldRender, setShouldRender] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [shimmer, setShimmer] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Reset state for replay (forceShow bumps the key in page.tsx, giving a fresh mount)
    setShouldRender(true);
    setExiting(false);
    setShimmer(false);

    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;

    const q = (s: string) =>
      gsap.utils.toArray<HTMLElement>(`[data-intro="${s}"]`, root);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─────────────────────────────────────────────────────────────
    // Set INITIAL (hidden) states BEFORE creating the GSAP context.
    // ctx.revert() on StrictMode cleanup will NOT undo these because
    // they were set outside the context — so the badge stays hidden
    // on the second mount and there is zero flash / double-play.
    // ─────────────────────────────────────────────────────────────
    const logoWrap   = q('logo-wrap')[0];
    const brandMonk  = q('brand-monk')[0];
    const groupWord  = q('group-word')[0];
    const groupChars = q('group-char');

    if (!reduce) {
      gsap.set(logoWrap,   { autoAlpha: 0, scale: 0.82, transformOrigin: '50% 50%' });
      gsap.set(brandMonk,  { autoAlpha: 0, y: 16, scale: 0.96, transformOrigin: '50% 50%' });
      gsap.set(groupChars, { autoAlpha: 0, y: 12, scale: 0.85, transformOrigin: '50% 50%' });
    } else {
      gsap.set([logoWrap, brandMonk, groupWord, ...groupChars], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      });
    }

    function triggerExit() {
      if (cancelled) return;
      if (onCompleteRef.current) onCompleteRef.current();
      setExiting(true);
      setTimeout(() => { if (!cancelled) setShouldRender(false); }, 580);
    }

    if (reduce) {
      setTimeout(() => triggerExit(), 1000);
      return () => { cancelled = true; };
    }

    // All timeline tweens live inside ctx so they are reverted on unmount
    const ctx = gsap.context(() => {
      document.fonts.ready.then(() => {
        if (cancelled) return;
        setShimmer(true);

        gsap
          .timeline({ defaults: { force3D: true } })
          // 1. Logo container springs in with subtle scale
          .to(logoWrap, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.75,
            ease: 'back.out(1.5)',
          })
          // 2. Bold BRAND MONK slides into place with crisp authority
          .to(brandMonk, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
          }, 0.15)
          // 3. Staggered reveal of lowercase "group" letters
          .to(groupChars, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: 'back.out(2)',
          }, 0.38)
          // 4. Subtle cinematic float/breath
          .to(logoWrap, {
            scale: 1.03,
            duration: 0.8,
            ease: 'sine.inOut',
          }, 0.75)
          // 5. Hold
          .addLabel('hold', '+=0.6')
          // 6. Smooth cinematic exit
          .to(logoWrap, {
            autoAlpha: 0,
            scale: 0.92,
            duration: 0.4,
            ease: 'power3.in',
          }, 'hold')
          .call(triggerExit, [], 'hold+=0.4');
      });
    }, root);

    return () => {
      cancelled = true;
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceShow]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence mode="wait">
      {!exiting && (
        <motion.div
          key="brandmonk-intro-backdrop"
          ref={rootRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: BG,
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
            pointerEvents: 'all',
            userSelect: 'none',
          }}
          aria-hidden="true"
        >
          {/* Badge hidden via visibility:hidden in IntroLockup — no flash before GSAP */}
          <IntroLockup />

          {/* ── Ambient glow behind the badge ── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(158,27,35,0.28) 0%, rgba(200,150,62,0.1) 40%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              opacity: shimmer ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          />

          {/* ── Bottom progress shimmer ── */}
          <motion.div
            initial={{ width: '0%', opacity: 0 }}
            animate={{
              width: shimmer ? '100%' : '0%',
              opacity: shimmer ? 0.65 : 0,
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              background:
                'linear-gradient(90deg, transparent, #9e1b23 25%, #c8963e 70%, #ffffff)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
