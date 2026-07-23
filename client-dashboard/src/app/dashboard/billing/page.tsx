'use client';

import { useEffect, useState } from 'react';
import { getBilling, getInvoice } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';

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
  payment_method: string;
  status: string;
  reference: string;
}

export default function BillingPage() {
  const [billing, setBilling] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loadingInvoice, setLoadingInvoice] = useState<string | null>(null);

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
                      {new Date(txn.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">{txn.description || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {txn.currency || '$'}{txn.subtotal || txn.amount}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {txn.tax_amount > 0
                        ? `${txn.currency || '$'}${txn.tax_amount} (${txn.tax_percent}%)`
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold">
                      {txn.currency || '$'}{txn.amount}
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
                  <p>{invoice.date}</p>
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
              </div>

              <table className="w-full text-sm mb-4">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Description</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">{invoice.plan?.name || 'Subscription'} ({invoice.plan?.billing_cycle || 'monthly'})</td>
                    <td className="py-2 text-right">{invoice.currency} {invoice.subtotal?.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{invoice.currency} {invoice.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT ({invoice.tax_percent}%)</span>
                  <span>{invoice.currency} {invoice.tax_amount?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-1 font-bold text-base">
                  <span>Total</span>
                  <span>{invoice.currency} {invoice.total?.toFixed(2)}</span>
                </div>
              </div>

              {invoice.reference && (
                <p className="mt-4 text-xs text-gray-400">Reference: {invoice.reference}</p>
              )}

              <button
                onClick={() => window.print()}
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
