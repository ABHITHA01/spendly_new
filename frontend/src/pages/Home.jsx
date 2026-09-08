import React, { useState } from 'react';
import SummaryBanner from '../components/SummaryBanner';
import BurnRateCard from '../components/BurnRateCard';
import CategoryGrid from '../components/CategoryGrid';
import ExpenseModal from '../components/ExpenseModal';
import QuickLog from '../components/QuickLog';
import RecentActivity from '../components/RecentActivity';
import SmartInsights from '../components/SmartInsights';
import SpendingChart from '../components/SpendingChart';
import HeatmapCalendar from '../components/HeatmapCalendar';
import WhatIfSlider from '../components/WhatIfSlider';
import { daysLeftInMonth } from '../utils/format';
import SavingsGoal from '../components/SavingsGoal';
import ReceiptScanner from '../components/ReceiptScanner';

export default function Home({ profile, expenses, summary, addExpense, deleteExpense, addCategory, deletedExpense, undoDelete }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const salary = profile?.salary || 0;
  const balance = salary - summary.totalSpent;
  const daysLeft = daysLeftInMonth();
  const safeDaily = daysLeft > 0 ? balance / daysLeft : balance;

  return (
    <div>
      <SummaryBanner profile={profile} totalSpent={summary.totalSpent} />

      <div className="section-stack">
        <div className="tight-stack">
          <BurnRateCard profile={profile} totalSpent={summary.totalSpent} />
          <SavingsGoal totalSaved={summary.totalsByCategory?.Savings || 0}/>

          <div className="quick-log-header">
  <div>
    <p className="section-title">Quick log</p>
    <QuickLog onLog={addExpense} />
  </div>

  <ReceiptScanner onAddExpense={addExpense} />
</div>

        <CategoryGrid
          profile={profile}
          totalsByCategory={summary.totalsByCategory}
          totalSpent={summary.totalSpent}
          onSelectCategory={setActiveCategory}
          onAddCategory={addCategory}
        />

        <div className="bottom-row">
          <SpendingChart totalsByCategory={summary.totalsByCategory} />
          <HeatmapCalendar expenses={expenses} safeDaily={safeDaily} />
          <WhatIfSlider profile={profile} totalSpent={summary.totalSpent} />
        </div>

        <SmartInsights profile={profile} totalsByCategory={summary.totalsByCategory} totalSpent={summary.totalSpent} />

        <RecentActivity expenses={expenses} onDelete={deleteExpense} />

{deletedExpense && (
  <div className="undo-toast">
    <span>Expense deleted.</span>

    <button type="button" onClick={undoDelete}>
      Undo
    </button>
  </div>
)}
      </div>
      </div>
      {activeCategory && (
        <ExpenseModal
          category={activeCategory}
          onClose={() => setActiveCategory(null)}
          onSubmit={addExpense}
        />
      )}
    </div>
  );
}
