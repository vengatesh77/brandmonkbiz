'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { Home } from 'lucide-react';
import Navbar from './Navbar';
import ContactSection from './ContactSection';
import { useFounderIntro } from '@/hooks/useFounderIntro';

const bioFont = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

// ── FOUNDER CONTENT (All data in one editable constant) ──
export const FOUNDER = {
  name: "Arun Kumar Visweswaran",
  role: "Founder, Brand Monk Group",
  photo: "/images/PHOTO-2026-09-29-07-49-28.jpg",
  linkedin: "https://www.linkedin.com/in/arunbrandmonk/",
  instagram: "https://www.instagram.com/arunbrandmonk",
  x: "", // leave empty: when empty, the X icon is not rendered
  bio: [
    "I’ve always been someone who is willing to take a risk. And when I decide to do something, I’ve never waited for the right path. I’ve always built my way forward. I started my journey in marketing in 2002, with hospitality becoming part of it along the way, and over time that journey evolved into building businesses full time.",
    "What began with just me has grown into a 100 people organisation across multiple businesses. But the scale has never been the part that excites me most. It is the process of figuring things out, experimenting, learning, and making things better.",
    "Over the years, I’ve become more focused on creating value, delivering real outcomes, and becoming more valuable myself. I believe in staying humble, because there is always more to learn, while never settling for mediocrity. For me, business is ultimately about creating value for people, respecting the planet, and having a purpose bigger than profit. That is the thinking behind Brand Monk, staying grounded while continuing to grow.",
    "Some things are worth the struggle. I’ve always been willing to take it.",
  ],
};

export default function FounderProfile() {
  const rootRef = useRef<HTMLElement>(null);
  useFounderIntro(rootRef);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        color: '#333333',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="founder-page-root"
    >
      {/* ── SOLID WHITE NAVBAR (Fixed top-0, 80px height) ── */}
      <Navbar />

      {/* ── MAIN CONTENT WRAPPER (1920px max, 5.5vw padding) ── */}
      <main
        ref={rootRef}
        style={{
          width: '100%',
          maxWidth: '1920px',
          margin: '0 auto',
          paddingLeft: '5.5vw',
          paddingRight: '5.5vw',
          paddingTop: '80px',
          paddingBottom: '100px',
          flex: '1 0 auto',
          visibility: 'hidden',
        }}
        className="founder-main-container"
      >
        {/* ── BREADCRUMB (Cleanly 65px below the 80px fixed navbar) ── */}
        <nav
          data-fi="crumb"
          aria-label="Breadcrumb"
          style={{
            paddingTop: '65px',
            paddingBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px',
            color: '#333333',
            flexWrap: 'wrap',
          }}
          className="founder-breadcrumb"
        >
          <Link
            href="/"
            style={{
              color: '#333333',
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
            className="hover-black"
            aria-label="Home"
          >
            <Home style={{ width: '18px', height: '18px', stroke: '#333333' }} />
          </Link>

          <span style={{ color: '#888888', userSelect: 'none' }}>-</span>

          <Link
            href="/#story"
            style={{
              color: '#333333',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
            }}
            className="hover-black"
          >
            About Us
          </Link>

          <span style={{ color: '#888888', userSelect: 'none' }}>-</span>

          <Link
            href="/#founder"
            style={{
              color: '#333333',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
            }}
            className="hover-black"
          >
            Leadership
          </Link>

          <span style={{ color: '#888888', userSelect: 'none' }}>-</span>

          <span style={{ color: '#333333', fontWeight: 400 }}>{FOUNDER.name}</span>
        </nav>

        {/* ── TWO-COLUMN GRID (Desktop: 26.4vw 1fr, Gap: 5.3vw) ── */}
        <div className="founder-two-col-grid">
          
          {/* ═══════════════════════════════════════════════════
              LEFT COLUMN: Photo + Real Social Icons
              Desktop margin-top: ~5.2vw (lines up with the ROLE line)
          ═══════════════════════════════════════════════════ */}
          <div className="founder-left-col">
            {/* PHOTO: Uncropped natural aspect ratio, full column width */}
            <div
              data-fi="photo"
              className="founder-photo-box"
              style={{ overflow: 'hidden', willChange: 'transform', transformOrigin: 'center' }}
            >
              <Image
                data-fi="photo-img"
                src={FOUNDER.photo}
                alt={FOUNDER.name}
                width={720}
                height={1280}
                priority
                sizes="(min-width: 1024px) 26.4vw, (min-width: 420px) 420px, 100vw"
                className="block h-auto w-full"
              />
            </div>

            {/* REAL BRAND SOCIAL ICONS (27px below the photo) */}
            <div
              style={{
                marginTop: '27px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              {/* Official LinkedIn Logo */}
              {FOUNDER.linkedin && (
                <a
                  data-fi="social"
                  href={FOUNDER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${FOUNDER.name} on LinkedIn`}
                  className="social-btn social-btn-linkedin"
                  title="Connect on LinkedIn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                  </svg>
                </a>
              )}

              {/* Official Instagram Logo */}
              {FOUNDER.instagram && (
                <a
                  data-fi="social"
                  href={FOUNDER.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${FOUNDER.name} on Instagram`}
                  className="social-btn social-btn-instagram"
                  title="Follow on Instagram"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}

              {/* X / Twitter (rendered only if x string is not empty) */}
              {FOUNDER.x && (
                <a
                  data-fi="social"
                  href={FOUNDER.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${FOUNDER.name} on X`}
                  className="social-btn social-btn-x"
                  title="Follow on X"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ width: '18px', height: '18px' }}
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════
              RIGHT COLUMN: Name + Role + Bio Paragraphs
          ═══════════════════════════════════════════════════ */}
          <div className="founder-right-col">
            {/* 1. Name */}
            <h1
              data-fi="name"
              aria-label={FOUNDER.name}
              style={{
                fontSize: 'clamp(2.2rem, 3.2vw, 3.8rem)',
                fontWeight: 700,
                textTransform: 'uppercase',
                lineHeight: 1.1,
                color: '#0f1424',
                margin: 0,
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-montserrat), sans-serif',
              }}
              className="founder-name-heading inline-block w-fit whitespace-nowrap will-change-transform"
            >
              {FOUNDER.name.split(" ").map((w, wi, arr) => (
                <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
                  {w.split("").map((ch, i) => (
                    <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
                      <span data-fi="char" className="inline-block">{ch}</span>
                    </span>
                  ))}
                  {wi < arr.length - 1 && <span className="inline-block w-[0.3em]" />}
                </span>
              ))}
            </h1>

            {/* 2. Role */}
            <h2
              data-fi="role"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.4rem)',
                fontWeight: 600,
                color: '#9e1b23',
                marginTop: 'clamp(10px, 1vw, 18px)',
                marginBottom: 0,
                lineHeight: 1.3,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
              className="founder-role-heading"
            >
              {FOUNDER.role}
            </h2>

            {/* 3. Bio Paragraphs */}
            <div
              style={{
                marginTop: 'clamp(24px, 2.2vw, 40px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(18px, 1.5vw, 26px)',
                maxWidth: '62rem',
              }}
              className={`founder-bio-container ${bioFont.className}`}
            >
              {FOUNDER.bio.map((paragraph, index) => (
                <p
                  key={index}
                  data-fi="bio"
                  style={{
                    fontSize: 'clamp(1.1rem, 1.3vw, 1.45rem)',
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: '#333a48',
                    margin: 0,
                    letterSpacing: '0.01em',
                  }}
                  className="founder-bio-paragraph"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* ── CONTACT & FOOTER SECTION ── */}
      <ContactSection />

      {/* ── SCOPED CSS FOR 100% BULLETPROOF RESPONSIVE LAYOUT & HOVER STATES ── */}
      <style>{`
        .founder-page-root {
          font-family: var(--font-montserrat), 'Montserrat', sans-serif;
        }

        .hover-black:hover {
          color: #000000 !important;
        }

        .founder-two-col-grid {
          display: grid;
          grid-template-columns: 26.4vw 1fr;
          column-gap: 5.3vw;
          align-items: start;
          margin-top: 1.5vw;
          width: 100%;
        }

        .founder-left-col {
          display: flex;
          flex-direction: column;
          margin-top: 0;
          width: 100%;
        }

        .founder-photo-box {
          width: 100%;
        }

        .founder-right-col {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* ── Social Media Button Styles with Real Branding ── */
        .social-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          background-color: #ffffff;
          color: #333333;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .social-btn-linkedin:hover {
          background-color: #0a66c2 !important;
          border-color: #0a66c2 !important;
          color: #ffffff !important;
        }

        .social-btn-instagram:hover {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%) !important;
          border-color: transparent !important;
          color: #ffffff !important;
        }

        .social-btn-x:hover {
          background-color: #000000 !important;
          border-color: #000000 !important;
          color: #ffffff !important;
        }

        /* ── Responsive Mobile & Tablet Layout ── */
        @media (max-width: 1023px) {
          .founder-two-col-grid {
            grid-template-columns: 1fr !important;
            row-gap: 36px !important;
          }

          .founder-left-col {
            margin-top: 0 !important;
            max-width: 420px;
          }

          .founder-breadcrumb {
            padding-top: 30px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
