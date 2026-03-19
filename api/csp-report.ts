// Disable Vercel's built-in body parser so we can read the raw stream ourselves.
// Required because Vercel only auto-parses application/json but not
// application/csp-report or application/reports+json — those arrive as an
// unconsumed stream unless we opt-out here.
export const config = {
  api: {
    bodyParser: false,
  },
};

const SUPPORTED_CONTENT_TYPES = new Set([
  'application/csp-report',
  'application/reports+json',
  'application/json',
]);

type UnknownRecord = Record<string, unknown>;

type RequestLike = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  on?: (event: 'data' | 'end' | 'error', listener: (...args: unknown[]) => void) => void;
};

type ResponseLike = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    json: (value: unknown) => void;
    end: () => void;
  };
};

type NormalizedCspReport = {
  at: string;
  documentUri: string | null;
  violatedDirective: string | null;
  effectiveDirective: string | null;
  blockedUri: string | null;
  sourceFile: string | null;
  lineNumber: number | null;
  columnNumber: number | null;
  disposition: string | null;
  originalPolicy: string | null;
  referrer: string | null;
  statusCode: number | null;
  scriptSample: string | null;
  userAgent: string | null;
};

const isDev =
  process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV === 'development';

const asRecord = (value: unknown): UnknownRecord | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as UnknownRecord;
};

const toNumberOrNull = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const toStringOrNull = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const pickFirst = (source: UnknownRecord, keys: string[]): unknown => {
  for (const key of keys) {
    if (key in source && source[key] !== undefined && source[key] !== null) {
      return source[key];
    }
  }
  return null;
};

const sanitizeUri = (value: unknown): string | null => {
  const raw = toStringOrNull(value);
  if (!raw) return null;

  try {
    const parsed = new URL(raw);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return raw.split('?')[0].split('#')[0].slice(0, 300);
  }
};

const sanitizeScriptSample = (value: unknown): string | null => {
  const raw = toStringOrNull(value);
  if (!raw) return null;
  return raw.replace(/\s+/g, ' ').slice(0, 180);
};

const getHeader = (req: RequestLike, headerName: string): string | null => {
  const headers = req.headers ?? {};
  const headerKey = Object.keys(headers).find(
    (key) => key.toLowerCase() === headerName.toLowerCase()
  );

  if (!headerKey) return null;
  const value = headers[headerKey];
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
};

const parseContentType = (value: string | null): string | null => {
  if (!value) return null;
  return value.split(';')[0]?.trim().toLowerCase() ?? null;
};

const parseIncomingBody = (body: unknown): unknown => {
  if (typeof body === 'string') {
    const trimmed = body.trim();
    if (!trimmed) return null;
    try {
      return JSON.parse(trimmed);
    } catch {
      return null;
    }
  }

  if (body && typeof Buffer !== 'undefined' && Buffer.isBuffer(body)) {
    const text = body.toString('utf8').trim();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  return body;
};

const readRawBody = (req: RequestLike): Promise<string | null> => {
  return new Promise((resolve) => {
    if (typeof req.on !== 'function') {
      resolve(null);
      return;
    }

    const chunks: Buffer[] = [];

    req.on('data', (chunk: unknown) => {
      if (typeof chunk === 'string') {
        chunks.push(Buffer.from(chunk));
        return;
      }

      if (chunk && typeof Buffer !== 'undefined' && Buffer.isBuffer(chunk)) {
        chunks.push(chunk);
      }
    });

    req.on('end', () => {
      if (chunks.length === 0) {
        resolve(null);
        return;
      }
      resolve(Buffer.concat(chunks).toString('utf8'));
    });

    req.on('error', () => resolve(null));
  });
};

const extractRawReports = (payload: unknown): UnknownRecord[] => {
  const collected: UnknownRecord[] = [];

  const visit = (entry: unknown) => {
    if (Array.isArray(entry)) {
      entry.forEach(visit);
      return;
    }

    const record = asRecord(entry);
    if (!record) return;

    const reports = record.reports;
    if (Array.isArray(reports)) {
      reports.forEach(visit);
      return;
    }

    const singleReport = record.report;
    if (singleReport !== undefined) {
      visit(singleReport);
      return;
    }

    const legacy = asRecord(record['csp-report']);
    if (legacy) {
      collected.push({ ...legacy, __envelope: record });
      return;
    }

    const reportingApiBody = asRecord(record.body);
    if (reportingApiBody) {
      const nestedLegacy = asRecord(reportingApiBody['csp-report']);
      if (nestedLegacy) {
        collected.push({ ...nestedLegacy, __envelope: record });
      } else {
        collected.push({ ...reportingApiBody, __envelope: record });
      }
      return;
    }

    collected.push(record);
  };

  visit(payload);
  return collected;
};

const normalizeReport = (
  rawReport: UnknownRecord,
  userAgent: string | null,
  nowIso: string
): NormalizedCspReport => {
  const envelope = asRecord(rawReport.__envelope) ?? {};

  const documentUriValue = pickFirst(rawReport, [
    'document-uri',
    'documentURL',
    'documentUrl',
    'document_uri',
  ]) ?? pickFirst(envelope, ['url']);

  const violatedDirectiveValue = pickFirst(rawReport, [
    'violated-directive',
    'violatedDirective',
  ]);

  const effectiveDirectiveValue = pickFirst(rawReport, [
    'effective-directive',
    'effectiveDirective',
  ]);

  const blockedUriValue = pickFirst(rawReport, [
    'blocked-uri',
    'blockedURL',
    'blockedUrl',
    'blocked_uri',
  ]);

  const sourceFileValue = pickFirst(rawReport, ['source-file', 'sourceFile']);
  const lineNumberValue = pickFirst(rawReport, ['line-number', 'lineNumber']);
  const columnNumberValue = pickFirst(rawReport, ['column-number', 'columnNumber']);
  const dispositionValue = pickFirst(rawReport, ['disposition']);
  const originalPolicyValue = pickFirst(rawReport, ['original-policy', 'originalPolicy']);
  const referrerValue = pickFirst(rawReport, ['referrer']);
  const statusCodeValue = pickFirst(rawReport, ['status-code', 'statusCode']);
  const scriptSampleValue = pickFirst(rawReport, ['script-sample', 'scriptSample']);

  return {
    at: nowIso,
    documentUri: sanitizeUri(documentUriValue),
    violatedDirective: toStringOrNull(violatedDirectiveValue),
    effectiveDirective: toStringOrNull(effectiveDirectiveValue),
    blockedUri: sanitizeUri(blockedUriValue),
    sourceFile: sanitizeUri(sourceFileValue),
    lineNumber: toNumberOrNull(lineNumberValue),
    columnNumber: toNumberOrNull(columnNumberValue),
    disposition: toStringOrNull(dispositionValue),
    originalPolicy: toStringOrNull(originalPolicyValue),
    referrer: sanitizeUri(referrerValue),
    statusCode: toNumberOrNull(statusCodeValue),
    scriptSample: sanitizeScriptSample(scriptSampleValue),
    userAgent: userAgent,
  };
};

const hasMeaningfulData = (report: NormalizedCspReport): boolean => {
  return Boolean(
    report.documentUri ||
      report.violatedDirective ||
      report.effectiveDirective ||
      report.blockedUri ||
      report.sourceFile ||
      report.originalPolicy ||
      report.referrer
  );
};

const logCompact = (report: NormalizedCspReport) => {
  const effective = report.effectiveDirective ?? 'unknown';
  const blocked = report.blockedUri ?? 'unknown';
  const documentUri = report.documentUri ?? 'unknown';
  const disposition = report.disposition ?? 'report';

  console.info(
    `[CSP][Report-Only] effectiveDirective=${effective} blockedUri=${blocked} documentUri=${documentUri} disposition=${disposition}`
  );
};

export default function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const contentType = parseContentType(getHeader(req, 'content-type'));
  if (contentType && !SUPPORTED_CONTENT_TYPES.has(contentType)) {
    return res.status(400).json({ ok: false, error: 'Invalid body format' });
  }

  // Body parser is disabled (see config above). Always read the raw stream
  // so all content-type variants (csp-report, reports+json, json) are supported.
  const resolvePayload = async (): Promise<unknown> => {
    const raw = await readRawBody(req);
    if (raw) return parseIncomingBody(raw);
    return parseIncomingBody(req.body);
  };

  const process = async () => {
    const parsedBody = await resolvePayload();
    const rawReports = extractRawReports(parsedBody);

    if (rawReports.length === 0) {
      return res.status(400).json({ ok: false, error: 'Invalid body format' });
    }

    const nowIso = new Date().toISOString();
    const userAgent = toStringOrNull(getHeader(req, 'user-agent'));

    const normalizedReports = rawReports
      .map((raw) => normalizeReport(raw, userAgent, nowIso))
      .filter(hasMeaningfulData);

    if (normalizedReports.length === 0) {
      return res.status(400).json({ ok: false, error: 'Invalid body format' });
    }

    normalizedReports.forEach(logCompact);

    if (isDev) {
      console.debug('[CSP][Report-Only][Debug]', JSON.stringify(normalizedReports));
    }

    return res.status(204).end();
  };

  process().catch(() => {
    return res.status(400).json({ ok: false, error: 'Invalid body format' });
  });
}
