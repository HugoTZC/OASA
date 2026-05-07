import { NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/categories`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching categories from backend:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}