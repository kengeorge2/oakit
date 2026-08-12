'use client';

import { useEffect, useState, useCallback } from 'react';
import { getBilling, getInvoice, detectCurrency, getCurrencyPricing } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';
import { safeFormatDate, formatMoney, getPersistedCurrency, setPersistedCurrency } from '@/lib/format';

interface CurrencyInfo {
  symbol: string;
  name: string;
  country: string;
}

interface PlanLocalizedPrice {
  id: string;
  name: string;
  price_usd: number;
  price_local: number;
  currency: string;
  currency_info: CurrencyInfo;
}

interface InvoiceData {
  invoice_number: string;
  date: string;
  company: { name: string; address: string; phone: string; email: string };
  client: { name: string; email: string; company: string };
  plan: { name: string; billing_cycle: string } | null;
  subtotal: number;
  tax_percent: number;
  tax_amount: number;
  total: number;
  currency: string;
  display_currency?: string;
  display_country?: string;
  converted?: {
    currency: string;
    rate: number;
    total: number;
    subtotal: number;
    tax_amount: number;
    symbol: string;
    formatted_total: string;
  } | null;
  payment_method: string;
  status: string;
  reference: string;
}

function formatCurrency(amount: number, currency: string, symbol?: string): string {
  if (symbol) {
    return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${currency} ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function BillingPage() {
  const [billing, setBilling] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loadingInvoice, setLoadingInvoice] = useState<string | null>(null);

  // Currency state
  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo | null>(null);
  const [localCurrency, setLocalCurrency] = useState('USD');
  const [localizedPricing, setLocalizedPricing] = useState<PlanLocalizedPrice[]>([]);
  const [loadingCurrency, setLoadingCurrency] = useState(true);

  // Fetch currency info and localized pricing
  useEffect(() => {
    const loadCurrencyData = async () => {
      try {
        const persisted = getPersistedCurrency();
        const detected = await detectCurrency();
        const detectedCode = detected?.currency;

        // Priority: persisted choice > detected > USD
        const effective = persisted || detectedCode || 'USD';
        setLocalCurrency(effective);
        setPersistedCurrency(effective);
        setCurrencyInfo(
          detected?.currency_info ||
            { symbol: effective, name: effective, country: detected?.detected_country || '' }
        );

        // Fetch localized pricing for plans
        if (effective !== 'USD') {
          const pricing = await getCurrencyPricing(effective);
          if (pricing?.plans) {
            setLocalizedPricing(pricing.plans);
          } else if (Array.isArray(pricing)) {
            setLocalizedPricing(pricing);
          }
        }
      } catch (err) {
        // Currency detection is non-critical, silently fall back to USD
        console.warn('Currency detection failed:', err);
      } finally {
        setLoadingCurrency(false);
      }
    };
    loadCurrencyData();
  }, []);

  useEffect(() => {
    getBilling()
      .then(setBilling)
      .catch((err) => setError(err.message || 'Failed to load billing data'))
      .finally(() => setLoading(false));
  }, []);

  const handleViewInvoice = async (transactionId: string) => {
    setLoadingInvoice(transactionId);
    try {
      const data = await getInvoice(transactionId);
      setInvoice(data);
    } catch (err: any) {
      alert(err.message || 'Failed to load invoice');
    } finally {
      setLoadingInvoice(null);
    }
  };

  // Helper to get localized price for a plan
  const getLocalizedPrice = useCallback(
    (planName: string, usdAmount: number): { localAmount: number; symbol: string } | null => {
      if (localCurrency === 'USD') return null;
      const match = localizedPricing.find(
        (p) => p.name?.toLowerCase() === planName?.toLowerCase()
      );
      if (match) {
        return {
          localAmount: match.price_local,
          symbol: match.currency_info?.symbol || localCurrency,
        };
      }
      return null;
    },
    [localizedPricing, localCurrency]
  );

  // Helper to format price with both USD and local currency
  const formatDualPrice = useCallback(
    (usdAmount: number, planName?: string, txnCurrency?: string): string => {
      // If the transaction already has a non-USD currency, show it directly
      if (txnCurrency && txnCurrency !== 'USD' && txnCurrency !== '$') {
        return `${txnCurrency}${usdAmount}`;
      }

      const usd = `$${Number(usdAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      if (localCurrency === 'USD' || !currencyInfo) return usd;

      const localized = planName ? getLocalizedPrice(planName, usdAmount) : null;
      if (localized) {
        return `${usd} (${localized.symbol}${localized.localAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`;
      }
      return usd;
    },
    [localCurrency, currencyInfo, getLocalizedPrice]
  );

  if (loading) {
    return (
      <PageContainer pageTitle="Billing" pageDescription="Loading...">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-muted" />
          ))}
        </div>
      </PageContainer>
    );
  }

  const transactions = billing?.transactions || [];

  return (
    <PageContainer pageTitle="Billing" pageDescription="View your payment history and invoices">
      <div className="space-y-4">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
        )}

        {/* Currency Info Banner */}
        {!loadingCurrency && localCurrency !== 'USD' && currencyInfo && (
          <div className="rounded-lg border bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950 dark:text-blue-200">
            <div className="flex items-center gap-2">
              <span className="text-lg">{currencyInfo.symbol}</span>
              <div>
                <p className="font-medium">
                  Showing prices in {currencyInfo.name} ({localCurrency})
                </p>
                <p className="text-xs opacity-75">
                  Detected region: {currencyInfo.country}. USD amounts shown with local equivalents.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Current Plan / Subscription Summary */}
        {billing?.subscription && (
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Current Subscription</h3>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="font-medium">{billing.subscription.plan?.name || 'N/A'}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  Billing: {billing.subscription.billing_cycle || 'monthly'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {formatDualPrice(
                    billing.subscription.amount || billing.subscription.plan?.price_monthly || 0,
                    billing.subscription.plan?.name
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  /{billing.subscription.billing_cycle === 'yearly' ? 'year' : 'month'}
                </p>
                {localCurrency !== 'USD' && currencyInfo && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Base price: {formatMoney(250, 'USD', '$', 0)}–{formatMoney(1000, 'USD', '$', 0)} USD
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {transactions.length === 0 ? (
          <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
            <p className="text-muted-foreground">No payment history yet.</p>
          </div>
        ) : (
          <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Tax</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Method</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn: any) => (
                  <tr key={txn.id} className="border-b last:border-0">
                    <td className="px-4 py-3 text-sm">
                      {safeFormatDate(txn.created_at)}
                    </td>
                    <td className="px-4 py-3 text-sm">{txn.description || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {formatDualPrice(txn.subtotal || txn.amount, txn.description, txn.currency)}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {txn.tax_amount > 0
                        ? formatDualPrice(txn.tax_amount, txn.description, txn.currency)
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold">
                      {formatDualPrice(txn.amount, txn.description, txn.currency)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          txn.status === 'completed' || txn.status === 'success'
                            ? 'bg-green-100 text-green-700'
                            : txn.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground capitalize">
                      {txn.payment_method || txn.gateway || 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      {(txn.status === 'completed' || txn.status === 'success') && (
                        <button
                          onClick={() => handleViewInvoice(txn.id)}
                          disabled={loadingInvoice === txn.id}
                          className="text-sm text-primary hover:underline disabled:opacity-50"
                        >
                          {loadingInvoice === txn.id ? 'Loading...' : 'View Invoice'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Invoice Modal */}
        {invoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-white p-8 text-black shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Invoice {invoice.invoice_number}</h2>
                <button onClick={() => setInvoice(null)} className="text-gray-500 hover:text-gray-700 text-lg">✕</button>
              </div>

              <div className="mb-4 text-sm">
                <p className="font-semibold">{invoice.company.name}</p>
                <p>{invoice.company.address}</p>
                <p>{invoice.company.phone}</p>
                <p>{invoice.company.email}</p>
              </div>

              <div className="mb-4 text-sm">
                <p className="text-gray-500">Bill To:</p>
                <p className="font-semibold">{invoice.client.name}</p>
                <p>{invoice.client.company}</p>
                <p>{invoice.client.email}</p>
              </div>

              <div className="mb-4 text-sm grid grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-500">Invoice Date</p>
                  <p>{safeFormatDate(invoice.date)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="capitalize">{invoice.status}</p>
                </div>
                {invoice.plan && (
                  <>
                    <div>
                      <p className="text-gray-500">Plan</p>
                      <p>{invoice.plan.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Billing Cycle</p>
                      <p className="capitalize">{invoice.plan.billing_cycle}</p>
                    </div>
                  </>
                )}
                {/* Currency info on invoice */}
                {invoice.converted && (
                  <div>
                    <p className="text-gray-500">Currency</p>
                    <p>
                      {invoice.converted.currency} ({invoice.converted.symbol}) —{' '}
                      <span className="text-xs text-muted-foreground">
                        1 USD = {invoice.converted.rate.toLocaleString(undefined, { maximumFractionDigits: 2 })} {invoice.converted.currency}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <table className="w-full text-sm mb-4">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Description</th>
                    <th className="py-2 text-right">Amount</th>
                    {invoice.converted && (
                      <th className="py-2 text-right">Local Amount</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">{invoice.plan?.name || 'Subscription'} ({invoice.plan?.billing_cycle || 'monthly'})</td>
                    <td className="py-2 text-right">{formatMoney(Number(invoice.subtotal) || 0, invoice.currency || 'USD', invoice.converted?.symbol)}</td>
                    {invoice.converted && (
                      <td className="py-2 text-right">
                        {invoice.converted.symbol} {invoice.converted.subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    {invoice.currency || '$'} {invoice.subtotal?.toFixed(2)}
                    {invoice.converted && (
                      <span className="ml-2 text-muted-foreground">
                        ({invoice.converted.symbol} {invoice.converted.subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })})
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>VAT ({invoice.tax_percent}%)</span>
                  <span>
                    {formatMoney(Number(invoice.tax_amount) || 0, invoice.currency || 'USD', invoice.converted?.symbol)}
                    {invoice.converted && (
                      <span className="ml-2 text-muted-foreground">
                        ({invoice.converted.symbol} {invoice.converted.tax_amount.toLocaleString(undefined, { maximumFractionDigits: 2 })})
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-1 font-bold text-base">
                  <span>Total</span>
                  <span>
                    {formatMoney(Number(invoice.total) || 0, invoice.currency || 'USD', invoice.converted?.symbol)}
                    {invoice.converted && (
                      <span className="ml-2 font-semibold text-muted-foreground">
                        ({invoice.converted.formatted_total})
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {invoice.reference && (
                <p className="mt-4 text-xs text-gray-400">Reference: {invoice.reference}</p>
              )}

              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.print();
                  }
                }}
                className="mt-6 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Print Invoice
              </button>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
