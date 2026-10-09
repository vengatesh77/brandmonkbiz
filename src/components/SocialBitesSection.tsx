'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles, X } from 'lucide-react';

const VIDEO_SRCS = [
  '/videos/WhatsApp Video 2026-10-06 at 12.55.04 PM.mp4',
  '/videos/WhatsApp Video 2026-10-06 at 12.56.19 PM.mp4',
  '/videos/WhatsApp Video 2026-10-07 at 1.20.50 PM.mp4',
  '/videos/WhatsApp Video 2026-10-06 at 12.55.04 PM (1).mp4',
  '/videos/WhatsApp Video 2026-10-06 at 12.55.02 PM.mp4',
];

export default function SocialBitesSection() {
  const [isMuted, setIsMuted] = useState(true);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const hasAutoplayed = useRef(false);

  // Autoplay all videos when section scrolls into view (once)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAutoplayed.current) {
          hasAutoplayed.current = true;
          videoRefs.current.forEach((vid) => {
            if (!vid) return;
            vid.muted = true;
            vid.play().catch(() => {});
          });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Sync mute state across all videos
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = next;
    });
  };

  return (
    <section
      id="social-bites"
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
        color: '#111111',
        paddingTop: '90px',
        paddingBottom: '100px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #e2e8f0',
      }}
    >
      {/* Ambient glow accents */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: '450px', height: '450px', backgroundColor: 'rgba(201,165,77,0.06)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '500px', height: '500px', backgroundColor: 'rgba(158,27,35,0.04)', borderRadius: '50%', filter: 'blur(140px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>

        {/* ── Section Header ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2.5px', color: '#9e1b23', marginBottom: '10px' }}>
              <Sparkles style={{ width: '14px', height: '14px', color: '#C9A54D' }} />
              Social Feed &amp; Reels
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 3.2rem)', fontWeight: 700, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0, textTransform: 'uppercase' }}>
              BITES FROM SOCIAL MEDIA
            </h2>
            <p style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', color: '#475569', maxWidth: '650px', marginTop: '12px', lineHeight: 1.6, fontWeight: 400 }}>
              Capturing high-energy moments, student convocation milestones, and exclusive behind-the-scenes stories across the Brand Monk Group ecosystem.
            </p>
          </div>

          {/* Sound toggle */}
          <button
            onClick={toggleMute}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '9999px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: isMuted ? '#64748b' : '#9e1b23', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            className="sound-btn"
            title={isMuted ? 'Unmute videos' : 'Mute videos'}
          >
            {isMuted
              ? <><VolumeX style={{ width: '15px', height: '15px' }} /><span>MUTED</span></>
              : <><Volume2 style={{ width: '15px', height: '15px' }} /><span>SOUND ON</span></>
            }
          </button>
        </div>

        {/* ── 5 Videos in one row ── */}
        <div className="reels-grid">
          {VIDEO_SRCS.map((src, i) => (
            <div
              key={i}
              className="reel-card"
              onClick={() => setModalSrc(src)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setModalSrc(src)}
              aria-label={`Play video ${i + 1} fullscreen`}
            >
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src={src}
                loop
                playsInline
                muted
                preload="metadata"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Subtle bottom vignette so card edges look clean */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.35) 100%)', pointerEvents: 'none' }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Fullscreen modal ── */}
      {modalSrc && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          onClick={() => setModalSrc(null)}
        >
          <div
            style={{ position: 'relative', width: '100%', maxWidth: '440px', aspectRatio: '9 / 16', borderRadius: '18px', overflow: 'hidden', backgroundColor: '#000', boxShadow: '0 30px 70px rgba(0,0,0,0.5)', border: '1px solid rgba(201,165,77,0.4)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <video src={modalSrc} autoPlay controls playsInline style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            <button
              onClick={() => setModalSrc(null)}
              style={{ position: 'absolute', top: '14px', right: '14px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.75)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
              aria-label="Close"
            >
              <X style={{ width: '18px', height: '18px' }} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .reels-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          width: 100%;
        }

        .reel-card {
          position: relative;
          aspect-ratio: 9 / 16;
          border-radius: 14px;
          overflow: hidden;
          background-color: #f1f5f9;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1),
                      box-shadow 0.3s ease,
                      border-color 0.3s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }

        .reel-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: #9e1b23;
          box-shadow: 0 20px 40px rgba(158,27,35,0.15), 0 8px 20px rgba(0,0,0,0.08);
        }

        .sound-btn:hover {
          background-color: #ffffff !important;
          border-color: #9e1b23 !important;
          color: #9e1b23 !important;
        }

        @media (max-width: 1100px) {
          .reels-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 700px) {
          .reels-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 420px) {
          .reels-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}
