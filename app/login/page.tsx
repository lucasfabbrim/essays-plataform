"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Icon } from "@iconify/react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginSchema, signUpSchema } from "@/lib/validation"
import { z } from "zod"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})

    try {
      if (isSignUp) {
        signUpSchema.parse({ name, email, password })
      } else {
        loginSchema.parse({ email, password })
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        err.errors.forEach((error) => {
          const field = error.path[0] as string
          errors[field] = error.message
        })
        setFieldErrors(errors)
        return
      }
    }

    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password, name)
      } else {
        await signIn(email, password)
      }
    } catch (err: any) {
      setError(err.message || "Erro ao processar sua solicitação")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 mx-auto">
              <Icon icon="svg-spinners:ring-resize" className="w-full h-full text-emerald-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Entrando...</h2>
            <p className="text-muted-foreground">Aguarde enquanto processamos seu login</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-emerald-600">Essays</h1>
          <p className="text-muted-foreground">Sua plataforma de correção de redações</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">{isSignUp ? "Criar sua conta" : "Entrar na sua conta"}</h2>
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Preencha os dados para criar sua conta" : "Digite suas credenciais para acessar"}
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <Icon icon="solar:danger-circle-bold" className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="João Silva"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setFieldErrors((prev) => ({ ...prev, name: "" }))
                  }}
                  className={`flex h-10 w-full rounded-md border ${
                    fieldErrors.name ? "border-red-500" : "border-input"
                  } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                  disabled={loading}
                />
                {fieldErrors.name && <p className="text-xs text-red-500">{fieldErrors.name}</p>}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setFieldErrors((prev) => ({ ...prev, email: "" }))
                }}
                className={`flex h-10 w-full rounded-md border ${
                  fieldErrors.email ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                disabled={loading}
              />
              {fieldErrors.email && <p className="text-xs text-red-500">{fieldErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setFieldErrors((prev) => ({ ...prev, password: "" }))
                }}
                className={`flex h-10 w-full rounded-md border ${
                  fieldErrors.password ? "border-red-500" : "border-input"
                } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                disabled={loading}
              />
              {fieldErrors.password && <p className="text-xs text-red-500">{fieldErrors.password}</p>}
              {isSignUp && !fieldErrors.password && (
                <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres com letras e números</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 px-4 py-2 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSignUp ? "Criar conta" : "Entrar"}
            </button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">{isSignUp ? "Já tem uma conta? " : "Não tem uma conta? "}</span>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError("")
                setFieldErrors({})
              }}
              disabled={loading}
              className="text-emerald-600 font-medium hover:underline disabled:opacity-50"
            >
              {isSignUp ? "Entrar" : "Criar conta"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
        </p>
      </div>
    </div>
  )
}
