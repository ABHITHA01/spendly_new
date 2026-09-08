import React, { useMemo } from 'react';
import { formatINR } from '../utils/format';

export default function MonthComparisonInsights({ currentTotals, previousTotals }) {
  const insights = useMemo(() => {
    const list = [];
    const categories = new Set([...Object.keys(currentTotals), ...Object.keys(previousTotals)]);

    categories.forEach((cat) => {
      if (cat === 'Savings') return; // handled separately below
      const current = currentTotals[cat] || 0;
      const previous = previousTotals[cat] || 0;
      if (previous <= 0) return;

      const pctChange = Math.round(((current - previous) / previous) * 100);

      if (pctChange >= 20) {
        list.push({
          type: 'warn',
          text: `You spent ${pctChange}% more on ${cat} this month (${formatINR(current)} vs ${formatINR(previous)}). Might be worth spending a little less here.`
        });
      } else if (pctChange <= -20) {
        list.push({
          type: 'good',
          text: `Nice — ${cat} spending is down ${Math.abs(pctChange)}% from last month.`
        });
      }
    });

    const currentSavings = currentTotals['Savings'] || 0;
    const previousSavings = previousTotals['Savings'] || 0;

    if (previousSavings > 0 || currentSavings > 0) {
      if (currentSavings > previousSavings) {
        list.push({
          type: 'good',
          text: `You saved ${formatINR(currentSavings - previousSavings)} more than last month. Keep it up!`
        });
      } else if (currentSavings < previousSavings) {
        list.push({
          type: 'warn',
          text: `Savings dipped by ${formatINR(previousSavings - currentSavings)} compared to last month. A fresh month is a fresh start.`
        });
      } else {
        list.push({ type: 'neutral', text: 'Your savings held steady compared to last month.' });
      }
    }

    if (list.length === 0) {
      list.push({
        type: 'neutral',
        text: "Not enough data from last month yet to compare — keep logging and we'll spot patterns soon."
      });
    }

    return list;
  }, [currentTotals, previousTotals]);

  return (
    <div className="card">
      <p className="section-title">Month-over-month</p>
      {insights.map((ins, i) => (
        <div key={i} className={`insight-banner ${ins.type}`}>
          {ins.text}
        </div>
      ))}
    </div>
  );
}
