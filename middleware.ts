import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSessionByToken, findUserById } from "@/lib/auth"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log("Middleware - Checking path:", pathname)

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth-token")?.value

    console.log("Middleware - Token:", token ? "present" : "missing")

    if (!token) {
      console.log("Middleware - No token found, redirecting to login")
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // Validate the session
    const session = getSessionByToken(token)

    if (!session) {
      console.log("Middleware - Invalid session, redirecting to login")
      const response = NextResponse.redirect(new URL("/auth/login", request.url))
      response.cookies.delete("auth-token")
      return response
    }

    // Check if user exists and is admin
    const user = findUserById(session.userId)

    if (!user || user.role !== "admin") {
      console.log("Middleware - User is not admin, redirecting to login")
      const response = NextResponse.redirect(new URL("/auth/login", request.url))
      response.cookies.delete("auth-token")
      return response
    }

    console.log("Middleware - Admin access granted for:", session.userId)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [],
}
