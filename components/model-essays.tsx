"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Star, Eye, Download, ChevronRight } from "lucide-react"

const modelEssays = [
  {
    id: "1",
    title: "Desafios para a valorização da herança africana no Brasil",
    score: 1000,
    year: "ENEM 2024",
    views: 1234,
    category: "Sociedade",
    preview:
      "A herança africana no Brasil é um patrimônio cultural inestimável que permeia diversos aspectos da sociedade brasileira...",
  },
  {
    id: "2",
    title: "O desafio de combater o preconceito linguístico no Brasil",
    score: 980,
    year: "ENEM 2024",
    views: 987,
    category: "Educação",
    preview: "O preconceito linguístico é uma forma de discriminação que afeta milhões de brasileiros diariamente...",
  },
  {
    id: "3",
    title: "Desafios para a promoção da cultura de adoção no Brasil",
    score: 960,
    year: "ENEM 2024",
    views: 856,
    category: "Sociedade",
    preview: "A adoção no Brasil enfrenta diversos desafios que dificultam o processo e prolongam o tempo de espera...",
  },
  {
    id: "4",
    title: "A importância da educação financeira na vida do brasileiro",
    score: 940,
    year: "ENEM 2024",
    views: 743,
    category: "Economia",
    preview: "A educação financeira é fundamental para o desenvolvimento econômico e social do país...",
  },
]

export function ModelEssays() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredEssays =
    selectedCategory === "all" ? modelEssays : modelEssays.filter((essay) => essay.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">Modelos de Redação</h2>
          <p className="text-muted-foreground">Aprenda com redações nota 1000 e exemplos comentados</p>
        </div>
        <Button>
          Ver todos os modelos
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="Sociedade">Sociedade</TabsTrigger>
          <TabsTrigger value="Educação">Educação</TabsTrigger>
          <TabsTrigger value="Economia">Economia</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredEssays.map((essay) => (
              <Card key={essay.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          {essay.score}
                        </Badge>
                        <Badge variant="outline">{essay.year}</Badge>
                      </div>
                      <h3 className="font-semibold text-lg leading-tight text-balance">{essay.title}</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10 text-chart-2">
                      <BookOpen className="h-6 w-6" />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{essay.preview}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {essay.views}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {essay.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm">Ler completo</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
