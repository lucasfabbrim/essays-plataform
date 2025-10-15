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
    <html lang="pt-BR" className="white">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={
          <div className="flex min-h-screen items-center justify-center bg-zinc-950">
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-2xl font-bold text-white shadow-lg shadow-emerald-500/20">
                    E
                  </div>
                  <span className="text-2xl font-bold text-white">Essays</span>
                </div>
        
                {/* Spinner */}
                <div className="relative h-16 w-16">
                  {/* Outer ring */}
                  <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-500"></div>
                  {/* Inner ring */}
                  <div className="absolute inset-2 animate-spin rounded-full border-4 border-emerald-400/20 border-t-emerald-400 [animation-direction:reverse] [animation-duration:1.5s]"></div>
                  {/* Center dot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500"></div>
                  </div>
                </div>
        
                <p className="animate-pulse text-sm text-zinc-400">Carregando...</p>
              </div>
          </div>
          
          }>
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
