"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/* ── Unchanged constants ───────────────────────────────────────────── */
const SLIDES = [
  { word: "CONSULTING",              image: "/hero/consulting-bg.jpg" },
  { word: "ARTIFICIAL INTELLIGENCE", image: "/hero/ai-bg.jpg" },
  { word: "FOOD & BEVERAGES",        image: "/images/image copy 5.png" },
  { word: "EDUCATION",               image: "/hero/education-bg.jpg" },
];
const INTERVAL_MS = 4000;
const FADE        = 1.2;                               // image crossfade (s)
const EASE        = [0.76, 0, 0.24, 1] as const;      // cube rotation ease

export default function HeroSlides() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();                   // a11y

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      INTERVAL_MS
    );
    return () => clearInterval(id);
  }, []);

  const prev = (active - 1 + SLIDES.length) % SLIDES.length;

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          LAYER 0 — Background images (unchanged)
          All 4 always mounted; active crossfades in.
          prev stays at z:1 so there is zero dark gap.
      ═══════════════════════════════════════════════════ */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        {SLIDES.map((s, i) => {
          const isActive = i === active;
          return (
            <motion.div
              key={s.image}
              className="absolute inset-0"
              style={{ zIndex: isActive ? 2 : i === prev ? 1 : 0 }}
              initial={{ opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.12 }}
              animate={
                isActive
                  ? {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        opacity: { duration: FADE, ease: "easeInOut" },
                        scale:   { duration: 6,    ease: "easeOut"   },
                      },
                    }
                  : {
                      opacity: 0,
                      scale: 1.12,
                      transition: {
                        opacity: { duration: 0, delay: FADE + 0.1 },
                        scale:   { duration: 0, delay: FADE + 0.1 },
                      },
                    }
              }
            >
              <Image
                src={s.image}
                alt={s.word}
                fill
                sizes="100vw"
                priority
                className="object-cover object-center"
              />
            </motion.div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════
          OVERLAY STACK  (z-index 3, stable — unchanged)
      ═══════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] bg-black/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-black/55 via-black/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-44 bg-gradient-to-b from-black/50 to-transparent"
      />

      {/* ═══════════════════════════════════════════════════
          HEADING  (z-index 20)

          Desktop (md+): ONE line — BRAND MONK GROUP | <word>
          Mobile  (<md): two-line column stack

          NO overflow-hidden anywhere in this subtree —
          the 3-D cube rotation needs room around the text
          and overflow-hidden / filter collapses perspective.
      ═══════════════════════════════════════════════════ */}
      <div
        className="absolute top-1/2 z-20 -translate-y-1/2"
        style={{ left: "clamp(24px, 8vw, 160px)" }}
      >
        <div
          className="flex flex-col items-start text-white
                     md:flex-row md:flex-nowrap md:items-center"
          style={{ gap: "clamp(8px, 1.4vw, 24px)" }}
        >
          {/* ── Static "BRAND MONK GROUP" ── */}
          <h1
            className="uppercase select-none whitespace-nowrap"
            style={{
              fontSize:      "clamp(1.4rem, 2.8vw, 3.5rem)",
              fontWeight:    300,
              lineHeight:    1.3,          /* must match pivot calc below */
              letterSpacing: "0.04em",
            }}
          >
            BRAND MONK GROUP
          </h1>

          {/* ── Divider (desktop only) ── */}
          <span
            aria-hidden="true"
            className="hidden md:inline-block flex-shrink-0 self-center bg-white"
            style={{ width: "3px", height: "1.1em" }}
          />

          {/* ══════════════════════════════════════════════
              3-D ROTATING BOX  (NEW)

              How it works:
                • All 4 words share the same grid cell (1/1)
                  → wrapper always as wide as "ARTIFICIAL
                    INTELLIGENCE", zero layout shift.
                • perspective on the <span> wrapper gives the
                  depth; NO overflow-hidden here or on any
                  parent so the 3-D space is not clipped.
                • transformOrigin "50% 50% -0.65em" sets the
                  pivot at half the line-height (1.3em → 0.65em)
                  behind the text plane, so the top and bottom
                  faces of an imaginary box pivot around the
                  same axis.
                • The leaving word rotates from 0 → +90deg
                  (rolls up and away, like the top face).
                • The entering word rotates from -90deg → 0
                  (rolls in from the bottom face).
                • backfaceVisibility: hidden ensures the back of
                  each word is invisible, so no mirrored ghost.
                • prefers-reduced-motion: opacity crossfade only
                  (no rotation).
          ══════════════════════════════════════════════ */}
          <span
            className="grid font-bold uppercase select-none"
            style={{
              /* perspective on the wrapper (not on body/html) */
              perspective: "900px",
              /*
                No overflow-hidden here — critical for 3-D.
                Width is determined by the widest child
                ("ARTIFICIAL INTELLIGENCE").
              */
            }}
            aria-live="polite"
          >
            {SLIDES.map((s, i) => {
              const isActive = i === active;
              const isPrev   = i === prev;

              /* ── Reduced-motion: simple opacity crossfade ── */
              if (reduced) {
                return (
                  <motion.span
                    key={s.word}
                    className="block whitespace-nowrap"
                    style={{
                      gridArea:  "1 / 1",
                      fontSize:  "clamp(1.5rem, 3vw, 3.75rem)",
                      lineHeight: 1.3,
                    }}
                    aria-hidden={!isActive}
                    initial={{ opacity: i === 0 ? 1 : 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {s.word}
                  </motion.span>
                );
              }

              /* ── Full 3-D cube rotation ── */
              return (
                <motion.span
                  key={s.word}
                  className="block whitespace-nowrap"
                  style={{
                    gridArea:          "1 / 1",
                    fontSize:          "clamp(1.5rem, 3vw, 3.75rem)",
                    lineHeight:        1.3,
                    letterSpacing:     "0.02em",
                    /*
                      Pivot = half of line-height behind the text surface.
                      line-height 1.3em → half = 0.65em → use -0.65em as Z.
                      This makes the top/bottom edges of the line share the
                      same rotation axis, like faces of a physical box.
                    */
                    transformOrigin:   "50% 50% -0.65em",
                    backfaceVisibility:"hidden",
                    willChange:        "transform, opacity",
                    overflow:          "visible",   /* never clip horizontally */
                  }}
                  aria-hidden={!isActive}
                  initial={{
                    rotateX: i === 0 ? 0 : -90,
                    opacity: i === 0 ? 1 : 0,
                  }}
                  animate={
                    isActive
                      ? {
                          rotateX: 0,
                          opacity: 1,
                          transition: { duration: 0.9, ease: EASE },
                        }
                      : isPrev
                      ? {
                          rotateX: 90,
                          opacity: 0,
                          transition: { duration: 0.9, ease: EASE },
                        }
                      : {
                          /* All other slides: snap to waiting position instantly */
                          rotateX: -90,
                          opacity: 0,
                          transition: { duration: 0 },
                        }
                  }
                >
                  {s.word}
                </motion.span>
              );
            })}
          </span>
        </div>
      </div>
    </>
  );
}
