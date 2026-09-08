const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.get('/', async (req, res, next) => {
  try {
    const docs = await Expense.find({}).sort({ date: -1, created_at: -1 });
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

router.get('/summary', async (req, res, next) => {
  try {
    const docs = await Expense.find({}).lean();
    const totalsByCategory = {};
    let totalSpent = 0;

    docs.forEach((e) => {
      totalsByCategory[e.category] = (totalsByCategory[e.category] || 0) + e.amount;
      totalSpent += e.amount;
    });

    const now = new Date();
    const dayTotals = {};
    docs.forEach((e) => {
      const d = new Date(e.date);
      if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()) {
        const day = d.getDate();
        dayTotals[day] = (dayTotals[day] || 0) + e.amount;
      }
    });

    res.json({
      totalSpent: round2(totalSpent),
      totalsByCategory,
      dayTotals,
      expenseCount: docs.length
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { category, amount, note, date } = req.body;
    const amt = parseFloat(amount);
    if (!category || String(category).trim() === '') {
      return res.status(422).json({ detail: 'Category is required.' });
    }
    if (isNaN(amt) || amt <= 0) {
      return res.status(422).json({ detail: 'Amount must be a number greater than 0.' });
    }
    const doc = await Expense.create({
      category: String(category).trim(),
      amount: round2(amt),
      note: (note || '').trim(),
      date: date ? new Date(date) : new Date()
    });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const doc = await Expense.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ detail: 'Expense not found.' });
    res.json({ message: 'Expense deleted', id: req.params.id });
  } catch (err) {
    if (err.name === 'CastError') return res.status(404).json({ detail: 'Expense not found.' });
    next(err);
  }
});

function round2(n) {
  return Math.round(n * 100) / 100;
}

module.exports = router;
