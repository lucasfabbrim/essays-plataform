import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CreditsProvider } from "@/lib/credits-context"
import { AuthProvider } from "@/contexts/auth-context"
import { LayoutContent } from "./layout-content"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Essays | Plataforma de Redação ENEM",
  description: "Avalie suas redações com IA e alcance nota 1000",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <CreditsProvider>
              <LayoutContent>{children}</LayoutContent>
            </CreditsProvider>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
