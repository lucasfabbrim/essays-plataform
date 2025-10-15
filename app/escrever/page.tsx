"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { useCredits } from "@/hooks/use-credits"
import { Input } from "@/components/ui/input"
import { CorrectionLoadingModal } from "@/components/correction-loading-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Icon } from "@iconify/react"
import { evaluateEssay, type EssayEvaluation } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"
import { LinedTextareaWithNumbers } from "@/components/lined-textarea-with-numbers"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { CorrectionResultModal } from "@/components/correction-result-modal"

const ENEM_THEMES = [
  {
    id: "enem-2024",
    year: "2024",
    title: "Desafios para a valorização da herança africana no Brasil",
    contexto:
      "A herança africana é fundamental para a formação da identidade cultural brasileira, presente na música, dança, culinária, religião e em diversos aspectos da vida cotidiana. Apesar dessa contribuição inestimável, o Brasil ainda enfrenta desafios significativos na valorização e reconhecimento dessa herança. O racismo estrutural, a falta de representatividade nos espaços de poder, o desconhecimento sobre a história e cultura afro-brasileira nas escolas, e a marginalização de manifestações culturais de matriz africana são obstáculos que precisam ser superados. A Lei 10.639/03, que tornou obrigatório o ensino de história e cultura afro-brasileira nas escolas, representa um avanço, mas sua implementação ainda é desigual. Valorizar a herança africana significa reconhecer a contribuição dos povos africanos para a construção do Brasil, combater o racismo e promover a igualdade racial.",
    proposta:
      "A partir da leitura dos textos motivadores e com base nos conhecimentos construídos ao longo de sua formação, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre o tema 'Desafios para a valorização da herança africana no Brasil', apresentando proposta de intervenção que respeite os direitos humanos. Selecione, organize e relacione, de forma coerente e coesa, argumentos e fatos para defesa de seu ponto de vista.",
  },
  {
    id: "enem-2023",
    year: "2023",
    title: "Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil",
    contexto:
      "O trabalho de cuidado, que inclui atividades como cuidar de crianças, idosos, pessoas com deficiência e realizar tarefas domésticas, é essencial para o funcionamento da sociedade. No entanto, esse trabalho é historicamente invisibilizado e desvalorizado, sendo realizado majoritariamente por mulheres de forma não remunerada ou mal remunerada. Essa invisibilidade perpetua desigualdades de gênero, limita as oportunidades profissionais das mulheres e sobrecarrega aquelas que acumulam jornadas de trabalho remunerado e não remunerado. A pandemia de COVID-19 evidenciou ainda mais essa realidade, com o aumento da carga de trabalho doméstico e de cuidado. Reconhecer, valorizar e redistribuir o trabalho de cuidado é fundamental para promover a igualdade de gênero e garantir direitos às mulheres brasileiras.",
    proposta:
      "A partir da leitura dos textos motivadores e com base nos conhecimentos construídos ao longo de sua formação, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre o tema 'Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil', apresentando proposta de intervenção que respeite os direitos humanos. Selecione, organize e relacione, de forma coerente e coesa, argumentos e fatos para defesa de seu ponto de vista.",
  },
  {
    id: "enem-2022",
    year: "2022",
    title: "Desafios para a valorização de comunidades e povos tradicionais no Brasil",
    contexto:
      "O Brasil abriga uma rica diversidade de comunidades e povos tradicionais, incluindo indígenas, quilombolas, ribeirinhos, pescadores artesanais, entre outros. Esses grupos possuem modos de vida, culturas e conhecimentos únicos, desenvolvidos ao longo de gerações em harmonia com o meio ambiente. Apesar de sua importância cultural, social e ambiental, essas comunidades enfrentam diversos desafios: invasão de seus territórios, falta de demarcação e regularização fundiária, preconceito, exclusão social, dificuldade de acesso a serviços públicos básicos e ameaças à preservação de suas tradições. A Constituição Federal de 1988 reconhece direitos a esses povos, mas sua efetivação ainda é limitada. Valorizar comunidades e povos tradicionais significa respeitar seus direitos, proteger seus territórios, preservar suas culturas e reconhecer suas contribuições para a sociedade brasileira.",
    proposta:
      "A partir da leitura dos textos motivadores e com base nos conhecimentos construídos ao longo de sua formação, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre o tema 'Desafios para a valorização de comunidades e povos tradicionais no Brasil', apresentando proposta de intervenção que respeite os direitos humanos. Selecione, organize e relacione, de forma coerente e coesa, argumentos e fatos para defesa de seu ponto de vista.",
  },
]

export default function EscreverPage() {
  const router = useRouter()
  const { credits, deductCredits } = useCredits()
  const { user } = useAuth()

  const [selectedTheme, setSelectedTheme] = useState<(typeof ENEM_THEMES)[0] | null>(null)
  const [titulo, setTitulo] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [palavras, setPalavras] = useState(0)
  const [linhas, setLinhas] = useState(0)
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false)
  const [selectedTimerMinutes, setSelectedTimerMinutes] = useState(25)
  const [timerMinutes, setTimerMinutes] = useState(0)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerActive, setTimerActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [evaluationResult, setEvaluationResult] = useState<EssayEvaluation | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [showThemeModal, setShowThemeModal] = useState(false)

  useEffect(() => {
    const words = conteudo.trim().split(/\s+/).filter(Boolean).length
    const lines = conteudo.split("\n").length
    setPalavras(words)
    setLinhas(lines)
  }, [conteudo])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTimerRunning && timerActive) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1)
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1)
          setTimerSeconds(59)
        } else {
          setIsTimerRunning(false)
          alert("Tempo esgotado! Finalize sua redação.")
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, timerMinutes, timerSeconds, timerActive])

  const handleEnviarClick = () => {
    if (credits < 5) {
      alert("Créditos insuficientes! Você precisa de $5.00 para corrigir uma redação.")
      return
    }

    if (!conteudo.trim()) {
      alert("Por favor, escreva sua redação antes de enviar.")
      return
    }

    if (!user) {
      alert("Você precisa estar logado para enviar uma redação.")
      router.push("/login")
      return
    }

    setShowConfirmation(true)
  }

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false)
    setIsSubmitting(true)
    setIsLoadingModalOpen(true)

    try {
      const evaluation = await evaluateEssay(conteudo)
      const deducted = deductCredits(5)

      if (deducted) {
        setEvaluationResult(evaluation)

        setTimeout(() => {
          setIsLoadingModalOpen(false)
          setIsSubmitting(false)
          setShowResultModal(true)
        }, 2000)
      } else {
        throw new Error("Erro ao deduzir créditos")
      }
    } catch (error) {
      console.error("Error submitting essay:", error)
      setIsLoadingModalOpen(false)
      setIsSubmitting(false)
      alert("Ocorreu um erro ao processar sua redação. Tente novamente.")
    }
  }

  const handleNovaCorrecao = () => {
    setEvaluationResult(null)
    setConteudo("")
    setTitulo("")
    setSelectedTheme(null)
    setShowResultModal(false)
  }

  const startTimer = () => {
    setTimerMinutes(selectedTimerMinutes)
    setTimerSeconds(0)
    setTimerActive(true)
    setIsTimerRunning(true)
    setIsTimerModalOpen(false)
  }

  const formatTime = (mins: number, secs: number) => {
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  if (!selectedTheme) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-shrink-0 border-b bg-gradient-to-r from-primary/5 via-background to-primary/5 backdrop-blur-sm">
          <div className="container max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4">
            <div className="flex items-center gap-2 md:gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="h-9 w-9 hover:bg-primary/10 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <Icon icon="solar:pen-new-square-bold-duotone" className="h-5 w-5 text-primary" />
                <h1 className="text-base md:text-lg font-bold truncate bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Corrigir com IA
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="container max-w-4xl mx-auto px-3 md:px-6 py-4 md:py-6">
            <div className="mb-4">
              <h2 className="text-lg md:text-xl font-bold mb-1">Escolha um tema do ENEM</h2>
              <p className="text-xs text-muted-foreground">Selecione um dos temas dos últimos 3 anos</p>
            </div>

            <div className="grid gap-3">
              {ENEM_THEMES.map((theme) => (
                <Card
                  key={theme.id}
                  className="p-4 hover:border-primary/50 transition-all cursor-pointer group bg-gradient-to-br from-background to-primary/5"
                  onClick={() => setSelectedTheme(theme)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon icon="solar:book-2-bold-duotone" className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-0"
                        >
                          ENEM {theme.year}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-sm md:text-base mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {theme.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{theme.contexto}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-7 text-xs text-primary hover:bg-primary/10 px-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedTheme(theme)
                          setShowThemeModal(true)
                        }}
                      >
                        <Icon icon="solar:eye-bold-duotone" className="mr-1 h-3.5 w-3.5" />
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 border-b bg-gradient-to-r from-primary/5 via-background to-primary/5 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedTheme(null)}
              className="h-9 w-9 hover:bg-primary/10 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1 min-w-0 flex items-center gap-2">
              <Icon icon="solar:pen-new-square-bold-duotone" className="h-5 w-5 text-primary" />
              <h1 className="text-base md:text-lg font-bold truncate bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Escrever Redação
              </h1>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 bg-background/50 backdrop-blur-sm hover:bg-primary/10 transition-all"
                  >
                    <Icon icon="solar:text-bold-duotone" className="h-4 w-4" />
                    <span className="text-xs hidden sm:inline">Fonte</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Icon icon="solar:text-bold-duotone" className="h-4 w-4" />
                    Tamanho da fonte
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFontSize(14)} className="cursor-pointer">
                    <Icon icon="solar:text-circle-bold-duotone" className="mr-2 h-4 w-4" />
                    <span className={fontSize === 14 ? "font-bold text-primary" : ""}>Pequeno (14px)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFontSize(16)} className="cursor-pointer">
                    <Icon icon="solar:text-circle-bold-duotone" className="mr-2 h-4 w-4" />
                    <span className={fontSize === 16 ? "font-bold text-primary" : ""}>Médio (16px)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFontSize(18)} className="cursor-pointer">
                    <Icon icon="solar:text-circle-bold-duotone" className="mr-2 h-4 w-4" />
                    <span className={fontSize === 18 ? "font-bold text-primary" : ""}>Grande (18px)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFontSize(20)} className="cursor-pointer">
                    <Icon icon="solar:text-circle-bold-duotone" className="mr-2 h-4 w-4" />
                    <span className={fontSize === 20 ? "font-bold text-primary" : ""}>Muito Grande (20px)</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTimerModalOpen(true)}
                className={`h-9 gap-2 transition-all ${
                  timerActive
                    ? "bg-primary/10 border-primary/50 hover:bg-primary/20"
                    : "bg-background/50 backdrop-blur-sm hover:bg-primary/10"
                }`}
              >
                <Icon
                  icon={timerActive ? "solar:stopwatch-bold-duotone" : "solar:clock-circle-bold-duotone"}
                  className={`h-4 w-4 ${timerActive ? "text-primary animate-pulse" : ""}`}
                />
                <span className="text-xs hidden sm:inline font-mono">
                  {timerActive ? formatTime(timerMinutes, timerSeconds) : "Timer"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="container max-w-7xl mx-auto h-full">
          <div className="flex gap-4 h-full p-3 md:p-4">
            <div className="flex-1 flex flex-col gap-3 min-w-0 overflow-hidden">
              <div className="relative flex-shrink-0">
                <Icon
                  icon="solar:document-text-bold-duotone"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                />
                <Input
                  placeholder="Título (opcional)"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="bg-background/50 backdrop-blur-sm text-sm pl-10 border-primary/20 focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="flex-shrink-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-lg p-3 flex items-center justify-between gap-2 hover:border-primary/40 transition-all">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Icon icon="solar:book-2-bold-duotone" className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground/80 truncate font-medium">{selectedTheme.title}</p>
                    <p className="text-xs text-muted-foreground">ENEM {selectedTheme.year}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowThemeModal(true)}
                  className="h-7 text-xs hover:bg-primary/10 text-primary flex-shrink-0"
                >
                  <Icon icon="solar:eye-bold-duotone" className="mr-1 h-3.5 w-3.5" />
                  Ver tema
                </Button>
              </div>

              <div className="flex-1 min-h-0">
                <LinedTextareaWithNumbers
                  placeholder="Escreva sua redação aqui..."
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  fontSize={fontSize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 border-t bg-gradient-to-r from-background via-primary/5 to-background backdrop-blur-md shadow-lg">
        <div className="container max-w-7xl mx-auto px-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <Icon icon="solar:text-bold-duotone" className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  <strong className="text-primary font-semibold">{palavras}</strong> palavras
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon icon="solar:document-bold-duotone" className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  <strong className="text-primary font-semibold">{linhas}</strong> linhas
                </span>
              </div>
            </div>
            <Button
              onClick={handleEnviarClick}
              disabled={isSubmitting}
              size="sm"
              className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all h-9 px-4"
            >
              <Icon icon="solar:magic-stick-3-bold-duotone" className="mr-2 h-4 w-4" />
              Enviar para Correção
            </Button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onConfirm={handleConfirmSubmit}
        onCancel={() => setShowConfirmation(false)}
        title="Confirmar envio"
        message="Tem certeza que deseja enviar sua redação para correção? Esta ação custará $5.00 de créditos."
        confirmText="Sim, enviar"
        cancelText="Cancelar"
        cost={5}
      />

      {evaluationResult && (
        <CorrectionResultModal
          isOpen={showResultModal}
          onClose={handleNovaCorrecao}
          evaluation={evaluationResult}
          essayText={conteudo}
          essayTitle={titulo}
          essayTheme={selectedTheme.title}
        />
      )}

      {showThemeModal && selectedTheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-background rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-primary/20 animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-primary/80 p-5 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                  <Icon icon="solar:book-2-bold-duotone" className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Tema da Redação</h2>
                  <p className="text-xs text-white/80">ENEM {selectedTheme.year}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowThemeModal(false)}
                className="text-white hover:bg-white/20 rounded-lg"
              >
                <Icon icon="solar:close-circle-bold-duotone" className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(85vh-80px)]">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="text-xl font-bold text-primary">{selectedTheme.title}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:document-text-bold-duotone" className="h-5 w-5 text-primary" />
                  <h4 className="text-sm font-semibold text-primary">Contexto</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-7">{selectedTheme.contexto}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:clipboard-text-bold-duotone" className="h-5 w-5 text-primary" />
                  <h4 className="text-sm font-semibold text-primary">Proposta</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-7">{selectedTheme.proposta}</p>
              </div>
              <div className="pt-4">
                <Button
                  onClick={() => setShowThemeModal(false)}
                  className="w-full bg-primary hover:bg-primary/90 h-11 shadow-lg"
                >
                  <Icon icon="solar:pen-new-square-bold-duotone" className="mr-2 h-5 w-5" />
                  Entendi, vamos escrever!
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isTimerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-background rounded-xl shadow-2xl max-w-sm w-full overflow-hidden border border-primary/20 animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Timer</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsTimerModalOpen(false)}
                className="text-white hover:bg-white/20 rounded-lg h-8 w-8"
              >
                <Icon icon="solar:close-circle-bold-duotone" className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-sm text-muted-foreground">Notifique-me em:</label>
                <div className="text-center">
                  <div className="text-4xl font-bold font-mono text-primary mb-4">
                    {String(selectedTimerMinutes).padStart(2, "0")}:00
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={selectedTimerMinutes}
                    onChange={(e) => setSelectedTimerMinutes(Number(e.target.value))}
                    className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsTimerModalOpen(false)} className="flex-1 h-11">
                  Cancelar
                </Button>
                <Button onClick={startTimer} className="flex-1 h-11 bg-primary hover:bg-primary/90">
                  Iniciar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CorrectionLoadingModal isOpen={isLoadingModalOpen} onComplete={() => {}} />
    </div>
  )
}
