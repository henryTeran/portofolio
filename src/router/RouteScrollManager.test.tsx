import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, expect, it, vi } from 'vitest';
import AppRouter from './AppRouter';
import { caseStudyLabels } from '../content/case-studies/labels';
import '../i18n';

const mount = (path: string) => render(<HelmetProvider><MemoryRouter initialEntries={[path]}><AppRouter /></MemoryRouter></HelmetProvider>);
afterEach(() => vi.restoreAllMocks());

it.each(['fr', 'en', 'es'] as const)('resets project navigation, moves focus and returns to Work in %s', async language => {
  const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  const anchor = vi.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});
  mount(`/${language}/projects/zigoma`);
  expect(scroll).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: 'instant' });
  expect(screen.getByRole('main')).toHaveFocus();
  scroll.mockClear();
  const next = screen.getByRole('link', { name: new RegExp(`${caseStudyLabels[language].next} ApplyFlow`) });
  next.focus(); await userEvent.keyboard('{Enter}');
  expect(await screen.findByRole('heading', { level: 1, name: 'ApplyFlow' })).toBeInTheDocument();
  expect(scroll).toHaveBeenCalledOnce(); expect(screen.getByRole('main')).toHaveFocus();
  await userEvent.click(screen.getByRole('link', { name: new RegExp(`${caseStudyLabels[language].previous} ZIGOMA`) }));
  expect(await screen.findByRole('heading', { level: 1, name: 'ZIGOMA' })).toBeInTheDocument();
  expect(scroll).toHaveBeenCalledTimes(2);
  const back = screen.getByRole('link', { name: caseStudyLabels[language].back });
  expect(back).toHaveAttribute('href', `/${language}#work`);
  await userEvent.click(back);
  expect(anchor).toHaveBeenCalled(); expect(document.getElementById('projects')).toHaveFocus();
  scroll.mockClear();
  const explore = document.querySelector<HTMLAnchorElement>(`main a[href="/${language}/projects/zigoma"]`)!;
  await userEvent.click(explore);
  expect(await screen.findByRole('heading', { level: 1, name: 'ZIGOMA' })).toBeInTheDocument();
  expect(scroll).toHaveBeenCalledOnce(); expect(screen.getByRole('main')).toHaveFocus();
});

it.each([['work', 'projects'], ['expertise', 'expertise'], ['approach', 'approach'], ['journey', 'journey'], ['skills', 'expertise'], ['services', 'approach'], ['about', 'journey'], ['contact', 'contact'], ['projects', 'projects']])('resolves #%s without resetting to the top', (hash, id) => {
  const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  const anchor = vi.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});
  mount(`/fr#${hash}`);
  expect(anchor).toHaveBeenCalled(); expect(document.getElementById(id)).toHaveFocus();
  expect(scroll).not.toHaveBeenCalled();
});

it('resets the language route while keeping the current project', async () => {
  const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  mount('/fr/projects/zigoma'); scroll.mockClear();
  await userEvent.click(screen.getByRole('button', { name: 'EN' }));
  expect(screen.getByRole('heading', { level: 1, name: 'ZIGOMA' })).toBeInTheDocument();
  expect(scroll).toHaveBeenCalledOnce(); expect(screen.getByRole('main')).toHaveFocus();
});
