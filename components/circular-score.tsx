"use client"

import { cn } from "@/lib/utils"

interface CircularScoreProps {
  score: number
  maxScore: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  label?: string
}

export function CircularScore({
  score,
  maxScore,
  size = "md",
  showLabel = true,
  label = "pontos",
}: CircularScoreProps) {
  const percentage = (score / maxScore) * 100
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const sizeClasses = {
    sm: "h-24 w-24",
    md: "h-32 w-32",
    lg: "h-40 w-40",
  }

  const textSizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
  }

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="h-full w-full -rotate-90 transform">
          {/* Background circle */}
          <circle cx="50%" cy="50%" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-primary transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={cn("font-bold", textSizeClasses[size])}>{score}</div>
            {showLabel && <div className={cn("text-muted-foreground", labelSizeClasses[size])}>{label}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
