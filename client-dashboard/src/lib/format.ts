export function safeFormatDate(date: Date | string | null | undefined): string {
  if (!date) return 'N/A';
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dateObj);
  } catch {
    return 'N/A';
  }
}

export function safeFormatDateTime(date: Date | string | null | undefined): string {
  if (!date) return 'N/A';
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj);
  } catch {
    return 'N/A';
  }
}

/**
 * Format a monetary amount with proper currency symbol and locale formatting.
 * @param amount - The numeric amount
 * @param currency - ISO currency code (e.g. 'USD', 'UGX'). Defaults to 'USD'.
 * @param symbol - Optional currency symbol override (e.g. 'USh'). If omitted, uses Intl.
 * @param decimals - Decimal places. Defaults to 2.
 */
export function formatMoney(
  amount: number,
  currency: string = 'USD',
  symbol?: string,
  decimals: number = 2,
): string {
  if (symbol) {
    return `${symbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  }
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch {
    // Fallback for unsupported currencies
    return `${currency} ${amount.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  }
}

const CURRENCY_STORAGE_KEY = 'oakit_currency';

export function getPersistedCurrency(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CURRENCY_STORAGE_KEY);
}

export function setPersistedCurrency(currency: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
}
