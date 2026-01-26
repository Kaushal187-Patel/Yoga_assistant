# Deployment Guide for Yoga Assistant

This guide covers multiple deployment options for the Yoga Assistant application.

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git repository
- Environment variables configured

## 🔧 Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Backend (backend/.env)
```env
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/database_name
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=https://your-frontend-url.com
```

---

## 🚀 Deployment Options

### Option 1: Vercel (Frontend) + Railway/Render (Backend) - Recommended

#### Frontend on Vercel:

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   Or connect your GitHub repo to Vercel dashboard.

3. **Set Environment Variables in Vercel**:
   - Go to Project Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.com/api`

#### Backend on Railway:

1. **Create Railway Account**: https://railway.app
2. **New Project** → Deploy from GitHub
3. **Add PostgreSQL Database**:
   - Click "New" → "Database" → "PostgreSQL"
   - Copy the DATABASE_URL
4. **Configure Environment Variables**:
   - `DATABASE_URL` (from PostgreSQL service)
   - `JWT_SECRET` (generate a strong secret)
   - `CORS_ORIGIN` (your Vercel frontend URL)
   - `NODE_ENV=production`
   - `PORT=5000`
5. **Deploy**: Railway will auto-detect Node.js and deploy

#### Backend on Render:

1. **Create Render Account**: https://render.com
2. **New Web Service** → Connect GitHub repo
3. **Settings**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Add PostgreSQL Database**:
   - New → PostgreSQL
   - Copy Internal Database URL
5. **Environment Variables**:
   - `DATABASE_URL` (from PostgreSQL)
   - `JWT_SECRET`
   - `CORS_ORIGIN`
   - `NODE_ENV=production`
   - `PORT=5000`

---

### Option 2: Heroku (Full Stack)

#### Deploy Backend to Heroku:

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli

2. **Login and Create App**:
   ```bash
   heroku login
   heroku create your-app-name-backend
   ```

3. **Add PostgreSQL**:
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

4. **Set Environment Variables**:
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set CORS_ORIGIN=https://your-frontend-url.com
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**:
   ```bash
   cd backend
   git init
   heroku git:remote -a your-app-name-backend
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

6. **Initialize Database**:
   ```bash
   heroku run npm run init-db
   ```

#### Deploy Frontend to Heroku:

1. **Create React Buildpack App**:
   ```bash
   heroku create your-app-name-frontend --buildpack mars/create-react-app
   ```

2. **Set Environment Variables**:
   ```bash
   heroku config:set REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

---

### Option 3: Docker Deployment

#### Using Docker Compose:

1. **Create .env file**:
   ```env
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=yoga_guru
   JWT_SECRET=your-secret-key
   CORS_ORIGIN=http://localhost:3000
   ```

2. **Build and Run**:
   ```bash
   docker-compose up -d
   ```

3. **Initialize Database**:
   ```bash
   docker-compose exec backend npm run init-db
   ```

4. **Access**:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

#### Deploy Docker to Cloud:

- **DigitalOcean App Platform**: Upload docker-compose.yml
- **AWS ECS**: Use Docker images
- **Google Cloud Run**: Deploy containers

---

### Option 4: Netlify (Frontend) + Backend Service

#### Frontend on Netlify:

1. **Connect GitHub** to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
3. **Environment Variables**:
   - `REACT_APP_API_URL` = your backend URL

#### Backend:
Use Railway, Render, or Heroku (see Option 1)

---

## 🗄️ Database Setup

### Initialize Database:

After deployment, run the database initialization:

```bash
# On Heroku
heroku run npm run init-db

# On Railway/Render
# Add init-db script to startup or run manually via SSH

# Local/Docker
cd backend
npm run init-db
```

---

## ✅ Post-Deployment Checklist

- [ ] Database initialized with schema
- [ ] Environment variables set correctly
- [ ] CORS configured for frontend URL
- [ ] Frontend API URL points to backend
- [ ] SSL/HTTPS enabled (production requirement)
- [ ] Database backups configured
- [ ] Error logging/monitoring set up
- [ ] Health check endpoint working (`/api/health`)

---

## 🔍 Testing Deployment

1. **Check Backend Health**:
   ```bash
   curl https://your-backend-url.com/api/health
   ```

2. **Test Frontend**:
   - Visit your frontend URL
   - Try login/register
   - Test pose detection features

3. **Check CORS**:
   - Open browser console
   - Verify no CORS errors

---

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure `CORS_ORIGIN` matches your frontend URL exactly
   - Check backend CORS middleware

2. **Database Connection**:
   - Verify `DATABASE_URL` format: `postgresql://user:pass@host:port/db`
   - Check database is accessible from backend server

3. **Environment Variables**:
   - Frontend: Must start with `REACT_APP_`
   - Rebuild frontend after changing env vars

4. **Build Failures**:
   - Check Node.js version (18+)
   - Verify all dependencies in package.json

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [Heroku Documentation](https://devcenter.heroku.com)
- [Docker Documentation](https://docs.docker.com)

---

**Need Help?** Check the logs on your hosting platform or open an issue in the repository.
