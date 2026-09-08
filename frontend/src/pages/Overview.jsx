import React from 'react';
import { formatINR, categoryEmoji } from '../utils/format';

export default function Overview({
  expenses,
  deleteExpense,
  deletedExpense,
  undoDelete
}) {
  const downloadCSV = () => {
    if (!expenses || expenses.length === 0) {
      alert('No expenses to download.');
      return;
    }

    const headers = [
      'Date',
      'Category',
      'Amount',
      'Note'
    ];

    const rows = expenses.map((expense) => [
      expense.date || '',
      expense.category || '',
      expense.amount || 0,
      `"${String(expense.note || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(','))
    ].join('\n');

    const blob = new Blob(
      [csvContent],
      { type: 'text/csv;charset=utf-8;' }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'spendly-expenses.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="overall-view-header">
        <div className="overall-view-title">
          <h1>Overview</h1>
          <p>Every expense you've logged.</p>
        </div>

        <button
          type="button"
          className="download-csv-btn"
          onClick={downloadCSV}
        >
          ↓ Download CSV
        </button>
      </div>

      {/* UNDO MESSAGE */}
      {deletedExpense && (
        <div className="undo-box">
          <span>Expense deleted</span>

          <button
            type="button"
            onClick={undoDelete}
          >
            ↩ Undo
          </button>
        </div>
      )}

      <div className="card overall-expense-card">
        {expenses.length === 0 ? (
          <p style={{ fontSize: 12, color: 'var(--card-muted)' }}>
            No expenses logged yet.
          </p>
        ) : (
          expenses.map((e) => (
            <div className="activity-row" key={e._id}>
              <span>{categoryEmoji(e.category)}</span>

              <span className="activity-cat">
                {e.category}
              </span>

              <span className="activity-note">
                {e.note || '—'}
              </span>

              <span
                style={{
                  fontSize: 10,
                  color: 'var(--card-muted)',
                  minWidth: 50
                }}
              >
                {new Date(e.date).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short'
                })}
              </span>

              <span className="activity-amount">
                {formatINR(e.amount)}
              </span>

              <button
                className="btn-danger"
                onClick={() => deleteExpense(e._id)}
                aria-label={`Delete ${e.category} entry`}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}