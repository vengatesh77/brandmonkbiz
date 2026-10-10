'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onReplayIntro?: () => void;
}

export default function Navbar({ onReplayIntro }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Solid white state on all non-home pages (e.g., /founder)
  const isSolidWhite = pathname !== '/';

  const base = isSolidWhite ? '/' : '';
  const navLinks = [
    { label: 'OUR STORY', href: `${base}#our-story`, id: 'story' },
    { label: 'BUSINESSES', href: `${base}#companies`, id: 'businesses' },
    { label: 'MEDIA', href: `${base}#social-bites`, id: 'media' },
    { label: 'CONTACT', href: `${base}#contact`, id: 'contact' },
  ];

  return (
    <>
      {/* Soft Top Gradient for Pristine Navbar Readability on Home Page (z-index 40) */}
      {!isSolidWhite && (
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none z-40"
          style={{
            height: '160px',
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Navbar Header */}
      <header
        className={`w-full z-50 transition-all duration-300 ${
          isSolidWhite
            ? 'fixed top-0 left-0 bg-white border-b border-[#e5e5e5] shadow-[0_2px_15px_rgba(0,0,0,0.06)] pointer-events-auto h-[80px] flex items-center'
            : 'absolute top-0 left-0 pointer-events-none'
        }`}
      >
        <div
          className={`w-full max-w-[1760px] mx-auto ${isSolidWhite ? 'relative' : ''} px-[5vw] lg:px-[6vw] xl:px-[7vw] flex items-center justify-between`}
          style={isSolidWhite ? { maxWidth: '1920px', paddingLeft: '5.5vw', paddingRight: '5.5vw' } : undefined}
        >
          {/* ── Logo (absolute, top-left, no background) ── */}
          <style>{`
            .bm-logo-card {
              position: absolute;
              top: 0;
              left: clamp(16px, 7.5vw, 144px);
              z-index: 60;
              display: flex;
              align-items: center;
              justify-content: center;
              background: transparent;
              width: clamp(110px, 9vw, 172px);
              height: clamp(90px, 7vw, 130px);
              text-decoration: none;
              transition: opacity 0.2s ease;
            }
            .bm-logo-card:hover { opacity: 0.85; }
            .bm-logo-card img {
              display: block;
              height: 90%;
              width: auto;
              object-fit: contain;
              filter: drop-shadow(0 2px 8px rgba(0,0,0,0.45));
            }
            @media (max-width: 767px) {
              .bm-logo-card { width: 90px; height: 80px; left: 16px; }
              .bm-logo-card img { height: 88%; }
            }
          `}</style>

          {isSolidWhite ? (
            /* Solid-white navbar (inner pages): logo inline, no background */
            <Link
              href="/"
              className="pointer-events-auto flex items-center hover:opacity-90 transition-opacity"
              style={{ height: '100%' }}
              aria-label="Brand Monk Group Home"
            >
              <div style={{ position: 'relative', width: '160px', height: '64px' }}>
                <Image
                  src="/images/1617787737947.png"
                  alt="Brand Monk Group"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left center' }}
                  priority
                />
              </div>
            </Link>
          ) : (
            /* Homepage: logo floats over hero, no card/background */
            <Link
              href="/"
              className="bm-logo-card pointer-events-auto"
              aria-label="Brand Monk Group Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/1617787737947.png"
                alt="Brand Monk Group"
              />
            </Link>
          )}

          {/* Right Side: Navigation Links with generous right clearance */}
          <div
            className={`pointer-events-auto hidden lg:flex items-center gap-[2.5vw] ${
              isSolidWhite ? '' : 'absolute left-1/2 -translate-x-1/2 -translate-y-1/2'
            }`}
            style={
              isSolidWhite
                ? { marginTop: '0' }
                : { top: 'calc(clamp(85px, 5.9vw, 115px) / 2)' }
            }
          >
            {/* Nav Links */}
            <nav className="flex items-center gap-[2.5vw]">
              {navLinks.map((link) => {
                const isActive = isSolidWhite && link.id === 'story';

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative uppercase transition-colors duration-200 group py-1"
                    style={{
                      color: isSolidWhite ? '#111111' : '#ffffff',
                      opacity: isSolidWhite ? (isActive ? 1 : 0.85) : 1,
                      fontWeight: isActive ? 600 : 400,
                      fontSize: 'clamp(13px, 1.05vw, 18px)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    <span className={isSolidWhite ? 'hover:text-[#B89445] transition-colors' : ''}>
                      {link.label}
                    </span>

                    {/* Indicator bar */}
                    {isSolidWhite ? (
                      <span
                        className={`absolute bottom-[-6px] left-0 h-[4px] bg-[#B89445] transition-all duration-300 ease-out ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    ) : (
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#ffffff] transition-all duration-300 ease-out group-hover:w-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Hamburger Button */}
          <div
            className="pointer-events-auto lg:hidden flex items-center"
            style={{
              marginTop: isSolidWhite ? '0' : 'clamp(20px, 3.2vw, 40px)',
            }}
          >
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 focus:outline-none cursor-pointer"
              style={{ color: isSolidWhite ? '#111111' : '#ffffff' }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X
                  className={`w-7 h-7 stroke-[2] ${
                    isSolidWhite ? 'stroke-[#111111]' : 'stroke-white'
                  }`}
                />
              ) : (
                <Menu
                  className={`w-7 h-7 stroke-[2] ${
                    isSolidWhite ? 'stroke-[#111111]' : 'stroke-white'
                  }`}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-In Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="pointer-events-auto fixed inset-0 z-50 bg-[#07080c]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-12 lg:hidden"
            >
              <div className="flex justify-between items-center border-b border-white/20 pb-6">
                <span className="text-white font-bold text-sm tracking-widest uppercase">
                  BRAND MONK GROUP
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white p-2"
                  aria-label="Close menu"
                >
                  <X className="w-7 h-7 stroke-white" />
                </button>
              </div>

              <div className="flex flex-col gap-6 my-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl sm:text-3xl font-light tracking-wide text-white uppercase flex items-center justify-between py-2 border-b border-white/10"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-5 h-5 opacity-60 stroke-white" />
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-white/20 flex items-center justify-between">
                <span className="text-xs text-white uppercase">GLOBAL OPERATIONS</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
