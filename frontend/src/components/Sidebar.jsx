import React from 'react';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'insights', label: 'Insights', icon: '📊' },
  { key: 'overview', label: 'Overall View', icon: '🗂️' },
  { key: 'settings', label: 'Settings', icon: '⚙️' }
];

export default function Sidebar({ view, setView, profileName }) {
  const initial = (profileName || '?').charAt(0).toUpperCase();

  return (
    <aside className="sidebar">
      <p className="sidebar-brand">Spendly</p>
      <p className="sidebar-tagline">Spend smart. Live more.</p>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`sidebar-btn ${view === item.key ? 'active' : ''}`}
            onClick={() => setView(item.key)}
            type="button"
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-spacer" />

      <div className="sidebar-user" onClick={() => setView('settings')}>
        <span className="sidebar-avatar">{initial}</span>
        <span>{profileName || 'Account'}</span>
      </div>
    </aside>
  );
}
