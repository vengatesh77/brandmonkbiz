import React from 'react';

export function BrandMonkIcon({ size = 64, className = '', color = '#ffffff' }: { size?: number; className?: string; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Head */}
      <circle cx="50" cy="38" r="21" fill={color} />
      
      {/* Left Ear */}
      <circle cx="27" cy="38" r="5" fill={color} />
      
      {/* Right Ear */}
      <circle cx="73" cy="38" r="5" fill={color} />
      
      {/* Closed Meditative Eyes (Dark cutout lines) */}
      <path
        d="M39 37 Q44 42 47 37"
        stroke="#050608"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M53 37 Q56 42 61 37"
        stroke="#050608"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Body / Robe */}
      {/* Upper chest and shoulders */}
      <path
        d="M26 65 C26 54 36 49 50 49 C64 49 74 54 74 65 L74 68 C74 72 68 76 50 76 C32 76 26 72 26 68 Z"
        fill={color}
      />
      
      {/* Kasaya Robe Sash Across Shoulder (Dark cutout ribbon) */}
      <path
        d="M32 74 Q50 63 68 51"
        stroke="#050608"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M26 67 Q46 68 72 67"
        stroke="#050608"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Bottom curved base / lotus seat */}
      <path
        d="M28 72 C32 82 40 85 50 85 C60 85 68 82 72 72 C66 79 58 81 50 81 C42 81 34 79 28 72 Z"
        fill={color}
      />
    </svg>
  );
}
