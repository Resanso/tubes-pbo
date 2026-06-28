import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useAuth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLogin();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, { onSuccess: () => navigate('/dashboard') });
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        className="card-glass fade-in-up"
        style={{ maxWidth: 420, width: '100%', padding: '36px 32px' }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-title)',
                fontSize: '1.6rem',
                fontWeight: 800,
                color: '#ffffff',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              MendingNabung
            </div>
          </Link>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.4rem',
            fontWeight: 700,
            marginBottom: 4,
            color: '#ffffff',
          }}
        >
          Selamat Datang Kembali
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 24 }}>
          Masuk untuk melanjutkan
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              className="input-control"
              placeholder="Masukkan username"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-control"
              placeholder="Masukkan password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          {error && (
            <p
              style={{
                color: 'var(--color-rejected)',
                fontSize: '0.85rem',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Login gagal. Periksa username/password.
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px 0', fontSize: '1rem' }}
          >
            {isPending ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Belum punya akun?{' '}
          <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
            Daftar Sekarang
          </Link>
        </p>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
