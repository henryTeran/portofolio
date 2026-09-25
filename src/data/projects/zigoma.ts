import type { PortfolioProject } from '../../types/portfolio';

export const zigoma: PortfolioProject = {
  slug: 'zigoma', title: 'ZIGOMA', categoryKey: 'portfolio.zigoma.category',
  taglineKey: 'portfolio.zigoma.tagline', summaryKey: 'portfolio.zigoma.summary',
  role: ['Lead Developer', 'Architecture', 'Applied AI'], period: '2026',
  technologies: ['Python', 'Flask', 'Firestore', 'OpenAI', 'Pandas', 'NumPy', 'Tailwind', 'WeasyPrint'],
  capabilities: ['CRM', 'Sales', 'Invoicing', 'Stock', 'Projects', 'Finance', 'Analytics', 'AI Assistant'],
  featured: true,
};
