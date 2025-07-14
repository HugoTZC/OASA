import { type NextRequest, NextResponse } from "next/server"
import { heroSlides, generateId } from "@/lib/admin-data"
import type { HeroSlide } from "@/types/admin"

// GET - Fetch all hero slides
export async function GET() {
  try {
    const activeSlides = heroSlides.filter((slide) => slide.isActive).sort((a, b) => a.order - b.order)

    return NextResponse.json({
      success: true,
      data: activeSlides,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch hero slides" }, { status: 500 })
  }
}

// POST - Create new hero slide
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newSlide: HeroSlide = {
      id: generateId(),
      title: body.title,
      subtitle: body.subtitle,
      cta: body.cta,
      image: body.image,
      background: body.background,
      order: body.order || heroSlides.length + 1,
      isActive: body.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    heroSlides.push(newSlide)

    return NextResponse.json({
      success: true,
      data: newSlide,
      message: "Hero slide created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create hero slide" }, { status: 500 })
  }
}
