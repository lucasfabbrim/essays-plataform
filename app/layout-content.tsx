"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { MobileHeader } from "@/components/mobile-header"
import { BottomNav } from "@/components/bottom-nav"
import { Sidebar } from "@/components/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useAuth()
  const isLoginPage = pathname === "/login"

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/login")
    }
  }, [user, loading, isLoginPage, router])

  if (isLoginPage) {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950">
        <div className="text-center space-y-4">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 md:ml-64 overflow-hidden">
        <MobileHeader />

        <main className="flex-1 overflow-auto pb-20 md:pb-0">{children}</main>

        <BottomNav />
      </div>
    </div>
  )
}
