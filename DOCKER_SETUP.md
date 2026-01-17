# Docker Setup Guide for UniPath

## Prerequisites
- Docker Desktop installed on Windows
- Your environment variables ready (Clerk keys, Database URL)

## Quick Start

### 1. Verify your `.env` file

Make sure your `.env` file contains these required variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key
CLERK_SECRET_KEY=sk_test_your_actual_secret
DATABASE_URL=postgresql://user:password@host:port/database
```

### 2. Build the Docker Image

**Option A: Using the batch script (Easiest)**
```bash
docker-build.bat
```

**Option B: Manual command**
```bash
docker build \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key \
  --build-arg CLERK_SECRET_KEY=your_secret_key \
  --build-arg DATABASE_URL=your_database_url \
  -t unipath .
```

### 3. Run the Container

**Option A: Using the batch script**
```bash
docker-run.bat
```

**Option B: Manual command**
```bash
docker run -p 3000:3000 --name unipath-app unipath
```

Your application will be available at: **http://localhost:3000**

## Useful Docker Commands

### View running containers
```bash
docker ps
```

### View all containers (including stopped)
```bash
docker ps -a
```

### Stop the container
```bash
docker stop unipath-app
```

### Start the container again
```bash
docker start unipath-app
```

### Remove the container
```bash
docker rm unipath-app
```

### Remove the image
```bash
docker rmi unipath
```

### View container logs
```bash
docker logs unipath-app
```

### Access container shell
```bash
docker exec -it unipath-app sh
```

## Troubleshooting

### Container already exists error
If you get an error that the container already exists:
```bash
docker rm unipath-app
docker-run.bat
```

### Port already in use
If port 3000 is already in use, you can map to a different port:
```bash
docker run -p 8080:3000 --name unipath-app unipath
```
Then access at http://localhost:8080

### Rebuild after code changes
```bash
docker stop unipath-app
docker rm unipath-app
docker rmi unipath
docker-build.bat
docker-run.bat
```

## Docker Compose (Alternative)

For easier management, you can also use Docker Compose. Create a `docker-compose.yml` file and run:
```bash
docker-compose up
```

## Notes

- The Dockerfile uses multi-stage builds to optimize image size
- Environment variables are passed during build time and runtime
- The container exposes port 3000 by default
- Prisma migrations are generated during the build process
