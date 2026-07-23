'use client';

import { useEffect, useState } from 'react';
import { getTickets, getTicket, createTicket, replyToTicket, closeTicket, reopenTicket } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [form, setForm] = useState({ subject: '', description: '', priority: 'medium', category: '' });
  const [reply, setReply] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadTickets = () => {
    getTickets()
      .then(setTickets)
      .catch((err) => setError(err.message || 'Failed to load tickets'))
      .finally(() => setLoading(false));
  };

  const loadTicketDetail = async (id: string) => {
    try {
      const detail = await getTicket(id);
      setSelectedTicket(detail);
    } catch (err: any) {
      setError(err.message || 'Failed to load ticket');
    }
  };

  useEffect(() => { loadTickets(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createTicket(form);
      setShowForm(false);
      setForm({ subject: '', description: '', priority: 'medium', category: '' });
      setSuccess('Ticket created successfully!');
      loadTickets();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !reply.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await replyToTicket(selectedTicket.id, reply);
      setReply('');
      setSuccess('Reply sent!');
      await loadTicketDetail(selectedTicket.id);
      loadTickets();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to send reply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = async () => {
    if (!selectedTicket) return;
    setSubmitting(true);
    setError('');
    try {
      await closeTicket(selectedTicket.id);
      setSuccess('Ticket closed.');
      await loadTicketDetail(selectedTicket.id);
      loadTickets();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to close ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReopen = async () => {
    if (!selectedTicket) return;
    setSubmitting(true);
    setError('');
    try {
      await reopenTicket(selectedTicket.id);
      setSuccess('Ticket reopened.');
      await loadTicketDetail(selectedTicket.id);
      loadTickets();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to reopen ticket');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageContainer pageTitle="Support Tickets" pageDescription="Loading...">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-lg bg-muted" />
          ))}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      pageTitle="Support Tickets"
      pageDescription="Get help with your services"
      pageHeaderAction={
        <button
          onClick={() => { setShowForm(!showForm); setError(''); setSuccess(''); }}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {showForm ? 'Cancel' : 'New Ticket'}
        </button>
      }
    >
      <div className="space-y-6">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
        )}
        {success && (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">{success}</div>
        )}

        {showForm && (
          <form onSubmit={handleCreate} className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="Brief description of your issue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={4}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="Provide details about your issue..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="e.g. Billing, Technical"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {submitting ? 'Creating...' : 'Create Ticket'}
            </button>
          </form>
        )}

        {selectedTicket ? (
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <button
              onClick={() => { setSelectedTicket(null); setError(''); setSuccess(''); }}
              className="mb-4 text-sm text-primary hover:underline"
            >
              ← Back to all tickets
            </button>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{selectedTicket.ticket_number} — {selectedTicket.subject}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  Status: {selectedTicket.status} | Priority: {selectedTicket.priority}
                </p>
              </div>
              <div className="flex gap-2">
                {selectedTicket.status !== 'closed' && selectedTicket.status !== 'resolved' && (
                  <button
                    onClick={handleClose}
                    disabled={submitting}
                    className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    Close Ticket
                  </button>
                )}
                {selectedTicket.status === 'closed' && (
                  <button
                    onClick={handleReopen}
                    disabled={submitting}
                    className="rounded-md border border-blue-300 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                  >
                    Reopen Ticket
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {selectedTicket.messages?.map((msg: any) => (
                <div
                  key={msg.id}
                  className={`rounded-md p-3 ${
                    msg.sender_type === 'client' ? 'bg-primary/5 ml-8' : 'bg-muted mr-8'
                  }`}
                >
                  <p className="text-xs text-muted-foreground">
                    {msg.sender_name} ({msg.sender_type}) • {new Date(msg.created_at).toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm">{msg.message}</p>
                </div>
              ))}
            </div>

            {selectedTicket.status !== 'closed' && selectedTicket.status !== 'resolved' && (
              <form onSubmit={handleReply} className="mt-4 flex gap-2">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply..."
                  required
                  className="flex h-10 flex-1 rounded-md border bg-background px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Reply'}
                </button>
              </form>
            )}

            {(selectedTicket.status === 'closed' || selectedTicket.status === 'resolved') && (
              <p className="mt-4 text-sm text-muted-foreground text-center">
                This ticket is {selectedTicket.status}. You can reopen it if needed.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {tickets?.data?.length === 0 ? (
              <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
                <p className="text-muted-foreground">No tickets yet. Create one to get help.</p>
              </div>
            ) : (
              tickets?.data?.map((ticket: any) => (
                <div
                  key={ticket.id}
                  onClick={() => { loadTicketDetail(ticket.id); setError(''); setSuccess(''); }}
                  className="flex cursor-pointer items-center justify-between rounded-lg border bg-card p-4 shadow-sm hover:bg-accent"
                >
                  <div>
                    <p className="font-medium">{ticket.ticket_number} — {ticket.subject}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {ticket.priority} priority • {ticket.message_count} messages
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      ticket.status === 'open'
                        ? 'bg-blue-100 text-blue-700'
                        : ticket.status === 'in_progress'
                        ? 'bg-yellow-100 text-yellow-700'
                        : ticket.status === 'waiting_reply'
                        ? 'bg-purple-100 text-purple-700'
                        : ticket.status === 'resolved' || ticket.status === 'closed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
