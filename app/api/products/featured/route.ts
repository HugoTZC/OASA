import { NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/products?hierarchy=1&limit=4`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    return NextResponse.json({ success: true, data: data.products.slice(0, 4) })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch featured products' }, { status: 500 })
  }
}
