import type { Expertise } from '../types/portfolio';

export const expertiseGroups: readonly Expertise[] = [
  { id: 'business', titleKey: 'business', capabilityKeys: ['ERP', 'CRM', 'Finance', 'Workflows', 'Dashboards', 'Multi-tenant systems'], technologies: ['Flask', 'FastAPI', 'Firestore', 'PostgreSQL'] },
  { id: 'ai', titleKey: 'ai', capabilityKeys: ['LLM', 'RAG', 'Agents', 'Voice AI', 'Structured extraction', 'AI guardrails'], technologies: ['OpenAI', 'Python', 'Pandas', 'NumPy'] },
  { id: 'engineering', titleKey: 'engineering', capabilityKeys: ['React', 'TypeScript', 'Python', 'FastAPI', 'Flask', 'PostgreSQL', 'Firebase', 'Redis', 'Docker', 'CI/CD'], technologies: ['Frontend', 'Backend', 'Infrastructure'] },
];
