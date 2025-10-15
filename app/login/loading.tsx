import { Icon } from "@iconify/react"

export default function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary mx-auto">
          <span className="text-3xl font-bold text-primary-foreground">E</span>
        </div>
        <div className="relative">
          <div className="w-16 h-16 mx-auto">
            <Icon icon="svg-spinners:ring-resize" className="w-full h-full text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Essays</h2>
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    </div>
  )
}
