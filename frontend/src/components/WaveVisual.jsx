import React from 'react';

export default function WaveVisual({ remainingPercent }) {
  const boatLeft = Math.min(92, Math.max(4, remainingPercent));

  return (
    <div className="wave-card">
      <svg className="wave-svg wave-layer-3" viewBox="0 0 200 60" preserveAspectRatio="none">
        <path
          d="M0,35 C20,25 40,45 60,35 C80,25 100,45 120,35 C140,25 160,45 180,35 C190,32 195,33 200,35 L200,60 L0,60 Z"
          fill="#3b82f6"
          opacity="0.5"
        />
      </svg>
      <svg className="wave-svg wave-layer-2" viewBox="0 0 200 60" preserveAspectRatio="none">
        <path
          d="M0,40 C25,28 45,50 70,38 C90,30 110,48 135,38 C155,30 175,48 200,40 L200,60 L0,60 Z"
          fill="#a855f7"
          opacity="0.6"
        />
      </svg>
      <svg className="wave-svg wave-layer-1" viewBox="0 0 200 60" preserveAspectRatio="none">
        <path
          d="M0,45 C22,36 42,54 65,44 C88,34 108,52 130,44 C152,36 172,52 200,45 L200,60 L0,60 Z"
          fill="#ec4899"
          opacity="0.7"
        />
      </svg>
      <span className="wave-boat" style={{ left: `${boatLeft}%` }}>⛵</span>
    </div>
  );
}
