# Configuration EmailJS - Guide Complet

## 🔧 Configuration dans EmailJS Dashboard

### 1. Service Email

1. Allez sur [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Créez un service email (Gmail, Outlook, etc.)
3. Notez votre **Service ID**

### 2. Templates EmailJS

#### Template Contact (`TPL_CONTACT`)

**Nom du template** : `portfolio_contact`

**Subject** :
```
Nouveau message de {{name}} via Portfolio
```

**Content** (copiez exactement) :
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

**Reply To** :
```
{{reply_to}}
```

**Variables utilisées** :
- `name` - Nom du contact
- `email` - Email du contact
- `message` - Message envoyé
- `reply_to` - Email pour répondre
- `time` - Date et heure de l'envoi
- `lang` - Langue du site
- `source_page` - Page d'origine (optionnel)
- `tags` - Tags pour catégoriser (optionnel)

---

#### Template Devis (`TPL_QUOTE`)

**Nom du template** : `portfolio_quote`

**Subject** :
```
Nouvelle demande de devis de {{client_name}}
```

**Content** (copiez exactement) :
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

**Reply To** :
```
{{reply_to}}
```

**Variables utilisées** :
- `client_name` - Nom du client
- `client_email` - Email du client
- `client_phone` - Téléphone (optionnel)
- `client_company` - Entreprise (optionnel)
- `project_type` - Type de projet
- `project_description` - Description du projet
- `project_features` - Liste des fonctionnalités (optionnel)
- `project_technologies` - Liste des technologies (optionnel)
- `project_timeline` - Délai souhaité
- `project_budget` - Budget estimé
- `project_urgency` - Niveau d'urgence
- `needs_design` - Besoin de design (Oui/Non)
- `needs_hosting` - Besoin d'hébergement (Oui/Non)
- `needs_maintenance` - Besoin de maintenance (Oui/Non)
- `needs_training` - Besoin de formation (Oui/Non)
- `additional_info` - Informations supplémentaires (optionnel)
- `reply_to` - Email pour répondre

---

### 3. Configuration .env

Ajoutez ces variables dans votre fichier `.env` :

```env
VITE_EMAILJS_PUBLIC_KEY=votre_public_key
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TPL_CONTACT=portfolio_contact
VITE_EMAILJS_TPL_QUOTE=portfolio_quote
```

**Où trouver ces valeurs ?**
- `PUBLIC_KEY` : Dashboard > Account > API Keys > Public Key
- `SERVICE_ID` : Dashboard > Email Services > votre service
- `TPL_CONTACT` : Dashboard > Email Templates > template contact > Template ID
- `TPL_QUOTE` : Dashboard > Email Templates > template devis > Template ID

---

## 🧪 Test avec Playground

### Test Contact

Dans le Playground EmailJS, testez avec ce JSON :

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Ceci est un message de test pour vérifier que tout fonctionne correctement.",
  "reply_to": "john@example.com",
  "time": "13/11/2025 à 14:30",
  "lang": "fr",
  "source_page": "/#contact",
  "tags": "lead, portfolio"
}
```

### Test Devis

Dans le Playground EmailJS, testez avec ce JSON :

```json
{
  "client_name": "Marie Dupont",
  "client_email": "marie@example.com",
  "client_phone": "+33 6 12 34 56 78",
  "client_company": "TechCorp",
  "project_type": "Application web",
  "project_description": "Développement d'une plateforme SaaS pour la gestion de projets avec authentification, tableau de bord et API REST.",
  "project_features": "Authentification utilisateurs, Tableau de bord admin, API REST",
  "project_technologies": "React, Node.js, PostgreSQL, TypeScript",
  "project_timeline": "3-6 mois",
  "project_budget": "10 000€ - 20 000€",
  "project_urgency": "Moyenne",
  "needs_design": "Oui",
  "needs_hosting": "Oui",
  "needs_maintenance": "Oui",
  "needs_training": "Non",
  "additional_info": "Je souhaiterais également une version mobile de l'application.",
  "reply_to": "marie@example.com"
}
```

---

## 🔍 Résolution de l'erreur "Variables Corrupted"

### Causes communes :

1. **Variables manquantes** : Une variable est `undefined` ou `null`
   - ✅ **Solution** : Le service utilise maintenant `sanitizeString()` qui convertit tout en chaîne vide si null/undefined

2. **Valeurs non-string** : Envoyer des objets ou arrays directement
   - ✅ **Solution** : Les arrays sont convertis en string avec `arrayToString()`
   - ✅ **Solution** : Les booléens sont convertis avec `boolToYesNo()`

3. **Espaces ou caractères spéciaux** : Caractères qui cassent le format
   - ✅ **Solution** : Utilisation de `.trim()` sur toutes les valeurs

4. **Noms de variables différents** : Le code envoie `name` mais le template attend `client_name`
   - ✅ **Solution** : Les noms correspondent exactement maintenant

### Vérifications :

1. ✅ Tous les paramètres obligatoires sont vérifiés avant envoi
2. ✅ Toutes les valeurs sont sanitisées (trim, conversion string)
3. ✅ Les arrays sont convertis en string avec virgules
4. ✅ Les booléens sont convertis en "Oui"/"Non"
5. ✅ Les valeurs optionnelles sont converties en string vide si absentes
6. ✅ Console.log avant chaque envoi pour déboguer

---

## 🎯 Test dans la Console

Ouvrez la console du navigateur et testez :

### Test Contact

```javascript
// Test formulaire contact
const testContact = {
  name: "Test User",
  email: "test@example.com",
  message: "Ceci est un message de test"
};

// Vérifier les variables dans la console
console.log('Test Contact:', testContact);
```

### Test Devis

```javascript
// Test formulaire devis
const testQuote = {
  name: "Test Client",
  email: "client@example.com",
  phone: "+33 6 12 34 56 78",
  company: "Test Corp",
  projectType: "Application web",
  projectDescription: "Description détaillée du projet de test",
  features: ["Auth", "Dashboard", "API"],
  technologies: ["React", "Node.js"],
  timeline: "3-6 mois",
  budget: "10 000€ - 20 000€",
  urgency: "Moyenne",
  hasDesign: true,
  needsHosting: true,
  needsMaintenance: false,
  needsTraining: false,
  additionalInfo: "Info supplémentaire"
};

// Vérifier les variables dans la console
console.log('Test Quote:', testQuote);
```

---

## 📋 Checklist finale

### Dans EmailJS Dashboard :

- [ ] Service email configuré et actif
- [ ] Template Contact créé avec toutes les variables
- [ ] Template Devis créé avec toutes les variables
- [ ] Subject configuré pour chaque template
- [ ] Reply To configuré sur `{{reply_to}}`
- [ ] Templates testés dans le Playground

### Dans le projet :

- [ ] Variables d'environnement ajoutées dans `.env`
- [ ] `npm run dev` redémarré après modification du `.env`
- [ ] `initEmailJS()` appelé au chargement de l'app
- [ ] Console.log affiche "Initialisé avec succès"
- [ ] Formulaires testés dans le navigateur

### Tests finaux :

- [ ] Formulaire Contact : remplir et envoyer
- [ ] Vérifier la console pour les logs
- [ ] Vérifier la réception de l'email
- [ ] Formulaire Devis : remplir toutes les étapes
- [ ] Vérifier la console pour les logs
- [ ] Vérifier la réception de l'email avec toutes les données

---

## 🐛 Débogage

Si ça ne fonctionne toujours pas :

1. **Vérifier la console** : Les logs `[EmailJS]` doivent être visibles
2. **Vérifier les variables d'env** : `console.log(import.meta.env)` doit afficher vos clés
3. **Vérifier l'initialisation** : Doit afficher "Initialisé avec succès"
4. **Vérifier les paramètres** : Les logs avant envoi montrent les données exactes
5. **Tester dans Playground** : Copier les paramètres de la console et tester directement

### Erreurs fréquentes :

- **"Public Key required"** : `.env` mal configuré ou dev server non redémarré
- **"Template not found"** : Template ID incorrect dans `.env`
- **"Variables corrupted"** : Une valeur contient un objet au lieu d'une string
- **"Service not found"** : Service ID incorrect dans `.env`

---

## ✅ Résultat attendu

Quand tout fonctionne :

1. Console : `[EmailJS] Initialisé avec succès`
2. Après clic "Envoyer" : `[EmailJS Contact] Envoi avec les paramètres: {...}`
3. Après succès : `[EmailJS Contact] Succès: {...}`
4. Message : "Message envoyé avec succès"
5. Email reçu dans votre boîte avec toutes les informations formatées
