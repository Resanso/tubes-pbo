export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface User {
  id: number;
  username: string;
  role: UserRole;
}

export interface Customer extends User {
  balance: number;
  monthlyIncome: number;
}

export interface RegisterRequest {
  username: string;
  password: string;
  balance: number;
  monthlyIncome: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  customer: Customer;
}
