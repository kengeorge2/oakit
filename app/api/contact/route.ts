import { NextResponse } from 'next/server';
import { sendAdminNotification, sendUserAutoReply } from '@/lib/email';

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}

export async function POST(request: Request) {
  console.log('[Contact Form] Received POST request');

  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // Honeypot check
    if (honeypot) {
      console.log('[Contact Form] Honeypot triggered, silently rejecting');
      return NextResponse.json({ success: true });
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    if (name.length > 100 || email.length > 254 || message.length > 5000) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    // Rate limit
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      console.log('[Contact Form] Rate limited IP:', ip);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Send emails
    const emailData = { name: name.trim(), email: email.trim(), message: message.trim() };
    console.log('[Contact Form] Sending emails for:', emailData.email);

    const [adminResult, autoReplyResult] = await Promise.allSettled([
      sendAdminNotification(emailData),
      sendUserAutoReply(emailData),
    ]);

    const errors: string[] = [];
    if (adminResult.status === 'rejected') {
      errors.push(`Admin email: ${adminResult.reason?.message || 'unknown error'}`);
    }
    if (autoReplyResult.status === 'rejected') {
      errors.push(`Auto-reply: ${autoReplyResult.reason?.message || 'unknown error'}`);
    }

    if (errors.length > 0) {
      console.error('[Contact Form] Email errors:', errors);
      // Still return success to user but log the errors
      // The admin notification is the critical one
      if (adminResult.status === 'rejected') {
        return NextResponse.json(
          { error: 'Failed to send message. Please try again or email us directly.' },
          { status: 500 }
        );
      }
    }

    console.log('[Contact Form] Emails sent successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact Form] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
