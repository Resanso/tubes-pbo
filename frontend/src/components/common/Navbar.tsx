import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { formatRupiah } from '@/utils/format.utils';

const Navbar: React.FC = () => {
  const { customer, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav-glass">
      <div className="nav-brand">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: '28px', height: '28px' }}
        >
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
        <span>MendingNabung</span>
      </div>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Wishlist
        </NavLink>
        <NavLink to="/decision" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Keputusan
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Riwayat
        </NavLink>
        <NavLink to="/add-item" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          + Tambah Barang
        </NavLink>
      </div>

      <div className="nav-profile">
        {customer && (
          <div style={{ textAlign: 'right' }}>
            <div className="nav-username">👋 {customer.username}</div>
            <div className="balance">{formatRupiah(customer.balance)}</div>
          </div>
        )}
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
