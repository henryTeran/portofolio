export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from: string;
  to: string;
  acknowledgement: boolean;
}

export function getMailConfig(): MailConfig {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD, MAIL_FROM, MAIL_TO, MAIL_ACKNOWLEDGEMENT } = process.env;
  const port = Number(SMTP_PORT ?? 587);
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !MAIL_FROM || !MAIL_TO || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Mail service is not configured');
  }
  return {
    host: SMTP_HOST, port, secure: SMTP_SECURE === 'true', user: SMTP_USER,
    password: SMTP_PASSWORD, from: MAIL_FROM, to: MAIL_TO,
    acknowledgement: MAIL_ACKNOWLEDGEMENT === 'true',
  };
}
