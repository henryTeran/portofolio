# 🧪 Test EmailJS - Guide Rapide

## ⚡ Tests rapides à faire

### 1️⃣ Vérifier la configuration (.env)

Ouvrir la console du navigateur et taper :

```javascript
console.log({
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  tplContact: import.meta.env.VITE_EMAILJS_TPL_CONTACT,
  tplQuote: import.meta.env.VITE_EMAILJS_TPL_QUOTE
});
```

**Résultat attendu** : Toutes les valeurs doivent être affichées (pas undefined)

---

### 2️⃣ Vérifier l'initialisation

La console doit afficher au chargement :

```
[EmailJS] Initialisé avec succès
```

Si vous voyez : `[EmailJS] PUBLIC_KEY manquant dans .env`
→ Le fichier .env n'est pas configuré ou le serveur n'a pas été redémarré

---

### 3️⃣ Test formulaire Contact

1. Remplir le formulaire contact avec :
   - Nom : "Test User"
   - Email : "test@example.com"
   - Message : "Ceci est un test"

2. Cliquer sur "Envoyer"

3. **Dans la console, vous devez voir** :

```javascript
[EmailJS Contact] Envoi avec les paramètres: {
  name: "Test User",
  email: "test@example.com",
  message: "Ceci est un test",
  reply_to: "test@example.com",
  time: "13/11/2025, 14:30",
  lang: "fr",
  source_page: "/#contact",
  tags: "lead, portfolio"
}
```

4. Puis :

```
[EmailJS Contact] Succès: { status: 200, text: "OK" }
```

5. Message de succès affiché : "Message envoyé avec succès"

6. **Vérifier votre boîte email** : Vous devez recevoir l'email avec toutes les infos

---

### 4️⃣ Test formulaire Devis

1. Cliquer sur "Demander un devis"
2. Remplir toutes les étapes :
   - **Étape 1** : Nom, Email, Téléphone (optionnel), Entreprise (optionnel)
   - **Étape 2** : Type de projet, Description, Fonctionnalités, Technologies
   - **Étape 3** : Délai, Budget, Urgence, Services supplémentaires
   - **Étape 4** : Informations supplémentaires

3. Cliquer sur "Envoyer la demande"

4. **Dans la console, vous devez voir** :

```javascript
[EmailJS Quote] Envoi avec les paramètres: {
  client_name: "...",
  client_email: "...",
  client_phone: "...",
  client_company: "...",
  project_type: "...",
  project_description: "...",
  project_features: "Auth, Dashboard, API",
  project_technologies: "React, Node.js, TypeScript",
  project_timeline: "3-6 mois",
  project_budget: "10 000€ - 20 000€",
  project_urgency: "Moyenne",
  needs_design: "Oui",
  needs_hosting: "Oui",
  needs_maintenance: "Non",
  needs_training: "Non",
  additional_info: "...",
  reply_to: "...",
  time: "13/11/2025, 14:30",
  lang: "fr"
}
```

5. Puis :

```
[EmailJS Quote] Succès: { status: 200, text: "OK" }
```

6. Message de succès : "Demande envoyée avec succès ! Je vous recontacterai sous 24h."

7. **Vérifier votre boîte email** : Vous devez recevoir l'email avec toutes les données du devis

---

## 🔴 Erreurs possibles et solutions

### Erreur : "Public Key required"

**Cause** : Les variables d'environnement ne sont pas chargées

**Solution** :
1. Vérifier que `.env` contient bien les 4 variables
2. Redémarrer le serveur de développement : `Ctrl+C` puis `npm run dev`
3. Vider le cache du navigateur (Ctrl+Shift+R)

---

### Erreur : "Template not found"

**Cause** : Le Template ID est incorrect

**Solution** :
1. Aller dans EmailJS Dashboard > Email Templates
2. Copier le "Template ID" exact (sensible à la casse)
3. Mettre à jour `.env` avec les bons IDs
4. Redémarrer le serveur

---

### Erreur : "Variables corrupted"

**Cause** : Une variable contient une valeur invalide

**Solution** : Cette erreur ne devrait PLUS se produire car :
- ✅ Toutes les valeurs sont converties en string
- ✅ Les arrays sont convertis avec `join(', ')`
- ✅ Les booléens sont convertis en "Oui"/"Non"
- ✅ Les valeurs null/undefined sont converties en string vide

**Si l'erreur persiste** :
1. Ouvrir la console
2. Copier les paramètres affichés dans `[EmailJS] Envoi avec les paramètres:`
3. Aller dans EmailJS Dashboard > Template > Test in Playground
4. Coller les paramètres
5. Cliquer "Test"
6. Voir quelle variable pose problème

---

### Erreur : "Service not found"

**Cause** : Le Service ID est incorrect

**Solution** :
1. Aller dans EmailJS Dashboard > Email Services
2. Copier le "Service ID" exact
3. Mettre à jour `.env`
4. Redémarrer le serveur

---

### Message d'erreur : "Données du formulaire incomplètes"

**Cause** : Un champ obligatoire est vide

**Solution** : C'est normal, c'est la validation qui fonctionne !
- Pour Contact : Nom, Email, Message sont obligatoires (min 2 caractères pour le nom, min 10 pour le message)
- Pour Devis : Nom, Email, Type de projet, Description (min 20 caractères), Délai, Budget sont obligatoires

---

## ✅ Checklist de vérification

Avant de tester, assurez-vous que :

- [ ] Les 4 variables sont dans `.env`
- [ ] Le serveur a été redémarré après modification du `.env`
- [ ] Les 2 templates sont créés dans EmailJS Dashboard
- [ ] Les Subject et Reply To sont configurés dans les templates
- [ ] Les templates ont été testés dans le Playground
- [ ] La console affiche `[EmailJS] Initialisé avec succès`

---

## 🎯 JSON pour Playground EmailJS

### Template Contact

```json
{
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "message": "Bonjour, je suis intéressé par vos services de développement web. Pourriez-vous me contacter pour discuter d'un projet ?",
  "reply_to": "jean.dupont@example.com",
  "time": "13/11/2025, 15:45",
  "lang": "fr",
  "source_page": "/#contact",
  "tags": "lead, portfolio"
}
```

### Template Devis

```json
{
  "client_name": "Sophie Martin",
  "client_email": "sophie.martin@example.com",
  "client_phone": "+33 6 78 90 12 34",
  "client_company": "Innovation Tech",
  "project_type": "Application web",
  "project_description": "Nous souhaitons développer une plateforme SaaS pour la gestion de projets avec authentification, tableau de bord dynamique, système de notifications et API REST complète pour nos clients.",
  "project_features": "Authentification utilisateurs, Tableau de bord admin, Notifications push, API REST",
  "project_technologies": "React, Node.js, PostgreSQL, TypeScript",
  "project_timeline": "3-6 mois",
  "project_budget": "10 000€ - 20 000€",
  "project_urgency": "Moyenne",
  "needs_design": "Oui",
  "needs_hosting": "Oui",
  "needs_maintenance": "Oui",
  "needs_training": "Non",
  "additional_info": "Le projet doit également inclure une version mobile responsive et un système de facturation automatique. Nous avons déjà une charte graphique.",
  "reply_to": "sophie.martin@example.com"
}
```

---

## 💡 Astuce : Test ultra-rapide

Copier-coller dans la console du navigateur :

```javascript
// Test Contact rapide
const testContact = {
  name: "Test User",
  email: "test@example.com",
  message: "Message de test pour vérifier le système"
};

// Voir les paramètres qui seront envoyés
console.log("Test données contact:", testContact);
```

Puis remplir le formulaire avec ces valeurs et envoyer.

---

## 📧 Email de test reçu ?

### Pour Contact, vous devriez recevoir :

```
Subject: Nouveau message de Test User via Portfolio

📨 Nouveau message depuis le portfolio
Reçu le 13/11/2025, 14:30 · Langue: fr · Page: /#contact
👤

Test User
Email : test@example.com
Message
Message de test pour vérifier le système

Tags
lead, portfolio

Répondre à : test@example.com
```

### Pour Devis, vous devriez recevoir :

```
Subject: Nouvelle demande de devis de Sophie Martin

🧾 Nouvelle demande de devis depuis le portfolio
👤 Informations client
Nom: Sophie Martin
Email: sophie.martin@example.com
Téléphone: +33 6 78 90 12 34
Entreprise: Innovation Tech

📌 Projet
Type: Application web
Description:

Nous souhaitons développer une plateforme SaaS...

Fonctionnalités: Authentification utilisateurs, Tableau de bord admin...
Technologies: React, Node.js, PostgreSQL, TypeScript

⏱️ Planning
Délai: 3-6 mois
Budget: 10 000€ - 20 000€
Urgence: Moyenne

🧩 Services supplémentaires
Design: Oui
Hébergement: Oui
Maintenance: Oui
Formation: Non

📝 Informations supplémentaires
Le projet doit également inclure...

Répondre à : sophie.martin@example.com
```

---

## 🚀 Tout fonctionne ?

Si vous recevez les emails correctement, félicitations ! 🎉

Votre système EmailJS est opérationnel et robuste. Vous pouvez maintenant :
- Recevoir des messages de contact
- Recevoir des demandes de devis détaillées
- Répondre directement depuis votre boîte email
