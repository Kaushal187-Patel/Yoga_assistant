# Quick Deployment Guide

## 🚀 Fastest Deployment (Vercel + Railway)

### Step 1: Deploy Backend (Railway)

1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Node.js
5. Set Root Directory to: `backend`
6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your-random-secret-key-here
   CORS_ORIGIN=https://your-frontend.vercel.app
   ```
7. Add PostgreSQL Database:
   - Click "New" → "Database" → "PostgreSQL"
   - Copy the `DATABASE_URL` (auto-set by Railway)
8. Deploy! Railway will give you a URL like: `https://your-app.railway.app`

### Step 2: Deploy Frontend (Vercel)

1. Go to https://vercel.com and sign up
2. Click "New Project" → Import your GitHub repo
3. Framework Preset: **React**
4. Root Directory: `/` (root)
5. Build Command: `npm run build`
6. Output Directory: `build`
7. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-app.railway.app/api
   ```
8. Deploy!

### Step 3: Initialize Database

After backend is deployed:

1. Go to Railway dashboard
2. Click on your backend service
3. Open the "Deploy Logs" tab
4. Click "Run Command" or use Railway CLI:
   ```bash
   railway run npm run init-db
   ```

### Step 4: Update CORS

1. Go back to Railway backend settings
2. Update `CORS_ORIGIN` to your Vercel URL:
   ```
   CORS_ORIGIN=https://your-app.vercel.app
   ```
3. Redeploy backend

---

## ✅ Verify Deployment

1. **Backend Health Check**: 
   Visit: `https://your-backend.railway.app/api/health`
   Should return: `{"status":"OK","message":"YOGA GURU API is running"}`

2. **Frontend**: 
   Visit your Vercel URL and test:
   - Homepage loads
   - Login/Register works
   - API calls succeed (check browser console)

---

## 🐛 Common Issues

**CORS Error?**
- Make sure `CORS_ORIGIN` in backend matches your frontend URL exactly (no trailing slash)

**Database Error?**
- Run `npm run init-db` on Railway
- Check `DATABASE_URL` is set correctly

**Frontend can't connect to backend?**
- Verify `REACT_APP_API_URL` is set in Vercel
- Rebuild frontend after setting env var

---

## 📝 Alternative: Single Server (Heroku)

If you want everything on one server:

1. Build frontend: `npm run build`
2. Copy `build` folder to `backend/public`
3. Deploy backend to Heroku
4. Backend will serve both API and frontend

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
