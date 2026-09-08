import React, { useMemo } from 'react';
import MonthBarChart from '../components/MonthBarChart';
import MonthComparisonInsights from '../components/MonthComparisonInsights';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Insights({ expenses }) {
  const { currentTotals, previousTotals, currentLabel, previousLabel } = useMemo(() => {
    const today = new Date();
    const curYear = today.getFullYear();
    const curMonth = today.getMonth();
    const prevDate = new Date(curYear, curMonth - 1, 1);
    const prevYear = prevDate.getFullYear();
    const prevMonth = prevDate.getMonth();

    const current = {};
    const previous = {};

    (expenses || []).forEach((e) => {
      const d = new Date(e.date);
      if (d.getFullYear() === curYear && d.getMonth() === curMonth) {
        current[e.category] = (current[e.category] || 0) + Number(e.amount || 0);
      } else if (d.getFullYear() === prevYear && d.getMonth() === prevMonth) {
        previous[e.category] = (previous[e.category] || 0) + e.amount;
      }
    });

    return {
      currentTotals: current,
      previousTotals: previous,
      currentLabel: `${MONTH_NAMES[curMonth]} ${curYear}`,
      previousLabel: `${MONTH_NAMES[prevMonth]} ${prevYear}`
    };
  }, [expenses]);

  return (
    <div>
      <p className="page-title">Insights</p>
      <p className="page-subtitle">This month compared to last, category by category.</p>

      <div className="section-stack">
        <div className="month-compare-grid">
          <MonthBarChart label={previousLabel} totalsByCategory={previousTotals} color="#7c88a3" />
          <MonthBarChart label={currentLabel} totalsByCategory={currentTotals} color="#6366f1" />
        </div>

        <MonthComparisonInsights currentTotals={currentTotals} previousTotals={previousTotals} />
      </div>
    </div>
  );
}

