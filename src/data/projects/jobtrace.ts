import type { PortfolioProject } from '../../types/portfolio';

export const jobtrace: PortfolioProject = {
  slug: 'jobtrace-ai', title: 'JobTrace AI', categoryKey: 'portfolio.jobtrace.category',
  taglineKey: 'portfolio.jobtrace.tagline', summaryKey: 'portfolio.jobtrace.summary',
  role: ['Backend Engineering', 'Applied AI'], period: '2025–2026',
  technologies: ['FastAPI', 'Python', 'OAuth', 'Gmail API', 'Microsoft Graph', 'PDF generation'],
  capabilities: ['Email synchronization', 'Structured extraction', 'Deduplication', 'Reporting', 'PDF'],
  featured: true,
};
