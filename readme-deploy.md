# kitchenometry Docker Deployment Guide

## Prerequisites
- Docker installed on your system
- Docker Compose installed on your system
- Git (optional, for version control)

## Project Setup

### 1. Create Docker Configuration Files

Create a `Dockerfile` in your project root:

```dockerfile
# Development stage
FROM node:18-alpine as development

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine as production

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # Development environment
  dev:
    build:
      context: .
      target: development
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    command: npm run dev

  # Production build
  prod:
    build:
      context: .
      target: production
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
    gzip_disable "MSIE [1-6]\.";

    # Single page application setup
    location / {
        try_files $uri $uri/ /index.html;
        expires -1;
        add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
    }

    # Static assets
    location /static {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # Health check
    location /health {
        return 200 'healthy\n';
        add_header Content-Type text/plain;
    }
}
```

## Development Workflow

### 1. Start Development Environment

```bash
# Start the development container
docker-compose up dev

# Your application will be available at http://localhost:3000
```

The development container includes:
- Hot-reloading
- Source maps
- Development error messages
- Volume mounting for real-time code updates

### 2. Running Commands Inside Container

```bash
# Install a new package
docker-compose exec dev npm install package-name

# Run tests
docker-compose exec dev npm test

# Generate production build
docker-compose exec dev npm run build
```

## Production Deployment

### 1. Local Production Build

```bash
# Build and start production container
docker-compose up prod --build

# Your application will be available at http://localhost:80
```

### 2. Cloud Deployment

#### A. Deploy to Cloudflare

1. Install Cloudflare Wrangler CLI:
```bash
# Use Docker to run Wrangler commands
docker run -it --rm -v $(pwd):/app -w /app node:18-alpine npm install -g wrangler
```

2. Configure `wrangler.toml`:
```toml
name = "kitchenometry"
type = "webpack"
account_id = "your-account-id"
workers_dev = true
```

3. Deploy:
```bash
docker run -it --rm -v $(pwd):/app -w /app node:18-alpine wrangler publish
```

#### B. Deploy to Traditional Hosting

1. Build the production image:
```bash
docker-compose build prod
```

2. Save the image:
```bash
docker save kitchenometry-prod:latest > kitchenometry-prod.tar
```

3. Transfer and load on production server:
```bash
# On production server
docker load < kitchenometry-prod.tar
docker run -d -p 80:80 kitchenometry-prod:latest
```

## Maintenance and Updates

### Update Dependencies

```bash
# Update package.json
docker-compose exec dev npm update

# Rebuild containers with updated dependencies
docker-compose up dev --build
```

### Backup and Restore

```bash
# Backup production image
docker save kitchenometry-prod:latest | gzip > kitchenometry-prod-backup.tar.gz

# Restore from backup
gunzip -c kitchenometry-prod-backup.tar.gz | docker load
```

## Monitoring and Logs

```bash
# View container logs
docker-compose logs -f dev

# Monitor container resources
docker stats

# Check nginx access logs in production
docker-compose exec prod tail -f /var/log/nginx/access.log
```

## Troubleshooting

### Common Issues

1. Port conflicts:
```bash
# Change port mapping in docker-compose.yml
ports:
  - "3001:3000"  # Maps host port 3001 to container port 3000
```

2. Volume mounting issues:
```bash
# Reset volume
docker-compose down -v
docker-compose up dev --build
```

3. Cache issues:
```bash
# Clean build cache
docker-compose build --no-cache
```

### Health Checks

```bash
# Check application health
curl http://localhost/health

# Check container health
docker inspect --format='{{json .State.Health}}' container_name
```

## Security Considerations

1. Use specific versions in Dockerfile instead of 'latest'
2. Implement rate limiting in nginx.conf
3. Regular security updates:
```bash
# Update base images
docker-compose pull
docker-compose build --pull
```

4. Scan images for vulnerabilities:
```bash
# Using Docker Scan
docker scan kitchenometry-prod:latest
```