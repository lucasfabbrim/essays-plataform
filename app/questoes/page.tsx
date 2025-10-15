import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"

export default function QuestoesPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          Questões
        </h1>
        <p className="text-sm text-muted-foreground">Treine com mais de 180 mil questões do Enem</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Em breve</CardTitle>
          <CardDescription>Estamos preparando milhares de questões para você praticar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <HelpCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Esta funcionalidade estará disponível em breve</p>
            <Button variant="outline">Voltar ao Início</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
