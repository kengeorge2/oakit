const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://posapp.oakitsolutionsandsupplies.com/api/v1/client';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const errMsg = typeof data.error === 'string' ? data.error : data.error?.message || data.message || `API error: ${res.status}`;
    throw new Error(errMsg);
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
export const checkout = (data: { subscription_id: string; billing_cycle: string }) =>
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

// Profile
export const updateProfile = (data: { name?: string; company_name?: string; company_phone?: string }) =>
  apiFetch<any>('/auth/profile', { method: 'PUT', body: JSON.stringify(data) });
export const changePassword = (data: { current_password: string; password: string; password_confirmation: string }) =>
  apiFetch<any>('/auth/change-password', { method: 'PUT', body: JSON.stringify(data) });
