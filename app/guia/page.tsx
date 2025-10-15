"use client"

import { useState } from "react"
import {
  Lightbulb,
  Target,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
  Award,
  Star,
  Zap,
  Brain,
  Trophy,
  BookMarked,
  Quote,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const path1000 = {
  title: "O Caminho para a Nota 1000",
  description: "Apenas 0,01% dos candidatos alcançam a nota máxima. Veja o que é necessário:",
  requirements: [
    {
      title: "Domínio Completo da Norma Culta",
      description: "Zero erros gramaticais, ortográficos ou de pontuação",
      score: "200/200 na Competência 1",
      tips: [
        "Revise seu texto pelo menos 3 vezes",
        "Atenção especial a vírgulas e concordância",
        "Use vocabulário rico e variado",
        "Evite repetições desnecessárias",
      ],
    },
    {
      title: "Repertório Sociocultural Legitimado",
      description: "Citações, dados e referências de fontes confiáveis e pertinentes",
      score: "200/200 na Competência 2",
      tips: [
        "Use citações de filósofos, sociólogos, escritores",
        "Mencione dados de instituições confiáveis (IBGE, ONU, etc.)",
        "Referencie leis, artigos da Constituição",
        "Conecte o repertório ao tema de forma produtiva",
      ],
    },
    {
      title: "Argumentação Sofisticada",
      description: "Argumentos bem fundamentados com relações de causa e consequência",
      score: "200/200 na Competência 3",
      tips: [
        "Apresente pelo menos 2 argumentos sólidos",
        "Use dados estatísticos e exemplos concretos",
        "Estabeleça relações de causa e consequência",
        "Demonstre senso crítico e análise aprofundada",
      ],
    },
    {
      title: "Coesão Textual Impecável",
      description: "Uso variado e adequado de conectivos e recursos coesivos",
      score: "200/200 na Competência 4",
      tips: [
        "Varie os conectivos (evite repetir 'além disso')",
        "Use pronomes, sinônimos e expressões referenciais",
        "Garanta progressão temática clara",
        "Conecte todos os parágrafos de forma lógica",
      ],
    },
    {
      title: "Proposta de Intervenção Completa",
      description: "Todos os 5 elementos presentes e detalhados",
      score: "200/200 na Competência 5",
      tips: [
        "Agente: quem vai executar a ação",
        "Ação: o que será feito especificamente",
        "Meio/Modo: como será implementado",
        "Finalidade: objetivo a ser alcançado",
        "Detalhamento: especificação da proposta",
      ],
    },
  ],
}

const repertoireBank = [
  {
    category: "Filosofia",
    examples: [
      {
        author: "Hannah Arendt",
        quote: "A banalidade do mal",
        context: "Útil para temas sobre ética, responsabilidade social, indiferença",
      },
      {
        author: "Zygmunt Bauman",
        quote: "Modernidade líquida",
        context: "Relações sociais, tecnologia, consumismo, identidade",
      },
      {
        author: "Michel Foucault",
        quote: "Sociedade disciplinar",
        context: "Controle social, vigilância, poder, instituições",
      },
    ],
  },
  {
    category: "Sociologia",
    examples: [
      {
        author: "Émile Durkheim",
        quote: "Fato social",
        context: "Comportamento coletivo, normas sociais, educação",
      },
      {
        author: "Pierre Bourdieu",
        quote: "Violência simbólica",
        context: "Desigualdade, educação, cultura, dominação",
      },
      {
        author: "Jessé Souza",
        quote: "Subcidadania",
        context: "Desigualdade social no Brasil, exclusão, preconceito",
      },
    ],
  },
  {
    category: "Literatura",
    examples: [
      {
        author: "Machado de Assis",
        quote: "Memórias Póstumas de Brás Cubas",
        context: "Crítica social, hipocrisia, sociedade brasileira",
      },
      {
        author: "Carolina Maria de Jesus",
        quote: "Quarto de Despejo",
        context: "Pobreza, desigualdade, voz dos marginalizados",
      },
      {
        author: "George Orwell",
        quote: "1984",
        context: "Vigilância, controle, manipulação, tecnologia",
      },
    ],
  },
  {
    category: "Dados e Estatísticas",
    examples: [
      {
        author: "IBGE",
        quote: "Dados sobre desigualdade, educação, tecnologia",
        context: "Fundamentar argumentos com números oficiais",
      },
      {
        author: "ONU",
        quote: "Objetivos de Desenvolvimento Sustentável",
        context: "Temas ambientais, sociais, educação",
      },
      {
        author: "IPEA",
        quote: "Estudos sobre economia e sociedade brasileira",
        context: "Desigualdade, políticas públicas, desenvolvimento",
      },
    ],
  },
  {
    category: "Legislação",
    examples: [
      {
        author: "Constituição Federal 1988",
        quote: "Art. 5º - Direitos e garantias fundamentais",
        context: "Direitos humanos, igualdade, dignidade",
      },
      {
        author: "Constituição Federal 1988",
        quote: "Art. 6º - Direitos sociais (educação, saúde, trabalho)",
        context: "Políticas públicas, direitos sociais",
      },
      {
        author: "ECA",
        quote: "Estatuto da Criança e do Adolescente",
        context: "Direitos de crianças e adolescentes, educação",
      },
    ],
  },
]

const essay1000Example = {
  theme: "Desafios para a valorização de comunidades e povos tradicionais no Brasil",
  introduction:
    "A Constituição Federal de 1988, em seu artigo 216, reconhece os bens de natureza material e imaterial dos diferentes grupos formadores da sociedade brasileira como patrimônio cultural do país. Entretanto, a realidade vivenciada por comunidades e povos tradicionais revela um cenário de invisibilidade e desrespeito aos seus direitos. Essa situação, agravada pela ausência de políticas públicas efetivas e pelo avanço de atividades econômicas predatórias, evidencia a necessidade urgente de ações que garantam a valorização e proteção desses grupos, fundamentais para a diversidade cultural brasileira.",
  analysis: [
    "✓ Repertório legitimado: Artigo 216 da Constituição Federal",
    "✓ Contextualização clara do tema",
    "✓ Apresentação da tese (invisibilidade e desrespeito)",
    "✓ Indicação dos argumentos (ausência de políticas e atividades predatórias)",
    "✓ Vocabulário rico e formal",
  ],
}

const competencies = [
  {
    number: 1,
    title: "Domínio da escrita formal da língua portuguesa",
    description:
      "Demonstrar domínio da modalidade escrita formal da língua portuguesa, incluindo ortografia, acentuação, pontuação, concordância, regência e uso adequado de vocabulário.",
    tips: [
      "Evite gírias, expressões coloquiais e abreviações",
      "Use corretamente os sinais de pontuação",
      "Mantenha concordância verbal e nominal",
      "Utilize vocabulário rico e variado",
      "Revise ortografia e acentuação",
    ],
    examples: {
      good: "A sociedade contemporânea enfrenta desafios significativos relacionados à educação digital.",
      bad: "A sociedade de hoje em dia tá enfrentando uns problemas bem grandes com a educação digital.",
    },
  },
  {
    number: 2,
    title: "Compreensão da proposta de redação",
    description:
      "Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento para desenvolver o tema, dentro dos limites estruturais do texto dissertativo-argumentativo.",
    tips: [
      "Leia atentamente todos os textos motivadores",
      "Identifique o tema central da proposta",
      "Mantenha-se dentro do tema durante todo o texto",
      "Use conhecimentos de diferentes áreas (história, sociologia, filosofia, etc.)",
      "Respeite a estrutura dissertativo-argumentativa",
    ],
    examples: {
      good: "A questão da mobilidade urbana no Brasil relaciona-se diretamente com o processo de urbanização acelerada ocorrido nas últimas décadas.",
      bad: "Vou falar sobre transporte público porque é importante para as pessoas.",
    },
  },
  {
    number: 3,
    title: "Seleção e organização de informações",
    description:
      "Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista.",
    tips: [
      "Apresente argumentos sólidos e bem fundamentados",
      "Use dados, estatísticas e exemplos concretos",
      "Relacione causas e consequências",
      "Organize as ideias de forma lógica e progressiva",
      "Defenda um ponto de vista claro e consistente",
    ],
    examples: {
      good: "Segundo dados do IBGE, apenas 46% dos domicílios brasileiros possuem computador, evidenciando a necessidade de políticas públicas de inclusão digital.",
      bad: "Muitas pessoas não têm computador e isso é um problema.",
    },
  },
  {
    number: 4,
    title: "Coesão textual",
    description:
      "Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação, garantindo a coesão e coerência do texto.",
    tips: [
      "Use conectivos adequados (portanto, ademais, além disso, etc.)",
      "Evite repetições desnecessárias de palavras",
      "Mantenha a progressão temática",
      "Use pronomes, sinônimos e expressões referenciais",
      "Garanta que cada parágrafo se conecte logicamente ao anterior",
    ],
    examples: {
      good: "Além disso, a pandemia evidenciou a urgência dessa transformação. Ademais, é necessário investir em formação docente.",
      bad: "A pandemia mostrou que é importante. É importante também ter professores preparados.",
    },
  },
  {
    number: 5,
    title: "Proposta de intervenção",
    description:
      "Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos e considerando a diversidade sociocultural.",
    tips: [
      "Apresente uma proposta clara e detalhada",
      "Indique o agente responsável pela ação",
      "Especifique o meio/modo de execução",
      "Explique a finalidade da proposta",
      "Detalhe como a proposta será implementada",
      "Respeite os direitos humanos",
    ],
    examples: {
      good: "Portanto, é imprescindível que o Ministério da Educação (agente) desenvolva um programa nacional de capacitação docente (ação) por meio de cursos online e presenciais (meio), com o objetivo de preparar os professores para o uso de tecnologias digitais em sala de aula (finalidade).",
      bad: "O governo deve fazer algo para resolver esse problema.",
    },
  },
]

const essayStructure = [
  {
    title: "Introdução",
    subtitle: "1º Parágrafo - 5 a 7 linhas",
    description:
      "Apresente o tema, contextualize o problema e apresente sua tese (ponto de vista). Use repertório sociocultural para enriquecer.",
    elements: [
      "Contextualização do tema",
      "Apresentação da tese/ponto de vista",
      "Repertório sociocultural (citação, dado, referência)",
      "Indicação dos argumentos que serão desenvolvidos",
    ],
    starters: [
      "Na sociedade contemporânea...",
      "Desde o período...",
      "Conforme o filósofo/sociólogo...",
      "A Constituição Federal de 1988 garante...",
      "No contexto atual...",
    ],
    example:
      "A Constituição Federal de 1988 assegura a todos os brasileiros o direito à educação de qualidade. No entanto, a realidade educacional do país revela profundas desigualdades, especialmente no que se refere ao acesso à educação digital. Essa situação, agravada pela pandemia de COVID-19, evidencia a necessidade urgente de políticas públicas que democratizem o acesso às tecnologias educacionais, garantindo oportunidades iguais a todos os estudantes.",
  },
  {
    title: "Desenvolvimento 1",
    subtitle: "2º Parágrafo - 7 a 9 linhas",
    description:
      "Desenvolva seu primeiro argumento com profundidade. Use dados, exemplos, citações e análises para fundamentar seu ponto de vista.",
    elements: [
      "Tópico frasal (ideia principal do parágrafo)",
      "Argumentação fundamentada",
      "Dados, estatísticas ou exemplos",
      "Análise crítica",
      "Conexão com o tema",
    ],
    starters: [
      "Em primeiro lugar...",
      "Primeiramente...",
      "Inicialmente, é fundamental reconhecer que...",
      "Sob esse viés...",
      "Nesse sentido...",
    ],
    example:
      "Em primeiro lugar, é fundamental reconhecer que a educação digital vai além da simples inserção de computadores nas escolas. Trata-se de um processo complexo que envolve a formação de professores, o desenvolvimento de metodologias adequadas e a criação de conteúdos pedagógicos digitais de qualidade. Segundo dados do IBGE, apenas 46% dos domicílios brasileiros possuem computador, evidenciando a necessidade de políticas públicas que garantam infraestrutura adequada para a implementação efetiva da educação digital.",
  },
  {
    title: "Desenvolvimento 2",
    subtitle: "3º Parágrafo - 7 a 9 linhas",
    description:
      "Apresente seu segundo argumento, complementando o primeiro. Mantenha a coesão com o parágrafo anterior usando conectivos adequados.",
    elements: [
      "Conectivo de adição/progressão",
      "Segundo argumento",
      "Fundamentação com exemplos/dados",
      "Análise aprofundada",
      "Relação causa-consequência",
    ],
    starters: ["Além disso...", "Ademais...", "Outrossim...", "Paralelamente a isso...", "Somado a isso..."],
    example:
      "Além disso, a pandemia de COVID-19 evidenciou a urgência dessa transformação. Durante o período de isolamento social, milhões de estudantes brasileiros ficaram sem acesso às aulas, revelando a fragilidade do sistema educacional diante dos desafios tecnológicos. Essa situação demonstrou que a educação digital não é mais uma opção, mas uma necessidade imperativa para garantir a continuidade do processo educativo em qualquer circunstância.",
  },
  {
    title: "Conclusão",
    subtitle: "4º Parágrafo - 7 a 9 linhas",
    description:
      "Retome a tese e apresente uma proposta de intervenção detalhada com os 5 elementos: agente, ação, meio/modo, finalidade e detalhamento.",
    elements: [
      "Retomada da tese",
      "Conectivo conclusivo",
      "Proposta de intervenção completa:",
      "• Agente (quem vai fazer)",
      "• Ação (o que será feito)",
      "• Meio/Modo (como será feito)",
      "• Finalidade (para quê)",
      "• Detalhamento (especificação)",
    ],
    starters: ["Portanto...", "Diante do exposto...", "Dessa forma...", "Logo...", "Assim sendo..."],
    example:
      "Portanto, é imprescindível que o governo federal (agente), em parceria com estados e municípios, desenvolva um plano nacional de educação digital (ação) que contemple investimentos em infraestrutura, formação docente e produção de conteúdo (meio/modo). Ademais, é necessário estabelecer parcerias com o setor privado para ampliar o acesso à internet e dispositivos eletrônicos (detalhamento), garantindo que todos os estudantes brasileiros possam usufruir dos benefícios da educação digital, independentemente de sua condição socioeconômica (finalidade).",
  },
]

const connectivesList = {
  adicao: ["Além disso", "Ademais", "Outrossim", "Ainda", "Também", "Igualmente"],
  oposicao: ["Contudo", "Todavia", "Entretanto", "No entanto", "Porém", "Não obstante"],
  conclusao: ["Portanto", "Logo", "Assim", "Dessa forma", "Por conseguinte", "Diante disso"],
  explicacao: ["Isto é", "Ou seja", "A saber", "Por exemplo", "Como", "Conforme"],
  causa: ["Porque", "Pois", "Visto que", "Uma vez que", "Já que", "Dado que"],
  consequencia: ["Consequentemente", "Por isso", "Assim", "De modo que", "Tanto que", "De forma que"],
}

const commonMistakes = [
  {
    title: "Fuga ao tema",
    description: "Desenvolver um texto que não aborda o tema proposto",
    solution: "Leia atentamente a proposta e mantenha o foco no tema durante todo o texto",
  },
  {
    title: "Cópia dos textos motivadores",
    description: "Copiar trechos dos textos de apoio sem elaboração própria",
    solution: "Use os textos motivadores como inspiração, mas desenvolva suas próprias ideias",
  },
  {
    title: "Proposta de intervenção incompleta",
    description: "Não apresentar todos os elementos necessários na proposta",
    solution: "Inclua agente, ação, meio/modo, finalidade e detalhamento",
  },
  {
    title: "Falta de coesão",
    description: "Texto sem conectivos ou com uso inadequado deles",
    solution: "Use conectivos variados e adequados para ligar as ideias",
  },
  {
    title: "Argumentação fraca",
    description: "Apresentar opiniões sem fundamentação ou exemplos",
    solution: "Fundamente seus argumentos com dados, exemplos e análises",
  },
]

export default function GuiaPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Hero Section */}
      <div className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-3 md:px-6 py-6 md:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 md:h-16 md:w-16 rounded-2xl bg-primary/10 mb-4">
              <Trophy className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Guia Definitivo para Nota 1000</h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-6">
              Domine todas as técnicas, estratégias e segredos para alcançar a nota máxima na redação do ENEM
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              <Badge variant="secondary" className="text-xs md:text-sm">
                <Award className="h-3 w-3 mr-1" />5 Competências
              </Badge>
              <Badge variant="secondary" className="text-xs md:text-sm">
                <Star className="h-3 w-3 mr-1" />
                Nota 1000
              </Badge>
              <Badge variant="secondary" className="text-xs md:text-sm">
                <Brain className="h-3 w-3 mr-1" />
                Repertório
              </Badge>
              <Badge variant="secondary" className="text-xs md:text-sm">
                <Zap className="h-3 w-3 mr-1" />
                Técnicas Avançadas
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 md:px-6 py-6 md:py-8 max-w-5xl">
        <section className="mb-8 md:mb-12">
          <div className="bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-background border-2 border-yellow-500/20 rounded-2xl p-6 md:p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
                <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold">{path1000.title}</h2>
                <p className="text-xs md:text-sm text-muted-foreground">{path1000.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {path1000.requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="bg-background border border-border rounded-xl p-4 md:p-6 hover:border-yellow-500/50 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10 shrink-0">
                      <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base font-semibold mb-1">{req.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">{req.description}</p>
                      <Badge className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 hover:bg-yellow-500/20">
                        {req.score}
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 md:p-4">
                    <p className="text-xs font-medium mb-2 flex items-center gap-2">
                      <Zap className="h-3 w-3 text-primary" />
                      Como alcançar:
                    </p>
                    <ul className="space-y-1.5">
                      {req.tips.map((tip, i) => (
                        <li key={i} className="text-xs md:text-sm flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <BookMarked className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Banco de Repertório Sociocultural</h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                Citações e referências essenciais para enriquecer sua redação
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {repertoireBank.map((category, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-4 md:p-6">
                <h3 className="text-sm md:text-base font-semibold mb-4 flex items-center gap-2">
                  <Quote className="h-4 w-4 text-primary" />
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.examples.map((example, i) => (
                    <div key={i} className="bg-muted/50 rounded-lg p-3 md:p-4">
                      <p className="text-xs md:text-sm font-medium mb-1">{example.author}</p>
                      <p className="text-xs md:text-sm text-primary mb-2 italic">"{example.quote}"</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Quando usar:</span> {example.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
              <Sparkles className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Exemplo de Introdução Nota 1000</h2>
              <p className="text-xs md:text-sm text-muted-foreground">Veja como estruturar uma introdução perfeita</p>
            </div>
          </div>

          <div className="bg-card border-2 border-green-500/20 rounded-xl p-4 md:p-6">
            <div className="bg-green-500/5 rounded-lg p-4 md:p-6 mb-4">
              <p className="text-xs md:text-sm font-medium text-green-600 dark:text-green-500 mb-3">
                Tema: {essay1000Example.theme}
              </p>
              <p className="text-xs md:text-sm leading-relaxed text-justify">{essay1000Example.introduction}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs font-medium mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Análise dos pontos fortes:
              </p>
              <ul className="space-y-2">
                {essay1000Example.analysis.map((point, i) => (
                  <li key={i} className="text-xs md:text-sm flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Estrutura da Redação */}
        <section className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Estrutura da Redação</h2>
              <p className="text-xs md:text-sm text-muted-foreground">Aprenda a organizar seu texto em 4 parágrafos</p>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            {essayStructure.map((section, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
                  className="w-full p-4 md:p-6 text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 md:gap-3 mb-2">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{idx + 1}</Badge>
                        <h3 className="text-base md:text-lg font-semibold">{section.title}</h3>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">{section.subtitle}</p>
                      <p className="text-xs md:text-sm">{section.description}</p>
                    </div>
                    {expandedSection === section.title ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                  </div>
                </button>

                {expandedSection === section.title && (
                  <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-4">
                    {/* Elementos */}
                    <div className="bg-muted/50 rounded-lg p-3 md:p-4">
                      <p className="text-xs md:text-sm font-medium mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Elementos essenciais:
                      </p>
                      <ul className="space-y-2">
                        {section.elements.map((element, i) => (
                          <li key={i} className="text-xs md:text-sm flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{element}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Starters */}
                    <div className="bg-primary/5 rounded-lg p-3 md:p-4">
                      <p className="text-xs md:text-sm font-medium mb-3 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        Como começar:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {section.starters.map((starter, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {starter}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Example */}
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 md:p-4">
                      <p className="text-xs md:text-sm font-medium mb-2 flex items-center gap-2 text-green-600 dark:text-green-500">
                        <Sparkles className="h-4 w-4" />
                        Exemplo:
                      </p>
                      <p className="text-xs md:text-sm leading-relaxed text-justify">{section.example}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Competências */}
        <section className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">5 Competências do ENEM</h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                Entenda o que os avaliadores esperam em cada competência
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {competencies.map((comp) => (
              <AccordionItem
                key={comp.number}
                value={`comp-${comp.number}`}
                className="bg-card border border-border rounded-xl overflow-hidden data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 shrink-0">C{comp.number}</Badge>
                    <span className="text-sm md:text-base font-semibold">{comp.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-6 pb-4 md:pb-6">
                  <p className="text-xs md:text-sm text-muted-foreground mb-4">{comp.description}</p>

                  {/* Tips */}
                  <div className="bg-muted/50 rounded-lg p-3 md:p-4 mb-4">
                    <p className="text-xs md:text-sm font-medium mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      Dicas para pontuar:
                    </p>
                    <ul className="space-y-2">
                      {comp.tips.map((tip, i) => (
                        <li key={i} className="text-xs md:text-sm flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Examples */}
                  <div className="space-y-3">
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 md:p-4">
                      <p className="text-xs font-medium mb-2 text-green-600 dark:text-green-500 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Exemplo correto:
                      </p>
                      <p className="text-xs md:text-sm italic">{comp.examples.good}</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 md:p-4">
                      <p className="text-xs font-medium mb-2 text-red-600 dark:text-red-500 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Evite:
                      </p>
                      <p className="text-xs md:text-sm italic">{comp.examples.bad}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Conectivos */}
        <section className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Conectivos Essenciais</h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                Palavras e expressões para dar coesão ao seu texto
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {Object.entries(connectivesList).map(([category, connectives]) => (
              <div key={category} className="bg-card border border-border rounded-xl p-4 md:p-6">
                <h3 className="text-sm md:text-base font-semibold mb-3 capitalize">
                  {category === "adicao" && "Adição"}
                  {category === "oposicao" && "Oposição"}
                  {category === "conclusao" && "Conclusão"}
                  {category === "explicacao" && "Explicação"}
                  {category === "causa" && "Causa"}
                  {category === "consequencia" && "Consequência"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {connectives.map((conn, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {conn}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Erros Comuns */}
        <section>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Erros Comuns a Evitar</h2>
              <p className="text-xs md:text-sm text-muted-foreground">Conheça os principais erros e como evitá-los</p>
            </div>
          </div>

          <div className="space-y-3">
            {commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-4 md:p-6 hover:border-red-500/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 shrink-0">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold mb-1">{mistake.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3">{mistake.description}</p>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                      <p className="text-xs font-medium mb-1 text-green-600 dark:text-green-500 flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3" />
                        Solução:
                      </p>
                      <p className="text-xs md:text-sm">{mistake.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-8 md:mt-12 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 text-center">
          <Trophy className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">Pronto para alcançar a nota 1000?</h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 max-w-2xl mx-auto">
            Agora que você domina todas as técnicas e estratégias, é hora de colocar em prática. Escreva sua redação e
            receba correção detalhada com IA para identificar pontos de melhoria!
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <a href="/escrever">
              <Sparkles className="h-4 w-4 mr-2" />
              Começar a Escrever Agora
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
