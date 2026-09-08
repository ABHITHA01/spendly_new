import React from 'react';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function TopHeader({ profileName, theme, onToggleTheme }) {
  return (
    <header className="top-header">
      <p className="top-greeting">
        {getGreeting()}, {profileName || 'there'} 👋
      </p>
      <div className="top-icons">
        <button className="icon-btn" type="button" aria-label="Search">
          🔍
        </button>
        <button className="icon-btn" type="button" aria-label="Notifications">
          🔔
        </button>
        <button
          className={`theme-pill ${theme === 'light' ? 'is-light' : ''}`}
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle dark/light mode"
        >
          <span className="theme-pill-icon">☀️</span>
          <span className="theme-pill-icon">🌙</span>
          <span className="theme-pill-knob" />
        </button>
      </div>
    </header>
  );
}
