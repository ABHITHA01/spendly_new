import React from 'react';
import { formatINR } from '../utils/format';

export default function SummaryBanner({ profile, totalSpent }) {
  const salary = profile?.salary || 0;
  const balance = salary - totalSpent;
  const remainingPercent = salary > 0 ? Math.max(0, Math.min(100, (balance / salary) * 100)) : 0;
  const boatLeft = Math.max(6, Math.min(90, remainingPercent));

  return (
    <div className="hero-banner">
      <div className="hero-stats">
        <div className="hero-stat">
          <span className="card-label">Monthly Salary</span>
          <span className="card-value">{formatINR(salary)}</span>
        </div>
        <div className="hero-divider" />
        <div className="hero-stat">
          <span className="card-label">Amount Spent</span>
          <span className="card-value">{formatINR(totalSpent)}</span>
        </div>
        <div className="hero-divider" />
        <div className="hero-stat">
          <span className="card-label">Balance</span>
          <span className="card-value" style={{ color: balance < 0 ? 'var(--danger)' : undefined }}>
            {formatINR(balance)}
          </span>
        </div>
        <div className="hero-divider" />
        <div className="hero-stat">
          <span className="card-label">Remaining</span>
          <span className="card-value">{Math.round(remainingPercent)}%</span>
        </div>
      </div>

      <div className="hero-wave-wrap">
        <svg
          className="hero-wave-svg"
          viewBox="0 0 2000 90"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGradA" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="35%" stopColor="#8b5cf6" />
              <stop offset="65%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* soft glow layer, blurred and translucent, sits behind the crisp wave */}
          <g filter="url(#waveGlow)">
            <path
              d="M0,40 Q125,55 250,40 T500,40 T750,40 T1000,40 L1000,90 L0,90 Z
                 M1000,40 Q1125,55 1250,40 T1500,40 T1750,40 T2000,40 L2000,90 L1000,90 Z"
              fill="url(#waveGradA)"
              opacity="0.55"
            />
          </g>

          {/* crisp translucent wave on top */}
          <path
            d="M0,40 Q125,55 250,40 T500,40 T750,40 T1000,40 L1000,90 L0,90 Z
               M1000,40 Q1125,55 1250,40 T1500,40 T1750,40 T2000,40 L2000,90 L1000,90 Z"
            fill="url(#waveGradA)"
            opacity="0.5"
          />
          <path
            d="M0,58 Q125,42 250,58 T500,58 T750,58 T1000,58 L1000,90 L0,90 Z
               M1000,58 Q1125,42 1250,58 T1500,58 T1750,58 T2000,58 L2000,90 L1000,90 Z"
            fill="url(#waveGradA)"
            opacity="0.25"
          />
        </svg>
        <div className="hero-wave-glow-overlay" />
      </div>

      <span className="hero-boat" style={{ left: `${boatLeft}%` }}>⛵</span>
    </div>
  );
}
