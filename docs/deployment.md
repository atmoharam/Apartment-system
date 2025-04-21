# Deployment Guide

This document provides instructions for deploying the Apartment Listings Platform in both development and production environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Production Deployment](#production-deployment)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Monitoring and Maintenance](#monitoring-and-maintenance)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying the application, ensure you have the following installed:

- Docker (version 20.10.0 or higher)
- Docker Compose (version 2.0.0 or higher)
- Git

## Local Development Setup

### Clone the Repository

```bash
git clone https://github.com/atmoharam/Apartment-system.git
cd Apartment-system
```

### Start the Development Environment

The project uses Docker Compose to set up a development environment with hot reloading for both the backend and frontend.

```bash
docker-compose up --build
```

This command will:
1. Build the Docker image for the application
2. Start the PostgreSQL database
3. Initialize the database with the schema from `init/schema.sql`
4. Start the backend server on port 3000
5. Start the frontend server on port 3001

### Accessing the Application

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api

### Stopping the Development Environment

```bash
docker-compose down
```

To remove all data (including the database volume):

```bash
docker-compose down -v
```

## Production Deployment

### Building for Production

The project includes a multi-stage Dockerfile that optimizes the build for production.

```bash
docker build -t apartment-system:latest .
```

### Running in Production

Create a `docker-compose.prod.yml` file with the following content:

```yaml
version: '3.8'

services:
  app:
    image: apartment-system:latest
    container_name: realestate-app-prod
    restart: always
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "80:3001"  # Map port 80 to the frontend
      - "3000:3000"  # API port
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: your_secure_password
      DB_NAME: realestate
      NODE_ENV: production
      NEXT_PUBLIC_API_URL: https://your-domain.com/api
    networks:
      - realestate_network

  postgres:
    image: postgres:15
    container_name: postgres-15-prod
    restart: always
    environment:
      POSTGRES_DB: realestate
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: your_secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init/schema.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - realestate_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d realestate"]
      interval: 5s
      timeout: 2s
      retries: 20

networks:
  realestate_network:
    driver: bridge

volumes:
  postgres_data:
```

Start the production environment:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Using a Reverse Proxy

For production deployments, it's recommended to use a reverse proxy like Nginx to handle SSL termination and routing.

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # Frontend
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables

The application uses the following environment variables:

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | PostgreSQL host | postgres |
| DB_PORT | PostgreSQL port | 5432 |
| DB_USER | PostgreSQL username | postgres |
| DB_PASSWORD | PostgreSQL password | postgres |
| DB_NAME | PostgreSQL database name | realestate |
| NODE_ENV | Node environment | development |

### Frontend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | URL of the backend API | http://localhost:3000/api |

## Database Setup

The database schema is automatically initialized when the PostgreSQL container starts using the `init/schema.sql` file. This file creates the necessary tables, indexes, and sample data.

### Database Backup

To backup the database:

```bash
docker exec postgres-15 pg_dump -U postgres realestate > backup.sql
```

### Database Restore

To restore the database from a backup:

```bash
cat backup.sql | docker exec -i postgres-15 psql -U postgres -d realestate
```

## Monitoring and Maintenance

### Logs

To view logs from the application:

```bash
# All logs
docker-compose logs

# Backend logs only
docker-compose logs app

# Frontend logs only
docker-compose exec app pm2 logs frontend

# Database logs
docker-compose logs postgres
```

### PM2 Process Management

The application uses PM2 to manage the Node.js processes. You can access PM2 commands through Docker:

```bash
# List processes
docker-compose exec app pm2 list

# Monitor processes
docker-compose exec app pm2 monit

# Restart a process
docker-compose exec app pm2 restart backend
```

## Troubleshooting

### Common Issues

#### Database Connection Issues

If the application cannot connect to the database:

1. Check if the PostgreSQL container is running:
   ```bash
   docker-compose ps
   ```

2. Verify the database credentials in the environment variables

3. Check the database logs:
   ```bash
   docker-compose logs postgres
   ```

#### Application Not Starting

If the application containers are not starting:

1. Check the application logs:
   ```bash
   docker-compose logs app
   ```

2. Verify that all required environment variables are set

3. Check if there are port conflicts (another service might be using ports 3000 or 3001)

#### Frontend Not Loading

If the frontend is not loading:

1. Check if the frontend container is running:
   ```bash
   docker-compose exec app pm2 list
   ```

2. Verify that the `NEXT_PUBLIC_API_URL` environment variable is set correctly

3. Check the frontend logs:
   ```bash
   docker-compose exec app pm2 logs frontend
   ```