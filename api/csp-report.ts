type CspReportBody = {
  'csp-report'?: {
    'document-uri'?: string;
    'violated-directive'?: string;
    'effective-directive'?: string;
    'blocked-uri'?: string;
    'original-policy'?: string;
    disposition?: string;
    sourceFile?: string;
    lineNumber?: number;
    columnNumber?: number;
    statusCode?: number;
    scriptSample?: string;
  };
};

const redactUri = (value: unknown): string | null => {
  if (typeof value !== 'string' || value.length === 0) return null;

  try {
    const parsed = new URL(value);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return value.slice(0, 300);
  }
};

type RequestLike = {
  method?: string;
  body?: unknown;
};

type ResponseLike = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    json: (value: unknown) => void;
    end: () => void;
  };
};

export default function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const body = (req.body ?? {}) as CspReportBody | CspReportBody[];
  const reports = Array.isArray(body) ? body : [body];

  const sanitized = reports.map((entry) => {
    const report = entry?.['csp-report'] ?? {};

    return {
      at: new Date().toISOString(),
      documentUri: redactUri(report['document-uri']),
      violatedDirective: report['violated-directive'] ?? null,
      effectiveDirective: report['effective-directive'] ?? null,
      blockedUri: redactUri(report['blocked-uri']),
      disposition: report.disposition ?? null,
      sourceFile: redactUri(report.sourceFile),
      lineNumber: report.lineNumber ?? null,
      columnNumber: report.columnNumber ?? null,
      statusCode: report.statusCode ?? null,
      scriptSample: typeof report.scriptSample === 'string' ? report.scriptSample.slice(0, 180) : null,
    };
  });

  console.info('[CSP][Report-Only]', JSON.stringify(sanitized));
  return res.status(204).end();
}
