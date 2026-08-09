export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  features: string[];
  cta: { label: string; href: string; variant?: string };
  popular: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'For small teams getting started',
    monthlyPrice: 250,
    annualPrice: 2400,
    features: [
      'IT Support (Business Hours)',
      'Remote Monitoring',
      'Basic Security Patch Management',
      'Email & Phone Support',
      'Monthly Health Reports',
      'Up to 50 Support Workers',
    ],
    cta: { label: 'Get Started', href: '/auth/signup?plan=basic', variant: 'default' },
    popular: false,
  },
  {
    id: 'regular',
    name: 'Regular',
    description: 'For growing businesses',
    monthlyPrice: 1000,
    annualPrice: 9600,
    features: [
      'Everything in Basic',
      '24/7 Monitoring & Alerting',
      'Proactive Maintenance',
      'Backup Management',
      'Quarterly Business Reviews',
      'Priority Response (4hr SLA)',
      'Up to 50 Support Workers',
    ],
    cta: { label: 'Get Started', href: '/auth/signup?plan=regular', variant: 'default' },
    popular: true,
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'For enterprises needing custom solutions',
    monthlyPrice: null,
    annualPrice: null,
    features: [
      'Everything in Regular',
      'Dedicated Account Manager',
      'Custom SLA & Response Times',
      'Strategic IT Planning',
      'Compliance Support (ISO, GDPR)',
      'On-site Support Available',
      'Custom Integrations',
      'Unlimited Support Workers',
    ],
    cta: { label: 'Request Quote', href: '/#contactUs', variant: 'outline' },
    popular: false,
  },
];

// ============================================================================
// Currency / Pricing API helpers
// ============================================================================

const API_BASE = 'https://posapp.oakitsolutionsandsupplies.com/api/v1/client';

export interface CurrencyInfo {
  symbol: string;
  name: string;
  country: string;
}

export interface SupportedCurrenciesResponse {
  currencies: Record<string, CurrencyInfo>;
  country_currency_map: Record<string, string>;
}

export interface DetectedCurrencyResponse {
  detected_country: string;
  currency: string;
  currency_info: CurrencyInfo;
}

interface ApiPriceBreakdown {
  usd: number;
  converted: number;
  rate: number;
  formatted: string;
}

interface ApiPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  currency: string;
  currency_symbol: string;
  currency_name: string;
  pricing: {
    monthly: ApiPriceBreakdown;
    yearly: ApiPriceBreakdown;
  };
  features: string[];
  max_users: number;
  is_popular: boolean;
}

export interface ApiPricingResponse {
  currency: string;
  plans: ApiPlan[];
  exchange_rate_source: string;
  last_updated: string;
}

export interface ConvertedPricingTier {
  id: string;
  slug: string;
  name: string;
  description: string;
  currency: string;
  currencySymbol: string;
  currencyName: string;
  monthlyPrice: number | null;
  monthlyFormatted: string;
  annualPrice: number | null;
  annualFormatted: string;
  features: string[];
  maxUsers: number;
  popular: boolean;
}

/**
 * Detect the user's country and currency via the backend API.
 */
export async function detectCurrency(): Promise<DetectedCurrencyResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/currency/detect`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Fetch the list of supported currencies.
 */
export async function getSupportedCurrencies(): Promise<SupportedCurrenciesResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/currency/supported`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Fetch converted pricing for a given currency code.
 */
export async function fetchPricingForCurrency(currency: string): Promise<ApiPricingResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/currency/pricing?currency=${encodeURIComponent(currency)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Convert API plan response into the ConvertedPricingTier shape used by the UI.
 */
export function mapApiPlansToTiers(apiResponse: ApiPricingResponse): ConvertedPricingTier[] {
  return apiResponse.plans.map((plan) => ({
    id: plan.slug,
    slug: plan.slug,
    name: plan.name,
    description: plan.description,
    currency: plan.currency,
    currencySymbol: plan.currency_symbol,
    currencyName: plan.currency_name,
    monthlyPrice: plan.pricing.monthly.converted > 0 ? plan.pricing.monthly.converted : null,
    monthlyFormatted: plan.pricing.monthly.formatted,
    annualPrice: plan.pricing.yearly.converted > 0 ? plan.pricing.yearly.converted : null,
    annualFormatted: plan.pricing.yearly.formatted,
    features: plan.features,
    maxUsers: plan.max_users,
    popular: plan.is_popular,
  }));
}

/**
 * Format a price for display using the API-provided symbol.
 */
export function formatPrice(
  amount: number,
  currencySymbol: string,
): string {
  return `${currencySymbol} ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export const pricingFaq = [
  {
    question: "What's included in the Basic plan?",
    answer: "The Basic plan covers business-hours IT support, remote monitoring, basic security patch management, email & phone support, and monthly health reports. It's designed for teams of up to 50 workers.",
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. When upgrading, the price difference is prorated. When downgrading, the change takes effect at your next billing cycle.',
  },
  {
    question: 'What does "Request Quote" mean for Advanced?',
    answer: 'Advanced pricing depends on your specific requirements including number of users, services selected, and support level. Contact us for a customized quote tailored to your business.',
  },
  {
    question: 'Are there discounts for annual billing?',
    answer: 'Yes! Annual billing saves you approximately 20% compared to monthly billing. Contact us for enterprise multi-year discounts.',
  },
  {
    question: 'What support response times are guaranteed?',
    answer: 'Basic: Next business day. Regular: 4-hour response SLA. Advanced: Custom SLA based on your requirements, with options for 1-hour or immediate response.',
  },
  {
    question: 'Can I pay in my local currency?',
    answer: 'Yes! We support multiple currencies including USD, UGX, KES, NGN, GBP, EUR, and many more. Select your currency from the dropdown to see pricing in your local currency.',
  },
];
