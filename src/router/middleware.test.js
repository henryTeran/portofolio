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
});
