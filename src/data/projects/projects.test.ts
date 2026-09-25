import { describe, expect, it } from 'vitest';
import { featuredProjects, getProject } from './index';
import { getProjectCopy } from '../../content/projects';

describe('featured project data', () => {
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
