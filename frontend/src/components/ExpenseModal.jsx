import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function ExpenseModal({ category, onClose, onSubmit }) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      setError('Enter an amount greater than ₹0.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await onSubmit({ category, amount: num, note: note.trim() });
      if (category === 'Savings') {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal-card" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>Log {category}</h2>

        <div className="field">
          <label htmlFor="exp-amount">Amount (₹)</label>
          <input
            id="exp-amount"
            type="number"
            step="0.01"
            min="0"
            autoFocus
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="exp-note">Note (optional)</label>
          <input
            id="exp-note"
            type="text"
            placeholder="What was it for?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        {error && <p className="modal-error">{error}</p>}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
