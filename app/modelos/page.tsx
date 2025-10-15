"use client"

import { useState } from "react"
import {
  Eye,
  Star,
  Filter,
  Search,
  FileText,
  Award,
  TrendingUp,
  X,
  BookOpen,
  Lightbulb,
  Target,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icon } from "@iconify/react"
import { LinedTextareaWithNumbers } from "@/components/lined-textarea-with-numbers"

const essayModels = [
  {
    id: 1,
    title: "A importância da educação digital no Brasil",
    theme: "Tecnologia e Educação",
    score: 1000,
    year: 2024,
    competencies: [200, 200, 200, 200, 200],
    preview:
      "A revolução digital transformou profundamente a sociedade contemporânea, impactando diversos setores, incluindo a educação. No Brasil, país marcado por desigualdades sociais e regionais...",
    fullText: `A revolução digital transformou profundamente a sociedade contemporânea, impactando diversos setores, incluindo a educação. No Brasil, país marcado por desigualdades sociais e regionais, a implementação da educação digital representa não apenas uma modernização necessária, mas também uma oportunidade de democratização do acesso ao conhecimento.

Em primeiro lugar, é fundamental reconhecer que a educação digital vai além da simples inserção de computadores nas escolas. Trata-se de um processo complexo que envolve a formação de professores, o desenvolvimento de metodologias adequadas e a criação de conteúdos pedagógicos digitais de qualidade. Segundo dados do IBGE, apenas 46% dos domicílios brasileiros possuem computador, evidenciando a necessidade de políticas públicas que garantam infraestrutura adequada para a implementação efetiva da educação digital.

Além disso, a pandemia de COVID-19 evidenciou a urgência dessa transformação. Durante o período de isolamento social, milhões de estudantes brasileiros ficaram sem acesso às aulas, revelando a fragilidade do sistema educacional diante dos desafios tecnológicos. Essa situação demonstrou que a educação digital não é mais uma opção, mas uma necessidade imperativa para garantir a continuidade do processo educativo em qualquer circunstância.

Portanto, é imprescindível que o governo federal, em parceria com estados e municípios, desenvolva um plano nacional de educação digital que contemple investimentos em infraestrutura, formação docente e produção de conteúdo. Ademais, é necessário estabelecer parcerias com o setor privado para ampliar o acesso à internet e dispositivos eletrônicos, garantindo que todos os estudantes brasileiros possam usufruir dos benefícios da educação digital, independentemente de sua condição socioeconômica.`,
    highlights: ["Estrutura perfeita", "Argumentação sólida", "Proposta completa"],
  },
  {
    id: 2,
    title: "Desafios para a promoção da cultura de adoção no Brasil",
    theme: "Sociedade e Família",
    score: 980,
    year: 2024,
    competencies: [200, 200, 200, 180, 200],
    preview:
      "A adoção representa uma oportunidade de construir vínculos familiares baseados no afeto e no cuidado mútuo. No entanto, no Brasil, diversos desafios dificultam a promoção dessa cultura...",
    fullText: `A adoção representa uma oportunidade de construir vínculos familiares baseados no afeto e no cuidado mútuo. No entanto, no Brasil, diversos desafios dificultam a promoção dessa cultura, resultando em milhares de crianças e adolescentes aguardando por uma família nos abrigos do país.

Primeiramente, é necessário destacar que o preconceito e a falta de informação constituem obstáculos significativos. Muitas pessoas ainda mantêm concepções equivocadas sobre a adoção, preferindo crianças muito pequenas e com características físicas específicas. Segundo o Conselho Nacional de Justiça, enquanto há cerca de 4 mil crianças disponíveis para adoção, existem mais de 30 mil pretendentes cadastrados, evidenciando uma incompatibilidade entre o perfil desejado e a realidade das crianças disponíveis.

Ademais, a burocracia excessiva no processo de adoção também representa um entrave importante. Embora as medidas de segurança sejam necessárias para garantir o bem-estar das crianças, o excesso de procedimentos e a morosidade judicial acabam desestimulando potenciais adotantes e prolongando desnecessariamente o tempo de institucionalização das crianças, prejudicando seu desenvolvimento emocional e social.

Diante desse cenário, é fundamental que o Poder Judiciário, em conjunto com o Ministério da Cidadania, promova campanhas educativas para desconstruir preconceitos e esclarecer a população sobre a realidade da adoção. Paralelamente, é necessário simplificar os trâmites burocráticos, mantendo os cuidados essenciais, mas agilizando o processo. Além disso, deve-se investir em programas de preparação e acompanhamento das famílias adotantes, garantindo o sucesso da adoção e o bem-estar das crianças.`,
    highlights: ["Dados relevantes", "Contextualização histórica", "Proposta detalhada"],
  },
  {
    id: 3,
    title: "O combate ao preconceito linguístico no Brasil",
    theme: "Linguagem e Sociedade",
    score: 960,
    year: 2023,
    competencies: [200, 200, 180, 180, 200],
    preview:
      "A língua portuguesa, em sua riqueza e diversidade, manifesta-se de diferentes formas no território brasileiro. Contudo, essa pluralidade linguística frequentemente é alvo de preconceito...",
    fullText: `A língua portuguesa, em sua riqueza e diversidade, manifesta-se de diferentes formas no território brasileiro. Contudo, essa pluralidade linguística frequentemente é alvo de preconceito, gerando exclusão social e perpetuando desigualdades. O combate ao preconceito linguístico, portanto, configura-se como uma questão fundamental para a construção de uma sociedade mais justa e inclusiva.

Em primeiro lugar, é importante compreender que o preconceito linguístico está intrinsecamente relacionado ao preconceito social. Conforme explica o linguista Marcos Bagno, julgar negativamente determinadas variedades linguísticas significa, na verdade, discriminar os grupos sociais que as utilizam. Essa forma de preconceito manifesta-se cotidianamente em situações como entrevistas de emprego, ambientes escolares e até mesmo nas redes sociais, onde variantes linguísticas populares são frequentemente ridicularizadas.

Além disso, a escola desempenha papel crucial na perpetuação ou no combate a esse preconceito. Tradicionalmente, o ensino de língua portuguesa tem privilegiado a norma culta em detrimento das variações linguísticas, transmitindo a ideia equivocada de que existe uma única forma "correta" de falar. Essa abordagem não apenas desvaloriza a identidade cultural dos estudantes, mas também dificulta o processo de aprendizagem, ao criar uma barreira entre a língua materna e a língua ensinada na escola.

Portanto, é imprescindível que o Ministério da Educação, por meio de suas diretrizes curriculares, promova uma abordagem mais inclusiva do ensino de língua portuguesa, valorizando a diversidade linguística e combatendo estereótipos. Ademais, campanhas de conscientização devem ser realizadas em diversos espaços sociais, esclarecendo que todas as variedades linguísticas são legítimas e funcionais. Somente assim será possível construir uma sociedade que respeite e valorize a riqueza da diversidade linguística brasileira.`,
    highlights: ["Referências teóricas", "Análise crítica", "Coesão exemplar"],
  },
  {
    id: 4,
    title: "Desafios da mobilidade urbana nas grandes cidades brasileiras",
    theme: "Urbanização e Transporte",
    score: 940,
    year: 2023,
    competencies: [200, 180, 180, 180, 200],
    preview:
      "O crescimento acelerado das cidades brasileiras trouxe consigo diversos desafios, sendo a mobilidade urbana um dos mais críticos. O trânsito caótico, a superlotação do transporte público...",
    fullText: `O crescimento acelerado das cidades brasileiras trouxe consigo diversos desafios, sendo a mobilidade urbana um dos mais críticos. O trânsito caótico, a superlotação do transporte público e a poluição atmosférica são apenas algumas das consequências de um modelo de desenvolvimento urbano que priorizou o transporte individual em detrimento de soluções coletivas e sustentáveis.

Inicialmente, é fundamental reconhecer que a priorização do automóvel particular nas políticas urbanas brasileiras resultou em cidades estruturadas para carros, não para pessoas. Segundo dados da ANTP, os automóveis ocupam 60% do espaço viário, mas transportam apenas 30% da população. Essa disparidade evidencia a ineficiência do modelo atual e a necessidade urgente de repensar as prioridades no planejamento urbano.

Ademais, a precariedade do transporte público agrava significativamente o problema. Ônibus superlotados, metrôs insuficientes e tarifas elevadas desestimulam o uso do transporte coletivo, levando mais pessoas a optarem pelo transporte individual. Esse ciclo vicioso intensifica os congestionamentos, aumenta o tempo de deslocamento e prejudica a qualidade de vida da população, especialmente dos trabalhadores que residem nas periferias.

Diante desse cenário, é imprescindível que as prefeituras, em parceria com os governos estaduais, invistam massivamente na ampliação e modernização do transporte público, tornando-o mais eficiente, confortável e acessível. Paralelamente, deve-se implementar políticas de incentivo ao transporte não motorizado, como a criação de ciclovias e calçadas adequadas. Além disso, é necessário adotar medidas de restrição ao uso do automóvel em áreas centrais, como rodízio e pedágios urbanos, destinando os recursos arrecadados para melhorias no transporte coletivo.`,
    highlights: ["Dados estatísticos", "Análise sistêmica", "Múltiplas soluções"],
  },
  {
    id: 5,
    title: "A importância da saúde mental na sociedade contemporânea",
    theme: "Saúde e Bem-estar",
    score: 920,
    year: 2023,
    competencies: [180, 180, 180, 180, 200],
    preview:
      "A saúde mental tem ganhado crescente visibilidade nos debates públicos, especialmente após a pandemia de COVID-19. No entanto, apesar dos avanços na discussão do tema...",
    fullText: `A saúde mental tem ganhado crescente visibilidade nos debates públicos, especialmente após a pandemia de COVID-19. No entanto, apesar dos avanços na discussão do tema, o Brasil ainda enfrenta desafios significativos no cuidado e na prevenção de transtornos mentais, evidenciando a necessidade de políticas públicas mais efetivas nessa área.

Primeiramente, é importante destacar que o estigma social em torno das questões de saúde mental continua sendo um obstáculo importante. Muitas pessoas ainda relutam em buscar ajuda profissional por medo de serem rotuladas ou discriminadas. Segundo a Organização Mundial da Saúde, o Brasil é o país mais ansioso do mundo, com 9,3% da população sofrendo de transtornos de ansiedade, mas apenas uma pequena parcela recebe tratamento adequado.

Além disso, a insuficiência de recursos e profissionais especializados no Sistema Único de Saúde agrava o problema. A rede de Centros de Atenção Psicossocial (CAPS), embora importante, é insuficiente para atender à demanda crescente. Ademais, a formação de profissionais de saúde ainda é deficiente no que se refere à abordagem de questões de saúde mental, resultando em diagnósticos tardios e tratamentos inadequados.

Portanto, é fundamental que o Ministério da Saúde amplie significativamente os investimentos em saúde mental, expandindo a rede CAPS e capacitando profissionais de saúde em todos os níveis de atenção. Paralelamente, campanhas de conscientização devem ser realizadas para combater o estigma e incentivar a busca por ajuda. Além disso, é necessário implementar programas de prevenção em escolas e ambientes de trabalho, promovendo o bem-estar emocional e identificando precocemente situações de risco.`,
    highlights: ["Tema atual", "Dados da OMS", "Abordagem humanizada"],
  },
  {
    id: 6,
    title: "Democratização do acesso ao cinema no Brasil",
    theme: "Cultura e Arte",
    score: 900,
    year: 2022,
    competencies: [180, 180, 160, 180, 200],
    preview:
      "O cinema, como expressão artística e cultural, desempenha papel fundamental na formação crítica e no entretenimento da população. Contudo, no Brasil, o acesso a essa forma de arte...",
    fullText: `O cinema, como expressão artística e cultural, desempenha papel fundamental na formação crítica e no entretenimento da população. Contudo, no Brasil, o acesso a essa forma de arte permanece restrito a uma parcela privilegiada da sociedade, evidenciando a necessidade de políticas públicas que democratizem o acesso às salas de cinema e à produção cinematográfica nacional.

Em primeiro lugar, é necessário reconhecer que a concentração de salas de cinema em shopping centers e regiões centrais das grandes cidades exclui grande parte da população, especialmente aquela residente em periferias e cidades menores. Segundo dados da Ancine, 92% dos municípios brasileiros não possuem salas de cinema, privando milhões de pessoas do acesso a essa forma de cultura e lazer. Essa realidade reflete e perpetua desigualdades sociais e regionais.

Ademais, o alto custo dos ingressos constitui outra barreira significativa. Com preços que podem ultrapassar R$ 50,00 em algumas cidades, ir ao cinema tornou-se um luxo inacessível para grande parte da população brasileira. Essa situação é agravada pela falta de políticas de incentivo, como programas de meia-entrada ampliados ou sessões populares, que poderiam facilitar o acesso de grupos economicamente vulneráveis.

Diante desse cenário, é imprescindível que o Ministério da Cultura, em parceria com governos estaduais e municipais, implemente um programa nacional de democratização do acesso ao cinema. Esse programa deve incluir a construção de salas de cinema em periferias e cidades do interior, subsidiadas pelo poder público. Além disso, é necessário estabelecer políticas de preços acessíveis e criar circuitos alternativos de exibição, como cineclubes e sessões ao ar livre. Somente assim será possível garantir que o cinema cumpra seu papel como bem cultural acessível a todos os brasileiros.`,
    highlights: ["Dados da Ancine", "Questão social", "Proposta viável"],
  },
]

export default function ModelosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTheme, setFilterTheme] = useState("all")
  const [selectedEssay, setSelectedEssay] = useState<(typeof essayModels)[0] | null>(null)

  const themes = ["all", ...Array.from(new Set(essayModels.map((e) => e.theme)))]

  const filteredEssays = essayModels.filter((essay) => {
    const matchesSearch =
      essay.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      essay.theme.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTheme = filterTheme === "all" || essay.theme === filterTheme
    return matchesSearch && matchesTheme
  })

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-3 md:px-6 py-4 md:py-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">Modelos de Redação</h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                Explore redações nota 1000 e aprenda com os melhores exemplos
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
            <div className="bg-background rounded-lg p-2 md:p-3 border border-border">
              <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                <Award className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                <span className="text-xs md:text-sm font-medium">Modelos</span>
              </div>
              <p className="text-lg md:text-2xl font-bold">{essayModels.length}</p>
            </div>
            <div className="bg-background rounded-lg p-2 md:p-3 border border-border">
              <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-500" />
                <span className="text-xs md:text-sm font-medium">Nota Média</span>
              </div>
              <p className="text-lg md:text-2xl font-bold">950</p>
            </div>
            <div className="bg-background rounded-lg p-2 md:p-3 border border-border">
              <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                <span className="text-xs md:text-sm font-medium">Temas</span>
              </div>
              <p className="text-lg md:text-2xl font-bold">{themes.length - 1}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título ou tema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 md:h-10 text-sm"
              />
            </div>
            <Select value={filterTheme} onValueChange={setFilterTheme}>
              <SelectTrigger className="w-full sm:w-[200px] h-9 md:h-10 text-sm">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os temas</SelectItem>
                {themes.slice(1).map((theme) => (
                  <SelectItem key={theme} value={theme}>
                    {theme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Essay Grid */}
      <div className="container mx-auto px-3 md:px-6 py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {filteredEssays.map((essay) => (
            <div
              key={essay.id}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              {/* Card Header */}
              <div className="p-3 md:p-4 border-b border-border bg-gradient-to-br from-primary/5 to-transparent">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {essay.theme}
                  </Badge>
                  <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-bold text-yellow-600 dark:text-yellow-500">{essay.score}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  {essay.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{essay.preview}</p>
              </div>

              {/* Competencies */}
              <div className="p-3 md:p-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">Competências ENEM</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {essay.competencies.map((score, idx) => (
                    <div key={idx} className="text-center">
                      <div
                        className={`text-xs font-bold py-1 rounded ${
                          score === 200
                            ? "bg-green-500/10 text-green-600 dark:text-green-500"
                            : score >= 180
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-500"
                              : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500"
                        }`}
                      >
                        {score}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">C{idx + 1}</p>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {essay.highlights.map((highlight, idx) => (
                    <Badge key={idx} variant="outline" className="text-[10px] md:text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-3 md:p-4 pt-0">
                <Button
                  size="sm"
                  className="w-full h-8 text-xs bg-primary hover:bg-primary/90"
                  onClick={() => setSelectedEssay(essay)}
                >
                  <Eye className="h-3 w-3 mr-1.5" />
                  Visualizar Modelo
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredEssays.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum modelo encontrado</h3>
            <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou buscar por outros termos</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {selectedEssay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-background rounded-xl shadow-2xl w-full h-full md:h-[95vh] md:max-w-7xl overflow-hidden border border-primary/20 animate-in zoom-in-95 duration-200 flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 border-b bg-gradient-to-r from-primary/5 via-background to-primary/5 backdrop-blur-sm">
              <div className="px-4 py-4">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold truncate">{selectedEssay.title}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {selectedEssay.theme}
                        </Badge>
                        <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded-full">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs font-bold text-yellow-600 dark:text-yellow-500">
                            {selectedEssay.score}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedEssay(null)}
                    className="h-9 w-9 hover:bg-primary/10 flex-shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-4 p-4">
              {/* Left: Essay Text in Notebook Format */}
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex-1 min-h-0">
                  <LinedTextareaWithNumbers
                    value={selectedEssay.fullText}
                    onChange={() => {}}
                    fontSize={16}
                    disabled
                    className="cursor-default"
                  />
                </div>
              </div>

              {/* Right: Analysis Panel */}
              <div className="w-full md:w-96 flex-shrink-0 overflow-y-auto space-y-4 bg-muted/30 rounded-lg p-4 border border-border">
                {/* Competencies */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-sm">Competências ENEM</h3>
                  </div>
                  <div className="space-y-2">
                    {selectedEssay.competencies.map((score, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-12 text-center">
                          <div
                            className={`text-xs font-bold py-1.5 rounded ${
                              score === 200
                                ? "bg-green-500/10 text-green-600 dark:text-green-500"
                                : score >= 180
                                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-500"
                                  : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500"
                            }`}
                          >
                            {score}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium">Competência {idx + 1}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {idx === 0 && "Domínio da escrita formal"}
                            {idx === 1 && "Compreensão do tema"}
                            {idx === 2 && "Argumentação"}
                            {idx === 3 && "Coesão textual"}
                            {idx === 4 && "Proposta de intervenção"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-sm">Pontos Fortes</h3>
                  </div>
                  <div className="space-y-2">
                    {selectedEssay.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 bg-primary/5 rounded-lg p-2 border border-primary/10"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-foreground">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:document-text-bold-duotone" className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-sm">Análise Detalhada</h3>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="bg-background rounded-lg p-3 border border-border">
                      <h4 className="font-semibold text-primary mb-1.5">📝 Estrutura</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Redação perfeitamente estruturada com introdução contextualizadora, desenvolvimento com dois
                        parágrafos argumentativos bem fundamentados e conclusão com proposta de intervenção completa.
                      </p>
                    </div>

                    <div className="bg-background rounded-lg p-3 border border-border">
                      <h4 className="font-semibold text-primary mb-1.5">💡 Argumentação</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Utiliza dados estatísticos, referências a autores/instituições e exemplos concretos para
                        fundamentar os argumentos. Demonstra repertório sociocultural produtivo.
                      </p>
                    </div>

                    <div className="bg-background rounded-lg p-3 border border-border">
                      <h4 className="font-semibold text-primary mb-1.5">🔗 Coesão</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Excelente uso de conectivos ("Em primeiro lugar", "Além disso", "Portanto") e elementos coesivos
                        que garantem progressão textual e articulação entre ideias.
                      </p>
                    </div>

                    <div className="bg-background rounded-lg p-3 border border-border">
                      <h4 className="font-semibold text-primary mb-1.5">✅ Proposta</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Proposta de intervenção completa com agente (quem), ação (o quê), modo/meio (como), efeito (para
                        quê) e detalhamento, respeitando os direitos humanos.
                      </p>
                    </div>

                    <div className="bg-background rounded-lg p-3 border border-border">
                      <h4 className="font-semibold text-primary mb-1.5">🎯 O que seguir</h4>
                      <ul className="text-muted-foreground leading-relaxed space-y-1 list-disc list-inside">
                        <li>Contextualização histórica/social na introdução</li>
                        <li>Uso de dados e referências confiáveis</li>
                        <li>Conectivos variados entre parágrafos</li>
                        <li>Proposta detalhada com todos os elementos</li>
                        <li>Linguagem formal e vocabulário rico</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
