import React, { useState } from 'react';

export default function Onboarding({ onComplete }) {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Tell us what to call you.');
      return;
    }
    const salaryNum = parseFloat(salary);
    if (isNaN(salaryNum) || salaryNum <= 0) {
      setError('Enter your monthly salary as a number greater than 0.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await onComplete({ name: name.trim(), salary: salaryNum, onboarded: true });
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="onboarding-screen">
      <form className="onboarding-card" onSubmit={handleSubmit} autoComplete="off">
        <h1>Welcome to Spendly</h1>
        <p>Let's get your money picture set up. Takes 10 seconds.</p>

        <div className="field">
          <label htmlFor="ob-name">Your name</label>
          <input
            id="ob-name"
            name="spendly-display-name"
            type="text"
            placeholder="What should we call you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-lpignore="true"
          />
        </div>

        <div className="field">
          <label htmlFor="ob-salary">Monthly salary (₹)</label>
          <input
            id="ob-salary"
            name="spendly-monthly-salary"
            type="number"
            placeholder="e.g. 45000"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            autoComplete="off"
            data-lpignore="true"
          />
        </div>

        {error && <p className="modal-error">{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Setting up…' : 'Get started'}
        </button>
      </form>
    </div>
  );
}
