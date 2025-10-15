import { Card } from "@/components/ui/card"
import { PenLine, BookOpen, TrendingUp, FileText } from "lucide-react"

export function QuickActions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <PenLine className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-base">Nova Redação</h3>
            <p className="text-sm text-muted-foreground">Envie para avaliação</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10 text-chart-2 group-hover:bg-chart-2 group-hover:text-white transition-colors">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-base">Modelos</h3>
            <p className="text-sm text-muted-foreground">Redações exemplares</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10 text-chart-3 group-hover:bg-chart-3 group-hover:text-white transition-colors">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-base">Progresso</h3>
            <p className="text-sm text-muted-foreground">Veja sua evolução</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/10 text-chart-4 group-hover:bg-chart-4 group-hover:text-white transition-colors">
            <FileText className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-base">Histórico</h3>
            <p className="text-sm text-muted-foreground">Todas as redações</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
