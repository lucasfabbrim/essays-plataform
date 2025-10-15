"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import { Icon } from "@iconify/react"
import type { EssayEvaluation } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResultadoPage() {
  const params = useParams()
  const router = useRouter()
  const [evaluationData, setEvaluationData] = useState<EssayEvaluation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const evaluationId = params.id as string
    const storedEvaluation = localStorage.getItem(`evaluation_${evaluationId}`)

    if (storedEvaluation) {
      setEvaluationData(JSON.parse(storedEvaluation))
    }

    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="container max-w-5xl mx-auto p-4 space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (!evaluationData) {
    return (
      <div className="container max-w-5xl mx-auto p-4">
        <Card className="p-8 text-center">
          <Icon icon="solar:danger-circle-bold-duotone" className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Avaliação não encontrada</h2>
          <p className="text-muted-foreground mb-4">Não foi possível carregar os resultados desta avaliação.</p>
          <Button onClick={() => router.push("/escrever")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Card>
      </div>
    )
  }

  const totalScore = evaluationData.totalScore * 5 // Convert to 1000 scale
  const competencias = [
    {
      nome: "Competência 1",
      descricao: "Domínio da escrita formal",
      score: evaluationData.scoreByCompetence.comp1,
      desvios: evaluationData.deviationsByCompetence.comp1,
    },
    {
      nome: "Competência 2",
      descricao: "Compreensão da proposta",
      score: evaluationData.scoreByCompetence.comp2,
      desvios: evaluationData.deviationsByCompetence.comp2,
    },
    {
      nome: "Competência 3",
      descricao: "Argumentação",
      score: evaluationData.scoreByCompetence.comp3,
      desvios: evaluationData.deviationsByCompetence.comp3,
    },
    {
      nome: "Competência 4",
      descricao: "Coesão",
      score: evaluationData.scoreByCompetence.comp4,
      desvios: evaluationData.deviationsByCompetence.comp4,
    },
    {
      nome: "Competência 5",
      descricao: "Proposta de intervenção",
      score: evaluationData.scoreByCompetence.comp5,
      desvios: evaluationData.deviationsByCompetence.comp5,
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 180) return "text-green-500"
    if (score >= 140) return "text-blue-500"
    if (score >= 100) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 180) return "bg-green-500/10 border-green-500/20"
    if (score >= 140) return "bg-blue-500/10 border-blue-500/20"
    if (score >= 100) return "bg-yellow-500/10 border-yellow-500/20"
    return "bg-red-500/10 border-red-500/20"
  }

  return (
    <div className="container max-w-5xl mx-auto p-4 space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push("/escrever?tab=historico")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Baixar PDF
          </Button>
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 via-background to-primary/5 border-primary/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Resultado da Correção</h1>
            <p className="text-sm text-muted-foreground">
              Avaliado em{" "}
              {new Date(evaluationData.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="text-center">
            <div className={`text-5xl font-bold ${getScoreColor(totalScore / 5)}`}>{totalScore}</div>
            <div className="text-sm text-muted-foreground mt-1">Nota Total</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center bg-background/50">
            <Icon icon="solar:document-text-bold-duotone" className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{evaluationData.grammarErrors}</div>
            <div className="text-xs text-muted-foreground">Erros Gramaticais</div>
          </Card>
          <Card className="p-4 text-center bg-background/50">
            <Icon icon="solar:chat-round-dots-bold-duotone" className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{evaluationData.punctuationIssues}</div>
            <div className="text-xs text-muted-foreground">Problemas de Pontuação</div>
          </Card>
          <Card className="p-4 text-center bg-background/50">
            <Icon icon="solar:chart-2-bold-duotone" className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{evaluationData.coherenceScore}</div>
            <div className="text-xs text-muted-foreground">Score de Coerência</div>
          </Card>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon icon="solar:clipboard-list-bold-duotone" className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Avaliação por Competência</h2>
            <p className="text-sm text-muted-foreground">Análise detalhada de cada competência do ENEM</p>
          </div>
        </div>

        <div className="space-y-4">
          {competencias.map((comp, idx) => (
            <Card key={idx} className={`p-4 ${getScoreBgColor(comp.score)}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      C{idx + 1}
                    </Badge>
                    <h3 className="font-semibold">{comp.nome}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{comp.descricao}</p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getScoreColor(comp.score)}`}>{comp.score}</div>
                  <div className="text-xs text-muted-foreground">de 200</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-semibold">{Math.round((comp.score / 200) * 100)}%</span>
                </div>
                <Progress value={(comp.score / 200) * 100} className="h-2" />
                {comp.desvios > 0 && (
                  <div className="flex items-center gap-2 text-xs text-destructive">
                    <Icon icon="solar:danger-triangle-bold-duotone" className="h-4 w-4" />
                    <span>{comp.desvios} desvio(s) identificado(s)</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon icon="solar:chat-round-line-bold-duotone" className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Comentários de Feedback</h2>
            <p className="text-sm text-muted-foreground">Observações sobre sua redação</p>
          </div>
        </div>

        <div className="space-y-3">
          {evaluationData.feedbackComments.map((comment, idx) => (
            <div key={idx} className="flex gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <Icon icon="solar:check-circle-bold-duotone" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm">{comment}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon icon="solar:document-text-bold-duotone" className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Revisão Comentada</h2>
            <p className="text-sm text-muted-foreground">Análise geral da sua redação</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 border">
          <p className="text-sm leading-relaxed">{evaluationData.commentedReview}</p>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button onClick={() => router.push("/escrever")} className="flex-1">
          <Icon icon="solar:pen-new-square-bold-duotone" className="mr-2 h-4 w-4" />
          Escrever Nova Redação
        </Button>
        <Button variant="outline" onClick={() => router.push("/escrever?tab=historico")} className="flex-1">
          <Icon icon="solar:history-bold-duotone" className="mr-2 h-4 w-4" />
          Ver Histórico
        </Button>
      </div>
    </div>
  )
}
