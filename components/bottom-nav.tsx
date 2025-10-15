"use client"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Início", href: "/", icon: "solar:home-2-bold-duotone" },
  { name: "Redações", href: "/redacoes", icon: "solar:document-bold-duotone" },
  { name: "Guia", href: "/guia", icon: "solar:book-bold-duotone" },
  { name: "Perfil", href: "/perfil", icon: "solar:user-bold-duotone" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-zinc-950 md:hidden">
      <div className="flex items-center justify-around h-16">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium transition-colors min-w-0 flex-1",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon icon={item.icon} className={cn("h-5 w-5", isActive && "text-primary")} />
              <span className="truncate">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
