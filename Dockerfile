# Install dependencies only when needed
FROM node:16-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to unders
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json package-lock.json ./

ARG BUILD_TOKEN
ENV BUILD_TOKEN=${BUILD_TOKEN}

RUN npm config set @mintapp:registry=https://gitlab.com/api/v4/projects/32073459/packages/npm/
RUN npm config set -- '//gitlab.com/api/v4/projects/32073459/packages/npm/:_authToken' "${BUILD_TOKEN}"

RUN npm install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder

ARG API_URL
ENV API_URL=${API_URL}

ARG API_USERNAME
ENV API_USERNAME=${API_USERNAME}

ARG API_PASSWORD
ENV API_PASSWORD=${API_PASSWORD}

ARG ENV="staging"
ENV ENV=${ENV}

ARG ORIGIN
ENV ORIGIN=${ORIGIN}

ARG GTM_ID
ENV GTM_ID=${GTM_ID}

ARG AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY
ENV AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY=${AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY}

ARG RECAPTCHA_KEY
ENV RECAPTCHA_KEY=${RECAPTCHA_KEY}

ARG GOOGLE_API_KEY
ENV GOOGLE_API_KEY=${GOOGLE_API_KEY}

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# redirects
COPY --from=builder /app/redirects.js ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node",  "server.js"]
