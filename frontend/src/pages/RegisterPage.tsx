import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegister } from '@/hooks/useAuth';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useRegister();
  const [form, setForm] = useState({ username: '', password: '', balance: '', monthlyIncome: '' });

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

  const field = (label: string, key: keyof typeof form, type = 'text') => (
    <div style={{ marginBottom: 12 }}>
      <label>{label}</label><br />
      <input
        type={type}
        style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        required
      />
    </div>
  );

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {field('Username', 'username')}
        {field('Password', 'password', 'password')}
        {field('Saldo (Rp)', 'balance', 'number')}
        {field('Penghasilan Bulanan (Rp)', 'monthlyIncome', 'number')}
        {error && <p style={{ color: 'red' }}>Registrasi gagal. Username mungkin sudah dipakai.</p>}
        <button type="submit" disabled={isPending} style={{ width: '100%', padding: 10, background: '#16a34a', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          {isPending ? 'Loading...' : 'Register'}
        </button>
      </form>
      <p style={{ marginTop: 16, textAlign: 'center' }}>
        Sudah punya akun? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
