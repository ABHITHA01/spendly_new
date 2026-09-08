import React, { useState } from 'react';
import { formatINR, daysLeftInMonth } from '../utils/format';

export default function WhatIfSlider({ profile, totalSpent }) {
  const salary = profile?.salary || 0;
  const [percent, setPercent] = useState(profile?.savingsTargetPercent || 20);

  const targetSavings = (salary * percent) / 100;
  const budgetCap = salary - targetSavings;
  const daysLeft = daysLeftInMonth();
  const dailyCap = daysLeft > 0 ? budgetCap / daysLeft : budgetCap;
  const overCap = totalSpent > budgetCap;

  return (
    <div className="card what-if-card">
      <div className="bottom-card-head">
        <p className="bottom-card-title">What-If Savings Goal</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 9.5, color: 'var(--text-muted)' }}>Target Savings</span>
        <span style={{ fontSize: 11, color: 'var(--accent-2)' }}>{percent}%</span>
      </div>

      <div className="slider-row">
        <input
          type="range"
          min={5}
          max={50}
          step={1}
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
        />
      </div>

      <div className="whatif-stats">
        <div>
          <p className="label">You'll save</p>
          <p className="value">{formatINR(targetSavings)}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className="label">Daily Cap</p>
          <p className="value" style={{ color: 'var(--cyan)' }}>{formatINR(dailyCap)} / day</p>
        </div>
      </div>

      {overCap && (
        <div className="insight-banner warn" style={{ marginTop: 8, marginBottom: 0 }}>
          You've already spent {formatINR(totalSpent)} — over this month's cap for that goal.
        </div>
      )}
    </div>
  );
}
