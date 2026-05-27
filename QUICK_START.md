# 🚀 Quick Start Commands

## Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Deployment

### Deploy to Vercel (Easiest Way)

```bash
# Option 1: Via Vercel Dashboard (Recommended)
# 1. Go to https://vercel.com
# 2. Sign in with GitHub
# 3. Click "Add New" → "Project"
# 4. Select your repository
# 5. Click Deploy

# Option 2: Via Vercel CLI
npm install -g vercel
vercel
vercel --prod
```

### After First Deployment

```bash
# Push to GitHub (auto-deploys to Vercel)
git add .
git commit -m "Your message"
git push origin main
```

## Git Workflow

```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Descriptive message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

## Troubleshooting

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next

# Build locally to test
npm run build
npm start
```

## Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables
# .env.local (don't commit this file)
```

---

## 📚 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repository**: https://github.com/your-username/your-repo
- **Live Site**: https://your-vercel-url.vercel.app
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs

---

## ✅ Deployment Checklist

- [ ] Run `npm run lint` - no errors
- [ ] Run `npm run build` - builds successfully
- [ ] Test locally: `npm run dev`
- [ ] All changes committed to Git
- [ ] Pushed to GitHub main branch
- [ ] Check Vercel deployment status
- [ ] Test deployed site in browser
- [ ] Verify all pages work correctly

---

**Pro Tips:**
- Use `vercel env pull` to sync environment variables locally
- Check Vercel Analytics for performance metrics
- Enable GitHub Auto-Deploy in Vercel settings
- Keep `main` branch production-ready
