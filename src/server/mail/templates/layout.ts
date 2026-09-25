import type { EmailContent } from '../types';

export const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character] ?? character);

export const safeLines = (value: string): string => escapeHtml(value).replace(/\r?\n/g, '<br>');

export const row = (label: string, value: string): string =>
  `<tr><td style="padding:8px 12px;color:#64748b;vertical-align:top;width:34%">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#18212f;vertical-align:top">${safeLines(value || '—')}</td></tr>`;

export const section = (title: string, rows: string): string =>
  `<h2 style="margin:28px 0 10px;font-size:16px;color:#102333">${escapeHtml(title)}</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:10px;background:#fff;font-size:14px;line-height:1.5">${rows}</table>`;

export function emailLayout(subject: string, intro: string, body: string, text: string): EmailContent {
  return {
    subject,
    html: `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta charset="utf-8"></head><body style="margin:0;background:#f2f5f7;font-family:Arial,Helvetica,sans-serif;color:#18212f"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2f5f7"><tr><td align="center" style="padding:28px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:14px;overflow:hidden"><tr><td style="background:#101820;padding:24px 30px;color:#ffffff;font-size:20px;font-weight:700">Henry Teran<span style="color:#6ce5d8">.</span></td></tr><tr><td style="padding:28px 30px"><h1 style="margin:0 0 12px;font-size:24px;line-height:1.25;color:#101820">${escapeHtml(subject)}</h1><p style="margin:0;color:#526071;line-height:1.6">${escapeHtml(intro)}</p>${body}</td></tr><tr><td style="padding:18px 30px;background:#f8fafc;color:#64748b;font-size:12px">Henry Teran · <a style="color:#287e77" href="https://henryteran.com">henryteran.com</a></td></tr></table></td></tr></table></body></html>`,
    text,
  };
}
