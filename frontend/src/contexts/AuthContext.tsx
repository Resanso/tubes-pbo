import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Customer } from '@/types/user.types';
import { userApi } from '@/api/user.api';

interface AuthContextValue {
  customer: Customer | null;
  token: string | null;
  login: (token: string, customer: Customer) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [customer, setCustomer] = useState<Customer | null>(() => {
    try {
      const saved = localStorage.getItem('customer');
      return saved ? JSON.parse(saved) : null;
    } catch {
      localStorage.removeItem('customer');
      return null;
    }
  });

  // Jika token ada tapi customer hilang dari localStorage, pulihkan dari API
  useEffect(() => {
    if (!token || customer) return;
    const match = token.match(/^dev-token-(\d+)$/);
    if (!match) return;
    const id = parseInt(match[1], 10);
    userApi.getById(id)
      .then((c) => {
        setCustomer(c);
        localStorage.setItem('customer', JSON.stringify(c));
      })
      .catch(() => {
        localStorage.removeItem('token');
        setToken(null);
      });
  }, [token, customer]);

  const login = (newToken: string, newCustomer: Customer) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('customer', JSON.stringify(newCustomer));
    setToken(newToken);
    setCustomer(newCustomer);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    setToken(null);
    setCustomer(null);
  };

  return (
    <AuthContext.Provider value={{ customer, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
