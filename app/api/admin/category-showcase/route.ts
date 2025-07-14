import { type NextRequest, NextResponse } from "next/server"
import { categoryShowcase, generateId } from "@/lib/admin-data"
import type { CategoryShowcase } from "@/types/admin"

// GET - Fetch all category showcase items
export async function GET() {
  try {
    const activeCategories = categoryShowcase.filter((category) => category.isActive).sort((a, b) => a.order - b.order)

    return NextResponse.json({
      success: true,
      data: activeCategories,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch category showcase" }, { status: 500 })
  }
}

// POST - Create new category showcase item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newCategory: CategoryShowcase = {
      id: generateId(),
      name: body.name,
      description: body.description,
      productCount: body.productCount,
      image: body.image,
      href: body.href,
      order: body.order || categoryShowcase.length + 1,
      isActive: body.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    categoryShowcase.push(newCategory)

    return NextResponse.json({
      success: true,
      data: newCategory,
      message: "Category showcase created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create category showcase" }, { status: 500 })
  }
}
