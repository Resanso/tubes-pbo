import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useAuth';
import { LogIn, User, Lock, Eye, EyeOff, PiggyBank } from 'lucide-react';

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
    <div className="login-page">
      <div className="login-container">
        {/* Brand Header */}
        <div className="login-brand">
          <div className="login-logo">
            <PiggyBank size={40} strokeWidth={1.5} />
          </div>
          <h1 className="login-title">Mending Nabung</h1>
          <p className="login-subtitle">Masuk untuk melanjutkan</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label">
              <User size={14} />
              Username
            </label>
            <input
              className="input-control"
              type="text"
              placeholder="Masukkan username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              required
              autoFocus
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              <Lock size={14} />
              Password
            </label>
            <div className="password-wrapper">
              <input
                className="input-control password-input"
                type={showPassword ? 'text' : 'password'}
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

          {error && (
            <div className="login-error">
              <span>Login gagal. Periksa username/password.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary login-submit"
          >
            {isPending ? (
              <>
                <span className="spinner" />
                Memproses...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Masuk
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <span>Belum punya akun?</span>
          <Link to="/register" className="login-register-link">
            Daftar Sekarang
          </Link>
        </div>

        {/* Demo Account Hint */}
        <div className="login-demo">
          <p className="demo-text">
            Akun demo: <strong>resan</strong> / <strong>resan123</strong>
          </p>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        /* Subtle background glow */
        .login-page::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: var(--accent-primary-glow);
          filter: blur(120px);
          top: -150px;
          right: -150px;
          pointer-events: none;
        }

        .login-page::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: rgba(45, 212, 191, 0.08);
          filter: blur(100px);
          bottom: -100px;
          left: -100px;
          pointer-events: none;
        }

        .login-container {
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

        .login-brand {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          border-radius: 20px;
          background: rgba(45, 212, 191, 0.1);
          border: 1px solid rgba(45, 212, 191, 0.25);
          color: var(--accent-primary);
          margin-bottom: 1rem;
          box-shadow: 0 0 20px rgba(45, 212, 191, 0.15);
        }

        .login-title {
          font-family: var(--font-title);
          font-size: 1.75rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.35rem;
        }

        .login-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .login-form .input-label {
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

        .login-error {
          padding: 0.75rem 1rem;
          background: rgba(251, 113, 133, 0.1);
          border: 1px solid rgba(251, 113, 133, 0.25);
          border-radius: var(--radius-sm);
          color: var(--color-rejected);
          font-size: 0.85rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .login-submit {
          width: 100%;
          padding: 14px 20px;
          font-size: 1rem;
          margin-top: 0.25rem;
          gap: 10px;
        }

        .login-submit:disabled {
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

        .login-footer {
          margin-top: 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 4px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .login-register-link {
          font-weight: 700;
          color: var(--accent-primary);
          transition: all 0.2s ease;
        }

        .login-register-link:hover {
          color: var(--accent-secondary);
          text-decoration: underline;
        }

        .login-demo {
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          background: rgba(45, 212, 191, 0.06);
          border: 1px solid rgba(45, 212, 191, 0.12);
          border-radius: var(--radius-sm);
          text-align: center;
        }

        .demo-text {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .demo-text strong {
          color: var(--accent-primary);
          font-weight: 700;
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 2rem 1.25rem;
          }

          .login-title {
            font-size: 1.5rem;
          }

          .login-logo {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
