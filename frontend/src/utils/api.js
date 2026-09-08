const API_ROOT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_ROOT}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
  } catch (err) {
    throw new Error('Could not reach the server. Is the backend running?');
  }
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body.detail) detail = body.detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

export const api = {
  profile: {
    get: () => request('/api/profile'),
    update: (data) => request('/api/profile', { method: 'PUT', body: JSON.stringify(data) }),
    addCategory: (name) =>
      request('/api/profile/categories', { method: 'POST', body: JSON.stringify({ name }) })
  },
  expenses: {
    list: () => request('/api/expenses'),
    summary: () => request('/api/expenses/summary'),
    create: (data) => request('/api/expenses', { method: 'POST', body: JSON.stringify(data) }),
    remove: (id) => request(`/api/expenses/${id}`, { method: 'DELETE' })
  }
};
