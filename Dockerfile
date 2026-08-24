# ============================================
# Stage 1: Dependencies
# ============================================

FROM node:20-slim AS deps

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Your project only has package.json
COPY package.json ./

RUN npm install


# ============================================
# Stage 2: Builder
# ============================================

FROM node:20-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build


# ============================================
# Stage 3: Production
# ============================================

FROM node:20-slim AS production

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -g 1001 nodejs && \
    useradd -r -u 1001 -g nodejs -d /home/nodejs nodejs && \
    mkdir -p /home/nodejs/.npm && \
    chown -R nodejs:nodejs /home/nodejs

# Copy package.json only
COPY package.json ./

# Install dependencies required for next start
RUN npm install --omit=dev

# Copy Next.js build
COPY --from=builder --chown=nodejs:nodejs /app/.next ./.next

# Copy public folder
COPY --from=builder --chown=nodejs:nodejs /app/public ./public

# Copy Next.js config
COPY --from=builder --chown=nodejs:nodejs /app/next.config.ts ./next.config.ts

RUN chown -R nodejs:nodejs /app

USER nodejs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=4002
ENV HOSTNAME=0.0.0.0
ENV NPM_CONFIG_CACHE=/home/nodejs/.npm

EXPOSE 4002

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
    CMD wget -q --spider http://localhost:4002/ || exit 1

CMD ["npm", "start"]