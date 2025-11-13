# 🎛️ Guide Configuration EmailJS Dashboard

## 📍 Navigation dans le Dashboard

```
https://dashboard.emailjs.com/
```

### Menu principal
```
├── Email Services      → Configurer Gmail, Outlook, etc.
├── Email Templates     → Créer les templates Contact & Devis
├── Email History       → Voir les emails envoyés
├── Account            → Récupérer la Public Key
└── Usage              → Vérifier le quota (200/mois en free)
```

---

## 🔧 1. Configurer le Service Email

### Étapes détaillées

1. **Aller dans "Email Services"**
   ```
   Dashboard → Email Services → Add Service
   ```

2. **Choisir votre provider**
   - Gmail (recommandé)
   - Outlook/Hotmail
   - Yahoo
   - Autre

3. **Pour Gmail**
   - Cliquer "Connect Account"
   - Se connecter avec votre compte Google
   - Autoriser EmailJS
   - Attendre la confirmation "Connected"

4. **Récupérer le Service ID**
   ```
   Le Service ID s'affiche en haut : service_xxxxxxx
   ```

5. **Tester la connexion**
   - Cliquer "Check Connection"
   - Status doit être "Connected"

### Capture du Service ID
```
╔════════════════════════════════════╗
║ Gmail                              ║
║ service_abc123xyz                  ║ ← Copier cette valeur
║ Status: Connected ✓                ║
║ [Check Connection] [Settings]      ║
╚════════════════════════════════════╝
```

---

## 📧 2. Créer le Template Contact

### Étapes détaillées

1. **Aller dans "Email Templates"**
   ```
   Dashboard → Email Templates → Create New Template
   ```

2. **Configuration de base**
   ```
   Template Name: Portfolio Contact
   Template ID: template_xxxxxxx ← Généré automatiquement
   ```

3. **Configurer le Subject**
   ```
   ┌─────────────────────────────────────────┐
   │ Subject                                 │
   ├─────────────────────────────────────────┤
   │ Nouveau message de {{name}} via Portfolio│
   └─────────────────────────────────────────┘
   ```

4. **Configurer le Content**

   Copier-coller exactement ceci :

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

5. **Configurer Reply To**
   ```
   ┌─────────────────────┐
   │ Reply To            │
   ├─────────────────────┤
   │ {{reply_to}}        │
   └─────────────────────┘
   ```

6. **Configurer To Email** (votre email)
   ```
   ┌──────────────────────────────┐
   │ To Email                     │
   ├──────────────────────────────┤
   │ votre-email@example.com      │
   └──────────────────────────────┘
   ```

7. **Sauvegarder**
   - Cliquer "Save"
   - Copier le Template ID : `template_xxxxxxx`

### Test dans le Playground

8. **Tester le template**
   - Cliquer "Test it"
   - Mode : "Manual input"
   - Copier ce JSON :

   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "message": "Ceci est un message de test",
     "reply_to": "john@example.com",
     "time": "13/11/2025, 14:30",
     "lang": "fr",
     "source_page": "/#contact",
     "tags": "lead, portfolio"
   }
   ```

   - Cliquer "Test"
   - Vérifier votre boîte email

### Aperçu de l'interface
```
╔═══════════════════════════════════════════════╗
║ Email Template Editor                         ║
╠═══════════════════════════════════════════════╣
║ Template ID: template_abc123                  ║
║                                               ║
║ [Subject]                                     ║
║ Nouveau message de {{name}} via Portfolio    ║
║                                               ║
║ [Content]                                     ║
║ 📨 Nouveau message depuis le portfolio       ║
║ Reçu le {{time}} · Langue: {{lang}}...       ║
║                                               ║
║ [Settings]                                    ║
║ To Email: votre-email@example.com            ║
║ Reply To: {{reply_to}}                       ║
║                                               ║
║ [Save] [Test it] [Preview]                   ║
╚═══════════════════════════════════════════════╝
```

---

## 📋 3. Créer le Template Devis

### Étapes détaillées

1. **Créer un nouveau template**
   ```
   Dashboard → Email Templates → Create New Template
   ```

2. **Configuration de base**
   ```
   Template Name: Portfolio Quote
   Template ID: template_xxxxxxx ← Généré automatiquement
   ```

3. **Configurer le Subject**
   ```
   ┌───────────────────────────────────────────────┐
   │ Subject                                       │
   ├───────────────────────────────────────────────┤
   │ Nouvelle demande de devis de {{client_name}} │
   └───────────────────────────────────────────────┘
   ```

4. **Configurer le Content**

   Copier-coller exactement ceci :

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

5. **Configurer Reply To**
   ```
   ┌─────────────────────┐
   │ Reply To            │
   ├─────────────────────┤
   │ {{reply_to}}        │
   └─────────────────────┘
   ```

6. **Configurer To Email**
   ```
   ┌──────────────────────────────┐
   │ To Email                     │
   ├──────────────────────────────┤
   │ votre-email@example.com      │
   └──────────────────────────────┘
   ```

7. **Sauvegarder**
   - Cliquer "Save"
   - Copier le Template ID : `template_xxxxxxx`

### Test dans le Playground

8. **Tester le template**
   - Cliquer "Test it"
   - Mode : "Manual input"
   - Copier ce JSON :

   ```json
   {
     "client_name": "Sophie Martin",
     "client_email": "sophie@example.com",
     "client_phone": "+33 6 12 34 56 78",
     "client_company": "Tech Corp",
     "project_type": "Application web",
     "project_description": "Développement d'une plateforme SaaS complète avec authentification, dashboard et API",
     "project_features": "Auth, Dashboard, Notifications, API REST",
     "project_technologies": "React, Node.js, PostgreSQL, TypeScript",
     "project_timeline": "3-6 mois",
     "project_budget": "10 000€ - 20 000€",
     "project_urgency": "Moyenne",
     "needs_design": "Oui",
     "needs_hosting": "Oui",
     "needs_maintenance": "Non",
     "needs_training": "Non",
     "additional_info": "Projet urgent avec deadline fixe pour mars 2026",
     "reply_to": "sophie@example.com"
   }
   ```

   - Cliquer "Test"
   - Vérifier votre boîte email

---

## 🔑 4. Récupérer la Public Key

### Étapes détaillées

1. **Aller dans Account**
   ```
   Dashboard → Account → General
   ```

2. **Section API Keys**
   ```
   ╔════════════════════════════════════╗
   ║ API Keys                           ║
   ╠════════════════════════════════════╣
   ║ Public Key                         ║
   ║ abc123xyz456def789                 ║ ← Copier cette valeur
   ║ [Show] [Copy] [Regenerate]         ║
   ╚════════════════════════════════════╝
   ```

3. **Copier la Public Key**
   - Cliquer "Show" si masquée
   - Cliquer "Copy"
   - Coller dans `.env`

---

## 📊 5. Vérifier les quotas

### Voir l'utilisation

1. **Aller dans Usage**
   ```
   Dashboard → Usage
   ```

2. **Informations affichées**
   ```
   ╔════════════════════════════════════╗
   ║ Monthly Usage                      ║
   ╠════════════════════════════════════╣
   ║ Emails sent: 15 / 200             ║
   ║ █████░░░░░░░░░░░░░░░░░░░░ 7.5%    ║
   ║                                    ║
   ║ Resets on: December 1, 2025       ║
   ╚════════════════════════════════════╝
   ```

### Limites du plan Free
- ✅ 200 emails/mois
- ✅ 2 services email
- ✅ Illimité templates
- ❌ Pas d'auto-reply
- ❌ Pas de priorité support

---

## 📜 6. Historique des emails

### Voir les emails envoyés

1. **Aller dans Email History**
   ```
   Dashboard → Email History
   ```

2. **Informations affichées**
   ```
   ╔════════════════════════════════════════════════╗
   ║ Date       │ Template        │ Status │ To    ║
   ╠════════════════════════════════════════════════╣
   ║ 13/11 14:30│ portfolio_quote │ Sent ✓│ you   ║
   ║ 13/11 14:25│ portfolio_contact│ Sent ✓│ you   ║
   ║ 13/11 14:20│ portfolio_contact│ Failed│ -     ║
   ╚════════════════════════════════════════════════╝
   ```

3. **Voir les détails**
   - Cliquer sur une ligne
   - Voir les variables envoyées
   - Voir les erreurs éventuelles

---

## ✅ Checklist Dashboard

### Service Email
- [ ] Service créé et connecté
- [ ] Connection status : Connected
- [ ] Service ID copié

### Template Contact
- [ ] Template créé
- [ ] Subject configuré avec {{name}}
- [ ] Content copié depuis le guide
- [ ] Reply To configuré avec {{reply_to}}
- [ ] To Email configuré (votre email)
- [ ] Template ID copié
- [ ] Test dans Playground réussi
- [ ] Email de test reçu

### Template Devis
- [ ] Template créé
- [ ] Subject configuré avec {{client_name}}
- [ ] Content copié depuis le guide
- [ ] Reply To configuré avec {{reply_to}}
- [ ] To Email configuré (votre email)
- [ ] Template ID copié
- [ ] Test dans Playground réussi
- [ ] Email de test reçu

### Configuration générale
- [ ] Public Key copiée
- [ ] Quotas vérifiés (< 200 emails)
- [ ] Tous les IDs notés pour .env

---

## 🎯 Récapitulatif des valeurs à copier

À la fin de la configuration Dashboard, vous devez avoir :

```
✓ Service ID:      service_xxxxxxx
✓ Template Contact: template_xxxxxxx
✓ Template Devis:   template_xxxxxxx
✓ Public Key:       abc123xyz456def789
```

Ces 4 valeurs vont dans le fichier `.env` du projet.

---

## 🔍 Debugging dans le Dashboard

### Email pas envoyé ?

1. **Vérifier Email History**
   - Status = "Failed" ?
   - Cliquer pour voir l'erreur

2. **Erreurs courantes**
   - "Template not found" → Template ID incorrect
   - "Service not found" → Service ID incorrect
   - "Variables corrupted" → Une variable est invalide
   - "Quota exceeded" → Plus de 200 emails ce mois

3. **Solution**
   - Retester dans Playground avec les variables exactes
   - Vérifier que toutes les variables du template sont envoyées
   - Vérifier que les valeurs sont des strings

---

## 💡 Astuces Dashboard

### 1. Dupliquer un template
```
Template → ... menu → Duplicate
→ Gain de temps pour créer des variantes
```

### 2. Exporter les templates
```
Template → ... menu → Export
→ Backup de vos templates
```

### 3. Variables dynamiques dans To Email
```
Vous pouvez aussi mettre {{email}} dans To Email
pour envoyer à l'utilisateur directement
```

### 4. Mode Preview
```
Template → Preview
→ Voir le rendu final avec des données de test
```

---

## 📱 Application mobile EmailJS

EmailJS a aussi une app mobile pour :
- Voir les emails envoyés
- Vérifier les quotas
- Recevoir des notifications

Disponible sur iOS et Android.

---

## 🆘 Support EmailJS

### En cas de problème Dashboard

1. **Documentation officielle**
   ```
   https://www.emailjs.com/docs/
   ```

2. **Support**
   ```
   Dashboard → Help → Contact Support
   ```

3. **FAQ**
   ```
   https://www.emailjs.com/docs/faq/
   ```

---

**Dernière mise à jour** : 2025-11-13
**Version guide** : 1.0
**Pour EmailJS** : v4.x
