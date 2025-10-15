"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { X } from "lucide-react"

export function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  title = "Confirmar envio",
  message = "Deseja enviar sua redação para correção?",
  confirmText = "Sim, enviar",
  cancelText = "Cancelar",
  cost = 5,
}: {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  cost?: number
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-background rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-primary/20 animate-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-primary to-primary/80 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Icon icon="solar:question-circle-bold-duotone" className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="text-white hover:bg-white/20 rounded-lg h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Custo da correção:</span>
                <span className="text-lg font-bold text-primary">${cost.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon icon="solar:shield-check-bold-duotone" className="h-4 w-4 text-primary" />
                <span>Correção com IA em segundos</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} className="flex-1 h-11 bg-transparent">
              {cancelText}
            </Button>
            <Button onClick={onConfirm} className="flex-1 h-11 bg-primary hover:bg-primary/90">
              <Icon icon="solar:magic-stick-3-bold-duotone" className="mr-2 h-4 w-4" />
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
