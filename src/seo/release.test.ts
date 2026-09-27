import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { featuredProjects } from '../data/projects';

describe('release sitemap', () => {
  it('lists every public localized page without obsolete routes or verification links', () => {
    const xml = readFileSync('public/sitemap.xml', 'utf8');
    const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
    const expected = ['fr', 'en', 'es'].flatMap(language => ['', '/privacy', ...featuredProjects.map(project => `/projects/${project.slug}`)].map(suffix => `https://henryteran.com/${language}${suffix}`));
    expect(locations.sort()).toEqual(expected.sort());
  });
});
