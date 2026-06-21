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
    <nav className="app-navbar">
      <NavLink to="/" className="navbar-brand">
        Mending Nabung 💸
      </NavLink>

      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            end
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/decision"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
          >
            Beli vs Nabung
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/wishlist"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
          >
            Wishlist
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/history"
            className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
          >
            Riwayat
          </NavLink>
        </li>
      </ul>

      {customer && (
        <div className="navbar-profile">
          <div className="user-badge">
            <span className="username">👋 {customer.username}</span>
            <span className="balance">{formatRupiah(customer.balance)}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
