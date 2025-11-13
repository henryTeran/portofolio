# ⚡ Quick Start EmailJS - 5 Minutes

## 🎯 Ce qu'il faut faire (dans l'ordre)

### 1. EmailJS Dashboard (5 min)

#### Service Email
```
Dashboard > Email Services > Add Service
→ Choisir Gmail/Outlook
→ Connecter votre compte
→ Copier le Service ID
```

#### Template Contact
```
Dashboard > Email Templates > Create New Template
Nom: portfolio_contact

Subject:
Nouveau message de {{name}} via Portfolio

Content:
[Copier depuis EMAILJS_CONFIG.md]

Reply To:
{{reply_to}}

→ Save et copier Template ID
```

#### Template Devis
```
Dashboard > Email Templates > Create New Template
Nom: portfolio_quote

Subject:
Nouvelle demande de devis de {{client_name}}

Content:
[Copier depuis EMAILJS_CONFIG.md]

Reply To:
{{reply_to}}

→ Save et copier Template ID
```

#### Public Key
```
Dashboard > Account > General > API Keys
→ Copier Public Key
```

---

### 2. Fichier .env (1 min)

Ouvrir `.env` et remplacer :

```env
VITE_EMAILJS_PUBLIC_KEY=votre_public_key
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TPL_CONTACT=template_id_contact
VITE_EMAILJS_TPL_QUOTE=template_id_quote
```

⚠️ **Utiliser les IDs exacts générés par EmailJS**

---

### 3. Redémarrer le serveur (30 sec)

```bash
Ctrl+C
npm run dev
```

---

### 4. Vérifier (30 sec)

Ouvrir Console (F12) :

✅ Doit afficher : `[EmailJS] Initialisé avec succès`
❌ Si erreur : Vérifier .env et redémarrer

---

### 5. Tester (2 min)

#### Contact
1. Remplir formulaire
2. Envoyer
3. Vérifier console : `[EmailJS Contact] Succès`
4. Vérifier email reçu

#### Devis
1. Cliquer "Demander un devis"
2. Remplir 4 étapes
3. Envoyer
4. Vérifier console : `[EmailJS Quote] Succès`
5. Vérifier email reçu

---

## �� Résolution rapide des problèmes

| Problème | Solution |
|----------|----------|
| `PUBLIC_KEY manquant` | Vérifier .env et redémarrer serveur |
| `Template not found` | Vérifier Template ID dans .env |
| `Variables corrupted` | Ne devrait plus arriver (tout est sanitisé) |
| Email pas reçu | Vérifier Spams / Vérifier Service connecté |
| Rien dans la console | Vérifier que initEmailJS() est appelé |

---

## 📋 Checklist ultra-rapide

- [ ] Service créé dans EmailJS
- [ ] 2 Templates créés (Contact + Devis)
- [ ] .env rempli avec 4 variables
- [ ] Serveur redémarré
- [ ] Console affiche "Initialisé avec succès"
- [ ] Email de test reçu

---

## 🎯 Templates prêts à copier

### Subject Contact
```
Nouveau message de {{name}} via Portfolio
```

### Subject Devis
```
Nouvelle demande de devis de {{client_name}}
```

### Reply To (les 2 templates)
```
{{reply_to}}
```

### Content complet → Voir `EMAILJS_CONFIG.md`

---

## ⚡ Test en 30 secondes

Console du navigateur :

```javascript
// Vérifier config
console.log({
  pk: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  sid: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  tpl_c: import.meta.env.VITE_EMAILJS_TPL_CONTACT,
  tpl_q: import.meta.env.VITE_EMAILJS_TPL_QUOTE
});
// Tout doit être défini (pas undefined)
```

---

## 🚀 C'est tout !

Si vous voyez `[EmailJS Contact] Succès` dans la console ET que vous recevez l'email, c'est terminé ! ✅

Pour plus de détails → Voir `SOLUTION_EMAILJS.md`
