import { type NextRequest, NextResponse } from "next/server"
import { featuredProducts, generateId } from "@/lib/admin-data"
import type { FeaturedProduct } from "@/types/admin"

// GET - Fetch all featured products
export async function GET() {
  try {
    const activeProducts = featuredProducts.filter((product) => product.isActive).sort((a, b) => a.order - b.order)

    return NextResponse.json({
      success: true,
      data: activeProducts,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch featured products" }, { status: 500 })
  }
}

// POST - Create new featured product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newProduct: FeaturedProduct = {
      id: generateId(),
      name: body.name,
      category: body.category,
      price: Number.parseFloat(body.price),
      originalPrice: body.originalPrice ? Number.parseFloat(body.originalPrice) : undefined,
      image: body.image,
      href: body.href,
      order: body.order || featuredProducts.length + 1,
      isActive: body.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    featuredProducts.push(newProduct)

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: "Featured product created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create featured product" }, { status: 500 })
  }
}
