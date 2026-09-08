import React from 'react';
import { formatINR, daysLeftInMonth } from '../utils/format';

export default function BurnRateCard({ profile, totalSpent }) {
  const salary = profile?.salary || 0;
  const balance = salary - totalSpent;
  const daysLeft = daysLeftInMonth();
  const safeDaily = daysLeft > 0 ? balance / daysLeft : balance;
  const onTrack = safeDaily >= 0;

  return (
    <div className="card burn-rate-card">
      <div className="burn-rate-title">
        <span>🔥</span>
        <span>Daily Burn-Rate</span>
      </div>

      <div className="burn-rate-item">
        <span className="label">Days Left in Month</span>
        <span className="value">{daysLeft} Days</span>
      </div>

      <div className="burn-rate-divider" />

      <div className="burn-rate-item">
        <span className="label">Safe Daily Spending</span>
        <span className="value" style={{ color: onTrack ? 'var(--success)' : 'var(--danger)' }}>
          {formatINR(safeDaily)} / day
        </span>
      </div>

      <span className={`burn-rate-pill ${onTrack ? 'good' : 'warn'}`}>
        {onTrack ? "You're on track! 💪" : 'Slow down a little ⚠️'}
      </span>
    </div>
  );
}
