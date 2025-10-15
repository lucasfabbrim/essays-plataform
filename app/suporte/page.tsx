import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Como funciona a correção de redação?",
    answer:
      "Nossa IA analisa sua redação seguindo os critérios do ENEM, avaliando as 5 competências e fornecendo feedback detalhado sobre cada aspecto. O processo leva cerca de 2-3 minutos.",
  },
  {
    question: "Quantos créditos preciso para corrigir uma redação?",
    answer:
      "Cada correção de redação custa $5.00 em créditos. Você pode comprar créditos ou assinar o plano Premium para correções ilimitadas.",
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer:
      "Sim! Você pode cancelar sua assinatura Premium a qualquer momento sem taxas adicionais. Você continuará tendo acesso aos benefícios até o fim do período pago.",
  },
  {
    question: "Como extrair redação de foto?",
    answer:
      "Basta tirar uma foto clara da sua redação manuscrita e fazer upload. Nossa IA irá extrair o texto automaticamente e você poderá editá-lo antes de enviar para correção.",
  },
  {
    question: "Qual a diferença entre correção básica e detalhada?",
    answer:
      "A correção básica fornece nota e feedback geral. A correção detalhada (Premium) inclui análise linha por linha, sugestões de melhoria, exemplos práticos e comparação com redações nota 1000.",
  },
  {
    question: "Posso ver modelos de redação nota 1000?",
    answer:
      "Sim! Na aba Modelos você encontra diversas redações nota 1000 com análise detalhada de cada parágrafo e competência.",
  },
]

const contactOptions = [
  {
    icon: "solar:chat-round-dots-bold-duotone",
    title: "Chat ao Vivo",
    description: "Resposta em minutos",
    action: "Iniciar Chat",
    color: "text-blue-500",
  },
  {
    icon: "solar:letter-bold-duotone",
    title: "Email",
    description: "Resposta em 24h",
    action: "Enviar Email",
    color: "text-green-500",
  },
  {
    icon: "solar:phone-bold-duotone",
    title: "WhatsApp",
    description: "Seg-Sex 9h-18h",
    action: "Abrir WhatsApp",
    color: "text-emerald-500",
  },
]

export default function SuportePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Icon icon="solar:headphones-round-sound-bold-duotone" className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Central de Ajuda</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estamos aqui para ajudar! Encontre respostas rápidas ou entre em contato conosco.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="solar:magnifer-bold-duotone" className="h-5 w-5 text-primary" />
              Buscar Ajuda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Icon
                icon="solar:magnifer-linear"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
              />
              <Input placeholder="Busque por palavras-chave..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {contactOptions.map((option) => (
            <Card key={option.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon icon={option.icon} className={`h-12 w-12 ${option.color} mb-2`} />
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="solar:question-circle-bold-duotone" className="h-5 w-5 text-primary" />
              Perguntas Frequentes
            </CardTitle>
            <CardDescription>Respostas para as dúvidas mais comuns</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="solar:letter-opened-bold-duotone" className="h-5 w-5 text-primary" />
              Envie sua Mensagem
            </CardTitle>
            <CardDescription>Não encontrou o que procurava? Entre em contato conosco</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" placeholder="Seu nome completo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assunto">Assunto</Label>
              <Input id="assunto" placeholder="Sobre o que você precisa de ajuda?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem</Label>
              <Textarea id="mensagem" placeholder="Descreva sua dúvida ou problema..." rows={5} />
            </div>
            <Button className="w-full md:w-auto">
              <Icon icon="solar:plain-2-bold" className="h-4 w-4 mr-2" />
              Enviar Mensagem
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Icon icon="solar:star-bold-duotone" className="h-12 w-12 text-primary" />
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-semibold text-lg mb-1">Precisa de mais recursos?</h3>
                <p className="text-sm text-muted-foreground">
                  Assine o Glau+ Premium e tenha acesso a correções ilimitadas, temas exclusivos e muito mais!
                </p>
              </div>
              <Button size="lg" className="shrink-0">
                <Icon icon="solar:crown-bold" className="h-4 w-4 mr-2" />
                Assinar Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
