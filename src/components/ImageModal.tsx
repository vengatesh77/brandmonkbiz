'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Maximize2, Award } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  title: string;
  onClose: () => void;
}

export default function ImageModal({ isOpen, imageSrc, title, onClose }: ImageModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 1));
  const handleReset = () => setZoomLevel(1);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999999,
        backgroundColor: 'rgba(5, 7, 12, 0.95)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              backgroundColor: '#9e1b23',
              padding: '6px 12px',
              borderRadius: '4px',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Award style={{ width: '15px', height: '15px' }} />
            High-Resolution Inspector
          </div>
          <span style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, display: 'none' }} className="modal-title-text">
            {title}
          </span>
        </div>

        {/* Zoom Controls & Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              padding: '4px',
              display: 'flex',
              gap: '4px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <button
              onClick={handleZoomIn}
              style={{ color: '#ffffff', padding: '6px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
              title="Zoom In"
            >
              <ZoomIn style={{ width: '16px', height: '16px' }} />
              <span>Zoom In ({Math.round(zoomLevel * 100)}%)</span>
            </button>
            <button
              onClick={handleZoomOut}
              style={{ color: '#ffffff', padding: '6px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
              title="Zoom Out"
            >
              <ZoomOut style={{ width: '16px', height: '16px' }} />
            </button>
            <button
              onClick={handleReset}
              style={{ color: '#ffffff', padding: '6px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
              title="Reset Zoom"
            >
              <RotateCcw style={{ width: '14px', height: '14px' }} />
              <span>Reset</span>
            </button>
          </div>

          <button
            onClick={onClose}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            aria-label="Close modal"
          >
            <X style={{ width: '22px', height: '22px' }} />
          </button>
        </div>
      </div>

      {/* Image Display Area with Pan & Zoom */}
      <div
        style={{
          width: '94vw',
          height: '82vh',
          position: 'relative',
          overflow: 'auto',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transition: 'transform 0.3s ease-out',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            style={{
              objectFit: 'contain',
              userSelect: 'none',
            }}
            priority
          />
        </div>
      </div>

      {/* Bottom Hint */}
      <div style={{ position: 'absolute', bottom: '16px', color: '#94a3b8', fontSize: '0.8rem', pointerEvents: 'none' }}>
        Tip: Use Zoom buttons above or scroll to inspect team members and certifications in detail • Click outside or ESC to close
      </div>

      <style>{`
        @media (min-width: 768px) {
          .modal-title-text {
            display: inline-block !important;
          }
        }
      `}</style>
    </div>
  );
}
