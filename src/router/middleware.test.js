import { describe, expect, it } from 'vitest';
import middleware from '../../middleware';

describe('Vercel route middleware', () => {
  it.each(['fr', 'en', 'es'])('preserves project, privacy and verification routes in %s', language => {
    for (const path of ['projects/zigoma', 'projects/applyflow', 'projects/jobtrace-ai', 'projects/wellsync', 'projects/unknown', 'privacy', 'verify']) {
      expect(middleware(new Request(`https://preview.example.com/${language}/${path}`))).toBeUndefined();
    }
  });
  it('retains the legacy project-section redirect', () => {
    const response = middleware(new Request('https://preview.example.com/fr/projects'));
    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://preview.example.com/fr#projects');
  });
  it.each([
    ['fr-CH,fr;q=0.9,en;q=0.8', 'fr'],
    ['de-CH,es;q=0.7,en;q=0.5', 'es'],
    ['en-US;q=0.5,fr;q=0.9', 'fr'],
    ['de-DE', 'en'],
    [null, 'en'],
  ])('redirects the bare root using Accept-Language %s', (header, language) => {
    const headers = header ? { 'accept-language': header } : {};
    const response = middleware(new Request('https://preview.example.com/', { headers }));
    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe(`https://preview.example.com/${language}`);
  });
  it('keeps the explicit ?lang root redirect', () => {
    const response = middleware(new Request('https://preview.example.com/?lang=es'));
    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://preview.example.com/es');
  });
});
