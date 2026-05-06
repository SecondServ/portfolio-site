import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// ── In-memory rate limiter ─────────────────────────────────────────────────
const ipLog = new Map<string, { count: number; resetAt: number }>();

const LIMIT       = 3;
const WINDOW_MS   = 60 * 60 * 1000; // 1 hour
const MSG_MAX_LEN = 2000;

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = ipLog.get(ip);

  if (!entry || now > entry.resetAt) {
    ipLog.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

// ── Handler ────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Too many messages. Please wait an hour and try again.' },
      { status: 429 },
    );
  }

  const { name, message } = (await req.json()) as { name?: string; message: string };

  if (!message?.trim()) {
    return Response.json({ error: 'Message is required.' }, { status: 400 });
  }
  if (message.length > MSG_MAX_LEN) {
    return Response.json(
      { error: `Message too long (max ${MSG_MAX_LEN} chars).` },
      { status: 400 },
    );
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return Response.json(
      { error: 'Email not configured — add GMAIL_USER and GMAIL_APP_PASSWORD to .env.local.' },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  await transporter.sendMail({
    from:    `"Portfolio Contact" <${user}>`,
    to:      'hectorcareer@gmail.com',
    subject: name ? `Message from ${name} (portfolio)` : 'New message from your portfolio',
    text:    `${name ? `From: ${name}\n\n` : ''}${message}`,
    html: `
      <div style="font-family:monospace;background:#0d1117;color:#cdd6e0;padding:24px;border-radius:8px;max-width:560px">
        ${name ? `<p style="color:#22d3ee;margin:0 0 12px">from: ${name}</p>` : ''}
        <p style="white-space:pre-wrap;margin:0;line-height:1.7">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        <hr style="border:none;border-top:1px solid #1e2836;margin:20px 0"/>
        <p style="color:#546278;font-size:11px;margin:0">Sent via portfolio · from IP ${ip}</p>
      </div>`,
  });

  return Response.json({ ok: true });
}
