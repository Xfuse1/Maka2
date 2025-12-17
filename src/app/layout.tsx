import "@/styles/globals.css";
import type React from "react"
import Script from "next/script"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import { getStoreSettingsServer } from "@/lib/store-settings"
import { Suspense } from "react"
import DesignProvider from "@/components/providers/design-provider"
import { DesignSyncProvider } from "@/components/design/design-sync-provider"
import { WebVitals } from "@/components/web-vitals"
import { StoreInitializer } from "@/components/store-initializer"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo", 
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getStoreSettingsServer()
  return {
    title: settings?.store_name || "مكة - متجر الأزياء النسائية الراقية",
    description: settings?.store_description || "اكتشفي مجموعتنا الحصرية من العبايات والكارديجان والبدل والفساتين",
    generator: "v0.app",
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    themeColor: '#FFB6C1',
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getStoreSettingsServer()

  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Preconnect to critical origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://bbzjxcjfmeoiojjnfvfa.supabase.co" />
        <link rel="preconnect" href="https://bbzjxcjfmeoiojjnfvfa.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.postimg.cc" />
      </head>
      <body className={`font-sans ${cairo.variable} antialiased text-foreground bg-background`}>
        <WebVitals />
        <DesignProvider />
        <DesignSyncProvider>
          <StoreInitializer settings={settings} />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </DesignSyncProvider>
      </body>
    </html>
  )
}
