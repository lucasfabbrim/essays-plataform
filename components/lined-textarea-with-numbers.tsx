"use client"

import type React from "react"
import { Textarea } from "@/components/ui/textarea"

export function LinedTextareaWithNumbers({
  value,
  onChange,
  placeholder,
  className = "",
  fontSize = 16,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  className?: string
  fontSize?: number
}) {
  const lineHeight = fontSize * 1.5
  const topPadding = 8
  const lineCount = Math.max(30, value.split("\n").length + 10)

  return (
    <div className="relative rounded-md overflow-hidden border-2 border-primary h-full flex">
      <div
        className="flex-shrink-0 w-12 bg-primary/5 border-r border-primary/20 select-none overflow-hidden"
        style={{
          paddingTop: `${topPadding}px`,
        }}
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div
            key={i}
            className="text-right pr-3 text-muted-foreground/50 font-mono text-xs"
            style={{
              lineHeight: `${lineHeight}px`,
              fontSize: `${fontSize * 0.75}px`,
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="relative flex-1">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent ${lineHeight - 1}px,
              rgba(255, 255, 255, 0.1) ${lineHeight - 1}px,
              rgba(255, 255, 255, 0.1) ${lineHeight}px
            )`,
            backgroundPosition: `0 ${topPadding}px`,
          }}
        />

        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`relative bg-transparent resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full overflow-y-auto ${className}`}
          style={{
            paddingLeft: "12px",
            paddingTop: `${topPadding}px`,
            paddingRight: "12px",
            paddingBottom: "12px",
            lineHeight: `${lineHeight}px`,
            fontSize: `${fontSize}px`,
          }}
        />
      </div>
    </div>
  )
}
