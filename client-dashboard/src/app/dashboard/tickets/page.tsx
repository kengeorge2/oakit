'use client';

import { useEffect, useState } from 'react';
import { getTickets, getTicket, createTicket, replyToTicket } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [form, setForm] = useState({ subject: '', description: '', priority: 'medium', category: '' });
  const [reply, setReply] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadTickets = () => {
    getTickets().then(setTickets).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { loadTickets(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createTicket(form);
      setShowForm(false);
      setForm({ subject: '', description: '', priority: 'medium', category: '' });
      loadTickets();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !reply.trim()) return;
    setSubmitting(true);
    try {
      await replyToTicket(selectedTicket.id, reply);
      setReply('');
      const updated = await getTicket(selectedTicket.id);
      setSelectedTicket(updated);
      loadTickets();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <PageContainer pageTitle="Support Tickets" pageDescription="Loading..."><div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-20 rounded-lg bg-muted" />)}</div></PageContainer>;
  }

  return (
    <PageContainer pageTitle="Support Tickets" pageDescription="Get help with your services" pageHeaderAction={
      <button onClick={() => setShowForm(!showForm)} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        {showForm ? 'Cancel' : 'New Ticket'}
      </button>
    }>
      <div className="space-y-6">
        {showForm && (
          <form onSubmit={handleCreate} className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={4}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="e.g. Billing, Technical" />
              </div>
            </div>
            <button type="submit" disabled={submitting}
              className="flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
              {submitting ? 'Creating...' : 'Create Ticket'}
            </button>
          </form>
        )}

        {selectedTicket ? (
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <button onClick={() => setSelectedTicket(null)} className="mb-4 text-sm text-primary hover:underline">← Back to all tickets</button>
            <h3 className="text-lg font-semibold">{selectedTicket.ticket_number} — {selectedTicket.subject}</h3>
            <p className="text-sm text-muted-foreground capitalize">Status: {selectedTicket.status} | Priority: {selectedTicket.priority}</p>
            <div className="mt-4 space-y-3">
              {selectedTicket.messages?.map((msg: any) => (
                <div key={msg.id} className={`rounded-md p-3 ${msg.sender_type === 'client' ? 'bg-primary/5 ml-8' : 'bg-muted mr-8'}`}>
                  <p className="text-xs text-muted-foreground">{msg.sender_name} ({msg.sender_type}) • {new Date(msg.created_at).toLocaleString()}</p>
                  <p className="mt-1 text-sm">{msg.message}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleReply} className="mt-4 flex gap-2">
              <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your reply..." required
                className="flex h-10 flex-1 rounded-md border bg-background px-3 py-2 text-sm" />
              <button type="submit" disabled={submitting}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                Reply
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets?.data?.length === 0 ? (
              <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
                <p className="text-muted-foreground">No tickets yet. Create one to get help.</p>
              </div>
            ) : (
              tickets?.data?.map((ticket: any) => (
                <div key={ticket.id} onClick={() => setSelectedTicket(ticket)}
                  className="flex cursor-pointer items-center justify-between rounded-lg border bg-card p-4 shadow-sm hover:bg-accent">
                  <div>
                    <p className="font-medium">{ticket.ticket_number} — {ticket.subject}</p>
                    <p className="text-sm text-muted-foreground capitalize">{ticket.priority} priority • {ticket.message_count} messages</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    ticket.status === 'open' ? 'bg-blue-100 text-blue-700' :
                    ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                    ticket.status === 'resolved' || ticket.status === 'closed' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>{ticket.status}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
