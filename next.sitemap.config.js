if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
  require("dotenv").config()

module.exports = {
  siteUrl: "https://gitlab.com/mintapp/next.js-base-project",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["*ds/"], //robots without design system page
      },
    ],
  },
}
