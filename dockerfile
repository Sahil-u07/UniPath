# -------- BASE --------
    FROM node:20-alpine AS base
    WORKDIR /app
    
    # -------- DEPENDENCIES --------
    FROM base AS deps
    COPY package*.json ./
    COPY prisma ./prisma
    RUN npm config set fetch-retry-maxtimeout 120000 && \
        npm config set fetch-retry-mintimeout 15000 && \
        npm config set fetch-timeout 300000 && \
        npm install --network-timeout=300000
    
    # -------- BUILD --------
    FROM base AS build
    
    # Build arguments
    ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    ARG CLERK_SECRET_KEY
    ARG DATABASE_URL
    
    # Set environment variables for build
    ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
    ENV DATABASE_URL=$DATABASE_URL
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    RUN npx prisma generate
    RUN npm run build
    
    # -------- RUN --------
    FROM node:20-alpine AS runner
    WORKDIR /app
    
    ENV NODE_ENV=production
    
    # Runtime environment variables
    ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    ARG CLERK_SECRET_KEY
    ARG DATABASE_URL
    
    ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
    ENV DATABASE_URL=$DATABASE_URL
    
    COPY --from=build /app/package.json ./package.json
    COPY --from=build /app/node_modules ./node_modules
    COPY --from=build /app/.next ./.next
    COPY --from=build /app/public ./public
    COPY --from=build /app/prisma ./prisma
    
    EXPOSE 3000
    CMD ["npm", "start"]
    