FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src ./src
RUN npm run build

FROM base AS runner
COPY --from=builder /app/dist ./dist
COPY drizzle ./drizzle
EXPOSE 3000
CMD ["node", "dist/index.js"]
