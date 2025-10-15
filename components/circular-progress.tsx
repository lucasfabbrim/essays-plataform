"use client"

import { useEffect, useState } from "react"
import { Confetti } from "./confetti"

interface CircularProgressProps {
  score: number
  maxScore?: number
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

export function CircularProgress({ 
  score, 
  maxScore = 1000, 
  size = "md", 
  loading = false 
}: CircularProgressProps) {
  const [progressAnimation, setProgressAnimation] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  
  const percentage = (score / maxScore) * 100
  
  // Cor padrão para o círculo de progresso
  const getScoreColorClass = () => "text-green-500"

  // Animação do progresso quando os dados carregam
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setProgressAnimation(percentage)
        
        // Ativar confetes se a nota for 900 ou mais
        if (score >= 900) {
          const confettiTimer = setTimeout(() => {
            setShowConfetti(true)
          }, 1000) // Delay para mostrar confetes após a animação do círculo
          
          return () => clearTimeout(confettiTimer)
        }
      }, 300) // Delay para iniciar a animação
      return () => clearTimeout(timer)
    }
  }, [loading, percentage, score])

  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-40 h-40 sm:w-48 sm:h-48",
    lg: "w-48 h-48 sm:w-56 sm:h-56"
  }

  const circleConfig = {
    sm: { cx: 64, cy: 64, r: 56, strokeWidth: 14, circumference: 352 },
    md: { cx: 80, cy: 80, r: 72, strokeWidth: 16, circumference: 452 },
    lg: { cx: 96, cy: 96, r: 88, strokeWidth: 18, circumference: 553 }
  }

  const textSizeClasses = {
    sm: "text-3xl sm:text-4xl",
    md: "text-4xl sm:text-5xl", 
    lg: "text-5xl sm:text-6xl"
  }

  const config = circleConfig[size]
  const animatedCircumference = (progressAnimation / 100) * config.circumference

  return (
    <>
      <div className="relative">
        <svg className={`${sizeClasses[size]} transform -rotate-90`}>
          {/* Círculo de fundo */}
          <circle
            cx={config.cx}
            cy={config.cy}
            r={config.r}
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            fill="none"
            className="text-green-100"
          />
          {/* Círculo de progresso animado */}
          <circle
            cx={config.cx}
            cy={config.cy}
            r={config.r}
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            fill="none"
            strokeDasharray={`${animatedCircumference} ${config.circumference}`}
            strokeDashoffset="0"
            className={`${getScoreColorClass()} transition-all duration-2000 ease-out`}
            style={{
              strokeLinecap: 'round'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${textSizeClasses[size]} font-bold text-green-950 transition-colors duration-1000`}>
            {score}
          </span>
          <span className="text-xs sm:text-sm text-green-950 font-medium">pontos</span>
        </div>
      </div>
      
      {/* Efeito de confetes para notas 900+ */}
      {showConfetti && <Confetti trigger={showConfetti} duration={4000} />}
    </>
  )
}
