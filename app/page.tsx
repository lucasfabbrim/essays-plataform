"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Sparkles, Star, SquareArrowOutUpRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { NovaRedacaoModal } from "@/components/nova-redacao-modal"
import { PerformanceSummary } from "@/components/performance-summary"
import { getMyEssays, type MyEssay } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"

interface QuickAccessCardProps {
  href: string
  title: string
  description: string
  icon: React.ReactNode
}

function QuickAccessCard({ href, title, description, icon }: QuickAccessCardProps) {
  return (
    <Link href={href} className="block pt-1">
      <Card className="transition-all bg-[#EEF2EC] hover:shadow-lg hover:border-primary/50">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 sm:gap-2.5 px-1">
            {icon}
            <CardTitle className="text-lg sm:text-base text-wrap tracking-tighter text-green-950">
              {title}
            </CardTitle>
          </div>
          <CardDescription className="flex flex-row px-1 items-center gap-6">
            <h4 className="text-xs sm:text-base text-zinc-800">{description}</h4>
            <ArrowUpRight className="h-8 w-8 text-green-950"/>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default function HomePage() {
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
    if (score > 10) return score
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

  return (
    <div className="container max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <Card className="flex flex-col px-4">
        <div className="space-y-3 sm:space-y-3">
          <div className="flex items-center gap-2 px-2">
            <SquareArrowOutUpRight className="h-4 w-4 text-green-950" />
            <h1 className="text-xl sm:text-2xl font-semibold py-4 tracking-tighter">Acesso rápido</h1>
          </div>

          <QuickAccessCard
            href="/modelos"
            title="Redações nota 900+"
            description="Acesse redações nota 1000 e aprenda com os melhores exemplos do ENEM."
            icon={<BookOpen className="h-5 w-5 sm:h-5 sm:w-5 text-green-950" />}
          />

          <QuickAccessCard
            href="/redacoes?tab=explicacao"
            title="Redações nota 900+"
            description="Acesse redações nota 1000 e aprenda com os melhores exemplos do ENEM."
            icon={<BookOpen className="h-5 w-5 sm:h-5 sm:w-5 text-green-950" />}
          />

          <CorrigirRedacaoCard />
        </div>
      </Card>

      <PerformanceSummary 
        essays={essays}
        loading={loading}
        averageScore={averageScore}
        competenceAverages={competenceAverages}
      />
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
