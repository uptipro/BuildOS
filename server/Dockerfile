FROM node:20-alpine AS builder

# Cache bust — increment when you need a fresh build
ARG CACHE_BUST=2
RUN echo "Cache bust: $CACHE_BUST"

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm run build

# ─── Production image ───────────────────────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma/

ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "dist/main"]