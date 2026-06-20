import React, { createContext, useContext, useState } from 'react';
import type { Customer } from '@/types/user.types';

interface AuthContextValue {
  customer: Customer | null;
  token: string | null;
  login: (token: string, customer: Customer) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token') || 'mock-jwt-token');
  const [customer, setCustomer] = useState<Customer | null>(() => {
    const saved = localStorage.getItem('customer');
    if (saved) return JSON.parse(saved);
    // Mock user fallback agar Dashboard langsung terlihat saat pengembangan
    return {
      id: 1,
      username: 'Ridwan Faiz H',
      role: 'CUSTOMER',
      balance: 15000000,
      monthlyIncome: 5000000,
    };
  });

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
