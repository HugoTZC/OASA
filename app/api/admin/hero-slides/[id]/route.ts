import { type NextRequest, NextResponse } from "next/server"
import { heroSlides, updateTimestamp } from "@/lib/admin-data"

// GET - Fetch single hero slide
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const slide = heroSlides.find((s) => s.id === params.id)

    if (!slide) {
      return NextResponse.json({ success: false, error: "Hero slide not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: slide,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch hero slide" }, { status: 500 })
  }
}

// PUT - Update hero slide
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const slideIndex = heroSlides.findIndex((s) => s.id === params.id)

    if (slideIndex === -1) {
      return NextResponse.json({ success: false, error: "Hero slide not found" }, { status: 404 })
    }

    heroSlides[slideIndex] = updateTimestamp({
      ...heroSlides[slideIndex],
      ...body,
    })

    return NextResponse.json({
      success: true,
      data: heroSlides[slideIndex],
      message: "Hero slide updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update hero slide" }, { status: 500 })
  }
}

// DELETE - Delete hero slide
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const slideIndex = heroSlides.findIndex((s) => s.id === params.id)

    if (slideIndex === -1) {
      return NextResponse.json({ success: false, error: "Hero slide not found" }, { status: 404 })
    }

    heroSlides.splice(slideIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Hero slide deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete hero slide" }, { status: 500 })
  }
}
