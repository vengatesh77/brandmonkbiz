'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import FounderQuote from './FounderQuote';

/* ─── animation variants ─────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  },
});

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' as const } },
};

const VP = { once: true, amount: 0.2 } as const;

/* ─── Component ──────────────────────────────────────────────── */
export default function Founder() {
  const reduced = useReducedMotion();

  /* Hover zoom state via CSS only — avoids re-renders */
  const colRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="founder"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
      className="founder-section"
    >
      {/* ════════════════════════════════════════════
          LEFT — Photo column
          42% wide on desktop, 100% / 60vh on mobile
      ════════════════════════════════════════════ */}
      <motion.div
        ref={colRef}
        className="founder-photo-col group"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
        style={{
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <Image
          src="/founder.jpg"
          alt="Brand Monk Group — Founder &amp; Chairman"
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="founder-photo"
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
            transition: reduced
              ? 'none'
              : 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </motion.div>

      {/* ════════════════════════════════════════════
          RIGHT — Content column
      ════════════════════════════════════════════ */}
      <div className="founder-content-col">
        <motion.div
          variants={reduced ? {} : fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          style={{ width: '100%' }}
        >
          <FounderQuote
            name="Arun Kumar"
            role="Founder &amp; Chairman, Brand Monk Group"
            href="/founder"
          />
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════
          Scoped styles
      ════════════════════════════════════════════ */}
      <style>{`
        /* ── Desktop layout ── */
        @media (min-width: 1024px) {
          .founder-section {
            flex-direction: row !important;
          }
          .founder-photo-col {
            width: 42%;
            /* self-stretch: grows to match the content column height */
            align-self: stretch;
          }
          .founder-content-col {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-left: 8vw;
            padding-right: 4vw;
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
        }

        /* ── Mobile layout ── */
        @media (max-width: 1023px) {
          .founder-section {
            flex-direction: column !important;
            min-height: unset !important;
          }
          .founder-photo-col {
            width: 100% !important;
            height: 60vh !important;
            flex-shrink: 0;
          }
          .founder-content-col {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-left: 6vw;
            padding-right: 6vw;
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
        }

        /* ── Hover zoom (pointer devices only) ── */
        @media (hover: hover) {
          .founder-photo-col:hover .founder-photo {
            transform: scale(1.06) !important;
          }
        }
      `}</style>
    </section>
  );
}
