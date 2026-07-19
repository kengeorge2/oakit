import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://posapp.oakitsolutionsandsupplies.com/api/v1/client';
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_FROM = process.env.CONTACT_EMAIL_FROM || 'notifications@notifications.oakitsolutionsandsupplies.com';

function extractError(data: any): string {
  if (typeof data.error === 'string') return data.error;
  if (data.error?.message) return data.error.message;
  if (data.message) return data.message;
  return 'Failed to generate token';
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const tokenRes = await fetch(`${API_URL}/auth/generate-verification-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      return NextResponse.json({ error: extractError(tokenData) }, { status: tokenRes.status });
    }

    const verificationUrl = `https://oakitsolutionsandsupplies.com/auth/verify?token=${tokenData.token}`;

    if (!RESEND_API_KEY) {
      console.error('[Verification] RESEND_API_KEY not set');
      return NextResponse.json({ success: true, message: 'Account created but email service not configured. Please contact support.' });
    }

    const resend = new Resend(RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: email,
      subject: 'Verify your OAK IT Solutions account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">
            Welcome to OAK IT Solutions!
          </h2>
          <p style="color: #374151; line-height: 1.6; margin-top: 16px;">
            Thank you for creating an account with OAK IT Solutions. Please click the button below to verify your email address and activate your account.
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${verificationUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            If the button doesn't work, copy and paste this link into your browser:<br/>
            <a href="${verificationUrl}" style="color: #2563eb;">${verificationUrl}</a>
          </p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 16px;">
            This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">
            OAK IT Solutions and Supplies Ltd.<br/>
            Central Road, next to Total Bahai, Kampala, Uganda<br/>
            +256 704 302335
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('[Verification] Resend error:', JSON.stringify(error));
    }

    return NextResponse.json({ success: true, message: 'Verification email sent', verification_url: verificationUrl });
  } catch (err: any) {
    console.error('[Verification] Error:', err.message);
    return NextResponse.json({ error: 'Internal server error', success: false }, { status: 500 });
  }
}
