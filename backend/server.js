require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./database');

const profileRoutes = require('./routes/profile');
const expenseRoutes = require('./routes/expenses');
const analyzeRoutes = require('./routes/analyze');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Spendly API is running.' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/profile', profileRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/analyze-expense', analyzeRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ detail: 'Something went wrong on our end.' });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    });
}

module.exports = app;
