export default function PageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-2xl font-bold text-white shadow-lg shadow-emerald-500/20">
            E
          </div>
          <span className="text-2xl font-bold text-white">Essays</span>
        </div>

        {/* Spinner */}
        <div className="relative h-16 w-16">
          {/* Outer ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-500"></div>
          {/* Inner ring */}
          <div className="absolute inset-2 animate-spin rounded-full border-4 border-emerald-400/20 border-t-emerald-400 [animation-direction:reverse] [animation-duration:1.5s]"></div>
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500"></div>
          </div>
        </div>

        {/* Loading text */}
        <p className="animate-pulse text-sm text-zinc-400">Carregando...</p>
      </div>
    </div>
  )
}
