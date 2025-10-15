"use client"

import { useEffect, useState } from "react"

interface CompetenceProgressProps {
  competences: {
    comp1: number
    comp2: number
    comp3: number
    comp4: number
    comp5: number
  }
  loading?: boolean
}

export function CompetenceProgress({ competences, loading = false }: CompetenceProgressProps) {
  const [competenceAnimations, setCompetenceAnimations] = useState({ 
    comp1: 0, comp2: 0, comp3: 0, comp4: 0, comp5: 0 
  })

  // Função para determinar a cor específica de cada competência (padrão verde/azul alternado)
  const getCompetenceColorClass = (competencia: number, score: number) => {
    const baseColors = {
      1: "bg-emerald-600", // C1 - Verde
      2: "bg-blue-600",    // C2 - Azul
      3: "bg-emerald-600", // C3 - Verde
      4: "bg-blue-600",    // C4 - Azul
      5: "bg-emerald-600"  // C5 - Verde
    }
    
    // Se a nota for muito baixa, usar tons mais escuros
    if (score < 120) {
      const darkColors = {
        1: "bg-emerald-700", // C1 - Verde escuro
        2: "bg-blue-700",    // C2 - Azul escuro
        3: "bg-emerald-700", // C3 - Verde escuro
        4: "bg-blue-700",    // C4 - Azul escuro
        5: "bg-emerald-700"  // C5 - Verde escuro
      }
      return darkColors[competencia as keyof typeof darkColors]
    }
    
    return baseColors[competencia as keyof typeof baseColors]
  }

  // Função para determinar a cor do texto das competências (padrão verde/azul alternado)
  const getCompetenceTextColorClass = (competencia: number, score: number) => {
    const baseColors = {
      1: "text-emerald-600", // C1 - Verde
      2: "text-blue-600",    // C2 - Azul
      3: "text-emerald-600", // C3 - Verde
      4: "text-blue-600",    // C4 - Azul
      5: "text-emerald-600"  // C5 - Verde
    }
    
    // Se a nota for muito baixa, usar tons mais escuros
    if (score < 120) {
      const darkColors = {
        1: "text-emerald-700", // C1 - Verde escuro
        2: "text-blue-700",    // C2 - Azul escuro
        3: "text-emerald-700", // C3 - Verde escuro
        4: "text-blue-700",    // C4 - Azul escuro
        5: "text-emerald-700"  // C5 - Verde escuro
      }
      return darkColors[competencia as keyof typeof darkColors]
    }
    
    return baseColors[competencia as keyof typeof baseColors]
  }

  // Animação das competências com delay escalonado
  useEffect(() => {
    if (!loading) {
      const competenceTimer = setTimeout(() => {
        setCompetenceAnimations({
          comp1: (competences.comp1 / 200) * 100,
          comp2: (competences.comp2 / 200) * 100,
          comp3: (competences.comp3 / 200) * 100,
          comp4: (competences.comp4 / 200) * 100,
          comp5: (competences.comp5 / 200) * 100,
        })
      }, 500) // Delay adicional para as competências
      
      return () => clearTimeout(competenceTimer)
    }
  }, [loading, competences])

  return (
    <div className="space-y-1.5 sm:space-y-2">
      {[1, 2, 3, 4, 5].map((competencia) => {
        const score = competences[`comp${competencia}` as keyof typeof competences]
        const animatedPercentage = competenceAnimations[`comp${competencia}` as keyof typeof competenceAnimations]

        return (
          <div key={competencia} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">C{competencia}</span>
              <span className={`font-semibold transition-colors duration-1000 ${getCompetenceTextColorClass(competencia, score)}`}>
                {score}/200
              </span>
            </div>
            <div className="relative h-3 sm:h-4 bg-muted rounded-full overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 transition-all duration-2000 ease-out ${getCompetenceColorClass(competencia, score)}`}
                style={{ width: `${animatedPercentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
