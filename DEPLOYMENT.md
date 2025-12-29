# Deployment Guide

## Prerequisites

1. Install [Vercel CLI](https://vercel.com/download)
   ```bash
   npm install -g vercel
   ```

2. Create a [Vercel account](https://vercel.com/signup) if you don't have one

## Deploy to Vercel

### Method 1: Using Vercel CLI

1. Login to Vercel:
   ```bash
   vercel login
   ```

2. Deploy (first time):
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose project name
   - Select "No" for existing project (first time)
   - Accept default settings

3. Deploy to production:
   ```bash
   vercel --prod
   ```

### Method 2: Using Vercel Dashboard

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Import Project"

4. Select your GitHub repository

5. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Click "Deploy"

## Environment Variables

No environment variables are required for the basic setup.

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## PWA Installation

After deployment:
1. Visit your app URL on a mobile device
2. Tap the browser menu
3. Select "Add to Home Screen" or "Install App"
4. The app will be installed as a PWA!

## Updating the App

To deploy updates:

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically deploy your changes.

Or using CLI:
```bash
vercel --prod
```

## Icon Customization

To create custom app icons:

1. Start dev server: `npm run dev`
2. Visit: `http://localhost:4001/generate-icons.html`
3. Click buttons to download icons
4. Replace files in `public/` folder:
   - `pwa-192x192.png`
   - `pwa-512x512.png`
   - `apple-touch-icon.png`

Or use online tools:
- [Real Favicon Generator](https://realfavicongenerator.net/)
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)

## Troubleshooting

### Build Fails
- Check Node.js version (should be 16+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### PWA Not Installing
- Ensure you're accessing via HTTPS (Vercel provides this automatically)
- Check browser console for errors
- Verify manifest.json is accessible: `YOUR_URL/manifest.json`

### Audio Not Working
- Audio requires user interaction on mobile devices
- Make sure to tap the screen first to enable audio

