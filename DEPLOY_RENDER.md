# Deploy YogaGuru to Render

## Prerequisites
- GitHub account
- Render account (free at https://render.com)

---

## Step 1: Push Code to GitHub

1. Create a new repository on GitHub
2. Push your code:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

---

## Step 2: Deploy on Render (Blueprint Method - Recommended)

### Option A: One-Click Deploy with Blueprint

1. Go to https://render.com and sign in
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and create:
   - PostgreSQL database
   - Web service (frontend + backend)
5. Click **"Apply"** to deploy

### Option B: Manual Setup

If Blueprint doesn't work, set up manually:

#### Step 2.1: Create PostgreSQL Database

1. Go to Render Dashboard → **"New"** → **"PostgreSQL"**
2. Settings:
   - Name: `yogaguru-db`
   - Database: `yoga_guru`
   - User: `yoga_user`
   - Region: Oregon (or nearest)
   - Plan: Free
3. Click **"Create Database"**
4. Copy the **"External Database URL"** for later

#### Step 2.2: Create Web Service

1. Go to Render Dashboard → **"New"** → **"Web Service"**
2. Connect your GitHub repository
3. Settings:
   - Name: `yogaguru`
   - Region: Oregon
   - Branch: `main`
   - Runtime: `Node`
   - Build Command: `npm install && npm run build && cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Plan: Free

4. Add Environment Variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `JWT_SECRET` | (click "Generate" for random value) |
| `CORS_ORIGIN` | `https://your-app-name.onrender.com` |
| `DATABASE_URL` | (paste the External Database URL from step 2.1) |

5. Click **"Create Web Service"**

---

## Step 3: Initialize Database

After deployment, you need to initialize the database tables:

### Option 1: Using Render Shell

1. Go to your Web Service on Render
2. Click **"Shell"** tab
3. Run:

```bash
cd backend
node scripts/init-db.js
```

### Option 2: Using psql (if you have it installed)

```bash
psql YOUR_DATABASE_URL -f backend/database/schema.sql
```

---

## Step 4: Verify Deployment

1. Wait for deployment to complete (5-10 minutes for first deploy)
2. Visit your app URL: `https://yogaguru.onrender.com`
3. Test the API: `https://yogaguru.onrender.com/api/health`

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (Render sets this) | `10000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret for JWT tokens | Auto-generated |
| `CORS_ORIGIN` | Allowed frontend origin | `https://yogaguru.onrender.com` |

---

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json
- Try clearing build cache: Settings → Clear Build Cache

### Database Connection Error
- Verify DATABASE_URL is set correctly
- Check if database is created and running
- Ensure SSL is enabled for production

### App Not Loading
- Check if build folder exists
- Verify start command is correct
- Check browser console for errors

### Free Tier Limitations
- App sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month free usage

---

## Updating Your App

To deploy updates:

1. Push changes to GitHub:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

2. Render will automatically detect changes and redeploy

---

## Custom Domain (Optional)

1. Go to your Web Service → **"Settings"** → **"Custom Domains"**
2. Add your domain
3. Update DNS records as instructed
4. Update `CORS_ORIGIN` to match your custom domain

---

## Support

- Render Docs: https://render.com/docs
- Community: https://community.render.com
