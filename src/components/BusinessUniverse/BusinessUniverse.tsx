'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { COMPANIES } from '@/data/companies';
import CompanyWheel from './CompanyWheel';
import CompanyInfoPanel from '@/components/CompanyInfoPanel';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import styles from '../companies.module.css';

const MAROON = '#9e1b23';

export default function BusinessUniverse() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  // Touch swipe state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Active index ref for timer callbacks
  const activeIndexRef = useRef<number>(0);
  activeIndexRef.current = activeIndex;

  const total = COMPANIES.length;

  // Detect mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Rotate to specific index using shortest rotational path
  const handleSelectCompany = useCallback(
    (newIndex: number) => {
      const prevIndex = activeIndexRef.current;
      if (newIndex === prevIndex) return;

      let diff = newIndex - prevIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const anglePerStep = 360 / total;
      setRotationAngle((prev) => prev - diff * anglePerStep);
      setActiveIndex(newIndex);
    },
    [total]
  );

  const handleNext = useCallback(() => {
    const nextIdx = (activeIndexRef.current + 1) % total;
    handleSelectCompany(nextIdx);
  }, [total, handleSelectCompany]);

  const handlePrev = useCallback(() => {
    const prevIdx = (activeIndexRef.current - 1 + total) % total;
    handleSelectCompany(prevIdx);
  }, [total, handleSelectCompany]);

  // AUTOMATIC COMPANY CHANGE — 2 SECONDS
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Preload all company images
  useEffect(() => {
    COMPANIES.forEach((company) => {
      if (typeof window !== 'undefined' && company.image) {
        const img = new window.Image();
        img.src = company.image;
      }
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe handlers for mobile wheel rotation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only trigger horizontal swipe if it's more horizontal than vertical
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const activeCompany = COMPANIES[activeIndex];

  // ── MOBILE LAYOUT (Wheel animation only) ──────────────────────────────────
  if (isMobile) {
    return (
      <section id="companies" className={styles.section}>
        <div className={styles.inner}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.headingGroup}>
              <span className={styles.accentBar} />
              <h2 className={styles.title}>
                Our <span className={styles.titleBreak}><br /></span>Companies <span className={styles.titleBreak}><br /></span>&amp; Verticals
              </h2>
            </div>
          </header>

          {/* Wheel animation only */}
          <div
            style={{
              flex: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '12px',
              paddingBottom: '16px',
              minHeight: 0,
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <CompanyWheel
              companies={COMPANIES}
              activeIndex={activeIndex}
              rotationAngle={rotationAngle}
              onSelectCompany={handleSelectCompany}
            />
          </div>
        </div>
      </section>
    );
  }

  // ── DESKTOP LAYOUT (unchanged) ─────────────────────────────────────────────
  return (
    <section id="companies" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headingGroup}>
            <span className={styles.accentBar} />
            <h2 className={styles.title}>
              Our <span className={styles.titleBreak}><br /></span>Companies <span className={styles.titleBreak}><br /></span>&amp; Verticals
            </h2>
          </div>
          <div className={styles.controls}>
            {/* pause / play button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-[#0f1424] shadow-sm transition hover:shadow-md cursor-pointer"
              title={isPaused ? 'Resume auto rotation' : 'Pause auto rotation'}
              aria-label={isPaused ? 'Resume auto rotation' : 'Pause auto rotation'}
            >
              {isPaused ? (
                <Play className="h-[18px] w-[18px]" />
              ) : (
                <Pause className="h-[18px] w-[18px]" />
              )}
            </button>
            {/* counter pill */}
            <div className="inline-flex h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-2 shadow-sm">
              <button
                onClick={handlePrev}
                className="grid h-8 w-8 place-items-center rounded-full text-[#4b5262] transition hover:bg-black/5 cursor-pointer"
                aria-label="Previous company"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-1 font-mono text-sm tabular-nums text-[#4b5262]">
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <button
                onClick={handleNext}
                className="grid h-8 w-8 place-items-center rounded-full text-[#4b5262] transition hover:bg-black/5 cursor-pointer"
                aria-label="Next company"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <div className={styles.wheelBox}>
            <CompanyWheel
              companies={COMPANIES}
              activeIndex={activeIndex}
              rotationAngle={rotationAngle}
              onSelectCompany={handleSelectCompany}
            />
          </div>
          <CompanyInfoPanel company={activeCompany} />
        </div>
      </div>
    </section>
  );
}
