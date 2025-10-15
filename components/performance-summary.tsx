"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, TrendingUp } from "lucide-react"
import { CircularProgress } from "./circular-progress"
import { CompetenceProgress } from "./competence-progress"

interface PerformanceSummaryProps {
  essays: any[]
  loading: boolean
  averageScore: number
  competenceAverages: {
    comp1: number
    comp2: number
    comp3: number
    comp4: number
    comp5: number
  }
}

export function PerformanceSummary({ 
  essays, 
  loading, 
  averageScore, 
  competenceAverages 
}: PerformanceSummaryProps) {


  const getScoreMessage = (score: number) => {
    if (score >= 900) return "Excelente! 🎉"
    if (score >= 800) return "Muito bom! 👏"
    if (score >= 700) return "Bom trabalho! 👍"
    if (score >= 600) return "Continue praticando! 💪"
    return "Vamos melhorar! 📚"
  }

  if (loading) {
    return (
      <Card className="px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <TrendingUp className="h-4 w-4 text-green-950" />
            <h1 className="text-xl sm:text-2xl font-semibold py-4 tracking-tighter">Resumo do desempenho</h1>
          </div>
          
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
        </div>
      </Card>
    )
  }

  return (
    <Card className="px-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <TrendingUp className="h-5 w-5 text-green-950" />
          <h2 className="text-lg font-bold">Resumo do desempenho</h2>
        </div>

        {/* Nota Final Média */}
        <Card className="bg-white hover:shadow-lg hover:border-primary/50">
          <CardHeader className="p-3 sm:p-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10">
                <Star className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <CardTitle className="text-xs sm:text-sm">Nota final média</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 p-3 sm:p-4 pt-0">
            <div className="flex flex-col items-center justify-center py-4 sm:py-6 space-y-3">
              <CircularProgress 
                score={averageScore} 
                maxScore={1000} 
                size="md" 
                loading={loading} 
              />
              
              {essays.length === 0 ? (
                <p className="text-xs font-medium text-black">Comece agora! 🚀</p>
              ) : (
                <p className="text-xs font-medium text-black transition-colors duration-1000">
                  {getScoreMessage(averageScore)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Média por Competência */}
        <Card className="bg-[#EEF2EC] border-emerald-500/20">
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
          <CardContent className="p-3 sm:p-4 pt-0">
            <CompetenceProgress 
              competences={competenceAverages} 
              loading={loading} 
            />
            {essays.length === 0 && (
              <div className="text-center pt-1.5">
                <p className="text-[10px] text-muted-foreground">Envie sua primeira redação</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Card>
  )
}
