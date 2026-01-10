# Breland Family Insurance Website

A premium, professionally designed website for Melani and John Breland's insurance business, specializing in final expense insurance, life insurance, and estate planning services.

## Features

- **Elegant Design**: Premium serif typography (Fraunces), sophisticated color palette, and fluid animations
- **Responsive**: Fully adaptive layout for mobile, tablet, and desktop
- **Calendly Integration**: Direct booking links throughout the site
- **Modern Stack**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Performance Optimized**: Lightweight, fast-loading with smooth animations

## Services Highlighted

- Final Expense Insurance
- Whole Life Insurance
- Index Universal Life (IUL)
- Free Will Preparation
- Trust & Estate Planning

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Vercel

1. Push this repo to GitHub
2. Import the repository in Vercel
3. Vercel will auto-detect the Vite configuration
4. Deploy!

Or use the Vercel CLI:
```bash
npx vercel
```

## Customization

### Update Contact Info
Edit `src/BrelandInsurance.tsx`:
- Phone number in footer and CTA sections
- Email address
- Physical location

### Update Calendly Link
The Calendly URL is defined at the top of `src/BrelandInsurance.tsx`:
```tsx
const CALENDLY_URL = "https://calendly.com/melanibreland";
```

### Colors
Tailwind configuration is in `tailwind.config.js` with custom color palettes:
- `midnight` - Deep navy blues
- `brass` - Warm golds
- `sage` - Muted greens
- `cream` - Warm off-whites
- `parchment` - Warm tans

## Tech Stack

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## License

Private - Breland Family Insurance
