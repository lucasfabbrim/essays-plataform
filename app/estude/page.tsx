import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, FileText } from "lucide-react"

export default function EstudePage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Estude
        </h1>
        <p className="text-sm text-muted-foreground">Acesse videoaulas e resumos completos</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="cursor-pointer transition-colors hover:bg-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Videoaulas
            </CardTitle>
            <CardDescription>Assista videoaulas completas organizadas por disciplina</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Em breve
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-colors hover:bg-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resumos
            </CardTitle>
            <CardDescription>Estude com os 870 resumos detalhados que a Glau preparou</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Em breve
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
