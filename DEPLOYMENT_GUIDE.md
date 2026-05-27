# 🚀 Deployment Guide - Modern Portfolio

Complete step-by-step guide to deploy your portfolio to production on Vercel.

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [GitHub Setup](#github-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Post-Deployment](#post-deployment)
5. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All code is committed and pushed to GitHub
- [ ] `.env.local` is NOT committed (should be in `.gitignore`)
- [ ] `npm run build` runs successfully locally
- [ ] `npm run lint` passes without errors
- [ ] All environment variables are documented in `.env.example`
- [ ] No console errors in development (`npm run dev`)
- [ ] Images are optimized
- [ ] Mobile responsive design is tested
- [ ] All links are working correctly
- [ ] SEO meta tags are properly set
- [ ] Form submissions (if any) are tested

---

## 🔧 GitHub Setup

### 1. Create GitHub Repository

```bash
# If not already on GitHub
git remote add origin https://github.com/YOUR_USERNAME/modern-portfolio.git
git branch -M main
git push -u origin main
```

### 2. Verify Repository

- Navigate to your GitHub repository
- Ensure all files are pushed
- Check that `.env.local` is NOT in the repository (should be in .gitignore)
- Verify `.gitignore` contains `node_modules/`, `.next/`, `.env`, etc.

---

## 🌐 Vercel Deployment

### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign up or log in with GitHub account

2. **Create New Project**
   - Click "Add New..." → "Project"
   - Select "Import from Git"
   - Choose your GitHub repository

3. **Configure Project**
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (or leave empty)
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm ci`

4. **Environment Variables**
   - Click "Environment Variables"
   - Add any variables from your `.env.example`
   - Leave empty if no variables needed

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - You'll get a live URL

### Option B: Deploy via CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
# Follow the prompts:
# - Link to existing project or create new
# - Project name: modern-portfolio
# - Framework: Next.js
# - Output directory: .next
```

4. **Deploy to Production**
```bash
vercel --prod
```

---

## 📋 Post-Deployment

### 1. Verify Deployment

- [ ] Visit your Vercel URL
- [ ] Test all pages and links
- [ ] Check mobile responsiveness
- [ ] Verify animations work smoothly
- [ ] Test any forms or interactions

### 2. Set Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project
2. Go to "Settings" → "Domains"
3. Add your domain (e.g., yourname.com)
4. Follow DNS configuration instructions

### 3. Enable Automatic Deployments

1. In Vercel Dashboard → Settings
2. Under "Git", ensure "Deploy on push to main" is enabled
3. Your site will auto-deploy when you push to `main` branch

### 4. Set Up GitHub Actions (Optional)

The repository includes GitHub Actions workflow for CI/CD.

To enable automatic deployment:

1. **Add Vercel Secrets to GitHub**
   - Go to GitHub Repository → Settings → Secrets and variables → Actions
   - Add these secrets:
     - `VERCEL_TOKEN`: Get from https://vercel.com/account/tokens
     - `VERCEL_ORG_ID`: From Vercel project settings
     - `VERCEL_PROJECT_ID`: From Vercel project settings

2. **Workflow will automatically**
   - Run lint checks
   - Build the project
   - Deploy to Vercel on push to `main`

### 5. Monitor Performance

- Check Vercel Analytics in Dashboard
- Monitor Core Web Vitals
- Review Build logs if issues occur

---

## 🐛 Troubleshooting

### Build Failures

**Issue**: "Build failed"
```
Solution:
1. Check build logs in Vercel Dashboard
2. Run `npm run build` locally
3. Fix any errors
4. Push to GitHub
5. Vercel will auto-rebuild
```

### Environment Variables Not Working

**Issue**: `Cannot find variable`
```
Solution:
1. Ensure variable starts with NEXT_PUBLIC_ for client-side vars
2. Add to Vercel Environment Variables in Dashboard
3. Redeploy after adding variables
4. Check .env.local exists locally
```

### Slow Performance

**Issue**: Site loads slowly
```
Solution:
1. Check Vercel Analytics
2. Optimize images (use next/image)
3. Enable SWC minification (already done)
4. Check for large dependencies in bundle
5. Use dynamic imports for heavy components
```

### 404 on Pages

**Issue**: Getting 404 errors
```
Solution:
1. Check your routing in pages/
2. Ensure all pages are correctly named
3. Verify dynamic routes [id].js syntax
4. Check for typos in paths
5. Rebuild and redeploy
```

### CORS Issues

**Issue**: API calls failing with CORS error
```
Solution:
1. Update next.config.js headers
2. Add proper CORS configuration
3. Use API routes (/pages/api) as proxy
```

---

## 🔄 Continuous Updates

### Making Changes After Deployment

1. Make changes locally
2. Test: `npm run dev`
3. Build locally: `npm run build`
4. Commit and push:
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```
5. Vercel automatically deploys (if auto-deploy enabled)

### Rollback to Previous Deployment

1. Go to Vercel Dashboard → Deployments
2. Find previous deployment
3. Click "..." → "Promote to Production"

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: Create an issue in your repository
- **Stack Overflow**: Tag with `nextjs` and `vercel`

---

**Happy Deploying! 🎉**
