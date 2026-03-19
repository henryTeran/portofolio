# 👨‍💻 Henry Teran – Full-Stack Developer Portfolio

<a id="top"></a>

<div align="center">

[![React](https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5%2B-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Live-Portfolio-blue?style=flat-square)](https://henryteran.com)

**Modern, responsive full-stack portfolio showcasing expertise in React, TypeScript, and modern web development with integrated email solutions and multi-language support.**

[🌐 **Live Portfolio**](https://henryteran.com) • [📧 **Contact**](#-contact) • [🚀 **Quick Start**](#-quick-start)

</div>

---

## ✨ Features

### 📧 Smart Email System
- **Contact Form** – Direct email delivery with validation and error handling
- **Quote Generator** – 4-step wizard for detailed project inquiries
- **EmailJS Integration** – Zero backend infrastructure required
- **Auto-responses** – Instant confirmation messages to clients
- **Template Variables** – Corrupted template prevention with string normalization
- **Multilingual Support** – Email responses adapt to selected language

### 🌍 Internationalization (i18n)
- **Three Languages:** 🇫🇷 Français, 🇬🇧 English, 🇪🇸 Español
- **Single Landing by Language** – `/fr`, `/en`, `/es`
- **Hash Navigation** – sections navigated with `/:lang#about`, `/:lang#projects`, `/:lang#services`, `/:lang#contact`
- **Dynamic Switching** – Instant language changes while preserving current route context
- **Complete Localization** – All UI text, forms, and templates translated
- **Context-Aware** – Email language matches user's selected language

### 🔎 SEO Architecture
- **Canonical URLs** – One canonical URL per language landing (`/fr`, `/en`, `/es`)
- **`hreflang` Tags** – Runtime `fr`, `en`, `es` + `x-default` aligned with language landings
- **Dynamic Metadata** – Per-page/per-language title and description
- **Structured Data** – JSON-LD `Person` profile for portfolio indexing
- **Indexable Pages** – `robots` meta configured to `index,follow`

### 🎨 User Interface & Experience
- ✨ **Dark/Light Mode** – Seamless theme switching with persistent storage
- 📱 **Fully Responsive** – Mobile-first design with optimized mobile layouts
- 🎬 **Smooth Animations** – Framer Motion powered transitions and interactions
- ♿ **Accessible** – WCAG 2.1 compliant with keyboard navigation
- 🚀 **Performance Optimized** – Instant page loads and smooth interactions
- 🎯 **Modern UI Components** – Badge system, modals, cards, and interactive elements

### 🛠️ Developer Experience
- 🔒 **TypeScript** – Full type safety and improved code quality
- 🎯 **ESLint** – Consistent code style and best practices
- 🔄 **Hot Module Replacement (HMR)** – Instant updates during development
- 📊 **Git Workflow** – Clean commit history and version control
- 🔐 **Environment Security** – Secure handling of API keys and secrets

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.0.0 or higher
- **npm** 8.0.0+ or **yarn** 3.0.0+
- **Git** for version control

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/henryTeran/portofolio.git
cd portofolio

# Install dependencies
npm install

# Start development server with HMR
npm run dev

# Build for production
npm run build

# Generate multilingual sitemap.xml
npm run generate:sitemap

# Preview production build locally
npm run preview

# Run ESLint checks
npm run lint

# Type check with TypeScript
npm run type-check
```

---

## ⚙️ EmailJS Configuration

## ⚙️ EmailJS Configuration

### Step 1: Create EmailJS Account
1. Visit [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Set Up Email Service
1. Navigate to **Email Services** in your dashboard
2. Add your email provider:
   - Gmail (recommended for beginners)
   - Outlook
   - Yahoo
   - Custom SMTP
3. Connect your email and verify
4. Save your **Service ID** (format: `service_xxxxxxxxx`)

### Step 3: Create Public Key
1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (format: `xxxxxxxxxxxxxxxxxxxx`)

### Step 4: Create Email Templates

#### Template 1: Contact Form (`template_contact`)

In EmailJS dashboard, create a new template with these variables:

```
New contact message from portfolio

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SENDER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{from_name}}
Email: {{from_email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent: {{time}}
Language: {{lang}}
Reply to: {{reply_to}}
```

#### Template 2: Quote Request (`template_quote`)

In EmailJS dashboard, create a new template with these variables:

```
New quote request from portfolio

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{client_name}}
Email: {{client_email}}
Phone: {{client_phone}}
Company: {{client_company}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type: {{project_type}}
Description: {{project_description}}
Features: {{project_features}}
Technologies: {{project_technologies}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 TIMELINE & BUDGET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Timeline: {{project_timeline}}
Budget: {{project_budget}}
Urgency: {{project_urgency}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 ADDITIONAL SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Design Work: {{needs_design}}
Hosting Setup: {{needs_hosting}}
Maintenance Plan: {{needs_maintenance}}
Training & Support: {{needs_training}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 ADDITIONAL NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{additional_info}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ SUBMISSION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent: {{time}}
Language: {{lang}}
Reply to: {{reply_to}}
```

### Step 5: Configure Environment Variables

Create `.env.local` in your project root:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
VITE_EMAILJS_TPL_CONTACT=template_contact
VITE_EMAILJS_TPL_QUOTE=template_quote
```

**Create `.env.example` for documentation:**

```env
# EmailJS Configuration
# Get these from https://www.emailjs.com/docs/rest-api/send/
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_TPL_CONTACT=template_contact
VITE_EMAILJS_TPL_QUOTE=template_quote
```

⚠️ **IMPORTANT:** Add `.env.local` to `.gitignore` to protect your credentials!

### Step 6: Verify Configuration

```bash
# Start the development server
npm run dev

# Test the contact form at http://localhost:5173
# Test the quote generator (4-step wizard)
# Check your email inbox for test messages
```

**Troubleshooting:**
- **"One or more dynamic variables are corrupted"** → Ensure all template variables are strings
- **Emails not received** → Verify Service ID and Public Key are correct
- **Template not found** → Check template names match exactly in `.env.local`

---

## 📁 Project Structure

```
portofolio/
├── src/
│   ├── components/
│   │   ├── About.tsx              # About section with skills
│   │   ├── Contact.tsx            # Contact form component
│   │   ├── Footer.tsx             # Footer with links
│   │   ├── Header.tsx             # Navigation header
│   │   ├── Hero.tsx               # Landing hero section
│   │   ├── LanguageSwitcher.tsx   # i18n language selector
│   │   ├── Pricing.tsx            # Pricing section
│   │   ├── Projects.tsx           # Portfolio projects grid
│   │   ├── QuoteModal.tsx         # 4-step quote wizard
│   │   ├── Services.tsx           # Services offered
│   │   ├── Skills.tsx             # Technical skills display
│   │   ├── ThemeToggle.tsx        # Dark/Light mode switcher
│   │   └── ui/                    # Reusable UI components
│   │       ├── Badge.tsx
│   │       ├── Card.tsx
│   │       ├── Feature.tsx
│   │       └── PillButton.tsx
│   ├── services/
│   │   └── emailService.ts        # EmailJS integration & validation
│   ├── locales/                   # i18n translations
│   │   ├── en/common.json         # English translations
│   │   ├── fr/common.json         # French translations
│   │   └── es/common.json         # Spanish translations
│   ├── i18n/
│   │   └── index.ts               # i18next configuration
│   ├── styles/
│   │   ├── theme.css              # CSS variables for theming
│   │   └── index.css              # Global styles
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Entry point
│   └── vite-env.d.ts              # Vite type definitions
├── public/
│   ├── logo-dark.svg              # Dark theme logo
│   ├── logo-light.svg             # Light theme logo
│   └── 404.html                   # Static fallback page
├── index.html                     # HTML template
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── tsconfig.json                  # TypeScript main config
├── tsconfig.app.json              # TypeScript app config
├── tsconfig.node.json             # TypeScript node config
├── vite.config.ts                 # Vite build configuration
├── eslint.config.js               # ESLint configuration
├── package.json                   # Dependencies & scripts
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend Framework** | React 18, TypeScript |
| **Styling** | Tailwind CSS 3, PostCSS |
| **Build Tool** | Vite 5 |
| **Animations** | Framer Motion |
| **Internationalization** | i18next, react-i18next |
| **Email Service** | EmailJS |
| **Icon Library** | Lucide React |
| **Code Quality** | ESLint, TypeScript |
| **Hosting** | Vercel |

---

## 🚀 Deployment (Vercel)

This repository is now **Vercel-only**.

1. Import the project in Vercel (Framework: Vite).
2. Build Command: `npm run build`.
3. Output Directory: `dist`.
4. Configure environment variables listed in `VERCEL-MIGRATION.md`.
5. Add `henryteran.com` as primary domain and `www.henryteran.com` as redirect.

Detailed migration, redirects, and Search Console checklist:

- `VERCEL-MIGRATION.md`

---

## 📊 Performance & Quality

- **⚡ Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **🎯 First Contentful Paint (FCP):** < 1 second
- **📱 Mobile Score:** 95+
- **🔒 Security Grade:** A+
- **♿ Accessibility:** WCAG 2.1 Level AA
- **📈 Core Web Vitals:** All green

---

## 📝 Available Scripts

```bash
npm run dev        # Start development server with HMR
npm run build      # Build optimized production bundle
npm run preview    # Preview production build locally
npm run lint       # Run ESLint on all TypeScript/JSX files
npm run generate:sitemap # Generate multilingual sitemap.xml
npm run vercel:check     # Generate sitemap + production build
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Guidelines
- Follow the existing code style (ESLint configuration)
- Write meaningful commit messages
- Test your changes locally before submitting
- Update documentation if needed
- Respect the TypeScript strict mode

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Henry Teran – Full-Stack Developer**

- 💼 **LinkedIn:** [Henry Teran](https://linkedin.com/in/henry-teran)
- 🐙 **GitHub:** [@henryTeran](https://github.com/henryTeran)
- 📧 **Email:** [teranhenryc@gmail.com](mailto:teranhenryc@gmail.com)
- 🌐 **Portfolio:** [henryteran.com](https://henryteran.com)

---

<div align="center">

### ⭐ If you find this project helpful, please give it a star!

Made with ❤️ by [Henry Teran](https://github.com/henryTeran)

[🔝 Back to top](#top)

</div>