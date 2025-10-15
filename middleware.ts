import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = ["/escrever", "/modelos", "/guia", "/perfil", "/suporte", "/compras", "/resultado"]
const publicRoutes = ["/login"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow home page, API routes, and static files
  if (pathname === "/" || pathname.startsWith("/api/") || pathname.startsWith("/_next")) {
    return NextResponse.next()
  }

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  // Get session cookie
  const session = request.cookies.get("session")?.value

  // If protected route without session, redirect to login
  if (isProtectedRoute && !session) {
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // If trying to access login with valid session, redirect to home
  if (isPublicRoute && session && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
