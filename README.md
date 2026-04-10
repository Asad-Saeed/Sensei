# Sensei - Next.js App

A modern Next.js application built with the latest technologies including App Router, TypeScript, Tailwind CSS v4, and next-intl for internationalization.

## Features

- ⚡ **Next.js 15** with App Router
- 🎨 **Tailwind CSS v4** for styling
- 📘 **TypeScript** for type safety
- 🌍 **next-intl** for internationalization (English & Japanese)
- 🚀 **Latest libraries** and best practices

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
sensei/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Locale-specific routes
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── about/         # About page
│   │   │   └── contact/       # Contact page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── messages/              # Translation files
│   │   ├── en.json           # English translations
│   │   └── ja.json           # Japanese translations
│   └── i18n.ts               # i18n configuration
├── middleware.ts             # Next.js middleware for i18n
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Internationalization

The app supports two languages:

- English (`/en`)
- Japanese (`/ja`)

You can switch languages using the language selector in the navigation bar.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization

## License

MIT
