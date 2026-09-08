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

export default function SpendingChart({ totalsByCategory }) {
  const categories = Object.keys(totalsByCategory);
  const values = categories.map((c) => totalsByCategory[c]);

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Spent',
        data: values,
       backgroundColor: [
  '#3B82F6', // Blue
  '#6366F1', // Blue-purple
  '#8B5CF6', // Purple
  '#A855F7', // Purple-pink
  '#EC4899', // Pink
  '#F472B6', // Pink
  '#F97316', // Orange
  '#FB923C', // Light orange
  '#FDBA74'  // Soft orange
],
        borderRadius: 6,
        maxBarThickness: 20
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
        bodyFont: { size: 10 },
        titleFont: { size: 10 }
      }
    },
    scales: {
      x: { ticks: { font: { size: 8.5 }, color: [
  '#3B82F6', // Blue
  '#6366F1', // Blue-purple
  '#8B5CF6', // Purple
  '#A855F7', // Purple-pink
  '#EC4899', // Pink
  '#F472B6', // Pink
  '#F97316', // Orange
  '#FB923C', // Light orange
  '#FDBA74'  // Soft orange
], }, grid: { display: false } },
      y: { ticks: { font: { size: 8.5 }, color: [
  '#3B82F6', // Blue
  '#6366F1', // Blue-purple
  '#8B5CF6', // Purple
  '#A855F7', // Purple-pink
  '#EC4899', // Pink
  '#F472B6', // Pink
  '#F97316', // Orange
  '#FB923C', // Light orange
  '#FDBA74'  // Soft orange
], }, grid: { color: 'rgba(124,136,163,0.1)' } }
    }
  };

  return (
    <div className="card spending-overview-card">
      <div className="bottom-card-head">
        <p className="bottom-card-title">Spending Overview</p>
        <span className="dropdown-pill">This Month</span>
      </div>
      {categories.length === 0 ? (
        <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>Log a few expenses to see your breakdown here.</p>
      ) : (
        <div style={{ height: 110 }}>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
}
