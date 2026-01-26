# Multi-stage build for Yoga Assistant Application

# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY package*.json ./
RUN npm ci
COPY src ./src
COPY public ./public
COPY tsconfig.json ./
RUN npm run build

# Stage 2: Build Backend
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --production
COPY backend ./

# Stage 3: Production Image
FROM node:18-alpine
WORKDIR /app

# Copy backend
COPY --from=backend-builder /app/backend ./backend

# Copy frontend build
COPY --from=frontend-builder /app/frontend/build ./backend/public

# Install serve to serve static files
RUN npm install -g serve

# Expose port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start both backend and serve frontend
CMD ["sh", "-c", "cd backend && node server.js & serve -s ../public -l 3000 & wait"]
