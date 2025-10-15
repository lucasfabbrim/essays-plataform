"use client"

import { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/contexts/auth-context"
import { getCustomerOrders, getCustomerProfile, type Order, type CustomerProfile } from "@/lib/api"

export default function PerfilPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<CustomerProfile | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [profileError, setProfileError] = useState<string | null>(null)

  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [ordersError, setOrdersError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingProfile(true)
        const data = await getCustomerProfile()
        setProfile(data)
      } catch (error: any) {
        setProfileError(error.message)
      } finally {
        setLoadingProfile(false)
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoadingOrders(true)
        const data = await getCustomerOrders()
        setOrders(data)
      } catch (error: any) {
        setOrdersError(error.message)
      } finally {
        setLoadingOrders(false)
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user])

  const getUserInitials = () => {
    if (profile?.name) {
      return profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (profile?.email) {
      return profile.email[0].toUpperCase()
    }
    return "U"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Icon icon="solar:user-circle-bold-duotone" className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Meu Perfil</h1>
            <p className="text-sm text-muted-foreground">Visualize suas informações pessoais e compras</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="solar:user-id-bold-duotone" className="h-5 w-5 text-primary" />
              Informações do Perfil
            </CardTitle>
            <CardDescription>Seus dados cadastrados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {loadingProfile ? (
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-64" />
                  </div>
                </div>
              </div>
            ) : profileError ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon icon="solar:danger-circle-bold" className="h-12 w-12 mx-auto mb-2 text-destructive" />
                <p>Erro ao carregar perfil: {profileError}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground text-3xl font-bold">
                    {getUserInitials()}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{profile?.name || "Usuário"}</h3>
                    <p className="text-sm text-muted-foreground">{profile?.email}</p>
                    {profile?.phone && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Icon icon="solar:phone-bold" className="h-4 w-4" />
                        {profile.phone}
                      </p>
                    )}
                  </div>
                </div>

                {profile?.bio && (
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <p className="text-sm text-muted-foreground">{profile.bio}</p>
                  </div>
                )}

                {profile?.birthDate && (
                  <div className="space-y-2">
                    <Label>Data de Nascimento</Label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(profile.birthDate).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="solar:bag-4-bold-duotone" className="h-5 w-5 text-primary" />
              Minhas Compras
            </CardTitle>
            <CardDescription>Histórico de compras e transações</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingOrders ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                ))}
              </div>
            ) : ordersError ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon icon="solar:danger-circle-bold" className="h-12 w-12 mx-auto mb-2 text-destructive" />
                <p>Erro ao carregar compras: {ordersError}</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon icon="solar:bag-cross-bold-duotone" className="h-12 w-12 mx-auto mb-2" />
                <p>Você ainda não realizou nenhuma compra</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon icon="solar:bag-check-bold-duotone" className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{order.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.formattedDate} • {order.formattedPaymentMethod}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{order.formattedAmount}</p>
                      <p className="text-xs text-muted-foreground">{order.quantity}x</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
