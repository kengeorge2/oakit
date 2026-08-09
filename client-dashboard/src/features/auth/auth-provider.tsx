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
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  fetchUser: (token?: string) => Promise<boolean>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  company_name?: string;
  company_phone?: string;
  plan_id: string;
  currency?: string;
  country?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://posapp.oakitsolutionsandsupplies.com/api/v1/client';

async function extractErrorMessage(res: Response): Promise<string> {
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      const data = await res.json();
      if (typeof data.error === 'string') return data.error;
      if (data.error?.message) return data.error.message;
      if (data.message) return data.message;
    } catch {}
  }
  if (res.status === 419) return 'Session expired. Please try again.';
  if (res.status === 401) return 'Invalid email or password.';
  if (res.status === 422) return 'Validation failed. Please check your input.';
  return `Login failed (${res.status})`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const mountedRef = useRef(false);

  const fetchUser = useCallback(async (authToken?: string): Promise<boolean> => {
    try {
      const headers: Record<string, string> = { 'Accept': 'application/json' };
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      const res = await fetch(`${API_URL}/auth/me`, {
        headers,
        credentials: 'include',
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
      // Try cookie-based auth
      fetchUser().finally(() => setIsLoading(false));
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
      throw new Error(await extractErrorMessage(res));
    }

    const data = await res.json();
    localStorage.setItem('auth_token', data.token);
    setToken(data.token);
    setUser(data.user);
    router.push('/dashboard');
  };

  const register = async (data: RegisterData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(await extractErrorMessage(res));
    }

    const result = await res.json();
    if (result.token) {
      localStorage.setItem('auth_token', result.token);
      setToken(result.token);
      setUser(result.user);
      router.push('/dashboard');
    }
  };

  const logout = async () => {
    if (token) {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
      }).catch(() => {});
    }
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, isAuthenticated: !!user, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
