export function formatINR(amount) {
  const n = Number(amount) || 0;
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

export const DEFAULT_CATEGORIES = [
  { key: 'Food', emoji: '🍽️', color: '#f97316' },
  { key: 'Accommodation', emoji: '🏠', color: '#3b82f6' },
  { key: 'Electricity', emoji: '⚡', color: '#f59e0b' },
  { key: 'Clothes', emoji: '👕', color: '#06b6d4' },
  { key: 'Grocery', emoji: '🛒', color: '#84cc16' },
  { key: 'Transport', emoji: '🚌', color: '#ef4444' },
  { key: 'Health', emoji: '❤️‍🩹', color: '#f43f5e' },
  { key: 'Insurance', emoji: '🛡️', color: '#0ea5e9' },
  { key: 'Heartspent', emoji: '💜', color: '#a855f7' },
  { key: 'Savings', emoji: '💰', color: '#22c55e' }
];

export function categoryColor(name) {
  const found = DEFAULT_CATEGORIES.find((c) => c.key === name);
  return found ? found.color : '#64748b';
}

export function categoryEmoji(name) {
  const found = DEFAULT_CATEGORIES.find((c) => c.key === name);
  return found ? found.emoji : '🏷️';
}

export function daysInMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function daysLeftInMonth(date = new Date()) {
  return daysInMonth(date) - date.getDate() + 1;
}
