"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { BookOpen, Lightbulb, Sparkles, Star, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { NovaRedacaoModal } from "@/components/nova-redacao-modal"
import { getMyEssays, type MyEssay } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"

export default function HomePage() {
  const [performanceTab, setPerformanceTab] = useState("redacoes")
  const [essays, setEssays] = useState<MyEssay[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadEssays()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadEssays = async () => {
    setLoading(true)
    const data = await getMyEssays()
    setEssays(data)
    setLoading(false)
  }

  const normalizeScore = (score: number): number => {
    // If score is already in 0-1000 range, return as is
    if (score > 10) return score
    // If score is in 0-10 range, convert to 0-1000
    return score * 100
  }

  const calculateAverageScore = () => {
    if (essays.length === 0) return 0
    const total = essays.reduce((sum, essay) => {
      const score = normalizeScore(essay.evaluation.totalScore || 0)
      return sum + score
    }, 0)
    return Math.round(total / essays.length)
  }

  const calculateCompetenceAverages = () => {
    if (essays.length === 0) return { comp1: 0, comp2: 0, comp3: 0, comp4: 0, comp5: 0 }

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
      comp1: Math.round(totals.comp1 / essays.length),
      comp2: Math.round(totals.comp2 / essays.length),
      comp3: Math.round(totals.comp3 / essays.length),
      comp4: Math.round(totals.comp4 / essays.length),
      comp5: Math.round(totals.comp5 / essays.length),
    }
  }

  const averageScore = calculateAverageScore()
  const competenceAverages = calculateCompetenceAverages()
  const averagePercentage = (averageScore / 1000) * 100

  return (
    <div className="container max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="text-center space-y-1.5 sm:space-y-2 py-2 sm:py-4">
        <h1 className="text-xl sm:text-2xl font-bold text-balance">Bem-vindo ao seu preparatório ENEM</h1>
        <p className="text-sm sm:text-base text-muted-foreground text-balance px-2">
          Escolha uma das opções abaixo para começar sua jornada rumo à nota 1000
        </p>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        <Card className="transition-all hover:shadow-lg hover:border-primary/50">
          <CardHeader className="space-y-2 sm:space-y-2.5 p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 shrink-0">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <CardTitle className="text-sm sm:text-base text-balance">
                Modelos de redação para você tirar 900+
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-balance line-clamp-2">
              Acesse redações nota 1000 e aprenda com os melhores exemplos do ENEM.
            </CardDescription>
            <Link href="/redacoes?tab=modelos" className="block pt-1">
              <Button className="w-full" size="sm">
                Ver modelos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:border-primary/50">
          <CardHeader className="space-y-2 sm:space-y-2.5 p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 shrink-0">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <CardTitle className="text-sm sm:text-base text-balance">
                Explicação da redação do que você deve fazer
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-balance line-clamp-2">
              Entenda passo a passo como construir uma redação nota 1000.
            </CardDescription>
            <Link href="/redacoes?tab=explicacao" className="block pt-1">
              <Button className="w-full" size="sm">
                Ver explicação
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
        </Card>

        <CorrigirRedacaoCard />
      </div>

      <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <h2 className="text-base sm:text-lg font-bold">Resumo do desempenho</h2>
        </div>

        {loading ? (
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-4 w-40" />
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
              <CardHeader className="p-3 sm:p-4 pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10">
                    <Star className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xs sm:text-sm">Nota final média</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 p-3 sm:p-4 pt-0">
                <div className="flex items-center justify-center py-3 sm:py-4">
                  <div className="relative">
                    <svg className="w-24 h-24 sm:w-32 sm:h-32 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="44"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-muted sm:hidden"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        className="text-muted hidden sm:block"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="44"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(averagePercentage / 100) * 276} 276`}
                        className="text-emerald-600 transition-all duration-1000 sm:hidden"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${(averagePercentage / 100) * 352} 352`}
                        className="text-emerald-600 transition-all duration-1000 hidden sm:block"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-emerald-600">{averageScore}</span>
                      <span className="text-[9px] sm:text-xs text-muted-foreground">de 1000</span>
                    </div>
                  </div>
                </div>
                {essays.length === 0 ? (
                  <div className="text-center space-y-0.5 bg-muted/50 p-2 rounded-lg">
                    <p className="text-xs font-medium">Comece agora! 🚀</p>
                    <p className="text-[10px] text-muted-foreground">Envie sua primeira redação</p>
                  </div>
                ) : (
                  <div className="text-center space-y-0.5 bg-emerald-500/10 p-2 rounded-lg">
                    <p className="text-xs font-medium text-emerald-600">
                      {averageScore >= 900
                        ? "Excelente! 🎉"
                        : averageScore >= 700
                          ? "Bom trabalho! 👍"
                          : "Continue praticando! 💪"}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {essays.length} {essays.length === 1 ? "redação" : "redações"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
              <CardHeader className="p-3 sm:p-4 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10">
                      <Star className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <CardTitle className="text-xs sm:text-sm">Média por competência</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-1.5 sm:space-y-2 p-3 sm:p-4 pt-0">
                {[1, 2, 3, 4, 5].map((competencia) => {
                  const score = competenceAverages[`comp${competencia}` as keyof typeof competenceAverages]
                  const percentage = (score / 200) * 100

                  return (
                    <div key={competencia} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">C{competencia}</span>
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
                {essays.length === 0 && (
                  <div className="text-center pt-1.5">
                    <p className="text-[10px] text-muted-foreground">Envie sua primeira redação</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

function CorrigirRedacaoCard() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Card
        className="relative overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 border-emerald-400/50"
        onClick={() => setModalOpen(true)}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />

        <CardHeader className="relative space-y-3 sm:space-y-4 p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/20 backdrop-blur-sm shrink-0">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1 space-y-1.5">
              <CardTitle className="text-base sm:text-xl font-bold text-white text-balance leading-tight">
                Compre correção da sua redação com IA!!!
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-emerald-50/90 text-balance">
                Correção detalhada em minutos com análise das 5 competências do ENEM
              </CardDescription>
            </div>
          </div>

          {/* Features badges */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <Star className="h-3 w-3 text-white" />
              <span className="text-[10px] sm:text-xs font-medium text-white">Nota por competência</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-white" />
              <span className="text-[10px] sm:text-xs font-medium text-white">IA Avançada</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full py-2.5 sm:py-3 px-4 rounded-lg bg-white text-emerald-600 font-bold text-sm sm:text-base hover:bg-emerald-50 transition-all hover:shadow-lg">
            Começar correção agora →
          </button>
        </CardHeader>
      </Card>
      <NovaRedacaoModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
