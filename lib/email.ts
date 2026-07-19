import { Resend } from 'resend';

let resend: Resend;

function getResend(): Resend {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const CONTACT_TO = (process.env.CONTACT_EMAIL_TO || 'kokello@oakitsolutionsandsupplies.com,kengeorge2@yahoo.com').split(',');
const CONTACT_FROM = process.env.CONTACT_EMAIL_FROM || 'website-form@notifications.oakitsolutionsandsupplies.com';

interface ContactEmailData {
  name: string;
  email: string;
  message: string;
}

export async function sendAdminNotification(data: ContactEmailData) {
  const { name, email, message } = data;

  console.log('[Contact Form] Sending admin notification to:', CONTACT_TO);
  console.log('[Contact Form] From:', CONTACT_FROM);

  const result = await getResend().emails.send({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    reply_to: email,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">
          New Contact Form Submission
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #374151; width: 120px;">Name:</td>
            <td style="padding: 8px; color: #1f2937;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #374151;">Email:</td>
            <td style="padding: 8px; color: #1f2937;">
              <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
            </td>
          </tr>
        </table>
        <div style="margin-top: 16px; padding: 12px; background-color: #f3f4f6; border-radius: 8px;">
          <p style="font-weight: bold; color: #374151; margin: 0 0 8px 0;">Message:</p>
          <p style="color: #1f2937; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
          Submitted via OAK IT Solutions contact form — Reply to this email to respond directly to ${name}.
        </p>
      </div>
    `,
  });

  if (result.error) {
    console.error('[Contact Form] Admin email error:', JSON.stringify(result.error));
    throw new Error(`Admin email failed: ${result.error.message}`);
  }

  console.log('[Contact Form] Admin notification sent, id:', result.data?.id);
}

export async function sendUserAutoReply(data: ContactEmailData) {
  const { name, email } = data;

  console.log('[Contact Form] Sending auto-reply to:', email);

  const result = await getResend().emails.send({
    from: CONTACT_FROM,
    to: email,
    subject: 'Thank you for contacting OAK IT Solutions',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937;">Thank you, ${name}!</h2>
        <p style="color: #374151; line-height: 1.6;">
          We've received your message and our team will get back to you within 24 hours.
        </p>
        <p style="color: #374151; line-height: 1.6;">
          If your matter is urgent, please call us at <strong>+256 704 302335</strong>.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #6b7280; font-size: 14px;">
          OAK IT Solutions and Supplies Ltd.<br/>
          Central Road, next to Total Bahai, Kampala, Uganda
        </p>
      </div>
    `,
  });

  if (result.error) {
    console.error('[Contact Form] Auto-reply error:', JSON.stringify(result.error));
    throw new Error(`Auto-reply failed: ${result.error.message}`);
  }

  console.log('[Contact Form] Auto-reply sent, id:', result.data?.id);
}
