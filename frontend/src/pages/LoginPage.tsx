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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        padding: 24,
      }}
    >
      <div
        className="card-glass"
        style={{
          width: '100%',
          maxWidth: 420,
          padding: 40,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, textDecoration: 'none' }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 28, height: 28 }}
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.3rem', color: '#fff' }}>
              MendingNabung
            </span>
          </Link>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>Selamat Datang Kembali</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Masuk ke akunmu untuk melanjutkan
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Username</label>
            <input
              className="form-input"
              placeholder="Masukkan username"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 24 }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Masukkan password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          {error && (
            <div
              style={{
                padding: '10px 14px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: 8,
                color: '#f87171',
                fontSize: '0.85rem',
                marginBottom: 16,
              }}
            >
              Login gagal. Periksa username/password.
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px 0' }}
          >
            {isPending ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p style={{ marginTop: 24, textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Belum punya akun?{' '}
          <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
            Daftar Sekarang
          </Link>
        </p>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
