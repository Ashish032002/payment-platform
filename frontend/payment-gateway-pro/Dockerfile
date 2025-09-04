# --- deps ---
FROM node:20-alpine AS deps
WORKDIR /app
# sharp / next image needs this on alpine
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci

# --- build ---
FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# PUBLIC envs must be present at build-time for client code
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
RUN npm run build

# --- run (standalone) ---
FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# copy standalone output
COPY --from=build /app/.next/standalone ./
# static assets

COPY --from=build /app/.next/static ./.next/static
# expose and start
EXPOSE 3000
CMD ["node", "server.js"]
