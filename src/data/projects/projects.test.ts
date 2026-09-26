import { describe, expect, it } from 'vitest';
import { featuredProjects, getProject } from './index';
import { getProjectCopy } from '../../content/projects';
import { existsSync, readFileSync } from 'node:fs';

describe('featured project data', () => {
  it('provides a curated set of existing WebP assets and localized descriptions', () => {
    for (const project of featuredProjects) {
      const visuals = project.visuals ?? [];
      expect(visuals.length).toBeGreaterThanOrEqual(4);
      expect(visuals.length).toBeLessThanOrEqual(7);
      expect(new Set(visuals.map(({ id }) => id)).size).toBe(visuals.length);
      expect(visuals.filter(({ featured }) => featured).length).toBeLessThanOrEqual(4);
      for (const visual of visuals) {
        expect(existsSync(`public${visual.src}`)).toBe(true);
        expect(readFileSync(`public${visual.src}`).toString('ascii', 8, 12)).toBe('WEBP');
        expect(visual.width).toBeGreaterThan(0);
        expect(visual.height).toBeGreaterThan(0);
        for (const lang of ['fr', 'en', 'es'] as const) {
          expect(visual.alt[lang]).toBeTruthy();
          expect(visual.label[lang]).toBeTruthy();
          expect(visual.caption[lang]).toBeTruthy();
        }
      }
    }
  });
  it('has unique routes and copy in every supported language', () => {
    expect(new Set(featuredProjects.map((project) => project.slug)).size).toBe(4);
    for (const project of featuredProjects) {
      expect(getProject(project.slug)).toBe(project);
      for (const language of ['fr', 'en', 'es'] as const) {
        expect(getProjectCopy(language, project.slug)?.summary).toBeTruthy();
      }
    }
  });
});
