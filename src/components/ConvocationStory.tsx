'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, Award, Users, CheckCircle, Sparkles, Download, ArrowUpRight } from 'lucide-react';

interface ConvocationStoryProps {
  onOpenZoomModal: (imgSrc: string, title: string) => void;
}

export default function ConvocationStory({ onOpenZoomModal }: ConvocationStoryProps) {
  const [zoomScale, setZoomScale] = useState(1);

  return (
    <section id="impact-story" style={{ backgroundColor: '#ffffff', padding: '100px 0', borderBottom: '1px solid #eef2f6' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="section-tag">
              Talent Transformation & Convocation
            </div>
            <h2 className="section-title" style={{ marginBottom: '10px' }}>
              Empowering the Next Generation of Tech Leaders
            </h2>
            <p className="section-subtitle">
              A glimpse into the Brand Monk Academy Convocation Ceremony — celebrating graduating cohorts certified in Full-Stack Software Architecture, Cloud Infrastructure, and Applied AI.
            </p>
          </div>

          <button
            onClick={() =>
              onOpenZoomModal(
                '/images/brandmonk-hero.jpg',
                'Brand Monk Academy Convocation Ceremony & Certified Cohort'
              )
            }
            className="btn-primary"
            style={{ padding: '12px 20px', fontSize: '0.85rem' }}
          >
            <ZoomIn style={{ width: '16px', height: '16px' }} />
            Open Fullscreen High-Res Zoom
          </button>
        </div>

        {/* Enhanced High-Resolution Image Frame with Precision Zoom & Border */}
        <div
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
            border: '2px solid #0f172a',
            backgroundColor: '#0a0c10',
          }}
        >
          {/* Interactive Zoom Image Area */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '560px',
              overflow: 'hidden',
              cursor: 'zoom-in',
            }}
            onClick={() =>
              onOpenZoomModal(
                '/images/brandmonk-hero.jpg',
                'Brand Monk Academy Convocation Ceremony & Certified Cohort'
              )
            }
            title="Click to view fullscreen high resolution zoom"
          >
            <Image
              src="/images/brandmonk-hero.jpg"
              alt="Brand Monk Academy Convocation & Graduating Cohort"
              fill
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'center 40%',
                transition: 'transform 0.5s ease',
                transform: `scale(${zoomScale})`,
              }}
            />

            {/* Subtle Gradient Overlays for High-End Corporate Depth */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, transparent 50%, rgba(15, 23, 42, 0.85) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Top Right Floating Badge */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '6px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              <Award style={{ width: '16px', height: '16px', color: '#c8963e' }} />
              <span>Official Certification Batch</span>
            </div>

            {/* Bottom Caption Bar */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ color: '#c8963e', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  Brand Monk Tech Campus • Graduating Batch
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  Convocation & Corporate Induction Ceremony
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomScale(zoomScale === 1 ? 1.25 : 1);
                  }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    padding: '8px 14px',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {zoomScale === 1 ? 'Quick Zoom (1.25x)' : 'Reset Zoom'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenZoomModal(
                      '/images/brandmonk-hero.jpg',
                      'Brand Monk Academy Convocation Ceremony & Certified Cohort'
                    );
                  }}
                  style={{
                    backgroundColor: '#9e1b23',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <ZoomIn style={{ width: '14px', height: '14px' }} />
                  Inspect Image
                </button>
              </div>
            </div>

          </div>

          {/* Key Facts Below Photo */}
          <div
            style={{
              backgroundColor: '#0f172a',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '24px 30px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                Certification Standard
              </div>
              <div style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600 }}>
                Enterprise Ready Full-Stack & AI
              </div>
            </div>

            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                Cohort Placement Velocity
              </div>
              <div style={{ color: '#22c55e', fontSize: '0.95rem', fontWeight: 700 }}>
                100% Placed within 45 Days
              </div>
            </div>

            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                Hiring Partner Ecosystem
              </div>
              <div style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600 }}>
                120+ MNCs, GCCs & Scaleups
              </div>
            </div>

            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                Alumni Network Reach
              </div>
              <div style={{ color: '#c8963e', fontSize: '0.95rem', fontWeight: 700 }}>
                50,000+ Across 18 Countries
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
