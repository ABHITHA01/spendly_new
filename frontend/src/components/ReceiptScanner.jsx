import React, { useState } from 'react';
import { formatINR,categoryEmoji } from '../utils/format';

export default function ReceiptScanner({ onAddExpense }) {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  // Manual entry states
  const [manualAmount, setManualAmount] = useState('');
  const [manualCategory, setManualCategory] = useState('');
  const [manualNote, setManualNote] = useState('');

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
    setAnalysis(null);
    setError('');

    // Clear previous manual entry
    setManualAmount('');
    setManualCategory('');
    setManualNote('');
  };

  const analyzePhoto = async () => {
    if (!photo) {

      return;
    }

    setAnalyzing(true);
    setError('');
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append('image', photo);

      const response = await fetch('http://localhost:5000/api/analyze-expense', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.detail ||'Analysis failed');
      }
      setAnalysis(result);
    } catch (err) {
      console.error(err);
     setError(
  err.message || "Couldn't clearly read this receipt. Please enter the expense manually."
);

      setAnalysis(null);
    } finally {
      setAnalyzing(false);
    }
  };

  const confirmExpense = async () => {
    if (!analysis) {
      return;
    }

    try {
      await onAddExpense({
        amount: Number(analysis.amount),
        category: analysis.category,
        note: analysis.note || ''
      });

      setPhoto(null);
      setPreview(null);
      setAnalysis(null);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Could not save this expense.');
    }
  };

  const addManualExpense = async () => {
    if (!manualAmount || Number(manualAmount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (!manualCategory) {
      setError('Please select a category.');
      return;
    }

    try {
      await onAddExpense({
        amount: Number(manualAmount),
        category: manualCategory,
        note: manualNote.trim()
      });

      // Reset everything after saving
      setPhoto(null);
      setPreview(null);
      setAnalysis(null);
      setError('');
      setManualAmount('');
      setManualCategory('');
      setManualNote('');
    } catch (err) {
      console.error(err);
      setError('Could not save this expense.');
    }
  };

  return (
    <div className="receipt-scanner">

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        id="receipt-upload"
        hidden
        onChange={handlePhoto}
      />

      {/* Scan Receipt button */}
      <label
        htmlFor="receipt-upload"
        className="receipt-scan-btn"
      >
        📷 Scan Receipt
      </label>

      {/* ============================= */}
      {/* RECEIPT + MANUAL ENTRY AREA */}
      {/* ============================= */}

      {preview && (
  <div className={error ? "receipt-work-area" : "receipt-preview"}>
    
    {error && (
      <div className="manual-receipt-entry">
        <p className="manual-entry-title">
          Enter expense manually
        </p>

        <input
          type="number"
          placeholder="Amount (₹)"
          value={manualAmount}
          onChange={(e) => setManualAmount(e.target.value)}
        />

        <select
          value={manualCategory}
          onChange={(e) => setManualCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="Food">🍔 Food</option>
          <option value="Transport">🚗 Transport</option>
          <option value="Health">💊 Health</option>
          <option value="Savings">💰 Savings</option>
        </select>

        <input
          type="text"
          placeholder="Note (optional)"
          value={manualNote}
          onChange={(e) => setManualNote(e.target.value)}
        />

        <button
          type="button"
          className="manual-add-expense-btn"
          onClick={addManualExpense}
        >
          ✓ Add Expense
        </button>
      </div>
    )}

    <div className="receipt-preview">
      <img
        src={preview}
        alt="Receipt preview"
      />

      <button
        type="button"
        className="analyze-receipt-btn"
        onClick={analyzePhoto}
        disabled={analyzing}
      >
        {analyzing ? 'Analyzing...' : '✨ Analyze'}
      </button>
    </div>

  </div>
)}

      {/* ============================= */}
      {/* ERROR MESSAGE */}
      {/* ============================= */}

      {error && (
        <p className="receipt-error">
          {error}
        </p>
      )}

      {/* ============================= */}
      {/* SUCCESSFUL AI ANALYSIS */}
      {/* ============================= */}

      {analysis && (
        <div className="receipt-result">

          <p>
            Amount:{' '}
            <strong>
              {formatINR(analysis.amount)}
            </strong>
          </p>
          <div className="receipt-category-tile">
  <span className="receipt-category-emoji">
    {categoryEmoji(analysis.category)}
  </span>

  <span className="receipt-category-name">
    {analysis.category}
  </span>
</div>
          <p>
            Note:{' '}
            {analysis.note || '—'}
          </p>

          <div className="receipt-actions">

            <button
              type="button"
              onClick={confirmExpense}
            >
              ✓ Add Expense
            </button>

            <button
              type="button"
              onClick={() => setAnalysis(null)}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
}