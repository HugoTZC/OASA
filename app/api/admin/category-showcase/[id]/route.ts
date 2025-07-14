import { type NextRequest, NextResponse } from "next/server"
import { categoryShowcase, updateTimestamp } from "@/lib/admin-data"

// GET - Fetch single category showcase item
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const category = categoryShowcase.find((c) => c.id === params.id)

    if (!category) {
      return NextResponse.json({ success: false, error: "Category showcase not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: category,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch category showcase" }, { status: 500 })
  }
}

// PUT - Update category showcase item
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const categoryIndex = categoryShowcase.findIndex((c) => c.id === params.id)

    if (categoryIndex === -1) {
      return NextResponse.json({ success: false, error: "Category showcase not found" }, { status: 404 })
    }

    categoryShowcase[categoryIndex] = updateTimestamp({
      ...categoryShowcase[categoryIndex],
      ...body,
    })

    return NextResponse.json({
      success: true,
      data: categoryShowcase[categoryIndex],
      message: "Category showcase updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update category showcase" }, { status: 500 })
  }
}

// DELETE - Delete category showcase item
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const categoryIndex = categoryShowcase.findIndex((c) => c.id === params.id)

    if (categoryIndex === -1) {
      return NextResponse.json({ success: false, error: "Category showcase not found" }, { status: 404 })
    }

    categoryShowcase.splice(categoryIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Category showcase deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete category showcase" }, { status: 500 })
  }
}
