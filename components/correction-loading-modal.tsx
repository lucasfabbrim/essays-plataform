"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface CorrectionLoadingModalProps {
  isOpen: boolean
  onComplete: (success: boolean) => void
}

export function CorrectionLoadingModal({ isOpen, onComplete }: CorrectionLoadingModalProps) {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("Analisando sua redação...")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

  useEffect(() => {
    if (!isOpen) {
      setProgress(0)
      setMessage("Analisando sua redação...")
      setStatus("loading")
      return
    }

    // Simulate progress with different stages
    const stages = [
      { progress: 15, message: "Analisando sua redação...", duration: 1000 },
      { progress: 30, message: "Verificando estrutura...", duration: 1200 },
      { progress: 45, message: "Avaliando competências...", duration: 1500 },
      { progress: 60, message: "Calculando nota...", duration: 1300 },
      { progress: 75, message: "Quase lá...", duration: 1000 },
      { progress: 90, message: "Quase lá...", duration: 800 },
      { progress: 98, message: "Finalizando...", duration: 700 },
      { progress: 100, message: "Concluído!", duration: 500 },
    ]

    let currentStage = 0
    let timeoutId: NodeJS.Timeout

    const runStage = () => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage]
        setProgress(stage.progress)
        setMessage(stage.message)

        timeoutId = setTimeout(() => {
          currentStage++
          runStage()
        }, stage.duration)
      } else {
        // Randomly decide success or error (90% success rate)
        const isSuccess = Math.random() > 0.1
        setStatus(isSuccess ? "success" : "error")
        setMessage(isSuccess ? "Correção concluída com sucesso!" : "Erro ao processar correção")

        // Call onComplete after showing result
        setTimeout(() => {
          onComplete(isSuccess)
        }, 2000)
      }
    }

    runStage()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isOpen, onComplete])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg p-6 md:p-8 w-[90%] max-w-md space-y-6 shadow-2xl">
        {status === "loading" && (
          <>
            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-semibold text-center">Processando sua redação</h3>
              <p className="text-sm text-muted-foreground text-center">{message}</p>
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <p className="text-xs text-muted-foreground text-center">{progress}%</p>
            </div>

            <div className="flex justify-center">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          </>
        )}

        {status === "success" && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="relative">
                <CheckCircle2 className="h-20 w-20 text-green-500 animate-in zoom-in duration-500" />
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-green-500">Sucesso!</h3>
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="relative">
                <XCircle className="h-20 w-20 text-red-500 animate-in zoom-in duration-500" />
                <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-red-500">Erro</h3>
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
