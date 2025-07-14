import { type NextRequest, NextResponse } from "next/server"
import { departments, generateId } from "@/lib/admin-data"
import type { Department } from "@/types/admin"

// GET - Fetch all departments
export async function GET() {
  try {
    const activeDepartments = departments.filter((dept) => dept.isActive).sort((a, b) => a.order - b.order)

    return NextResponse.json({
      success: true,
      data: activeDepartments,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch departments" }, { status: 500 })
  }
}

// POST - Create new department
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newDepartment: Department = {
      id: generateId(),
      name: body.name,
      icon: body.icon,
      color: body.color,
      href: body.href,
      order: body.order || departments.length + 1,
      isActive: body.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    departments.push(newDepartment)

    return NextResponse.json({
      success: true,
      data: newDepartment,
      message: "Department created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create department" }, { status: 500 })
  }
}
