import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegister } from '@/hooks/useAuth';
import { UserPlus, User, Lock, Wallet, TrendingUp, PiggyBank, Eye, EyeOff } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useRegister();
  const [form, setForm] = useState({ username: '', password: '', balance: '', monthlyIncome: '' });
  const [showPassword, setShowPassword] = useState(false);

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

  const field = (label: string, key: keyof typeof form, type = 'text', icon?: React.ReactNode) => (
    <div className="input-group">
      <label className="input-label">
        {icon}
        {label}
      </label>
      <input
        type={type}
        className="input-control"
        placeholder={`Masukkan ${label.toLowerCase()}`}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        required
      />
    </div>
  );

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Brand Header */}
        <div className="register-brand">
          <div className="register-logo">
            <PiggyBank size={36} strokeWidth={1.5} />
          </div>
          <h1 className="register-title">Buat Akun Baru</h1>
          <p className="register-subtitle">Mulai perjalanan finansialmu</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="register-form">
          {field('Username', 'username', 'text', <User size={14} />)}
          
          <div className="input-group">
            <label className="input-label">
              <Lock size={14} />
              Password
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-control password-input"
                placeholder="Masukkan password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {field('Saldo (Rp)', 'balance', 'number', <Wallet size={14} />)}
          {field('Penghasilan Bulanan (Rp)', 'monthlyIncome', 'number', <TrendingUp size={14} />)}

          {error && (
            <div className="register-error">
              <span>Registrasi gagal. Username mungkin sudah dipakai.</span>
            </div>
          )}

          <button type="submit" disabled={isPending} className="btn btn-primary register-submit">
            {isPending ? (
              <>
                <span className="spinner" />
                Memproses...
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Daftar
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="register-footer">
          <span>Sudah punya akun?</span>
          <Link to="/login" className="register-login-link">
            Masuk
          </Link>
        </div>
      </div>

      <style>{`
        .register-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .register-page::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: var(--accent-primary-glow);
          filter: blur(120px);
          top: -150px;
          left: -150px;
          pointer-events: none;
        }

        .register-page::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: rgba(45, 212, 191, 0.06);
          filter: blur(100px);
          bottom: -100px;
          right: -100px;
          pointer-events: none;
        }

        .register-container {
          width: 100%;
          max-width: 420px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-lg);
          padding: 2.5rem 2rem;
          box-shadow: var(--shadow-premium), 0 0 40px rgba(45, 212, 191, 0.06);
          position: relative;
          z-index: 1;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .register-brand {
          text-align: center;
          margin-bottom: 2rem;
        }

        .register-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: rgba(45, 212, 191, 0.1);
          border: 1px solid rgba(45, 212, 191, 0.25);
          color: var(--accent-primary);
          margin-bottom: 1rem;
          box-shadow: 0 0 20px rgba(45, 212, 191, 0.15);
        }

        .register-title {
          font-family: var(--font-title);
          font-size: 1.6rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.35rem;
        }

        .register-subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .register-form .input-label {
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-input {
          width: 100%;
          padding-right: 44px !important;
        }

        .password-toggle {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
          opacity: 0.6;
        }

        .password-toggle:hover {
          color: var(--accent-primary);
          opacity: 1;
        }

        .register-error {
          padding: 0.75rem 1rem;
          background: rgba(251, 113, 133, 0.1);
          border: 1px solid rgba(251, 113, 133, 0.25);
          border-radius: var(--radius-sm);
          color: var(--color-rejected);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .register-submit {
          width: 100%;
          padding: 14px 20px;
          font-size: 1rem;
          margin-top: 0.25rem;
          gap: 10px;
        }

        .register-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .register-footer {
          margin-top: 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 4px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .register-login-link {
          font-weight: 700;
          color: var(--accent-primary);
          transition: all 0.2s ease;
        }

        .register-login-link:hover {
          color: var(--accent-secondary);
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .register-container {
            padding: 2rem 1.25rem;
          }

          .register-title {
            font-size: 1.35rem;
          }

          .register-logo {
            width: 56px;
            height: 56px;
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
