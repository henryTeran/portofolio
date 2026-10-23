// Build-time only: renders each public route to static HTML so search engines,
// social previews and AI crawlers receive real content and per-page metadata.
// Used by scripts/prerender.mjs; never shipped to the browser.
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'node:stream';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
// AppRouter rather than App: the cookie banner depends on the visitor's stored consent,
// so it is rendered by the browser only (as before) instead of being baked into the HTML.
import AppRouter from './router/AppRouter';
import i18n from './i18n';
import fr from './locales/fr/common.json';
import es from './locales/es/common.json';
import type { LanguageCode } from './constants/i18n';

// The prerender script provides browser globals (jsdom) for components that read them;
// force Helmet into server mode so it collects tags instead of editing that fake DOM.
(HelmetProvider as unknown as { canUseDOM: boolean }).canUseDOM = false;

i18n.addResourceBundle('fr', 'translation', fr, true, true);
i18n.addResourceBundle('es', 'translation', es, true, true);

export async function render(url: string, language: LanguageCode) {
  await i18n.changeLanguage(language);
  const helmetContext: { helmet?: HelmetServerState } = {};
  const tree = (
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppRouter />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );
  // Wait for every Suspense boundary (translations, data) instead of emitting fallbacks.
  const html = await new Promise<string>((resolve, reject) => {
    let output = '';
    const sink = new Writable({
      write(chunk, _encoding, callback) { output += chunk.toString(); callback(); },
      final(callback) { resolve(output); callback(); },
    });
    const stream = renderToPipeableStream(tree, {
      onAllReady() { stream.pipe(sink); },
      onShellError: reject,
      onError: reject,
    });
  });
  const helmet = helmetContext.helmet;
  const head = helmet
    ? [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString()].join('\n')
    : '';
  return { html, head };
}
