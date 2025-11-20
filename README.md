# Portfolio Henry Teran Corrales

Portfolio professionnel de développeur Full-Stack  avec système d'envoi d'emails intégré.

## Configuration EmailJS

Pour activer l'envoi d'emails, vous devez configurer EmailJS :

### 1. Créer un compte EmailJS
- Allez sur [EmailJS](https://www.emailjs.com/)
- Créez un compte gratuit

### 2. Configurer le service email
- Dans le dashboard EmailJS, allez dans "Email Services"
- Ajoutez votre service email (Gmail, Outlook, etc.)
- Notez votre **Service ID**

### 3. Créer les templates d'email

#### Template pour contact simple (template_contact)
```
Nouveau message de contact depuis le portfolio

De: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Répondre à: {{reply_to}}
```

#### Template pour demande de devis (template_quote)
```
Nouvelle demande de devis depuis le portfolio

=== INFORMATIONS CLIENT ===
Nom: {{client_name}}
Email: {{client_email}}
Téléphone: {{client_phone}}
Entreprise: {{client_company}}

=== PROJET ===
Type: {{project_type}}
Description: {{project_description}}
Fonctionnalités: {{project_features}}
Technologies: {{project_technologies}}

=== PLANNING ===
Délai: {{project_timeline}}
Budget: {{project_budget}}
Urgence: {{project_urgency}}

=== SERVICES SUPPLÉMENTAIRES ===
Design: {{needs_design}}
Hébergement: {{needs_hosting}}
Maintenance: {{needs_maintenance}}
Formation: {{needs_training}}

=== INFORMATIONS SUPPLÉMENTAIRES ===
{{additional_info}}

---
Répondre à: {{reply_to}}
```

### 4. Configurer les clés dans le code

Dans `src/services/emailService.ts`, remplacez :
- `EMAILJS_SERVICE_ID` par votre Service ID
- `EMAILJS_PUBLIC_KEY` par votre clé publique EmailJS

### 5. Tester l'envoi d'emails

Une fois configuré, vous pouvez tester :
- Le formulaire de contact simple
- Le formulaire de demande de devis détaillé

## Fonctionnalités

### Formulaire de contact
- Envoi direct d'emails vers teranhenryc@gmail.com
- Validation des champs
- Messages de confirmation/erreur

### Formulaire de devis
- Processus en 4 étapes
- Collecte d'informations détaillées :
  - Informations client
  - Détails du projet
  - Planning et budget
  - Services supplémentaires
- Résumé avant envoi
- Envoi automatique vers teranhenryc@gmail.com

## Installation

```bash
npm install
npm run dev
```

## Technologies utilisées

- React + TypeScript
- Tailwind CSS
- EmailJS pour l'envoi d'emails
- Lucide React pour les icônes