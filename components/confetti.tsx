"use client"

import { useEffect, useRef } from "react"

interface ConfettiProps {
  trigger: boolean
  duration?: number
}

export function Confetti({ trigger, duration = 3000 }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!trigger || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar canvas para cobrir toda a tela
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "9999"

    // Cores dos confetes
    const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]
    
    // Array de partículas
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      color: string
      size: number
      rotation: number
      rotationSpeed: number
    }> = []

    // Criar partículas
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      })
    }

    let animationId: number

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Atualizar posição
        particle.x += particle.vx
        particle.y += particle.vy
        particle.rotation += particle.rotationSpeed

        // Gravidade
        particle.vy += 0.1

        // Desenhar partícula
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)
        ctx.fillStyle = particle.color
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        ctx.restore()

        // Remover partículas que saíram da tela
        if (particle.y > canvas.height + 10) {
          particles.splice(index, 1)
        }
      })

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate)
      } else {
        // Limpar canvas quando terminar
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas)
        }
      }
    }

    animate()

    // Limpar após a duração especificada
    const timeout = setTimeout(() => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
    }, duration)

    return () => {
      clearTimeout(timeout)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [trigger, duration])

  return <canvas ref={canvasRef} />
}
