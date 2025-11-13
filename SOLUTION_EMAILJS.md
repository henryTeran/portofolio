# 🎯 Solution complète pour résoudre "Variables Corrupted" - EmailJS

## 📋 Résumé des changements

### ✅ Ce qui a été corrigé

1. **Service email robuste** (`src/services/emailService.ts`)
   - Toutes les valeurs sont sanitisées (conversion en string, trim)
   - Les arrays sont convertis en string avec `join(', ')`
   - Les booléens sont convertis en "Oui"/"Non"
   - Validation stricte avant envoi
   - Gestion complète des erreurs avec logs détaillés

2. **Variables d'environnement** (`.env`)
   - Ajout de toutes les clés EmailJS nécessaires
   - Structure claire avec commentaires

3. **Validation des formulaires**
   - Fonction `validateContactForm()` pour le contact
   - Fonction `validateQuoteForm()` pour les devis
   - Vérification des champs obligatoires et formats

4. **Logs détaillés**
   - Initialisation : `[EmailJS] Initialisé avec succès`
   - Avant envoi : `[EmailJS Contact/Quote] Envoi avec les paramètres:`
   - Après envoi : `[EmailJS Contact/Quote] Succès:`
   - En cas d'erreur : `[EmailJS] Erreur:` avec détails

---

## 🔧 Actions à faire maintenant

### Étape 1 : Configuration EmailJS Dashboard

#### A. Créer ou vérifier le Service Email

1. Aller sur [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Aller dans "Email Services"
3. Si pas de service : Créer un service (Gmail, Outlook, etc.)
4. **Noter le Service ID**

#### B. Créer le Template Contact

1. Aller dans "Email Templates" > "Create New Template"
2. Nommer : `portfolio_contact`
3. **Subject** :
   ```
   Nouveau message de {{name}} via Portfolio
   ```

4. **Content** (copier tel quel) :
   ```
   📨 Nouveau message depuis le portfolio
   Reçu le {{time}} · Langue: {{lang}}{{#if source_page}} · Page: {{source_page}}{{/if}}
   👤

   {{name}}
   Email : {{email}}
   Message
   {{message}}
   {{#if tags}}
   Tags
   {{tags}}
   {{/if}}
   Répondre à : {{reply_to}}
   ```

5. **Settings** > **Reply To** :
   ```
   {{reply_to}}
   ```

6. **Save** et **noter le Template ID**

#### C. Créer le Template Devis

1. Créer un nouveau template : `portfolio_quote`
2. **Subject** :
   ```
   Nouvelle demande de devis de {{client_name}}
   ```

3. **Content** (copier tel quel) :
   ```
   🧾 Nouvelle demande de devis depuis le portfolio
   👤 Informations client
   Nom: {{client_name}}
   Email: {{client_email}}
   {{#if client_phone}}
   Téléphone: {{client_phone}}
   {{/if}} {{#if client_company}}
   Entreprise: {{client_company}}
   {{/if}}
   📌 Projet
   Type: {{project_type}}
   Description:

   {{project_description}}
   {{#if project_features}}
   Fonctionnalités: {{project_features}}
   {{/if}} {{#if project_technologies}}
   Technologies: {{project_technologies}}
   {{/if}}
   ⏱️ Planning
   Délai: {{project_timeline}}
   Budget: {{project_budget}}
   Urgence: {{project_urgency}}
   🧩 Services supplémentaires
   Design: {{needs_design}}
   Hébergement: {{needs_hosting}}
   Maintenance: {{needs_maintenance}}
   Formation: {{needs_training}}
   {{#if additional_info}}
   📝 Informations supplémentaires
   {{additional_info}}
   {{/if}}
   Répondre à : {{reply_to}}
   ```

4. **Settings** > **Reply To** :
   ```
   {{reply_to}}
   ```

5. **Save** et **noter le Template ID**

#### D. Récupérer la Public Key

1. Aller dans "Account" > "General"
2. Section "API Keys"
3. **Copier la Public Key**

---

### Étape 2 : Configuration du projet

#### A. Mettre à jour le fichier .env

Ouvrir `.env` et remplacer les valeurs par défaut :

```env
VITE_EMAILJS_PUBLIC_KEY=votre_public_key_ici
VITE_EMAILJS_SERVICE_ID=votre_service_id_ici
VITE_EMAILJS_TPL_CONTACT=portfolio_contact
VITE_EMAILJS_TPL_QUOTE=portfolio_quote
```

**Exemple** :
```env
VITE_EMAILJS_PUBLIC_KEY=abc123xyz456
VITE_EMAILJS_SERVICE_ID=service_xyz123
VITE_EMAILJS_TPL_CONTACT=template_abc123
VITE_EMAILJS_TPL_QUOTE=template_xyz456
```

⚠️ **Important** : Les Template IDs peuvent être différents de "portfolio_contact" et "portfolio_quote". Utilisez les IDs exacts générés par EmailJS.

#### B. Redémarrer le serveur

```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer
npm run dev
```

---

### Étape 3 : Tester les templates dans EmailJS

#### A. Test Template Contact

1. Dans EmailJS Dashboard, ouvrir le template Contact
2. Cliquer sur "Test it"
3. Copier ce JSON dans le champ :

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "message": "Message de test",
  "reply_to": "test@example.com",
  "time": "13/11/2025, 14:30",
  "lang": "fr",
  "source_page": "/#contact",
  "tags": "lead, portfolio"
}
```

4. Cliquer "Test"
5. **Vérifier votre boîte email** pour l'email de test

#### B. Test Template Devis

1. Ouvrir le template Devis
2. Cliquer sur "Test it"
3. Copier ce JSON :

```json
{
  "client_name": "Sophie Martin",
  "client_email": "sophie@example.com",
  "client_phone": "+33 6 12 34 56 78",
  "client_company": "Tech Corp",
  "project_type": "Application web",
  "project_description": "Développement d'une plateforme SaaS complète",
  "project_features": "Auth, Dashboard, API REST",
  "project_technologies": "React, Node.js, PostgreSQL",
  "project_timeline": "3-6 mois",
  "project_budget": "10 000€ - 20 000€",
  "project_urgency": "Moyenne",
  "needs_design": "Oui",
  "needs_hosting": "Oui",
  "needs_maintenance": "Non",
  "needs_training": "Non",
  "additional_info": "Projet urgent avec deadline fixe",
  "reply_to": "sophie@example.com"
}
```

4. Cliquer "Test"
5. **Vérifier votre boîte email**

---

### Étape 4 : Tester dans l'application

#### A. Vérifier l'initialisation

1. Ouvrir l'application dans le navigateur
2. Ouvrir la Console (F12)
3. Vous devez voir : `[EmailJS] Initialisé avec succès`

❌ Si vous voyez : `[EmailJS] PUBLIC_KEY manquant dans .env`
→ Recommencer l'étape 2 (vérifier .env et redémarrer)

#### B. Test formulaire Contact

1. Aller dans la section Contact
2. Remplir :
   - Nom : "Test User"
   - Email : "votre-email@example.com"
   - Message : "Test du système de contact"
3. Cliquer "Envoyer"
4. **Vérifier la console** :
   ```
   [EmailJS Contact] Envoi avec les paramètres: {...}
   [EmailJS Contact] Succès: {...}
   ```
5. **Vérifier votre boîte email**

#### C. Test formulaire Devis

1. Cliquer sur "Demander un devis"
2. Remplir toutes les étapes
3. À l'étape 4, cliquer "Envoyer la demande"
4. **Vérifier la console** :
   ```
   [EmailJS Quote] Envoi avec les paramètres: {...}
   [EmailJS Quote] Succès: {...}
   ```
5. **Vérifier votre boîte email**

---

## 🔍 Débogage

### Si "Variables Corrupted" persiste

1. **Copier les paramètres de la console**
   ```javascript
   // Exemple de ce que vous voyez dans la console
   [EmailJS Contact] Envoi avec les paramètres: {
     name: "...",
     email: "...",
     // ...
   }
   ```

2. **Tester dans le Playground**
   - Aller dans EmailJS > Template > Test
   - Coller les paramètres exacts
   - Voir quelle variable pose problème

3. **Vérifier les noms de variables**
   - Les noms dans le template doivent correspondre exactement
   - Sensible à la casse : `client_name` ≠ `Client_Name`

### Si l'email n'arrive pas

1. **Vérifier le Service**
   - Aller dans EmailJS > Email Services
   - Vérifier que le service est "Connected"
   - Test de connexion : cliquer "Check connection"

2. **Vérifier les Quotas**
   - EmailJS Free : 200 emails/mois
   - Vérifier dans Dashboard > Usage

3. **Vérifier les Spams**
   - Chercher dans les spams/promotions
   - Ajouter EmailJS en contact de confiance

---

## 📁 Fichiers modifiés

### Nouveaux fichiers

- ✅ `EMAILJS_CONFIG.md` - Configuration détaillée
- ✅ `TEST_EMAILJS.md` - Guide de tests
- ✅ `SOLUTION_EMAILJS.md` - Ce fichier

### Fichiers modifiés

- ✅ `.env` - Variables d'environnement ajoutées
- ✅ `src/services/emailService.ts` - Service robuste avec validation
- ✅ `src/components/Contact.tsx` - Utilisation de la validation
- ✅ `src/components/QuoteModal.tsx` - Utilisation de la validation

---

## ✅ Checklist finale

### Configuration EmailJS
- [ ] Service email créé et connecté
- [ ] Template Contact créé avec toutes les variables
- [ ] Template Devis créé avec toutes les variables
- [ ] Subject configuré pour chaque template
- [ ] Reply To configuré sur `{{reply_to}}`
- [ ] Templates testés dans le Playground
- [ ] Emails de test reçus

### Configuration Projet
- [ ] `.env` rempli avec les 4 variables
- [ ] Serveur redémarré après modification `.env`
- [ ] Console affiche "Initialisé avec succès"
- [ ] Formulaire Contact testé et email reçu
- [ ] Formulaire Devis testé et email reçu

---

## 🎉 Résultat final

Une fois tout configuré, vous aurez :

✅ Un système de contact fonctionnel
✅ Un système de devis multi-étapes
✅ Des emails formatés professionnellement
✅ Une validation robuste des formulaires
✅ Des logs détaillés pour le débogage
✅ Aucune erreur "Variables Corrupted"
✅ Possibilité de répondre directement depuis votre email

---

## 📞 Support

Si vous rencontrez des problèmes :

1. **Vérifier les logs console** : Tous les messages commencent par `[EmailJS]`
2. **Tester dans Playground** : Isoler le problème
3. **Vérifier .env** : Les variables sont bien chargées
4. **Documentation EmailJS** : [docs.emailjs.com](https://www.emailjs.com/docs/)

---

## 🚀 Prochaines étapes (optionnel)

Pour améliorer encore le système :

1. **Auto-reply** : Créer des templates de réponse automatique
2. **Multi-destinataires** : Envoyer à plusieurs adresses
3. **Analytics** : Tracker les conversions
4. **Attachments** : Permettre l'envoi de fichiers
5. **Multi-langue** : Templates en plusieurs langues
6. **Captcha** : Ajouter reCAPTCHA pour plus de sécurité

---

**Date de création** : 2025-11-13
**Version** : 1.0
**Status** : Production-ready ✅
