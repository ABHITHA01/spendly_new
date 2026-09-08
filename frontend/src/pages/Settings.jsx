import React, { useState } from 'react';

export default function Settings({ profile, saveProfile, theme, onToggleTheme }) {
  const [name, setName] = useState(profile?.name || '');
  const [salary, setSalary] = useState(profile?.salary || '');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    const salaryNum = parseFloat(salary);
    if (isNaN(salaryNum) || salaryNum <= 0) {
      setError('Salary must be a number greater than 0.');
      return;
    }
    setError('');
    try {
      await saveProfile({ name: name.trim(), salary: salaryNum });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message || 'Could not save.');
    }
  };

  return (
    <div>
      <p className="page-title">Settings</p>
      <p className="page-subtitle">Update your details and preferences.</p>

      <div className="section-stack">
        <form className="card" onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p className="section-title">Profile</p>
          <div className="field">
            <label htmlFor="set-name">Name</label>
            <input id="set-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="set-salary">Monthly salary (₹)</label>
            <input
              id="set-salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          {error && <p className="modal-error">{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            {saved ? 'Saved ✓' : 'Save changes'}
          </button>
        </form>

        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p className="section-title" style={{ marginBottom: 2 }}>Appearance</p>
            <p style={{ fontSize: 10.5, color: 'var(--card-muted)' }}>
              Currently: {theme === 'dark' ? 'Dark mode' : 'Light mode'}
            </p>
          </div>
          <button className="theme-toggle" onClick={onToggleTheme} type="button" aria-label="Toggle dark/light mode">
            <span className="theme-toggle-knob" />
          </button>
        </div>
      </div>
    </div>
  );
}
