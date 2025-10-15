import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Award } from "lucide-react"

export function ScoreOverview() {
  const totalScore = 840
  const maxScore = 1000
  const percentage = (totalScore / maxScore) * 100
  const improvement = 12

  return (
    <Card className="p-8">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Nota Final Média</h2>
            <p className="text-sm text-muted-foreground">Baseado nas suas últimas 5 redações</p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <TrendingUp className="h-3 w-3" />+{improvement}% este mês
          </Badge>
        </div>

        <div className="flex items-end gap-8">
          <div className="relative">
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-bold tracking-tight">{totalScore}</span>
              <span className="text-3xl text-muted-foreground font-medium">/ {maxScore}</span>
            </div>
            <div className="absolute -bottom-2 left-0 right-0 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="flex-1 grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Redações</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Melhor Nota</p>
              <p className="text-2xl font-bold">920</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Ranking</p>
              <p className="text-2xl font-bold flex items-center gap-1">
                <Award className="h-5 w-5 text-chart-3" />
                Top 15%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
