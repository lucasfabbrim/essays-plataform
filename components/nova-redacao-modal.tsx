"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Sparkles, X, Camera, Keyboard, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"

interface NovaRedacaoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const temas = [
  {
    id: "livre",
    titulo: "Tema livre",
    descricao: "Escreva sobre qualquer tema.",
    ano: "",
    imagem: "/green-lightbulb.jpg",
  },
  {
    id: "heranca-africana",
    titulo: "Desafios para a valorização da herança africana no Brasil",
    descricao: "",
    ano: "ENEM 2024",
    imagem: "/african-heritage.jpg",
  },
  {
    id: "preconceito-linguistico",
    titulo: "O desafio de combater o preconceito linguístico no Brasil",
    descricao: "",
    ano: "ENEM",
    imagem: "/brazil-map-language.jpg",
  },
  {
    id: "adocao",
    titulo: "Desafios para a promoção da cultura de adoção no Brasil",
    descricao: "",
    ano: "ENEM",
    imagem: "/family-adoption.jpg",
  },
]

export function NovaRedacaoModal({ open, onOpenChange }: NovaRedacaoModalProps) {
  const [step, setStep] = useState(1)
  const [selectedTema, setSelectedTema] = useState<string>("")
  const [metodoEnvio, setMetodoEnvio] = useState<"digitar" | "foto" | "documento" | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const filteredTemas = temas.filter((tema) => tema.titulo.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleTemaSelect = (temaId: string) => {
    setSelectedTema(temaId)
    setStep(2)
  }

  const handleMetodoSelect = (metodo: "digitar" | "foto" | "documento") => {
    setMetodoEnvio(metodo)
    setStep(3)
  }

  const handleContinuar = () => {
    onOpenChange(false)
    router.push(`/escrever?tema=${selectedTema}&metodo=${metodoEnvio}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 max-h-[90vh] overflow-hidden">
        <DialogHeader className="px-4 py-3 bg-primary/20 border-b border-primary/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg flex items-center gap-2">
              Nova redação <span className="text-base">📝</span>
            </DialogTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Step 1: Escolher Tema */}
        {step === 1 && (
          <div className="flex flex-col h-[500px]">
            <div className="p-4 space-y-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar tema"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  Filtros
                </Button>
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  Ordenar
                </Button>
                <Button size="sm" className="h-8 ml-auto">
                  Tema livre ✨
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {filteredTemas.map((tema) => (
                  <button
                    key={tema.id}
                    onClick={() => handleTemaSelect(tema.id)}
                    className="w-full flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-colors text-left"
                  >
                    <img
                      src={tema.imagem || "/placeholder.svg"}
                      alt={tema.titulo}
                      className="w-16 h-16 rounded object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2">{tema.titulo}</h3>
                      {tema.descricao && <p className="text-xs text-muted-foreground mt-1">{tema.descricao}</p>}
                      {tema.ano && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {tema.ano}
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t flex items-center justify-between">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-muted"></div>
                <div className="w-2 h-2 rounded-full bg-muted"></div>
              </div>
              <div className="w-20"></div>
            </div>
          </div>
        )}

        {/* Step 2: Escolher Método de Envio */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Como você quer enviar sua redação?</h3>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleMetodoSelect("digitar")}
                className="w-full flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors text-left"
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <Keyboard className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Digitar Redação</h4>
                  <p className="text-sm text-muted-foreground mt-1">Digite sua redação diretamente no editor.</p>
                </div>
              </button>

              <button
                onClick={() => handleMetodoSelect("foto")}
                className="w-full flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors text-left"
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Enviar Foto</h4>
                  <p className="text-sm text-muted-foreground mt-1">Escreva no papel e envie uma foto da redação.</p>
                </div>
              </button>

              <button
                onClick={() => handleMetodoSelect("documento")}
                className="w-full flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors text-left"
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Enviar Documento</h4>
                  <p className="text-sm text-muted-foreground mt-1">Faça upload de um arquivo PDF ou DOCX.</p>
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted"></div>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-muted"></div>
              </div>
              <div className="w-20"></div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmar e Continuar */}
        {step === 3 && (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-2">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Tudo pronto!</h3>
              <p className="text-sm text-muted-foreground">
                Você escolheu{" "}
                {metodoEnvio === "digitar" ? "digitar" : metodoEnvio === "foto" ? "enviar foto" : "enviar documento"}.
                Vamos começar?
              </p>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(2)}>
                Voltar
              </Button>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted"></div>
                <div className="w-2 h-2 rounded-full bg-muted"></div>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <Button onClick={handleContinuar} className="bg-primary">
                Continuar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
