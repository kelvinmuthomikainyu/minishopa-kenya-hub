# Backend API Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency manifests first for better caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev && apk add --no-cache curl

# Copy the rest of the server source
COPY . .

# Expose API port
EXPOSE 5000

# Environment
ENV NODE_ENV=production

# Start the API
CMD ["npm", "start"]
