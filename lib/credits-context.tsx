"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface CreditsContextType {
  credits: number
  addCredits: (amount: number) => void
  deductCredits: (amount: number) => boolean
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined)

export function CreditsProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState(0)

  const addCredits = (amount: number) => {
    setCredits((prev) => prev + amount)
  }

  const deductCredits = (amount: number): boolean => {
    if (credits >= amount) {
      setCredits((prev) => prev - amount)
      return true
    }
    return false
  }

  return <CreditsContext.Provider value={{ credits, addCredits, deductCredits }}>{children}</CreditsContext.Provider>
}

export function useCredits() {
  const context = useContext(CreditsContext)
  if (context === undefined) {
    throw new Error("useCredits must be used within a CreditsProvider")
  }
  return context
}
