import { type NextRequest, NextResponse } from "next/server"
import { getAllUsers, createAdminUser } from "@/lib/auth"

export async function GET() {
  try {
    const users = getAllUsers()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const newAdmin = createAdminUser(data)
    return NextResponse.json(newAdmin)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create admin user" }, { status: 500 })
  }
}
