import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/react"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: "es_AR",
    type: "website",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dise%C3%B1o%20sin%20t%C3%ADtulo-6gBTOVX8ULbhKYQdVrEbRaU94uogwv.png",
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#000000",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-svh bg-background font-sans text-foreground">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
