import React from 'react';
import confetti from 'canvas-confetti';

const PRESETS = [
  { label: '☕ Coffee ₹150', category: 'Food', amount: 150, note: 'Coffee' },
  { label: '🍱 Lunch ₹250', category: 'Food', amount: 250, note: 'Lunch' },
  { label: '🚌 Bus ₹40', category: 'Transport', amount: 40, note: 'Bus pass' },
  { label: '💞 Heartspent ₹200', category: 'Heartspent', amount: 200, note: '' }
];

export default function QuickLog({ onLog }) {
  const handleClick = async (preset) => {
    await onLog({ category: preset.category, amount: preset.amount, note: preset.note });
    if (preset.category === 'Savings') {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="quick-log-row">
      {PRESETS.map((p) => (
        <button key={p.label} type="button" className="quick-log-btn" onClick={() => handleClick(p)}>
          {p.label}
        </button>
      ))}
    </div>
  );
}
