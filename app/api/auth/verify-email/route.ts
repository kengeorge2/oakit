import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://posapp.oakitsolutionsandsupplies.com/api/v1/client';

function extractError(data: any): string {
  if (typeof data.error === 'string') return data.error;
  if (data.error?.message) return data.error.message;
  if (data.message) return data.message;
  return 'Verification failed';
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const res = await fetch(`${API_URL}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: extractError(data), success: false }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[Verify Email] Error:', err.message);
    return NextResponse.json({ error: 'Internal server error', success: false }, { status: 500 });
  }
}
