'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Company } from '@/data/companies';
import BrandMonkGroupLogo from '@/components/BrandMonkGroupLogo';

const MAROON = '#9e1b23';
const MAROON_RGBA = (a: number) => `rgba(158,27,35,${a})`;

/* ─── DESKTOP STAGE CONSTANTS (>= 768px) ─── */
const STAGE_W = 1100;
const STAGE_H = 900;
const CX = 550;
const CY = 450;
const LABEL_R = 350;
const R_INNER_DOTTED = 185;
const R_SPOKE_START = 120;
const R_SPOKE_END = 245;
const R_NODES = 255;
const R_OUTER_ARCS = 282;

/* ─── MOBILE SVG CONSTANTS ─── */
// ViewBox sized so nodes nearly fill screen width with labels fitting in
const M_W = 500;
const M_H = 550;
const M_CX = 250;
const M_CY = 258;
const M_HUB_R = 84;          // large centre white circle
const M_DASHED_R = 130;      // inner red dashed ring
const M_NODE_R = 166;        // distance from centre to node circle centre
const M_NODE_CIRCLE_R = 30;  // radius of each node badge circle

interface CompanyWheelProps {
  companies: Company[];
  activeIndex: number;
  rotationAngle: number;
  onSelectCompany: (index: number) => void;
}

// labelSide: where to place the text label relative to the node circle
type LabelSide = 'above' | 'below' | 'right' | 'left';

interface MobileVertical {
  id: string;
  category: string;
  companyName: string;
  labelLines: string[];
  labelSide: LabelSide;
  angleDeg: number;
  companyIndex: number;
}

const MOBILE_VERTICALS: MobileVertical[] = [
  {
    id: 'consulting',
    category: 'CONSULTING',
    companyName: 'BRAND MONK CONSULTING',
    labelLines: ['CONSULTING'],
    labelSide: 'above',
    angleDeg: -90,   // 12 o'clock
    companyIndex: 0,
  },
  {
    id: 'ai',
    category: 'ARTIFICIAL INTELLIGENCE',
    companyName: 'PICKMYAIAGENT',
    labelLines: ['ARTIFICIAL', 'INTELLIGENCE'],
    labelSide: 'right',
    angleDeg: -30,   // 2 o'clock
    companyIndex: 4,
  },
  {
    id: 'food',
    category: 'FOOD & BEVERAGES',
    companyName: 'CREAMY CRUSH',
    labelLines: ['FOOD &', 'BEVERAGES'],
    labelSide: 'right',
    angleDeg: 30,    // 4 o'clock
    companyIndex: 3,
  },
  {
    id: 'business',
    category: 'BUSINESS SOLUTIONS',
    companyName: 'RESTAURANT CONSULTING',
    labelLines: ['BUSINESS', 'SOLUTIONS'],
    labelSide: 'below',
    angleDeg: 90,    // 6 o'clock
    companyIndex: 5,
  },
  {
    id: 'design',
    category: 'DESIGN & CREATIVES',
    companyName: 'ZIKA DESIGNS',
    labelLines: ['DESIGN &', 'CREATIVES'],
    labelSide: 'left',
    angleDeg: 150,   // 8 o'clock
    companyIndex: 2,
  },
  {
    id: 'education',
    category: 'EDUCATION',
    companyName: 'BRAND MONK ACADEMY',
    labelLines: ['EDUCATION'],
    labelSide: 'left',
    angleDeg: 210,   // 10 o'clock
    companyIndex: 1,
  },
];

const COMPANY_TO_VERTICAL = [0, 5, 4, 2, 1, 3, 2, 5];

const SPOKE_PARTICLE_TIMINGS = [
  { dur1: 4.2, delay1: 0.3,  dur2: 5.4, delay2: 2.1 },
  { dur1: 3.8, delay1: 1.2,  dur2: 5.8, delay2: 3.4 },
  { dur1: 4.6, delay1: 0.7,  dur2: 4.1, delay2: 2.8 },
  { dur1: 5.2, delay1: 1.8,  dur2: 3.6, delay2: 0.5 },
  { dur1: 3.9, delay1: 0.2,  dur2: 5.1, delay2: 2.6 },
  { dur1: 4.8, delay1: 1.5,  dur2: 4.3, delay2: 3.1 },
  { dur1: 5.5, delay1: 0.9,  dur2: 3.7, delay2: 1.9 },
  { dur1: 4.1, delay1: 1.1,  dur2: 5.0, delay2: 2.4 },
];

function useStageScale(w: number, h: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      const newScale = window.innerWidth < 1024 ? cw / w : Math.max(0.35, Math.min(cw / w, ch / h));
      setScale(newScale);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => { ro.disconnect(); window.removeEventListener('resize', update); };
  }, [w, h]);
  return [ref, scale] as const;
}

function labelPos(i: number, active: number, n: number) {
  const rad = (((i - active) * 360) / n) * (Math.PI / 180);
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return {
    left: CX + LABEL_R * c,
    top: CY + LABEL_R * s,
    x: `${c > 0.3 ? 0 : c < -0.3 ? -100 : -50}%`,
    y: `${s < -0.3 ? -100 : s > 0.3 ? 0 : -50}%`,
    textAlign: (c > 0.3 ? 'left' : c < -0.3 ? 'right' : 'center') as 'left' | 'right' | 'center',
    width: 'max-content',
    maxWidth: 220,
  };
}

/* ─── NODE ICONS ─── */
function renderMobileNodeIcon(id: string, color: string) {
  switch (id) {
    case 'consulting':
      return (
        <g stroke={color} fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="-4" cy="-5.5" r="2.8" />
          <path d="M-9.5 3.5v-1.2A2.8 2.8 0 0 1 -6.7 0h5.4A2.8 2.8 0 0 1 1.5 2.3v1.2" />
          <circle cx="4" cy="-5.5" r="2.3" />
          <path d="M1.5 3.5a2.3 2.3 0 0 1 2.3-2.3h.4a2.3 2.3 0 0 1 2.3 2.3v0" />
        </g>
      );
    case 'ai':
      return (
        <g>
          <rect x="-7.5" y="-7.5" width="15" height="15" rx="2.5" stroke={color} strokeWidth="1.6" fill="none" />
          <path d="M-4 -10.5v3M4 -10.5v3M-4 7.5v3M4 7.5v3M7.5 -4h3M7.5 4h3M-10.5 -4h3M-10.5 4h3" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <text x="0" y="2.8" textAnchor="middle" fontSize="6.8" fontWeight="900" fill={color} stroke="none" fontFamily="sans-serif">AI</text>
        </g>
      );
    case 'food':
      return (
        <g stroke={color} fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 -7.5v4a2 2 0 0 0 4 0v-4" />
          <line x1="6" y1="-3.5" x2="6" y2="7.5" />
          <ellipse cx="-5" cy="-4.5" rx="2.5" ry="3.2" />
          <line x1="-5" y1="-1.3" x2="-5" y2="7.5" />
        </g>
      );
    case 'business':
      return (
        <g stroke={color} fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <line x1="-7.5" y1="7.5" x2="7.5" y2="7.5" />
          <rect x="-6.5" y="3" width="3" height="4.5" />
          <rect x="-1.5" y="-1.5" width="3" height="9" />
          <rect x="3.5" y="-5.5" width="3" height="13" />
          <polyline points="-5 0 0 -4 5 -7.5" />
          <polyline points="3 -7.5 6.5 -7.5 6.5 -4" />
        </g>
      );
    case 'design':
      return (
        <g stroke={color} fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-0.5 1.5c.2-.9.6-1.5 1.3-2.2a5 5 0 0 0 1.2-3 4.9 4.9 0 0 0-9.8 0c0 1.2.5 2.2 1.2 3 .7.7 1.1 1.3 1.3 2.2" />
          <line x1="-3" y1="4.5" x2="3" y2="4.5" />
          <line x1="-2" y1="7.2" x2="2" y2="7.2" />
        </g>
      );
    case 'education':
      return (
        <g stroke={color} fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="0 -7.5 8.5 -3 0 1.5 -8.5 -3" />
          <path d="M-5 -.5v4.2c0 1.7 2.2 3 5 3s5-1.3 5-3V-.5" />
          <line x1="8.5" y1="-3" x2="8.5" y2="4" />
        </g>
      );
    default:
      return null;
  }
}

/* ─── COMPUTE LABEL SVG ATTRIBUTES ─── */
function getLabelAttrs(nodeX: number, nodeY: number, side: LabelSide, nLines: number) {
  const PAD = M_NODE_CIRCLE_R + 9;
  const LINE_H = 12.5;

  if (side === 'above') {
    const startY = nodeY - PAD - 4 - (nLines - 1) * LINE_H;
    return {
      x: nodeX,
      startY,
      lineH: LINE_H,
      anchor: 'middle' as const,
    };
  }
  if (side === 'below') {
    const startY = nodeY + PAD + 6;
    return {
      x: nodeX,
      startY,
      lineH: LINE_H,
      anchor: 'middle' as const,
    };
  }
  if (side === 'right') {
    const startY = nLines > 1 ? nodeY - (LINE_H * (nLines - 1)) / 2 : nodeY + 4;
    return {
      x: nodeX + PAD,
      startY,
      lineH: LINE_H,
      anchor: 'start' as const,
    };
  }
  // left
  const startY = nLines > 1 ? nodeY - (LINE_H * (nLines - 1)) / 2 : nodeY + 4;
  return {
    x: nodeX - PAD,
    startY,
    lineH: LINE_H,
    anchor: 'end' as const,
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   MOBILE INFOGRAPHIC  (exact match to reference image 2)
───────────────────────────────────────────────────────────────────────────── */
function MobileInfographic({
  activeVerticalIndex,
  onSelectCompany,
  activeCompanyName,
  activeCategory,
}: {
  activeVerticalIndex: number;
  onSelectCompany: (ci: number) => void;
  activeCompanyName: string;
  activeCategory: string;
}) {
  const nodes = useMemo(() => {
    return MOBILE_VERTICALS.map((v, index) => {
      const rad = (v.angleDeg * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      // Hub edge → start of spoke
      const spokeStartX = M_CX + M_HUB_R * cos;
      const spokeStartY = M_CY + M_HUB_R * sin;

      // Junction dot sits ON the inner dashed circle
      const junctionX = M_CX + M_DASHED_R * cos;
      const junctionY = M_CY + M_DASHED_R * sin;

      // Node circle centre
      const nodeX = M_CX + M_NODE_R * cos;
      const nodeY = M_CY + M_NODE_R * sin;

      const labelAttrs = getLabelAttrs(nodeX, nodeY, v.labelSide, v.labelLines.length);

      return { ...v, index, cos, sin, spokeStartX, spokeStartY, junctionX, junctionY, nodeX, nodeY, labelAttrs };
    });
  }, []);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '440px', margin: '0 auto' }}>
        <svg
          viewBox={`0 0 ${M_W} ${M_H}`}
          style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }}
        >
          <defs>
            <filter id="mGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
              <feFlood floodColor={MAROON} floodOpacity="0.65" result="c" />
              <feComposite in="c" in2="b" operator="in" result="cb" />
              <feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#f7f8fa" />
              <stop offset="100%" stopColor="#eceef2" />
            </radialGradient>
          </defs>

          {/* ── Outer light grey guide ring at node-circle distance ── */}
          <circle cx={M_CX} cy={M_CY} r={M_NODE_R} fill="none" stroke="#e2e6ea" strokeWidth="1" strokeOpacity="0.7" />

          {/* ── Inner red dashed ring ── */}
          <circle
            cx={M_CX} cy={M_CY} r={M_DASHED_R}
            fill="none"
            stroke={MAROON}
            strokeWidth="1.2"
            strokeOpacity="0.45"
            strokeDasharray="3 6"
            strokeLinecap="round"
          />

          {/* ── Spokes + junction dots (drawn before nodes so nodes sit on top) ── */}
          {nodes.map((n) => {
            const isActive = n.index === activeVerticalIndex;
            return (
              <g key={`spoke-${n.id}`}>
                {/* Hub edge → junction dot */}
                <line
                  x1={n.spokeStartX} y1={n.spokeStartY}
                  x2={n.junctionX}   y2={n.junctionY}
                  stroke={MAROON}
                  strokeWidth={isActive ? '1.6' : '1.1'}
                  strokeOpacity={isActive ? '0.9' : '0.55'}
                />
                {/* Junction dot (on the dashed ring) */}
                <circle
                  cx={n.junctionX} cy={n.junctionY}
                  r={isActive ? '5.5' : '4'}
                  fill={MAROON}
                  filter={isActive ? 'url(#mGlow)' : undefined}
                />
                {/* Junction → node circle edge */}
                <line
                  x1={n.junctionX} y1={n.junctionY}
                  x2={n.nodeX - n.cos * M_NODE_CIRCLE_R}
                  y2={n.nodeY - n.sin * M_NODE_CIRCLE_R}
                  stroke={MAROON}
                  strokeWidth={isActive ? '1.6' : '1.1'}
                  strokeOpacity={isActive ? '0.9' : '0.5'}
                />
              </g>
            );
          })}

          {/* ── Node badges + icons + labels ── */}
          {nodes.map((n) => {
            const isActive = n.index === activeVerticalIndex;
            const { x: lx, startY: ly, lineH, anchor } = n.labelAttrs;
            return (
              <g key={`node-${n.id}`} onClick={() => onSelectCompany(n.companyIndex)} style={{ cursor: 'pointer' }}>
                {/* Tap target */}
                <circle cx={n.nodeX} cy={n.nodeY} r="38" fill="transparent" />

                {/* Subtle glow ring for active */}
                {isActive && (
                  <circle cx={n.nodeX} cy={n.nodeY} r={M_NODE_CIRCLE_R + 6}
                    fill="none" stroke={MAROON} strokeWidth="1.5" strokeOpacity="0.22"
                    filter="url(#mGlow)"
                  />
                )}

                {/* White circle badge */}
                <circle
                  cx={n.nodeX} cy={n.nodeY}
                  r={M_NODE_CIRCLE_R}
                  fill={isActive ? '#fff4f4' : '#ffffff'}
                  stroke={MAROON}
                  strokeWidth={isActive ? '2.2' : '1.6'}
                />

                {/* Icon */}
                <g transform={`translate(${n.nodeX},${n.nodeY})`}>
                  {renderMobileNodeIcon(n.id, isActive ? MAROON : '#555e6e')}
                </g>

                {/* Label */}
                <text
                  textAnchor={anchor}
                  fill={isActive ? MAROON : '#1e293b'}
                  fontSize="9"
                  fontWeight={isActive ? '800' : '700'}
                  letterSpacing="0.08em"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  style={{ userSelect: 'none' }}
                >
                  {n.labelLines.map((line, li) => (
                    <tspan key={li} x={lx} y={ly + li * lineH}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}

          {/* ── Centre hub (drawn last, sits on top of everything) ── */}
          {/* Outer shadow ring */}
          <circle cx={M_CX} cy={M_CY} r={M_HUB_R + 3}
            fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="6"
          />
          {/* White gradient filled hub */}
          <circle cx={M_CX} cy={M_CY} r={M_HUB_R}
            fill="url(#hubGrad)"
            stroke={MAROON}
            strokeOpacity="0.18"
            strokeWidth="1.5"
          />

          {/* Logo inside hub - pure SVG vector with exact aspect ratio to prevent clipping */}
          <BrandMonkGroupLogo
            x={M_CX - 58}
            y={M_CY - 36}
            width={116}
            height={72}
            color="#1a1a1a"
            style={{ pointerEvents: 'none' }}
          />
        </svg>
      </div>

      {/* Active company tag — bottom right */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        alignSelf: 'flex-end', marginRight: '16px', marginTop: '-8px',
      }}>
        <div style={{ width: '3px', height: '32px', background: MAROON, borderRadius: '2px', flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0f1424', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {activeCompanyName}
          </span>
          <span style={{ fontSize: '10px', fontWeight: 700, color: MAROON, textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '2px' }}>
            {activeCategory}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DESKTOP WHEEL  (completely unchanged)
───────────────────────────────────────────────────────────────────────────── */
function DesktopWheel({ companies, activeIndex, rotationAngle, onSelectCompany }: CompanyWheelProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const total = companies.length;
  const [ref, scale] = useStageScale(STAGE_W, STAGE_H);

  const wheelGeometry = useMemo(() => {
    return companies.map((company, index) => {
      const baseAngleDeg = (index / total) * 360;
      const baseAngleRad = (baseAngleDeg * Math.PI) / 180;
      const spokeStartX = CX + R_SPOKE_START * Math.cos(baseAngleRad);
      const spokeStartY = CY + R_SPOKE_START * Math.sin(baseAngleRad);
      const spokeEndX   = CX + R_SPOKE_END   * Math.cos(baseAngleRad);
      const spokeEndY   = CY + R_SPOKE_END   * Math.sin(baseAngleRad);
      const nodeX = CX + R_NODES * Math.cos(baseAngleRad);
      const nodeY = CY + R_NODES * Math.sin(baseAngleRad);
      const a1 = ((baseAngleDeg - 11) * Math.PI) / 180;
      const a2 = ((baseAngleDeg + 11) * Math.PI) / 180;
      return {
        company, index, baseAngleDeg, baseAngleRad,
        spokeStartX, spokeStartY, spokeEndX, spokeEndY, nodeX, nodeY,
        arcPath: `M ${CX + R_OUTER_ARCS * Math.cos(a1)} ${CY + R_OUTER_ARCS * Math.sin(a1)} A ${R_OUTER_ARCS} ${R_OUTER_ARCS} 0 0 1 ${CX + R_OUTER_ARCS * Math.cos(a2)} ${CY + R_OUTER_ARCS * Math.sin(a2)}`,
      };
    });
  }, [companies, total]);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%', minHeight: STAGE_H * scale }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', width: STAGE_W, height: STAGE_H, transform: `translate(-50%, -50%) scale(${scale})`, transformOrigin: 'center center', userSelect: 'none' }}>
        <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
          <defs>
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feFlood floodColor={MAROON} floodOpacity="0.8" result="glowColor" />
              <feComposite in="glowColor" in2="blur" operator="in" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <motion.circle cx={CX} cy={CY} r={R_INNER_DOTTED} fill="none" stroke={MAROON} strokeOpacity="0.20" strokeWidth="1" strokeDasharray="1 6" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />
          <motion.g animate={{ rotate: prefersReducedMotion ? 0 : rotationAngle }} transition={{ duration: prefersReducedMotion ? 0 : 1.1, ease: [0.76, 0, 0.24, 1] }} style={{ transformOrigin: `${CX}px ${CY}px` }}>
            {wheelGeometry.map((item) => (<motion.path key={`arc-${item.index}`} d={item.arcPath} fill="none" stroke={MAROON} strokeOpacity="0.45" strokeWidth="1" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }} />))}
            {wheelGeometry.map((item) => {
              const isActive = item.index === activeIndex;
              const timing = SPOKE_PARTICLE_TIMINGS[item.index % SPOKE_PARTICLE_TIMINGS.length];
              if (isActive) return (
                <g key={`spoke-a-${item.index}`}>
                  <motion.line key={`al-${activeIndex}`} x1={item.spokeStartX} y1={item.spokeStartY} x2={item.spokeEndX} y2={item.spokeEndY} stroke={MAROON} strokeWidth="2" strokeDasharray="1 9" strokeLinecap="round" style={{ animation: 'activeDashOutward 1.2s linear infinite' }} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }} />
                  {!prefersReducedMotion && (<><circle r="3.5" fill={MAROON} filter="url(#nodeGlow)"><animateMotion path={`M ${item.spokeStartX} ${item.spokeStartY} L ${item.spokeEndX} ${item.spokeEndY}`} dur="2s" begin="0s" repeatCount="indefinite" /><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="2s" begin="0s" repeatCount="indefinite" /></circle><circle r="2.5" fill={MAROON} filter="url(#nodeGlow)"><animateMotion path={`M ${item.spokeStartX} ${item.spokeStartY} L ${item.spokeEndX} ${item.spokeEndY}`} dur="2s" begin="0.65s" repeatCount="indefinite" /><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="2s" begin="0.65s" repeatCount="indefinite" /></circle></>)}
                </g>
              );
              return (
                <g key={`spoke-i-${item.index}`}>
                  <line x1={item.spokeStartX} y1={item.spokeStartY} x2={item.spokeEndX} y2={item.spokeEndY} stroke={MAROON} strokeOpacity="0.22" strokeWidth="1" />
                  {!prefersReducedMotion && (<><circle r="1.8" fill={MAROON}><animateMotion path={`M ${item.spokeStartX} ${item.spokeStartY} L ${item.spokeEndX} ${item.spokeEndY}`} dur={`${timing.dur1}s`} begin={`${timing.delay1}s`} repeatCount="indefinite" /><animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.15;0.85;1" dur={`${timing.dur1}s`} begin={`${timing.delay1}s`} repeatCount="indefinite" /></circle><circle r="1.8" fill={MAROON}><animateMotion path={`M ${item.spokeStartX} ${item.spokeStartY} L ${item.spokeEndX} ${item.spokeEndY}`} dur={`${timing.dur2}s`} begin={`${timing.delay2}s`} repeatCount="indefinite" /><animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.15;0.85;1" dur={`${timing.dur2}s`} begin={`${timing.delay2}s`} repeatCount="indefinite" /></circle></>)}
                </g>
              );
            })}
            {wheelGeometry.map((item) => {
              const isActive = item.index === activeIndex;
              const isHovered = item.index === hoveredIndex;
              return (<g key={`node-${item.index}`} style={{ pointerEvents: 'auto', cursor: 'pointer' }} onClick={() => onSelectCompany(item.index)} onMouseEnter={() => setHoveredIndex(item.index)} onMouseLeave={() => setHoveredIndex(null)}><circle cx={item.nodeX} cy={item.nodeY} r="28" fill="transparent" />{isActive ? (<><circle cx={item.nodeX} cy={item.nodeY} r="21" stroke={MAROON} strokeWidth="1.5" fill="none" opacity="0.9" filter="url(#nodeGlow)" /><circle cx={item.nodeX} cy={item.nodeY} r="11" fill={MAROON} filter="url(#nodeGlow)" /></>) : (<circle cx={item.nodeX} cy={item.nodeY} r="8" fill={MAROON} fillOpacity="0.85" style={{ transformOrigin: `${item.nodeX}px ${item.nodeY}px`, transform: isHovered ? 'scale(1.25)' : 'scale(1)', transition: 'transform 0.2s ease' }} />)}</g>);
            })}
          </motion.g>
        </svg>
        <div style={{ position: 'absolute', left: 430, top: 330, width: 240, height: 240, borderRadius: 9999, background: 'radial-gradient(circle, #ffffff 0%, #f4f5f8 100%)', border: `1px solid ${MAROON_RGBA(0.35)}`, boxShadow: `0 0 40px ${MAROON_RGBA(0.08)}, 0 2px 16px rgba(0,0,0,0.08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20, pointerEvents: 'none' }}>
          <div style={{ position: 'relative', width: 156, height: 98, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="animate-logo-breathe">
            <BrandMonkGroupLogo color="#2b2b2a" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.08))' }} />
          </div>
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30 }}>
          {companies.map((company, index) => {
            const isActive = index === activeIndex;
            const isHovered = index === hoveredIndex;
            const pos = labelPos(index, activeIndex, total);
            const WHEEL_EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];
            const WHEEL_DUR = prefersReducedMotion ? 0 : 1.1;
            return (
              <motion.div key={`label-${company.id}`} animate={{ left: pos.left, top: pos.top, x: pos.x, y: pos.y, opacity: isActive ? 1 : isHovered ? 0.9 : 0.75, scale: isActive ? 1 : isHovered ? 1.04 : 1 }} transition={{ left: { duration: WHEEL_DUR, ease: WHEEL_EASE }, top: { duration: WHEEL_DUR, ease: WHEEL_EASE }, x: { duration: WHEEL_DUR, ease: WHEEL_EASE }, y: { duration: WHEEL_DUR, ease: WHEEL_EASE }, opacity: { duration: 0.3 }, scale: { duration: 0.25 } }} onClick={() => index !== activeIndex && onSelectCompany(index)} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className={`wheel-label-item ${isActive ? 'label-active' : 'label-inactive'}`} style={{ position: 'absolute', textAlign: pos.textAlign, width: pos.width, maxWidth: pos.maxWidth, pointerEvents: 'auto', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: pos.textAlign === 'left' ? 'flex-start' : pos.textAlign === 'right' ? 'flex-end' : 'center', zIndex: isActive ? 40 : 30, willChange: 'left, top, transform' }}>
                <span style={{ fontWeight: 500, textTransform: 'uppercase', lineHeight: 1.3, color: isActive ? '#0f1424' : '#4b5262', fontSize: '20px', whiteSpace: 'normal', wordBreak: 'break-word' }}>{company.name}</span>
                <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.22em', color: MAROON, marginTop: '4px', whiteSpace: 'nowrap', lineHeight: 1.2, fontSize: '14px' }}>{company.category}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes activeDashOutward { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -20; } }
        @keyframes logoBreathe { 0%, 100% { opacity: 0.90; transform: scale(0.975); } 50% { opacity: 1; transform: scale(1.025); } }
        .animate-logo-breathe { animation: logoBreathe 4s ease-in-out infinite; }
        @media (max-width: 1023px) { .label-inactive { display: none !important; } }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN EXPORT  — React-state controlled mobile vs desktop split
───────────────────────────────────────────────────────────────────────────── */
export default function CompanyWheel({ companies, activeIndex, rotationAngle, onSelectCompany }: CompanyWheelProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const activeVerticalIndex = COMPANY_TO_VERTICAL[activeIndex] ?? 0;
  const activeVertical = MOBILE_VERTICALS[activeVerticalIndex];

  if (isMobile) {
    return (
      <MobileInfographic
        activeVerticalIndex={activeVerticalIndex}
        onSelectCompany={onSelectCompany}
        activeCompanyName={activeVertical.companyName}
        activeCategory={activeVertical.category}
      />
    );
  }

  return (
    <DesktopWheel
      companies={companies}
      activeIndex={activeIndex}
      rotationAngle={rotationAngle}
      onSelectCompany={onSelectCompany}
    />
  );
}
