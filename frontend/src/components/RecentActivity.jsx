import React from 'react';
import { formatINR, categoryEmoji } from '../utils/format';

export default function RecentActivity({ expenses, onDelete }) {
  const recent = expenses.slice(0, 5);

  return (
    <div className="card">
      <p className="section-title">Recent activity</p>
      {recent.length === 0 ? (
        <p style={{ fontSize: 11, color: 'var(--card-muted)' }}>
          Nothing logged yet — tap a category tile to get started.
        </p>
      ) : (
        recent.map((e) => (
          <div className="activity-row" key={e._id}>
            <span>{categoryEmoji(e.category)}</span>
            <span className="activity-cat">{e.category}</span>
            <span className="activity-note">{e.note || '—'}</span>
            <span className="activity-amount">{formatINR(e.amount)}</span>
            <button className="btn-danger" onClick={() => onDelete(e._id)} aria-label={`Delete ${e.category} entry`}>
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  );
}
