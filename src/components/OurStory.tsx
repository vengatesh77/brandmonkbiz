'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ourstory.module.css';

/* ── Intersection-observer reveal hook (unchanged behaviour) ── */
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

  useReveal(ref, '[data-reveal]', 130);

  return (
    <section id="our-story" ref={ref} className={styles.section}>
      <span className={styles.glowRed} aria-hidden="true" />
      <span className={styles.glowGold} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ── Left: story ── */}
        <div className={styles.text}>
          <span data-reveal="" className={`${styles.eyebrow} ${styles.reveal}`}>
            Our Story
          </span>

          <h2 data-reveal="" className={`${styles.title} ${styles.reveal}`}>
            Twenty-Four Years
            <br />
            <span>of Growth.</span>
          </h2>

          <p data-reveal="" className={`${styles.sub} ${styles.reveal}`}>
            Turning obstacles into opportunities&nbsp;&mdash; one business at a time.
          </p>

          <span data-reveal="" className={`${styles.rule} ${styles.reveal}`} aria-hidden="true" />

          <p data-reveal="" className={`${styles.lead} ${styles.reveal}`}>
            Brand Monk Group did not start as a conglomerate. It started as one
            food business with a global ambition&nbsp;&mdash; in 2002, the goal of
            taking Indian cuisine global, followed by nine years of hands-on
            experience with Tuscany Pizza and Zucca Pizzeria, building a deep
            understanding of hospitality, operations, and the relentless demands
            of running a food business. In 2019, a trademark challenge forced a
            complete brand identity reset. Rather than stepping back, the team
            leaned in, using the disruption as a catalyst to build stronger, more
            resilient business systems and a sharper organisational identity. The
            rebuild began with BOCS Pizza&nbsp;&mdash; a food brand engineered for
            operational efficiency, scalability, and franchise resilience, with
            every process designed to work without the founder in the room.
          </p>

          <p data-reveal="" className={`${styles.para} ${styles.reveal}`}>
            From there, the group expanded into interior design, marketing
            consulting, and education with Zika Designs, Brand Monk Consulting and
            Brand Monk Academy&nbsp;&mdash; not as diversification for its own
            sake, but to solve real execution and talent challenges that kept
            coming up across the portfolio. Today, Creamy Crush, Restaurant
            Consulting and PickMyAIAgent extend that reach into desserts,
            hospitality consulting, and AI-powered business workflows, creating an
            interconnected ecosystem where each brand strengthens the others.
            Over two decades, that journey produced eight brands, a 100-person
            organisation, and a hard-won playbook for building businesses that
            last. <strong>Built by solving our own problems, designed to solve
            yours</strong>&nbsp;&mdash; from R.S.&nbsp;Puram, Coimbatore, Brand
            Monk Group brings eight brands together through battle-tested
            systems, practical expertise, and a commitment to helping businesses
            grow.
          </p>
        </div>

        {/* ── Right: team photo ── */}
        <div data-reveal="" className={`${styles.media} ${styles.reveal}`}>
          <div className={styles.frame} aria-hidden="true" />
          <div className={styles.photo}>
            <Image
              src="/images/our-story-team.jpg"
              alt="The Brand Monk Group team"
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div className={styles.shade} aria-hidden="true" />
          </div>
          <div className={styles.badge}>
            <strong>Since 2002</strong>
            <span>R.S. Puram, Coimbatore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
