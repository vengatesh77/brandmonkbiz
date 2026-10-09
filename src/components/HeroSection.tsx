'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Award,
  Sparkles,
  Users,
  Building,
  TrendingUp,
  ShieldCheck,
  Play
} from 'lucide-react';

interface HeroSectionProps {
  onOpenZoomModal: (imgSrc: string, title: string) => void;
}

export default function HeroSection({ onOpenZoomModal }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 'slide-graduates',
      image: '/images/brandmonk-hero.jpg',
      tag: 'Academy & Enterprise Impact',
      title: 'Transforming Potential Into Global Leadership',
      subtitle:
        'Empowering over 50,000+ technology leaders, full-stack innovators, and global business architects through transformative academy programs and corporate excellence.',
      primaryBtn: 'Explore Our Businesses',
      primaryLink: '#businesses',
      secondaryBtn: 'Zoom Photo & Certifications',
      isHeroImage: true,
      stats: [
        { value: '50,000+', label: 'Leaders Graduated' },
        { value: '100%', label: 'Career Acceleration' },
        { value: '120+', label: 'Hiring Partners' },
      ],
    },
    {
      id: 'slide-enterprise',
      image: '/images/corp-hq.jpg',
      tag: 'Global Infrastructure & Innovation',
      title: 'Engineering Digital Fortresses For Fortune 500 Enterprises',
      subtitle:
        'From high-frequency cloud architectures to bespoke corporate brand strategies, Brand Monk Group scales critical capabilities across 18+ international markets.',
      primaryBtn: 'Discover Enterprise Solutions',
      primaryLink: '#businesses',
      secondaryBtn: 'View Global Presence',
      isHeroImage: false,
      stats: [
        { value: '18+', label: 'Global Markets' },
        { value: '99.4%', label: 'Enterprise Retention' },
        { value: '$50M+', label: 'Economic Value Created' },
      ],
    },
    {
      id: 'slide-sustainability',
      image: '/images/corp-sustainability.jpg',
      tag: 'ESG & Purpose Driven Growth',
      title: 'Pioneering Sustainable Horizons for Tomorrow',
      subtitle:
        'Committed to ethical AI governance, zero-carbon digital operations, and empowering grassroots talent with world-class tech education.',
      primaryBtn: 'Read ESG Report',
      primaryLink: '#sustainability',
      secondaryBtn: 'Our Community Impact',
      isHeroImage: false,
      stats: [
        { value: '10,000+', label: 'Youth Scholarships' },
        { value: '45%', label: 'Women in Tech Ratio' },
        { value: 'Net-Zero', label: '2030 Roadmap' },
      ],
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const active = slides[currentSlide];

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#07080c',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Precision Zoom & Lighting */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              src={active.image}
              alt={active.title}
              fill
              priority
              style={{
                objectFit: 'cover',
                objectPosition: active.isHeroImage ? 'center 35%' : 'center center',
                filter: 'brightness(0.72) contrast(1.08) saturate(1.1)',
                transform: active.isHeroImage ? 'scale(1.04)' : 'none',
                transition: 'transform 8s ease-out',
              }}
            />

            {/* High-End Corporate Gradient Masks (Aditya Birla Style) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(7, 8, 12, 0.92) 0%, rgba(7, 8, 12, 0.72) 45%, rgba(7, 8, 12, 0.35) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(7, 8, 12, 0.6) 0%, transparent 40%, rgba(7, 8, 12, 0.95) 100%)',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 10, paddingBottom: '60px', paddingTop: '40px' }}>
        <div style={{ maxWidth: '820px' }}>
          
          {/* Tag & Floating Zoom Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(158, 27, 35, 0.85)',
                color: '#ffffff',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: '4px',
                boxShadow: '0 4px 15px rgba(158, 27, 35, 0.4)',
              }}
            >
              <Sparkles style={{ width: '14px', height: '14px' }} />
              {active.tag}
            </span>

            {active.isHeroImage && (
              <button
                onClick={() =>
                  onOpenZoomModal(
                    '/images/brandmonk-hero.jpg',
                    'Brand Monk Group Convocation & Team Showcase'
                  )
                }
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#f8fafc',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s ease',
                }}
                className="zoom-hover-btn"
                title="Click to Zoom & View High-Res Image"
              >
                <ZoomIn style={{ width: '14px', height: '14px', color: '#c8963e' }} />
                Click to Zoom Photo Details
              </button>
            )}
          </div>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={active.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.55 }}
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.12,
                color: '#ffffff',
                marginBottom: '20px',
                letterSpacing: '-0.025em',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)',
              }}
            >
              {active.title}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={active.subtitle}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: 1.65,
                color: '#e2e8f0',
                marginBottom: '32px',
                maxWidth: '680px',
                fontWeight: 400,
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)',
              }}
            >
              {active.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '48px' }}>
            <a href={active.primaryLink} className="btn-primary" style={{ textTransform: 'uppercase', fontSize: '0.86rem' }}>
              <span>{active.primaryBtn}</span>
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </a>

            {active.isHeroImage ? (
              <button
                onClick={() =>
                  onOpenZoomModal(
                    '/images/brandmonk-hero.jpg',
                    'Brand Monk Group Convocation & Team Showcase'
                  )
                }
                className="btn-outline"
                style={{ textTransform: 'uppercase', fontSize: '0.86rem' }}
              >
                <ZoomIn style={{ width: '16px', height: '16px', color: '#c8963e' }} />
                <span>Zoom & Inspect Image</span>
              </button>
            ) : (
              <a href="#about" className="btn-outline" style={{ textTransform: 'uppercase', fontSize: '0.86rem' }}>
                <span>{active.secondaryBtn}</span>
              </a>
            )}
          </div>

          {/* Quick Metrics Bar (Aditya Birla Style Overlay Card) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
              backgroundColor: 'rgba(18, 20, 28, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '18px 24px',
              backdropFilter: 'blur(16px)',
              maxWidth: '620px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
            }}
          >
            {active.stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  borderLeft: i > 0 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
                  paddingLeft: i > 0 ? '16px' : '0',
                }}
              >
                <div
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: '#c8963e',
                    lineHeight: 1.1,
                    marginBottom: '4px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Slider Nav Controls Bottom Right */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          right: '36px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(10, 12, 18, 0.75)',
          padding: '8px 16px',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          style={{ color: '#ffffff', display: 'flex', alignItems: 'center', padding: '4px' }}
          aria-label="Previous Slide"
        >
          <ChevronLeft style={{ width: '20px', height: '20px' }} />
        </button>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentSlide === idx ? '#9e1b23' : 'rgba(255, 255, 255, 0.35)',
                transition: 'all 0.3s ease',
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          style={{ color: '#ffffff', display: 'flex', alignItems: 'center', padding: '4px' }}
          aria-label="Next Slide"
        >
          <ChevronRight style={{ width: '20px', height: '20px' }} />
        </button>
      </div>

      <style>{`
        .zoom-hover-btn:hover {
          background-color: rgba(255, 255, 255, 0.25) !important;
          border-color: #c8963e !important;
        }
      `}</style>
    </section>
  );
}
