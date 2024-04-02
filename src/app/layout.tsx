// import { PageProps } from "@/.next/types/app/[locale]/page";
import { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { Heebo } from "next/font/google"
import { notFound } from "next/navigation"
import ThemeProviders from "@/theme/ThemeProviders"
import { Suspense } from "react"

const heebo = Heebo({
  weight: ["400", "700", "900"],
  subsets: ["latin", "hebrew"],
})

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }]
}

export const metadata: Metadata = {
  icons: [
    { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
    { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "mask-icon", url: "/safari-pinned-tab.svg" },
  ],
  manifest: "/site.webmanifest",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  let messages
  try {
    messages = (await import(`../../messages/${params.locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={params.locale}>
      <body
        className={heebo.className}
        dir={params.locale === "he" ? "rtl" : "ltr"}
      >
        <Suspense fallback={<>Rendering</>}>
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <ThemeProviders locale={params.locale}>
              <>{children}</>
            </ThemeProviders>
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  )
}
