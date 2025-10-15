import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ChevronRight, Clock } from "lucide-react"

const recentEssays = [
  {
    id: "1",
    title: "Desafios para a valorização da herança africana",
    score: 920,
    status: "reviewed",
    date: "2 dias atrás",
  },
  {
    id: "2",
    title: "Combate ao preconceito linguístico",
    score: 840,
    status: "reviewed",
    date: "5 dias atrás",
  },
  {
    id: "3",
    title: "Cultura de adoção no Brasil",
    score: 780,
    status: "reviewed",
    date: "1 semana atrás",
  },
  {
    id: "4",
    title: "Educação financeira",
    score: 0,
    status: "pending",
    date: "Há 2 horas",
  },
]

export function RecentEssays() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Redações Recentes</h2>
          <Button variant="ghost" size="sm">
            Ver todas
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {recentEssays.map((essay) => (
            <div
              key={essay.id}
              className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-medium text-sm leading-tight line-clamp-2">{essay.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {essay.date}
                </div>
              </div>
              <div className="text-right space-y-1">
                {essay.status === "reviewed" ? (
                  <>
                    <p className="text-lg font-bold">{essay.score}</p>
                    <Badge variant="secondary" className="text-xs">
                      Avaliada
                    </Badge>
                  </>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Pendente
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
