# CSP rollout (Vercel + React + Vite)

## 1) Sources réellement utilisées (audit)

### `default-src`
- `'self'` uniquement.

### `script-src`
- `'self'` (bundles Vite en production)
- `https://www.googletagmanager.com` (chargement `gtag.js` via `react-ga4`)
- `'unsafe-inline'` **temporaire** requis:
  - scripts JSON-LD inline dans `index.html`
  - script JSON-LD inline injecté via `react-helmet-async`
- `'report-sample'` activé pour améliorer les rapports CSP.

### `connect-src`
- `'self'` (requêtes first-party)
- `https://api.emailjs.com` (envoi des formulaires)
- `https://www.google-analytics.com` (collecte GA4)
- `https://region1.google-analytics.com` (collecte GA4 régionale)
- `https://www.googletagmanager.com` (support GA)
- `https://stats.g.doubleclick.net` (observé/courant avec GA4, **à confirmer** selon trafic réel)

### `img-src`
- `'self'` (logos, assets locaux)
- `data:` (icônes/ressources encodées éventuelles)

### `style-src`
- `'self'` (styles compilés)
- `https://fonts.googleapis.com` (CSS Google Fonts)
- `'unsafe-inline'` **temporaire** requis (nombreuses props React `style={{...}}`)

### `font-src`
- `'self'`
- `https://fonts.gstatic.com` (fichiers de polices)
- `data:` (fallback inline éventuel)

### `frame-src`
- `'none'` (pas d'iframe métier actuellement)

### `object-src`
- `'none'` (aucun plugin legacy)

### `base-uri`
- `'self'`

### `form-action`
- `'self'` (soumissions gérées côté JS)

### `frame-ancestors`
- `'none'` (anti-clickjacking)

### `upgrade-insecure-requests`
- activé (site HTTPS uniquement)

---

## 2) Policy Report-Only appliquée

```text
default-src 'self';
script-src 'self' 'unsafe-inline' 'report-sample' https://www.googletagmanager.com;
connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://api.emailjs.com;
img-src 'self' data:;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' data: https://fonts.gstatic.com;
frame-src 'none';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests;
report-uri /api/csp-report;
```

---

## 3) Endpoint de reporting (minimal)

- Endpoint: `POST /api/csp-report`
- Fichier: `api/csp-report.ts`
- Comportement:
  - accepte les rapports CSP (`application/csp-report` et tableau de rapports)
  - réduit les URLs en `origin + pathname` pour limiter l'exposition de données
  - tronque `scriptSample`
  - logge côté serveur Vercel
  - répond `204`

Consulter ensuite les logs Vercel (Runtime logs) pour analyser les violations réelles avant activation bloquante.

---

## 4) Préparation CSP bloquante (phase 2)

### Cible recommandée
- remplace `Content-Security-Policy-Report-Only` par `Content-Security-Policy`
- conserve les mêmes directives **après** nettoyage des violations

### Réduction supplémentaire recommandée
1. Retirer `'unsafe-inline'` de `script-src`:
   - migrer JSON-LD inline vers scripts hashés ou noncés.
2. Retirer `'unsafe-inline'` de `style-src`:
   - migrer progressivement les `style={{...}}` vers classes/CSS variables.
3. Évaluer suppression de `https://stats.g.doubleclick.net` si aucune violation liée après observation.

### Checklist avant bascule bloquante
- 7 jours sans violation critique (navigations réelles FR/EN/ES + mobile/desktop)
- envoi EmailJS validé en production
- page views + events GA4 validés
- aucun blocage sur polices Google
- aucune erreur console CSP sur parcours principaux
- décision explicite sur maintien/suppression de `stats.g.doubleclick.net`

---

## 5) Monitoring immédiat (sans CLI Vercel)

La CLI `vercel` n'est pas disponible sur cet environnement local. Alternative pragmatique immédiate:

1. Ouvrir Vercel Dashboard > Project > Functions > `api/csp-report` > Logs.
2. Ouvrir le site en production sur `/fr`, `/en`, `/es` et exécuter les parcours:
   - navigation par ancres (`#about`, `#projects`, `#services`, `#contact`)
   - soumission formulaire contact
   - ouverture du devis
   - changement de langue
3. Vérifier ensuite les logs de la fonction `api/csp-report`.

### Tests synthétiques (pour valider le pipeline de report)

Dans DevTools console sur `https://henryteran.com/fr`, exécuter:

```js
// 1) Violation img-src (domaine non autorisé)
const img = new Image();
img.src = 'https://example.com/csp-probe.png';
document.body.appendChild(img);

// 2) Violation connect-src (endpoint non autorisé)
fetch('https://example.com/csp-probe', { mode: 'no-cors' }).catch(() => {});
```

Attendu:
- événements `Content Security Policy` dans DevTools Console
- nouvelles entrées JSON dans les logs de `api/csp-report`

---

## 6) Triage des violations: priorités

Priorité P0 (corriger avant CSP bloquante):
- `effectiveDirective=connect-src` sur `api.emailjs.com`, `google-analytics.com`, `region1.google-analytics.com`.
- `effectiveDirective=script-src` pour `www.googletagmanager.com`.

Priorité P1 (analyse):
- `blockedUri=https://stats.g.doubleclick.net`:
  - garder si observé régulièrement avec GA4 réel,
  - retirer sinon pour durcir la policy.

Priorité P2 (durcissement progressif):
- retrait de `'unsafe-inline'` dans `script-src` après migration JSON-LD vers hash/nonce.
- retrait de `'unsafe-inline'` dans `style-src` après migration des styles inline React.

Règle de décision recommandée:
- garder une origine uniquement si violation récurrente + besoin fonctionnel prouvé.
- supprimer toute origine non observée sur une fenêtre de 7 jours réels.
