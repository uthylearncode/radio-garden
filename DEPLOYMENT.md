# 🚀 Radio Garden - Vercel Deployment Guide

## Quick Deployment Steps

### Step 1: Connect GitHub Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Paste the repository URL or search for: `uthylearncode/radio-garden`
5. Click **"Import"**

### Step 2: Configure Build Settings

When prompted, configure the following settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Build Command** | `pnpm run build` |
| **Output Directory** | `dist/public` |
| **Install Command** | `pnpm install` |
| **Environment Variables** | (Leave empty - using public APIs) |

### Step 3: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Once successful, you'll see a "Congratulations" message
4. Your app will be live at: `https://radio-garden.vercel.app`

## Alternative: Deploy via Git Push

If you have Vercel connected to your GitHub account:

1. Make changes locally
2. Commit and push to main branch:
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```
3. Vercel will automatically detect the push and deploy
4. Monitor deployment at: https://vercel.com/dashboard

## Troubleshooting

### Build Fails with "Module not found"

**Solution**: Ensure all dependencies are installed:
```bash
pnpm install
```

### Three.js or Canvas Errors

**Solution**: These are normal warnings. The application will still work fine.

### API Calls Return 403 Forbidden

**Solution**: This is a CORS issue with some radio streams. Try:
- Selecting a different station
- The application includes CORS headers in requests

### Application Loads but Globe Doesn't Render

**Solution**: 
- Ensure WebGL is enabled in your browser
- Try a different browser (Chrome, Firefox, Safari)
- Check browser console for errors

## Environment Variables (Optional)

Currently, Radio Garden uses only public APIs. If you need to add custom environment variables:

1. Go to Project Settings → Environment Variables
2. Add variables as needed
3. Redeploy the project

Example environment variables:
```
VITE_API_BASE_URL=https://fi1.api.radio-browser.info/json
VITE_APP_TITLE=Radio Garden
```

## Performance Optimization

### Reduce Bundle Size

The current bundle is ~1.2 MB (gzipped: ~360 KB). To optimize further:

1. **Reduce station count**: Edit `client/src/pages/Home.tsx`
   ```typescript
   const data = await radioApi.getStations(500); // Change 1000 to 500
   ```

2. **Lazy load Three.js**: Use dynamic imports for 3D components

3. **Enable image optimization**: Vercel automatically optimizes images

### Cache Strategy

Vercel automatically caches:
- Static assets (CSS, JS, images)
- API responses (with appropriate headers)

## Monitoring & Analytics

After deployment, monitor your application:

1. **Vercel Analytics**: https://vercel.com/dashboard/[project-name]/analytics
2. **Error Tracking**: Check "Deployments" tab for build/runtime errors
3. **Performance**: Monitor Web Vitals in Vercel Analytics

## Custom Domain (Optional)

To add a custom domain:

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (usually 5-30 minutes)

Example domains:
- `radiogarden.com`
- `radio-garden.app`
- `listen.radio-garden.com`

## Rollback to Previous Deployment

If something goes wrong:

1. Go to Vercel Dashboard → Deployments
2. Find the previous working deployment
3. Click the three dots menu
4. Select "Promote to Production"

## Continuous Deployment

Every push to the `main` branch will:
1. Trigger a new build
2. Run tests (if configured)
3. Deploy to preview URL
4. Deploy to production after approval

## Useful Vercel Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from local machine
vercel --prod

# Check deployment status
vercel list

# View logs
vercel logs [deployment-url]
```

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Radio Garden GitHub**: https://github.com/uthylearncode/radio-garden
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev

## Success Checklist

After deployment, verify:

- [ ] Application loads without errors
- [ ] 3D globe renders and rotates smoothly
- [ ] Radio stations list displays 1000+ stations
- [ ] Search and filter functionality works
- [ ] Can select and play a radio station
- [ ] Audio player appears and controls work
- [ ] Responsive design works on mobile
- [ ] No console errors in browser DevTools

## Next Steps

Once deployed, you can:

1. **Share the link**: Send the Vercel URL to friends
2. **Add to home screen**: Install as PWA on mobile
3. **Monitor performance**: Check Vercel Analytics
4. **Customize**: Modify colors, add features, optimize performance
5. **Scale**: Add more features, integrate databases, add authentication

---

**Deployment Status**: Ready for Vercel deployment
**Repository**: https://github.com/uthylearncode/radio-garden
**Expected URL**: https://radio-garden.vercel.app

