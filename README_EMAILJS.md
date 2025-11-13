# 📧 EmailJS - Configuration Complète

## 🚀 Installation et Configuration

Le système EmailJS est **déjà installé et configuré** dans ce projet. Il vous reste juste à :

1. Configurer EmailJS Dashboard (5 min)
2. Remplir le fichier `.env` (1 min)
3. Tester (2 min)

---

## 📚 Documentation disponible

| Fichier | Description | Quand l'utiliser |
|---------|-------------|------------------|
| **QUICK_START_EMAILJS.md** | Guide rapide 5 minutes | Démarrage rapide |
| **SOLUTION_EMAILJS.md** | Solution complète avec checklist | Configuration détaillée |
| **EMAILJS_DASHBOARD_GUIDE.md** | Guide du Dashboard EmailJS | Création des templates |
| **TEST_EMAILJS.md** | Guide de tests | Vérifier que tout fonctionne |
| **EMAILJS_CONFIG.md** | Configuration technique | Référence des variables |
| **CHANGELOG_EMAILJS.md** | Liste des changements | Comprendre les modifications |

---

## ⚡ Quick Start (5 min)

### 1. EmailJS Dashboard

```
→ Aller sur dashboard.emailjs.com
→ Créer un Service Email (Gmail recommandé)
→ Créer 2 Templates (Contact + Devis)
→ Récupérer : Service ID, 2 Template IDs, Public Key
```

**Détails** : Voir `EMAILJS_DASHBOARD_GUIDE.md`

### 2. Fichier .env

```env
VITE_EMAILJS_PUBLIC_KEY=votre_public_key
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TPL_CONTACT=votre_template_contact_id
VITE_EMAILJS_TPL_QUOTE=votre_template_devis_id
```

### 3. Redémarrer

```bash
Ctrl+C
npm run dev
```

### 4. Vérifier

Console doit afficher : `[EmailJS] Initialisé avec succès` ✅

---

## 🎯 Fonctionnalités

### ✅ Formulaire Contact
- Validation des champs (nom, email, message)
- Envoi sécurisé avec sanitization
- Email formaté reçu instantanément
- Reply-to automatique

### ✅ Formulaire Devis
- 4 étapes guidées
- Sélection de fonctionnalités et technologies
- Planning et budget
- Services supplémentaires
- Email détaillé avec toutes les infos

### ✅ Robustesse
- Plus d'erreur "Variables Corrupted"
- Validation avant envoi
- Logs détaillés pour débogage
- Gestion complète des erreurs

---

## 🔧 Architecture

```
src/
├── services/
│   └── emailService.ts          ← Service principal
├── components/
│   ├── Contact.tsx              ← Formulaire contact
│   └── QuoteModal.tsx           ← Formulaire devis
```

### Fonctions principales

```typescript
// Service (src/services/emailService.ts)
initEmailJS()                    // Initialiser EmailJS
sendContactEmail(formData)       // Envoyer contact
sendQuoteEmail(formData)         // Envoyer devis
validateContactForm(formData)    // Valider contact
validateQuoteForm(formData)      // Valider devis
```

---

## 🧪 Tests

### Vérifier la configuration

```javascript
// Console du navigateur
console.log({
  pk: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  sid: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  tpl_c: import.meta.env.VITE_EMAILJS_TPL_CONTACT,
  tpl_q: import.meta.env.VITE_EMAILJS_TPL_QUOTE
});
// Tous doivent être définis (pas undefined)
```

### Test Contact

1. Remplir le formulaire contact
2. Cliquer "Envoyer"
3. Console : `[EmailJS Contact] Succès: {...}`
4. Vérifier email reçu

### Test Devis

1. Cliquer "Demander un devis"
2. Remplir les 4 étapes
3. Cliquer "Envoyer la demande"
4. Console : `[EmailJS Quote] Succès: {...}`
5. Vérifier email reçu

**Guide complet** : Voir `TEST_EMAILJS.md`

---

## ❌ Résolution de problèmes

| Problème | Solution |
|----------|----------|
| `PUBLIC_KEY manquant` | Vérifier `.env` et redémarrer serveur |
| `Template not found` | Vérifier Template ID dans `.env` |
| `Variables corrupted` | Ne devrait plus arriver (tout est sanitisé) |
| Email pas reçu | Vérifier Spams / Dashboard > Service connecté |
| Rien dans la console | `initEmailJS()` doit être appelé au démarrage |

**Troubleshooting complet** : Voir `SOLUTION_EMAILJS.md`

---

## 📋 Templates EmailJS

### Subject Contact
```
Nouveau message de {{name}} via Portfolio
```

### Subject Devis
```
Nouvelle demande de devis de {{client_name}}
```

### Variables Contact
```
name, email, message, reply_to, time, lang, source_page, tags
```

### Variables Devis
```
client_name, client_email, client_phone, client_company,
project_type, project_description, project_features, project_technologies,
project_timeline, project_budget, project_urgency,
needs_design, needs_hosting, needs_maintenance, needs_training,
additional_info, reply_to
```

**Templates complets** : Voir `EMAILJS_CONFIG.md`

---

## 🔐 Sécurité

- ✅ Toutes les entrées sont sanitisées
- ✅ Validation stricte avant envoi
- ✅ Honeypot anti-bot dans le formulaire contact
- ✅ Pas de clés sensibles exposées côté client
- ✅ Reply-to sécurisé pour répondre au client

---

## 📊 Limites (Plan Free)

- 200 emails/mois
- 2 services email
- Templates illimités
- Historique 30 jours

**Pour upgrader** : https://www.emailjs.com/pricing

---

## 🎓 Pourquoi ce système est robuste ?

### Avant (problématique)
```typescript
// ❌ Erreur "Variables Corrupted"
const params = {
  features: ["Auth", "API"],  // Array → Erreur
  needsHosting: true,         // Boolean → Erreur
  phone: undefined            // Undefined → Erreur
};
```

### Après (solution)
```typescript
// ✅ Tout fonctionne
const params = {
  features: "Auth, API",      // String
  needsHosting: "Oui",        // String
  phone: ""                   // String vide
};
```

**Explications détaillées** : Voir `CHANGELOG_EMAILJS.md`

---

## 🚀 Production Ready

### Build
```bash
npm run build
```

### Variables production
Ajouter dans votre plateforme de déploiement (Vercel, Netlify, etc.) :
```
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TPL_CONTACT=...
VITE_EMAILJS_TPL_QUOTE=...
```

---

## 📞 Support

### Problème avec ce projet ?
1. Consulter `SOLUTION_EMAILJS.md` (troubleshooting)
2. Vérifier les logs console (tous préfixés `[EmailJS]`)
3. Tester dans EmailJS Playground

### Problème avec EmailJS ?
1. Documentation : https://www.emailjs.com/docs/
2. Support : dashboard.emailjs.com → Help
3. FAQ : https://www.emailjs.com/docs/faq/

---

## ✅ Checklist finale

Avant de dire "ça fonctionne" :

- [ ] Service créé dans EmailJS Dashboard
- [ ] 2 Templates créés (Contact + Devis)
- [ ] 4 variables dans `.env`
- [ ] Serveur redémarré
- [ ] Console : `[EmailJS] Initialisé avec succès`
- [ ] Test Contact : Email reçu
- [ ] Test Devis : Email reçu

**Guide complet** : Voir `SOLUTION_EMAILJS.md` section "Checklist finale"

---

## 📝 Changelog

**Version 1.0.0** (2025-11-13)
- ✅ Correction complète "Variables Corrupted"
- ✅ Service email robuste avec validation
- ✅ Documentation exhaustive (6 fichiers)
- ✅ Tests et vérifications
- ✅ Production-ready

**Détails** : Voir `CHANGELOG_EMAILJS.md`

---

## 🎯 Résumé en 3 points

1. **Configuration** → Suivre `QUICK_START_EMAILJS.md` (5 min)
2. **Tests** → Suivre `TEST_EMAILJS.md` (2 min)
3. **Déploiement** → Variables d'env + npm run build

**C'est tout !** Le code est déjà prêt et robuste. ✅

---

**Version** : 1.0.0
**Date** : 2025-11-13
**Status** : Production Ready ✅
**License** : MIT
