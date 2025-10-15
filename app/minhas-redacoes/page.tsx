"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { getMyEssays, type MyEssay } from "@/lib/api"
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"
import { NovaRedacaoModal } from "@/components/nova-redacao-modal"
import { useAuth } from "@/contexts/auth-context"
import { CorrectionResultModal } from "@/components/correction-result-modal"

export default function MinhasRedacoesPage() {
  const [essays, setEssays] = useState<MyEssay[]>([])
  const [filteredEssays, setFilteredEssays] = useState<MyEssay[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedEssay, setSelectedEssay] = useState<MyEssay | null>(null)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadEssays()
    } else {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEssays(essays)
    } else {
      const filtered = essays.filter(
        (essay) =>
          essay.evaluation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          essay.evaluation.detectedTheme.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredEssays(filtered)
    }
  }, [searchQuery, essays])

  const loadEssays = async () => {
    setLoading(true)
    const data = await getMyEssays()
    setEssays(data)
    setFilteredEssays(data)
    setLoading(false)
  }

  const handleViewEssay = (essay: MyEssay) => {
    setSelectedEssay(essay)
    setViewModalOpen(true)
  }

  const getScoreColor = (score: number) => {
    if (score >= 800) return "text-emerald-500"
    if (score >= 600) return "text-yellow-500"
    return "text-red-500"
  }

  const getDeviationColor = (count: number) => {
    if (count === 0) return "text-emerald-500"
    if (count <= 10) return "text-yellow-500"
    return "text-red-500"
  }

  const normalizeScore = (score: number): number => {
    if (score > 10) return score
    return score * 100
  }

  const calculateAverageScore = () => {
    if (essays.length === 0) return "0"
    const total = essays.reduce((sum, essay) => {
      const score = normalizeScore(essay.evaluation.totalScore || 0)
      return sum + score
    }, 0)
    const average = total / essays.length
    return isNaN(average) ? "0" : Math.round(average).toString()
  }

  const calculateCompetenceAverages = () => {
    if (essays.length === 0) return { comp1: "0", comp2: "0", comp3: "0", comp4: "0", comp5: "0" }

    const totals = essays.reduce(
      (acc, essay) => {
        const scores = essay.evaluation.scoreByCompetence || {}
        return {
          comp1: acc.comp1 + (scores.comp1 > 10 ? scores.comp1 : scores.comp1 * 20),
          comp2: acc.comp2 + (scores.comp2 > 10 ? scores.comp2 : scores.comp2 * 20),
          comp3: acc.comp3 + (scores.comp3 > 10 ? scores.comp3 : scores.comp3 * 20),
          comp4: acc.comp4 + (scores.comp4 > 10 ? scores.comp4 : scores.comp4 * 20),
          comp5: acc.comp5 + (scores.comp5 > 10 ? scores.comp5 : scores.comp5 * 20),
        }
      },
      { comp1: 0, comp2: 0, comp3: 0, comp4: 0, comp5: 0 },
    )

    return {
      comp1: Math.round(totals.comp1 / essays.length).toString(),
      comp2: Math.round(totals.comp2 / essays.length).toString(),
      comp3: Math.round(totals.comp3 / essays.length).toString(),
      comp4: Math.round(totals.comp4 / essays.length).toString(),
      comp5: Math.round(totals.comp5 / essays.length).toString(),
    }
  }

  const averageScore = calculateAverageScore()
  const competenceAverages = calculateCompetenceAverages()

  return (
    <div className="container max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Minhas Redações</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {essays.length} {essays.length === 1 ? "redação" : "redações"} corrigida
            {essays.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-2 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-5 w-40" />
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        essays.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10">
                    <Icon icon="solar:star-bold" className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-sm">Nota Média Geral</h3>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold text-emerald-600">{averageScore}</span>
                  <span className="text-lg text-muted-foreground font-medium">/1000</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-emerald-600 transition-all duration-500"
                    style={{ width: `${(Number.parseInt(averageScore) / 1000) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10">
                    <Icon icon="solar:chart-bold" className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-sm">Média por Competência</h3>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((comp) => {
                    const score = Number.parseInt(competenceAverages[`comp${comp}` as keyof typeof competenceAverages])
                    const percentage = (score / 200) * 100
                    return (
                      <div key={comp} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium">C{comp}</span>
                          <span className="text-emerald-600 font-semibold">{score}/200</span>
                        </div>
                        <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-emerald-600 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      )}

      <Button onClick={() => setModalOpen(true)} className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
        <Icon icon="solar:pen-new-square-bold" className="h-5 w-5 mr-2" />
        Nova redação
      </Button>

      <div className="relative">
        <Icon
          icon="solar:magnifer-bold"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
        />
        <Input
          placeholder="Buscar redação..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-3 sm:p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredEssays.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Icon icon="solar:document-bold-duotone" className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">
              {searchQuery ? "Nenhuma redação encontrada" : "Nenhuma redação ainda"}
            </p>
            <p className="text-sm text-muted-foreground text-center mb-4">
              {searchQuery
                ? "Tente buscar por outro termo"
                : "Comece escrevendo sua primeira redação e receba feedback detalhado"}
            </p>
            {!searchQuery && (
              <Button onClick={() => setModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
                <Icon icon="solar:pen-new-square-bold" className="h-5 w-5 mr-2" />
                Escrever primeira redação
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredEssays.map((essay) => {
            const totalDeviations =
              (essay.evaluation.grammarErrors || 0) +
              (essay.evaluation.punctuationIssues || 0) +
              (essay.evaluation.spellingErrors || 0) +
              (essay.evaluation.agreementErrors || 0)

            const normalizedScore = normalizeScore(essay.evaluation.totalScore || 0)

            return (
              <Card key={essay.id} className="hover:shadow-lg transition-shadow border-border/50">
                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-2.5">
                    <div>
                      <h3 className="text-base font-semibold mb-1.5">{essay.evaluation.title || "Sem título"}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {essay.evaluation.essayText?.substring(0, 120) ||
                          essay.evaluation.highlightedText?.substring(0, 120) ||
                          "Sem preview disponível"}
                        ...
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs">
                      <Icon icon="solar:document-text-bold-duotone" className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-muted-foreground line-clamp-1">{essay.evaluation.detectedTheme}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Icon icon="solar:star-bold" className="h-3.5 w-3.5 text-emerald-600" />
                        <span className={`font-semibold ${getScoreColor(normalizedScore)}`}>
                          {Math.round(normalizedScore)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Icon icon="solar:calendar-bold-duotone" className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {new Date(essay.createdAt).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Icon icon="solar:danger-circle-bold" className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className={`font-semibold ${getDeviationColor(totalDeviations)}`}>{totalDeviations}</span>
                      </div>
                    </div>

                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleViewEssay(essay)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 h-8 text-xs"
                    >
                      <Icon icon="solar:eye-bold" className="h-3.5 w-3.5 mr-1.5" />
                      Ver detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <NovaRedacaoModal open={modalOpen} onOpenChange={setModalOpen} />

      {selectedEssay && (
        <CorrectionResultModal
          isOpen={viewModalOpen}
          onClose={() => {
            setViewModalOpen(false)
            setSelectedEssay(null)
          }}
          evaluation={selectedEssay}
          essayText={selectedEssay.evaluation.essayText || selectedEssay.evaluation.highlightedText || ""}
          essayTitle={selectedEssay.evaluation.title}
          essayTheme={selectedEssay.evaluation.detectedTheme}
        />
      )}
    </div>
  )
}
