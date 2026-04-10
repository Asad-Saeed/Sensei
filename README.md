# Sensei — AI SaaS Landing Page

A modern, high-performance AI SaaS platform landing page featuring custom WebGL 3D shader animations, smooth motion transitions, responsive design, and bilingual internationalization support.

Built with **Next.js 15**, **React 19**, **Three.js**, **Framer Motion**, and **Tailwind CSS v4**.

---

## Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 15 (App Router), React 19, TypeScript 5 |
| **3D & Animations** | Three.js (Custom GLSL Shaders), Framer Motion |
| **Styling** | Tailwind CSS v4, PostCSS |
| **Internationalization** | next-intl (English & Japanese) |
| **Forms & Validation** | React Hook Form, Yup |
| **Icons** | React Icons |

---

## Key Features

- Custom Three.js WebGL shader animations with real-time particle effects
- Framer Motion page transitions and scroll-triggered animations
- Interactive floating cursor with spring-based physics
- Fully responsive mobile-first design
- Bilingual support (EN/JA) with dynamic language switching
- SEO-optimized with Next.js static generation
- Dark-themed UI with neon accent design system

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Clone the Repository

```bash
git clone https://github.com/Asad-Saeed/sensei.git
cd sensei
```

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
sensei/
├── src/
│   ├── app/
│   │   └── [locale]/            # Locale-specific routes
│   │       ├── page.tsx          # Home page
│   │       ├── about/            # About page
│   │       ├── contact/          # Contact page
│   │       └── support/          # Support page
│   ├── components/
│   │   ├── landing/              # Landing page sections
│   │   ├── layout/               # Header, Footer
│   │   └── ui/                   # Reusable UI components
│   ├── messages/
│   │   ├── en.json               # English translations
│   │   └── ja.json               # Japanese translations
│   └── i18n.ts                   # i18n configuration
├── public/                       # Static assets
├── middleware.ts                  # i18n routing middleware
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Developed By

**Asad Saeed** — Senior Frontend Engineer

[![GitHub](https://img.shields.io/badge/GitHub-Asad--Saeed-181717?logo=github)](https://github.com/Asad-Saeed)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-asad--saeed--dev-0A66C2?logo=linkedin)](https://linkedin.com/in/asad-saeed-dev)
[![Portfolio](https://img.shields.io/badge/Portfolio-asad--saeed.vercel.app-000?logo=vercel)](https://asad-saeed.vercel.app)

- **Email:** asadsaeed.dev@gmail.com
- **Phone:** +92 301 7631644

---

## License

MIT
