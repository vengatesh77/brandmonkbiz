'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styles from './story.module.css';

export default function OurStory() {
  const shouldReduceMotion = useReducedMotion();

  const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.08,
        ease: EASE,
      },
    }),
  };

  const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: EASE,
      },
    },
  };

  return (
    <section id="our-story" className={styles.section} style={{ backgroundColor: '#ffffff' }}>
      {/* Pink-to-white background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.06)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'rgba(245, 158, 11, 0.05)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div className={styles.inner}>
        {/* ── Text Column ── */}
        <motion.div
          className={styles.text}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p custom={0} variants={fadeUp} className={styles.eyebrow}>
            Our Story
          </motion.p>

          <motion.h2 custom={1} variants={fadeUp} className={styles.title}>
            Twenty-four years <span className={styles.accent}>of growth.</span>
          </motion.h2>

          <motion.p custom={2} variants={fadeUp} className={styles.tagline}>
            Turning obstacles into opportunities &mdash; one business at a time.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className={styles.body}>
            <p>
              Brand Monk Group did not start as a conglomerate. It started as one
              food business with a global ambition &mdash; in 2002, the goal of
              taking Indian cuisine global, followed by nine years of hands-on
              experience with Tuscany Pizza and Zucca Pizzeria, building a deep
              understanding of hospitality, operations, and the relentless demands
              of running a food business. In 2019, a trademark challenge forced a
              complete brand identity reset. Rather than stepping back, the team
              leaned in, using the disruption as a catalyst to build stronger, more
              resilient business systems and a sharper organisational identity. The
              rebuild began with BOCS Pizza &mdash; engineered for operational efficiency,
              scalability, and franchise resilience.
            </p>
            <p>
              From there, the group expanded into interior design, marketing
              consulting, and education with Zika Designs, Brand Monk Consulting,
              and Brand Monk Academy. Today, Creamy Crush, Restaurant Consulting,
              and PickMyAIAgent extend that reach into desserts, hospitality
              consulting, and AI-powered business workflows &mdash; creating an
              interconnected ecosystem where each brand strengthens the others.
              Over two decades, that journey produced eight brands, a 100-person
              organisation, and a hard-won playbook for building businesses that
              last.
            </p>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} className={styles.callout}>
            <p>
              <strong>Built by solving our own problems, designed to solve yours</strong>
              &nbsp;&mdash; from R.S.&nbsp;Puram, Coimbatore, Brand Monk Group brings
              eight brands together through battle-tested systems, practical
              expertise, and a commitment to helping businesses grow.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Media Column ── */}
        <motion.div
          className={styles.media}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInScale}
        >
          <div className={styles.photo}>
            <Image
              src="/images/our-story-team.jpg"
              alt="Brand Monk Group team"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              style={{ objectFit: 'cover', objectPosition: '50% 35%' }}
            />
            <div className={styles.badge}>
              <span className={styles.badgeLabel}>Since 2002</span>
              <span className={styles.badgeText}>R.S. Puram, Coimbatore</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
