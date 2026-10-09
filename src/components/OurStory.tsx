'use client';

import React, { useEffect, useRef } from 'react';
import styles from './ourstory.module.css';

/* ── Milestone data ─────────────────────────────────────────── */
const MILESTONES = [
  {
    date: '2002',
    title: 'Where It Began',
    body: 'Started with the goal of taking Indian cuisine global, followed by nine years of hands-on experience with Tuscany Pizza and Zucca Pizzeria — building a deep understanding of hospitality, operations, and the relentless demands of running a food business.',
  },
  {
    date: '2019',
    title: 'A Turning Point',
    body: 'A trademark challenge forced a complete brand identity reset. Rather than stepping back, the team leaned in — using the disruption as a catalyst to build stronger, more resilient business systems and a sharper organisational identity.',
  },
  {
    date: 'Rebuilding',
    title: 'BOCS Pizza',
    body: 'Rebuilt from the ground up with BOCS Pizza — a food brand engineered for operational efficiency, scalability, and franchise resilience. Every process was designed to work without the founder in the room.',
  },
  {
    date: 'Expanding',
    title: 'Zika Designs · Brand Monk Consulting · Brand Monk Academy',
    body: 'Expanded into interior design, marketing consulting, and education — not as diversification for its own sake, but to solve real execution and talent challenges that kept coming up across the portfolio.',
  },
  {
    date: 'Now',
    title: 'Creamy Crush · Restaurant Consulting · PickMyAIAgent',
    body: 'Expanded into desserts, hospitality consulting, and AI-powered business workflows — creating an interconnected ecosystem where each brand strengthens the others, and every client benefits from two decades of hard-won operational experience.',
  },
];

/* ── Intersection-observer reveal hook ─────────────────────── */
function useReveal(
  rootRef: React.RefObject<HTMLElement | null>,
  selector: string,
  staggerMs = 0
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const idx = els.indexOf(el);
          setTimeout(() => el.classList.add(styles.visible), idx * staggerMs);
          io.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -24px 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, selector, staggerMs]);
}

/* ── Component ──────────────────────────────────────────────── */
export default function OurStory() {
  const ref = useRef<HTMLElement>(null);

  useReveal(ref, '[data-left]',      0);
  useReveal(ref, '[data-right]',     0);
  useReveal(ref, '[data-milestone]', 110);
  useReveal(ref, '[data-closing]',   0);

  return (
    <section
      id="our-story"
      ref={ref}
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#0f1424',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        borderTop: '1px solid #e5e7eb',
      } as React.CSSProperties}
    >
      {/* ══ Content wrapper ══ */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(72px,9vw,130px) clamp(24px,5vw,64px)',
        }}
      >

        {/* ══ Two-column grid ══ */}
        <div className={styles.storyGrid}>

          {/* ── LEFT — sticky intro ── */}
          <div
            data-left=""
            className={`${styles.leftCol} ${styles.revealLeft}`}
          >
            {/* Eyebrow */}
            <span
              className={styles.eyebrow}
              style={{
                display: 'inline-flex', alignItems: 'center',
                fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#9e1b23', marginBottom: '20px',
              }}
            >
              Our Story
            </span>

            {/* Main heading */}
            <h2
              style={{
                fontSize: 'clamp(2rem,4.2vw,4rem)',
                fontWeight: 900, textTransform: 'uppercase',
                letterSpacing: '-0.04em', lineHeight: 1.05,
                color: '#0f1424', margin: '0 0 16px',
              }}
            >
              Twenty-Four<br />Years of<br />Growth.
            </h2>

            {/* Subheading */}
            <p
              style={{
                fontSize: 'clamp(0.9rem,1.2vw,1.05rem)',
                fontStyle: 'italic',
                color: '#5b6577',
                margin: '0 0 20px', lineHeight: 1.65,
              }}
            >
              Turning obstacles into opportunities&nbsp;&mdash; one business at a time.
            </p>

            {/* Intro body */}
            <p
              style={{
                fontSize: 'clamp(0.85rem,1.05vw,0.97rem)',
                lineHeight: 1.85, color: '#4b5563',
              }}
            >
              Brand Monk Group did not start as a conglomerate. It started as one
              food business with a global ambition. Over two decades, that journey
              produced eight brands, a 100-person organisation, and a hard-won
              playbook for building businesses that last&nbsp;&mdash; born directly
              from the problems we had to solve ourselves.
            </p>
          </div>

          {/* ── RIGHT — timeline ── */}
          <div
            data-right=""
            className={styles.revealRight}
          >
            <div
              className={styles.spine}
              role="list"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {MILESTONES.map((m, i) => (
                <div
                  key={i}
                  data-milestone=""
                  role="listitem"
                  className={styles.reveal}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '20px 1fr',
                    columnGap: '18px',
                    paddingBottom: i < MILESTONES.length - 1 ? 'clamp(24px,3.5vw,40px)' : 0,
                  }}
                >
                  {/* Dot */}
                  <div style={{ paddingTop: '3px' }}>
                    <div
                      style={{
                        width: '11px', height: '11px',
                        borderRadius: '50%',
                        backgroundColor: '#9e1b23',
                        boxShadow: '0 0 0 3px rgba(158,27,35,0.2)',
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '10px', fontWeight: 700,
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: '#9e1b23', marginBottom: '5px',
                      }}
                    >
                      {m.date}
                    </span>
                    <h3
                      style={{
                        fontSize: 'clamp(0.95rem,1.35vw,1.15rem)',
                        fontWeight: 800, letterSpacing: '-0.02em',
                        lineHeight: 1.3, color: '#0f1424',
                        margin: '0 0 8px',
                      }}
                    >
                      {m.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 'clamp(0.8rem,0.98vw,0.9rem)',
                        lineHeight: 1.8,
                        color: '#4b5563',
                        margin: 0,
                      }}
                    >
                      {m.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ Closing statement — full width ══ */}
        <div
          data-closing=""
          className={styles.revealClosing}
          style={{
            marginTop: 'clamp(52px,7vw,88px)',
            paddingTop: 'clamp(36px,4.5vw,52px)',
            borderTop: '1px solid #e5e7eb',
            display: 'flex', flexDirection: 'column', gap: '14px',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1.35rem,2.8vw,2.5rem)',
              fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '-0.04em', lineHeight: 1.1,
              color: '#0f1424', margin: 0,
            }}
          >
            Built by solving our own problems.{' '}
            <span style={{ color: '#9e1b23' }}>Designed to solve yours.</span>
          </p>
          <p
            style={{
              fontSize: 'clamp(0.85rem,1.05vw,0.97rem)',
              lineHeight: 1.8,
              color: '#5b6577',
              maxWidth: '540px', margin: 0,
            }}
          >
            From R.S.&nbsp;Puram, Coimbatore, Brand Monk Group brings eight brands
            together through battle-tested systems, practical expertise, and a
            commitment to helping businesses grow.
          </p>
        </div>

      </div>
    </section>
  );
}
