import React, { useMemo } from 'react';
import { formatINR } from '../utils/format';

export default function SmartInsights({ profile, totalsByCategory, totalSpent }) {
  const salary = profile?.salary || 0;
  const balance = salary - totalSpent;

  const insights = useMemo(() => {
    const list = [];
    if (salary <= 0) return list;

    const foodSpent = totalsByCategory['Food'] || 0;
    if (foodSpent > salary * 0.3) {
      list.push({
        type: 'warn',
        text: `Food spending (${formatINR(foodSpent)}) has passed 30% of your salary. Might be worth a closer look.`
      });
    }

    const balancePercent = (balance / salary) * 100;
    if (balancePercent < 20) {
      list.push({
        type: 'warn',
        text: `Your balance has dropped below 20% of your salary (${Math.round(balancePercent)}% left). Consider slowing down.`
      });
    } else if (balancePercent > 60) {
      list.push({
        type: 'good',
        text: `You're in great shape — ${Math.round(balancePercent)}% of your salary is still untouched.`
      });
    }

    const savingsSpent = totalsByCategory['Savings'] || 0;
    if (savingsSpent <= 0) {
      list.push({
        type: 'neutral',
        text: 'No savings logged yet this month. Even a small amount adds up.'
      });
    }

    if (list.length === 0) {
      list.push({ type: 'neutral', text: "You're tracking steadily. Keep logging to see more insights." });
    }

    return list;
  }, [salary, balance, totalsByCategory]);

  return (
    <div className="card">
      <p className="section-title">Smart insights</p>
      {insights.map((ins, i) => (
        <div key={i} className={`insight-banner ${ins.type}`}>
          {ins.text}
        </div>
      ))}
    </div>
  );
}
