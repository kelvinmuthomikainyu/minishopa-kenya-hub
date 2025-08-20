# Use Node.js 18 Alpine as base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev) for build
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install curl for healthchecks and serve to host static site
RUN apk add --no-cache curl && npm install -g serve

# Copy only the built assets
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]
