# 👨‍💻 Henry Teran – Full-Stack Developer Portfolio

<div align="center">

[![React](https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5%2B-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#)

**Modern, responsive portfolio showcasing full-stack development expertise with integrated email solutions.**

[🌐 Live Demo](#) • [📧 Contact](#contact) • [🎯 Features](#features)

</div>

---

## 🎯 Features

### 📧 Smart Email System
- ✅ **Contact Form** – Direct email integration with validation
- ✅ **Quote Generator** – 4-step wizard for detailed project quotes
- ✅ **EmailJS Integration** – Zero backend required
- ✅ **Auto-responses** – Instant confirmation messages
- ✅ **Error Handling** – Robust error management & logging

### 🌍 Internationalization (i18n)
- 🇫🇷 Français
- 🇬🇧 English  
- 🇪🇸 Español

### 🎨 UI/UX
- ✨ **Dark/Light Mode** – Seamless theme switching
- 📱 **Fully Responsive** – Mobile-first design
- 🎬 **Smooth Animations** – Framer Motion powered
- ♿ **Accessible** – WCAG compliant
- 🚀 **Performance Optimized** – Instant loading

### 🛠️ Developer Tools
- 🔒 TypeScript for type safety
- 🎯 ESLint & code quality
- 📊 Git-based workflow
- 🔄 Hot module replacement (HMR)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ 
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/henryTeran/portofolio.git
cd portofolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ⚙️ EmailJS Configuration

Pour activer l'envoi d'emails, vous devez configurer EmailJS :

### Step 1: Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### Step 2: Set Up Email Service
1. Navigate to **Email Services** in dashboard
2. Add your email provider (Gmail, Outlook, etc.)
3. Note your **Service ID**

### Step 3: Create Email Templates

#### Template: Contact Form (`template_contact`)
```
New contact message from portfolio

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Reply to: {{reply_to}}
Sent at: {{time}}
Language: {{lang}}
```

#### Template: Quote Request (`template_quote`)
```
New quote request from portfolio

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{client_name}}
Email: {{client_email}}
Phone: {{client_phone}}
Company: {{client_company}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type: {{project_type}}
Description: {{project_description}}
Features: {{project_features}}
Technologies: {{project_technologies}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIMELINE & BUDGET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Timeline: {{project_timeline}}
Budget: {{project_budget}}
Urgency: {{project_urgency}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Design: {{needs_design}}
Hosting: {{needs_hosting}}
Maintenance: {{needs_maintenance}}
Training: {{needs_training}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{additional_info}}

---
Reply to: {{reply_to}}
Sent: {{time}} | Language: {{lang}}
```

### Step 4: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_TPL_CONTACT=template_contact
VITE_EMAILJS_TPL_QUOTE=template_quote
```

⚠️ **Important:** Add `.env.local` to `.gitignore` to keep secrets safe!

### Step 5: Verify Configuration

1. Start the dev server: `npm run dev`
2. Open the portfolio in browser
3. Test the contact form
4. Test the quote generator (4-step wizard)
5. Check your email inbox for received messages

---

## 📁 Project Structure

```
portofolio/
├── src/
│   ├── components/        # React components (Hero, About, Projects, etc.)
│   ├── services/          # EmailJS service & email utilities
│   ├── locales/           # i18n translations (FR, EN, ES)
│   │   ├── fr/common.json
│   │   ├── en/common.json
│   │   └── es/common.json
│   ├── styles/            # Global styles & CSS variables
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── vite-env.d.ts      # Vite environment types
├── public/                # Static assets (logos, favicons)
├── index.html             # HTML entry point
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies & scripts
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling & utilities |
| **Vite** | Build tool & dev server |
| **Framer Motion** | Animations & transitions |
| **i18next** | Internationalization |
| **EmailJS** | Email delivery service |
| **Lucide React** | Icon library |
| **ESLint** | Code linting |

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [EmailJS Docs](https://www.emailjs.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion)
- [i18next Guide](https://www.i18next.com)

---

## 🚀 Deployment

### Deploy to GitHub Pages

```bash
# Build for production
npm run build

# Deploy (requires git push to main branch)
git add .
git commit -m "Deploy portfolio"
git push origin main
```

### Deploy to Other Platforms

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build & deploy
npm run build
netlify deploy --prod --dir=dist
```

---

## 📊 Performance

- ⚡ **First Contentful Paint (FCP):** < 1s
- 🎯 **Lighthouse Score:** 95+
- 📱 **Mobile Optimized:** 100%
- 🔒 **Security Grade:** A+

---

## 🔒 Security

- ✅ Environment variables kept secure
- ✅ Input validation on all forms
- ✅ EmailJS handles server-side delivery
- ✅ No sensitive data stored locally
- ✅ HTTPS enforced on production

---

## 📝 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
npm run type-check # Check TypeScript types
```

---

## 🤝 Contributing

Found a bug or have a feature request? Feel free to:
1. [Open an issue](https://github.com/henryTeran/portofolio/issues)
2. [Submit a pull request](https://github.com/henryTeran/portofolio/pulls)

---

## 📄 License

This project is licensed under the **MIT License** – see [LICENSE](LICENSE) file for details.

---

## 📧 Contact

- **Email:** [teranhenryc@gmail.com](mailto:teranhenryc@gmail.com)
- **LinkedIn:** [Henry Teran](https://linkedin.com/in/henry-teran)
- **GitHub:** [@henryTeran](https://github.com/henryTeran)
- **Portfolio:** [henryteran.github.io/portofolio](https://henryteran.github.io/portofolio)

---

<div align="center">

**Made with ❤️ by Henry Teran**

[⬆ Back to top](#-henry-teran--full-stack-developer-portfolio)

</div>