import { useCallback, useEffect, useState } from 'react';
import { api } from '../utils/api';

export function useAppData() {
  const [profile, setProfile] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    totalSpent: 0,
    totalsByCategory: {},
    dayTotals: {},
    expenseCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletedExpense, setDeletedExpense] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const [p, exp, sum] = await Promise.all([
        api.profile.get(),
        api.expenses.list(),
        api.expenses.summary()
      ]);

      setProfile(p);
      setExpenses(exp);
      setSummary(sum);
      setError('');
    } catch (err) {
      setError(err.message || 'Could not load your data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Automatically hide Undo after 3 seconds
  useEffect(() => {
    if (!deletedExpense) return;

    const timer = setTimeout(() => {
      setDeletedExpense(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [deletedExpense]);

  const saveProfile = useCallback(
    async (data) => {
      const updated = await api.profile.update(data);
      setProfile(updated);
      return updated;
    },
    []
  );

  const addCategory = useCallback(async (name) => {
    const updated = await api.profile.addCategory(name);
    setProfile(updated);
    return updated;
  }, []);

  const addExpense = useCallback(
    async (data) => {
      await api.expenses.create(data);
      await refresh();
    },
    [refresh]
  );

  const deleteExpense = useCallback(
    async (id) => {
      const deleted = expenses.find((e) => e._id === id);

      await api.expenses.remove(id);

      setDeletedExpense(deleted);

      await refresh();

      return deleted;
    },
    [expenses, refresh]
  );

  const undoDelete = useCallback(
    async () => {
      if (!deletedExpense) return;

      const { _id, ...expenseData } = deletedExpense;

      await api.expenses.create(expenseData);

      setDeletedExpense(null);

      await refresh();
    },
    [deletedExpense, refresh]
  );

  return {
    profile,
    expenses,
    summary,
    loading,
    error,
    refresh,
    saveProfile,
    addCategory,
    addExpense,
    deleteExpense,
    deletedExpense,
    undoDelete
  };
}
