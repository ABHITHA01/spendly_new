const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    _id: { type: String, default: 'singleton' },
    name: { type: String, default: '', trim: true },
    salary: { type: Number, default: 0, min: 0 },
    theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
    customCategories: { type: [String], default: [] },
    onboarded: { type: Boolean, default: false },
    savingsTargetPercent: { type: Number, default: 20, min: 5, max: 50 }
  },
  { timestamps: true, _id: false }
);

module.exports = mongoose.model('Profile', ProfileSchema);
