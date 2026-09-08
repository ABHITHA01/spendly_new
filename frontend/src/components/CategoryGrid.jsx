import React, { useState } from 'react';
import { DEFAULT_CATEGORIES, categoryEmoji, formatINR } from '../utils/format';

const CATEGORY_COLORS = {
  Food: '#f59e0b',
  Accommodation: '#3b82f6',
  Electricity: '#eab308',
  Clothes: '#ec4899',
  Grocery: '#10b981',
  Transport: '#f97316',
  Health: '#ef4444',
  Insurance: '#0ea5e9',
  Heartspent: '#a855f7',
  Savings: '#22c55e'
};

function colorFor(cat) {
  return CATEGORY_COLORS[cat] || '#6366f1';
}

export default function CategoryGrid({ profile, totalsByCategory, totalSpent, onSelectCategory, onAddCategory }) {
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [error, setError] = useState('');

  const allCategories = [
    ...DEFAULT_CATEGORIES.map((c) => c.key),
    ...((profile?.customCategories) || [])
  ];

  const heartspentTotal = totalsByCategory['Heartspent'] || 0;
  const guiltFreeRatio = totalSpent > 0 ? Math.round((heartspentTotal / totalSpent) * 100) : 0;

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      setError('Give the category a name.');
      return;
    }
    setError('');
    try {
      await onAddCategory(newCatName.trim());
      setNewCatName('');
      setAddingCategory(false);
    } catch (err) {
      setError(err.message || 'Could not add category.');
    }
  };

  return (
    <>
      <div className="category-grid">
        {allCategories.map((cat) => {
          const isHeartspent = cat === 'Heartspent';
          const amount = totalsByCategory[cat] || 0;
          const share = totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0;
          const color = colorFor(cat);

          return (
            <div
              key={cat}
              className={`category-tile ${isHeartspent ? 'heartspent' : ''}`}
              onClick={() => onSelectCategory(cat)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectCategory(cat)}
            >
              {isHeartspent && <span className="guilt-free-badge">Guilt-Free</span>}

              <div className="category-tile-head">
                <div className="category-tile-left">
                  <span className="category-icon-box" style={{ backgroundColor: `${color}22` }}>
                    {categoryEmoji(cat)}
                  </span>
                  <span className="category-name">{cat}</span>
                </div>
                <span className="category-chevron">›</span>
              </div>

              <p className="category-amount">{formatINR(amount)}</p>

              <div className="category-stats">
                <span className="share">{share}% of total</span>
                {isHeartspent && <span style={{ color: 'var(--accent-2)' }}>{guiltFreeRatio}% guilt-free</span>}
              </div>

              <div className="mini-bar">
                <div className="mini-bar-fill" style={{ width: `${Math.min(100, share)}%`, backgroundColor: color }} />
              </div>
            </div>
          );
        })}

        <button type="button" className="add-category-tile" onClick={() => setAddingCategory(true)}>
          <span className="plus-icon">+</span>
          <span>Add Category</span>
        </button>
      </div>

      {addingCategory && (
        <div className="modal-backdrop" onClick={() => setAddingCategory(false)}>
          <form className="modal-card" onClick={(e) => e.stopPropagation()} onSubmit={handleAddCategory}>
            <h2>New category</h2>
            <div className="field">
              <label htmlFor="new-cat">Category name</label>
              <input
                id="new-cat"
                type="text"
                autoFocus
                placeholder="e.g. Subscriptions"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
              />
            </div>
            {error && <p className="modal-error">{error}</p>}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setAddingCategory(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
