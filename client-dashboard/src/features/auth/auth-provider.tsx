'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  company_name: string | null;
  company_phone: string | null;
  email_verified_at: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  company_name?: string;
  company_phone?: string;
  plan_id: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://posapp.oakitsolutionsandsupplies.com/api/v1/client';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const mountedRef = useRef(false);

  const fetchUser = useCallback(async (authToken: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        return true;
      } else {
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
        return false;
      }
    } catch {
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]);

  useEffect(() => {
    if (isLoading) return;
    if (pathname.startsWith('/auth')) return;
    if (!user && !token) {
      router.push('/auth/login');
    }
  }, [isLoading, user, token, pathname, router]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(typeof data.error === 'string' ? data.error : data.error?.message || 'Login failed');
    }

    const data = await res.json();
    localStorage.setItem('auth_token', data.token);
    setToken(data.token);
    setUser(data.user);

    await new Promise(resolve => setTimeout(resolve, 100));
    router.push('/dashboard');
  };

  const register = async (data: RegisterData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json();
      const msg = typeof errData.error === 'string' ? errData.error : errData.error?.message || 'Registration failed';
      throw new Error(msg);
    }

    const result = await res.json();
    if (result.token) {
      localStorage.setItem('auth_token', result.token);
      setToken(result.token);
      setUser(result.user);
      router.push('/dashboard');
    }
  };

  const logout = () => {
    if (token) {
      fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      }).catch(() => {});
    }
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
