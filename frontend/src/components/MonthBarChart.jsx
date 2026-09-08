import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from 'chart.js';
import { formatINR } from '../utils/format';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function MonthBarChart({ label, totalsByCategory, color }) {
  const categories = Object.keys(totalsByCategory);
  const values = categories.map((c) => totalsByCategory[c]);

  const data = {
    labels: categories,
    datasets: [
      {
        data: values,
        backgroundColor: [
  '#9DD7FF', // Blue
  '#B8A7F5', // Purple
  '#E5A6D8', // Pink
  '#FFF09A', // Light Yellow
  '#FFC39D', // Orange
  '#FFE680'  // Yellow
],
        borderRadius: 5,
        maxBarThickness: 16
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => formatINR(ctx.parsed.y) },
        bodyFont: { size: 9 },
        titleFont: { size: 9 }
      }
    },
    scales: {
      x: { ticks: { font: { size: 7.5 }, color: '#7c88a3' }, grid: { display: false } },
      y: { ticks: { font: { size: 7.5 }, color: '#7c88a3' }, grid: { color: 'rgba(124,136,163,0.1)' } }
    }
  };

  return (
    <div className="card">
      <p className="bottom-card-title" style={{ marginBottom: 6 }}>{label}</p>
      {categories.length === 0 ? (
        <p style={{ fontSize: 9.5, color: 'var(--text-muted)' }}>No entries this month.</p>
      ) : (
        <div style={{ height: 130 }}>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
}
