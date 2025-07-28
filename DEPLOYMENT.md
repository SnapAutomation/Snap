# Deployment Guide - 9GAG Clone

This guide covers various deployment options for the 9GAG clone mobile web app.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (for version control)

## Build for Production

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Build the application**:
   ```bash
   npm run build
   ```

3. **Test the production build locally**:
   ```bash
   npm run preview
   ```

The built files will be in the `dist/` directory.

## Deployment Options

### 1. Vercel (Recommended for React apps)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/9gag-clone)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts and your app will be live!

**Vercel Configuration** (`vercel.json`):
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### 2. Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/9gag-clone)

1. **Drag and Drop**: Build locally and drag the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)

2. **Git Integration**: Connect your GitHub repo in Netlify dashboard with these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/9gag-clone"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

### 4. Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```

3. **Configure** (`firebase.json`):
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

### 5. Railway

1. **Connect Railway to your GitHub repo**
2. **Set build command**: `npm run build`
3. **Set start command**: `npm run preview`
4. **Set port**: `3000`

### 6. Heroku

**Heroku Configuration** (`static.json`):
```json
{
  "root": "dist/",
  "routes": {
    "/**": "index.html"
  }
}
```

**Package.json additions**:
```json
{
  "scripts": {
    "heroku-postbuild": "npm run build"
  }
}
```

## Environment Variables

For production, you might want to set these environment variables:

```bash
VITE_API_URL=https://your-api-url.com
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
```

## Performance Optimizations

### 1. Enable Gzip Compression

Most hosting services enable this automatically, but you can configure it:

**Nginx example**:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 2. Set Cache Headers

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Enable Service Worker (Future Enhancement)

Add PWA capabilities for offline functionality:
```bash
npm install vite-plugin-pwa
```

## Mobile-Specific Considerations

1. **Viewport Meta Tag**: Already included in `index.html`
2. **Touch Icons**: Consider adding Apple touch icons
3. **Manifest**: Add a web app manifest for PWA features
4. **Performance**: Optimize images and use lazy loading (already implemented)

## Monitoring and Analytics

Consider adding:
- Google Analytics
- Sentry for error tracking
- Performance monitoring tools

## Security Headers

Add security headers in your hosting configuration:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Custom Domain

Most hosting services allow custom domains:
1. Purchase a domain
2. Configure DNS records to point to your hosting service
3. Enable HTTPS (usually automatic)

## Continuous Deployment

Set up automatic deployments:
1. Connect your hosting service to your Git repository
2. Configure build settings
3. Enable automatic deployments on push to main branch

Your 9GAG clone is now ready for the world! 🚀