FROM node:20-alpine AS builder

ARG CACHE_BUST=5
RUN echo "Cache bust: $CACHE_BUST"

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY src ./src/
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

# ✅ correct path
CMD ["node", "dist/src/main"]