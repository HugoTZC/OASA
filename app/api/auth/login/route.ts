import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail, createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("Login attempt for:", email)

    // Find user by email
    const user = findUserByEmail(email)

    if (!user) {
      console.log("User not found:", email)
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    // For demo purposes, accept any password
    // In production, you would verify the password hash here

    // Create session
    const session = createSession(user)

    console.log("Login successful for:", email, "Role:", user.role)

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    // Set cookie with proper options
    response.cookies.set("auth-token", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    console.log("Cookie set with token:", session.token)

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
