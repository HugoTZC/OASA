import { type NextRequest, NextResponse } from "next/server"
import { getSessionByToken, findUserById } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    console.log("Auth check - Token:", token ? "present" : "missing")

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const session = getSessionByToken(token)

    if (!session) {
      console.log("Auth check - Invalid session")
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const user = findUserById(session.userId)

    if (!user) {
      console.log("Auth check - User not found")
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    console.log("Auth check - Valid session for:", user.email)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
