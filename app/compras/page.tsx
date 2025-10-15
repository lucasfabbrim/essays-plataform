"use client"

import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { fetchCustomerOrders, getProductName, formatPaymentMethod, type Order } from "@/lib/api"

const currentPlan = {
  name: "Premium",
  price: 29.9,
  renewDate: "15 Fev 2025",
  features: [
    "Correções ilimitadas",
    "Temas exclusivos",
    "Correção detalhada",
    "Extração de foto",
    "Suporte prioritário",
  ],
}

export default function ComprasPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadOrders() {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const data = await fetchCustomerOrders()
        setOrders(data)
      } catch (err: any) {
        console.error("[v0] Error loading orders:", err)
        setError(err.message || "Erro ao carregar compras")
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [user])

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Icon icon="solar:bag-4-bold-duotone" className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Minhas Compras</h1>
            <p className="text-sm text-muted-foreground">Gerencie suas compras e assinaturas</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:crown-bold-duotone" className="h-5 w-5 text-primary" />
                  Plano Atual
                </CardTitle>
                <Badge className="bg-primary">Ativo</Badge>
              </div>
              <CardDescription>Seu plano {currentPlan.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">R$ {currentPlan.price.toFixed(2)}</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <div className="space-y-2">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Icon icon="solar:check-circle-bold" className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Próxima renovação</span>
                <span className="font-medium">{currentPlan.renewDate}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                  <Icon icon="solar:settings-bold" className="h-4 w-4 mr-2" />
                  Gerenciar
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                  <Icon icon="solar:close-circle-bold" className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:wallet-bold-duotone" className="h-5 w-5 text-primary" />
                Saldo de Créditos
              </CardTitle>
              <CardDescription>Créditos disponíveis para uso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">R$ 15,00</span>
                <span className="text-muted-foreground">em créditos</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Correções disponíveis</span>
                  <span className="font-medium">3 redações</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Valor por correção</span>
                  <span className="font-medium">R$ 5,00</span>
                </div>
              </div>
              <Separator />
              <Button className="w-full">
                <Icon icon="solar:add-circle-bold" className="h-4 w-4 mr-2" />
                Comprar Mais Créditos
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="solar:bill-list-bold-duotone" className="h-5 w-5 text-primary" />
              Histórico de Compras
            </CardTitle>
            <CardDescription>Todas as suas transações</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Icon icon="solar:loading-bold" className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <Icon icon="solar:danger-circle-bold" className="h-12 w-12 mx-auto text-destructive mb-2" />
                <p className="text-muted-foreground">{error}</p>
                <Button variant="outline" className="mt-4 bg-transparent" onClick={() => window.location.reload()}>
                  Tentar Novamente
                </Button>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <Icon icon="solar:bag-smile-bold-duotone" className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Nenhuma compra realizada ainda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{getProductName(order.externalId)}</span>
                        <Badge variant="default">Pago</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon icon="solar:calendar-bold" className="h-4 w-4" />
                          {formatDate(order.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon icon="solar:card-bold" className="h-4 w-4" />
                          {formatPaymentMethod(order.methodPayment)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon icon="solar:document-text-bold" className="h-4 w-4" />
                          {order.id.slice(0, 8)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold">{formatCurrency(order.paidAmount)}</span>
                      <Button variant="ghost" size="sm">
                        <Icon icon="solar:download-bold" className="h-4 w-4 mr-2" />
                        Nota Fiscal
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Icon icon="solar:gift-bold-duotone" className="h-16 w-16 text-primary" />
              <div className="flex-1 text-center md:text-left space-y-2">
                <h3 className="font-semibold text-xl">Indique e Ganhe!</h3>
                <p className="text-muted-foreground">
                  Convide seus amigos e ganhe R$ 10,00 em créditos para cada amigo que assinar o Premium.
                </p>
              </div>
              <Button size="lg" className="shrink-0">
                <Icon icon="solar:share-bold" className="h-4 w-4 mr-2" />
                Convidar Amigos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
