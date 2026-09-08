import React from 'react';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function TopBar({ profileName, theme, onToggleTheme }) {
  return (
    <div className="topbar">
      <p className="topbar-greeting">
        {getGreeting()}, {profileName || 'there'} 👋
      </p>
      <div className="topbar-actions">
        <button className="icon-btn" type="button" aria-label="Search">🔍</button>
        <button className="icon-btn" type="button" aria-label="Notifications">🔔</button>
        <button className="theme-toggle" onClick={onToggleTheme} type="button" aria-label="Toggle dark/light mode">
          <span className="theme-toggle-knob">{theme === 'dark' ? '🌙' : '☀️'}</span>
        </button>
      </div>
    </div>
  );
}
