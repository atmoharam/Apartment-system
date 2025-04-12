# Multi-stage build for production
FROM node:18-alpine AS backend-build

# Set up backend
WORKDIR /app/backend
COPY src/package*.json ./
RUN npm install
COPY src .
RUN npm run build

FROM node:18-alpine AS frontend-build

# Set up frontend
WORKDIR /app/frontend
COPY UI/package*.json ./
RUN npm install
COPY UI .
RUN npm run build

# Final production image
FROM node:18-alpine

WORKDIR /app

# Copy backend build
COPY --from=backend-build /app/backend ./backend

# Copy frontend build
COPY --from=frontend-build /app/frontend ./frontend

# Install PM2 process manager
RUN npm install -g pm2

# Create ecosystem file for PM2
RUN echo 'module.exports = { \
  apps: [ \
    { \
      name: "backend", \
      cwd: "./backend", \
      script: "npm", \
      args: "start", \
      env: { \
        NODE_ENV: "production" \
      } \
    }, \
    { \
      name: "frontend", \
      cwd: "./frontend", \
      script: "npm", \
      args: "start", \
      env: { \
        PORT: 3001, \
        NODE_ENV: "production" \
      } \
    } \
  ] \
}' > ecosystem.config.js

EXPOSE 3000 3001

CMD ["pm2-runtime", "ecosystem.config.js"]