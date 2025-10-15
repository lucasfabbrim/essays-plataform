"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ChevronRight } from "lucide-react"
import { Icon } from "@iconify/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { EssayEvaluation } from "@/lib/api"

interface CorrectionResultModalProps {
  isOpen: boolean
  onClose: () => void
  evaluation: EssayEvaluation
  essayText: string
  essayTitle?: string
  essayTheme?: string
}

export function CorrectionResultModal({
  isOpen,
  onClose,
  evaluation,
  essayText,
  essayTitle,
  essayTheme,
}: CorrectionResultModalProps) {
  const [activeTab, setActiveTab] = useState("nota")

  if (!isOpen) return null

  const getScoreColor = (score: number) => {
    if (score >= 180) return "text-emerald-500"
    if (score >= 140) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 180) return "bg-emerald-500/10 border-emerald-500/20"
    if (score >= 140) return "bg-yellow-500/10 border-yellow-500/20"
    return "bg-red-500/10 border-red-500/20"
  }

  const getScoreRingColor = (score: number) => {
    if (score >= 180) return "text-emerald-500"
    if (score >= 140) return "text-yellow-500"
    return "text-red-500"
  }

  const getTotalScoreColor = (score: number) => {
    if (score >= 900) return "text-emerald-500"
    if (score >= 700) return "text-yellow-500"
    return "text-red-500"
  }

  const getTotalScoreRingColor = (score: number) => {
    if (score >= 900) return "text-emerald-500"
    if (score >= 700) return "text-yellow-500"
    return "text-red-500"
  }

  const competencias: Record<string, string> = {
    comp1: "Domínio da escrita formal da língua portuguesa",
    comp2: "Compreender a proposta e aplicar conceitos",
    comp3: "Selecionar e organizar informações",
    comp4: "Demonstrar conhecimento da língua",
    comp5: "Proposta de intervenção e respeito aos direitos humanos",
  }

  const essayLines = essayText.split("\n")

  const normalizeScore = (score: number, max: number) => {
    if (score > max) return score
    return Math.round(score * (max / 10))
  }

  const totalScore = normalizeScore(evaluation.evaluation.totalScore, 1000)
  const scoreByCompetence = {
    comp1: normalizeScore(evaluation.evaluation.scoreByCompetence.comp1, 200),
    comp2: normalizeScore(evaluation.evaluation.scoreByCompetence.comp2, 200),
    comp3: normalizeScore(evaluation.evaluation.scoreByCompetence.comp3, 200),
    comp4: normalizeScore(evaluation.evaluation.scoreByCompetence.comp4, 200),
    comp5: normalizeScore(evaluation.evaluation.scoreByCompetence.comp5, 200),
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="flex-shrink-0 border-b bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon icon="solar:document-text-bold-duotone" className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Resultado da Correção</h2>
                <p className="text-sm text-muted-foreground">Análise completa da sua redação</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-10 w-10">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="container max-w-7xl mx-auto h-full">
          <div className="flex flex-col lg:flex-row gap-6 h-full p-4 lg:p-6">
            <div className="hidden lg:flex flex-col flex-1 min-w-0 max-w-2xl">
              <Card className="flex-1 overflow-hidden flex flex-col">
                <div className="p-4 border-b bg-primary/5">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon icon="solar:document-text-bold-duotone" className="h-5 w-5 text-primary" />
                    Sua Redação
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {essayTheme && (
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-start gap-3">
                        <Icon icon="solar:book-2-bold-duotone" className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Tema</p>
                          <p className="text-sm font-semibold">{essayTheme}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {essayTitle && (
                    <div className="text-center py-2">
                      <h4 className="text-lg font-bold">{essayTitle}</h4>
                    </div>
                  )}

                  <div className="space-y-1 font-mono text-sm">
                    {essayLines.map((line, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="text-muted-foreground select-none w-8 text-right flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="flex-1">{line || "\u00A0"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
                <TabsList className="grid w-full grid-cols-6 h-14 bg-primary/5 rounded-lg mb-4">
                  <TabsTrigger
                    value="nota"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white flex flex-col gap-1 py-2"
                  >
                    <Icon icon="solar:star-bold-duotone" className="h-5 w-5" />
                    <span className="text-xs font-semibold">NOTA</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="redacao"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white flex flex-col gap-1 py-2"
                  >
                    <Icon icon="solar:document-text-bold-duotone" className="h-5 w-5" />
                    <span className="text-xs font-semibold">REDAÇÃO</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="desvios"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white flex flex-col gap-1 py-2"
                  >
                    <Icon icon="solar:danger-circle-bold-duotone" className="h-5 w-5" />
                    <span className="text-xs font-semibold">DESVIOS</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="comentarios"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white flex flex-col gap-1 py-2"
                  >
                    <Icon icon="solar:chat-round-dots-bold-duotone" className="h-5 w-5" />
                    <span className="text-xs font-semibold">COMENT.</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="estat"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white flex flex-col gap-1 py-2"
                  >
                    <Icon icon="solar:chart-2-bold-duotone" className="h-5 w-5" />
                    <span className="text-xs font-semibold">ESTAT.</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="tema"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white flex flex-col gap-1 py-2"
                  >
                    <Icon icon="solar:book-2-bold-duotone" className="h-5 w-5" />
                    <span className="text-xs font-semibold">TEMA</span>
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto pr-2">
                  <TabsContent value="nota" className="m-0 space-y-8">
                    <Card className="p-8 lg:p-10">
                      <div className="text-center">
                        <div className="relative inline-flex items-center justify-center mb-8">
                          <svg className="w-64 h-64 md:w-72 md:h-72 transform -rotate-90">
                            <circle
                              cx="50%"
                              cy="50%"
                              r="45%"
                              stroke="currentColor"
                              strokeWidth="12"
                              fill="none"
                              className="text-muted/20"
                            />
                            <circle
                              cx="50%"
                              cy="50%"
                              r="45%"
                              stroke="currentColor"
                              strokeWidth="12"
                              fill="none"
                              strokeDasharray={`${(totalScore / 1000) * 628} 628`}
                              className={`${getTotalScoreRingColor(totalScore)} transition-all duration-1000`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className={`text-7xl md:text-8xl font-bold ${getTotalScoreColor(totalScore)}`}>
                                {totalScore}
                              </div>
                              <div className="text-base text-muted-foreground mt-3">nota final</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-xl text-muted-foreground flex items-center justify-center gap-2">
                          {totalScore >= 900
                            ? "Excelente trabalho!"
                            : totalScore >= 700
                              ? "Bom desempenho!"
                              : "Continue praticando!"}{" "}
                          <Icon icon="solar:emoji-funny-circle-bold-duotone" className="h-7 w-7 text-primary" />
                        </p>
                      </div>
                    </Card>

                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold flex items-center gap-3">
                        <Icon icon="solar:clipboard-list-bold-duotone" className="h-7 w-7 text-primary" />
                        Notas por Competência
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {Object.entries(scoreByCompetence).map(([comp, score]) => (
                          <Card
                            key={comp}
                            className={`p-6 hover:shadow-lg transition-all ${getScoreBgColor(score)} border-2`}
                          >
                            <div className="flex items-center gap-5">
                              <div className="relative flex-shrink-0">
                                <svg className="w-24 h-24 transform -rotate-90">
                                  <circle
                                    cx="48"
                                    cy="48"
                                    r="42"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    className="text-muted/20"
                                  />
                                  <circle
                                    cx="48"
                                    cy="48"
                                    r="42"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${(score / 200) * 264} 264`}
                                    className={`${getScoreRingColor(score)} transition-all duration-1000`}
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</div>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xl font-bold text-primary mb-2">{comp.toUpperCase()}</div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{competencias[comp]}</p>
                                <div className="mt-3 flex items-center gap-2">
                                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className={`h-full ${getScoreRingColor(score)} bg-current transition-all duration-1000`}
                                      style={{ width: `${(score / 200) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-xs font-semibold text-muted-foreground">
                                    {Math.round((score / 200) * 100)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="redacao" className="m-0 space-y-6">
                    {essayTheme && (
                      <Card className="p-6 bg-primary/5 border-primary/20">
                        <div className="flex items-start gap-3">
                          <Icon icon="solar:book-2-bold-duotone" className="h-6 w-6 text-primary mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Tema</p>
                            <p className="text-base font-semibold">{essayTheme}</p>
                          </div>
                        </div>
                      </Card>
                    )}

                    {essayTitle && (
                      <div className="text-center py-3">
                        <h4 className="text-xl font-bold">{essayTitle}</h4>
                      </div>
                    )}

                    <Card className="p-6">
                      <div className="space-y-1 font-mono text-sm">
                        {essayLines.map((line, idx) => (
                          <div key={idx} className="flex gap-4">
                            <span className="text-muted-foreground select-none w-8 text-right flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="flex-1">{line || "\u00A0"}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="desvios" className="m-0 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold flex items-center gap-3">
                        <Icon icon="solar:danger-circle-bold-duotone" className="h-7 w-7 text-primary" />
                        Desvios Encontrados
                      </h3>
                      <Badge variant="secondary" className="text-base px-4 py-2">
                        {Object.values(evaluation.evaluation.deviationsByCompetence).reduce((a, b) => a + b, 0)} total
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      {evaluation.evaluation.grammarErrors > 0 &&
                        Array.from({ length: evaluation.evaluation.grammarErrors }).map((_, idx) => (
                          <Card
                            key={`grammar-${idx}`}
                            className="p-5 border-l-4 border-l-yellow-500 hover:shadow-md transition-all cursor-pointer"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-yellow-500/10">
                                <Icon icon="solar:danger-triangle-bold-duotone" className="h-6 w-6 text-yellow-500" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1 text-base">Erro gramatical</h4>
                                <p className="text-sm text-muted-foreground">
                                  Possível erro de gramática detectado na redação.
                                </p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </Card>
                        ))}

                      {evaluation.evaluation.punctuationIssues > 0 &&
                        Array.from({ length: evaluation.evaluation.punctuationIssues }).map((_, idx) => (
                          <Card
                            key={`punctuation-${idx}`}
                            className="p-5 border-l-4 border-l-orange-500 hover:shadow-md transition-all cursor-pointer"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-orange-500/10">
                                <Icon icon="solar:info-circle-bold-duotone" className="h-6 w-6 text-orange-500" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1 text-base">Pontuação</h4>
                                <p className="text-sm text-muted-foreground">Atenção ao uso correto de pontuação.</p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </Card>
                        ))}

                      {Object.entries(evaluation.evaluation.deviationsByCompetence).map(([comp, count]) =>
                        Array.from({ length: count }).map((_, idx) => (
                          <Card
                            key={`${comp}-${idx}`}
                            className="p-5 border-l-4 border-l-red-500 hover:shadow-md transition-all cursor-pointer"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-red-500/10">
                                <Icon icon="solar:close-circle-bold-duotone" className="h-6 w-6 text-red-500" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1 text-base">Desvio da {comp.toUpperCase()}</h4>
                                <p className="text-sm text-muted-foreground">{competencias[comp]}</p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </Card>
                        )),
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="comentarios" className="m-0 space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Icon icon="solar:chat-round-dots-bold-duotone" className="h-7 w-7 text-primary" />
                        Feedback da Correção
                      </h3>
                      <div className="space-y-4">
                        {evaluation.evaluation.feedbackComments.map((comment, idx) => (
                          <Card key={idx} className="p-6 hover:border-primary/40 transition-all">
                            <div className="flex gap-4">
                              <div className="p-3 rounded-lg bg-primary/10 h-fit">
                                <Icon icon="solar:chat-line-bold-duotone" className="h-6 w-6 text-primary" />
                              </div>
                              <p className="text-base leading-relaxed flex-1">{comment}</p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Icon icon="solar:document-text-bold-duotone" className="h-7 w-7 text-primary" />
                        Revisão Comentada
                      </h3>
                      <Card className="p-8">
                        <p className="text-base leading-relaxed">{evaluation.evaluation.commentedReview}</p>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="estat" className="m-0 space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Icon icon="solar:chart-2-bold-duotone" className="h-7 w-7 text-primary" />
                        Métricas Gerais
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                          {
                            label: "Caracteres",
                            value: essayText.length,
                            icon: "solar:text-bold-duotone",
                            color: "text-blue-500",
                          },
                          {
                            label: "Palavras",
                            value: essayText.trim().split(/\s+/).filter(Boolean).length,
                            icon: "solar:document-bold-duotone",
                            color: "text-green-500",
                          },
                          {
                            label: "Frases",
                            value: essayText.split(/[.!?]+/).filter(Boolean).length,
                            icon: "solar:chat-line-bold-duotone",
                            color: "text-yellow-500",
                          },
                          {
                            label: "Linhas",
                            value: essayLines.length,
                            icon: "solar:list-bold-duotone",
                            color: "text-orange-500",
                          },
                        ].map((metric, idx) => (
                          <Card key={idx} className="p-6 text-center hover:shadow-lg transition-all">
                            <Icon icon={metric.icon} className={`h-10 w-10 ${metric.color} mx-auto mb-4`} />
                            <div className={`text-5xl font-bold ${metric.color} mb-3`}>{metric.value}</div>
                            <div className="text-sm text-muted-foreground font-medium">{metric.label}</div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Icon icon="solar:danger-circle-bold-duotone" className="h-7 w-7 text-primary" />
                        Análise de Desvios
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {Object.entries(evaluation.evaluation.deviationsByCompetence).map(([comp, count]) => (
                          <Card
                            key={comp}
                            className={`p-6 ${count > 5 ? "border-red-500/20 bg-red-500/5" : "border-green-500/20 bg-green-500/5"}`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-muted-foreground mb-2">
                                  {comp.toUpperCase()}
                                </div>
                                <div className={`text-4xl font-bold ${count > 5 ? "text-red-500" : "text-green-500"}`}>
                                  {count}
                                </div>
                              </div>
                              <Icon
                                icon={count > 5 ? "solar:close-circle-bold-duotone" : "solar:check-circle-bold-duotone"}
                                className={`h-14 w-14 ${count > 5 ? "text-red-500" : "text-green-500"}`}
                              />
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="tema" className="m-0 space-y-6">
                    {essayTheme ? (
                      <Card className="p-8">
                        <div className="text-center space-y-4">
                          <Icon icon="solar:book-2-bold-duotone" className="h-16 w-16 text-primary mx-auto" />
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{essayTheme}</h3>
                            <p className="text-sm text-muted-foreground">Tema da redação</p>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <Card className="p-8">
                        <div className="text-center space-y-3">
                          <Icon
                            icon="solar:book-2-bold-duotone"
                            className="h-16 w-16 text-muted-foreground/30 mx-auto"
                          />
                          <h3 className="text-lg font-bold">Tema Livre</h3>
                          <p className="text-sm text-muted-foreground">Nenhum tema específico foi selecionado.</p>
                        </div>
                      </Card>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 border-t bg-gradient-to-r from-background via-primary/5 to-background p-4">
        <div className="container max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Button variant="outline" onClick={onClose} className="h-11 px-6 bg-transparent">
            <Icon icon="solar:arrow-left-bold-duotone" className="mr-2 h-5 w-5" />
            Voltar
          </Button>
          <Button onClick={onClose} className="h-11 px-6 bg-primary hover:bg-primary/90">
            <Icon icon="solar:restart-bold-duotone" className="mr-2 h-5 w-5" />
            Nova Correção
          </Button>
        </div>
      </div>
    </div>
  )
}
