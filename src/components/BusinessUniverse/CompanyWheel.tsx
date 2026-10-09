'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Company } from '@/data/companies';
import { BrandMonkIcon } from '../BrandMonkIcon';

const MAROON = '#9e1b23';
const MAROON_RGBA = (a: number) => `rgba(158,27,35,${a})`;

const STAGE_W = 1100;
const STAGE_H = 900;
const CX = 550;
const CY = 450;
const LABEL_R = 350;

// Geometry px
const R_CENTER = 120;
const R_INNER_DOTTED = 185;
const R_SPOKE_START = 120;
const R_SPOKE_END = 245;
const R_NODES = 255;
const R_OUTER_ARCS = 282;

interface CompanyWheelProps {
  companies: Company[];
  activeIndex: number;
  rotationAngle: number;
  onSelectCompany: (index: number) => void;
}

// Deterministic particle timings per spoke
const SPOKE_PARTICLE_TIMINGS = [
  { dur1: 4.2, delay1: 0.3, dur2: 5.4, delay2: 2.1 },
  { dur1: 3.8, delay1: 1.2, dur2: 5.8, delay2: 3.4 },
  { dur1: 4.6, delay1: 0.7, dur2: 4.1, delay2: 2.8 },
  { dur1: 5.2, delay1: 1.8, dur2: 3.6, delay2: 0.5 },
  { dur1: 3.9, delay1: 0.2, dur2: 5.1, delay2: 2.6 },
  { dur1: 4.8, delay1: 1.5, dur2: 4.3, delay2: 3.1 },
  { dur1: 5.5, delay1: 0.9, dur2: 3.7, delay2: 1.9 },
  { dur1: 4.1, delay1: 1.1, dur2: 5.0, delay2: 2.4 },
];

/**
 * Custom hook to scale stage dynamically based on container width & screen height
 */
function useStageScale(w: number, h: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      const newScale =
        window.innerWidth < 1024
          ? cw / w
          : Math.max(0.35, Math.min(cw / w, ch / h));
      setScale(newScale);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [w, h]);
  return [ref, scale] as const;
}

/**
 * Exact label positioning helper function
 * Returns position coordinates and Framer Motion translation offsets (x, y)
 */
function labelPos(i: number, active: number, n: number) {
  const rad = (((i - active) * 360) / n) * (Math.PI / 180);
  const c = Math.cos(rad);
  const s = Math.sin(rad);

  const xPercent = c > 0.3 ? 0 : c < -0.3 ? -100 : -50;
  const yPercent = s < -0.3 ? -100 : s > 0.3 ? 0 : -50;

  return {
    left: CX + LABEL_R * c,
    top: CY + LABEL_R * s,
    x: `${xPercent}%`,
    y: `${yPercent}%`,
    textAlign: (c > 0.3 ? 'left' : c < -0.3 ? 'right' : 'center') as 'left' | 'right' | 'center',
    width: 'max-content',
    maxWidth: 220,
  };
}

export default function CompanyWheel({
  companies,
  activeIndex,
  rotationAngle,
  onSelectCompany,
}: CompanyWheelProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const total = companies.length;
  const [ref, scale] = useStageScale(STAGE_W, STAGE_H);

  // Geometry calculations for rotating elements in the 1100x900 stage
  const wheelGeometry = useMemo(() => {
    return companies.map((company, index) => {
      const baseAngleDeg = (index / total) * 360; // 0 deg = 3 o'clock
      const baseAngleRad = (baseAngleDeg * Math.PI) / 180;

      // Spoke endpoints (px)
      const spokeStartX = CX + R_SPOKE_START * Math.cos(baseAngleRad);
      const spokeStartY = CY + R_SPOKE_START * Math.sin(baseAngleRad);
      const spokeEndX = CX + R_SPOKE_END * Math.cos(baseAngleRad);
      const spokeEndY = CY + R_SPOKE_END * Math.sin(baseAngleRad);

      // Node coordinates (px)
      const nodeX = CX + R_NODES * Math.cos(baseAngleRad);
      const nodeY = CY + R_NODES * Math.sin(baseAngleRad);

      // Outer Arc (+/- 11 degrees)
      const arcStartRad = ((baseAngleDeg - 11) * Math.PI) / 180;
      const arcEndRad = ((baseAngleDeg + 11) * Math.PI) / 180;
      const arcStartX = CX + R_OUTER_ARCS * Math.cos(arcStartRad);
      const arcStartY = CY + R_OUTER_ARCS * Math.sin(arcStartRad);
      const arcEndX = CX + R_OUTER_ARCS * Math.cos(arcEndRad);
      const arcEndY = CY + R_OUTER_ARCS * Math.sin(arcEndRad);

      return {
        company,
        index,
        baseAngleDeg,
        baseAngleRad,
        spokeStartX,
        spokeStartY,
        spokeEndX,
        spokeEndY,
        nodeX,
        nodeY,
        arcPath: `M ${arcStartX} ${arcStartY} A ${R_OUTER_ARCS} ${R_OUTER_ARCS} 0 0 1 ${arcEndX} ${arcEndY}`,
      };
    });
  }, [companies, total]);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: typeof window !== 'undefined' && window.innerWidth < 1024 ? STAGE_H * scale : 0,
      }}
    >
      {/* Scaled stage container centered horizontally and vertically */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
          userSelect: 'none',
        }}
      >
        {/* ── SVG LAYER (1100 x 900) ── */}
        <svg
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feFlood floodColor={MAROON} floodOpacity="0.8" result="glowColor" />
              <feComposite in="glowColor" in2="blur" operator="in" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Stationary Dotted Ring r 185 */}
          <motion.circle
            cx={CX}
            cy={CY}
            r={R_INNER_DOTTED}
            fill="none"
            stroke={MAROON}
            strokeOpacity="0.20"
            strokeWidth="1"
            strokeDasharray="1 6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* ── ROTATING WHEEL LAYER ── */}
          <motion.g
            animate={{ rotate: prefersReducedMotion ? 0 : rotationAngle }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1.1,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            {/* Outer Arcs r 282 */}
            {wheelGeometry.map((item) => (
              <motion.path
                key={`arc-${item.index}`}
                d={item.arcPath}
                fill="none"
                stroke={MAROON}
                strokeOpacity="0.45"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }}
              />
            ))}

            {/* Spokes (r 120 to r 245) */}
            {wheelGeometry.map((item) => {
              const isActive = item.index === activeIndex;
              const timing = SPOKE_PARTICLE_TIMINGS[item.index % SPOKE_PARTICLE_TIMINGS.length];

              if (isActive) {
                return (
                  <g key={`spoke-active-${item.index}`}>
                    <motion.line
                      key={`active-spoke-line-${activeIndex}`}
                      x1={item.spokeStartX}
                      y1={item.spokeStartY}
                      x2={item.spokeEndX}
                      y2={item.spokeEndY}
                      stroke={MAROON}
                      strokeWidth="2"
                      strokeDasharray="1 9"
                      strokeLinecap="round"
                      className="animate-active-dash"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />

                    {!prefersReducedMotion && (
                      <>
                        <circle r="3.5" fill={MAROON} filter="url(#nodeGlow)">
                          <animateMotion
                            path={`M ${item.spokeStartX} ${item.spokeStartY} L ${item.spokeEndX} ${item.spokeEndY}`}
                            dur="2s"
                            begin="0s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0; 1; 1; 0"
                            keyTimes="0; 0.12; 0.88; 1"
                            dur="2s"
                            begin="0s"
                            repeatCount="indefinite"
                          />
                        </circle>

                        <circle r="2.5" fill={MAROON} filter="url(#nodeGlow)">
                          <animateMotion
                            path={`M ${item.spokeStartX} ${item.spokeStartY} L ${item.spokeEndX} ${item.spokeEndY}`}
                            dur="2s"
                            begin="0.65s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0; 1; 1; 0"
                            keyTimes="0; 0.12; 0.88; 1"
                            dur="2s"
                            begin="0.65s"
                            repeatCount="indefinite"
                          />
                        </circle>

                        <circle r="3.5" fill={MAROON} filter="url(#nodeGlow)">
                          <animateMotion
                            path={`M ${item.spokeStartX} ${item.spokeStartY} L ${item.spokeEndX} ${item.spokeEndY}`}
                            dur="2s"
                            begin="1.3s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0; 1; 1; 0"
                            keyTimes="0; 0.12; 0.88; 1"
                            dur="2s"
                            begin="1.3s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </>
                    )}
                  </g>
                );
              }

              return (
                <g key={`spoke-inactive-${item.index}`}>
                  <line
                    x1={item.spokeStartX}
                    y1={item.spokeStartY}
                    x2={item.spokeEndX}
                    y2={item.spokeEndY}
                    stroke={MAROON}
                    strokeOpacity="0.22"
                    strokeWidth="1"
                  />

                  {!prefersReducedMotion && (
                    <>
                      <circle r="1.8" fill={MAROON}>
                        <animateMotion
                          path={`M ${item.spokeStartX} ${item.spokeStartY} L ${item.spokeEndX} ${item.spokeEndY}`}
                          dur={`${timing.dur1}s`}
                          begin={`${timing.delay1}s`}
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0; 0.7; 0.7; 0"
                          keyTimes="0; 0.15; 0.85; 1"
                          dur={`${timing.dur1}s`}
                          begin={`${timing.delay1}s`}
                          repeatCount="indefinite"
                        />
                      </circle>

                      <circle r="1.8" fill={MAROON}>
                        <animateMotion
                          path={`M ${item.spokeStartX} ${item.spokeStartY} L ${item.spokeEndX} ${item.spokeEndY}`}
                          dur={`${timing.dur2}s`}
                          begin={`${timing.delay2}s`}
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0; 0.7; 0.7; 0"
                          keyTimes="0; 0.15; 0.85; 1"
                          dur={`${timing.dur2}s`}
                          begin={`${timing.delay2}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    </>
                  )}
                </g>
              );
            })}

            {/* Nodes at r 255 (dot r 8, active 11 with 21px outer ring) */}
            {wheelGeometry.map((item) => {
              const isActive = item.index === activeIndex;
              const isHovered = item.index === hoveredIndex;

              return (
                <g
                  key={`node-circle-${item.index}`}
                  style={{
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                  }}
                  onClick={() => onSelectCompany(item.index)}
                  onMouseEnter={() => setHoveredIndex(item.index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <circle cx={item.nodeX} cy={item.nodeY} r="28" fill="transparent" />

                  {isActive ? (
                    <>
                      <circle
                        cx={item.nodeX}
                        cy={item.nodeY}
                        r="21"
                        stroke={MAROON}
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.9"
                        filter="url(#nodeGlow)"
                      />
                      <circle
                        cx={item.nodeX}
                        cy={item.nodeY}
                        r="11"
                        fill={MAROON}
                        filter="url(#nodeGlow)"
                      />
                    </>
                  ) : (
                    <circle
                      cx={item.nodeX}
                      cy={item.nodeY}
                      r="8"
                      fill={MAROON}
                      fillOpacity="0.85"
                      style={{
                        transformOrigin: `${item.nodeX}px ${item.nodeY}px`,
                        transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  )}
                </g>
              );
            })}
          </motion.g>
        </svg>

        {/* ── STATIONARY CENTRE CIRCLE (HTML Div, left 430px, top 330px, 240x240) ── */}
        <div
          style={{
            position: 'absolute',
            left: 430,
            top: 330,
            width: 240,
            height: 240,
            borderRadius: 9999,
            background: 'radial-gradient(circle, #ffffff 0%, #f4f5f8 100%)',
            border: `1px solid ${MAROON_RGBA(0.35)}`,
            boxShadow: `0 0 40px ${MAROON_RGBA(0.08)}, 0 2px 16px rgba(0,0,0,0.08)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            zIndex: 20,
            pointerEvents: 'none',
          }}
          className="wheel-centre-hub"
        >
          {/* Logo 130px */}
          <div
            style={{
              width: 130,
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="animate-logo-breathe"
          >
            <BrandMonkIcon size={54} color={MAROON} className="w-full h-auto" />
          </div>

          {/* Under logo "BRAND MONK GROUP" */}
          <span
            style={{
              color: MAROON,
              textTransform: 'uppercase',
              fontWeight: 600,
              letterSpacing: '.28em',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            BRAND MONK GROUP
          </span>
        </div>

        {/* ── LABELS: Positioned in stage pixels, moving synchronously with wheel rotation ── */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30 }}>
          {companies.map((company, index) => {
            const isActive = index === activeIndex;
            const isHovered = index === hoveredIndex;
            const pos = labelPos(index, activeIndex, total);
            const WHEEL_EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];
            const WHEEL_DUR = prefersReducedMotion ? 0 : 1.1;

            return (
              <motion.div
                key={`label-${company.id}`}
                animate={{
                  left: pos.left,
                  top: pos.top,
                  x: pos.x,
                  y: pos.y,
                  opacity: isActive ? 1 : isHovered ? 0.9 : 0.75,
                  scale: isActive ? 1 : isHovered ? 1.04 : 1,
                }}
                transition={{
                  left: { duration: WHEEL_DUR, ease: WHEEL_EASE },
                  top: { duration: WHEEL_DUR, ease: WHEEL_EASE },
                  x: { duration: WHEEL_DUR, ease: WHEEL_EASE },
                  y: { duration: WHEEL_DUR, ease: WHEEL_EASE },
                  opacity: { duration: 0.3, ease: 'easeInOut' },
                  scale: { duration: 0.25, ease: 'easeOut' },
                }}
                onClick={() => index !== activeIndex && onSelectCompany(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`wheel-label-item ${isActive ? 'label-active' : 'label-inactive'}`}
                style={{
                  position: 'absolute',
                  textAlign: pos.textAlign,
                  width: pos.width,
                  maxWidth: pos.maxWidth,
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems:
                    pos.textAlign === 'left'
                      ? 'flex-start'
                      : pos.textAlign === 'right'
                      ? 'flex-end'
                      : 'center',
                  zIndex: isActive ? 40 : 30,
                  willChange: 'left, top, transform',
                }}
              >
                {/* Line 1: Company Name */}
                <span
                  style={{
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    lineHeight: 1.3,
                    color: isActive ? '#0f1424' : '#4b5262',
                    fontSize: '20px',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                  }}
                >
                  {company.name}
                </span>

                {/* Line 2: Category */}
                <span
                  style={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '.22em',
                    color: MAROON,
                    marginTop: '4px',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.2,
                    fontSize: '14px',
                  }}
                >
                  {company.category}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes activeDashOutward {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -20; }
        }
        @keyframes logoBreathe {
          0%, 100% { opacity: 0.88; transform: scale(0.97); }
          50%       { opacity: 1;    transform: scale(1.03); }
        }
        .animate-active-dash {
          animation: activeDashOutward 1.2s linear infinite;
        }
        .animate-logo-breathe {
          animation: logoBreathe 4s ease-in-out infinite;
        }

        @media (max-width: 1023px) {
          .label-inactive {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
