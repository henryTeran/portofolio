import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { trackSubmission, useSubmissionTracking } from './submissionTracking';

afterEach(() => { vi.unstubAllGlobals(); sessionStorage.clear(); });
it.each(['contact', 'brief'] as const)('updates %s after another device confirms and never posts the verification token', async kind => {
  let status = 'pending';
  const fetcher = vi.fn().mockImplementation(async () => ({ ok: true, json: async () => ({ status }) }));
  vi.stubGlobal('fetch', fetcher);
  const { result, unmount } = renderHook(() => useSubmissionTracking(kind));
  act(() => trackSubmission(kind, { receipt: 'r'.repeat(43), expiresAt: Date.now() + 1200000 }));
  await waitFor(() => expect(fetcher).toHaveBeenCalled());
  expect(result.current).toBe('pending');
  status = 'verified';
  act(() => window.dispatchEvent(new Event('focus')));
  await waitFor(() => expect(result.current).toBe('verified'));
  expect(JSON.parse(fetcher.mock.calls[fetcher.mock.calls.length - 1][1].body)).toEqual({ receipt: 'r'.repeat(43) });
  const count = fetcher.mock.calls.length;
  act(() => window.dispatchEvent(new Event('focus')));
  expect(fetcher).toHaveBeenCalledTimes(count);
  unmount();
  const restored = renderHook(() => useSubmissionTracking(kind));
  await waitFor(() => expect(restored.result.current).toBe('verified'));
});
