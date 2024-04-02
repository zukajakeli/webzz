const redirects = require("./redirects")

if (process.env.NODE_ENV === "development") require("dotenv").config()
// const redirects = require("./redirects")

const {
  API_URL,
  ENV,
  ORIGIN,
  GTM_ID,
  RECAPTCHA_KEY,
  AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY,
  GOOGLE_API_KEY,
} = process.env

module.exports = () => ({
  env: {
    API_URL,
    ENV,
    ORIGIN,
    GTM_ID,
    RECAPTCHA_KEY,
    AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY,
    GOOGLE_API_KEY,
  },

  images: {
    domains: [],
    imageSizes: [16, 32, 48, 64], // and redirects file
    deviceSizes: [
      96, 128, 200, 256, 384, 512, 640, 750, 828, 1080, 1200, 1280, 1920, 2048,
      3840,
    ],
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },

  output: "standalone",
  swcMinify: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: true,

  async headers() {
    return [
      {
        source: "/(.*)?", // Matches all pages
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self'; frame-src *.google.com *.facebook.com *.youtube.com/ ${ORIGIN} `,
          },
        ],
      },
    ]
  },

  async redirects() {
    const modified = redirects.map((item) =>
      item.source.includes("?")
        ? {
            ...item,
            source: item.source.split("?")[0],
            has: [
              {
                type: "query",
                key: item.source.split("?")[1].split("=")[0],
                value: item.source.split("?")[1].split("=")[1],
              },
            ],
          }
        : item,
    )

    return modified
  },
})
