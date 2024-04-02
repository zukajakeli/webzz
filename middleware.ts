import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["he", "en"],

  defaultLocale: "he",
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
