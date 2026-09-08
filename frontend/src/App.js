import React, { useEffect, useState } from 'react';
import Splash from './components/Splash';
import Onboarding from './components/Onboarding';
import Sidebar from './components/Sidebar';
import CursorGlow from './components/CursorGlow';
import Home from './pages/Home';
import Insights from './pages/Insights';
import Overview from './pages/Overview';
import Settings from './pages/Settings';
import { useAppData } from './utils/useAppData';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [view, setView] = useState('home');
  const {
    profile,
    expenses,
    summary,
    loading,
    error,
    saveProfile,
    addCategory,
    addExpense,
    deleteExpense,
    deletedExpense,
    undoDelete
  } = useAppData();

  const theme = profile?.theme || 'dark';

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    saveProfile({ theme: theme === 'dark' ? 'light' : 'dark' });
  };

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  if (loading) {
    return (
      <div className="onboarding-screen">
        <p style={{ color: 'var(--text-muted, #7c88a3)', fontSize: 11 }}>Loading Spendly…</p>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="onboarding-screen">
        <div className="onboarding-card">
          <h1>Couldn't connect</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!profile?.onboarded) {
    return <Onboarding onComplete={saveProfile} />;
  }

  return (
    <div className="app-shell">
      <CursorGlow />
      <Sidebar view={view} setView={setView} profileName={profile?.name} />
      <div className="main-area">
        {view === 'home' && (
          <Home
            profile={profile}
            expenses={expenses}
            summary={summary}
            addExpense={addExpense}
            deleteExpense={deleteExpense}
            addCategory={addCategory}
            deletedExpense={deletedExpense}
            undoDelete={undoDelete}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />
        )}
        {view === 'insights' && (
  <Insights
    profile={profile}
    summary={summary}
    expenses={expenses}
  />
)}
        {view === 'overview' && (
  <Overview
    expenses={expenses}
    deleteExpense={deleteExpense}
    deletedExpense={deletedExpense}
    undoDelete={undoDelete}
  />
)}
        {view === 'settings' && (
          <Settings profile={profile} saveProfile={saveProfile} theme={theme} onToggleTheme={handleToggleTheme} />
        )}
        {view === 'theme' && (
          <Settings profile={profile} saveProfile={saveProfile} theme={theme} onToggleTheme={handleToggleTheme} />
        )}
      </div>
    </div>
  );
}
