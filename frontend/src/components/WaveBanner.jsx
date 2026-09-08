import React from 'react';

export default function WaveBanner({ remainingPercent }) {
  const boatLeft = Math.max(4, Math.min(92, remainingPercent));

  return (
    <div className="wave-banner">
      <svg className="wave-svg" viewBox="0 0 1000 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="35%" stopColor="#8b5cf6" />
            <stop offset="65%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <path
          d="M0,55 C120,20 220,80 340,45 C460,10 560,70 680,40 C800,12 900,55 1000,35 L1000,90 L0,90 Z"
          fill="url(#waveGrad)"
          opacity="0.9"
        />
        <path
          d="M0,65 C150,40 260,85 400,55 C540,25 640,75 760,50 C860,30 940,60 1000,50 L1000,90 L0,90 Z"
          fill="url(#waveGrad)"
          opacity="0.5"
        />
        <circle cx="90" cy="35" r="4" fill="#fff" opacity="0.5" />
        <circle cx="150" cy="20" r="2.5" fill="#fff" opacity="0.4" />
        <circle cx="230" cy="45" r="3" fill="#fff" opacity="0.35" />
      </svg>
      <span className="wave-boat" style={{ left: `${boatLeft}%` }}>⛵</span>
    </div>
  );
}
