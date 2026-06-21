import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useAuth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLogin();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, { onSuccess: () => navigate('/') });
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Username</label><br />
          <input
            style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            required
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label><br />
          <input
            type="password"
            style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>Login gagal. Periksa username/password.</p>}
        <button type="submit" disabled={isPending} style={{ width: '100%', padding: 10, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          {isPending ? 'Loading...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: 16, textAlign: 'center' }}>
        Belum punya akun? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
