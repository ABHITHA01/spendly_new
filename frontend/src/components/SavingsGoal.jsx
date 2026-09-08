import React, { useMemo, useState } from 'react';
import { formatINR } from '../utils/format';

export default function SavingsGoal({ totalSaved = 0 }) {
  const [goal, setGoal] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('spendlySavingsGoal')) || null;
    } catch {
      return null;
    }
  });

  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');

  const calculateMonths = (dateString) => {
    const now = new Date();
    const target = new Date(`${dateString}T00:00:00`);

    let months =
      (target.getFullYear() - now.getFullYear()) * 12 +
      (target.getMonth() - now.getMonth());

    if (target.getDate() < now.getDate()) {
      months -= 1;
    }

    return Math.max(1, months);
  };

  const handleSaveGoal = (e) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0 || !deadline) return;

    const newGoal = {
      amount: numericAmount,
      deadline
    };

    localStorage.setItem(
      'spendlySavingsGoal',
      JSON.stringify(newGoal)
    );

    setGoal(newGoal);
    setAmount('');
    setDeadline('');
  };

  const monthsRemaining = useMemo(() => {
    if (!goal?.deadline) return 1;
    return calculateMonths(goal.deadline);
  }, [goal]);

  const monthlyTarget = goal
    ? goal.amount / monthsRemaining
    : 0;

  const completion = goal
    ? Math.min(
        100,
        Math.round((totalSaved / goal.amount) * 100)
      )
    : 0;

  const remaining = goal
    ? Math.max(0, goal.amount - totalSaved)
    : 0;

  const deadlineText = goal
    ? new Date(`${goal.deadline}T00:00:00`).toLocaleDateString(
        'en-IN',
        {
          month: 'long',
          year: 'numeric'
        }
      )
    : '';

  if (!goal) {
    return (
      <div className="card savings-goal-card">
        <div className="savings-goal-header">
          <div>
            <p className="compact-eyebrow">SAVINGS GOAL</p>
            <p className="compact-title">
              What are you saving for?
            </p>
          </div>
        </div>

        <form
          className="savings-goal-form"
          onSubmit={handleSaveGoal}
        >
          <div className="goal-field">
            <label>Goal amount</label>

            <div className="goal-input-wrap">
              <span>₹</span>

              <input
                type="number"
                min="1"
                placeholder="30,000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="goal-field">
            <label>Deadline</label>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="goal-save-btn"
          >
            Set Goal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="card savings-goal-card">
      <div className="savings-goal-header">
        <div>
          <p className="compact-eyebrow">
            SAVINGS GOAL
          </p>

          <p className="compact-title">
            ₹{goal.amount.toLocaleString('en-IN')} by{' '}
            {deadlineText}
          </p>
        </div>

        <button
          className="goal-reset-btn"
          type="button"
          onClick={() => {
            localStorage.removeItem('spendlySavingsGoal');
            setGoal(null);
          }}
        >
          Reset
        </button>
      </div>

      <div className="goal-progress-section">
        <div
          className="goal-progress-ring"
          style={{
            '--progress': `${completion * 3.6}deg`
          }}
        >
          <div className="goal-progress-inner">
            <strong>{completion}%</strong>
            <span>complete</span>
          </div>
        </div>

        <div className="goal-stats">
          <div>
            <span>MONTHLY TARGET</span>
            <strong>
              {formatINR(Math.ceil(monthlyTarget))}
            </strong>
          </div>

          <div>
            <span>SAVED</span>
            <strong>
              {formatINR(totalSaved)}
            </strong>
          </div>

          <div>
            <span>REMAINING</span>
            <strong>
              {formatINR(remaining)}
            </strong>
          </div>
        </div>
      </div>

      <div className="goal-progress-bar">
        <div
          style={{
            width: `${completion}%`
          }}
        />
      </div>

      <p className="goal-helper">
        Save about{' '}
        <strong>
          {formatINR(Math.ceil(monthlyTarget))}
        </strong>{' '}
        each month to reach your goal.
      </p>
    </div>
  );
}