"use client"

import { CircleDollarSign, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Icon } from "@iconify/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCredits } from "@/lib/credits-context"

export function MobileHeader() {
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white md:hidden">
      <div className="flex h-16 items-center justify-between px-5 ">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-extrabold tracking-tighter text-green-700">ESSAYS</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => addCredits(5)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-200 border border-primary/20 hover:bg-primary/20 transition-colors"
          >
            <CircleDollarSign className="h-4 w-5 text-green-900" />
            <span className="text-sm font-semibold text-green-900">${credits.toFixed(2)}</span>
          </button>

          <Button size="sm" className="bg-green-200 hover:bg-green-200/90 text-green-900 text-xs h-8 px-2.5 sm:px-3 hidden sm:flex">
            Premium
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-9 sm:w-9 rounded-full">
                <Avatar className="h-9 w-9 border border-primary/20 hover:bg-primary/20 transition-colors">
                  <AvatarFallback className="bg-zinc-200 text-primary-foreground text-xs font-semibold">
                    <UserRound className="h-7 w-7 text-zinc-700" strokeWidth={3} />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.displayName || "Usuário"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email || "usuario@email.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/perfil" className="flex items-center gap-2 cursor-pointer">
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
    </header>
  )
}
