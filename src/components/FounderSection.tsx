'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Quote } from 'lucide-react';

export default function FounderSection() {
  return (
    <section
      id="founder"
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/*
        Two-column grid.
        Left  = founder photo (fixed aspect-ratio container, no `fill` issues).
        Right = quote content.
        On mobile (<768px) stacks vertically.
      */}
      <div className="founder-grid">

        {/* ══════════════ LEFT: Founder Image ══════════════ */}
        <div className="founder-img-wrapper">
          {/*
            Using a real width/height Image (not `fill`) inside a
            100%-wide, aspect-ratio-locked container avoids all the
            "parent must have explicit height" pitfalls of `fill`.
          */}
          <Image
            src="/images/97AE247A-B727-4A29-AB9B-10DD8ED0D432 (1).jpg"
            alt="Brand Monk Group Founder"
            width={900}
            height={1100}
            className="founder-img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
            priority
          />
          {/* subtle bottom vignette */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '140px',
              background:
                'linear-gradient(to top, rgba(0,0,0,0.20) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ══════════════ RIGHT: Quote & Info ══════════════ */}
        <div className="founder-content">

          {/* Section Tag */}
          <div className="section-tag" style={{ marginBottom: '24px' }}>
            Founder&apos;s Vision
          </div>

          {/* Opening quote icon */}
          <Quote
            style={{
              width: '48px',
              height: '48px',
              color: '#9e1b23',
              opacity: 0.8,
              marginBottom: '20px',
              flexShrink: 0,
            }}
            strokeWidth={1.4}
          />

          {/* The Quote */}
          <blockquote style={{ margin: '0 0 30px 0', padding: 0, border: 'none' }}>
            <p
              style={{
                fontSize: 'clamp(1.15rem, 1.9vw, 1.65rem)',
                fontWeight: 400,
                lineHeight: 1.6,
                color: '#111827',
                letterSpacing: '-0.01em',
              }}
            >
              We are not just building businesses. We are creating value, challenging mediocrity, and building something that lasts. I’ve never waited for the right path, I’ve always built my way forward. Because some things are worth the struggle, and I’ve always been willing to take it.
            </p>
          </blockquote>

          {/* Red accent divider */}
          <div
            style={{
              width: '52px',
              height: '3px',
              backgroundColor: '#9e1b23',
              borderRadius: '2px',
              marginBottom: '28px',
            }}
          />

          {/* Founder name + designation */}
          <div style={{ marginBottom: '36px' }}>
            <div
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '5px',
              }}
            >
              Founder &amp; Chairman
            </div>
            <div
              style={{
                fontSize: '0.88rem',
                color: '#6b7280',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Brand Monk Group of Companies
            </div>
          </div>

          {/* CTA button */}
          <a
            href="#about"
            className="founder-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              padding: '13px 28px',
              borderRadius: '2px',
              transition: 'all 0.28s ease',
            }}
          >
            View Profile
            <ArrowRight style={{ width: '15px', height: '15px' }} />
          </a>
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        /* Two-column grid */
        .founder-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 640px;
        }

        /* Image column */
        .founder-img-wrapper {
          position: relative;
          overflow: hidden;
          min-height: 480px;
          /* stretch to fill the grid row */
          align-self: stretch;
        }

        /* The image itself — fill the wrapper */
        .founder-img-wrapper .founder-img {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          transform: scale(1);
          transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .founder-img-wrapper:hover .founder-img {
          transform: scale(1.06);
        }

        /* Content column */
        .founder-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(48px, 6vw, 96px) clamp(36px, 5vw, 88px);
          background: #ffffff;
        }

        /* CTA hover */
        .founder-cta:hover {
          background-color: #9e1b23 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(158, 27, 35, 0.28);
        }

        /* Mobile: single column */
        @media (max-width: 768px) {
          .founder-grid {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .founder-img-wrapper {
            min-height: 360px;
            /* on mobile the wrapper needs explicit height since image is absolute */
            height: 360px;
          }
          .founder-content {
            padding: 40px 24px;
          }
        }

        /* Tablet: equal columns, fixed row height */
        @media (min-width: 769px) and (max-width: 1024px) {
          .founder-grid {
            min-height: 560px;
          }
        }
      `}</style>
    </section>
  );
}
