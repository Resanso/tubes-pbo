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
    <div className="lp-root">
      <div className="lp-card">
        {/* Brand */}
        <div className="lp-brand">
          <div className="lp-icon">
            <PiggyBank size={40} strokeWidth={1.5} />
          </div>
          <h1 className="lp-title">Mending Nabung</h1>
          <p className="lp-sub">Masuk untuk melanjutkan</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="lp-form">
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
            <div className="pw-wrap">
              <input
                className="input-control pw-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPassword(prev => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="lp-error">
              <span>Login gagal. Periksa username/password.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary lp-btn"
          >
            {isPending ? (
              <>
                <span className="lp-spin" />
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
        <div className="lp-footer">
          <span>Belum punya akun?</span>
          <Link to="/register" className="lp-link">
            Daftar Sekarang
          </Link>
        </div>

        {/* Demo hint */}
        <div className="lp-demo">
          <p className="lp-demo-text">
            Akun demo: <strong>resan</strong> / <strong>resan123</strong>
          </p>
        </div>
      </div>

      <style>{`
        .lp-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .lp-root::before {
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
        .lp-root::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: rgba(45,212,191,0.08);
          filter: blur(100px);
          bottom: -100px;
          left: -100px;
          pointer-events: none;
        }
        .lp-card {
          width: 100%;
          max-width: 420px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-lg);
          padding: 2.5rem 2rem;
          box-shadow: var(--shadow-premium), 0 0 40px rgba(45,212,191,0.06);
          position: relative;
          z-index: 1;
          animation: fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .lp-brand {
          text-align: center;
          margin-bottom: 2rem;
        }
        .lp-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          border-radius: 20px;
          background: rgba(45,212,191,0.1);
          border: 1px solid rgba(45,212,191,0.25);
          color: var(--accent-primary);
          margin-bottom: 1rem;
          box-shadow: 0 0 20px rgba(45,212,191,0.15);
        }
        .lp-title {
          font-family: var(--font-title);
          font-size: 1.75rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.35rem;
        }
        .lp-sub {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .lp-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .lp-form .input-label {
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        .pw-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .pw-input {
          width: 100%;
          padding-right: 44px !important;
        }
        .pw-toggle {
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
        .pw-toggle:hover {
          color: var(--accent-primary);
          opacity: 1;
        }
        .lp-error {
          padding: 0.75rem 1rem;
          background: rgba(251,113,133,0.1);
          border: 1px solid rgba(251,113,133,0.25);
          border-radius: var(--radius-sm);
          color: var(--color-rejected);
          font-size: 0.85rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lp-btn {
          width: 100%;
          padding: 14px 20px;
          font-size: 1rem;
          margin-top: 0.25rem;
          gap: 10px;
        }
        .lp-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }
        .lp-spin {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: lpspin 0.6s linear infinite;
        }
        @keyframes lpspin {
          to { transform: rotate(360deg); }
        }
        .lp-footer {
          margin-top: 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 4px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .lp-link {
          font-weight: 700;
          color: var(--accent-primary);
          transition: all 0.2s ease;
        }
        .lp-link:hover {
          color: var(--accent-secondary);
          text-decoration: underline;
        }
        .lp-demo {
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          background: rgba(45,212,191,0.06);
          border: 1px solid rgba(45,212,191,0.12);
          border-radius: var(--radius-sm);
          text-align: center;
        }
        .lp-demo-text {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .lp-demo-text strong {
          color: var(--accent-primary);
          font-weight: 700;
        }
        @media (max-width: 480px) {
          .lp-card { padding: 2rem 1.25rem; }
          .lp-title { font-size: 1.5rem; }
          .lp-icon { width: 60px; height: 60px; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
