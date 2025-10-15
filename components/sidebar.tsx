"use client"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCredits } from "@/lib/credits-context"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Início", href: "/", icon: "solar:home-2-bold-duotone" },
  { name: "Redações", href: "/redacoes", icon: "solar:document-text-bold-duotone" },
  { name: "Modelos", href: "/modelos", icon: "solar:book-2-bold-duotone" },
  { name: "Guia", href: "/guia", icon: "solar:book-bold-duotone" },
]

const secondary = [
  { name: "Perfil", href: "/perfil", icon: "solar:user-circle-bold-duotone" },
  { name: "Suporte", href: "/suporte", icon: "solar:headphones-round-sound-bold-duotone" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { credits, addCredits } = useCredits()
  const { user, signOut } = useAuth()

  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (user?.email) {
      return user.email[0].toUpperCase()
    }
    return "U"
  }

  const isRedacoesActive = pathname === "/redacoes" || pathname === "/escrever" || pathname === "/minhas-redacoes"

  return (
    <aside className="hidden md:block fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Icon icon="solar:pen-bold" className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Essays</span>
          </Link>
        </div>

        <div className="px-4 py-3 border-b border-border space-y-2">
          <button
            onClick={() => addCredits(5)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
          >
            <span className="text-sm font-medium">Créditos</span>
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:dollar-bold-duotone" className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">${credits.toFixed(2)}</span>
            </div>
          </button>

          <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-sm">
            <Icon icon="solar:crown-bold" className="h-4 w-4 mr-2" />
            Explore o Premium
          </Button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = item.href === "/redacoes" ? isRedacoesActive : pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Icon icon={item.icon} className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="border-t border-border pt-4 mt-4 space-y-1">
            {secondary.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Icon icon={item.icon} className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="border-t border-border p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full hover:bg-accent rounded-lg p-2 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {getUserInitials()}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">{user?.displayName || "Usuário"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || "usuario@email.com"}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/perfil" className="flex items-center gap-2">
                  <Icon icon="solar:user-circle-bold" className="h-4 w-4" />
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="text-destructive cursor-pointer">
                <Icon icon="solar:logout-2-bold" className="h-4 w-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  )
}
