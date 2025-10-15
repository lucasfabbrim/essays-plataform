import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const competencies = [
  {
    id: "C1",
    name: "Domínio da escrita formal",
    description: "Domínio da escrita formal da língua portuguesa",
    score: 180,
    maxScore: 200,
    color: "bg-chart-1",
  },
  {
    id: "C2",
    name: "Compreender o tema",
    description: "Compreender o tema e não fugir do que é proposto",
    score: 160,
    maxScore: 200,
    color: "bg-chart-2",
  },
  {
    id: "C3",
    name: "Argumentação",
    description: "Selecionar, relacionar, organizar e interpretar informações",
    score: 170,
    maxScore: 200,
    color: "bg-chart-3",
  },
  {
    id: "C4",
    name: "Coesão textual",
    description: "Conhecimento dos mecanismos linguísticos para construção da argumentação",
    score: 165,
    maxScore: 200,
    color: "bg-chart-4",
  },
  {
    id: "C5",
    name: "Proposta de intervenção",
    description: "Proposta de intervenção e respeito aos direitos humanos",
    score: 165,
    maxScore: 200,
    color: "bg-chart-5",
  },
]

export function CompetencyBreakdown() {
  return (
    <Card className="p-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Desempenho por Competência</h2>
          <Badge variant="outline">5 Competências ENEM</Badge>
        </div>

        <div className="space-y-6">
          {competencies.map((competency) => {
            const percentage = (competency.score / competency.maxScore) * 100
            const status = percentage >= 90 ? "Excelente" : percentage >= 70 ? "Bom" : "Precisa melhorar"

            return (
              <div key={competency.id} className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-muted-foreground">{competency.id}</span>
                      <h3 className="font-semibold">{competency.name}</h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{competency.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-sm text-muted-foreground">{status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{competency.score}</p>
                    <p className="text-sm text-muted-foreground">/ {competency.maxScore}</p>
                  </div>
                </div>
                <Progress value={percentage} className="h-3" indicatorClassName={competency.color} />
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
