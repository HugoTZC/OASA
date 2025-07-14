import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail, createUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    console.log("Register attempt for:", email)

    // Check if user already exists
    const existingUser = findUserByEmail(email)

    if (existingUser) {
      console.log("User already exists:", email)
      return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 })
    }

    // Create new user
    const newUser = createUser({
      name,
      email,
      role: "customer",
      status: "active",
    })

    console.log("User created successfully:", email)

    return NextResponse.json({
      success: true,
      message: "Usuario creado exitosamente",
    })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
