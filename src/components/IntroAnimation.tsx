'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { BrandMonkIcon } from './BrandMonkIcon';

interface IntroAnimationProps {
  forceShow?: boolean;
  onComplete?: () => void;
}

export default function IntroAnimation({ forceShow = false, onComplete }: IntroAnimationProps) {
  // Step state: 0 = Init/Icon in, 1 = Text reveal & Lockup, 2 = Hold, 3 = Lockup exit, 4 = Screen exit/Done
  const [stage, setStage] = useState<number>(0);
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const prefersReducedMotion = useReducedMotion();

  // Keep a stable ref for onComplete callback so changing references don't re-trigger the effect
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Prevent double-execution from StrictMode or parent re-renders
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // If it has already run and this isn't a deliberate forced replay, do not run again
    if (hasTriggeredRef.current && !forceShow) {
      return;
    }
    hasTriggeredRef.current = true;

    setShouldRender(true);
    setStage(0);

    const timers: NodeJS.Timeout[] = [];

    if (prefersReducedMotion) {
      // Reduced motion: simple fast fade in, hold, fade out
      timers.push(setTimeout(() => setStage(1), 100));
      timers.push(setTimeout(() => setStage(3), 1100));
      timers.push(setTimeout(() => setStage(4), 1500));
      timers.push(
        setTimeout(() => {
          setShouldRender(false);
          if (onCompleteRef.current) onCompleteRef.current();
        }, 1800)
      );
    } else {
      // Standard Cinematic Sequence (~2.2s total)
      // Step 0 -> 1: Icon appears & text reveals beside it (at 450ms)
      timers.push(
        setTimeout(() => {
          setStage(1);
        }, 450)
      );

      // Step 1 -> 2: Lockup hold in perfect balance (at 950ms)
      timers.push(
        setTimeout(() => {
          setStage(2);
        }, 950)
      );

      // Step 2 -> 3: Lockup animates out (at 1550ms)
      timers.push(
        setTimeout(() => {
          setStage(3);
        }, 1550)
      );

      // Step 3 -> 4: Dark backdrop dissolves into homepage (at 1950ms)
      timers.push(
        setTimeout(() => {
          setStage(4);
        }, 1950)
      );

      // Step 4 -> Complete & remove from DOM (at 2350ms)
      timers.push(
        setTimeout(() => {
          setShouldRender(false);
          if (onCompleteRef.current) onCompleteRef.current();
        }, 2350)
      );
    }

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [forceShow, prefersReducedMotion]);

  if (!shouldRender) {
    return null;
  }

  const lockupExit = stage >= 3;

  return (
    <AnimatePresence mode="wait">
      {stage < 4 && (
        <motion.div
          key="brandmonk-cinematic-intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.55,
            ease: 'easeInOut',
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: '#050608',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            pointerEvents: 'all',
            userSelect: 'none',
          }}
          aria-hidden={stage >= 3 ? 'true' : 'false'}
        >
          {/* Subtle Ambient Radial Lighting Behind Lockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: stage >= 1 && stage < 3 ? 0.22 : 0,
              scale: stage >= 1 ? 1.1 : 0.8,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(158, 27, 35, 0.3) 0%, rgba(200, 150, 62, 0.12) 40%, transparent 70%)',
              filter: 'blur(55px)',
              pointerEvents: 'none',
            }}
          />

          {/* Unified Brand Lockup (Monk Logo + "BRAND MONK" text) */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
            animate={{
              opacity: lockupExit ? 0 : 1,
              scale: lockupExit
                ? prefersReducedMotion
                  ? 1
                  : 0.97
                : 1,
              y: lockupExit ? (prefersReducedMotion ? 0 : -8) : 0,
            }}
            transition={{
              duration: lockupExit ? 0.4 : 0.6,
              ease: 'easeOut',
            }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 'clamp(12px, 2.5vw, 22px)',
              padding: '0 24px',
            }}
          >
            {/* 1. Monk Logo Icon */}
            <motion.div
              initial={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.85,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: prefersReducedMotion ? 0.3 : 0.55,
                ease: 'easeOut',
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6))',
              }}
            >
              <div
                style={{
                  width: 'clamp(44px, 7vw, 68px)',
                  height: 'clamp(44px, 7vw, 68px)',
                }}
              >
                <BrandMonkIcon
                  size={100}
                  className="w-full h-full"
                  color="#ffffff"
                />
              </div>
            </motion.div>

            {/* 2. "BRAND MONK" Typography (Reveals horizontally beside the icon) */}
            <div
              style={{
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <motion.div
                initial={{
                  opacity: prefersReducedMotion ? 1 : 0,
                  x: prefersReducedMotion ? 0 : -25,
                  clipPath: prefersReducedMotion
                    ? 'inset(0% 0% 0% 0%)'
                    : 'inset(0% 100% 0% 0%)',
                }}
                animate={{
                  opacity: stage >= 1 ? 1 : prefersReducedMotion ? 1 : 0,
                  x: stage >= 1 ? 0 : prefersReducedMotion ? 0 : -25,
                  clipPath:
                    stage >= 1
                      ? 'inset(0% 0% 0% 0%)'
                      : prefersReducedMotion
                      ? 'inset(0% 0% 0% 0%)'
                      : 'inset(0% 100% 0% 0%)',
                }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.6,
                  ease: 'easeOut',
                  delay: prefersReducedMotion ? 0 : 0.05,
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    fontFamily:
                      'var(--font-primary), var(--font-montserrat), sans-serif',
                    fontSize: 'clamp(1.4rem, 4.2vw, 2.5rem)',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: '#ffffff',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  BRAND MONK
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Minimal Bottom Subtle Progress Shimmer */}
          {!prefersReducedMotion && (
            <motion.div
              initial={{ width: '0%', opacity: 0 }}
              animate={{
                width: stage >= 1 ? '100%' : '0%',
                opacity: stage < 3 ? 0.65 : 0,
              }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '2px',
                background:
                  'linear-gradient(90deg, transparent, #9e1b23 25%, #c8963e 70%, #ffffff)',
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
