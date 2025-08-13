# syntax=docker/dockerfile:1

# ---- Build stage ----
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

# Install deps (use npm ci if lockfile exists; fallback to npm install)
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy the rest and build
COPY . .
# BUILD_DIR: Vite -> "dist" (default), CRA -> "build"
ARG BUILD_CMD="npm run build"
ARG BUILD_DIR="dist"
RUN echo "Building with: ${BUILD_CMD}" && ${BUILD_CMD}

# ---- Runtime stage (Nginx) ----
FROM nginx:alpine

# SPA-friendly nginx config
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy static build output
ARG BUILD_DIR="dist"
COPY --from=build /app/${BUILD_DIR} /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
