const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

router.get('/', async (req, res, next) => {
  try {
    let doc = await Profile.findById('singleton');
    if (!doc) doc = await Profile.create({});
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const updates = {};
    const { name, salary, theme, onboarded, savingsTargetPercent } = req.body;

    if (name !== undefined) {
      const trimmed = String(name).trim();
      if (trimmed.length < 1 || trimmed.length > 60) {
        return res.status(422).json({ detail: 'Name must be 1-60 characters.' });
      }
      updates.name = trimmed;
    }
    if (salary !== undefined) {
      const n = parseFloat(salary);
      if (isNaN(n) || n <= 0) {
        return res.status(422).json({ detail: 'Salary must be a number greater than 0.' });
      }
      updates.salary = n;
    }
    if (theme !== undefined) {
      if (!['dark', 'light'].includes(theme)) {
        return res.status(422).json({ detail: 'Invalid theme.' });
      }
      updates.theme = theme;
    }
    if (onboarded !== undefined) updates.onboarded = !!onboarded;
    if (savingsTargetPercent !== undefined) {
      const n = parseFloat(savingsTargetPercent);
      if (isNaN(n) || n < 5 || n > 50) {
        return res.status(422).json({ detail: 'Savings target must be between 5 and 50.' });
      }
      updates.savingsTargetPercent = n;
    }

    const doc = await Profile.findByIdAndUpdate('singleton', updates, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    });
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

router.post('/categories', async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    if (!name || name.length > 30) {
      return res.status(422).json({ detail: 'Category name must be 1-30 characters.' });
    }
    const doc = await Profile.findByIdAndUpdate(
      'singleton',
      { $addToSet: { customCategories: name } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
