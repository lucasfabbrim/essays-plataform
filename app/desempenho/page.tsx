"use client"

import { useState } from "react"
import { TrendingUp, Lock, Star, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CircularScore } from "@/components/circular-score"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DesempenhoPage() {
  const [activeTab, setActiveTab] = useState<"redacoes" | "questoes">("redacoes")

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Resumo do desempenho</h1>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent hidden sm:flex">
          Ver desempenho
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Toggle Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "redacoes" ? "default" : "outline"}
          onClick={() => setActiveTab("redacoes")}
          className="rounded-full"
        >
          Redações
        </Button>
        <Button
          variant={activeTab === "questoes" ? "default" : "outline"}
          onClick={() => setActiveTab("questoes")}
          className="rounded-full"
        >
          Questões
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Nota Final Média Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Nota final média
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center py-4">
              <CircularScore score={0} maxScore={1000} size="lg" />
            </div>

            <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4">
              <p className="text-sm text-center">
                <span className="font-semibold">Atenção necessária!</span> ⚠️ Não desanime: continue praticando!
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Banca avaliadora</label>
              <Select defaultValue="enem">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enem">Enem</SelectItem>
                  <SelectItem value="fuvest">Fuvest</SelectItem>
                  <SelectItem value="unicamp">Unicamp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Nota Média por Competência Card */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Nota média por competência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Blurred competencies preview */}
            <div className="space-y-4 blur-sm pointer-events-none">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">C1</span>
                  <span className="text-muted-foreground">0/200</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-0 bg-orange-500 rounded-full" />
                </div>
                <p className="text-xs text-muted-foreground">Domínio da escrita formal da língua portuguesa</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">C2</span>
                  <span className="text-muted-foreground">0/200</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-0 bg-cyan-500 rounded-full" />
                </div>
                <p className="text-xs text-muted-foreground">Compreender o tema e não fugir do que é proposto</p>
              </div>
            </div>

            {/* Premium overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-card/50 via-card/80 to-primary/20 backdrop-blur-[2px]">
              <div className="text-center space-y-6 px-6 max-w-md">
                <Lock className="h-12 w-12 mx-auto text-muted-foreground" />
                <div className="space-y-2">
                  <p className="font-semibold text-lg">Apenas alunos Glau+ podem ver a nota por competência.</p>
                  <p className="text-sm text-muted-foreground">
                    Torne-se Glau+ ver o seu desempenho em cada uma das competências.
                  </p>
                </div>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Star className="h-4 w-4" />
                  Quero Ser Glau+
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button variant="outline" className="w-full gap-2 bg-transparent sm:hidden">
        Ver desempenho
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
