import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegister } from '@/hooks/useAuth';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useRegister();
  const [form, setForm] = useState({
    username: '',
    password: '',
    balance: '',
    monthlyIncome: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      {
        username: form.username,
        password: form.password,
        balance: Number(form.balance),
        monthlyIncome: Number(form.monthlyIncome),
      },
      { onSuccess: () => navigate('/login') }
    );
  };

  const field = (label: string, key: keyof typeof form, type = 'text', placeholder = '') => (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
        type={type}
        className="input-control"
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        required
      />
    </div>
  );

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
        style={{ maxWidth: 440, width: '100%', padding: '36px 32px' }}
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
          Buat Akun Baru
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 24 }}>
          Mulai perjalanan finansialmu
        </p>

        <form onSubmit={handleSubmit}>
          {field('Username', 'username', 'text', 'Pilih username')}
          {field('Password', 'password', 'password', 'Buat password')}
          {field('Saldo Awal (Rp)', 'balance', 'number', 'Masukkan saldo awal')}
          {field('Penghasilan Bulanan (Rp)', 'monthlyIncome', 'number', 'Masukkan pendapatan bulanan')}

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
              Registrasi gagal. Username mungkin sudah dipakai.
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px 0', fontSize: '1rem', marginTop: 4 }}
          >
            {isPending ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Sudah punya akun?{' '}
          <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
            Masuk
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

export default RegisterPage;
