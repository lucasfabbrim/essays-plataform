"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CreditsStore {
  credits: number
  addCredits: (amount: number) => void
  deductCredits: (amount: number) => boolean
  resetCredits: () => void
}

export const useCredits = create<CreditsStore>()(
  persist(
    (set, get) => ({
      credits: 0,
      addCredits: (amount: number) => {
        set((state) => ({ credits: state.credits + amount }))
      },
      deductCredits: (amount: number) => {
        const currentCredits = get().credits
        if (currentCredits >= amount) {
          set({ credits: currentCredits - amount })
          return true
        }
        return false
      },
      resetCredits: () => {
        set({ credits: 0 })
      },
    }),
    {
      name: "credits-storage",
    },
  ),
)
