'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { COMPANIES } from '@/data/companies';
import CompanyWheel from './CompanyWheel';
import CompanyInfoPanel from '@/components/CompanyInfoPanel';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import styles from '../companies.module.css';

export default function BusinessUniverse() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Active index ref for timer callbacks
  const activeIndexRef = useRef<number>(0);
  activeIndexRef.current = activeIndex;

  const total = COMPANIES.length;

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

  // AUTOMATIC COMPANY CHANGE — 2 SECONDS (2000ms)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Preload all company images into browser memory to eliminate image load flashes
  useEffect(() => {
    COMPANIES.forEach((company) => {
      if (typeof window !== 'undefined' && company.image) {
        const img = new window.Image();
        img.src = company.image;
      }
    });
  }, []);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const activeCompany = COMPANIES[activeIndex];

  return (
    <section id="companies" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            Our Companies &amp; Verticals
          </h2>
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
