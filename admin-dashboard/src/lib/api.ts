const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://posapp.oakitsolutionsandsupplies.com/api/v1/admin';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
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

  // Global auth interceptor
  if (res.status === 401 || res.status === 419) {
    localStorage.removeItem('admin_token');
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
      const reason = res.status === 419 ? 'session_expired' : 'unauthorized';
      window.location.href = `/auth/login?reason=${reason}`;
    }
    throw new Error(res.status === 419 ? 'Session expired. Please log in again.' : 'Unauthorized. Please log in again.');
  }

  if (!res.ok) {
    throw new Error(await extractErrorMessage(res));
  }

  return res.json();
}

// Dashboard
export const getDashboard = () => apiFetch<any>('/dashboard');

// Tenants
export const getTenants = (params?: Record<string, string> | string) => {
  const query = typeof params === 'string' ? (params ? '?' + params : '') : (params ? '?' + new URLSearchParams(params).toString() : '');
  return apiFetch<any>(`/tenants${query}`);
};
export const getTenant = (id: string) => apiFetch<any>(`/tenants/${id}`);
export const createTenant = (data: Record<string, any>) =>
  apiFetch<any>('/tenants', { method: 'POST', body: JSON.stringify(data) });
export const updateTenant = (id: string, data: Record<string, any>) =>
  apiFetch<any>(`/tenants/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteTenant = (id: string) =>
  apiFetch<any>(`/tenants/${id}`, { method: 'DELETE' });
export const suspendTenant = (id: string) =>
  apiFetch<any>(`/tenants/${id}/suspend`, { method: 'POST' });
export const activateTenant = (id: string) =>
  apiFetch<any>(`/tenants/${id}/activate`, { method: 'POST' });
export const cancelTenant = (id: string) =>
  apiFetch<any>(`/tenants/${id}/cancel`, { method: 'POST' });
export const impersonateTenant = (id: string) =>
  apiFetch<any>(`/tenants/${id}/impersonate`, { method: 'POST' });

// Subscriptions
export const getSubscriptions = (params?: Record<string, string> | string) => {
  const query = typeof params === 'string' ? (params ? '?' + params : '') : (params ? '?' + new URLSearchParams(params).toString() : '');
  return apiFetch<any>(`/subscriptions${query}`);
};
export const getSubscription = (id: string) => apiFetch<any>(`/subscriptions/${id}`);

// Revenue
export const getRevenueSummary = () => apiFetch<any>('/revenue/summary');
export const getMRR = () => apiFetch<any>('/revenue/mrr');
export const getARR = () => apiFetch<any>('/revenue/arr');
export const getChurnRate = () => apiFetch<any>('/revenue/churn');
export const getLTV = () => apiFetch<any>('/revenue/ltv');
export const getRevenueTrend = (params?: Record<string, string> | string) => {
  const query = typeof params === 'string' ? (params ? '?' + params : '') : (params ? '?' + new URLSearchParams(params).toString() : '');
  return apiFetch<any>(`/revenue/trend${query}`);
};
export const getRevenueByPlan = () => apiFetch<any>('/revenue/by-plan');

// Commissions
export const getCommissions = (params?: Record<string, string> | string) => {
  const query = typeof params === 'string' ? (params ? '?' + params : '') : (params ? '?' + new URLSearchParams(params).toString() : '');
  return apiFetch<any>(`/commissions${query}`);
};
export const getCommissionSummary = () => apiFetch<any>('/commissions/summary');
export const approveCommission = (id: string) =>
  apiFetch<any>(`/commissions/${id}/approve`, { method: 'POST' });
export const payCommission = (id: string) =>
  apiFetch<any>(`/commissions/${id}/pay`, { method: 'POST' });

// Agents
export const getAgents = (params?: Record<string, string> | string) => {
  const query = typeof params === 'string' ? (params ? '?' + params : '') : (params ? '?' + new URLSearchParams(params).toString() : '');
  return apiFetch<any>(`/agents${query}`);
};
export const getAgentPerformance = (id: string) => apiFetch<any>(`/agents/${id}/performance`);

// Audit Logs
export const getAuditLogs = (params?: Record<string, string> | string) => {
  const query = typeof params === 'string' ? (params ? '?' + params : '') : (params ? '?' + new URLSearchParams(params).toString() : '');
  return apiFetch<any>(`/audit-logs${query}`);
};
export const exportAuditLogs = (params?: Record<string, string> | string) => {
  const query = typeof params === 'string' ? (params ? '?' + params : '') : (params ? '?' + new URLSearchParams(params).toString() : '');
  return apiFetch<any>(`/audit-logs/export${query}`);
};

// Settings
export const getSettings = () => apiFetch<any>('/settings');
export const updateSettings = (data: Record<string, any>) =>
  apiFetch<any>('/settings', { method: 'PUT', body: JSON.stringify(data) });

// Client Users
export const getClientUsers = (params?: Record<string, string> | string) => {
  const query = typeof params === 'string' ? (params ? '?' + params : '') : (params ? '?' + new URLSearchParams(params).toString() : '');
  return apiFetch<any>(`/client-users${query}`);
};
export const getClientUser = (id: string) => apiFetch<any>(`/client-users/${id}`);
export const createClientUser = (data: Record<string, any>) =>
  apiFetch<any>('/client-users', { method: 'POST', body: JSON.stringify(data) });
export const updateClientUser = (id: string, data: Record<string, any>) =>
  apiFetch<any>(`/client-users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteClientUser = (id: string) =>
  apiFetch<any>(`/client-users/${id}`, { method: 'DELETE' });
export const suspendClientUser = (id: string) =>
  apiFetch<any>(`/client-users/${id}/suspend`, { method: 'POST' });
export const activateClientUser = (id: string) =>
  apiFetch<any>(`/client-users/${id}/activate`, { method: 'POST' });
export const assignClientUser = (id: string, data: Record<string, any>) =>
  apiFetch<any>(`/client-users/${id}/assign`, { method: 'POST', body: JSON.stringify(data) });

// Tickets
export const getTickets = (params?: Record<string, string> | string) => {
  const query = typeof params === 'string' ? (params ? '?' + params : '') : (params ? '?' + new URLSearchParams(params).toString() : '');
  return apiFetch<any>(`/tickets${query}`);
};
export const getTicket = (id: string) => apiFetch<any>(`/tickets/${id}`);
export const assignTicket = (id: string, data: Record<string, any>) =>
  apiFetch<any>(`/tickets/${id}/assign`, { method: 'POST', body: JSON.stringify(data) });
export const replyToTicket = (id: string, message: string) =>
  apiFetch<any>(`/tickets/${id}/reply`, { method: 'POST', body: JSON.stringify({ message }) });
export const updateTicketStatus = (id: string, status: string) =>
  apiFetch<any>(`/tickets/${id}/status`, { method: 'POST', body: JSON.stringify({ status }) });

// OakIT Services
export const getOakitServices = () => apiFetch<any>('/oakit-services');

// Plans
export const getPlans = () => apiFetch<any>('/plans');

// Features
export const getFeatures = () => apiFetch<any>('/features');

// Discounts
export const getDiscounts = () => apiFetch<any>('/discounts');

// Products
export const getProducts = () => apiFetch<any>('/products');

// Desktop Licenses
export const getDesktopLicenses = () => apiFetch<any>('/desktop-licenses');

// Health
export const getHealth = () => apiFetch<any>('/health');

// Docs
export const getDocs = () => apiFetch<any>('/docs');

// Aliases to match page import conventions
export const getCommissionsSummary = getCommissionSummary;
export const getRevenueMrr = getMRR;
export const getRevenueChurn = getChurnRate;
export const getRevenueLtv = getLTV;
export const getAdminSubscriptions = getSubscriptions;
