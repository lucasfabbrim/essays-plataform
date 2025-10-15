"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function RedacoesPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="lg:hidden flex-shrink-0 border-b bg-background">
        <div className="container max-w-7xl mx-auto px-3 py-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
      </div>

      <div className="flex-shrink-0 border-b bg-gradient-to-r from-primary/5 via-background to-primary/5 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Icon icon="solar:document-bold-duotone" className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Redações
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl mx-auto px-3 md:px-6 py-4 md:py-6">
          <div className="grid gap-3">
            <Card
              className="p-4 hover:border-primary/50 transition-all cursor-pointer group bg-gradient-to-br from-background to-primary/5"
              onClick={() => router.push("/escrever")}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon icon="solar:pen-new-square-bold-duotone" className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                    Corrigir minha redação por IA
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Escreva uma nova redação e receba correção detalhada com nota por competência
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-primary">
                    <Icon icon="solar:arrow-right-bold-duotone" className="h-3.5 w-3.5" />
                    <span className="font-medium">Começar agora</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 hover:border-primary/50 transition-all cursor-pointer group bg-gradient-to-br from-background to-primary/5"
              onClick={() => router.push("/minhas-redacoes")}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon icon="solar:documents-bold-duotone" className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                    Minhas redações
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Veja todas as suas redações corrigidas e acompanhe seu progresso
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-primary">
                    <Icon icon="solar:arrow-right-bold-duotone" className="h-3.5 w-3.5" />
                    <span className="font-medium">Ver redações</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
