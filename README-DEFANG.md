# Defang Deployment Guide

This project is configured to deploy with Defang, a tool that simplifies deploying Docker Compose applications to the cloud.

## Prerequisites

1. **Install Defang CLI**:
   ```bash
   # Using shell script (recommended)
   eval "$(curl -fsSL s.defang.io/install)"
   
   # Or using Winget on Windows
   winget install defang
   ```

2. **Verify installation**:
   ```bash
   defang --version
   ```

## Deployment Files

The following files have been configured for Defang deployment:

- **`Dockerfile`**: Builds the React application using Node.js 18 Alpine
- **`compose.yaml`**: Defines the web service configuration for Defang
- **`.dockerignore`**: Excludes unnecessary files from the Docker build context

## Local Testing

Before deploying, test the Docker setup locally:

```bash
# Build and run with Docker Compose
docker compose up --build

# Access the application at http://localhost:3000
```

## Deployment Options

### Option 1: Deploy to Defang Playground (Free)

```bash
# Deploy to the free playground environment
defang compose up
```

### Option 2: Deploy to Your Cloud Provider

```bash
# Deploy to AWS (requires AWS credentials)
defang --provider aws compose up

# Deploy to Google Cloud (requires GCP credentials)
defang --provider gcp compose up
```

## Configuration Details

- **Port**: Application runs on port 3000
- **Memory**: 512MB reserved, 1GB limit
- **Health Check**: Monitors application availability
- **Build**: Uses production build with static file serving via `serve`

## Environment Variables

The application is configured with:
- `NODE_ENV=production`

Add additional environment variables to the `compose.yaml` file as needed.

## Monitoring

After deployment, you can:
- View logs: `defang logs web`
- Check status: `defang ps`
- Get service URL: `defang compose ps`

## Troubleshooting

1. **Build failures**: Check that all dependencies are properly listed in `package.json`
2. **Memory issues**: Increase memory limits in `compose.yaml` if needed
3. **Port conflicts**: Ensure port 3000 is available or change the port mapping

For more information, visit: https://docs.defang.io/
