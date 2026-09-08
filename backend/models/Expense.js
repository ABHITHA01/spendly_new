const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0.01 },
    note: { type: String, default: '', trim: true, maxlength: 200 },
    date: { type: Date, default: Date.now }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Expense', ExpenseSchema);
