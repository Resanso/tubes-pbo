import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLogin();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, { onSuccess: () => navigate('/') });
  };

  return (
    <div className="page-container" style={{ maxWidth: 420, justifyContent: 'center', minHeight: '100vh' }}>
      {/* ── Logo / Brand ── */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--accent-primary-glow)',
            border: '2px solid rgba(45,212,191,0.25)',
            marginBottom: 12,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: 32, height: 32 }}
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: 4 }}>MendingNabung</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Masuk untuk mulai menabung cerdas
        </p>
      </div>

      {/* ── Login Card ── */}
      <div className="card-glass fade-in-up">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Username */}
          <div className="input-group">
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="input-control"
              placeholder="Masukkan username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              required
              autoFocus
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="input-control"
                placeholder="Masukkan password"
                style={{ paddingRight: 44 }}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
                tabIndex={-1}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: '10px 14px',
                background: 'rgba(251, 113, 133, 0.1)',
                border: '1px solid rgba(251, 113, 133, 0.3)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-rejected)',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>Login gagal. Periksa username atau password.</span>
            </div>
          )}

          {/* Submit */}
          <Button type="submit" disabled={isPending} size="lg">
            {isPending ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 16,
                    height: 16,
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite',
                  }}
                />
                Memproses...
              </span>
            ) : (
              'Masuk'
            )}
          </Button>
        </form>
      </div>

      {/* ── Register link ── */}
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        Belum punya akun?{' '}
        <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
