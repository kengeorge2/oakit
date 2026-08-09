const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://posapp.oakitsolutionsandsupplies.com/api/v1/client';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

function getXsrfToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

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
  if (res.status === 401) return 'Unauthorized. Please log in again.';
  if (res.status === 422) return 'Validation failed. Please check your input.';
  return `API error: ${res.status}`;
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const xsrfToken = getXsrfToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (xsrfToken) {
    headers['X-XSRF-TOKEN'] = xsrfToken;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(await extractErrorMessage(res));
  }

  return res.json();
}

// Dashboard
export const getDashboard = () => apiFetch<any>('/dashboard');

// Subscriptions
export const getSubscriptions = () => apiFetch<any>('/subscriptions');
export const getSubscription = (id: string) => apiFetch<any>(`/subscriptions/${id}`);

// Services
export const getServices = () => apiFetch<any>('/services');
export const getSubscribedServices = () => apiFetch<any>('/services/subscribed');

// Tickets
export const getTickets = (params?: Record<string, string>) => {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiFetch<any>(`/tickets${query}`);
};
export const getTicket = (id: string) => apiFetch<any>(`/tickets/${id}`);
export const createTicket = (data: { subject: string; description: string; priority?: string; category?: string }) =>
  apiFetch<any>('/tickets', { method: 'POST', body: JSON.stringify(data) });
export const replyToTicket = (id: string, message: string) =>
  apiFetch<any>(`/tickets/${id}/reply`, { method: 'POST', body: JSON.stringify({ message }) });
export const closeTicket = (id: string) =>
  apiFetch<any>(`/tickets/${id}/close`, { method: 'POST' });
export const reopenTicket = (id: string) =>
  apiFetch<any>(`/tickets/${id}/reopen`, { method: 'POST' });

// Billing
export const getBilling = (params?: Record<string, string>) => {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiFetch<any>(`/billing${query}`);
};
export const checkout = (data: { subscription_id: string; billing_cycle: string; currency?: string }) =>
  apiFetch<any>('/billing/checkout', { method: 'POST', body: JSON.stringify(data) });
export const getInvoice = (transactionId: string) =>
  apiFetch<any>(`/billing/invoice/${transactionId}`);

// Subscriptions management
export const changePlan = (id: string, data: { plan_id: string; billing_cycle: string }) =>
  apiFetch<any>(`/subscriptions/${id}/change-plan`, { method: 'PUT', body: JSON.stringify(data) });
export const cancelSubscription = (id: string) =>
  apiFetch<any>(`/subscriptions/${id}/cancel`, { method: 'POST' });

// Plans (public)
export const getPlans = () => apiFetch<any>('/plans');

// Currency (public - no auth required)
export const detectCurrency = () => apiFetch<any>('/currency/detect');
export const getCurrencyPricing = (currency: string) =>
  apiFetch<any>(`/currency/pricing?currency=${encodeURIComponent(currency)}`);
export const getSupportedCurrencies = () => apiFetch<any>('/currency/supported');

// Profile
export const updateProfile = (data: { name?: string; company_name?: string; company_phone?: string }) =>
  apiFetch<any>('/auth/profile', { method: 'PUT', body: JSON.stringify(data) });
export const changePassword = (data: { current_password: string; password: string; password_confirmation: string }) =>
  apiFetch<any>('/auth/change-password', { method: 'PUT', body: JSON.stringify(data) });
